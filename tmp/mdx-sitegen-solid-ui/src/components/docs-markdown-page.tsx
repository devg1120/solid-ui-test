import { Show, type Component, createEffect } from "solid-js"
import { Title } from "@solidjs/meta"
import { MDXProvider } from "solid-mdx"
import { createMarkdownResource, markdownToHtml, type MarkdownData } from "~/lib/markdown"
import { MDXComponents } from "~/components/mdx-components"
import { useLayout } from "~/components/layout-provider"

interface DocsMarkdownPageProps {
  filePath: string
}

export const DocsMarkdownPage: Component<DocsMarkdownPageProps> = (props) => {
  const [data] = createMarkdownResource(props.filePath)
  const { setLayoutConfig } = useLayout()

  // Update layout config when data loads
  createEffect(() => {
    if (data()) {
      setLayoutConfig({
        layout: data()!.frontmatter.layout || "default",
        title: data()!.frontmatter.title,
        description: data()!.frontmatter.description,
        ...data()!.frontmatter
      })
    }
  })

  return (
    <Show when={data() && !data.loading} fallback={<div class="p-4">Loading...</div>}>
      <Title>{data()?.frontmatter.title || "Documentation"}</Title>
      
      <MDXProvider components={MDXComponents}>
        <div class="space-y-2">
          <Show when={data()?.frontmatter.title}>
            <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
              {data()!.frontmatter.title}
            </h1>
          </Show>
          
          <Show when={data()?.frontmatter.description}>
            <p class="text-xl text-muted-foreground">
              {data()!.frontmatter.description}
            </p>
          </Show>
        </div>
        
        <div class="pb-12 pt-8">
          <div class="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:tracking-tight">
            <div innerHTML={markdownToHtml(data()!.content)} />
          </div>
        </div>
      </MDXProvider>
    </Show>
  )
}
