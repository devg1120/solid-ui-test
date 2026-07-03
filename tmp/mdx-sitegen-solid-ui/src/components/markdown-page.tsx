import { Show, createEffect, type Component } from "solid-js"
import { Title } from "@solidjs/meta"
import { createMarkdownResource, markdownToHtml, type MarkdownData } from "~/lib/markdown"
import { useLayout, type LayoutConfig } from "~/components/layout-provider"

interface MarkdownPageProps {
  filePath: string
}

export const MarkdownPage: Component<MarkdownPageProps> = (props) => {
  const [data] = createMarkdownResource(props.filePath)
  const { setLayoutConfig } = useLayout()

  // Set layout config when data loads
  createEffect(() => {
    const markdown = data()
    if (markdown && !data.loading) {
      console.log('MarkdownPage - Setting layout from frontmatter:', {
        layout: markdown.frontmatter.layout,
        title: markdown.frontmatter.title,
        fullFrontmatter: markdown.frontmatter
      })
      setLayoutConfig({
        layout: markdown.frontmatter.layout || "default",
        title: markdown.frontmatter.title,
        description: markdown.frontmatter.description,
        ...markdown.frontmatter
      })
    }
  })

  return (
    <Show when={data() && !data.loading} fallback={<div>Loading...</div>}>
      <Title>{data()?.frontmatter.title || "Page"}</Title>
      <MarkdownContent data={data()!} />
    </Show>
  )
}

// Content component that renders markdown based on layout
const MarkdownContent: Component<{ data: MarkdownData }> = (props) => {
  const { layoutConfig } = useLayout()
  
  // Render content based on the current layout
  return (
    <>
      <Show when={layoutConfig().layout === "home"}>
        <HomeContent data={props.data} />
      </Show>
      
      <Show when={!layoutConfig().layout || layoutConfig().layout === "default"}>
        <DefaultContent data={props.data} />
      </Show>
      
      <Show when={layoutConfig().layout === "full"}>
        <FullContent data={props.data} />
      </Show>
    </>
  )
}

// Home content for landing pages
const HomeContent: Component<{ data: MarkdownData }> = (props) => {
  const { frontmatter, content } = props.data
  
  return (
    <div class="relative flex min-h-screen flex-col bg-background">
      <div class="flex-1">
        {/* Hero Section */}
        <Show when={frontmatter.hero}>
          <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div class="container px-4 md:px-6">
              <div class="flex flex-col items-center space-y-4 text-center">
                <div class="space-y-2">
                  <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {frontmatter.title || "Welcome"}
                  </h1>
                  <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    {frontmatter.hero?.text || frontmatter.description || ""}
                  </p>
                </div>
                
                {/* Hero Actions */}
                <Show when={frontmatter.hero?.actions}>
                  <div class="flex flex-col gap-2 min-[400px]:flex-row">
                    {frontmatter.hero!.actions!.map((action, index) => (
                      <a
                        href={action.link}
                        class={`inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${
                          action.theme === "alt" 
                            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                        target={action.link.startsWith('http') ? "_blank" : undefined}
                        rel={action.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {action.text}
                      </a>
                    ))}
                  </div>
                </Show>
              </div>
            </div>
          </section>
        </Show>

        {/* Features Section */}
        <Show when={frontmatter.features && frontmatter.features.length > 0}>
          <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div class="container px-4 md:px-6">
              <div class="grid gap-6 lg:grid-cols-3 lg:gap-12">
                {frontmatter.features!.map((feature, index) => (
                  <div class="flex flex-col items-center space-y-4 text-center">
                    <div class="rounded-lg bg-primary/10 p-3">
                      {/* Default icon based on index */}
                      <svg
                        class="h-6 w-6 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {index === 0 && <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />}
                        {index === 1 && <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />}
                        {index === 2 && (
                          <>
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        )}
                        {index > 2 && <circle cx="12" cy="12" r="3" />}
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold">{feature.title}</h3>
                    <p class="text-gray-500 dark:text-gray-400">
                      {feature.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Show>

        {/* Content Section */}
        <Show when={content}>
          <section class="w-full py-12 md:py-24">
            <div class="container px-4 md:px-6">
              <div class="prose prose-gray max-w-none dark:prose-invert">
                <div innerHTML={markdownToHtml(content)} />
              </div>
            </div>
          </section>
        </Show>
      </div>
    </div>
  )
}

// Default content for regular pages
const DefaultContent: Component<{ data: MarkdownData }> = (props) => {
  const { frontmatter, content } = props.data
  
  return (
    <div class="container mx-auto px-4 py-8">
      <article class="prose prose-gray max-w-none dark:prose-invert">
        <Show when={frontmatter.title}>
          <h1>{frontmatter.title}</h1>
        </Show>
        <Show when={frontmatter.description}>
          <p class="text-xl text-gray-600 dark:text-gray-400">{frontmatter.description}</p>
        </Show>
        <div innerHTML={markdownToHtml(content)} />
      </article>
    </div>
  )
}

// Full content for showcase pages
const FullContent: Component<{ data: MarkdownData }> = (props) => {
  const { frontmatter, content } = props.data
  
  return (
    <div class="w-full">
      <Show when={frontmatter.title}>
        <h1 class="sr-only">{frontmatter.title}</h1>
      </Show>
      <div innerHTML={markdownToHtml(content)} />
    </div>
  )
}

