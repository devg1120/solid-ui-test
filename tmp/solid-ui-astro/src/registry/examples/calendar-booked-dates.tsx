import { isSameDay } from "date-fns"
import { createSignal } from "solid-js"

import { Calendar } from "~/registry/ui/calendar"
import { Card, CardContent } from "~/registry/ui/card"

export default function CalendarBookedDates() {
  const [date, setDate] = createSignal(new Date(2025, 0, 26))
  const bookedDates = Array.from({ length: 15 }, (_, index) => new Date(2025, 0, 1 + index))

  const isBooked = (day: Date) => bookedDates.some((bookedDate) => isSameDay(bookedDate, day))

  return (
    <Card class="mx-auto w-fit p-0">
      <CardContent class="p-0">
        <Calendar
          mode="single"
          value={date()}
          onValueChange={setDate}
          defaultMonth={date()}
          disabled={isBooked}
          class="[&_[data-slot=calendar-day-button][data-disabled]:not([data-outside])]:line-through"
        />
      </CardContent>
    </Card>
  )
}
