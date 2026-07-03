import { For } from "solid-js"

import CalendarPresets from "~/registry/examples/calendar-presets"
import ChartDemo from "~/registry/examples/chart-demo"
import EmptyDemo from "~/registry/examples/empty-demo"
import PaginationDemo from "~/registry/examples/pagination-demo"
import TabsDemo from "~/registry/examples/tabs-demo"
import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import { Input } from "~/registry/ui/input"
import { Progress } from "~/registry/ui/progress"
import { Separator } from "~/registry/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

const metrics = [
  {
    label: "Revenue",
    value: "$84,250",
    detail: "+12.4% from last month"
  },
  {
    label: "Active users",
    value: "18,402",
    detail: "+1,124 this week"
  },
  {
    label: "Conversion",
    value: "4.82%",
    detail: "Best performing funnel"
  }
] as const

const releaseChecklist = [
  {
    label: "Design tokens",
    value: 92
  },
  {
    label: "Component coverage",
    value: 78
  },
  {
    label: "Docs review",
    value: 63
  }
] as const

const deployments = [
  {
    name: "Marketing site",
    owner: "Design",
    eta: "Today",
    status: "Ready"
  },
  {
    name: "Dashboard refresh",
    owner: "Product",
    eta: "Tomorrow",
    status: "Review"
  },
  {
    name: "Billing portal",
    owner: "Finance",
    eta: "Friday",
    status: "Blocked"
  },
  {
    name: "Docs relaunch",
    owner: "Developer Experience",
    eta: "Next week",
    status: "Ready"
  }
] as const

export default function PreviewExample() {
  return (
    <div class="w-full min-w-[1080px] space-y-6 bg-muted/30 p-6">
      <section class="rounded-2xl border bg-card p-6 shadow-sm">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div class="space-y-3">
            <Badge variant="outline">Preset Preview 02</Badge>
            <div class="space-y-2">
              <h2 class="font-heading text-3xl font-semibold tracking-tight">
                Operations overview
              </h2>
              <p class="max-w-2xl text-sm text-muted-foreground sm:text-base">
                A dense dashboard mix for checking how tokens, spacing, type, states, and chart
                colors land together.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <Button variant="outline">Share snapshot</Button>
            <Button>Publish changes</Button>
          </div>
        </div>

        <Separator class="my-6" />

        <div class="grid gap-4 md:grid-cols-3">
          <For each={metrics}>
            {(metric) => (
              <Card>
                <CardHeader class="pb-2">
                  <CardDescription>{metric.label}</CardDescription>
                  <CardTitle class="text-2xl">{metric.value}</CardTitle>
                </CardHeader>
                <CardContent class="text-sm text-muted-foreground">{metric.detail}</CardContent>
              </Card>
            )}
          </For>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.95fr)]">
        <ChartDemo />

        <div class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Release readiness</CardTitle>
              <CardDescription>Track the key areas that still need polish.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-5">
              <For each={releaseChecklist}>
                {(item) => (
                  <div class="space-y-2">
                    <div class="flex items-center justify-between gap-3 text-sm">
                      <span class="font-medium">{item.label}</span>
                      <span class="text-muted-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                )}
              </For>

              <Separator />

              <div class="space-y-3">
                <div class="space-y-1">
                  <div class="text-sm font-medium">Invite reviewer</div>
                  <div class="text-sm text-muted-foreground">
                    Send a preview link before freezing the preset.
                  </div>
                </div>
                <div class="flex gap-2">
                  <Input class="flex-1" placeholder="name@company.com" />
                  <Button>Invite</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div class="flex justify-center rounded-2xl border bg-card p-4 shadow-sm">
            <CalendarPresets />
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.95fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming deployments</CardTitle>
            <CardDescription>
              Preview common surface, table, and badge combinations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={deployments}>
                  {(deployment) => (
                    <TableRow>
                      <TableCell class="font-medium">{deployment.name}</TableCell>
                      <TableCell>{deployment.owner}</TableCell>
                      <TableCell>{deployment.eta}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{deployment.status}</Badge>
                      </TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div class="space-y-6">
          <div class="flex justify-center rounded-2xl border bg-card p-4 shadow-sm">
            <TabsDemo />
          </div>

          <div class="rounded-2xl border bg-card p-4 shadow-sm">
            <EmptyDemo />
          </div>
        </div>
      </section>

      <div class="flex justify-end rounded-2xl border bg-card p-4 shadow-sm">
        <PaginationDemo />
      </div>
    </div>
  )
}
