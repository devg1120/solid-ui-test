import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-solid"
import { createSignal, Show } from "solid-js"

import { Button } from "~/registry/ui/button"
import { Calendar } from "~/registry/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "~/registry/ui/popover"

export default function DatePickerDemo() {
  const [date, setDate] = createSignal<Date | null>(null)

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger
        as={Button}
        variant="outline"
        data-empty={!date()}
        class="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
      >
        <Show when={date()} fallback={<span>Pick a date</span>} keyed>
          {(value) => format(value, "PPP")}
        </Show>
        <ChevronDownIcon class="size-4" />
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
  )
}
