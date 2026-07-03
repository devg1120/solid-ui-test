import {
  Close,
  Content,
  Description,
  Label,
  Overlay,
  Portal,
  Root,
  Trigger,
  useContext,
  type CloseProps,
  type ContentProps,
  type DescriptionProps,
  type DynamicProps,
  type LabelProps,
  type OverlayProps,
  type RootProps,
  type TriggerProps
} from "@corvu/drawer"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { cn } from "~/lib/utils"

type DrawerRootProps<T extends ValidComponent = "div"> = DynamicProps<T, RootProps>

const DrawerRoot = <T extends ValidComponent = "div">(props: DrawerRootProps<T>) => {
  return <Root data-slot="drawer" {...(props as RootProps)} />
}

type DrawerTriggerProps<T extends ValidComponent = "button"> = DynamicProps<T, TriggerProps>

const DrawerTrigger = <T extends ValidComponent = "button">(props: DrawerTriggerProps<T>) => {
  return <Trigger data-slot="drawer-trigger" {...(props as TriggerProps)} />
}

type DrawerCloseProps<T extends ValidComponent = "button"> = DynamicProps<T, CloseProps>

const DrawerClose = <T extends ValidComponent = "button">(props: DrawerCloseProps<T>) => {
  return <Close data-slot="drawer-close" {...(props as CloseProps)} />
}

type DrawerOverlayProps<T extends ValidComponent = "div"> = DynamicProps<T, OverlayProps> &
  Pick<ComponentProps<T>, "class">

const DrawerOverlay = <T extends ValidComponent = "div">(props: DrawerOverlayProps<T>) => {
  const [local, others] = splitProps(props as DrawerOverlayProps, ["class"])
  const context = useContext()

  return (
    <Overlay
      data-slot="drawer-overlay"
      class={cn("cn-drawer-overlay fixed inset-0 z-50", local.class)}
      style={{
        "background-color": `rgb(0 0 0 / ${0.1 * context.openPercentage()})`,
        "backdrop-filter": `blur(${4 * context.openPercentage()}px)`
      }}
      {...others}
    />
  )
}

type DrawerContentProps<T extends ValidComponent = "div"> = DynamicProps<T, ContentProps> &
  Pick<ComponentProps<T>, "class" | "children">

const DrawerContent = <T extends ValidComponent = "div">(props: DrawerContentProps<T>) => {
  const [local, others] = splitProps(props as DrawerContentProps, ["class", "children"])

  return (
    <Portal data-slot="drawer-portal">
      <DrawerOverlay />
      <Content
        data-slot="drawer-content"
        class={cn("group/drawer-content cn-drawer-content fixed z-50", local.class)}
        {...others}
      >
        <div class="cn-drawer-handle mx-auto hidden shrink-0 bg-muted group-data-[side=bottom]/drawer-content:block" />
        {local.children}
      </Content>
    </Portal>
  )
}

type DrawerHeaderProps = ComponentProps<"div">

const DrawerHeader = (props: DrawerHeaderProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="drawer-header"
      class={cn("cn-drawer-header flex flex-col", local.class)}
      {...others}
    />
  )
}

type DrawerFooterProps = ComponentProps<"div">

const DrawerFooter = (props: DrawerFooterProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      data-slot="drawer-footer"
      class={cn("cn-drawer-footer mt-auto flex flex-col", local.class)}
      {...others}
    />
  )
}

type DrawerLabelProps<T extends ValidComponent = "h2"> = DynamicProps<T, LabelProps> &
  Pick<ComponentProps<T>, "class">

const DrawerLabel = <T extends ValidComponent = "h2">(props: DrawerLabelProps<T>) => {
  const [local, others] = splitProps(props as DrawerLabelProps, ["class"])

  return <Label data-slot="drawer-title" class={cn("cn-drawer-title", local.class)} {...others} />
}

type DrawerDescriptionProps<T extends ValidComponent = "p"> = DynamicProps<T, DescriptionProps> &
  Pick<ComponentProps<T>, "class">

const DrawerDescription = <T extends ValidComponent = "p">(props: DrawerDescriptionProps<T>) => {
  const [local, others] = splitProps(props as DrawerDescriptionProps, ["class"])

  return (
    <Description
      data-slot="drawer-description"
      class={cn("cn-drawer-description", local.class)}
      {...others}
    />
  )
}

export {
  DrawerRoot as Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel as DrawerTitle,
  DrawerOverlay,
  DrawerTrigger
}
