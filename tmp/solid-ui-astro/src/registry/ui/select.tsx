import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as SelectPrimitive from "@kobalte/core/select"
import { mergeProps, splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type SelectProps<O, OptGroup = never, T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectRootProps<O, OptGroup, T>
> &
  Pick<ComponentProps<T>, "class">

const Select = <O, OptGroup = never, T extends ValidComponent = "div">(
  props: SelectProps<O, OptGroup, T>
) => {
  const mergedProps = mergeProps(
    {
      sameWidth: true,
      gutter: 4,
      placement: "bottom"
    } as const,
    props
  )
  const [local, others] = splitProps(mergedProps as SelectProps<O, OptGroup, T>, ["class"])

  return <SelectPrimitive.Root data-slot="select" class={local.class} {...others} />
}

type SelectGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectSectionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectGroup = <T extends ValidComponent = "div">(props: SelectGroupProps<T>) => {
  const [local, others] = splitProps(props as SelectGroupProps, ["class"])

  return (
    <SelectPrimitive.Section
      data-slot="select-group"
      class={cn("cn-select-group", local.class)}
      {...others}
    />
  )
}

type SelectValueProps<Option, T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectValueProps<Option, T>
> &
  Pick<ComponentProps<T>, "class">

const SelectValue = <Option, T extends ValidComponent = "span">(
  props: SelectValueProps<Option, T>
) => {
  const [local, others] = splitProps(props as SelectValueProps<Option>, ["class"])

  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      class={cn("cn-select-value", local.class)}
      {...others}
    />
  )
}

type SelectTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    size?: "sm" | "default"
  }

const SelectTrigger = <T extends ValidComponent = "button">(rawProps: SelectTriggerProps<T>) => {
  const props = mergeProps({ size: "default" as const }, rawProps)
  const [local, others] = splitProps(props as SelectTriggerProps, ["class", "children", "size"])

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={local.size}
      class={cn(
        "cn-select-trigger flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      {...others}
    >
      {local.children}
      <SelectPrimitive.Icon data-slot="select-trigger-icon">
        <IconPlaceholder
          class="cn-select-trigger-icon"
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

type SelectContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectContent = <T extends ValidComponent = "div">(props: SelectContentProps<T>) => {
  let contentRef: HTMLDivElement | undefined

  const [local, others] = splitProps(props as SelectContentProps, ["class", "ref"])
  const setContentRef = (element: HTMLDivElement) => {
    contentRef = element
    const forwardedRef = local.ref as ((element: HTMLDivElement) => void) | undefined

    if (typeof forwardedRef === "function") {
      forwardedRef(element)
    }
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        ref={setContentRef}
        class={cn(
          "cn-select-content relative z-50 max-h-(--kb-popper-available-height) min-w-32 origin-(--kb-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          local.class
        )}
        {...others}
      >
        <SelectPrimitive.Listbox class="m-0 p-1 outline-none" scrollRef={() => contentRef} />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

type SelectLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SelectLabel = <T extends ValidComponent = "span">(props: SelectLabelProps<T>) => {
  const [local, others] = splitProps(props as SelectLabelProps, ["class"])

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      class={cn("cn-select-label", local.class)}
      {...others}
    />
  )
}

type SelectItemProps<T extends ValidComponent = "li"> = PolymorphicProps<
  T,
  SelectPrimitive.SelectItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    variant?: "default" | "destructive"
  }

const SelectItem = <T extends ValidComponent = "li">(rawProps: SelectItemProps<T>) => {
  const props = mergeProps({ variant: "default" as const }, rawProps)
  const [local, others] = splitProps(props as SelectItemProps, ["class", "children", "variant"])

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-variant={local.variant}
      class={cn(
        "cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...others}
    >
      <SelectPrimitive.ItemIndicator
        as="span"
        data-slot="select-item-indicator"
        class="cn-select-item-indicator"
      >
        <IconPlaceholder
          class="cn-select-item-indicator-icon pointer-events-none"
          lucide="CheckIcon"
          tabler="IconCheck"
        />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel as="span" data-slot="select-item-text" class="cn-select-item-text">
        {local.children}
      </SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  )
}

type SelectSeparatorProps = ComponentProps<"hr">

const SelectSeparator = (props: SelectSeparatorProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <hr
      data-slot="select-separator"
      class={cn("cn-select-separator pointer-events-none", local.class)}
      {...others}
    />
  )
}

const SelectHiddenSelect = SelectPrimitive.HiddenSelect
const SelectDescription = SelectPrimitive.Description
const SelectErrorMessage = SelectPrimitive.ErrorMessage

export {
  Select,
  SelectContent,
  SelectDescription,
  SelectErrorMessage,
  SelectGroup,
  SelectHiddenSelect,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
