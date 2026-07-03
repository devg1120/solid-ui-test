import {
  DEFAULT_CREATE_CONFIG,
  DEFAULT_CREATE_ITEM,
  getThemesForBaseColor
} from "~/lib/create/config"
import { decodePreset, encodePreset, generateRandomPreset, isPresetCode } from "~/lib/create/preset"
import { resolvePresetOverrides } from "~/lib/create/preset-query"
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

type CreateUrlState = {
  style: StyleName
  baseColor: BaseColorName
  themeName: ThemeName
  chartColor: ChartColorName
  iconLibrary: PresetIconLibraryName
  font: FontValue
  fontHeading: FontHeadingValue
  radius: RadiusValue
  menuAccent: MenuAccentValue
  menuColor: MenuColorValue
  item: string
  preset: string
}

const STYLE_NAMES = new Set<StyleName>(["vega", "nova", "maia", "lyra", "mira", "luma"])
const BASE_COLOR_NAMES = new Set<BaseColorName>([
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe"
])
const THEME_NAMES = new Set<ThemeName>([
  "neutral",
  "stone",
  "zinc",
  "gray",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
  "mauve",
  "olive",
  "mist",
  "taupe"
])
const FONT_NAMES = new Set<FontValue>([
  "inter",
  "noto-sans",
  "nunito-sans",
  "figtree",
  "roboto",
  "raleway",
  "dm-sans",
  "public-sans",
  "outfit",
  "jetbrains-mono",
  "geist",
  "geist-mono",
  "lora",
  "merriweather",
  "playfair-display",
  "noto-serif",
  "roboto-slab",
  "oxanium",
  "manrope",
  "space-grotesk",
  "montserrat",
  "ibm-plex-sans",
  "source-sans-3",
  "instrument-sans"
])
const FONT_HEADING_NAMES = new Set<FontHeadingValue>(["inherit", ...FONT_NAMES])
const ICON_LIBRARY_NAMES = new Set<PresetIconLibraryName>([
  "lucide",
  "hugeicons",
  "tabler",
  "phosphor",
  "remixicon"
])
const RADIUS_NAMES = new Set<RadiusValue>(["default", "none", "small", "medium", "large"])
const MENU_ACCENT_NAMES = new Set<MenuAccentValue>(["subtle", "bold"])
const MENU_COLOR_NAMES = new Set<MenuColorValue>([
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent"
])

function getValidatedValue<T extends string>(
  rawValue: string | null,
  values: Set<T>,
  fallback: T
): T {
  return rawValue && values.has(rawValue as T) ? (rawValue as T) : fallback
}

export function parseCreateSearchParams(searchParams: URLSearchParams) {
  let presetCode = searchParams.get("preset") ?? ""

  if (presetCode === "random") {
    presetCode = generateRandomPreset()
  }

  let resolved: CreateUrlState = {
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
    item: searchParams.get("item") || DEFAULT_CREATE_CONFIG.item,
    preset: ""
  }

  if (presetCode && isPresetCode(presetCode)) {
    const decoded = decodePreset(presetCode)

    if (decoded) {
      const overrides = resolvePresetOverrides(searchParams, {
        theme: decoded.theme,
        chartColor: decoded.chartColor,
        fontHeading: decoded.fontHeading
      })

      resolved = {
        ...resolved,
        style: decoded.style,
        baseColor: decoded.baseColor,
        themeName: decoded.theme,
        chartColor: overrides.chartColor,
        iconLibrary: decoded.iconLibrary,
        font: decoded.font,
        fontHeading: overrides.fontHeading,
        radius: decoded.radius,
        menuAccent: decoded.menuAccent,
        menuColor: decoded.menuColor,
        preset: presetCode
      }
    }
  }

  resolved = {
    ...resolved,
    style: getValidatedValue(searchParams.get("style"), STYLE_NAMES, resolved.style),
    baseColor: getValidatedValue(
      searchParams.get("baseColor"),
      BASE_COLOR_NAMES,
      resolved.baseColor
    ),
    themeName: getValidatedValue(searchParams.get("theme"), THEME_NAMES, resolved.themeName),
    chartColor: getValidatedValue(searchParams.get("chartColor"), THEME_NAMES, resolved.chartColor),
    iconLibrary: getValidatedValue(
      searchParams.get("iconLibrary"),
      ICON_LIBRARY_NAMES,
      resolved.iconLibrary
    ),
    font: getValidatedValue(searchParams.get("font"), FONT_NAMES, resolved.font),
    fontHeading: getValidatedValue(
      searchParams.get("fontHeading"),
      FONT_HEADING_NAMES,
      resolved.fontHeading
    ),
    radius: getValidatedValue(searchParams.get("radius"), RADIUS_NAMES, resolved.radius),
    menuAccent: getValidatedValue(
      searchParams.get("menuAccent"),
      MENU_ACCENT_NAMES,
      resolved.menuAccent
    ),
    menuColor: getValidatedValue(
      searchParams.get("menuColor"),
      MENU_COLOR_NAMES,
      resolved.menuColor
    ),
    item: searchParams.get("item") || resolved.item
  }

  const availableThemes = getThemesForBaseColor(resolved.baseColor)
  const fallbackTheme = availableThemes[0]?.name

  if (fallbackTheme) {
    if (!availableThemes.some((theme) => theme.name === resolved.themeName)) {
      resolved.themeName = fallbackTheme
    }

    if (!availableThemes.some((theme) => theme.name === resolved.chartColor)) {
      resolved.chartColor = fallbackTheme
    }
  }

  const encodedPreset = encodePreset({
    style: resolved.style,
    baseColor: resolved.baseColor,
    theme: resolved.themeName,
    chartColor: resolved.chartColor,
    iconLibrary: resolved.iconLibrary,
    font: resolved.font,
    fontHeading: resolved.fontHeading,
    radius: resolved.radius,
    menuAccent: resolved.menuAccent,
    menuColor: resolved.menuColor
  })

  resolved.preset = encodedPreset

  return {
    state: resolved,
    search: serializeCreateSearchParams(resolved)
  }
}

export function serializeCreateSearchParams(state: CreateUrlState) {
  const searchParams = new URLSearchParams()

  searchParams.set(
    "preset",
    encodePreset({
      style: state.style,
      baseColor: state.baseColor,
      theme: state.themeName,
      chartColor: state.chartColor,
      iconLibrary: state.iconLibrary,
      font: state.font,
      fontHeading: state.fontHeading,
      radius: state.radius,
      menuAccent: state.menuAccent,
      menuColor: state.menuColor
    })
  )

  if (state.item && state.item !== DEFAULT_CREATE_ITEM) {
    searchParams.set("item", state.item)
  }

  return searchParams.toString()
}
