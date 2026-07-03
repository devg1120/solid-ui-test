import * as CollapsiblePrimitive from "@kobalte/core/collapsible"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"

type CollapsibleProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleRootProps<T>
> &
  Pick<ComponentProps<T>, "class">

const Collapsible = <T extends ValidComponent = "div">(props: CollapsibleProps<T>) => {
  const [local, others] = splitProps(props as CollapsibleProps, ["class"])

  return <CollapsiblePrimitive.Root class={local.class} data-slot="collapsible" {...others} />
}

type CollapsibleTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const CollapsibleTrigger = <T extends ValidComponent = "button">(
  props: CollapsibleTriggerProps<T>
) => {
  const [local, others] = splitProps(props as CollapsibleTriggerProps, ["class", "children"])

  return (
    <CollapsiblePrimitive.Trigger class={local.class} data-slot="collapsible-trigger" {...others}>
      {local.children}
    </CollapsiblePrimitive.Trigger>
  )
}

type CollapsibleContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const CollapsibleContent = <T extends ValidComponent = "div">(
  props: CollapsibleContentProps<T>
) => {
  const [local, others] = splitProps(props as CollapsibleContentProps, ["class", "children"])

  return (
    <CollapsiblePrimitive.Content class={local.class} data-slot="collapsible-content" {...others}>
      {local.children}
    </CollapsiblePrimitive.Content>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
