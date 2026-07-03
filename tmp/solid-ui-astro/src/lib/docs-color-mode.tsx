import { ColorModeProvider, useColorMode, type ColorModeStorageManager } from "@kobalte/core"
import { createEffect, onCleanup, onMount, type ParentProps } from "solid-js"
import { isServer } from "solid-js/web"

import {
  DARK_THEME,
  DOCS_COLOR_MODE_CHANGE_EVENT,
  LIGHT_THEME,
  STORAGE_KEYS,
  THEME_DARK_CLASS
} from "~/hooks/use-design-system"

export type DocsColorMode = typeof LIGHT_THEME | typeof DARK_THEME

function isDocsColorMode(value: string | null | undefined): value is DocsColorMode {
  return value === LIGHT_THEME || value === DARK_THEME
}

function getResolvedDocsTheme(): DocsColorMode {
  if (isServer) {
    return LIGHT_THEME
  }

  return document.documentElement.classList.contains(THEME_DARK_CLASS) ? DARK_THEME : LIGHT_THEME
}

function applyDocsTheme(value: DocsColorMode) {
  if (isServer) {
    return
  }

  const root = document.documentElement

  root.classList.toggle(THEME_DARK_CLASS, value === DARK_THEME)
  root.style.colorScheme = value
}

function dispatchDocsColorModeChange(value: DocsColorMode) {
  if (isServer) {
    return
  }

  window.dispatchEvent(
    new CustomEvent<DocsColorMode>(DOCS_COLOR_MODE_CHANGE_EVENT, { detail: value })
  )
}

function getStoredDocsColorMode() {
  if (isServer) {
    return null
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEYS.theme)

    return isDocsColorMode(value) ? value : null
  } catch {
    return null
  }
}

// Docs previews still use the site's html.dark selector, so this keeps Kobalte in sync.
const docsColorModeStorageManager: ColorModeStorageManager = {
  ssr: false,
  type: "localStorage",
  get: () => getStoredDocsColorMode() ?? getResolvedDocsTheme(),
  set: (value) => {
    if (isServer || !isDocsColorMode(value)) {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, value)
    } catch {
      // don't do anything
    }
  }
}

function DocsColorModeBridge(props: { controlsDocument?: boolean }) {
  const { colorMode, setColorMode } = useColorMode()

  onMount(() => {
    if (props.controlsDocument) {
      return
    }

    setColorMode(getResolvedDocsTheme())

    const handleColorModeChange = (event: Event) => {
      const value = (event as CustomEvent<DocsColorMode>).detail

      if (isDocsColorMode(value)) {
        setColorMode(value)
      }
    }

    window.addEventListener(DOCS_COLOR_MODE_CHANGE_EVENT, handleColorModeChange)

    onCleanup(() => {
      window.removeEventListener(DOCS_COLOR_MODE_CHANGE_EVENT, handleColorModeChange)
    })
  })

  createEffect(() => {
    if (!props.controlsDocument) {
      return
    }

    const value = colorMode()

    if (!isDocsColorMode(value)) {
      return
    }

    applyDocsTheme(value)
    dispatchDocsColorModeChange(value)
  })

  return null
}

export function DocsColorModeProvider(props: ParentProps<{ controlsDocument?: boolean }>) {
  return (
    <ColorModeProvider storageManager={docsColorModeStorageManager}>
      <DocsColorModeBridge controlsDocument={props.controlsDocument} />
      {props.children}
    </ColorModeProvider>
  )
}
