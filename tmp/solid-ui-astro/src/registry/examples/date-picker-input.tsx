import { format } from "date-fns"
import { CalendarIcon } from "lucide-solid"
import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Field, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

function formatDate(date: Date | null) {
  return date ? format(date, "MMMM dd, yyyy") : ""
}

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime())
}

export default function DatePickerInput() {
  const [open, setOpen] = createSignal(false)
  const [date, setDate] = createSignal<Date | null>(new Date("2025-06-01"))
  const [month, setMonth] = createSignal<Date | null>(date())
  const [value, setValue] = createSignal(formatDate(date()))

  return (
    <Field class="mx-auto w-48">
      <FieldLabel for="date-picker-input">Subscription Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-picker-input"
          value={value()}
          placeholder="June 01, 2025"
          onInput={(event) => {
            const nextValue = event.currentTarget.value
            const nextDate = new Date(nextValue)

            setValue(nextValue)

            if (isValidDate(nextDate)) {
              setDate(nextDate)
              setMonth(nextDate)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open()} onOpenChange={setOpen} placement="bottom-end" gutter={10}>
            <PopoverTrigger
              as={InputGroupButton}
              variant="ghost"
              size="icon-xs"
              aria-label="Select date"
            >
              <CalendarIcon class="size-4" />
              <span class="sr-only">Select date</span>
            </PopoverTrigger>
            <PopoverContent
              onOpenAutoFocus={(event) => event.preventDefault()}
              class="w-auto overflow-hidden p-0"
            >
              <Calendar
                mode="single"
                value={date()}
                month={month() ?? undefined}
                onMonthChange={setMonth}
                onValueChange={(nextDate) => {
                  setDate(nextDate)
                  setValue(formatDate(nextDate))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
