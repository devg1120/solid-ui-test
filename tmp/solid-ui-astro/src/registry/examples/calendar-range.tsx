import { addDays } from "date-fns"
import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarRange() {
  const initialRange = {
    from: new Date(2025, 0, 26),
    to: addDays(new Date(2025, 0, 26), 30)
  }
  const [range, setRange] = createSignal(initialRange)

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          mode="range"
          numberOfMonths={2}
          value={range()}
          onValueChange={setRange}
          defaultMonth={range().from ?? undefined}
        />
      </CardContent>
    </Card>
  )
}
