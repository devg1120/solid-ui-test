import { useColorMode } from "@kobalte/core"

import { DARK_THEME, LIGHT_THEME } from "~/hooks/use-design-system"
import { DocsColorModeProvider } from "~/lib/docs-color-mode"

function ModeToggleButton() {
  const { colorMode, setColorMode } = useColorMode()
  const isDark = () => colorMode() === DARK_THEME

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark()}
      class="group/toggle cn-button cn-button-variant-ghost cn-button-size-icon extend-touch-target inline-flex size-8 shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      title={isDark() ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setColorMode(isDark() ? LIGHT_THEME : DARK_THEME)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4.5"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span class="sr-only">Toggle theme</span>
    </button>
  )
}

export default function ModeToggle() {
  return (
    <DocsColorModeProvider controlsDocument>
      <ModeToggleButton />
    </DocsColorModeProvider>
  )
}
