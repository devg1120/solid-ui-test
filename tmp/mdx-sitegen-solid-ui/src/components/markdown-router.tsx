import { type Component, type ParentProps } from "solid-js"

export const MarkdownRouter: Component<ParentProps> = (props) => {
  // For now, just pass through children
  // The markdown resolution will be handled by individual route components
  return <>{props.children}</>
}

function generateMarkdownPaths(pathname: string, isDocsRoute: boolean): string[] {
  // Remove leading/trailing slashes and split path
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
  
  if (isDocsRoute) {
    // For docs routes, try docs-specific paths
    const docsPath = cleanPath.replace(/^docs\/?/, '') || 'index'
    return [
      `/docs/${docsPath}.mdx`,
      `/docs/${docsPath}.md`,
      `/public/docs/${docsPath}.mdx`,
      `/public/docs/${docsPath}.md`,
      `/src/routes/docs/${docsPath}.mdx`,
      `/src/routes/docs/${docsPath}.md`
    ]
  } else {
    // For other routes, try general paths
    return [
      `/${cleanPath}.md`,
      `/${cleanPath}.mdx`,
      `/public/${cleanPath}.md`,
      `/public/${cleanPath}.mdx`,
      `/src/routes/${cleanPath}.md`,
      `/src/routes/${cleanPath}.mdx`,
      `/pages/${cleanPath}.md`,
      `/pages/${cleanPath}.mdx`
    ]
  }
}
