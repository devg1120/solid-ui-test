import { cva, type VariantProps } from "class-variance-authority"
import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

const alertVariants = cva("group/alert cn-alert", {
  variants: {
    variant: {
      default: "cn-alert-variant-default",
      destructive: "cn-alert-variant-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>

const Alert = (props: AlertProps) => {
  const [local, others] = splitProps(props, ["class", "variant"])

  return (
    <div
      class={cn(alertVariants({ variant: local.variant }), local.class)}
      data-slot="alert"
      role="alert"
      {...others}
    />
  )
}

type AlertTitleProps = ComponentProps<"h5">

const AlertTitle = (props: AlertTitleProps) => {
  const [local, others] = splitProps(props, ["class"])
  return <h5 class={cn("cn-alert-title", local.class)} data-slot="alert-title" {...others} />
}

type AlertDescriptionProps = ComponentProps<"div">

const AlertDescription = (props: AlertDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("cn-alert-description", local.class)}
      data-slot="alert-description"
      {...others}
    />
  )
}

type AlertActionProps = ComponentProps<"div">

const AlertAction = (props: AlertActionProps) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("cn-alert-action", local.class)} data-slot="alert-action" {...others} />
}

export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  alertVariants,
  type AlertActionProps,
  type AlertDescriptionProps,
  type AlertProps,
  type AlertTitleProps
}
