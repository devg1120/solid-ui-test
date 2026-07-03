import { Clock2Icon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent, CardFooter } from "~/registry/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export default function CalendarTime() {
  const [date, setDate] = createSignal(new Date(2025, 0, 26))

  return (
    <Card class="mx-auto w-fit" size="sm">
      <CardContent>
        <Calendar
          mode="single"
          value={date()}
          onValueChange={setDate}
          defaultMonth={new Date(2025, 0, 26)}
          class="p-0"
        />
      </CardContent>
      <CardFooter class="border-t bg-card">
        <FieldGroup>
          <Field>
            <FieldLabel for="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                id="time-from"
                step="1"
                type="time"
                value="10:30:00"
              />
              <InputGroupAddon>
                <Clock2Icon class="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="time-to">End Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                id="time-to"
                step="1"
                type="time"
                value="12:30:00"
              />
              <InputGroupAddon>
                <Clock2Icon class="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
