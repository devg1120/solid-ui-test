import { IconPlaceholder } from "~/components/icon-placeholder"
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
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "~/registry/ui/input-group"
import { Item, ItemContent } from "~/registry/ui/item"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Separator } from "~/registry/ui/separator"

type AccountOption = { label: string; value: string }

const fromAccounts: AccountOption[] = [
  { value: "checking", label: "Main Checking (..8402) - $12,450.00" },
  { value: "business", label: "Business (..7731) - $8,920.00" }
]

const toAccounts: AccountOption[] = [
  { value: "savings", label: "High Yield Savings (..1192) - $42,100.00" },
  { value: "investment", label: "Investment (..3349) - $18,200.00" }
]

export function TransferFunds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>Move money between your connected accounts.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" class="bg-muted">
            <IconPlaceholder lucide="XIcon" tabler="IconX" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="transfer-amount">Amount to Transfer</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="transfer-amount" value="1,200.00" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="from-account">From Account</FieldLabel>
            <Select<AccountOption>
              options={fromAccounts}
              optionValue="value"
              optionTextValue="label"
              value={fromAccounts[0]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
              )}
            >
              <SelectTrigger id="from-account" class="w-full">
                <SelectValue<AccountOption>>{(state) => state.selectedOption()?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </Field>
          <Field>
            <FieldLabel for="to-account">To Account</FieldLabel>
            <Select<AccountOption>
              options={toAccounts}
              optionValue="value"
              optionTextValue="label"
              value={toAccounts[0]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
              )}
            >
              <SelectTrigger id="to-account" class="w-full">
                <SelectValue<AccountOption>>{(state) => state.selectedOption()?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </Field>
          <Item variant="muted" class="flex-col items-stretch">
            <ItemContent class="gap-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Estimated arrival</span>
                <span class="text-sm font-medium">Today, Apr 14</span>
              </div>
              <Separator />
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Transaction fee</span>
                <span class="text-sm font-medium tabular-nums">$0.00</span>
              </div>
              <Separator />
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">Total amount</span>
                <span class="text-sm font-semibold tabular-nums">$1,200.00</span>
              </div>
            </ItemContent>
          </Item>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Confirm Transfer</Button>
      </CardFooter>
    </Card>
  )
}
