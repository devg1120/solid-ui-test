import {
  Handle,
  Panel,
  Root,
  type HandleProps,
  type PanelProps,
  type RootProps
} from "@corvu/resizable"
import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

type ResizablePanelGroupProps = RootProps & Pick<ComponentProps<"div">, "class" | "children">

const ResizablePanelGroup = (props: ResizablePanelGroupProps) => {
  const [local, others] = splitProps(props as ResizablePanelGroupProps, ["class"])

  return (
    <Root
      data-slot="resizable-panel-group"
      class={cn(
        "cn-resizable-panel-group flex h-full w-full data-[orientation=vertical]:flex-col",
        local.class
      )}
      {...others}
    />
  )
}

type ResizablePanelProps = PanelProps & Pick<ComponentProps<"div">, "class" | "children">

const ResizablePanel = (props: ResizablePanelProps) => {
  const [local, others] = splitProps(props as ResizablePanelProps, ["class"])

  return (
    <Panel
      data-slot="resizable-panel"
      class={cn("cn-resizable-panel min-w-0", local.class)}
      {...others}
    />
  )
}

type ResizableHandleProps = HandleProps &
  Pick<ComponentProps<"button">, "class" | "children"> & {
    withHandle?: boolean
  }

const ResizableHandle = (props: ResizableHandleProps) => {
  const [local, others] = splitProps(props as ResizableHandleProps, [
    "class",
    "children",
    "withHandle"
  ])

  return (
    <Handle
      data-slot="resizable-handle"
      class={cn(
        "cn-resizable-handle relative flex w-px shrink-0 touch-none items-center justify-center bg-border outline-none select-none",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        "data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:top-1/2 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2",
        "[&[data-orientation=vertical]>div]:rotate-90",
        local.class
      )}
      {...others}
    >
      {local.withHandle && <div class="cn-resizable-handle-icon z-10 flex shrink-0" />}
      {local.children}
    </Handle>
  )
}

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizableHandleProps,
  type ResizablePanelGroupProps,
  type ResizablePanelProps
}
