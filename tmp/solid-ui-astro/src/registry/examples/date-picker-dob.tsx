import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerDob() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | null>(null)

  return (
    <Field class="mx-auto w-44">
      <FieldLabel for="date-picker-dob">Date of birth</FieldLabel>
      <Popover open={open()} onOpenChange={setOpen} placement="bottom-start">
        <PopoverTrigger
          as={Button}
          variant="outline"
          id="date-picker-dob"
          class="justify-start font-normal"
        >
          {date() ? date()!.toLocaleDateString() : "Select date"}
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          class="w-auto overflow-hidden p-0"
        >
          <Calendar
            mode="single"
            value={date()}
            defaultMonth={date() ?? undefined}
            monthYearSelection
            onValueChange={(nextDate) => {
              setDate(nextDate)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
