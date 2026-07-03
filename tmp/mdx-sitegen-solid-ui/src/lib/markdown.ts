import { createResource } from "solid-js"

export interface MarkdownFrontmatter {
  title?: string
  description?: string
  layout?: string
  hero?: {
    text?: string
    actions?: Array<{
      text: string
      link: string
      theme?: string
    }>
    image?: {
      src: string
    }
  }
  features?: Array<{
    title: string
    details: string
  }>
  [key: string]: any
}

export interface MarkdownData {
  frontmatter: MarkdownFrontmatter
  content: string
}

// Simple frontmatter parser
function parseFrontmatter(content: string): MarkdownData {
  const parts = content.split(/^---\s*$/m)
  if (parts.length < 3) {
    return { frontmatter: {}, content: content.trim() }
  }
  
  const frontmatterText = parts[1].trim()
  const contentText = parts.slice(2).join('---').trim()
  
  const frontmatter: any = {}
  
  // Simple YAML parser
  const lines = frontmatterText.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line || line.startsWith('#')) {
      i++
      continue
    }
    
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) {
      i++
      continue
    }
    
    const key = line.substring(0, colonIndex).trim()
    const value = line.substring(colonIndex + 1).trim()
    
    if (value === '') {
      // Multi-line value (array or object)
      i++
      const parsed = parseMultilineValue(lines, i)
      frontmatter[key] = parsed.value
      i = parsed.nextIndex
    } else {
      // Simple value
      frontmatter[key] = parseValue(value)
      i++
    }
  }
  
  return { frontmatter, content: contentText }
}

function parseMultilineValue(lines: string[], startIndex: number): { value: any, nextIndex: number } {
  let i = startIndex
  const result: any = {}
  const arrayItems: any[] = []
  let isArray = false
  
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      i++
      continue
    }
    
    // Check if we've reached the next top-level key
    if (line.includes(':') && !line.startsWith('-') && !line.startsWith(' ')) {
      break
    }
    
    if (line.startsWith('-')) {
      isArray = true
      const itemValue = line.substring(1).trim()
      if (itemValue.includes(':')) {
        // Object in array
        const obj: any = {}
        const [itemKey, ...itemValueParts] = itemValue.split(':')
        obj[itemKey.trim()] = parseValue(itemValueParts.join(':').trim())
        
        // Check for more properties of this object
        let j = i + 1
        while (j < lines.length && lines[j].trim().startsWith(' ') && !lines[j].trim().startsWith('-')) {
          const objLine = lines[j].trim()
          const objColonIndex = objLine.indexOf(':')
          if (objColonIndex !== -1) {
            const objKey = objLine.substring(0, objColonIndex).trim()
            const objValue = objLine.substring(objColonIndex + 1).trim()
            obj[objKey] = parseValue(objValue)
          }
          j++
        }
        arrayItems.push(obj)
        i = j - 1
      } else {
        arrayItems.push(parseValue(itemValue))
      }
    } else if (line.includes(':')) {
      // Object property
      const [propKey, ...propValueParts] = line.split(':')
      result[propKey.trim()] = parseValue(propValueParts.join(':').trim())
    }
    
    i++
  }
  
  return {
    value: isArray ? arrayItems : result,
    nextIndex: i
  }
}

function parseValue(value: string): any {
  if (value === 'true') return true
  if (value === 'false') return false
  if (/^\d+$/.test(value)) return parseInt(value)
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value)
  return value
}

// Load markdown file content with fallback options
async function loadMarkdownFile(path: string): Promise<string> {
  // List of possible file paths to try
  const possiblePaths = [
    path,
    path.replace(/^\//, ''), // Remove leading slash
    `/public${path}`,
    `${path}.md`,
    `${path}.mdx`,
    `/public${path}.md`,
    `/public${path}.mdx`
  ]
  
  for (const filePath of possiblePaths) {
    try {
      const response = await fetch(filePath)
      if (response.ok) {
        return await response.text()
      }
    } catch (error) {
      // Continue to next path
      continue
    }
  }
  
  // If no file found, return default content based on path
  console.warn(`Could not load markdown file: ${path}`)
  return getDefaultContent(path)
}

function getDefaultContent(path: string): string {
  if (path.includes('index')) {
    return `---
title: Welcome
description: Welcome to the documentation
layout: home

hero:
  text: Dynamic Markdown Rendering
  actions:
    - text: Get Started
      link: /docs
    - text: GitHub
      link: https://github.com
      theme: alt

features:
  - title: Dynamic Loading
    details: Markdown files are loaded dynamically from various sources
  - title: Flexible Routing
    details: Support for both MD and MDX files with automatic routing
  - title: Layout Support
    details: Multiple layout types including home and documentation layouts

---

This content is dynamically generated when the requested markdown file is not found.`
  }
  
  return `---
title: Page Not Found
description: The requested page could not be found
---

# Page Not Found

The requested markdown file could not be loaded. Please check the file path and try again.

**Requested path:** ${path}
`
}

// Create a resource for loading and parsing markdown
export function createMarkdownResource(filePath: string) {
  return createResource(async () => {
    const content = await loadMarkdownFile(filePath)
    return parseFrontmatter(content)
  })
}

// Simple markdown to HTML converter (basic implementation)
export function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^(.+)$/gim, '<p>$1</p>')
    .replace(/<p><\/p>/gim, '')
    .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/gim, '$1')
}
