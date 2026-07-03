import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  mergeProps,
  splitProps,
  type Component,
  type ComponentProps,
  type ValidComponent
} from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

type AlertDialogProps = AlertDialogPrimitive.AlertDialogRootProps

const AlertDialog: Component<AlertDialogProps> = (props) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

type AlertDialogTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogTriggerProps<T>
>

const AlertDialogTrigger = <T extends ValidComponent = "button">(
  props: AlertDialogTriggerProps<T>
) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}

type AlertDialogPortalProps = AlertDialogPrimitive.AlertDialogPortalProps

const AlertDialogPortal = (props: AlertDialogPortalProps) => {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}

type AlertDialogOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AlertDialogOverlay = <T extends ValidComponent = "div">(
  props: AlertDialogOverlayProps<T>
) => {
  const [local, others] = splitProps(props as AlertDialogOverlayProps, ["class"])

  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      class={cn("cn-alert-dialog-overlay fixed inset-0 isolate z-50", local.class)}
      {...others}
    />
  )
}

type AlertDialogContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogContentProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    size?: "default" | "sm"
  }

const AlertDialogContent = <T extends ValidComponent = "div">(
  props: AlertDialogContentProps<T>
) => {
  const mergedProps = mergeProps({ size: "default" } as AlertDialogContentProps, props)
  const [local, others] = splitProps(mergedProps as AlertDialogContentProps, ["class", "size"])

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={local.size}
        class={cn(
          "group/alert-dialog-content cn-alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          local.class
        )}
        {...others}
      />
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = ComponentProps<"div">

const AlertDialogHeader = (props: AlertDialogHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="alert-dialog-header"
      class={cn("cn-alert-dialog-header", local.class)}
      {...others}
    />
  )
}

type AlertDialogFooterProps = ComponentProps<"div">

const AlertDialogFooter = (props: AlertDialogFooterProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="alert-dialog-footer"
      class={cn(
        "cn-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        local.class
      )}
      {...others}
    />
  )
}

type AlertDialogMediaProps = ComponentProps<"div">

const AlertDialogMedia = (props: AlertDialogMediaProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="alert-dialog-media"
      class={cn("cn-alert-dialog-media", local.class)}
      {...others}
    />
  )
}

type AlertDialogTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AlertDialogTitle = <T extends ValidComponent = "h2">(props: AlertDialogTitleProps<T>) => {
  const [local, others] = splitProps(props as AlertDialogTitleProps, ["class"])

  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      class={cn("cn-alert-dialog-title", local.class)}
      {...others}
    />
  )
}

type AlertDialogDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">

const AlertDialogDescription = <T extends ValidComponent = "p">(
  props: AlertDialogDescriptionProps<T>
) => {
  const [local, others] = splitProps(props as AlertDialogDescriptionProps, ["class"])

  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      class={cn("cn-alert-dialog-description", local.class)}
      {...others}
    />
  )
}

type AlertDialogActionProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T>
> &
  Pick<ButtonProps, "variant" | "size" | "class">

const AlertDialogAction = <T extends ValidComponent = "button">(
  props: AlertDialogActionProps<T>
) => {
  const mergedProps = mergeProps(
    { variant: "default", size: "default" } as AlertDialogActionProps,
    props
  )
  const [local, others] = splitProps(mergedProps as AlertDialogActionProps, [
    "class",
    "variant",
    "size"
  ])

  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      data-slot="alert-dialog-action"
      class={cn("cn-alert-dialog-action", local.class)}
      variant={local.variant}
      size={local.size}
      {...others}
    />
  )
}

type AlertDialogCancelProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T>
> &
  Pick<ButtonProps, "variant" | "size" | "class">

const AlertDialogCancel = <T extends ValidComponent = "button">(
  props: AlertDialogCancelProps<T>
) => {
  const mergedProps = mergeProps(
    { variant: "outline", size: "default" } as AlertDialogCancelProps,
    props
  )
  const [local, others] = splitProps(mergedProps as AlertDialogCancelProps, [
    "class",
    "variant",
    "size"
  ])

  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      data-slot="alert-dialog-cancel"
      class={cn("cn-alert-dialog-cancel", local.class)}
      variant={local.variant}
      size={local.size}
      {...others}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
}
