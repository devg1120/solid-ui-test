import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

type KbdProps = ComponentProps<"kbd">

const Kbd = (props: KbdProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <kbd
      class={cn(
        "cn-kbd pointer-events-none inline-flex items-center justify-center select-none",
        local.class
      )}
      data-slot="kbd"
      {...others}
    />
  )
}

type KbdGroupProps = ComponentProps<"div">

const KbdGroup = (props: KbdGroupProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn("cn-kbd-group inline-flex items-center", local.class)}
      data-slot="kbd-group"
      {...others}
    />
  )
}

export { Kbd, KbdGroup, type KbdProps, type KbdGroupProps }
