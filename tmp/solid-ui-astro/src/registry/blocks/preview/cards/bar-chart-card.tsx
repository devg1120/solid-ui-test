import { Axis, AxisGrid, AxisLabel, Bar } from "solid-charts"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~/registry/ui/chart"

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
]

const barChartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" }
} satisfies ChartConfig

const desktopTotal = barChartData.reduce((sum, item) => sum + item.desktop, 0)
const mobileTotal = barChartData.reduce((sum, item) => sum + item.mobile, 0)
const desktopDelta = Math.round(((desktopTotal - mobileTotal) / mobileTotal) * 100)

export function BarChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Traffic channels</CardTitle>
        <CardDescription class="line-clamp-2 text-sm leading-snug">
          Monthly desktop and mobile traffic for the last six months. Compare volume and mix across
          platforms at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4 pt-0">
        <ChartContainer config={barChartConfig} data={barChartData} class="max-h-[180px] w-full">
          <Axis axis="y" position="left" tickCount={5}>
            <AxisGrid stroke-dasharray="3 3" />
          </Axis>
          <Axis axis="x" dataKey="month" position="bottom">
            <AxisLabel format={(value) => String(value).slice(0, 3)} />
            <ChartTooltip>
              {({ data }) => (
                <ChartTooltipContent data={data} labelKey="month" indicator="dashed" />
              )}
            </ChartTooltip>
          </Axis>
          <Bar dataKey="desktop" fill="var(--color-desktop)" rx="6" ry="6" />
          <Bar dataKey="mobile" fill="var(--color-mobile)" rx="6" ry="6" />
        </ChartContainer>
        <ChartLegend>
          <ChartLegendContent config={barChartConfig} />
        </ChartLegend>
        <div class="grid w-full grid-cols-3 divide-x divide-border/60">
          <div class="px-2 text-center">
            <div class="text-[0.65rem] text-muted-foreground uppercase">Desktop</div>
            <div class="text-sm font-medium tabular-nums">{desktopTotal.toLocaleString()}</div>
          </div>
          <div class="px-2 text-center">
            <div class="text-[0.65rem] text-muted-foreground uppercase">Mobile</div>
            <div class="text-sm font-medium tabular-nums">{mobileTotal.toLocaleString()}</div>
          </div>
          <div class="px-2 text-center">
            <div class="text-[0.65rem] text-muted-foreground uppercase">Mix Delta</div>
            <div class="text-sm font-medium tabular-nums">
              {desktopDelta > 0 ? "+" : ""}
              {desktopDelta}%
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">View report</Button>
      </CardFooter>
    </Card>
  )
}
