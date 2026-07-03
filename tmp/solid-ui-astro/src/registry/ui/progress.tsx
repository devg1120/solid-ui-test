import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import * as ProgressPrimitive from "@kobalte/core/progress"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"

import { cn } from "~/lib/utils"

type ProgressProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressPrimitive.ProgressRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const Progress = <T extends ValidComponent = "div">(props: ProgressProps<T>) => {
  const [local, others] = splitProps(props as ProgressProps, ["class", "children"])

  return (
    <ProgressPrimitive.Root data-slot="progress" class={cn("w-full", local.class)} {...others}>
      {local.children}
      <ProgressPrimitive.Track
        data-slot="progress-track"
        class={cn("cn-progress cn-progress-track relative overflow-hidden")}
      >
        <ProgressPrimitive.Fill
          data-slot="progress-indicator"
          class={cn("cn-progress-indicator h-full w-(--kb-progress-fill-width) transition-all")}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  )
}

type ProgressLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ProgressPrimitive.ProgressLabelProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">

const ProgressLabel = <T extends ValidComponent = "span">(props: ProgressLabelProps<T>) => {
  const [local, others] = splitProps(props as ProgressLabelProps, ["class"])
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      class={cn("cn-progress-label", local.class)}
      {...others}
    />
  )
}

type ProgressValueProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressPrimitive.ProgressValueLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">

const ProgressValue = <T extends ValidComponent = "div">(props: ProgressValueProps<T>) => {
  const [local, others] = splitProps(props as ProgressValueProps, ["class"])
  return (
    <ProgressPrimitive.ValueLabel
      data-slot="progress-value"
      class={cn("cn-progress-value", local.class)}
      {...others}
    />
  )
}

export {
  Progress,
  ProgressLabel,
  ProgressValue,
  type ProgressLabelProps,
  type ProgressProps,
  type ProgressValueProps
}
