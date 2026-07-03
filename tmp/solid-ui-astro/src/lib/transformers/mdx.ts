import { readFile } from "node:fs/promises"
import path from "node:path"

import { DEFAULT_STYLE_NAME } from "~/lib/design-system"
import { formatCode } from "~/lib/format-code"
import { getRegistryItem } from "~/lib/registry"
import type { IconLibraryName } from "~/registry/icon-libraries"

type AttributeMap = Record<string, string>

const CODE_FENCE_PATTERN = /```[\s\S]*?```/g

function normalizeNewlines(value: string) {
  return value.replace(/\r\n?/g, "\n")
}

export async function readMdx(id: string) {
  const sourcePath = path.join(process.cwd(), "src/content/docs", id)
  return readFile(sourcePath, "utf-8")
}

async function mapOutsideCodeFences(
  value: string,
  transform: (segment: string) => Promise<string> | string
) {
  const matches = [...value.matchAll(CODE_FENCE_PATTERN)]

  if (!matches.length) {
    return await transform(value)
  }

  let cursor = 0
  let result = ""

  for (const match of matches) {
    const fullMatch = match[0]
    const start = match.index ?? 0

    result += await transform(value.slice(cursor, start))
    result += fullMatch
    cursor = start + fullMatch.length
  }

  result += await transform(value.slice(cursor))
  return result
}

async function replaceAsync(
  value: string,
  pattern: RegExp,
  replacer: (match: RegExpExecArray) => Promise<string> | string
) {
  const regex = new RegExp(pattern.source, pattern.flags)
  let result = ""
  let cursor = 0

  while (true) {
    const match = regex.exec(value)
    if (!match) {
      break
    }

    const start = match.index
    const fullMatch = match[0]

    result += value.slice(cursor, start)
    result += await replacer(match)
    cursor = start + fullMatch.length
  }

  result += value.slice(cursor)
  return result
}

function parseAttributes(fragment: string) {
  const attributes: AttributeMap = {}
  const attributePattern = /([A-Za-z_][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g

  while (true) {
    const match = attributePattern.exec(fragment)
    if (!match) {
      break
    }

    const key = match[1]
    const value = (match[2] ?? match[3] ?? match[4] ?? "").trim()

    if (!key) {
      continue
    }

    const quotedValue = value.match(/^(["'])([\s\S]*)\1$/)
    attributes[key] = quotedValue ? quotedValue[2] : value
  }

  return attributes
}

function parsePositiveInteger(value: string | undefined) {
  if (!value) {
    return undefined
  }

  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

function toCodeFence(code: string, language: string) {
  return `\`\`\`${language}\n${code.trimEnd()}\n\`\`\``
}

function inferLanguage(attributes: AttributeMap) {
  const language = attributes.language?.trim()
  if (language) {
    return language
  }

  const title = attributes.title?.trim()
  if (title) {
    const extension = title.split(".").pop()?.trim()
    if (extension) {
      return extension
    }
  }

  return "tsx"
}

async function readSourceCode(attributes: AttributeMap) {
  if (attributes.name) {
    const item = await getRegistryItem(attributes.name)
    const firstFile = item?.files?.[0]
    const content =
      firstFile && typeof firstFile === "object" && "content" in firstFile
        ? firstFile.content
        : undefined

    if (typeof content === "string") {
      return content
    }
  }

  if (attributes.src) {
    const sourcePath = path.isAbsolute(attributes.src)
      ? attributes.src
      : path.join(process.cwd(), attributes.src)

    try {
      return await readFile(sourcePath, "utf-8")
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return undefined
      }

      throw error
    }
  }

  return undefined
}

async function formatInsertedSource(code: string, attributes: AttributeMap) {
  const resolvedStyleName = attributes.styleName?.trim() || DEFAULT_STYLE_NAME
  const iconLibrary = attributes.iconLibrary?.trim() as IconLibraryName | undefined

  let formattedCode = await formatCode(code, {
    styleName: resolvedStyleName,
    iconLibrary
  })

  formattedCode = formattedCode.replaceAll("/* eslint-disable react/no-children-prop */\n", "")

  const maxLines = parsePositiveInteger(attributes.maxLines)
  if (maxLines) {
    formattedCode = formattedCode.split("\n").slice(0, maxLines).join("\n")
  }

  return formattedCode
}

async function replaceSourceComponents(value: string, componentName: string) {
  const pattern = new RegExp(`<${componentName}\\b([\\s\\S]*?)\\/>`, "g")

  return mapOutsideCodeFences(value, async (segment) => {
    return replaceAsync(segment, pattern, async (match) => {
      const attributes = parseAttributes(match[1] ?? "")
      const sourceCode = await readSourceCode(attributes)

      if (!sourceCode) {
        return ""
      }

      const formattedCode = await formatInsertedSource(sourceCode, attributes)
      const language = inferLanguage(attributes)
      return toCodeFence(formattedCode, language)
    })
  })
}

function getLastHeadingLevel(value: string) {
  const lines = value.split("\n")

  for (let index = lines.length - 1; index >= 0; index--) {
    const line = lines[index]?.trim()
    if (!line) {
      continue
    }

    const match = /^(#{1,6})\s+\S/.exec(line)
    if (match) {
      return match[1].length
    }
  }

  return 2
}

function titleFromTabValue(value: string) {
  return value
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ")
}

function transformCodeTabs(value: string) {
  const codeTabsPattern = /<CodeTabs\b[^>]*>([\s\S]*?)<\/CodeTabs>/g

  return value.replace(codeTabsPattern, (fullMatch, innerContent, offset) => {
    const previousContent = value.slice(0, offset)
    const headingLevel = Math.max(2, Math.min(getLastHeadingLevel(previousContent) + 1, 6))
    const headingPrefix = "#".repeat(headingLevel)

    const labelByValue = new Map<string, string>()
    const tabsTriggerPattern = /<TabsTrigger\b([^>]*)>([\s\S]*?)<\/TabsTrigger>/g

    while (true) {
      const triggerMatch = tabsTriggerPattern.exec(innerContent)
      if (!triggerMatch) {
        break
      }

      const attributes = parseAttributes(triggerMatch[1] ?? "")
      const value = attributes.value?.trim()
      const label = triggerMatch[2]?.trim()

      if (value && label) {
        labelByValue.set(value, label)
      }
    }

    const tabsContentPattern = /<TabsContent\b([^>]*)>([\s\S]*?)<\/TabsContent>/g
    const sections: string[] = []

    while (true) {
      const contentMatch = tabsContentPattern.exec(innerContent)
      if (!contentMatch) {
        break
      }

      const attributes = parseAttributes(contentMatch[1] ?? "")
      const value = attributes.value?.trim()
      const label = value ? labelByValue.get(value) || titleFromTabValue(value) : "Section"
      const content = contentMatch[2]?.trim()

      if (!content) {
        continue
      }

      sections.push(`${headingPrefix} ${label}\n\n${content}`)
    }

    if (!sections.length) {
      return fullMatch
    }

    return sections.join("\n\n")
  })
}

function normalizeStepTitle(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function transformStepsBlock(content: string) {
  const stepPattern = /<Step\b[^>]*>([\s\S]*?)<\/Step>/g
  const matches = [...content.matchAll(stepPattern)]

  if (!matches.length) {
    return content.trim()
  }

  const items: string[] = []

  for (let index = 0; index < matches.length; index++) {
    const match = matches[index]
    const matchIndex = match.index ?? 0
    const nextMatchIndex = matches[index + 1]?.index ?? content.length
    const title = normalizeStepTitle(match[1] ?? "")
    const body = content.slice(matchIndex + match[0].length, nextMatchIndex).trim()

    let item = `${index + 1}. ${title}`

    if (body) {
      item += `\n\n${body}`
    }

    items.push(item)
  }

  return items.join("\n\n")
}

function transformSteps(value: string) {
  const stepsPattern = /<Steps\b[^>]*>([\s\S]*?)<\/Steps>/g

  const withStepBlocks = value.replace(stepsPattern, (_, innerContent) => {
    return transformStepsBlock(innerContent)
  })

  return withStepBlocks.replace(/<Step\b[^>]*>([\s\S]*?)<\/Step>/g, (_, title) => {
    return `1. ${normalizeStepTitle(title)}`
  })
}

async function replaceComponentLists(value: string) {
  if (!/<Components?List\b/.test(value)) {
    return value
  }

  const { getComponentLinks } = await import("~/lib/docs")
  const components = await getComponentLinks()
  const markdownList = components
    .map((component) => `- [${component.title}](${component.href})`)
    .join("\n")

  return mapOutsideCodeFences(value, (segment) => {
    return segment.replace(/<Components?List\b[^>]*\/>/g, markdownList)
  })
}

function removeResidualComponentTags(value: string) {
  return mapOutsideCodeFences(value, (segment) => {
    return segment.replace(/<\/?[A-Z][A-Za-z0-9]*(?:\s[^>]*)?>/g, "")
  })
}

function normalizeMarkdown(value: string) {
  const normalized = normalizeNewlines(value)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return normalized.length > 0 ? `${normalized}\n` : ""
}

export async function transformMdx(content: string) {
  let transformed = content
  transformed = await replaceComponentLists(transformed)
  for (const componentName of ["ComponentPreview", "ComponentSource"] as const) {
    transformed = await replaceSourceComponents(transformed, componentName)
  }
  transformed = transformCodeTabs(transformed)
  transformed = transformSteps(transformed)
  transformed = await removeResidualComponentTags(transformed)

  return normalizeMarkdown(transformed)
}
