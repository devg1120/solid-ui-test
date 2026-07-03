import { createShortcut } from "@solid-primitives/keyboard"
import { IconArrowRight } from "@tabler/icons-solidjs"
import { CornerDownLeftIcon } from "lucide-solid"
import { createMemo, createSignal, splitProps, type ComponentProps } from "solid-js"

import type { SidebarLink } from "~/lib/docs"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList
} from "~/registry/ui/command"

type CommandMenuProps = {
  navItems: readonly {
    href: string
    label: string
  }[]
  components: readonly SidebarLink[]
}

type CommandOption = {
  href: string
  label: string
  searchText: string
  kind: "page" | "component"
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

function CommandMenuKbd(props: ComponentProps<"kbd">) {
  const [local, others] = splitProps(props, ["class"])

  return (
    <kbd
      class={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        local.class
      )}
      {...others}
    />
  )
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable || target.closest("[contenteditable='true']")) {
    return true
  }

  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

export default function CommandMenu(props: CommandMenuProps) {
  const [open, setOpen] = createSignal(false)
  const [query, setQuery] = createSignal("")

  const baseOptions = createMemo<CommandGroupOption[]>(() => {
    const groups: CommandGroupOption[] = [
      {
        heading: "Pages",
        items: props.navItems.map((item) => ({
          href: item.href,
          label: item.label,
          searchText: `${item.label} ${item.href} page nav navigation`,
          kind: "page"
        }))
      },
      {
        heading: "Components",
        items: props.components.map((item) => ({
          href: item.href,
          label: item.title,
          searchText: `${item.title} ${item.href} component`,
          kind: "component"
        }))
      }
    ]

    return groups.filter((group) => group.items.length > 0)
  })

  const filteredOptions = createMemo<CommandGroupOption[]>(() => {
    const trimmedQuery = query().trim().toLowerCase()

    if (!trimmedQuery) {
      return baseOptions()
    }

    return baseOptions()
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.searchText.toLowerCase().includes(trimmedQuery))
      }))
      .filter((group) => group.items.length > 0)
  })

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setQuery("")
    }
  }

  const handleShortcut = (event: KeyboardEvent | null) => {
    if (isEditableTarget(event?.target ?? null)) {
      return
    }

    event?.preventDefault()
    setOpen((current) => !current)
  }

  createShortcut(["Meta", "K"], handleShortcut, {
    preventDefault: false,
    requireReset: true
  })

  createShortcut(["Control", "K"], handleShortcut, {
    preventDefault: false,
    requireReset: true
  })

  return (
    <>
      <Button
        variant="outline"
        class="relative h-8 w-full justify-start rounded-lg pl-3 font-normal text-foreground shadow-none hover:bg-muted/50 sm:pr-12 md:w-48 lg:w-56 xl:w-64 dark:bg-card"
        onClick={() => setOpen(true)}
      >
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
      </Button>
      <CommandDialog
        open={open()}
        onOpenChange={handleOpenChange}
        class="w-full rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 sm:max-w-xl dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <Command<CommandOption, CommandGroupOption>
          onInputChange={setQuery}
          placeholder="Search documentation..."
          options={filteredOptions()}
          onChange={(option) => {
            if (!option) {
              return
            }

            setOpen(false)
            setQuery("")
            window.location.assign(option.href)
          }}
          optionGroupChildren="items"
          optionValue="href"
          optionTextValue="searchText"
          optionLabel="label"
          itemComponent={(itemProps) => (
            <CommandItem
              item={itemProps.item}
              class="h-9 rounded-md border border-transparent px-3! font-medium"
            >
              {itemProps.item.rawValue.kind === "component" ? (
                <div class="aspect-square size-4 rounded-full border border-dashed border-muted-foreground" />
              ) : (
                <IconArrowRight />
              )}
              {itemProps.item.rawValue.label}
            </CommandItem>
          )}
          sectionComponent={(sectionProps) => (
            <CommandGroup>
              <CommandGroupLabel>{sectionProps.section.rawValue.heading}</CommandGroupLabel>
            </CommandGroup>
          )}
        >
          <CommandInput />
          <CommandList class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5" />
          <CommandEmpty class="py-12 text-center text-sm text-muted-foreground">
            No results found.
          </CommandEmpty>
        </Command>
        <div class="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground dark:border-t-neutral-700 dark:bg-neutral-800">
          <CommandMenuKbd>
            <CornerDownLeftIcon />
          </CommandMenuKbd>
          <span>Go to page</span>
        </div>
      </CommandDialog>
    </>
  )
}
