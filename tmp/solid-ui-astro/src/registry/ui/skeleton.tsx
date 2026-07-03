import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

const Skeleton = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div class={cn("cn-skeleton animate-pulse", local.class)} data-slot="skeleton" {...others} />
  )
}

export { Skeleton }
