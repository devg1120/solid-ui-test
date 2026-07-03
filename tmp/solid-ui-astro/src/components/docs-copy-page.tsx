import { IconCheck, IconChevronDown, IconCopy, IconMarkdown } from "@tabler/icons-solidjs"
import { createEffect, createSignal, onCleanup, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Separator } from "~/registry/ui/separator"

type DocsCopyPageProps = {
  content: string
  markdownHref: string
}

export default function DocsCopyPage(props: DocsCopyPageProps) {
  const [isCopied, setIsCopied] = createSignal(false)

  createEffect(() => {
    if (!isCopied()) {
      return
    }

    const timeoutId = setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    onCleanup(() => {
      clearTimeout(timeoutId)
    })
  })

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.content)
      setIsCopied(true)
    } catch {
      return
    }
  }

  return (
    <ButtonGroup class="group/buttons relative flex rounded-lg bg-secondary *:[[data-slot=button]]:focus-visible:relative *:[[data-slot=button]]:focus-visible:z-10">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleCopy}
        class="h-8 shadow-none md:h-7 md:text-[0.8rem]"
      >
        <Show when={isCopied()} fallback={<IconCopy />}>
          <IconCheck />
        </Show>
        Copy Page
      </Button>
      <Separator
        orientation="vertical"
        class="absolute top-1 right-8 z-0 h-6! bg-foreground/5! peer-focus-visible:opacity-0 sm:right-7 sm:h-5!"
      />
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger
          as={Button<"button">}
          variant="secondary"
          size="icon-sm"
          class="peer -ml-0.5 size-8 shadow-none md:size-7 md:text-[0.8rem]"
        >
          <IconChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="animate-none! rounded-lg shadow-none">
          <DropdownMenuItem
            as="a"
            href={props.markdownHref}
            rel="noreferrer"
            target="_blank"
            class="*:[svg]:text-muted-foreground"
          >
            <IconMarkdown />
            View as Markdown
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
