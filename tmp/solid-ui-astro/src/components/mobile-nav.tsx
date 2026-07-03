import { createSignal, For, type JSX } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

type NavItem = {
  href: string
  label: string
}

type DocsLink = {
  href: string
  title: string
}

type MobileNavProps = {
  menuItems: readonly NavItem[]
  topLevel: readonly DocsLink[]
  components: readonly DocsLink[]
  class?: string
}

type MobileLinkProps = {
  href: string
  onNavigate: () => void
  class?: string
  children: JSX.Element
}

function MobileLink(props: MobileLinkProps) {
  return (
    <a
      href={props.href}
      onClick={() => props.onNavigate()}
      class={cn("flex items-center gap-2 text-2xl font-medium", props.class)}
    >
      {props.children}
    </a>
  )
}

export default function MobileNav(props: MobileNavProps) {
  const [open, setOpen] = createSignal(false)

  return (
    <Popover open={open()} onOpenChange={setOpen} placement="bottom-start" gutter={14}>
      <PopoverTrigger
        as={Button<"button">}
        variant="ghost"
        class={cn(
          "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:border-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent aria-expanded:bg-transparent aria-expanded:text-foreground dark:hover:bg-transparent",
          props.class
        )}
      >
        <div class="relative flex h-8 w-4 items-center justify-center">
          <div class="relative size-4">
            <span
              class={cn(
                "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                open() ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              class={cn(
                "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                open() ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
          <span class="sr-only">Toggle Menu</span>
        </div>
        <span class="flex h-8 items-center text-lg leading-none font-medium">Menu</span>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(event) => event.preventDefault()}
        class="no-scrollbar h-(--kb-popper-content-available-height) w-(--kb-popper-content-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none ring-0 backdrop-blur duration-100 outline-none data-expanded:animate-none!"
      >
        <div class="flex flex-col gap-12 overflow-auto px-6 py-6">
          <section class="flex flex-col gap-4">
            <p class="text-sm font-medium text-muted-foreground">Menu</p>
            <div class="flex flex-col gap-3">
              <MobileLink href="/" onNavigate={() => setOpen(false)}>
                Home
              </MobileLink>
              <For each={props.menuItems}>
                {(item) => (
                  <MobileLink href={item.href} onNavigate={() => setOpen(false)}>
                    {item.label}
                  </MobileLink>
                )}
              </For>
            </div>
          </section>

          <section class="flex flex-col gap-4">
            <p class="text-sm font-medium text-muted-foreground">Sections</p>
            <div class="flex flex-col gap-3">
              <For each={props.topLevel}>
                {(item) => (
                  <MobileLink href={item.href} onNavigate={() => setOpen(false)}>
                    {item.title}
                  </MobileLink>
                )}
              </For>
            </div>
          </section>

          <section class="flex flex-col gap-4">
            <p class="text-sm font-medium text-muted-foreground">Components</p>
            <div class="flex flex-col gap-3">
              <For each={props.components}>
                {(item) => (
                  <MobileLink href={item.href} onNavigate={() => setOpen(false)}>
                    {item.title}
                  </MobileLink>
                )}
              </For>
            </div>
          </section>
        </div>
      </PopoverContent>
    </Popover>
  )
}
