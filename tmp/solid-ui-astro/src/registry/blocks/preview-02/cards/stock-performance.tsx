import { Area, Axis, AxisGrid, AxisLabel } from "solid-charts"
import { createMemo, createSignal } from "solid-js"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from "~/registry/ui/chart"
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from "~/registry/ui/combobox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { InputGroupAddon } from "~/registry/ui/input-group"
import { Separator } from "~/registry/ui/separator"

type TickerOption = { label: string; value: string }

const tickers: TickerOption[] = ["VOO", "VIG", "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"].map(
  (value) => ({
    label: value,
    value
  })
)

const chartData: Record<string, { month: string; price: number }[]> = {
  VOO: [
    { month: "Jan", price: 412 },
    { month: "Feb", price: 438 },
    { month: "Mar", price: 395 },
    { month: "Apr", price: 450 },
    { month: "May", price: 420 },
    { month: "Jun", price: 462 }
  ],
  AAPL: [
    { month: "Jan", price: 185 },
    { month: "Feb", price: 210 },
    { month: "Mar", price: 172 },
    { month: "Apr", price: 198 },
    { month: "May", price: 178 },
    { month: "Jun", price: 215 }
  ]
}

const defaultData = [
  { month: "Jan", price: 100 },
  { month: "Feb", price: 118 },
  { month: "Mar", price: 95 },
  { month: "Apr", price: 125 },
  { month: "May", price: 108 },
  { month: "Jun", price: 130 }
]

const chartConfig = {
  price: {
    label: "Price",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig

export function StockPerformance() {
  const [ticker, setTicker] = createSignal<TickerOption>(tickers[0])
  const data = createMemo(() => chartData[ticker().value] ?? defaultData)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Performance</CardTitle>
        <CardDescription>6-month price history.</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel for="ticker-select">Ticker</FieldLabel>
            <Combobox<TickerOption>
              options={tickers}
              optionValue="value"
              optionLabel="label"
              optionTextValue="label"
              value={ticker()}
              onChange={(value) => value && setTicker(value)}
              placeholder="Search ticker..."
              itemComponent={(props) => (
                <ComboboxItem item={props.item}>{props.item.rawValue.label}</ComboboxItem>
              )}
            >
              <ComboboxControl>
                <ComboboxInput id="ticker-select" />
                <InputGroupAddon align="inline-end">
                  <ComboboxTrigger />
                </InputGroupAddon>
              </ComboboxControl>
              <ComboboxContent>
                <ComboboxList />
                <ComboboxEmpty>No tickers found.</ComboboxEmpty>
              </ComboboxContent>
            </Combobox>
          </Field>
        </FieldGroup>
        <Separator />
        <ChartContainer config={chartConfig} data={data()} class="h-[200px] w-full">
          <defs>
            <linearGradient id="stock-performance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-price)" stop-opacity="0.3" />
              <stop offset="100%" stop-color="var(--color-price)" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          <Axis axis="y" position="left" tickCount={5}>
            <AxisGrid stroke-dasharray="3 3" />
          </Axis>
          <Axis axis="x" dataKey="month" position="bottom">
            <AxisLabel />
            <ChartTooltip>
              {({ data }) => <ChartTooltipContent config={chartConfig} data={data} hideLabel />}
            </ChartTooltip>
          </Axis>
          <Area
            dataKey="price"
            stroke="var(--color-price)"
            stroke-width="2"
            fill="url(#stock-performance-fill)"
          />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
