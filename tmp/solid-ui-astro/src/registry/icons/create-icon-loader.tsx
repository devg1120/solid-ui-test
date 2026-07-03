import {
  createSignal,
  onMount,
  Show,
  splitProps,
  type Component,
  type ComponentProps
} from "solid-js"
import { Dynamic } from "solid-js/web"

import type { IconLibraryName } from "~/registry/icon-libraries"

type IconComponent = Component<ComponentProps<"svg">>
type IconLibraryModule = Record<string, IconComponent>

const iconPromiseCaches = new Map<IconLibraryName, Promise<IconLibraryModule>>()

function loadIconLibrary(libraryName: IconLibraryName) {
  if (!iconPromiseCaches.has(libraryName)) {
    const promise =
      libraryName === "lucide"
        ? import("~/registry/icons/__lucide__").then((mod) => mod.default)
        : import("~/registry/icons/__tabler__").then((mod) => mod.default)

    iconPromiseCaches.set(libraryName, promise)
  }

  return iconPromiseCaches.get(libraryName)!
}

export function createIconLoader(libraryName: IconLibraryName) {
  return function IconLoader(props: { name: string } & ComponentProps<"svg">) {
    const [local, svgProps] = splitProps(props, ["name"])
    const [icons, setIcons] = createSignal<IconLibraryModule>()

    onMount(async () => {
      const loadedIcons = await loadIconLibrary(libraryName)
      setIcons(loadedIcons)
    })

    return (
      <Show
        fallback={<span class="size-4" />}
        when={icons()?.[local.name] as IconComponent | undefined}
      >
        {(IconComponent) => <Dynamic component={IconComponent()} {...svgProps} />}
      </Show>
    )
  }
}
