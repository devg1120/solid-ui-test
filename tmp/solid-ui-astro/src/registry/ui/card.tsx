import { mergeProps, splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

type CardProps = ComponentProps<"div"> & {
  size?: "default" | "sm"
}

const Card = (props: CardProps) => {
  const mergedProps = mergeProps({ size: "default" } as const, props)
  const [local, others] = splitProps(mergedProps, ["class", "size"])

  return (
    <div
      class={cn("cn-card group/card flex flex-col", local.class)}
      data-size={local.size}
      data-slot="card"
      {...others}
    />
  )
}

const CardHeader = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "cn-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        local.class
      )}
      data-slot="card-header"
      {...others}
    />
  )
}

const CardTitle = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("cn-card-title", local.class)} data-slot="card-title" {...others} />
}

const CardDescription = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div class={cn("cn-card-description", local.class)} data-slot="card-description" {...others} />
  )
}

const CardAction = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "cn-card-action col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        local.class
      )}
      data-slot="card-action"
      {...others}
    />
  )
}

const CardContent = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("cn-card-content", local.class)} data-slot="card-content" {...others} />
}

const CardFooter = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-card-footer flex items-center", local.class)}
      data-slot="card-footer"
      {...others}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps
}
