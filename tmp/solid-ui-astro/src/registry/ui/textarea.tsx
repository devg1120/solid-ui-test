import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "~/lib/utils"

type TextareaProps = ComponentProps<"textarea">

const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, ["class", "rows"])

  return (
    <textarea
      data-slot="textarea"
      class={cn(
        "cn-textarea flex min-h-16 w-full outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        local.rows == null && "field-sizing-content",
        local.class
      )}
      rows={local.rows}
      {...others}
    />
  )
}

export { Textarea, type TextareaProps }
