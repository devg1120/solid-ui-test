import { For } from "solid-js"

import CalendarPresets from "~/registry/examples/calendar-presets"
import ChartDemo from "~/registry/examples/chart-demo"
import EmptyDemo from "~/registry/examples/empty-demo"
import PaginationDemo from "~/registry/examples/pagination-demo"
import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/registry/ui/card"
import { Input } from "~/registry/ui/input"
import { Progress } from "~/registry/ui/progress"
import { Separator } from "~/registry/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/registry/ui/table"

const navigationItems = ["Overview", "Projects", "Releases", "Analytics", "Settings"] as const

const workspaceHealth = [
  {
    label: "Accessibility audit",
    value: 96
  },
  {
    label: "Layout migration",
    value: 71
  },
  {
    label: "Theme parity",
    value: 84
  }
] as const

const invoices = [
  {
    client: "Northstar Labs",
    amount: "$14,200",
    due: "Apr 12",
    status: "Paid"
  },
  {
    client: "Juniper Health",
    amount: "$8,450",
    due: "Apr 15",
    status: "Pending"
  },
  {
    client: "Riverbank Studio",
    amount: "$5,980",
    due: "Apr 19",
    status: "Review"
  },
  {
    client: "Signal Works",
    amount: "$11,760",
    due: "Apr 22",
    status: "Paid"
  }
] as const

export default function Preview02Example() {
  return (
    <div class="w-full min-w-[1080px] space-y-6 bg-muted/30 p-6">
      <div class="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside class="space-y-6">
          <Card>
            <CardHeader>
              <Badge variant="outline" class="w-fit">
                Preset Preview 01
              </Badge>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>
                A structured app shell for checking navigation, dense forms, and data surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
              <For each={navigationItems}>
                {(item, index) => (
                  <Button
                    class="w-full justify-start"
                    variant={index() === 0 ? "default" : "ghost"}
                  >
                    {item}
                  </Button>
                )}
              </For>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workspace health</CardTitle>
              <CardDescription>
                See how quieter surfaces and controls read together.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-5">
              <For each={workspaceHealth}>
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
                <div class="text-sm font-medium">Invite collaborator</div>
                <div class="flex gap-2">
                  <Input class="flex-1" placeholder="teammate@company.com" />
                  <Button variant="outline">Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div class="space-y-6">
          <section class="rounded-2xl border bg-card p-6 shadow-sm">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="space-y-2">
                <h2 class="font-heading text-3xl font-semibold tracking-tight">
                  Client operations hub
                </h2>
                <p class="max-w-2xl text-sm text-muted-foreground sm:text-base">
                  A broader shell layout that previews hierarchy, muted states, cards, forms, and
                  paginated content at the same time.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <Button variant="outline">Export report</Button>
                <Button>Create invoice</Button>
              </div>
            </div>
          </section>

          <section class="grid gap-6 2xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.9fr)]">
            <ChartDemo />

            <Card>
              <CardHeader>
                <CardTitle>Today</CardTitle>
                <CardDescription>
                  Small content blocks help expose spacing and type rhythm.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="rounded-xl border bg-muted/40 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <div class="text-sm font-medium">Review queued payouts</div>
                      <div class="text-sm text-muted-foreground">
                        4 approvals waiting on finance.
                      </div>
                    </div>
                    <Badge variant="outline">Priority</Badge>
                  </div>
                </div>

                <div class="rounded-xl border bg-muted/40 p-4">
                  <div class="text-sm font-medium">Follow up with design</div>
                  <div class="mt-1 text-sm text-muted-foreground">
                    Verify icon density before shipping the shared preset.
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <Button class="flex-1">Open board</Button>
                  <Button class="flex-1" variant="outline">
                    Schedule review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section class="grid gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
            <Card>
              <CardHeader>
                <CardTitle>Outstanding invoices</CardTitle>
                <CardDescription>
                  Check data density and borders in a wider content area.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <For each={invoices}>
                      {(invoice) => (
                        <TableRow>
                          <TableCell class="font-medium">{invoice.client}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>{invoice.due}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{invoice.status}</Badge>
                          </TableCell>
                        </TableRow>
                      )}
                    </For>
                  </TableBody>
                </Table>

                <div class="flex justify-end">
                  <PaginationDemo />
                </div>
              </CardContent>
            </Card>

            <div class="space-y-6">
              <div class="flex justify-center rounded-2xl border bg-card p-4 shadow-sm">
                <CalendarPresets />
              </div>

              <div class="rounded-2xl border bg-card p-4 shadow-sm">
                <EmptyDemo />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
