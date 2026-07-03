import { Axis, AxisLabel, Bar } from "solid-charts"

import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardAction,
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
import { Item, ItemContent, ItemDescription } from "~/registry/ui/item"

const chartData = [
  { month: "Dec", amount: 800 },
  { month: "Jan", amount: 1100 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1300 },
  { month: "Apr", amount: 750 },
  { month: "May", amount: 1400 }
]

const chartConfig = {
  amount: {
    label: "Contribution",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export function ContributionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
        <CardAction>
          <Badge variant="secondary">+12% vs last month</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          data={chartData}
          class="h-[200px] w-full"
          barConfig={{ maxBarSize: 40 }}
        >
          <Axis axis="x" dataKey="month" position="bottom">
            <AxisLabel />
            <ChartTooltip>
              {({ data }) => (
                <ChartTooltipContent config={chartConfig} data={data} hideLabel class="min-w-40" />
              )}
            </ChartTooltip>
          </Axis>
          <Bar dataKey="amount" fill="var(--color-amount)" rx="6" ry="6" />
        </ChartContainer>
      </CardContent>
      <CardFooter class="flex-col gap-4">
        <div class="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
          <Item variant="muted" class="flex-col items-stretch">
            <ItemContent class="gap-1">
              <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Upcoming
              </ItemDescription>
              <span class="cn-font-heading text-lg font-semibold">May 25, 2024</span>
              <span class="text-sm text-muted-foreground">$1,000 scheduled</span>
            </ItemContent>
          </Item>
          <Item variant="muted" class="flex-col items-stretch">
            <ItemContent class="gap-1">
              <ItemDescription class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Auto-Save Plan
              </ItemDescription>
              <span class="cn-font-heading text-lg font-semibold">Accelerated</span>
              <span class="text-sm text-muted-foreground">Recurring weekly</span>
            </ItemContent>
          </Item>
        </div>
        <Button class="w-full">View Full Report</Button>
      </CardFooter>
    </Card>
  )
}
