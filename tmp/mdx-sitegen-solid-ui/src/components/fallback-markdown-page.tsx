import { createEffect, createSignal, Show, type Component } from "solid-js"
import { useLocation } from "@solidjs/router"
import { MarkdownPage } from "~/components/markdown-page"
import { DocsMarkdownPage } from "~/components/docs-markdown-page"

export const FallbackMarkdownPage: Component = () => {
  const location = useLocation()
  const [markdownPath, setMarkdownPath] = createSignal("")
  const [isDocsRoute, setIsDocsRoute] = createSignal(false)

  createEffect(() => {
    const pathname = location.pathname
    const isDocRoute = pathname.startsWith('/docs')
    setIsDocsRoute(isDocRoute)

    // Generate possible paths for the current route
    const paths = generateMarkdownPaths(pathname, isDocRoute)
    setMarkdownPath(paths[0]) // Use first path, the loader will handle fallbacks
  })

  return (
    <>
      <Show when={isDocsRoute()}>
        <DocsMarkdownPage filePath={markdownPath()} />
      </Show>
      <Show when={!isDocsRoute()}>
        <MarkdownPage filePath={markdownPath()} />
      </Show>
    </>
  )
}

function generateMarkdownPaths(pathname: string, isDocsRoute: boolean): string[] {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
  
  if (isDocsRoute) {
    const docsPath = cleanPath.replace(/^docs\/?/, '') || 'index'
    return [
      `/docs/${docsPath}.mdx`,
      `/docs/${docsPath}.md`,
      `/public/docs/${docsPath}.mdx`,
      `/public/docs/${docsPath}.md`
    ]
  } else {
    return [
      `/${cleanPath}.md`,
      `/${cleanPath}.mdx`,
      `/public/${cleanPath}.md`,
      `/public/${cleanPath}.mdx`
    ]
  }
}
