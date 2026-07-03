import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-solid"
import { createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

type DateRange = {
  from: Date | null
  to: Date | null
}

export default function DatePickerRange() {
  const [date, setDate] = createSignal<DateRange>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20)
  })

  return (
    <Field class="mx-auto w-60">
      <FieldLabel for="date-picker-range">Date Picker Range</FieldLabel>
      <Popover placement="bottom-start">
        <PopoverTrigger
          as={Button}
          variant="outline"
          id="date-picker-range"
          class="justify-start px-2.5 font-normal"
        >
          <CalendarIcon class="size-4" />
          <Show when={date().from} fallback={<span>Pick a date</span>} keyed>
            {(from) => (
              <Show when={date().to} fallback={format(from, "LLL dd, y")} keyed>
                {(to) => (
                  <>
                    {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
                  </>
                )}
              </Show>
            )}
          </Show>
        </PopoverTrigger>
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} class="w-auto p-0">
          <Calendar
            mode="range"
            defaultMonth={date().from ?? undefined}
            value={date()}
            onValueChange={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
