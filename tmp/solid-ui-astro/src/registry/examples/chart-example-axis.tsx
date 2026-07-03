import { Axis, AxisGrid, AxisLabel, Bar } from "solid-charts"

import { ChartContainer, type ChartConfig } from "~/registry/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb"
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa"
  }
} satisfies ChartConfig

export default function ChartExampleAxis() {
  return (
    <ChartContainer config={chartConfig} data={chartData} class="min-h-[200px] w-full">
      <Axis axis="y" position="left" tickCount={5}>
        <AxisGrid />
      </Axis>
      <Axis axis="x" dataKey="month" position="bottom">
        <AxisLabel format={(value) => String(value).slice(0, 3)} />
      </Axis>
      <Bar dataKey="desktop" fill="var(--color-desktop)" rx="4" ry="4" />
      <Bar dataKey="mobile" fill="var(--color-mobile)" rx="4" ry="4" />
    </ChartContainer>
  )
}
