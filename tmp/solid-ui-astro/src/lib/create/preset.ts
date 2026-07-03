// Preset encoding/decoding utilities.
// Bit-packs design system params into a single integer,
// then encodes as base62 with a version prefix character.
// Browser-safe: no Node.js dependencies.
//
// Rules for backward compat:
//   1. Never reorder existing value arrays — only append.
//   2. New fields must have their default at index 0.
//   3. Only append new fields to the end of PRESET_FIELDS.
//   4. Stay under 53 bits total (JS safe integer limit).

export const PRESET_BASES = ["radix", "base"] as const

export const PRESET_STYLES = ["nova", "vega", "maia", "lyra", "mira", "luma"] as const

export const PRESET_BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe"
] as const

export const PRESET_THEMES = [
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
] as const

export const PRESET_CHART_COLORS = PRESET_THEMES

export const V1_CHART_COLOR_MAP: Record<string, string> = {
  neutral: "blue",
  stone: "lime",
  zinc: "amber",
  mauve: "emerald",
  olive: "violet",
  mist: "rose",
  taupe: "cyan"
}

export const PRESET_ICON_LIBRARIES = [
  "lucide",
  "hugeicons",
  "tabler",
  "phosphor",
  "remixicon"
] as const

export const PRESET_FONTS = [
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
] as const

export const PRESET_FONT_HEADINGS = ["inherit", ...PRESET_FONTS] as const

export const PRESET_RADII = ["default", "none", "small", "medium", "large"] as const

export const PRESET_MENU_ACCENTS = ["subtle", "bold"] as const

export const PRESET_MENU_COLORS = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent"
] as const

const PRESET_FIELDS_V1 = [
  { key: "menuColor", values: PRESET_MENU_COLORS, bits: 3 },
  { key: "menuAccent", values: PRESET_MENU_ACCENTS, bits: 3 },
  { key: "radius", values: PRESET_RADII, bits: 4 },
  { key: "font", values: PRESET_FONTS, bits: 6 },
  { key: "iconLibrary", values: PRESET_ICON_LIBRARIES, bits: 6 },
  { key: "theme", values: PRESET_THEMES, bits: 6 },
  { key: "baseColor", values: PRESET_BASE_COLORS, bits: 6 },
  { key: "style", values: PRESET_STYLES, bits: 6 }
] as const

const PRESET_FIELDS_V2 = [
  ...PRESET_FIELDS_V1,
  { key: "chartColor", values: PRESET_CHART_COLORS, bits: 6 },
  { key: "fontHeading", values: PRESET_FONT_HEADINGS, bits: 5 }
] as const

export type PresetConfig = {
  style: (typeof PRESET_STYLES)[number]
  baseColor: (typeof PRESET_BASE_COLORS)[number]
  theme: (typeof PRESET_THEMES)[number]
  chartColor: (typeof PRESET_CHART_COLORS)[number]
  iconLibrary: (typeof PRESET_ICON_LIBRARIES)[number]
  font: (typeof PRESET_FONTS)[number]
  fontHeading: (typeof PRESET_FONT_HEADINGS)[number]
  radius: (typeof PRESET_RADII)[number]
  menuAccent: (typeof PRESET_MENU_ACCENTS)[number]
  menuColor: (typeof PRESET_MENU_COLORS)[number]
}

export const DEFAULT_PRESET_CONFIG: PresetConfig = Object.fromEntries(
  PRESET_FIELDS_V2.map((field) => [field.key, field.values[0]])
) as PresetConfig

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const CURRENT_VERSION = "b"
const VALID_VERSIONS = ["a", "b"] as const

export function toBase62(num: number) {
  if (num === 0) {
    return "0"
  }

  let result = ""
  let current = num

  while (current > 0) {
    result = BASE62[current % 62] + result
    current = Math.floor(current / 62)
  }

  return result
}

export function fromBase62(value: string) {
  let result = 0

  for (let index = 0; index < value.length; index += 1) {
    const charIndex = BASE62.indexOf(value[index])

    if (charIndex === -1) {
      return -1
    }

    result = result * 62 + charIndex
  }

  return result
}

export function encodePreset(config: Partial<PresetConfig>) {
  const merged = { ...DEFAULT_PRESET_CONFIG, ...config }
  let bits = 0
  let offset = 0

  for (const field of PRESET_FIELDS_V2) {
    const fieldValues = field.values as readonly string[]
    const value = merged[field.key as keyof PresetConfig] as string
    const index = fieldValues.indexOf(value)

    bits += (index === -1 ? 0 : index) * 2 ** offset
    offset += field.bits
  }

  return CURRENT_VERSION + toBase62(bits)
}

export function decodePreset(code: string): PresetConfig | null {
  if (!code || code.length < 2) {
    return null
  }

  const version = code[0]

  if (!VALID_VERSIONS.includes(version as (typeof VALID_VERSIONS)[number])) {
    return null
  }

  const fields = version === "a" ? PRESET_FIELDS_V1 : PRESET_FIELDS_V2
  const bits = fromBase62(code.slice(1))

  if (bits < 0) {
    return null
  }

  const result = {} as Record<string, string>
  let offset = 0

  for (const field of fields) {
    const index = Math.floor(bits / 2 ** offset) % 2 ** field.bits
    result[field.key] = index < field.values.length ? field.values[index] : field.values[0]
    offset += field.bits
  }

  if (version === "a") {
    result.chartColor = V1_CHART_COLOR_MAP[result.theme] ?? result.theme
    result.fontHeading = "inherit"
  }

  return result as PresetConfig
}

export function isPresetCode(value: string) {
  if (!value || value.length < 2 || value.length > 10) {
    return false
  }

  if (!VALID_VERSIONS.includes(value[0] as (typeof VALID_VERSIONS)[number])) {
    return false
  }

  for (let index = 1; index < value.length; index += 1) {
    if (BASE62.indexOf(value[index]) === -1) {
      return false
    }
  }

  return true
}

export function isValidPreset(code: string) {
  return decodePreset(code) !== null
}

export function generateRandomConfig(): PresetConfig {
  const pick = <T>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)]

  return Object.fromEntries(
    PRESET_FIELDS_V2.map((field) => [field.key, pick(field.values)])
  ) as PresetConfig
}

export function generateRandomPreset() {
  return encodePreset(generateRandomConfig())
}
