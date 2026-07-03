import * as ContextMenuPrimitive from "@kobalte/core/context-menu"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { mergeProps, splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type ContextMenuProps = ContextMenuPrimitive.ContextMenuRootProps

const ContextMenu = (props: ContextMenuProps) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

type ContextMenuTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuTrigger = <T extends ValidComponent = "div">(
  props: ContextMenuTriggerProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuTriggerProps, ["class"])
  return (
    <ContextMenuPrimitive.Trigger
      class={cn("cn-context-menu-trigger select-none", local.class)}
      data-slot="context-menu-trigger"
      {...others}
    />
  )
}

type ContextMenuPortalProps = ContextMenuPrimitive.ContextMenuPortalProps

const ContextMenuPortal = (props: ContextMenuPortalProps) => {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
}

type ContextMenuContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuContent = <T extends ValidComponent = "div">(
  props: ContextMenuContentProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuContentProps, ["class"])
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        class={cn(
          "cn-context-menu-content z-50 max-h-(--kb-popper-available-height) origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none",
          local.class
        )}
        data-slot="context-menu-content"
        {...others}
      />
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuGroup = <T extends ValidComponent = "div">(props: ContextMenuGroupProps<T>) => {
  const [local, others] = splitProps(props as ContextMenuGroupProps, ["class"])
  return (
    <ContextMenuPrimitive.Group class={local.class} data-slot="context-menu-group" {...others} />
  )
}

type ContextMenuLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuGroupLabelProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
  }

const ContextMenuLabel = <T extends ValidComponent = "span">(props: ContextMenuLabelProps<T>) => {
  const [local, others] = splitProps(props as ContextMenuLabelProps, ["class", "inset"])
  return (
    <ContextMenuPrimitive.GroupLabel
      class={cn("cn-context-menu-label data-inset:pl-8", local.class)}
      data-slot="context-menu-label"
      data-inset={local.inset}
      {...others}
    />
  )
}

type ContextMenuItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }

const ContextMenuItem = <T extends ValidComponent = "div">(rawProps: ContextMenuItemProps<T>) => {
  const props = mergeProps({ variant: "default" } as ContextMenuItemProps<T>, rawProps)
  const [local, others] = splitProps(props as ContextMenuItemProps, ["class", "inset", "variant"])
  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "group/context-menu-item cn-context-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-item"
      data-inset={local.inset}
      data-variant={local.variant}
      {...others}
    />
  )
}

type ContextMenuSubProps = ContextMenuPrimitive.ContextMenuSubProps

const ContextMenuSub = (props: ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuSubTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    inset?: boolean
  }

const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
  props: ContextMenuSubTriggerProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuSubTriggerProps, [
    "class",
    "children",
    "inset"
  ])
  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "cn-context-menu-sub-trigger flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-sub-trigger"
      data-inset={local.inset}
      {...others}
    >
      {local.children}
      <IconPlaceholder class="ml-auto" lucide="ChevronRightIcon" tabler="IconChevronRight" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

type ContextMenuSubContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuSubContentProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuSubContent = <T extends ValidComponent = "div">(
  props: ContextMenuSubContentProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuSubContentProps, ["class"])
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        class={cn(
          "cn-context-menu-sub-content cn-context-menu-subcontent z-50 max-h-(--kb-popper-available-height) origin-(--kb-menu-content-transform-origin) overflow-x-hidden overflow-y-auto outline-none",
          local.class
        )}
        data-slot="context-menu-sub-content"
        {...others}
      />
    </ContextMenuPrimitive.Portal>
  )
}

type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuCheckboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: ContextMenuCheckboxItemProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuCheckboxItemProps, ["class", "children"])
  return (
    <ContextMenuPrimitive.CheckboxItem
      class={cn(
        "cn-context-menu-checkbox-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-checkbox-item"
      {...others}
    >
      <span class="cn-context-menu-item-indicator pointer-events-none">
        <ContextMenuPrimitive.ItemIndicator>
          <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

type ContextMenuRadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuRadioGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuRadioGroup = <T extends ValidComponent = "div">(
  props: ContextMenuRadioGroupProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuRadioGroupProps, ["class"])
  return (
    <ContextMenuPrimitive.RadioGroup
      class={local.class}
      data-slot="context-menu-radio-group"
      {...others}
    />
  )
}

type ContextMenuRadioItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuRadioItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const ContextMenuRadioItem = <T extends ValidComponent = "div">(
  props: ContextMenuRadioItemProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuRadioItemProps, ["class", "children"])
  return (
    <ContextMenuPrimitive.RadioItem
      class={cn(
        "cn-context-menu-radio-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class
      )}
      data-slot="context-menu-radio-item"
      {...others}
    >
      <span class="cn-context-menu-item-indicator pointer-events-none">
        <ContextMenuPrimitive.ItemIndicator>
          <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  )
}

type ContextMenuSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  ContextMenuPrimitive.ContextMenuSeparatorProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ContextMenuSeparator = <T extends ValidComponent = "hr">(
  props: ContextMenuSeparatorProps<T>
) => {
  const [local, others] = splitProps(props as ContextMenuSeparatorProps, ["class"])
  return (
    <ContextMenuPrimitive.Separator
      class={cn("cn-context-menu-separator", local.class)}
      data-slot="context-menu-separator"
      {...others}
    />
  )
}

type ContextMenuShortcutProps = ComponentProps<"span">

const ContextMenuShortcut = (props: ContextMenuShortcutProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <span
      class={cn("cn-context-menu-shortcut", local.class)}
      data-slot="context-menu-shortcut"
      {...others}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup
}
