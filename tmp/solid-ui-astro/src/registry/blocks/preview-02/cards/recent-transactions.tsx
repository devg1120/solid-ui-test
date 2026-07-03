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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableRow } from "~/registry/ui/table"

const transactions = [
  {
    icon: { lucide: "CoffeeIcon", tabler: "IconCoffee" },
    name: "Blue Bottle Coffee",
    category: "Food & Drink",
    date: "Today, 10:24 AM",
    amount: "-$6.50",
    positive: false
  },
  {
    icon: { lucide: "ShoppingCartIcon", tabler: "IconShoppingCart" },
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Yesterday",
    amount: "-$142.30",
    positive: false
  },
  {
    icon: { lucide: "WalletIcon", tabler: "IconWallet" },
    name: "Stripe Payout",
    category: "Income",
    date: "Oct 12",
    amount: "+$4,200.00",
    positive: true
  },
  {
    icon: { lucide: "CarIcon", tabler: "IconCar" },
    name: "Uber Technologies",
    category: "Transport",
    date: "Oct 11",
    amount: "-$24.10",
    positive: false
  },
  {
    icon: { lucide: "TvIcon", tabler: "IconDeviceTv" },
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Oct 10",
    amount: "-$19.99",
    positive: false
  }
] as const

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest account activity.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <For each={transactions}>
              {(transaction) => (
                <TableRow>
                  <TableCell class="w-10">
                    <div class="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <IconPlaceholder
                        class="size-4 shrink-0"
                        lucide={transaction.icon.lucide}
                        tabler={transaction.icon.tabler}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div class="flex flex-col">
                      <span class="font-medium">{transaction.name}</span>
                      <span class="text-sm text-muted-foreground">{transaction.category}</span>
                    </div>
                  </TableCell>
                  <TableCell class="text-sm text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell class="text-right">
                    <span
                      class={`text-sm font-semibold tabular-nums ${transaction.positive ? "text-emerald-500" : ""}`}
                    >
                      {transaction.amount}
                    </span>
                  </TableCell>
                  <TableCell class="w-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        as={Button}
                        class="size-7"
                        variant="ghost"
                        size="icon-sm"
                      >
                        <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDotsVertical" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Add note</DropdownMenuItem>
                        <DropdownMenuItem>Categorize</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Dispute</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
