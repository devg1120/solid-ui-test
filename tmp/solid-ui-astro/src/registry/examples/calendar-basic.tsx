import { Calendar } from "~/registry/ui/calendar"

export default function CalendarBasic() {
  return <Calendar class="rounded-lg border" defaultMonth={new Date(2025, 0, 26)} mode="single" />
}
