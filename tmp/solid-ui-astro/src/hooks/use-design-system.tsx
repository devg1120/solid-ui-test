import {
  createContext,
  createMemo,
  createRoot,
  createSignal,
  mergeProps,
  splitProps,
  untrack,
  useContext,
  type Accessor,
  type JSX,
  type ParentProps
} from "solid-js"

import {
  DEFAULT_CREATE_CONFIG,
  getPreviewIconLibrary,
  getResolvedBaseColorName,
  isSupportedPreviewIconLibrary
} from "~/lib/create/config"
import type {
  BaseColorName,
  ChartColorName,
  FontHeadingValue,
  FontValue,
  MenuAccentValue,
  MenuColorValue,
  PresetIconLibraryName,
  RadiusValue,
  StyleName,
  ThemeName
} from "~/lib/create/types"
import { DEFAULT_ICON_LIBRARY, DEFAULT_STYLE_NAME, STYLE_CLASS_PREFIX } from "~/lib/design-system"
import { iconLibraries, type IconLibraryName } from "~/registry/icon-libraries"

export const LIGHT_THEME = "light"
export const DARK_THEME = "dark"
export const THEME_DARK_CLASS = "dark"
export const DOCS_COLOR_MODE_CHANGE_EVENT = "docs-color-mode-change"
export type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME

export const STORAGE_KEYS = {
  style: "docs:style",
  iconLibrary: "docs:icon-library",
  theme: "docs:theme"
} as const

type DesignSystemScope = "document" | "memory"

export type DesignSystemState = {
  scope: DesignSystemScope
  style: Accessor<StyleName>
  setStyle: (value: StyleName) => void
  iconLibrary: Accessor<PresetIconLibraryName>
  setIconLibrary: (value: PresetIconLibraryName) => void
  previewIconLibrary: Accessor<IconLibraryName>
  hasUnsupportedIconLibrary: Accessor<boolean>
  theme: Accessor<ThemeMode>
  setTheme: (value: ThemeMode) => void
  toggleTheme: () => void
  themeName: Accessor<ThemeName>
  setThemeName: (value: ThemeName) => void
  baseColor: Accessor<BaseColorName>
  setBaseColor: (value: BaseColorName) => void
  resolvedBaseColor: Accessor<Exclude<BaseColorName, "gray">>
  chartColor: Accessor<ChartColorName>
  setChartColor: (value: ChartColorName) => void
  font: Accessor<FontValue>
  setFont: (value: FontValue) => void
  fontHeading: Accessor<FontHeadingValue>
  setFontHeading: (value: FontHeadingValue) => void
  effectiveFontHeading: Accessor<FontHeadingValue | FontValue>
  radius: Accessor<RadiusValue>
  setRadius: (value: RadiusValue) => void
  effectiveRadius: Accessor<RadiusValue>
  menuAccent: Accessor<MenuAccentValue>
  setMenuAccent: (value: MenuAccentValue) => void
  menuColor: Accessor<MenuColorValue>
  setMenuColor: (value: MenuColorValue) => void
  item: Accessor<string>
  setItem: (value: string) => void
  preset: Accessor<string>
  setPreset: (value: string) => void
  setState: (value: Partial<DesignSystemWritableState>) => void
}

type DesignSystemWritableState = {
  style: StyleName
  iconLibrary: PresetIconLibraryName
  theme: ThemeMode
  themeName: ThemeName
  baseColor: BaseColorName
  chartColor: ChartColorName
  font: FontValue
  fontHeading: FontHeadingValue
  radius: RadiusValue
  menuAccent: MenuAccentValue
  menuColor: MenuColorValue
  item: string
  preset: string
}

type ControllerOptions = {
  scope?: DesignSystemScope
  initialState?: Partial<DesignSystemWritableState>
}

function canUseDom() {
  return typeof document !== "undefined" && typeof window !== "undefined"
}

function readDocumentTheme() {
  if (!canUseDom()) {
    return LIGHT_THEME
  }

  return document.documentElement.classList.contains(THEME_DARK_CLASS) ? DARK_THEME : LIGHT_THEME
}

function readDocumentStyle() {
  if (!canUseDom()) {
    return DEFAULT_STYLE_NAME as StyleName
  }

  const styleClass = [...document.documentElement.classList].find((className) =>
    className.startsWith(STYLE_CLASS_PREFIX)
  )

  return (styleClass?.replace(STYLE_CLASS_PREFIX, "") ?? DEFAULT_STYLE_NAME) as StyleName
}

function readDocumentIconLibrary() {
  if (!canUseDom()) {
    return DEFAULT_ICON_LIBRARY as PresetIconLibraryName
  }

  const value = document.documentElement.dataset.iconLibrary
  return (value && value in iconLibraries ? value : DEFAULT_ICON_LIBRARY) as PresetIconLibraryName
}

function persistStorage(key: string, value: string) {
  if (!canUseDom()) {
    return
  }

  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore storage write failures
  }
}

function updateDocumentStyle(value: StyleName) {
  if (!canUseDom()) {
    return
  }

  const root = document.documentElement

  root.classList.forEach((className) => {
    if (className.startsWith(STYLE_CLASS_PREFIX)) {
      root.classList.remove(className)
    }
  })

  root.classList.add(`${STYLE_CLASS_PREFIX}${value}`)
}

function createDesignSystemController(options: ControllerOptions = {}): DesignSystemState {
  const scope = options.scope ?? "document"
  const initialState = options.initialState ?? {}

  const [style, rawSetStyle] = createSignal<StyleName>(
    initialState.style ??
      (scope === "document" ? readDocumentStyle() : (DEFAULT_CREATE_CONFIG.style as StyleName))
  )
  const [iconLibrary, rawSetIconLibrary] = createSignal<PresetIconLibraryName>(
    initialState.iconLibrary ??
      (scope === "document"
        ? readDocumentIconLibrary()
        : (DEFAULT_CREATE_CONFIG.iconLibrary as PresetIconLibraryName))
  )
  const [theme, rawSetTheme] = createSignal<ThemeMode>(
    initialState.theme ?? (scope === "document" ? readDocumentTheme() : LIGHT_THEME)
  )
  const [themeName, rawSetThemeName] = createSignal<ThemeName>(
    initialState.themeName ?? DEFAULT_CREATE_CONFIG.theme
  )
  const [baseColor, rawSetBaseColor] = createSignal<BaseColorName>(
    initialState.baseColor ?? DEFAULT_CREATE_CONFIG.baseColor
  )
  const [chartColor, rawSetChartColor] = createSignal<ChartColorName>(
    initialState.chartColor ?? DEFAULT_CREATE_CONFIG.chartColor
  )
  const [font, rawSetFont] = createSignal<FontValue>(
    initialState.font ?? DEFAULT_CREATE_CONFIG.font
  )
  const [fontHeading, rawSetFontHeading] = createSignal<FontHeadingValue>(
    initialState.fontHeading ?? DEFAULT_CREATE_CONFIG.fontHeading
  )
  const [radius, rawSetRadius] = createSignal<RadiusValue>(
    initialState.radius ?? DEFAULT_CREATE_CONFIG.radius
  )
  const [menuAccent, rawSetMenuAccent] = createSignal<MenuAccentValue>(
    initialState.menuAccent ?? DEFAULT_CREATE_CONFIG.menuAccent
  )
  const [menuColor, rawSetMenuColor] = createSignal<MenuColorValue>(
    initialState.menuColor ?? DEFAULT_CREATE_CONFIG.menuColor
  )
  const [item, rawSetItem] = createSignal(initialState.item ?? DEFAULT_CREATE_CONFIG.item)
  const [preset, rawSetPreset] = createSignal(initialState.preset ?? "")

  const previewIconLibrary = createMemo(() => getPreviewIconLibrary(iconLibrary()))
  const hasUnsupportedIconLibrary = createMemo(() => !isSupportedPreviewIconLibrary(iconLibrary()))
  const resolvedBaseColor = createMemo(() => getResolvedBaseColorName(baseColor()))
  const effectiveFontHeading = createMemo(() => {
    const heading = fontHeading()
    return heading === "inherit" ? font() : heading
  })
  const effectiveRadius = createMemo(() => (style() === "lyra" ? "none" : radius()))

  const setStyle = (value: StyleName) => {
    rawSetStyle(value)

    if (scope === "document") {
      updateDocumentStyle(value)
      persistStorage(STORAGE_KEYS.style, value)
    }
  }

  const setIconLibrary = (value: PresetIconLibraryName) => {
    rawSetIconLibrary(value)

    if (scope === "document" && isSupportedPreviewIconLibrary(value) && canUseDom()) {
      document.documentElement.dataset.iconLibrary = value
      persistStorage(STORAGE_KEYS.iconLibrary, value)
    }
  }

  const setTheme = (value: ThemeMode) => {
    rawSetTheme(value)

    if (scope === "document" && canUseDom()) {
      document.documentElement.classList.toggle(THEME_DARK_CLASS, value === DARK_THEME)
      persistStorage(STORAGE_KEYS.theme, value)
    }
  }

  if (scope === "document" && canUseDom()) {
    window.addEventListener(DOCS_COLOR_MODE_CHANGE_EVENT, (event) => {
      const nextTheme = (event as CustomEvent<ThemeMode>).detail

      if (nextTheme === LIGHT_THEME || nextTheme === DARK_THEME) {
        rawSetTheme(nextTheme)
      }
    })
  }

  const setState = (value: Partial<DesignSystemWritableState>) => {
    if (value.style) setStyle(value.style)
    if (value.iconLibrary) setIconLibrary(value.iconLibrary)
    if (value.theme) setTheme(value.theme)
    if (value.themeName) rawSetThemeName(value.themeName)
    if (value.baseColor) rawSetBaseColor(value.baseColor)
    if (value.chartColor) rawSetChartColor(value.chartColor)
    if (value.font) rawSetFont(value.font)
    if (value.fontHeading) rawSetFontHeading(value.fontHeading)
    if (value.radius) rawSetRadius(value.radius)
    if (value.menuAccent) rawSetMenuAccent(value.menuAccent)
    if (value.menuColor) rawSetMenuColor(value.menuColor)
    if (typeof value.item === "string") rawSetItem(value.item)
    if (typeof value.preset === "string") rawSetPreset(value.preset)
  }

  return {
    scope,
    style,
    setStyle,
    iconLibrary,
    setIconLibrary,
    previewIconLibrary,
    hasUnsupportedIconLibrary,
    theme,
    setTheme,
    toggleTheme: () => setTheme(theme() === DARK_THEME ? LIGHT_THEME : DARK_THEME),
    themeName,
    setThemeName: rawSetThemeName,
    baseColor,
    setBaseColor: rawSetBaseColor,
    resolvedBaseColor,
    chartColor,
    setChartColor: rawSetChartColor,
    font,
    setFont: rawSetFont,
    fontHeading,
    setFontHeading: rawSetFontHeading,
    effectiveFontHeading,
    radius,
    setRadius: rawSetRadius,
    effectiveRadius,
    menuAccent,
    setMenuAccent: rawSetMenuAccent,
    menuColor,
    setMenuColor: rawSetMenuColor,
    item,
    setItem: rawSetItem,
    preset,
    setPreset: rawSetPreset,
    setState
  }
}

const defaultDesignSystemState = createRoot(() => createDesignSystemController())
const DesignSystemContext = createContext<DesignSystemState>()

export function DesignSystemProvider(
  props: ParentProps<{
    initialState?: Partial<DesignSystemWritableState>
    scope?: DesignSystemScope
  }>
) {
  const mergedProps = mergeProps({ scope: "memory" as DesignSystemScope }, props)
  const [local] = splitProps(mergedProps, ["initialState", "scope", "children"])
  const value = createDesignSystemController({
    initialState: local.initialState,
    scope: untrack(() => local.scope)
  })

  return (
    <DesignSystemContext.Provider value={value}>
      {local.children as JSX.Element}
    </DesignSystemContext.Provider>
  )
}

export function useDesignSystem() {
  return useContext(DesignSystemContext) ?? defaultDesignSystemState
}

export function useDocumentDesignSystem() {
  return defaultDesignSystemState
}
