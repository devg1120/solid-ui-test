import * as chrono from "chrono-node"
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

export default function DatePickerNaturalLanguage() {
  const [open, setOpen] = createSignal(false)
  const [value, setValue] = createSignal("In 2 days")
  const [date, setDate] = createSignal<Date | null>(chrono.parseDate(value()) ?? null)

  return (
    <Field class="mx-auto max-w-xs">
      <FieldLabel for="date-picker-natural-language">Schedule Date</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-picker-natural-language"
          value={value()}
          placeholder="Tomorrow or next week"
          onInput={(event) => {
            const nextValue = event.currentTarget.value
            const nextDate = chrono.parseDate(nextValue)

            setValue(nextValue)

            if (nextDate) {
              setDate(nextDate)
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
          <Popover open={open()} onOpenChange={setOpen} placement="bottom-end" gutter={8}>
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
                monthYearSelection
                defaultMonth={date() ?? undefined}
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
      <div class="px-1 text-sm text-muted-foreground">
        Your post will be published on{" "}
        <span class="font-medium">{formatDate(date()) || "a future date"}</span>.
      </div>
    </Field>
  )
}
