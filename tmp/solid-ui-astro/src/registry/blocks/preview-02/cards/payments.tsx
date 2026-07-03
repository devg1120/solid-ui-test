import { For } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/registry/ui/breadcrumb"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardHeader } from "~/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "~/registry/ui/item"

const paymentItems = [
  {
    title: "Change transfer limit",
    description: "Adjust how much you can send from your balance.",
    icon: { lucide: "GaugeIcon", tabler: "IconGauge" }
  },
  {
    title: "Scheduled transfers",
    description: "Set up a transfer to send at a later date.",
    icon: { lucide: "CalendarIcon", tabler: "IconCalendar" }
  },
  {
    title: "Direct Debits",
    description: "Set up and manage regular payments.",
    icon: { lucide: "RepeatIcon", tabler: "IconRepeat" }
  },
  {
    title: "Recurring card payments",
    description: "Manage your repeated card transactions.",
    icon: { lucide: "RefreshCwIcon", tabler: "IconRefresh" }
  }
]

export function Payments() {
  return (
    <Card>
      <CardHeader class="flex flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger as={Button} class="size-7" size="icon-sm" variant="ghost">
                  <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" />
                  <span class="sr-only">Account options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <For each={paymentItems}>
            {(item) => (
              <Item as="a" href="#" variant="muted">
                <ItemMedia variant="icon">
                  <IconPlaceholder lucide={item.icon.lucide} tabler={item.icon.tabler} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  class="size-4 shrink-0 text-muted-foreground"
                />
              </Item>
            )}
          </For>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
