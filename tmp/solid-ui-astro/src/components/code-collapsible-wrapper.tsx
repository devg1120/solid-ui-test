import { createSignal, Show, splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/registry/ui/collapsible"
import { Separator } from "~/registry/ui/separator"

export function CodeCollapsibleWrapper(props: ComponentProps<typeof Collapsible>) {
  const [local, others] = splitProps(props, ["class", "children"])
  const [isOpened, setIsOpened] = createSignal(false)

  return (
    <Collapsible
      forceMount
      open={isOpened()}
      onOpenChange={setIsOpened}
      class={cn("group/collapsible relative md:-mx-1", local.class)}
      {...others}
    >
      <CollapsibleTrigger as="div" class="absolute top-1.5 right-9 z-10 flex items-center">
        <Button variant="ghost" size="sm" class="h-7 rounded-md px-2 text-muted-foreground">
          <Show when={isOpened()} fallback="Expand">
            Collapse
          </Show>
        </Button>
        <Separator orientation="vertical" class="mx-1.5 h-4!" />
      </CollapsibleTrigger>
      <CollapsibleContent class="relative mt-6 overflow-hidden data-closed:max-h-64 data-closed:[content-visibility:auto] [&_figure]:mt-0 [&_figure]:md:mx-0!">
        {local.children}
      </CollapsibleContent>
      <CollapsibleTrigger class="absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-linear-to-b from-code/70 to-code text-sm text-muted-foreground group-data-expanded/collapsible:hidden">
        <Show when={isOpened()} fallback="Expand">
          Collapse
        </Show>
      </CollapsibleTrigger>
    </Collapsible>
  )
}
