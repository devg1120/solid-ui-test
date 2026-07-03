import { For } from "solid-js"

import { Card, CardContent, CardFooter } from "~/registry/ui/card"
import { Separator } from "~/registry/ui/separator"

const chartData = [
  { name: "saved", value: 24000, color: "var(--chart-2)" },
  { name: "remaining", value: 6000, color: "var(--chart-1)" }
]

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  }
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

export function SavingsProgress() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0
  const arcs = chartData.map((item) => {
    const sweep = (item.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sweep
    currentAngle = endAngle
    return { ...item, d: describeArc(100, 100, 82, startAngle, endAngle) }
  })

  return (
    <Card>
      <CardContent>
        <div class="mx-auto aspect-square max-h-[220px]">
          <svg viewBox="0 0 200 200" class="size-full overflow-visible">
            <For each={arcs}>
              {(arc) => (
                <path
                  d={arc.d}
                  fill="none"
                  stroke={arc.color}
                  stroke-width="24"
                  stroke-linecap="butt"
                />
              )}
            </For>
            <text x="100" y="92" text-anchor="middle" class="fill-foreground text-[20px] font-bold">
              $24,000
            </text>
            <text x="100" y="116" text-anchor="middle" class="fill-muted-foreground text-[10px]">
              80% of $30,000
            </text>
          </svg>
        </div>
      </CardContent>
      <CardFooter class="flex-col gap-0">
        <div class="flex w-full items-center justify-between py-3">
          <span class="text-sm text-muted-foreground">Projected Finish</span>
          <span class="text-sm font-semibold">October 2024</span>
        </div>
        <Separator />
        <div class="flex w-full items-center justify-between py-3">
          <span class="text-sm text-muted-foreground">Monthly Average</span>
          <span class="text-sm font-semibold tabular-nums">$1,250</span>
        </div>
        <Separator />
        <div class="flex w-full items-center justify-between py-3">
          <span class="text-sm text-muted-foreground">Top Contributor</span>
          <span class="text-sm font-semibold">Auto-Transfer</span>
        </div>
      </CardFooter>
    </Card>
  )
}
