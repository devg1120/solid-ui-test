import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarWeekNumbers() {
  const [date, setDate] = createSignal(new Date(2025, 0, 26))

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          mode="single"
          showWeekNumber
          value={date()}
          onValueChange={setDate}
          defaultMonth={date()}
        />
      </CardContent>
    </Card>
  )
}
