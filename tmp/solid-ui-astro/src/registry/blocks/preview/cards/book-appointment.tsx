import { For } from "solid-js"

import { Alert, AlertDescription, AlertTitle } from "~/registry/ui/alert"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

const times = ["9:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"]

export function BookAppointment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Dr. Sarah Chen · Cardiology</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <FieldGroup>
          <Field>
            <FieldLabel>Available on March 18, 2026</FieldLabel>
            <ToggleGroup multiple spacing={2} defaultValue={["slot-0"]}>
              <For each={times}>
                {(time, index) => (
                  <ToggleGroupItem value={`slot-${index()}`}>{time}</ToggleGroupItem>
                )}
              </For>
            </ToggleGroup>
          </Field>
        </FieldGroup>
        <Alert>
          <AlertTitle>New patient?</AlertTitle>
          <AlertDescription>Please arrive 15 minutes early.</AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  )
}
