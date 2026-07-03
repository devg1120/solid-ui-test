import { format } from "date-fns"
import { createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerBasic() {
  const [date, setDate] = createSignal<Date | null>(null)

  return (
    <Field class="mx-auto w-44">
      <FieldLabel for="date-picker-basic">Date</FieldLabel>
      <Popover placement="bottom-start">
        <PopoverTrigger
          as={Button}
          variant="outline"
          id="date-picker-basic"
          class="justify-start font-normal"
        >
          <Show when={date()} fallback={<span>Pick a date</span>} keyed>
            {(value) => format(value, "PPP")}
          </Show>
        </PopoverTrigger>
        <PopoverContent onOpenAutoFocus={(event) => event.preventDefault()} class="w-auto p-0">
          <Calendar
            mode="single"
            value={date()}
            onValueChange={setDate}
            defaultMonth={date() ?? undefined}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
