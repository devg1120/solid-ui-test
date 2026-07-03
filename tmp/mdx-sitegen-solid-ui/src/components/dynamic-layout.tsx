import { Show, Suspense, type ParentProps } from "solid-js"
import { useLayout } from "~/components/layout-provider"
import Sidebar from "~/components/sidebar"
import { TableOfContents } from "~/components/toc"
import Footer from "~/components/footer"
import Navbar from "~/components/navbar"

import "~/styles/mdx.css"

export function DynamicLayout(props: ParentProps) {
  const { layoutConfig } = useLayout()

  const layout = () => layoutConfig().layout || "default"
  
  return (
    <>
      <Show when={layout() === "full"}>
        <FullLayout>{props.children}</FullLayout>
      </Show>
      
      <Show when={layout() === "home"}>
        <FullLayout>{props.children}</FullLayout>
      </Show>
      
      <Show when={layout() === "default"}>
        <DefaultLayout>{props.children}</DefaultLayout>
      </Show>
    </>
  )
}

// Full layout for showcase/demo pages
function FullLayout(props: ParentProps) {
  return (
    <div data-wrapper="" class="border-border/40 dark:border-border">
      <div class="mx-auto w-full border-border/40 min-[1800px]:max-w-screen-2xl min-[1800px]:border-x dark:border-border">
        <Navbar />
        <div class="relative">
          <section class="container py-6">
            <div class="hidden md:block [&>div]:p-0">
              <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
                <Suspense>{props.children}</Suspense>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}

// Default layout for documentation pages
function DefaultLayout(props: ParentProps) {
  return (
    <div data-wrapper="" class="border-border/40 dark:border-border">
      <div class="mx-auto w-full border-border/40 min-[1800px]:max-w-screen-2xl min-[1800px]:border-x dark:border-border">
        <Navbar />
        <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <Sidebar />
          <main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div class="mx-auto w-full min-w-0">
              <article>
                <Suspense>{props.children}</Suspense>
              </article>
            </div>
            <div class="hidden text-sm xl:block">
              <TableOfContents />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}
