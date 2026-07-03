import * as DialogPrimitive from "@kobalte/core/dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  mergeProps,
  Show,
  splitProps,
  type Component,
  type ComponentProps,
  type ValidComponent
} from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"

type SheetProps = DialogPrimitive.DialogRootProps

const Sheet: Component<SheetProps> = (props) => {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

type SheetTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogTriggerProps<T>
>

const SheetTrigger = <T extends ValidComponent = "button">(props: SheetTriggerProps<T>) => {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

type SheetCloseProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogCloseButtonProps<T>
>

const SheetClose = <T extends ValidComponent = "button">(props: SheetCloseProps<T>) => {
  return <DialogPrimitive.CloseButton data-slot="sheet-close" {...props} />
}

type SheetPortalProps = DialogPrimitive.DialogPortalProps

const SheetPortal = (props: SheetPortalProps) => {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

type SheetOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SheetOverlay = <T extends ValidComponent = "div">(props: SheetOverlayProps<T>) => {
  const [local, others] = splitProps(props as SheetOverlayProps, ["class"])

  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      class={cn("cn-sheet-overlay fixed inset-0 isolate z-50", local.class)}
      {...others}
    />
  )
}

type SheetContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    side?: "top" | "right" | "bottom" | "left"
    showCloseButton?: boolean
  }

const SheetContent = <T extends ValidComponent = "div">(props: SheetContentProps<T>) => {
  const mergedProps = mergeProps(
    {
      side: "right",
      showCloseButton: true
    } as SheetContentProps,
    props
  )
  const [local, others] = splitProps(mergedProps as SheetContentProps, [
    "class",
    "children",
    "side",
    "showCloseButton"
  ])

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-side={local.side}
        class={cn("cn-sheet-content", local.class)}
        {...others}
      >
        {local.children}
        <Show when={local.showCloseButton}>
          <DialogPrimitive.CloseButton
            as={Button}
            variant="ghost"
            size="icon-sm"
            data-slot="sheet-close"
            class="cn-sheet-close"
          >
            <IconPlaceholder lucide="XIcon" tabler="IconX" />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

type SheetHeaderProps = ComponentProps<"div">

const SheetHeader = (props: SheetHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="sheet-header"
      class={cn("cn-sheet-header flex flex-col", local.class)}
      {...others}
    />
  )
}

type SheetFooterProps = ComponentProps<"div">

const SheetFooter = (props: SheetFooterProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="sheet-footer"
      class={cn("cn-sheet-footer mt-auto flex flex-col", local.class)}
      {...others}
    />
  )
}

type SheetTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SheetTitle = <T extends ValidComponent = "h2">(props: SheetTitleProps<T>) => {
  const [local, others] = splitProps(props as SheetTitleProps, ["class"])

  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      class={cn("cn-sheet-title", local.class)}
      {...others}
    />
  )
}

type SheetDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const SheetDescription = <T extends ValidComponent = "p">(props: SheetDescriptionProps<T>) => {
  const [local, others] = splitProps(props as SheetDescriptionProps, ["class"])

  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      class={cn("cn-sheet-description", local.class)}
      {...others}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
}
