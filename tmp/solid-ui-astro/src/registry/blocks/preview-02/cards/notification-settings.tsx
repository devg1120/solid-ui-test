import { createMemo, createSignal, For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "~/registry/ui/field"

const notifications = [
  {
    id: "transactions",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
    defaultChecked: true
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
    defaultChecked: true
  },
  {
    id: "goals",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
    defaultChecked: false
  },
  {
    id: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
    defaultChecked: false
  }
] as const

export function NotificationSettings() {
  const [checked, setChecked] = createSignal<Record<string, boolean>>(
    Object.fromEntries(
      notifications.map((notification) => [notification.id, notification.defaultChecked])
    )
  )

  const allChecked = createMemo(() =>
    notifications.every((notification) => checked()[notification.id])
  )
  const someChecked = createMemo(
    () => notifications.some((notification) => checked()[notification.id]) && !allChecked()
  )

  const handleSelectAll = (value: boolean) => {
    setChecked(Object.fromEntries(notifications.map((notification) => [notification.id, value])))
  }

  const handleToggle = (id: string, value: boolean) => {
    setChecked((current) => ({ ...current, [id]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="notify-all"
              checked={allChecked()}
              indeterminate={someChecked()}
              onChange={(value) => handleSelectAll(Boolean(value))}
            />
            <FieldContent>
              <FieldLabel for="notify-all">Select all</FieldLabel>
            </FieldContent>
          </Field>
          <For each={notifications}>
            {(notification) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={`notify-${notification.id}`}
                  checked={checked()[notification.id]}
                  onChange={(value) => handleToggle(notification.id, Boolean(value))}
                />
                <FieldContent>
                  <FieldLabel for={`notify-${notification.id}`}>{notification.label}</FieldLabel>
                  <FieldDescription>{notification.description}</FieldDescription>
                </FieldContent>
              </Field>
            )}
          </For>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
