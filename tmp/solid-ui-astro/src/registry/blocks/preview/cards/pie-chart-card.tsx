import { For } from "solid-js"

import { Badge } from "~/registry/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Progress } from "~/registry/ui/progress"

const pieChartData = [
  { browser: "chrome", label: "Chrome", visitors: 275, color: "var(--chart-1)" },
  { browser: "safari", label: "Safari", visitors: 200, color: "var(--chart-2)" },
  { browser: "firefox", label: "Firefox", visitors: 287, color: "var(--chart-3)" },
  { browser: "edge", label: "Edge", visitors: 173, color: "var(--chart-4)" }
]

const totalVisitors = pieChartData.reduce((sum, item) => sum + item.visitors, 0)
const topBrowser = pieChartData.reduce((max, item) => (item.visitors > max.visitors ? item : max))
const topBrowserShare = Math.round((topBrowser.visitors / totalVisitors) * 100)

function circleSegments() {
  let offset = 0
  const circumference = 2 * Math.PI * 42

  return pieChartData.map((segment) => {
    const length = (segment.visitors / totalVisitors) * circumference
    const current = {
      ...segment,
      dasharray: `${length} ${circumference - length}`,
      dashoffset: -offset
    }
    offset += length
    return current
  })
}

export function PieChartCard() {
  return (
    <Card>
      <CardHeader class="pb-0">
        <CardTitle>Browser Share</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
        <CardAction>
          <Badge variant="outline">{topBrowser.label}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent class="pt-0">
        <div class="mx-auto flex aspect-square max-h-[190px] flex-col items-center justify-center gap-4">
          <svg viewBox="0 0 120 120" class="size-full max-h-[150px] -rotate-90 overflow-visible">
            <circle cx="60" cy="60" r="42" fill="none" stroke="var(--muted)" stroke-width="12" />
            <For each={circleSegments()}>
              {(segment) => (
                <circle
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  stroke={segment.color}
                  stroke-width="12"
                  stroke-linecap="round"
                  stroke-dasharray={segment.dasharray}
                  stroke-dashoffset={segment.dashoffset}
                />
              )}
            </For>
            <g transform="rotate(90 60 60)">
              <text x="60" y="54" text-anchor="middle" class="fill-foreground text-2xl font-bold">
                {totalVisitors.toLocaleString()}
              </text>
              <text x="60" y="68" text-anchor="middle" class="fill-muted-foreground text-xs">
                Visitors
              </text>
            </g>
          </svg>
          <div class="flex flex-wrap items-center justify-center gap-4 text-xs">
            <For each={pieChartData}>
              {(item) => (
                <div class="flex items-center gap-1.5">
                  <div class="size-2 rounded-[2px]" style={{ "background-color": item.color }} />
                  <span>{item.label}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex-col items-stretch gap-2">
        <div class="flex items-center text-xs">
          <span class="font-medium">{topBrowser.label}</span>
          <span class="ml-auto text-muted-foreground tabular-nums">{topBrowserShare}%</span>
        </div>
        <Progress value={topBrowserShare} class="**:data-[slot=progress-indicator]:bg-chart-3" />
      </CardFooter>
    </Card>
  )
}
