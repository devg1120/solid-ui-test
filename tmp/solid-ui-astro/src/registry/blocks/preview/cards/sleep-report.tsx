import { For } from "solid-js"

import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"

const sleepChartData = [
  { hour: "10pm", deep: 0, light: 30, rem: 0 },
  { hour: "11pm", deep: 20, light: 10, rem: 0 },
  { hour: "12am", deep: 40, light: 0, rem: 10 },
  { hour: "1am", deep: 30, light: 5, rem: 15 },
  { hour: "2am", deep: 10, light: 20, rem: 30 },
  { hour: "3am", deep: 25, light: 10, rem: 20 },
  { hour: "4am", deep: 15, light: 25, rem: 10 },
  { hour: "5am", deep: 5, light: 35, rem: 15 },
  { hour: "6am", deep: 0, light: 20, rem: 25 }
]

const stats = [
  { label: "Deep", value: "2h 10m" },
  { label: "Light", value: "3h 48m" },
  { label: "REM", value: "1h 26m" },
  { label: "Score", value: "84" }
]

export function SleepReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Report</CardTitle>
        <CardDescription>Last night · 7h 24m</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-3">
        <div class="grid h-32 grid-cols-9 items-end gap-1.5">
          <For each={sleepChartData}>
            {(entry) => (
              <div class="flex h-full flex-col justify-end overflow-hidden rounded-sm bg-muted/40">
                <div class="w-full bg-chart-1" style={{ height: `${entry.deep}%` }} />
                <div class="w-full bg-chart-2" style={{ height: `${entry.light}%` }} />
                <div class="w-full bg-chart-3" style={{ height: `${entry.rem}%` }} />
              </div>
            )}
          </For>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <For each={stats}>
            {(stat) => (
              <div class="text-center">
                <div class="text-sm font-medium tabular-nums">{stat.value}</div>
                <div class="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )}
          </For>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant="outline">Good</Badge>
        <Button variant="outline" size="sm" class="ml-auto">
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}
