import * as CheckboxPrimitive from "@kobalte/core/checkbox"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { Match, splitProps, Switch, type ComponentProps, type ValidComponent } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"

type CheckboxProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  Omit<CheckboxPrimitive.CheckboxRootProps<T>, "children">
> &
  Pick<ComponentProps<T>, "class"> & {
    "aria-invalid"?: ComponentProps<"div">["aria-invalid"]
  }

const Checkbox = <T extends ValidComponent = "div">(props: CheckboxProps<T>) => {
  const [local, others] = splitProps(props as CheckboxProps, ["class", "aria-invalid", "id"])

  return (
    <CheckboxPrimitive.Root data-slot="checkbox-root" {...others}>
      <CheckboxPrimitive.Input data-slot="checkbox-input" id={local.id} />
      <CheckboxPrimitive.Control
        aria-invalid={local["aria-invalid"]}
        class={cn(
          "cn-checkbox peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
          local.class
        )}
        data-slot="checkbox"
      >
        <Switch>
          <Match when={!others.indeterminate /* checked */}>
            <CheckboxPrimitive.Indicator
              class="cn-checkbox-indicator"
              data-slot="checkbox-indicator"
            >
              <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" />
            </CheckboxPrimitive.Indicator>
          </Match>
          <Match when={others.indeterminate}>
            <CheckboxPrimitive.Indicator
              class="cn-checkbox-indicator"
              data-slot="checkbox-indicator"
            >
              <IconPlaceholder lucide="Minus" tabler="IconMinus" />
            </CheckboxPrimitive.Indicator>
          </Match>
        </Switch>
      </CheckboxPrimitive.Control>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, type CheckboxProps }
