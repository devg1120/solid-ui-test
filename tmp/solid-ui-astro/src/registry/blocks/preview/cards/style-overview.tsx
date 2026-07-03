import { createMemo, For } from "solid-js"

import { useDesignSystem } from "~/hooks/use-design-system"
import { FONTS } from "~/lib/create/config"
import { STYLES } from "~/registry/styles"
import { Card, CardContent } from "~/registry/ui/card"

const palette = [
  "--background",
  "--foreground",
  "--primary",
  "--secondary",
  "--muted",
  "--accent",
  "--border",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5"
]

export function StyleOverview() {
  const design = useDesignSystem()
  const currentFont = createMemo(() => FONTS.find((font) => font.value === design.font()))
  const currentHeadingFont = createMemo(() =>
    FONTS.find((font) => font.value === design.fontHeading())
  )
  const currentStyle = createMemo(() => STYLES.find((style) => style.name === design.style()))

  return (
    <Card>
      <CardContent class="flex flex-col gap-6 style-lyra:gap-4 style-mira:gap-4">
        <div class="flex flex-col gap-1">
          <div class="cn-font-heading text-2xl font-medium style-lyra:text-lg style-mira:text-lg">
            {currentStyle()?.title} -{" "}
            {currentHeadingFont()?.name && currentHeadingFont()?.name !== currentFont()?.name
              ? currentHeadingFont()?.name
              : currentFont()?.name}
          </div>
          <div class="line-clamp-2 text-base text-muted-foreground style-lyra:text-sm style-mira:text-sm">
            Designers love packing quirky glyphs into test phrases. This is a preview of the
            typography styles.
          </div>
        </div>
        <div class="grid grid-cols-6 gap-3">
          <For each={palette}>
            {(variant) => (
              <div class="flex flex-col flex-wrap items-center gap-2">
                <div
                  class="relative aspect-square w-full rounded-lg after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
                  style={{ "background-color": `var(${variant})` }}
                />
                <div class="hidden max-w-14 truncate font-mono text-[0.60rem] md:block style-lyra:max-w-10 style-mira:max-w-10">
                  {variant}
                </div>
              </div>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  )
}
