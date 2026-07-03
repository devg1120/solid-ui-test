import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerTime() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | null>(null)

  return (
    <FieldGroup class="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel for="date-picker-time">Date</FieldLabel>
        <Popover open={open()} onOpenChange={setOpen} placement="bottom-start">
          <PopoverTrigger
            as={Button}
            variant="outline"
            id="date-picker-time"
            class="w-32 justify-between font-normal"
          >
            {date() ? format(date()!, "PPP") : "Select date"}
            <ChevronDownIcon class="size-4" />
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(event) => event.preventDefault()}
            class="w-auto overflow-hidden p-0"
          >
            <Calendar
              mode="single"
              value={date()}
              monthYearSelection
              defaultMonth={date() ?? undefined}
              onValueChange={(nextDate) => {
                setDate(nextDate)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field class="w-32">
        <FieldLabel for="time-picker">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value="10:30:00"
          class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  )
}
