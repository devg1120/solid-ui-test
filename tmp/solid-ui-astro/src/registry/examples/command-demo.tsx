import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-solid"
import { createMemo, createSignal, Show, type Component, type ComponentProps } from "solid-js"
import { Dynamic } from "solid-js/web"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "~/registry/ui/command"

type CommandOption = {
  value: string
  label: string
  shortcut?: string
  disabled?: boolean
  icon: Component<ComponentProps<"svg">>
}

type CommandGroupOption = {
  heading: string
  items: CommandOption[]
}

const options: CommandGroupOption[] = [
  {
    heading: "Suggestions",
    items: [
      {
        value: "calculator",
        label: "Calculator",
        disabled: true,
        icon: Calculator
      },
      {
        value: "calendar",
        label: "Calendar",
        icon: Calendar
      },
      {
        value: "search-emoji",
        label: "Search Emoji",
        icon: Smile
      }
    ]
  },
  {
    heading: "Settings",
    items: [
      {
        value: "profile",
        label: "Profile",
        shortcut: "⌘P",
        icon: User
      },
      {
        value: "billing",
        label: "Billing",
        shortcut: "⌘B",
        icon: CreditCard
      },
      {
        value: "settings",
        label: "Settings",
        shortcut: "⌘S",
        icon: Settings
      }
    ]
  }
]

export default function CommandDemo() {
  const [query, setQuery] = createSignal("")

  const filteredOptions = createMemo(() => {
    const trimmedQuery = query().trim().toLowerCase()

    if (!trimmedQuery) {
      return options
    }

    return options
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          return (
            item.label.toLowerCase().includes(trimmedQuery) ||
            item.value.toLowerCase().includes(trimmedQuery)
          )
        })
      }))
      .filter((group) => group.items.length > 0)
  })

  return (
    <Command<CommandOption, CommandGroupOption>
      class="max-w-sm rounded-lg border shadow-md"
      onInputChange={setQuery}
      placeholder="Type a command or search..."
      options={filteredOptions()}
      optionGroupChildren="items"
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      itemComponent={(props) => (
        <CommandItem item={props.item}>
          <Dynamic class="size-4" component={props.item.rawValue.icon} />
          <span>{props.item.rawValue.label}</span>
          <Show when={props.item.rawValue.shortcut}>
            {(shortcut) => <CommandShortcut>{shortcut()}</CommandShortcut>}
          </Show>
        </CommandItem>
      )}
      sectionComponent={(props) => (
        <>
          {props.section.index > 0 ? <CommandSeparator /> : null}
          <CommandGroup>
            <CommandGroupLabel>{props.section.rawValue.heading}</CommandGroupLabel>
          </CommandGroup>
        </>
      )}
    >
      <CommandInput />
      <CommandList />
      <CommandEmpty>No results found.</CommandEmpty>
    </Command>
  )
}
