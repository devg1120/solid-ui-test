import { CheckIcon, CopyIcon } from "lucide-solid"
import { createEffect, createSignal, mergeProps, Show, splitProps } from "solid-js"

import { cn } from "~/lib/utils"
import { Button, type ButtonProps } from "~/registry/ui/button"

export function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

type CopyButtonProps = ButtonProps & {
  value: string
  src?: string
  tooltip?: string
}

export function CopyButton(rawProps: CopyButtonProps) {
  const props = mergeProps({ variant: "ghost" } as const, rawProps)
  const [local, others] = splitProps(props, ["value", "class", "variant"])

  const [hasCopied, setHasCopied] = createSignal(false)

  createEffect(() => {
    if (hasCopied()) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  })

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied()}
      size="icon"
      variant={local.variant}
      class={cn(
        "absolute top-3 right-2 z-10 size-7 bg-code hover:opacity-100 focus-visible:opacity-100",
        local.class
      )}
      onClick={() => {
        copyToClipboardWithMeta(local.value)
        setHasCopied(true)
      }}
      {...others}
    >
      <span class="sr-only">Copy</span>
      <Show when={hasCopied()} fallback={<CopyIcon />}>
        <CheckIcon />
      </Show>
    </Button>
  )
}
