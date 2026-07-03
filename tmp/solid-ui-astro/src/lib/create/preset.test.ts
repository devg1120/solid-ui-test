import { describe, expect, it } from "vitest"

import {
  decodePreset,
  DEFAULT_PRESET_CONFIG,
  encodePreset,
  fromBase62,
  generateRandomPreset,
  isPresetCode,
  isValidPreset,
  PRESET_BASE_COLORS,
  PRESET_CHART_COLORS,
  PRESET_FONT_HEADINGS,
  PRESET_FONTS,
  PRESET_ICON_LIBRARIES,
  PRESET_MENU_ACCENTS,
  PRESET_MENU_COLORS,
  PRESET_RADII,
  PRESET_STYLES,
  PRESET_THEMES,
  toBase62,
  type PresetConfig
} from "~/lib/create/preset"

describe("base62", () => {
  it("round-trips numbers", () => {
    for (const value of [0, 1, 61, 62, 100, 1000, 8388607]) {
      expect(fromBase62(toBase62(value))).toBe(value)
    }
  })

  it("encodes 0 as 0", () => {
    expect(toBase62(0)).toBe("0")
  })

  it("returns -1 for invalid base62 characters", () => {
    expect(fromBase62("!@#")).toBe(-1)
  })
})

describe("encodePreset / decodePreset", () => {
  it("round-trips the default config", () => {
    const code = encodePreset(DEFAULT_PRESET_CONFIG)
    expect(decodePreset(code)).toEqual(DEFAULT_PRESET_CONFIG)
  })

  it("round-trips a custom config", () => {
    const config: PresetConfig = {
      style: "lyra",
      baseColor: "zinc",
      theme: "blue",
      chartColor: "emerald",
      iconLibrary: "tabler",
      font: "jetbrains-mono",
      fontHeading: "playfair-display",
      radius: "large",
      menuAccent: "bold",
      menuColor: "inverted"
    }

    const code = encodePreset(config)
    expect(decodePreset(code)).toEqual(config)
  })

  it("produces short codes", () => {
    expect(encodePreset(DEFAULT_PRESET_CONFIG).length).toBeLessThanOrEqual(10)
  })

  it("starts with the version character", () => {
    expect(encodePreset(DEFAULT_PRESET_CONFIG)[0]).toBe("b")
  })

  it("fills defaults for partial configs", () => {
    const decoded = decodePreset(encodePreset({ style: "lyra" }))
    expect(decoded).not.toBeNull()
    expect(decoded?.style).toBe("lyra")
    expect(decoded?.theme).toBe(DEFAULT_PRESET_CONFIG.theme)
  })

  it("round-trips all styles", () => {
    for (const style of PRESET_STYLES) {
      expect(decodePreset(encodePreset({ style }))?.style).toBe(style)
    }
  })

  it("round-trips all themes", () => {
    for (const theme of PRESET_THEMES) {
      expect(decodePreset(encodePreset({ theme }))?.theme).toBe(theme)
    }
  })

  it("round-trips all fonts", () => {
    for (const font of PRESET_FONTS) {
      expect(decodePreset(encodePreset({ font }))?.font).toBe(font)
    }
  })

  it("round-trips all font headings", () => {
    for (const fontHeading of PRESET_FONT_HEADINGS) {
      expect(decodePreset(encodePreset({ fontHeading }))?.fontHeading).toBe(fontHeading)
    }
  })

  it("round-trips all icon libraries", () => {
    for (const iconLibrary of PRESET_ICON_LIBRARIES) {
      expect(decodePreset(encodePreset({ iconLibrary }))?.iconLibrary).toBe(iconLibrary)
    }
  })

  it("round-trips all radii", () => {
    for (const radius of PRESET_RADII) {
      expect(decodePreset(encodePreset({ radius }))?.radius).toBe(radius)
    }
  })

  it("round-trips all base colors", () => {
    for (const baseColor of PRESET_BASE_COLORS) {
      expect(decodePreset(encodePreset({ baseColor }))?.baseColor).toBe(baseColor)
    }
  })

  it("round-trips all chart colors", () => {
    for (const chartColor of PRESET_CHART_COLORS) {
      expect(decodePreset(encodePreset({ chartColor }))?.chartColor).toBe(chartColor)
    }
  })

  it("round-trips menu accents and colors", () => {
    for (const menuAccent of PRESET_MENU_ACCENTS) {
      for (const menuColor of PRESET_MENU_COLORS) {
        const decoded = decodePreset(encodePreset({ menuAccent, menuColor }))
        expect(decoded?.menuAccent).toBe(menuAccent)
        expect(decoded?.menuColor).toBe(menuColor)
      }
    }
  })
})

describe("decodePreset edge cases", () => {
  it("returns null for empty strings", () => {
    expect(decodePreset("")).toBeNull()
  })

  it("returns null for single characters", () => {
    expect(decodePreset("A")).toBeNull()
  })

  it("returns null for wrong version prefixes", () => {
    expect(decodePreset("c123")).toBeNull()
  })

  it("returns null for invalid base62 characters", () => {
    expect(decodePreset("A!@#")).toBeNull()
  })
})

describe("v1/v2 backward compatibility", () => {
  it("decodes old a-prefixed codes without chartColor", () => {
    const decoded = decodePreset("a0")
    expect(decoded).not.toBeNull()
    expect(decoded?.style).toBe("nova")
    expect(decoded?.theme).toBe("neutral")
    expect(decoded?.chartColor).toBe("blue")
    expect(decoded?.fontHeading).toBe("inherit")
  })

  it("decodes new b-prefixed codes with chartColor", () => {
    const decoded = decodePreset(encodePreset({ theme: "blue", chartColor: "emerald" }))
    expect(decoded).not.toBeNull()
    expect(decoded?.theme).toBe("blue")
    expect(decoded?.chartColor).toBe("emerald")
  })

  it("defaults old b-prefixed codes to inherit heading fonts", () => {
    expect(decodePreset("b0")?.fontHeading).toBe("inherit")
  })

  it("always encodes with a b prefix", () => {
    expect(encodePreset({})[0]).toBe("b")
  })

  it("accepts both a and b prefixes", () => {
    expect(isPresetCode("a0")).toBe(true)
    expect(isPresetCode("b0")).toBe(true)
    expect(isPresetCode("c0")).toBe(false)
  })
})

describe("isPresetCode", () => {
  it("returns true for valid preset codes", () => {
    expect(isPresetCode(encodePreset(DEFAULT_PRESET_CONFIG))).toBe(true)
  })

  it("returns false for invalid values", () => {
    expect(isPresetCode("")).toBe(false)
    expect(isPresetCode("https://ui.shadcn.com/init?foo=bar")).toBe(false)
    expect(isPresetCode("radix-nova")).toBe(false)
    expect(isPresetCode("A1234567890")).toBe(false)
    expect(isPresetCode("A!@#")).toBe(false)
  })
})

describe("isValidPreset", () => {
  it("returns true for valid presets", () => {
    expect(isValidPreset(encodePreset(DEFAULT_PRESET_CONFIG))).toBe(true)
  })

  it("returns false for invalid codes", () => {
    expect(isValidPreset("")).toBe(false)
    expect(isValidPreset("c123")).toBe(false)
  })
})

describe("generateRandomPreset", () => {
  it("produces valid preset codes", () => {
    const code = generateRandomPreset()
    expect(isPresetCode(code)).toBe(true)
    expect(isValidPreset(code)).toBe(true)
  })

  it("round-trips generated presets", () => {
    const code = generateRandomPreset()
    const decoded = decodePreset(code)
    expect(decoded).not.toBeNull()
    expect(encodePreset(decoded!)).toBe(code)
  })
})
