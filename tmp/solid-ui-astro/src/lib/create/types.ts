import type {
  PRESET_BASE_COLORS,
  PRESET_CHART_COLORS,
  PRESET_FONT_HEADINGS,
  PRESET_FONTS,
  PRESET_ICON_LIBRARIES,
  PRESET_MENU_ACCENTS,
  PRESET_MENU_COLORS,
  PRESET_RADII,
  PRESET_STYLES,
  PRESET_THEMES
} from "~/lib/create/preset"

export type StyleName = (typeof PRESET_STYLES)[number]
export type BaseColorName = (typeof PRESET_BASE_COLORS)[number]
export type ThemeName = (typeof PRESET_THEMES)[number]
export type ChartColorName = (typeof PRESET_CHART_COLORS)[number]
export type FontValue = (typeof PRESET_FONTS)[number]
export type FontHeadingValue = (typeof PRESET_FONT_HEADINGS)[number]
export type PresetIconLibraryName = (typeof PRESET_ICON_LIBRARIES)[number]
export type RadiusValue = (typeof PRESET_RADII)[number]
export type MenuAccentValue = (typeof PRESET_MENU_ACCENTS)[number]
export type MenuColorValue = (typeof PRESET_MENU_COLORS)[number]

export type ThemeTokens = Record<string, string>

export type ThemeDefinition = {
  name: ThemeName
  title: string
  type?: "registry:theme"
  cssVars: {
    light: ThemeTokens
    dark: ThemeTokens
  }
}

export type FontDefinition = {
  name: FontValue
  title: string
  type: "sans" | "mono" | "serif"
  family: string
  registryVariable: "--font-sans" | "--font-mono" | "--font-serif"
  previewVariable: string
  provider: "google"
  import: string
  dependency: string
  subsets: readonly string[]
  weight?: readonly string[]
}
