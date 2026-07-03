import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"

export default function CalendarDemo() {
  const [date, setDate] = createSignal(new Date(2025, 0, 26))

  return (
    <Calendar
      mode="single"
      monthYearSelection
      value={date()}
      onValueChange={setDate}
      defaultMonth={new Date(2025, 0, 26)}
      class="rounded-lg border"
    />
  )
}
