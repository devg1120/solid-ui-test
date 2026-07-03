import { Show, Suspense } from "solid-js"
import { Dynamic } from "solid-js/web"

import { Index } from "~/registry/__index__"

type ComponentPreviewRendererProps = {
  name: string
}

export function ComponentPreviewRenderer(props: ComponentPreviewRendererProps) {
  return (
    <Show when={props.name} keyed>
      {(name) => {
        const resolvedComponent = Index[name]?.component

        return (
          <Suspense fallback={null}>
            <Dynamic component={resolvedComponent} />
          </Suspense>
        )
      }}
    </Show>
  )
}
