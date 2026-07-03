import { lazy, Match, Show, splitProps, Suspense, Switch, type ComponentProps } from "solid-js"

import { useDesignSystem } from "~/hooks/use-design-system"
import type { IconLibraryName } from "~/registry/icon-libraries"

const IconLucide = lazy(() =>
  import("~/registry/icons/icon-lucide").then((mod) => ({
    default: mod.IconLucide
  }))
)

const IconTabler = lazy(() =>
  import("~/registry/icons/icon-tabler").then((mod) => ({
    default: mod.IconTabler
  }))
)

function SquarePlaceholder(props: ComponentProps<"svg">) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="18" rx="2" width="18" x="3" y="3" />
    </svg>
  )
}

type IconPlaceholderProps = {
  [K in IconLibraryName]?: string
} & ComponentProps<"svg">

export function IconPlaceholder(props: IconPlaceholderProps) {
  const [local, others] = splitProps(props, ["lucide", "tabler"])
  const { previewIconLibrary } = useDesignSystem()

  return (
    <Suspense fallback={<SquarePlaceholder {...others} />}>
      <Show when={local[previewIconLibrary()]}>
        {(iconName) => (
          <Switch>
            <Match when={previewIconLibrary() === "lucide"}>
              <IconLucide name={iconName()} {...others} />
            </Match>
            <Match when={previewIconLibrary() === "tabler"}>
              <IconTabler name={iconName()} {...others} />
            </Match>
          </Switch>
        )}
      </Show>
    </Suspense>
  )
}
