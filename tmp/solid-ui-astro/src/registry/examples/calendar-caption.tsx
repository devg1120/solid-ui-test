import { Calendar } from "~/registry/ui/calendar"

export default function CalendarCaption() {
  return (
    <Calendar
      mode="single"
      monthYearSelection
      defaultMonth={new Date(2025, 0, 26)}
      class="rounded-lg border"
    />
  )
}
