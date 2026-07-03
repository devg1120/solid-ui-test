import { cva, type VariantProps } from "class-variance-authority"
import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type JSX,
  type ValidComponent
} from "solid-js"
import { Dynamic } from "solid-js/web"

import { cn } from "~/lib/utils"
import { Separator, type SeparatorProps } from "~/registry/ui/separator"

type ItemGroupProps = ComponentProps<"div">

const ItemGroup = (props: ItemGroupProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("group/item-group cn-item-group flex w-full flex-col", local.class)}
      data-slot="item-group"
      role="list"
      {...others}
    />
  )
}

type ItemSeparatorProps = SeparatorProps

const ItemSeparator = (props: ItemSeparatorProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <Separator
      class={cn("cn-item-separator", local.class)}
      data-slot="item-separator"
      orientation="horizontal"
      {...others}
    />
  )
}

const itemVariants = cva(
  "group/item cn-item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
  {
    variants: {
      variant: {
        default: "cn-item-variant-default",
        outline: "cn-item-variant-outline",
        muted: "cn-item-variant-muted"
      },
      size: {
        default: "cn-item-size-default",
        sm: "cn-item-size-sm",
        xs: "cn-item-size-xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ItemProps<T extends ValidComponent = "div"> = {
  as?: T
  class?: string | undefined
  children?: JSX.Element
} & VariantProps<typeof itemVariants> &
  Omit<ComponentProps<T>, "as" | "class" | "children">

const Item = <T extends ValidComponent = "div">(rawProps: ItemProps<T>) => {
  const props = mergeProps(
    { as: "div" as T, variant: "default", size: "default" } as const,
    rawProps
  )
  const [local, others] = splitProps(props as ItemProps, ["as", "class", "variant", "size"])

  return (
    <Dynamic
      class={cn(itemVariants({ variant: local.variant, size: local.size }), local.class)}
      component={local.as}
      data-size={local.size}
      data-slot="item"
      data-variant={local.variant}
      {...others}
    />
  )
}

const itemMediaVariants = cva(
  "cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "cn-item-media-variant-default",
        icon: "cn-item-media-variant-icon",
        image: "cn-item-media-variant-image"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type ItemMediaProps = ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>

const ItemMedia = (rawProps: ItemMediaProps) => {
  const props = mergeProps({ variant: "default" } as const, rawProps)
  const [local, others] = splitProps(props, ["class", "variant"])

  return (
    <div
      class={cn(itemMediaVariants({ variant: local.variant }), local.class)}
      data-slot="item-media"
      data-variant={local.variant}
      {...others}
    />
  )
}

type ItemContentProps = ComponentProps<"div">

const ItemContent = (props: ItemContentProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
        local.class
      )}
      data-slot="item-content"
      {...others}
    />
  )
}

type ItemTitleProps = ComponentProps<"div">

const ItemTitle = (props: ItemTitleProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-title line-clamp-1 flex w-fit items-center", local.class)}
      data-slot="item-title"
      {...others}
    />
  )
}

type ItemDescriptionProps = ComponentProps<"p">

const ItemDescription = (props: ItemDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn(
        "cn-item-description line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        local.class
      )}
      data-slot="item-description"
      {...others}
    />
  )
}

type ItemActionsProps = ComponentProps<"div">

const ItemActions = (props: ItemActionsProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-actions flex items-center", local.class)}
      data-slot="item-actions"
      {...others}
    />
  )
}

type ItemHeaderProps = ComponentProps<"div">

const ItemHeader = (props: ItemHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-header flex basis-full items-center justify-between", local.class)}
      data-slot="item-header"
      {...others}
    />
  )
}

type ItemFooterProps = ComponentProps<"div">

const ItemFooter = (props: ItemFooterProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-item-footer flex basis-full items-center justify-between", local.class)}
      data-slot="item-footer"
      {...others}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
  itemVariants,
  itemMediaVariants
}
