import { FONT_DEFINITIONS } from "~/lib/create/font-definitions"
import {
  DEFAULT_PRESET_CONFIG,
  PRESET_BASE_COLORS,
  PRESET_FONTS,
  PRESET_MENU_ACCENTS,
  PRESET_MENU_COLORS,
  type PresetConfig
} from "~/lib/create/preset"
import { THEMES } from "~/lib/create/themes"
import type {
  BaseColorName,
  ChartColorName,
  FontHeadingValue,
  FontValue,
  MenuAccentValue,
  MenuColorValue,
  PresetIconLibraryName,
  RadiusValue,
  ThemeDefinition,
  ThemeName
} from "~/lib/create/types"
import { DEFAULT_ICON_LIBRARY } from "~/lib/design-system"
import { iconLibraries, type IconLibraryName } from "~/registry/icon-libraries"
import { STYLES, type Style } from "~/registry/styles"

export const SUPPORTED_ICON_LIBRARY_NAMES = [
  "lucide",
  "tabler"
] as const satisfies readonly IconLibraryName[]

export const LEGACY_BASE_COLOR_FALLBACKS = {
  gray: "zinc"
} as const satisfies Partial<Record<BaseColorName, Exclude<BaseColorName, "gray">>>

export const LEGACY_THEME_FALLBACKS = {
  gray: "zinc"
} as const satisfies Partial<Record<ThemeName, Exclude<ThemeName, "gray">>>

export const MENU_ACCENTS = PRESET_MENU_ACCENTS.map((value) => ({
  value,
  label: value === "bold" ? "Bold" : "Subtle"
})) satisfies readonly { value: MenuAccentValue; label: string }[]

export const MENU_COLORS = PRESET_MENU_COLORS.map((value) => ({
  value,
  label:
    value === "default"
      ? "Default"
      : value === "inverted"
        ? "Inverted"
        : value === "default-translucent"
          ? "Default Translucent"
          : "Inverted Translucent"
})) satisfies readonly { value: MenuColorValue; label: string }[]

export const RADII = [
  { name: "default", label: "Default", value: "" },
  { name: "none", label: "None", value: "0" },
  { name: "small", label: "Small", value: "0.45rem" },
  { name: "medium", label: "Medium", value: "0.625rem" },
  { name: "large", label: "Large", value: "0.875rem" }
] as const satisfies readonly { name: RadiusValue; label: string; value: string }[]

export const FONTS = FONT_DEFINITIONS.map((definition) => ({
  ...definition,
  value: definition.name,
  font: {
    style: {
      fontFamily: definition.family
    }
  }
}))

type BaseColorDefinition = ThemeDefinition & { name: BaseColorName }

export const BASE_COLOR_NAMES = new Set<BaseColorName>(PRESET_BASE_COLORS)

function isBaseColorTheme(theme: ThemeDefinition): theme is BaseColorDefinition {
  return BASE_COLOR_NAMES.has(theme.name as BaseColorName)
}

export const BASE_COLORS = THEMES.filter(isBaseColorTheme)

export const DEFAULT_CREATE_ITEM = "preview-02"

export const DEFAULT_CREATE_CONFIG = {
  ...DEFAULT_PRESET_CONFIG,
  iconLibrary: DEFAULT_ICON_LIBRARY as PresetIconLibraryName,
  item: DEFAULT_CREATE_ITEM
} as const

export type CreateConfig = PresetConfig & {
  item: string
}

export function getStyle(name: string) {
  return STYLES.find((style) => style.name === name)
}

export function getTheme(name: string) {
  return THEMES.find((theme) => theme.name === name)
}

export function getBaseColor(name: string) {
  return BASE_COLORS.find((color) => color.name === name)
}

export function getResolvedBaseColorName(baseColor: BaseColorName) {
  return baseColor === "gray" ? LEGACY_BASE_COLOR_FALLBACKS.gray : baseColor
}

export function getResolvedThemeName(themeName: ThemeName | ChartColorName) {
  return themeName === "gray" ? LEGACY_THEME_FALLBACKS.gray : themeName
}

export function getFont(value: FontValue | FontHeadingValue) {
  if (value === "inherit") {
    return undefined
  }

  return FONTS.find((font) => font.value === value)
}

export function getThemesForBaseColor(baseColorName: BaseColorName) {
  const resolvedBaseColor = getResolvedBaseColorName(baseColorName)
  const baseColorNames = BASE_COLORS.map((baseColor) => baseColor.name)

  return THEMES.filter((theme) => {
    if (theme.name === resolvedBaseColor) {
      return true
    }

    return !baseColorNames.includes(theme.name)
  })
}

export function isSupportedPreviewIconLibrary(value: string): value is IconLibraryName {
  return SUPPORTED_ICON_LIBRARY_NAMES.includes(value as IconLibraryName)
}

export function getPreviewIconLibrary(value: PresetIconLibraryName | IconLibraryName) {
  return isSupportedPreviewIconLibrary(value) ? value : "lucide"
}

export function getAvailableIconLibraryOptions() {
  return SUPPORTED_ICON_LIBRARY_NAMES.map((name) => iconLibraries[name])
}

export function getAvailableStyleOptions() {
  return STYLES as readonly Style[]
}

export function getAvailableFontOptions() {
  return FONTS.filter((font) => PRESET_FONTS.includes(font.value))
}

export function isTranslucentMenuColor(menuColor: MenuColorValue) {
  return menuColor === "default-translucent" || menuColor === "inverted-translucent"
}

export function isInvertedMenuColor(menuColor: MenuColorValue) {
  return menuColor === "inverted" || menuColor === "inverted-translucent"
}

function mergeThemeVars(baseColor: ThemeDefinition, theme: ThemeDefinition) {
  return {
    light: {
      ...baseColor.cssVars.light,
      ...theme.cssVars.light
    },
    dark: {
      ...baseColor.cssVars.dark,
      ...theme.cssVars.dark
    }
  }
}

export function buildPreviewTheme(config: {
  baseColor: BaseColorName
  theme: ThemeName
  chartColor: ChartColorName
  menuAccent: MenuAccentValue
  radius: RadiusValue
}) {
  const resolvedBaseColorName = getResolvedBaseColorName(config.baseColor)
  const baseColor = getTheme(resolvedBaseColorName)
  const theme = getTheme(getResolvedThemeName(config.theme))

  if (!baseColor || !theme) {
    return null
  }

  const merged = mergeThemeVars(baseColor, theme)
  const lightVars = { ...merged.light }
  const darkVars = { ...merged.dark }

  const chartTheme = getTheme(getResolvedThemeName(config.chartColor))

  if (chartTheme) {
    const chartLightVars: Record<string, string> = chartTheme.cssVars.light
    const chartDarkVars: Record<string, string> = chartTheme.cssVars.dark

    for (let index = 1; index <= 5; index += 1) {
      const key = `chart-${index}` as const
      if (chartLightVars[key]) {
        lightVars[key] = chartLightVars[key]
      }
      if (chartDarkVars[key]) {
        darkVars[key] = chartDarkVars[key]
      }
    }
  }

  if (config.menuAccent === "bold") {
    lightVars.accent = lightVars.primary
    lightVars["accent-foreground"] = lightVars["primary-foreground"]
    darkVars.accent = darkVars.primary
    darkVars["accent-foreground"] = darkVars["primary-foreground"]
  }

  if (config.radius !== "default") {
    const radius = RADII.find((entry) => entry.name === config.radius)
    if (radius?.value) {
      lightVars.radius = radius.value
      darkVars.radius = radius.value
    }
  }

  return {
    baseColor,
    theme,
    cssVars: {
      light: lightVars,
      dark: darkVars
    }
  }
}
