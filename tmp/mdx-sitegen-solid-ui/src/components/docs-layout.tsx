import { Suspense, type ParentProps } from "solid-js"
import { MDXProvider } from "solid-mdx"
import { MDXComponents } from "~/components/mdx-components"

export default function DocsLayout(props: ParentProps) {
  return (
    <MDXProvider components={MDXComponents}>
      <div class="min-h-screen bg-background">
        <div class="container mx-auto px-4 py-8">
          <Suspense>{props.children}</Suspense>
        </div>
      </div>
    </MDXProvider>
  )
}
