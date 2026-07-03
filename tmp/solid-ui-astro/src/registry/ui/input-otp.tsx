import OtpField, { type RootProps as OtpFieldRootProps } from "@corvu/otp-field"
import { Show, splitProps, type ComponentProps } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type InputOTPProps = OtpFieldRootProps &
  ComponentProps<"div"> &
  Pick<ComponentProps<"input">, "disabled" | "required" | "pattern"> & {
    containerClass?: string
  }

const InputOTP = (props: InputOTPProps) => {
  const [local, others] = splitProps(props as InputOTPProps, [
    "class",
    "containerClass",
    "children",
    "id",
    "disabled",
    "required",
    "pattern"
  ])

  return (
    <OtpField
      class={cn("cn-input-otp flex items-center has-disabled:opacity-50", local.containerClass)}
      data-slot="input-otp"
      spellcheck={false}
      {...others}
    >
      <OtpField.Input
        class={cn("cn-input-otp-input disabled:cursor-not-allowed", local.class)}
        data-slot="input-otp-input"
        disabled={local.disabled}
        id={local.id}
        pattern={local.pattern}
        required={local.required}
        spellcheck={false}
      />
      {local.children}
    </OtpField>
  )
}

type InputOTPGroupProps = ComponentProps<"div">

const InputOTPGroup = (props: InputOTPGroupProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn("cn-input-otp-group flex items-center", local.class)}
      data-slot="input-otp-group"
      {...others}
    />
  )
}

type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number
}

const InputOTPSlot = (props: InputOTPSlotProps) => {
  const [local, others] = splitProps(props, ["index", "class"])
  const context = OtpField.useContext()

  const char = () => context.value()[local.index]
  const isActive = () => context.activeSlots().includes(local.index)
  const showCaret = () => isActive() && context.isInserting()

  return (
    <div
      class={cn(
        "cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10",
        local.class
      )}
      data-active={isActive()}
      data-slot="input-otp-slot"
      {...others}
    >
      {char()}
      <Show when={showCaret()}>
        <div class="cn-input-otp-caret pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="cn-input-otp-caret-line" />
        </div>
      </Show>
    </div>
  )
}

type InputOTPSeparatorProps = ComponentProps<"div">

const InputOTPSeparator = (props: InputOTPSeparatorProps) => {
  const [local, others] = splitProps(props, ["class"])

  return (
    <div
      class={cn("cn-input-otp-separator flex items-center", local.class)}
      data-slot="input-otp-separator"
      role="separator"
      {...others}
    >
      <IconPlaceholder class="size-4" lucide="MinusIcon" tabler="IconMinus" />
    </div>
  )
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  type InputOTPGroupProps,
  type InputOTPProps,
  type InputOTPSeparatorProps,
  type InputOTPSlotProps
}
