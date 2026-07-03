import { LoaderIcon } from "lucide-solid"
import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

const CustomSpinner = (props: ComponentProps<"svg">) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      class={cn("size-4 animate-spin", local.class)}
      {...others}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div class="flex items-center gap-4">
      <CustomSpinner />
    </div>
  )
}
