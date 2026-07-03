import { Axis, AxisLabel, Bar } from "solid-charts"

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
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~/registry/ui/chart"
import { Progress } from "~/registry/ui/progress"
import { Separator } from "~/registry/ui/separator"

const chartData = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 }
]

const chartConfig = {
  usage: {
    label: "Usage (kW)",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export function PowerUsage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <ChartContainer config={chartConfig} data={chartData} class="h-[140px] w-full">
          <Axis axis="x" dataKey="hour" position="bottom">
            <AxisLabel class="text-xs" />
            <ChartTooltip>
              {({ data }) => <ChartTooltipContent config={chartConfig} data={data} hideLabel />}
            </ChartTooltip>
          </Axis>
          <Bar dataKey="usage" fill="var(--color-usage)" rx="4" ry="4" />
        </ChartContainer>
        <Separator />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Currently Using</span>
            <span class="text-lg font-semibold tabular-nums">3.4 kW</span>
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-sm text-muted-foreground">Solar Gen</span>
            <span class="text-lg font-semibold text-chart-1 tabular-nums">+1.2 kW</span>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex-col items-start gap-1">
        <span class="text-sm text-muted-foreground">Battery Level</span>
        <div class="flex w-full items-center gap-2">
          <Progress value={85} class="flex-1" />
          <span class="text-sm font-medium tabular-nums">85%</span>
        </div>
      </CardFooter>
    </Card>
  )
}
