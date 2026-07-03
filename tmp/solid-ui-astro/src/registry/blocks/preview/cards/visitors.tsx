import { Area, Axis, AxisLabel } from "solid-charts"

import { Badge } from "~/registry/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~/registry/ui/chart"

const areaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 }
]

const areaChartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" }
} satisfies ChartConfig

const latestVisitors = areaChartData[areaChartData.length - 1]?.desktop ?? 0
const previousVisitors = areaChartData[areaChartData.length - 2]?.desktop ?? latestVisitors
const trendPercent =
  previousVisitors === 0
    ? 0
    : Math.round(((latestVisitors - previousVisitors) / previousVisitors) * 100)

export function Visitors() {
  return (
    <Card class="pb-0">
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Last 6 months</CardDescription>
        <CardAction>
          <Badge variant={trendPercent >= 0 ? "secondary" : "destructive"}>
            {trendPercent > 0 ? "+" : ""}
            {trendPercent}% vs last month
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent class="px-0">
        <ChartContainer config={areaChartConfig} data={areaChartData} class="h-48 w-full">
          <defs>
            <linearGradient id="visitors-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-desktop)" stop-opacity="0.18" />
              <stop offset="100%" stop-color="var(--color-desktop)" stop-opacity="0.03" />
            </linearGradient>
          </defs>
          <Axis axis="x" dataKey="month" position="bottom">
            <AxisLabel format={(value) => String(value).slice(0, 3)} class="hidden" />
            <ChartTooltip>
              {({ data }) => <ChartTooltipContent data={data} labelKey="month" indicator="line" />}
            </ChartTooltip>
          </Axis>
          <Area
            dataKey="desktop"
            curve="natural"
            fill="url(#visitors-fill)"
            stroke="var(--color-desktop)"
            stroke-width="2"
          />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
