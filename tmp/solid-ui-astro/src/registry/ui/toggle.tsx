import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { ToggleButton, type ToggleButtonRootProps } from "@kobalte/core/toggle-button"
import { cva, type VariantProps } from "class-variance-authority"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { cn } from "~/lib/utils"

const toggleVariants = cva(
  "group/toggle cn-toggle inline-flex items-center justify-center whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cn-toggle-variant-default",
        outline: "cn-toggle-variant-outline"
      },
      size: {
        default: "cn-toggle-size-default",
        sm: "cn-toggle-size-sm",
        lg: "cn-toggle-size-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ToggleProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ToggleButtonRootProps<T>
> &
  VariantProps<typeof toggleVariants> &
  Pick<ComponentProps<T>, "class">

const Toggle = <T extends ValidComponent = "button">(props: ToggleProps<T>) => {
  const [local, others] = splitProps(props as ToggleProps, ["variant", "size", "class"])

  return (
    <ToggleButton
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
      data-slot="toggle"
      {...others}
    />
  )
}

export { Toggle, type ToggleProps, toggleVariants }
