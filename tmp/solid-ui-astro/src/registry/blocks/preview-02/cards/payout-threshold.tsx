import { createSignal } from "solid-js"

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
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Slider } from "~/registry/ui/slider"
import { Textarea } from "~/registry/ui/textarea"

type CurrencyOption = { label: string; value: string }

const currencies: CurrencyOption[] = [
  { value: "usd", label: "USD - United States Dollar" },
  { value: "eur", label: "EUR - Euro" },
  { value: "gbp", label: "GBP - British Pound" },
  { value: "jpy", label: "JPY - Japanese Yen" }
]

export function PayoutThreshold() {
  const [amount, setAmount] = createSignal<number[]>([2500])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Threshold</CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" class="bg-muted">
            <IconPlaceholder lucide="XIcon" tabler="IconX" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="preferred-currency">Preferred Currency</FieldLabel>
            <Select<CurrencyOption>
              options={currencies}
              optionValue="value"
              optionTextValue="label"
              value={currencies[0]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
              )}
            >
              <SelectTrigger id="preferred-currency" class="w-full">
                <SelectValue<CurrencyOption>>
                  {(state) => state.selectedOption()?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </Field>
          <Field>
            <div class="flex items-baseline justify-between">
              <FieldLabel for="min-payout">Minimum Payout Amount</FieldLabel>
              <span class="text-2xl font-semibold tabular-nums">${amount()[0].toFixed(2)}</span>
            </div>
            <Slider
              id="min-payout"
              value={amount()}
              onChange={setAmount}
              min={50}
              max={10000}
              step={50}
            />
            <div class="flex items-center justify-between">
              <FieldDescription>$50 (MIN)</FieldDescription>
              <FieldDescription>$10,000 (MAX)</FieldDescription>
            </div>
          </Field>
          <Field>
            <FieldLabel for="payout-notes">Notes</FieldLabel>
            <Textarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration..."
              class="min-h-[100px]"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Save Threshold</Button>
      </CardFooter>
    </Card>
  )
}
