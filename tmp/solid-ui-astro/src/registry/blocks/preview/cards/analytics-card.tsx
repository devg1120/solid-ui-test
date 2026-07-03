import { Area } from "solid-charts"

import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~/registry/ui/chart"

const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: 237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: 209 },
  { month: "June", visitors: 214 }
]

const chartConfig = {
  visitors: { label: "Visitors", color: "var(--chart-1)" }
} satisfies ChartConfig

export function AnalyticsCard() {
  return (
    <Card class="mx-auto w-full max-w-sm data-[size=sm]:pb-0" size="sm">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>
          418.2K Visitors <Badge>+10%</Badge>
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View Analytics
          </Button>
        </CardAction>
      </CardHeader>
      <ChartContainer config={chartConfig} data={chartData} class="aspect-[1/0.35]">
        <defs>
          <linearGradient id="analytics-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--color-visitors)" stop-opacity="0.4" />
            <stop offset="100%" stop-color="var(--color-visitors)" stop-opacity="0.05" />
          </linearGradient>
        </defs>
        <ChartTooltip>
          {({ data }) => <ChartTooltipContent data={data} indicator="line" hideLabel />}
        </ChartTooltip>
        <Area
          dataKey="visitors"
          curve="linear"
          stroke="var(--color-visitors)"
          stroke-width="2"
          fill="url(#analytics-fill)"
        />
      </ChartContainer>
    </Card>
  )
}
