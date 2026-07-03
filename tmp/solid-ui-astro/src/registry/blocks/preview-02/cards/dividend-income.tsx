import { Axis, Bar } from "solid-charts"
import { For } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
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
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "~/registry/ui/item"

const holdings = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    data: [
      { q: "Q1", value: 380 },
      { q: "Q2", value: 420 },
      { q: "Q3", value: 390 },
      { q: "Q4", value: 652 }
    ]
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    data: [
      { q: "Q1", value: 180 },
      { q: "Q2", value: 210 },
      { q: "Q3", value: 320 },
      { q: "Q4", value: 218 }
    ]
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    data: [
      { q: "Q1", value: 60 },
      { q: "Q2", value: 70 },
      { q: "Q3", value: 120 },
      { q: "Q4", value: 90 }
    ]
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    data: [
      { q: "Q1", value: 240 },
      { q: "Q2", value: 260 },
      { q: "Q3", value: 280 },
      { q: "Q4", value: 360 }
    ]
  }
]

const miniChartConfig = {
  value: {
    label: "Dividend",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig

export function DividendIncome() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Q2 Dividend Income</CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" class="bg-muted">
            <IconPlaceholder lucide="XIcon" tabler="IconX" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <For each={holdings}>
            {(holding) => (
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle>{holding.name}</ItemTitle>
                  <ItemDescription>{holding.shares}</ItemDescription>
                </ItemContent>
                <ChartContainer
                  config={miniChartConfig}
                  data={holding.data}
                  class="hidden h-8 w-24 md:block"
                >
                  <Axis axis="x" dataKey="q" position="bottom">
                    <ChartTooltip>
                      {({ data }) => (
                        <ChartTooltipContent config={miniChartConfig} data={data} hideLabel />
                      )}
                    </ChartTooltip>
                  </Axis>
                  <Bar dataKey="value" fill="var(--color-value)" rx="3" ry="3" />
                </ChartContainer>
                <span class="hidden text-sm font-semibold tabular-nums md:block">
                  {holding.amount}
                </span>
              </Item>
            )}
          </For>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
