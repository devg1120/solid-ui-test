import { useColorMode } from "@kobalte/core"
import { type Component, type ComponentProps } from "solid-js"
import { Toaster as Sonner } from "solid-sonner"

import { IconPlaceholder } from "~/components/icon-placeholder"

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster: Component<ToasterProps> = (props) => {
  const { colorMode } = useColorMode()

  return (
    <Sonner
      theme={colorMode()}
      position="top-center"
      class="toaster group"
      icons={{
        success: (
          <IconPlaceholder class="size-4" lucide="CircleCheckIcon" tabler="IconCircleCheck" />
        ),
        info: <IconPlaceholder class="size-4" lucide="InfoIcon" tabler="IconInfoCircle" />,
        warning: (
          <IconPlaceholder class="size-4" lucide="TriangleAlertIcon" tabler="IconAlertTriangle" />
        ),
        error: <IconPlaceholder class="size-4" lucide="OctagonXIcon" tabler="IconAlertOctagon" />,
        loading: (
          <IconPlaceholder class="size-4 animate-spin" lucide="Loader2Icon" tabler="IconLoader" />
        )
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      }}
      toastOptions={{
        classNames: {
          toast: "cn-toast"
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
