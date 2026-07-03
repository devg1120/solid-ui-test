import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  type JSX
} from "solid-js"

import { ComponentPreviewRenderer } from "~/components/component-preview-renderer"
import { copyToClipboardWithMeta } from "~/components/copy-button"
import { IconPlaceholder } from "~/components/icon-placeholder"
import {
  DARK_THEME,
  DesignSystemProvider,
  useDesignSystem,
  useDocumentDesignSystem
} from "~/hooks/use-design-system"
import {
  BASE_COLORS,
  buildPreviewTheme,
  DEFAULT_CREATE_CONFIG,
  DEFAULT_CREATE_ITEM,
  FONTS,
  getAvailableIconLibraryOptions,
  getThemesForBaseColor,
  isInvertedMenuColor,
  isTranslucentMenuColor,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  SUPPORTED_ICON_LIBRARY_NAMES
} from "~/lib/create/config"
import type { CreateNavigationItem } from "~/lib/create/navigation"
import { isPresetCode } from "~/lib/create/preset"
import { parseCreateSearchParams, serializeCreateSearchParams } from "~/lib/create/url-state"
import { cn } from "~/lib/utils"
import { Index } from "~/registry/__index__"
import { useIsMobile } from "~/registry/hooks/use-mobile"
import { STYLES } from "~/registry/styles"
import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "~/registry/ui/alert-dialog"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/registry/ui/card"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList
} from "~/registry/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~/registry/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { FieldGroup, FieldSeparator } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"

const LEGACY_OPTION_LABELS = {
  gray: "Gray (Legacy)",
  hugeicons: "Hugeicons (Unsupported)",
  phosphor: "Phosphor (Unsupported)",
  remixicon: "Remix Icon (Unsupported)"
} as const

type LockableField =
  | "style"
  | "baseColor"
  | "themeName"
  | "chartColor"
  | "iconLibrary"
  | "font"
  | "fontHeading"
  | "radius"
  | "menuAccent"
  | "menuColor"

const PRESET_PREVIEW_ITEMS = [
  { label: "01", value: "preview-02" },
  { label: "02", value: "preview" }
] as const

const PRESET_PREVIEW_ITEM_VALUES = new Set<string>(PRESET_PREVIEW_ITEMS.map((item) => item.value))
const CREATE_CANVAS_ITEM_VALUES = new Set<string>(["field-example", "item-example"])
const BASE_COLOR_NAME_SET = new Set<string>(BASE_COLORS.map((baseColor) => baseColor.name))
const MAC_OS_PATTERN = /Mac|iPhone|iPad|iPod/

function formatItemTitle(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function randomItem<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)]
}

function withCurrentOption(
  options: { value: string; label: string }[],
  currentValue: string,
  fallbackLabel?: string
) {
  if (options.some((option) => option.value === currentValue)) {
    return options
  }

  return [
    { value: currentValue, label: fallbackLabel ?? formatItemTitle(currentValue) },
    ...options
  ]
}

function shouldIgnoreKeydownTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable) ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

type PickerOption = {
  value: string
  label: string
  disabled?: boolean
  indicator?: JSX.Element
  style?: JSX.CSSProperties
}

type PickerGroupDefinition = {
  label?: string
  onChange?: (value: string) => void
  options: PickerOption[]
  separatorBefore?: boolean
  value?: string
}

type MenuColorChoice = "default" | "inverted"
type MenuSurfaceChoice = "solid" | "translucent"

function capitalizeLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function getOptionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
  fallback?: string
) {
  return (
    options.find((option) => option.value === value)?.label ?? fallback ?? formatItemTitle(value)
  )
}

function groupFontOptions(options: readonly PickerOption[]) {
  const groups = new Map<string, PickerOption[]>()

  for (const option of options) {
    const type =
      option.value === "inherit"
        ? "inherit"
        : FONTS.find((font) => font.value === option.value)?.type

    if (!type || type === "inherit") {
      continue
    }

    const existing = groups.get(type)
    if (existing) {
      existing.push(option)
      continue
    }

    groups.set(type, [option])
  }

  return Array.from(groups.entries()).map(([type, items]) => ({
    label: capitalizeLabel(type),
    options: items
  }))
}

function createThemeGroups(options: readonly PickerOption[]) {
  const baseThemes = options.filter((option) => BASE_COLOR_NAME_SET.has(option.value))
  const accentThemes = options.filter((option) => !BASE_COLOR_NAME_SET.has(option.value))

  const groups: PickerGroupDefinition[] = []

  if (baseThemes.length > 0) {
    groups.push({ options: baseThemes })
  }

  if (accentThemes.length > 0) {
    groups.push({ options: accentThemes, separatorBefore: groups.length > 0 })
  }

  return groups
}

function getMenuColorChoice(menuColor: string): MenuColorChoice {
  return menuColor === "inverted" || menuColor === "inverted-translucent" ? "inverted" : "default"
}

function getMenuSurfaceChoice(menuColor: string): MenuSurfaceChoice {
  return menuColor === "default-translucent" || menuColor === "inverted-translucent"
    ? "translucent"
    : "solid"
}

function getMenuColorValue(
  colorChoice: MenuColorChoice,
  surfaceChoice: MenuSurfaceChoice
): "default" | "default-translucent" | "inverted" | "inverted-translucent" {
  if (colorChoice === "default") {
    return surfaceChoice === "translucent" ? "default-translucent" : "default"
  }

  return surfaceChoice === "translucent" ? "inverted-translucent" : "inverted"
}

function getMenuColorDisplayLabel(menuColor: string) {
  switch (menuColor) {
    case "default":
      return "Default / Solid"
    case "default-translucent":
      return "Default / Translucent"
    case "inverted":
      return "Inverted / Solid"
    case "inverted-translucent":
      return "Inverted / Translucent"
    default:
      return formatItemTitle(menuColor)
  }
}

function getBaseColorSwatch(baseColor: { cssVars: { dark: Record<string, string> } } | undefined) {
  return baseColor?.cssVars.dark["muted-foreground"]
}

function getThemeSwatch(
  theme: { name: string; cssVars: { dark: Record<string, string> } } | undefined
) {
  if (!theme) {
    return undefined
  }

  return theme.cssVars.dark[BASE_COLOR_NAME_SET.has(theme.name) ? "muted-foreground" : "primary"]
}

function LockGlyph(props: { locked: boolean }) {
  return (
    <svg
      aria-hidden="true"
      class="size-4"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <Show when={props.locked} fallback={<path d="M9 10V8a4 4 0 0 1 6.8-2.8M16 10V8" />}>
        <path d="M9 10V8a3 3 0 1 1 6 0v2" />
      </Show>
    </svg>
  )
}

function getIconLibraryLogo(name: string) {
  switch (name) {
    case "lucide":
      return (
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 12a4 4 0 0 0-8 0 8 8 0 1 0 16 0 11.97 11.97 0 0 0-4-8.944" />
          <path d="M10 12a4 4 0 0 0 8 0 8 8 0 1 0-16 0 11.97 11.97 0 0 0 4.063 9" />
        </svg>
      )
    case "tabler":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.288 7.107A8.83 8.83 0 0 0 24.893.712a55.9 55.9 0 0 0-17.786 0A8.83 8.83 0 0 0 .712 7.107a55.9 55.9 0 0 0 0 17.786 8.83 8.83 0 0 0 6.395 6.395c5.895.95 11.89.95 17.786 0a8.83 8.83 0 0 0 6.395-6.395c.95-5.895.95-11.89 0-17.786"
            fill="currentColor"
          />
          <path
            d="m17.884 9.076 1.5-2.488 6.97 6.977-2.492 1.494zm-7.96 3.127 7.814-.909 3.91 3.66-.974 7.287-9.582 2.159a3.06 3.06 0 0 1-2.17-.329l5.244-4.897c.91.407 2.003.142 2.587-.626.584-.77.488-1.818-.226-2.484s-1.84-.755-2.664-.21c-.823.543-1.107 1.562-.67 2.412l-5.245 4.89a2.53 2.53 0 0 1-.339-2.017z"
            fill="white"
          />
        </svg>
      )
    case "hugeicons":
      return (
        <svg
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 9.5H22" />
          <path d="M20.5 9.5H3.5L4.23353 15.3682C4.59849 18.2879 4.78097 19.7477 5.77343 20.6239C6.76589 21.5 8.23708 21.5 11.1795 21.5H12.8205C15.7629 21.5 17.2341 21.5 18.2266 20.6239C19.219 19.7477 19.4015 18.2879 19.7665 15.3682L20.5 9.5Z" />
          <path d="M5 9C5 5.41015 8.13401 2.5 12 2.5C15.866 2.5 19 5.41015 19 9" />
        </svg>
      )
    case "phosphor":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 5h9v16H9zm9 16v9a9 9 0 0 1-9-9M9 5l9 16m0 0h1a8 8 0 0 0 0-16h-1"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      )
    case "remixicon":
      return (
        <svg
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C17.5228 2 22 6.47715 22 12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12C10 11.4477 9.55228 11 9 11C8.44772 11 8 11.4477 8 12C8 16.4183 11.5817 20 16 20C16.8708 20 17.7084 19.8588 18.4932 19.6016C16.7458 21.0956 14.4792 22 12 22C6.6689 22 2.3127 17.8283 2.0166 12.5713C2.23647 9.45772 4.83048 7 8 7C11.3137 7 14 9.68629 14 13C14 13.5523 14.4477 14 15 14C15.5523 14 16 13.5523 16 13C16 8.58172 12.4183 5 8 5C6.50513 5 5.1062 5.41032 3.90918 6.12402C5.72712 3.62515 8.67334 2 12 2Z" />
        </svg>
      )
    default:
      return null
  }
}

function RadiusGlyph() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 20v-5C4 8.925 8.925 4 15 4h5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  )
}

function MenuAccentGlyph(props: { accent: string }) {
  return (
    <svg
      aria-hidden="true"
      class="size-4 text-foreground"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-muted-foreground/30 data-[accent=bold]:fill-foreground"
        d="M19 12.1294L12.9388 18.207C11.1557 19.9949 10.2641 20.8889 9.16993 20.9877C8.98904 21.0041 8.80705 21.0041 8.62616 20.9877C7.53195 20.8889 6.64039 19.9949 4.85726 18.207L2.83687 16.1811C1.72104 15.0622 1.72104 13.2482 2.83687 12.1294M19 12.1294L10.9184 4.02587M19 12.1294H2.83687M10.9184 4.02587L2.83687 12.1294M10.9184 4.02587L8.89805 2"
        data-accent={props.accent}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <path
        class="fill-muted-foreground/30 data-[accent=bold]:fill-foreground"
        d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 20 17 20 17C20 17 22 18.8954 22 20Z"
        data-accent={props.accent}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  )
}

function LockButton(props: {
  field: LockableField
  isLocked: (field: LockableField) => boolean
  onToggle: (field: LockableField) => void
}) {
  const locked = () => props.isLocked(props.field)

  return (
    <button
      type="button"
      title={locked() ? "Unlock" : "Lock"}
      aria-label={locked() ? "Unlock" : "Lock"}
      data-locked={locked()}
      class="absolute top-1/2 right-8 z-10 flex size-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-foreground opacity-0 ring-foreground/60 transition-opacity outline-none group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-[locked=true]:opacity-100 pointer-coarse:hidden"
      onClick={() => props.onToggle(props.field)}
    >
      <LockGlyph locked={locked()} />
    </button>
  )
}

function CreatePreviewSurface(props: { onSelectItem: (item: string) => void }) {
  const design = useDesignSystem()
  const documentDesign = useDocumentDesignSystem()
  let previewRef: HTMLDivElement | undefined
  const isPresetPreview = createMemo(() => PRESET_PREVIEW_ITEM_VALUES.has(design.item()))
  const previewItem = createMemo(() => Index[design.item()])
  const isBlockPreview = createMemo(() => previewItem()?.type === "registry:block")
  const isCreateCanvasPreview = createMemo(() => CREATE_CANVAS_ITEM_VALUES.has(design.item()))
  const useExpandedPreviewLayout = createMemo(
    () => isPresetPreview() || isBlockPreview() || isCreateCanvasPreview()
  )

  const selectedFont = createMemo(() => FONTS.find((font) => font.value === design.font()))
  const selectedHeadingFont = createMemo(() => {
    const fontHeading = design.fontHeading()
    if (fontHeading === "inherit") {
      return selectedFont()
    }

    return FONTS.find((font) => font.value === fontHeading)
  })

  const previewTheme = createMemo(() =>
    buildPreviewTheme({
      baseColor: design.baseColor(),
      theme: design.themeName(),
      chartColor: design.chartColor(),
      menuAccent: design.menuAccent(),
      radius: design.effectiveRadius()
    })
  )

  const previewStyle = createMemo<Record<string, string>>(() => {
    const theme = previewTheme()
    const colorMode = documentDesign.theme()
    const activeThemeVars = colorMode === DARK_THEME ? theme?.cssVars.dark : theme?.cssVars.light
    const nextStyle: Record<string, string> = {
      "font-family": selectedFont()?.family ?? "var(--font-sans)",
      "--font-sans": selectedFont()?.family ?? "var(--font-sans)",
      "--font-heading":
        selectedHeadingFont()?.family ?? selectedFont()?.family ?? "var(--font-sans)"
    }

    for (const [key, value] of Object.entries(activeThemeVars ?? {})) {
      nextStyle[`--${key}`] = value
    }

    return nextStyle
  })

  createEffect(() => {
    const root = previewRef
    const menuColor = design.menuColor()

    if (!root) {
      return
    }

    const applyMenuState = () => {
      const nodes = root.querySelectorAll<HTMLElement>(".cn-menu-target, [data-menu-translucent]")

      nodes.forEach((node) => {
        if (node.classList.contains("cn-menu-target")) {
          node.classList.toggle("dark", isInvertedMenuColor(menuColor))
        }

        if (isTranslucentMenuColor(menuColor)) {
          node.classList.add("cn-menu-translucent")
          node.removeAttribute("data-menu-translucent")
        } else if (node.classList.contains("cn-menu-translucent")) {
          node.classList.remove("cn-menu-translucent")
          node.setAttribute("data-menu-translucent", "")
        }
      })
    }

    applyMenuState()

    const observer = new MutationObserver(() => applyMenuState())
    observer.observe(root, { childList: true, subtree: true })

    onCleanup(() => observer.disconnect())
  })

  return (
    <div class="flex min-h-[240px] flex-1 flex-col gap-4 overflow-hidden md:min-h-0">
      <Show when={design.hasUnsupportedIconLibrary()}>
        <Alert>
          <AlertTitle>Unsupported Icon Library</AlertTitle>
          <AlertDescription>
            This preset targets `{design.iconLibrary()}`. Previewing with `lucide` until a Solid
            port exists.
          </AlertDescription>
        </Alert>
      </Show>
      <Show when={design.baseColor() === "gray"}>
        <Alert>
          <AlertTitle>Legacy Base Color</AlertTitle>
          <AlertDescription>
            `gray` is a legacy preset value. Previewing it with the local `zinc` palette.
          </AlertDescription>
        </Alert>
      </Show>
      <div
        class={cn(
          "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl ring ring-foreground/10 md:ring-muted dark:ring-foreground/10",
          documentDesign.theme() === DARK_THEME && "dark"
        )}
      >
        <div class="absolute inset-0 bg-muted dark:bg-muted/30" />
        <div
          ref={previewRef}
          class={cn(
            "relative z-10 h-full max-h-full min-h-0 flex-1 rounded-2xl border bg-background shadow-sm",
            useExpandedPreviewLayout() ? "overflow-auto p-0" : "p-6 sm:p-10",
            `style-${design.style()}`,
            documentDesign.theme() === DARK_THEME && "dark"
          )}
          style={previewStyle()}
        >
          <div
            class={cn(
              useExpandedPreviewLayout()
                ? "w-full"
                : "mx-auto flex h-full min-h-0 max-w-3xl items-center justify-center"
            )}
          >
            <ComponentPreviewRenderer name={design.item()} />
          </div>
        </div>

        <Show when={isPresetPreview()}>
          <div class="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
            <For each={PRESET_PREVIEW_ITEMS}>
              {(item) => (
                <Button
                  variant="ghost"
                  size="sm"
                  data-active={design.item() === item.value}
                  class="h-7 min-w-8 rounded-lg px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  onClick={() => props.onSelectItem(item.value)}
                >
                  {item.label}
                </Button>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  )
}

function CreatePageContent(props: { navigationItems: CreateNavigationItem[] }) {
  const design = useDesignSystem()
  const documentDesign = useDocumentDesignSystem()
  const isMobile = useIsMobile()
  const isMacPlatform = () => MAC_OS_PATTERN.test(navigator.userAgent)
  const [locks, setLocks] = createSignal<Set<LockableField>>(new Set())
  const [historyEntries, setHistoryEntries] = createSignal<string[]>([])
  const [historyIndex, setHistoryIndex] = createSignal(-1)
  const [urlSearch, setUrlSearch] = createSignal("")
  const [showActionMenu, setShowActionMenu] = createSignal(false)
  const [actionMenuQuery, setActionMenuQuery] = createSignal("")
  const [showResetDialog, setShowResetDialog] = createSignal(false)
  const [showPresetDialog, setShowPresetDialog] = createSignal(false)
  const [presetInput, setPresetInput] = createSignal("")
  const [presetError, setPresetError] = createSignal("")
  let lastSolidMenuAccent = design.menuAccent()

  const filteredNavigationItems = createMemo<CreateNavigationItem[]>(() => {
    const query = actionMenuQuery().trim().toLowerCase()

    if (!query) {
      return props.navigationItems
    }

    return props.navigationItems.filter(
      (item) => item.label.toLowerCase().includes(query) || item.value.toLowerCase().includes(query)
    )
  })

  const shareSearch = createMemo(() =>
    serializeCreateSearchParams({
      style: design.style(),
      baseColor: design.baseColor(),
      themeName: design.themeName(),
      chartColor: design.chartColor(),
      iconLibrary: design.iconLibrary(),
      font: design.font(),
      fontHeading: design.fontHeading(),
      radius: design.radius(),
      menuAccent: design.menuAccent(),
      menuColor: design.menuColor(),
      item: design.item(),
      preset: design.preset()
    })
  )

  const baseColorOptions = createMemo(() =>
    withCurrentOption(
      BASE_COLORS.map((color) => ({ value: color.name, label: color.title })),
      design.baseColor(),
      LEGACY_OPTION_LABELS.gray
    )
  )
  const themeOptions = createMemo(() =>
    getThemesForBaseColor(design.baseColor()).map((theme) => ({
      value: theme.name,
      label: theme.title
    }))
  )
  const chartColorOptions = createMemo(() =>
    getThemesForBaseColor(design.baseColor()).map((theme) => ({
      value: theme.name,
      label: theme.title
    }))
  )
  const iconLibraryOptions = createMemo(() =>
    withCurrentOption(
      getAvailableIconLibraryOptions().map((iconLibrary) => ({
        value: iconLibrary.name,
        label: iconLibrary.title
      })),
      design.iconLibrary(),
      LEGACY_OPTION_LABELS[design.iconLibrary() as keyof typeof LEGACY_OPTION_LABELS]
    )
  )
  const styleOptions = createMemo<PickerOption[]>(() =>
    STYLES.map((style) => ({
      value: style.name,
      label: style.title
    }))
  )
  const currentStyle = createMemo(() => STYLES.find((style) => style.name === design.style()))
  const currentBaseColor = createMemo(() =>
    BASE_COLORS.find((baseColor) => baseColor.name === design.baseColor())
  )
  const currentTheme = createMemo(() =>
    getThemesForBaseColor(design.baseColor()).find((theme) => theme.name === design.themeName())
  )
  const currentChartColor = createMemo(() =>
    getThemesForBaseColor(design.baseColor()).find((theme) => theme.name === design.chartColor())
  )
  const currentFont = createMemo(() => FONTS.find((font) => font.value === design.font()))
  const currentHeadingFont = createMemo(() => {
    const fontHeading = design.fontHeading()

    if (fontHeading === "inherit") {
      return currentFont()
    }

    return FONTS.find((font) => font.value === fontHeading)
  })
  const menuColorChoice = createMemo<MenuColorChoice>(() => getMenuColorChoice(design.menuColor()))
  const menuSurfaceChoice = createMemo<MenuSurfaceChoice>(() =>
    getMenuSurfaceChoice(design.menuColor())
  )
  const styleGroups = createMemo<PickerGroupDefinition[]>(() => [{ options: styleOptions() }])
  const baseColorGroups = createMemo<PickerGroupDefinition[]>(() => [
    {
      options: baseColorOptions().map((option) => ({ value: option.value, label: option.label }))
    }
  ])
  const themeGroups = createMemo<PickerGroupDefinition[]>(() =>
    createThemeGroups(
      themeOptions().map((option) => ({ value: option.value, label: option.label }))
    )
  )
  const chartColorGroups = createMemo<PickerGroupDefinition[]>(() =>
    createThemeGroups(
      chartColorOptions().map((option) => ({ value: option.value, label: option.label }))
    )
  )
  const fontGroups = createMemo<PickerGroupDefinition[]>(() =>
    groupFontOptions(
      FONTS.map((font) => ({
        value: font.value,
        label: font.title,
        style: { "font-family": font.family }
      }))
    )
  )
  const headingFontGroups = createMemo<PickerGroupDefinition[]>(() => {
    const inheritLabel = currentFont()?.title ?? "Body Font"

    return [
      {
        options: [
          {
            value: "inherit",
            label: inheritLabel,
            style: currentFont()?.family ? { "font-family": currentFont()?.family } : undefined
          }
        ]
      },
      ...groupFontOptions(
        FONTS.map((font) => ({
          value: font.value,
          label: font.title,
          style: { "font-family": font.family }
        }))
      ).map((group, index) => ({
        ...group,
        separatorBefore: index === 0
      }))
    ]
  })
  const radiusGroups = createMemo<PickerGroupDefinition[]>(() => {
    const defaultRadius = RADII.find((radius) => radius.name === "default")
    const otherRadii = RADII.filter((radius) => radius.name !== "default")

    return [
      {
        options: defaultRadius ? [{ value: defaultRadius.name, label: defaultRadius.label }] : []
      },
      {
        separatorBefore: true,
        options: otherRadii.map((radius) => ({ value: radius.name, label: radius.label }))
      }
    ].filter((group) => group.options.length > 0)
  })
  const menuAccentGroups = createMemo<PickerGroupDefinition[]>(() => [
    {
      options: MENU_ACCENTS.map((accent) => ({
        value: accent.value,
        label: accent.label,
        disabled: accent.value === "bold" && isTranslucentMenuColor(design.menuColor())
      }))
    }
  ])
  const iconLibraryGroups = createMemo<PickerGroupDefinition[]>(() => [
    {
      options: iconLibraryOptions().map((option) => ({ value: option.value, label: option.label }))
    }
  ])

  const isLocked = (field: LockableField) => locks().has(field)

  const toggleLock = (field: LockableField) => {
    setLocks((current) => {
      const next = new Set(current)

      if (next.has(field)) {
        next.delete(field)
      } else {
        next.add(field)
      }

      return next
    })
  }

  createEffect(() => {
    if (!isTranslucentMenuColor(design.menuColor())) {
      lastSolidMenuAccent = design.menuAccent()
    }
  })

  const trackHistoryEntry = (value: string) => {
    const existingIndex = historyEntries().indexOf(value)

    if (existingIndex >= 0) {
      setHistoryIndex(existingIndex)
      return
    }

    setHistoryEntries((current) => {
      const next = [...current, value]
      setHistoryIndex(next.length - 1)
      return next
    })
  }

  const openPresetDialog = () => {
    setPresetInput(design.preset())
    setPresetError("")
    setShowPresetDialog(true)
  }

  const handleActionMenuOpenChange = (open: boolean) => {
    setShowActionMenu(open)

    if (!open) {
      setActionMenuQuery("")
    }
  }

  const openActionMenu = () => {
    setActionMenuQuery("")
    setShowActionMenu(true)
  }

  const navigateToItem = (item: string) => {
    setCurrentItem(item)
    handleActionMenuOpenChange(false)
  }

  const applyPreset = () => {
    const value = presetInput().trim()

    if (!isPresetCode(value)) {
      setPresetError("Enter a valid preset hash.")
      return
    }

    const searchParams = new URLSearchParams()
    searchParams.set("preset", value)
    searchParams.set("item", design.item())

    const parsed = parseCreateSearchParams(searchParams)
    design.setState({
      ...parsed.state,
      item: design.item()
    })
    setPresetError("")
    setShowPresetDialog(false)
  }

  const undo = () => {
    window.history.back()
  }

  const redo = () => {
    window.history.forward()
  }

  const toggleColorMode = () => {
    documentDesign.toggleTheme()
  }

  const resetDesign = () => {
    design.setState({
      style: DEFAULT_CREATE_CONFIG.style,
      baseColor: DEFAULT_CREATE_CONFIG.baseColor,
      themeName: DEFAULT_CREATE_CONFIG.theme,
      chartColor: DEFAULT_CREATE_CONFIG.chartColor,
      iconLibrary: DEFAULT_CREATE_CONFIG.iconLibrary,
      font: DEFAULT_CREATE_CONFIG.font,
      fontHeading: DEFAULT_CREATE_CONFIG.fontHeading,
      radius: DEFAULT_CREATE_CONFIG.radius,
      menuAccent: DEFAULT_CREATE_CONFIG.menuAccent,
      menuColor: DEFAULT_CREATE_CONFIG.menuColor,
      item: design.item(),
      preset: ""
    })
    setLocks(new Set<LockableField>())
    setShowResetDialog(false)
  }

  const applySearchState = (value: string, mode: "replace" | "push") => {
    const nextUrl = value ? `${window.location.pathname}?${value}` : window.location.pathname
    if (mode === "replace") {
      window.history.replaceState({ createSearch: value }, "", nextUrl)
    } else {
      window.history.pushState({ createSearch: value }, "", nextUrl)
    }
  }

  const syncSearchValue = (nextSearch: string, mode: "replace" | "push") => {
    if (nextSearch === urlSearch()) {
      return
    }

    const currentIndex = historyIndex()

    applySearchState(nextSearch, mode)
    setUrlSearch(nextSearch)
    setHistoryEntries((current) => {
      if (mode === "replace") {
        if (currentIndex >= 0 && current[currentIndex] !== undefined) {
          const next = [...current]
          next[currentIndex] = nextSearch
          return next
        }

        setHistoryIndex(0)
        return [nextSearch]
      }

      const sliced = currentIndex >= 0 ? current.slice(0, currentIndex + 1) : []
      const next = [...sliced, nextSearch]

      setHistoryIndex(next.length - 1)
      return next
    })
  }

  const syncFromLocation = (mode: "replace" | "push") => {
    const parsed = parseCreateSearchParams(new URLSearchParams(window.location.search))
    design.setState({
      style: parsed.state.style,
      baseColor: parsed.state.baseColor,
      themeName: parsed.state.themeName,
      chartColor: parsed.state.chartColor,
      iconLibrary: parsed.state.iconLibrary,
      font: parsed.state.font,
      fontHeading: parsed.state.fontHeading,
      radius: parsed.state.radius,
      menuAccent: parsed.state.menuAccent,
      menuColor: parsed.state.menuColor,
      item: parsed.state.item,
      preset: parsed.state.preset
    })
    setUrlSearch(parsed.search)

    if (`?${parsed.search}` !== window.location.search) {
      applySearchState(parsed.search, mode)
    }

    trackHistoryEntry(parsed.search)
  }

  const pushCurrentState = () => {
    const nextSearch = shareSearch()
    design.setPreset(new URLSearchParams(nextSearch).get("preset") ?? "")

    syncSearchValue(nextSearch, historyIndex() === -1 ? "replace" : "push")
  }

  const setCurrentItem = (item: string) => {
    if (!Index[item]) {
      return
    }

    design.setItem(item)

    const nextSearch = serializeCreateSearchParams({
      style: design.style(),
      baseColor: design.baseColor(),
      themeName: design.themeName(),
      chartColor: design.chartColor(),
      iconLibrary: design.iconLibrary(),
      font: design.font(),
      fontHeading: design.fontHeading(),
      radius: design.radius(),
      menuAccent: design.menuAccent(),
      menuColor: design.menuColor(),
      item,
      preset: design.preset()
    })

    syncSearchValue(nextSearch, historyIndex() === -1 ? "replace" : "push")
  }

  const randomize = () => {
    const nextStyle = isLocked("style")
      ? design.style()
      : randomItem(STYLES.map((style) => style.name))
    const nextBaseColor = (
      isLocked("baseColor")
        ? design.baseColor()
        : randomItem(BASE_COLORS.map((baseColor) => baseColor.name))
    ) as ReturnType<typeof design.baseColor>
    const availableThemes = getThemesForBaseColor(nextBaseColor)
    const nextThemeName = isLocked("themeName")
      ? design.themeName()
      : randomItem(availableThemes.map((theme) => theme.name))
    const nextChartColor = isLocked("chartColor")
      ? design.chartColor()
      : randomItem(availableThemes.map((theme) => theme.name))
    const nextFont = isLocked("font") ? design.font() : randomItem(FONTS.map((font) => font.value))
    const nextFontHeading = isLocked("fontHeading")
      ? design.fontHeading()
      : randomItem(["inherit", ...FONTS.map((font) => font.value)] as const)
    const nextRadius = isLocked("radius")
      ? design.radius()
      : randomItem(RADII.map((radius) => radius.name))
    const nextIconLibrary = isLocked("iconLibrary")
      ? design.iconLibrary()
      : randomItem([...SUPPORTED_ICON_LIBRARY_NAMES])
    const nextMenuColor = isLocked("menuColor")
      ? design.menuColor()
      : randomItem(MENU_COLORS.map((color) => color.value))
    const nextMenuAccent = isLocked("menuAccent")
      ? design.menuAccent()
      : isTranslucentMenuColor(nextMenuColor)
        ? "subtle"
        : randomItem(MENU_ACCENTS.map((accent) => accent.value))

    design.setState({
      style: nextStyle,
      baseColor: nextBaseColor,
      themeName: nextThemeName,
      chartColor: nextChartColor,
      font: nextFont,
      fontHeading: nextFontHeading,
      radius: nextRadius,
      iconLibrary: nextIconLibrary,
      menuColor: nextMenuColor,
      menuAccent: nextMenuAccent
    })
  }

  onMount(() => {
    syncFromLocation("replace")
    design.setTheme(documentDesign.theme())

    const onPopState = () => {
      const parsed = parseCreateSearchParams(new URLSearchParams(window.location.search))
      design.setState({
        style: parsed.state.style,
        baseColor: parsed.state.baseColor,
        themeName: parsed.state.themeName,
        chartColor: parsed.state.chartColor,
        iconLibrary: parsed.state.iconLibrary,
        font: parsed.state.font,
        fontHeading: parsed.state.fontHeading,
        radius: parsed.state.radius,
        menuAccent: parsed.state.menuAccent,
        menuColor: parsed.state.menuColor,
        item: parsed.state.item,
        preset: parsed.state.preset
      })
      setUrlSearch(parsed.search)
      trackHistoryEntry(parsed.search)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (shouldIgnoreKeydownTarget(event.target)) {
        return
      }

      const key = event.key.toLowerCase()

      if ((event.metaKey || event.ctrlKey) && key === "p") {
        event.preventDefault()
        openActionMenu()
        return
      }

      if (!event.metaKey && !event.ctrlKey && key === "o") {
        event.preventDefault()
        openPresetDialog()
        return
      }

      if ((event.metaKey || event.ctrlKey) && key === "z") {
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
        return
      }

      if (event.ctrlKey && key === "y") {
        event.preventDefault()
        redo()
        return
      }

      if (!event.metaKey && !event.ctrlKey && event.shiftKey && key === "r") {
        event.preventDefault()

        if (showResetDialog()) {
          resetDesign()
        } else {
          setShowResetDialog(true)
        }

        return
      }

      if (!event.metaKey && !event.ctrlKey && key === "d") {
        event.preventDefault()
        toggleColorMode()
        return
      }

      if (!event.metaKey && !event.ctrlKey && !event.shiftKey && key === "r") {
        event.preventDefault()
        randomize()
      }
    }

    window.addEventListener("popstate", onPopState)
    window.addEventListener("keydown", onKeyDown)

    onCleanup(() => {
      window.removeEventListener("popstate", onPopState)
      window.removeEventListener("keydown", onKeyDown)
    })
  })

  createEffect(() => {
    design.setTheme(documentDesign.theme())
  })

  createEffect(() => {
    if (design.style() === "lyra" && design.radius() !== "none") {
      design.setRadius("none")
    }
    if (isTranslucentMenuColor(design.menuColor()) && design.menuAccent() === "bold") {
      design.setMenuAccent("subtle")
    }
  })

  createEffect(() => {
    const availableThemes = getThemesForBaseColor(design.baseColor())
    const fallbackTheme = availableThemes[0]?.name

    if (!fallbackTheme) {
      return
    }

    if (!availableThemes.some((theme) => theme.name === design.themeName())) {
      design.setThemeName(fallbackTheme)
    }

    if (!availableThemes.some((theme) => theme.name === design.chartColor())) {
      design.setChartColor(fallbackTheme)
    }
  })

  createEffect(() => {
    if (!design.item() || !Index[design.item()]) {
      design.setItem(DEFAULT_CREATE_ITEM)
    }
  })

  createEffect(() => {
    if (historyIndex() === -1) {
      return
    }

    pushCurrentState()
  })

  const modifierKeyLabel = () => (isMacPlatform() ? "Cmd" : "Ctrl")
  const navigateShortcutLabel = () => `${modifierKeyLabel()}+P`
  const undoShortcutLabel = () => `${modifierKeyLabel()}+Z`
  const redoShortcutLabel = () =>
    isMacPlatform() ? `Shift+${modifierKeyLabel()}+Z` : `${modifierKeyLabel()}+Shift+Z`

  return (
    <>
      <div class="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
        <div
          data-slot="designer"
          class="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
        >
          <CreatePreviewSurface onSelectItem={setCurrentItem} />

          <aside class="min-h-0 w-full md:w-(--customizer-width)">
            <Card class="dark isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl border-0 bg-card/90 shadow-xl ring-1 ring-white/10 backdrop-blur-xl md:h-full">
              <CardHeader class="hidden items-center justify-between gap-2 border-b px-3 py-3 md:flex md:px-4">
                <DropdownMenu placement="right-start" gutter={8}>
                  <DropdownMenuTrigger
                    as={Button}
                    class="h-9 w-full justify-between rounded-lg bg-transparent px-2.5 text-sm font-medium shadow-none ring-1 ring-white/10 hover:bg-white/5 focus-visible:ring-1"
                    size="sm"
                    variant="ghost"
                  >
                    <span class="font-medium text-white">Menu</span>
                    <IconPlaceholder
                      class="size-5 text-white"
                      lucide="EllipsisVerticalIcon"
                      tabler="IconDotsVertical"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="dark w-64 rounded-xl border-0 bg-neutral-950/85 p-1.5 text-neutral-100 shadow-2xl ring-1 ring-neutral-900/80 backdrop-blur-xl outline-none">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel class="px-2 py-1.5 text-xs font-medium text-neutral-400">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={openActionMenu}
                      >
                        <IconPlaceholder class="size-4" lucide="SearchIcon" tabler="IconSearch" />
                        Navigate...
                        <DropdownMenuShortcut>{navigateShortcutLabel()}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={randomize}
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="ShuffleIcon"
                          tabler="IconArrowsShuffle"
                        />
                        Shuffle
                        <DropdownMenuShortcut>R</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={toggleColorMode}
                      >
                        <IconPlaceholder class="size-4" lucide="MoonIcon" tabler="IconMoon" />
                        Light / Dark
                        <DropdownMenuShortcut>D</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator class="-mx-1.5 my-1.5 bg-neutral-700/70" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={undo}
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="Undo2Icon"
                          tabler="IconArrowBackUp"
                        />
                        Undo
                        <DropdownMenuShortcut>{undoShortcutLabel()}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={redo}
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="Redo2Icon"
                          tabler="IconArrowForwardUp"
                        />
                        Redo
                        <DropdownMenuShortcut>{redoShortcutLabel()}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator class="-mx-1.5 my-1.5 bg-neutral-700/70" />
                      <DropdownMenuItem
                        class="gap-2 rounded-lg py-1.5 pr-2 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 pointer-coarse:py-2.5 pointer-coarse:text-base"
                        onSelect={() => setShowResetDialog(true)}
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="RotateCcwIcon"
                          tabler="IconRotate"
                        />
                        Reset
                        <DropdownMenuShortcut>Shift+R</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-3 py-3 md:overflow-y-auto md:px-4 md:py-4">
                <FieldGroup class="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25">
                  <PickerField
                    label="Style"
                    field="style"
                    value={design.style()}
                    valueLabel={currentStyle()?.title ?? formatItemTitle(design.style())}
                    groups={styleGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <div class="*:[svg]:size-4 *:[svg]:text-foreground!">
                        {currentStyle()?.icon}
                      </div>
                    }
                    isLocked={isLocked}
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setStyle(
                        value as typeof design.style extends () => infer T ? T : never
                      )
                    }
                  />
                  <FieldSeparator class="hidden md:block" />
                  <PickerField
                    label="Base Color"
                    field="baseColor"
                    value={design.baseColor()}
                    valueLabel={getOptionLabel(
                      baseColorGroups()[0]?.options ?? [],
                      design.baseColor()
                    )}
                    groups={baseColorGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <Show when={currentBaseColor()}>
                        {(baseColor) => (
                          <div
                            class="size-4 rounded-full"
                            style={{ "background-color": getBaseColorSwatch(baseColor()) }}
                          />
                        )}
                      </Show>
                    }
                    isLocked={isLocked}
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setBaseColor(
                        value as typeof design.baseColor extends () => infer T ? T : never
                      )
                    }
                  />
                  <PickerField
                    label="Theme"
                    field="themeName"
                    value={design.themeName()}
                    valueLabel={
                      currentTheme()?.title ??
                      themeOptions()[0]?.label ??
                      formatItemTitle(design.themeName())
                    }
                    groups={themeGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <Show when={currentTheme()}>
                        {(theme) => (
                          <div
                            class="size-4 rounded-full"
                            style={{ "background-color": getThemeSwatch(theme()) }}
                          />
                        )}
                      </Show>
                    }
                    isLocked={isLocked}
                    contentClass="max-h-92"
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setThemeName(
                        value as typeof design.themeName extends () => infer T ? T : never
                      )
                    }
                  />
                  <PickerField
                    label="Chart Color"
                    field="chartColor"
                    value={design.chartColor()}
                    valueLabel={
                      currentChartColor()?.title ??
                      chartColorOptions()[0]?.label ??
                      formatItemTitle(design.chartColor())
                    }
                    groups={chartColorGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <Show when={currentChartColor()}>
                        {(theme) => (
                          <div
                            class="size-4 rounded-full"
                            style={{ "background-color": getThemeSwatch(theme()) }}
                          />
                        )}
                      </Show>
                    }
                    isLocked={isLocked}
                    contentClass="max-h-92"
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setChartColor(
                        value as typeof design.chartColor extends () => infer T ? T : never
                      )
                    }
                  />
                  <FieldSeparator class="hidden md:block" />
                  <PickerField
                    label="Heading"
                    field="fontHeading"
                    value={design.fontHeading()}
                    valueLabel={
                      design.fontHeading() === "inherit"
                        ? (currentFont()?.title ?? "Body Font")
                        : (currentHeadingFont()?.title ?? "Body Font")
                    }
                    groups={headingFontGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <div
                        class="text-base font-medium"
                        style={{
                          "font-family": currentHeadingFont()?.family ?? currentFont()?.family
                        }}
                      >
                        Aa
                      </div>
                    }
                    isLocked={isLocked}
                    contentClass="max-h-96"
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setFontHeading(
                        value as typeof design.fontHeading extends () => infer T ? T : never
                      )
                    }
                  />
                  <PickerField
                    label="Font"
                    field="font"
                    value={design.font()}
                    valueLabel={currentFont()?.title ?? formatItemTitle(design.font())}
                    groups={fontGroups()}
                    isMobile={isMobile()}
                    indicator={
                      <div
                        class="text-base font-medium"
                        style={{ "font-family": currentFont()?.family }}
                      >
                        Aa
                      </div>
                    }
                    isLocked={isLocked}
                    contentClass="max-h-96"
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setFont(value as typeof design.font extends () => infer T ? T : never)
                    }
                  />
                  <FieldSeparator class="hidden md:block" />
                  <PickerField
                    label="Icon Library"
                    field="iconLibrary"
                    value={design.iconLibrary()}
                    valueLabel={getOptionLabel(
                      iconLibraryGroups()[0]?.options ?? [],
                      design.iconLibrary(),
                      LEGACY_OPTION_LABELS[
                        design.iconLibrary() as keyof typeof LEGACY_OPTION_LABELS
                      ]
                    )}
                    groups={iconLibraryGroups()}
                    indicator={
                      <div class="*:[svg]:size-4 *:[svg]:text-foreground!">
                        {getIconLibraryLogo(design.iconLibrary())}
                      </div>
                    }
                    isMobile={isMobile()}
                    isLocked={isLocked}
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setIconLibrary(
                        value as typeof design.iconLibrary extends () => infer T ? T : never
                      )
                    }
                  />
                  <PickerField
                    label="Radius"
                    field="radius"
                    value={design.effectiveRadius()}
                    valueLabel={getOptionLabel(
                      RADII.map((radius) => ({ value: radius.name, label: radius.label })),
                      design.effectiveRadius()
                    )}
                    groups={radiusGroups()}
                    indicator={
                      <div class="rotate-90 *:[svg]:size-4 *:[svg]:text-foreground!">
                        <RadiusGlyph />
                      </div>
                    }
                    isMobile={isMobile()}
                    disabled={design.style() === "lyra"}
                    isLocked={isLocked}
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setRadius(
                        value as typeof design.radius extends () => infer T ? T : never
                      )
                    }
                  />
                  <FieldSeparator class="hidden md:block" />
                  <MenuPickerField
                    label="Menu"
                    field="menuColor"
                    valueLabel={getMenuColorDisplayLabel(design.menuColor())}
                    indicator={
                      <IconPlaceholder lucide="MenuIcon" tabler="IconMenu2" class="size-4" />
                    }
                    isMobile={isMobile()}
                    isLocked={isLocked}
                    onToggleLock={toggleLock}
                    colorChoice={menuColorChoice()}
                    surfaceChoice={menuSurfaceChoice()}
                    isDark={documentDesign.theme() === DARK_THEME}
                    onChangeColor={(value) => {
                      const nextMenuColor = getMenuColorValue(value, menuSurfaceChoice())

                      design.setMenuColor(nextMenuColor)
                      if (isTranslucentMenuColor(nextMenuColor)) {
                        design.setMenuAccent("subtle")
                      }
                    }}
                    onChangeSurface={(value) => {
                      const nextMenuColor = getMenuColorValue(menuColorChoice(), value)

                      design.setMenuColor(nextMenuColor)
                      design.setMenuAccent(value === "translucent" ? "subtle" : lastSolidMenuAccent)
                    }}
                  />
                  <PickerField
                    label="Menu Accent"
                    field="menuAccent"
                    value={design.menuAccent()}
                    valueLabel={getOptionLabel(
                      menuAccentGroups()[0]?.options ?? [],
                      design.menuAccent()
                    )}
                    groups={menuAccentGroups()}
                    indicator={<MenuAccentGlyph accent={design.menuAccent()} />}
                    isMobile={isMobile()}
                    isLocked={isLocked}
                    wrapperClass="pr-3 md:pr-0"
                    onToggleLock={toggleLock}
                    onChange={(value) =>
                      design.setMenuAccent(
                        value as typeof design.menuAccent extends () => infer T ? T : never
                      )
                    }
                  />
                </FieldGroup>
              </CardContent>
              <CardFooter class="grid min-w-0 grid-cols-3 gap-2 px-3 pb-3 md:grid-cols-1 md:rounded-b-none md:px-4 md:pb-0">
                <Button
                  variant="outline"
                  class="touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!"
                  onClick={() => copyToClipboardWithMeta(`--preset ${design.preset()}`)}
                >
                  <span class="w-full truncate text-center font-medium">{`--preset ${design.preset()}`}</span>
                </Button>
                <Button
                  variant="outline"
                  class="touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!"
                  onClick={openPresetDialog}
                >
                  <span class="w-full text-center font-medium">Open Preset</span>
                </Button>
                <Button
                  variant="outline"
                  class="touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!"
                  onClick={randomize}
                >
                  <span class="w-full text-center font-medium">Shuffle</span>
                </Button>
              </CardFooter>
              <CardFooter class="-mt-3 px-3 pt-3 pb-3 md:px-4 md:pb-4">
                <Button class="w-full bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                  Create Project
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>

      <CommandDialog onOpenChange={handleActionMenuOpenChange} open={showActionMenu()}>
        <Command<CreateNavigationItem>
          onChange={(item) => {
            if (!item) {
              return
            }

            navigateToItem(item.value)
          }}
          onInputChange={setActionMenuQuery}
          options={filteredNavigationItems()}
          optionLabel="label"
          optionTextValue="label"
          optionValue="value"
          placeholder="Search components and previews..."
          itemComponent={(commandProps) => (
            <CommandItem item={commandProps.item} showIndicator={false}>
              <IconPlaceholder
                class="size-4"
                lucide={
                  commandProps.item.rawValue.group === "Previews"
                    ? "LayoutGridIcon"
                    : "ComponentIcon"
                }
                tabler={
                  commandProps.item.rawValue.group === "Previews"
                    ? "IconLayoutGrid"
                    : "IconComponents"
                }
              />
              <span>{commandProps.item.rawValue.label}</span>
            </CommandItem>
          )}
        >
          <CommandInput />
          <CommandList />
          <CommandEmpty>No components found.</CommandEmpty>
        </Command>
      </CommandDialog>

      <AlertDialog onOpenChange={setShowResetDialog} open={showResetDialog()}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all customization options to their default values and clear all field
              locks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetDesign}>Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={showPresetDialog()}
        onOpenChange={(open) => {
          setShowPresetDialog(open)
          if (!open) {
            setPresetError("")
          }
        }}
      >
        <DialogContent class="max-w-md gap-4">
          <DialogHeader>
            <DialogTitle>Open Preset</DialogTitle>
            <DialogDescription>
              Paste a preset hash to apply it to the current preview.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={presetInput()}
            onInput={(event) => {
              setPresetInput(event.currentTarget.value)
              if (presetError()) {
                setPresetError("")
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                applyPreset()
              }
            }}
            placeholder="b0"
          />
          <Show when={presetError()}>
            {(message) => <p class="text-sm text-destructive">{message()}</p>}
          </Show>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPresetDialog(false)}>
              Cancel
            </Button>
            <Button onClick={applyPreset}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function MenuPickerField(props: {
  label: string
  field: LockableField
  valueLabel: string
  indicator?: JSX.Element
  isMobile: boolean
  colorChoice: MenuColorChoice
  surfaceChoice: MenuSurfaceChoice
  isDark: boolean
  isLocked: (field: LockableField) => boolean
  onToggleLock: (field: LockableField) => void
  onChangeColor: (value: MenuColorChoice) => void
  onChangeSurface: (value: MenuSurfaceChoice) => void
}) {
  return (
    <div class="group/picker relative">
      <DropdownMenu placement={props.isMobile ? "top" : "right-start"} gutter={20}>
        <DropdownMenuTrigger
          class={cn(
            "relative w-36 shrink-0 touch-manipulation rounded-xl p-3 text-left ring-1 ring-foreground/10 select-none hover:bg-muted focus-visible:ring-foreground/50 focus-visible:outline-none data-expanded:bg-muted md:w-full md:rounded-lg md:px-2.5 md:py-2",
            props.indicator && "pr-12 md:pr-10"
          )}
        >
          <div class="flex min-w-0 flex-col justify-start text-left">
            <div class="text-xs text-muted-foreground">{props.label}</div>
            <div class="line-clamp-1 truncate text-sm font-medium text-foreground">
              {props.valueLabel}
            </div>
          </div>
          <Show when={props.indicator}>
            <div class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-foreground select-none md:right-2.5">
              {props.indicator}
            </div>
          </Show>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="dark no-scrollbar w-[calc(min(100vw-2rem,13rem))] min-w-32 rounded-xl border-0 bg-neutral-950/85 p-1.5 text-neutral-100 shadow-2xl ring-1 ring-neutral-900/80 backdrop-blur-xl outline-none md:w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel class="px-2 py-1.5 text-xs font-medium text-neutral-400">
              Color
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={props.colorChoice}
              onChange={(value) => props.onChangeColor(value as MenuColorChoice)}
            >
              <DropdownMenuRadioItem
                class="gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 focus:**:text-neutral-100 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base"
                value="default"
              >
                Default
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                class="gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 focus:**:text-neutral-100 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base"
                value="inverted"
                disabled={props.isDark}
              >
                Inverted
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator class="-mx-1.5 my-1.5 bg-neutral-700/70" />
          <DropdownMenuGroup>
            <DropdownMenuLabel class="px-2 py-1.5 text-xs font-medium text-neutral-400">
              Appearance
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={props.surfaceChoice}
              onChange={(value) => props.onChangeSurface(value as MenuSurfaceChoice)}
            >
              <DropdownMenuRadioItem
                class="gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 focus:**:text-neutral-100 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base"
                value="solid"
              >
                Solid
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                class="gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 focus:**:text-neutral-100 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base"
                value="translucent"
              >
                Translucent
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LockButton field={props.field} isLocked={props.isLocked} onToggle={props.onToggleLock} />
    </div>
  )
}

function PickerField(props: {
  label: string
  field: LockableField
  value: string
  valueLabel: string
  contentClass?: string
  disabled?: boolean
  indicator?: JSX.Element
  groups: readonly PickerGroupDefinition[]
  isMobile: boolean
  onChange: (value: string) => void
  isLocked: (field: LockableField) => boolean
  onToggleLock: (field: LockableField) => void
  wrapperClass?: string
}) {
  const hasCustomGroupState = () =>
    props.groups.some((group) => group.value !== undefined || group.onChange !== undefined)

  const renderOptions = (options: readonly PickerOption[]) => (
    <DropdownMenuGroup>
      <For each={options}>
        {(option) => (
          <DropdownMenuRadioItem
            class="gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm font-medium text-neutral-100 outline-none focus:bg-neutral-700/80 focus:text-neutral-100 focus:**:text-neutral-100 pointer-coarse:gap-3 pointer-coarse:py-2.5 pointer-coarse:pl-3 pointer-coarse:text-base"
            disabled={option.disabled}
            value={option.value}
          >
            <Show when={option.indicator}>
              <div class="flex size-4 items-center justify-center text-foreground *:[svg]:size-4 *:[svg]:text-foreground!">
                {option.indicator}
              </div>
            </Show>
            <span class="truncate" style={option.style}>
              {option.label}
            </span>
          </DropdownMenuRadioItem>
        )}
      </For>
    </DropdownMenuGroup>
  )

  const renderGroup = (group: PickerGroupDefinition) => (
    <>
      <Show when={group.separatorBefore}>
        <DropdownMenuSeparator class="-mx-1.5 my-1.5 bg-neutral-700/70" />
      </Show>
      <Show when={group.label}>
        <DropdownMenuLabel class="px-2 py-1.5 text-xs font-medium text-neutral-400">
          {group.label}
        </DropdownMenuLabel>
      </Show>
      {renderOptions(group.options)}
    </>
  )

  return (
    <div class={cn("group/picker relative", props.wrapperClass)}>
      <DropdownMenu placement={props.isMobile ? "top" : "right-start"} gutter={20}>
        <DropdownMenuTrigger
          disabled={props.disabled}
          class={cn(
            "relative w-36 shrink-0 touch-manipulation rounded-xl p-3 text-left ring-1 ring-foreground/10 select-none hover:bg-muted focus-visible:ring-foreground/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-expanded:bg-muted md:w-full md:rounded-lg md:px-2.5 md:py-2",
            props.indicator && "pr-12 md:pr-10"
          )}
        >
          <div class="flex min-w-0 flex-col justify-start text-left">
            <div class="text-xs text-muted-foreground">{props.label}</div>
            <div class="line-clamp-1 truncate text-sm font-medium text-foreground">
              {props.valueLabel}
            </div>
          </div>
          <Show when={props.indicator}>
            <div class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-foreground select-none md:right-2.5">
              {props.indicator}
            </div>
          </Show>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class={cn(
            "dark no-scrollbar w-[calc(min(100vw-2rem,13rem))] min-w-32 rounded-xl border-0 bg-neutral-950/85 p-1.5 text-neutral-100 shadow-2xl ring-1 ring-neutral-900/80 backdrop-blur-xl outline-none md:w-52",
            props.contentClass
          )}
        >
          <Show
            when={hasCustomGroupState()}
            fallback={
              <DropdownMenuRadioGroup value={props.value} onChange={props.onChange}>
                <For each={props.groups}>{renderGroup}</For>
              </DropdownMenuRadioGroup>
            }
          >
            <For each={props.groups}>
              {(group) => (
                <>
                  <Show when={group.separatorBefore}>
                    <DropdownMenuSeparator class="-mx-1.5 my-1.5 bg-neutral-700/70" />
                  </Show>
                  <Show when={group.label}>
                    <DropdownMenuLabel class="px-2 py-1.5 text-xs font-medium text-neutral-400">
                      {group.label}
                    </DropdownMenuLabel>
                  </Show>
                  <DropdownMenuRadioGroup
                    value={group.value ?? props.value}
                    onChange={group.onChange ?? props.onChange}
                  >
                    {renderOptions(group.options)}
                  </DropdownMenuRadioGroup>
                </>
              )}
            </For>
          </Show>
        </DropdownMenuContent>
      </DropdownMenu>
      <LockButton field={props.field} isLocked={props.isLocked} onToggle={props.onToggleLock} />
    </div>
  )
}

export default function CreatePage(props: { navigationItems: CreateNavigationItem[] }) {
  const parsed = parseCreateSearchParams(new URLSearchParams(window.location.search))

  return (
    <DesignSystemProvider
      initialState={{
        style: parsed.state.style,
        baseColor: parsed.state.baseColor,
        themeName: parsed.state.themeName,
        chartColor: parsed.state.chartColor,
        iconLibrary: parsed.state.iconLibrary,
        font: parsed.state.font,
        fontHeading: parsed.state.fontHeading,
        radius: parsed.state.radius,
        menuAccent: parsed.state.menuAccent,
        menuColor: parsed.state.menuColor,
        item: parsed.state.item,
        preset: parsed.state.preset
      }}
      scope="memory"
    >
      <CreatePageContent navigationItems={props.navigationItems} />
    </DesignSystemProvider>
  )
}
