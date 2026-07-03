import { mergeProps, splitProps, type ComponentProps } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type NativeSelectProps = Omit<ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

const NativeSelect = (rawProps: NativeSelectProps) => {
  const props = mergeProps({ size: "default" as const }, rawProps)
  const [local, others] = splitProps(props, ["class", "size"])

  return (
    <div
      class={cn("group/native-select relative w-fit has-[select:disabled]:opacity-50", local.class)}
      data-size={local.size}
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={local.size}
        class="cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
        {...others}
      />
      <IconPlaceholder
        aria-hidden="true"
        class="cn-native-select-icon pointer-events-none absolute select-none"
        data-slot="native-select-icon"
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
      />
    </div>
  )
}

const NativeSelectOption = (props: ComponentProps<"option">) => {
  return <option data-slot="native-select-option" {...props} />
}

const NativeSelectOptGroup = (props: ComponentProps<"optgroup">) => {
  const [local, others] = splitProps(props, ["class"])

  return <optgroup data-slot="native-select-optgroup" class={cn(local.class)} {...others} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption, type NativeSelectProps }
