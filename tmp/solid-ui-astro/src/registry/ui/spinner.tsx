import { splitProps, type ComponentProps } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type SpinnerProps = ComponentProps<"svg"> & {
  class?: string | undefined
}

const Spinner = (props: SpinnerProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <IconPlaceholder
      role="status"
      aria-label="Loading"
      class={cn("cn-spinner size-4 animate-spin", local.class)}
      data-slot="spinner"
      lucide="LoaderCircleIcon"
      tabler="IconLoader"
      {...others}
    />
  )
}

export { Spinner, type SpinnerProps }
