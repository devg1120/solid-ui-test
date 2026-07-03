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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "~/registry/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Switch } from "~/registry/ui/switch"

type CurrencyOption = { label: string; value: string }

const currencies: CurrencyOption[] = [
  { value: "usd", label: "USD - United States Dollar" },
  { value: "eur", label: "EUR - Euro" },
  { value: "gbp", label: "GBP - British Pound" },
  { value: "jpy", label: "JPY - Japanese Yen" }
]

export function Preferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Manage your account settings and notifications.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" class="bg-muted">
            <IconPlaceholder lucide="XIcon" tabler="IconX" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="default-currency">Default Currency</FieldLabel>
            <Select<CurrencyOption>
              options={currencies}
              optionValue="value"
              optionTextValue="label"
              value={currencies[0]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
              )}
            >
              <SelectTrigger id="default-currency" class="w-full">
                <SelectValue<CurrencyOption>>
                  {(state) => state.selectedOption()?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </Field>
          <FieldSeparator class="-my-4" />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="public-statistics">Public Statistics</FieldLabel>
              <FieldDescription>
                Allow others to see your total stream count and listening activity
              </FieldDescription>
            </FieldContent>
            <Switch id="public-statistics" checked />
          </Field>
          <FieldSeparator class="-my-4" />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="email-notifications">Email Notifications</FieldLabel>
              <FieldDescription>Monthly royalty reports and distribution updates</FieldDescription>
            </FieldContent>
            <Switch id="email-notifications" checked />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Reset</Button>
        <Button class="ml-auto">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
