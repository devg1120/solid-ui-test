import CalendarPrimitive, {
  type RootChildrenProps as CalendarPrimitiveChildrenProps,
  type RootProps as CalendarPrimitiveProps
} from "@corvu/calendar"
import { addMonths, getISOWeek } from "date-fns"
import {
  createMemo,
  createSignal,
  Index,
  mergeProps,
  onMount,
  Show,
  splitProps,
  type ComponentProps,
  type JSX
} from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { cn } from "~/lib/utils"
import { Button, buttonVariants } from "~/registry/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"

type CalendarSingleValue = Date | null
type CalendarMultipleValue = Date[]
type CalendarRangeValue = { from: Date | null; to: Date | null }
type CalendarValue = CalendarSingleValue | CalendarMultipleValue | CalendarRangeValue

export type CustomCellProps = {
  date: Date
  isDisabled: boolean
  isOutsideMonth: boolean
  isSelected: boolean
  isToday: boolean
}

type CustomCellRenderer = (props: CustomCellProps) => JSX.Element

type CalendarBaseProps = Omit<ComponentProps<"div">, "onChange"> & {
  defaultMonth?: Date
  disabled?: (date: Date) => boolean
  endYear?: number
  fixedWeeks?: boolean
  month?: Date
  monthYearSelection?: boolean
  numberOfMonths?: number
  onMonthChange?: (month: Date) => void
  startYear?: number
  showWeekNumber?: boolean
  customCell?: CustomCellRenderer
}

type CalendarSingleProps = CalendarBaseProps & {
  defaultValue?: CalendarSingleValue
  mode?: "single"
  onValueChange?: (value: CalendarSingleValue) => void
  value?: CalendarSingleValue
}

type CalendarMultipleProps = CalendarBaseProps & {
  defaultValue?: CalendarMultipleValue
  mode: "multiple"
  onValueChange?: (value: CalendarMultipleValue) => void
  value?: CalendarMultipleValue
}

type CalendarRangeProps = CalendarBaseProps & {
  defaultValue?: CalendarRangeValue
  mode: "range"
  onValueChange?: (value: CalendarRangeValue) => void
  value?: CalendarRangeValue
}

export type CalendarProps = CalendarSingleProps | CalendarMultipleProps | CalendarRangeProps

type SelectOption = {
  label: string
  value: number
}

type CalendarDayProps = {
  customCell?: CustomCellRenderer
  day: Date
  disabled?: (date: Date) => boolean
  month: Date
  value: CalendarValue
  showWeekNumber: boolean
}

type CalendarHeaderSelectProps = {
  contentClass?: string
  onChange: (option: SelectOption) => void
  options: SelectOption[]
  value?: SelectOption
}

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "short" })

const MONTHS: SelectOption[] = Array.from({ length: 12 }, (_, value) => ({
  label: monthFormatter.format(new Date(2000, value, 1)),
  value
}))

function CalendarHeaderSelect(props: CalendarHeaderSelectProps) {
  return (
    <Select<SelectOption>
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
      )}
      onChange={(option) => {
        if (option) {
          props.onChange(option)
        }
      }}
      optionTextValue="label"
      optionValue="value"
      options={props.options}
      value={props.value}
    >
      <SelectTrigger
        size="sm"
        class="cn-calendar-dropdown-root cn-calendar-caption-label h-(--cell-size) w-[5.25rem] rounded-(--cell-radius)"
      >
        <SelectValue<SelectOption>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent class={props.contentClass} />
    </Select>
  )
}

function Calendar(props: CalendarProps) {
  const currentYear = new Date().getFullYear()

  const mergedProps = mergeProps(
    {
      mode: "single" as const,
      endYear: currentYear,
      fixedWeeks: false,
      monthYearSelection: false,
      numberOfMonths: 1,
      startYear: currentYear - 100,
      showWeekNumber: false
    },
    props
  )

  const [local, others] = splitProps(mergedProps, [
    "class",
    "customCell",
    "defaultMonth",
    "defaultValue",
    "disabled",
    "endYear",
    "fixedWeeks",
    "mode",
    "month",
    "monthYearSelection",
    "numberOfMonths",
    "onMonthChange",
    "onValueChange",
    "startYear",
    "value",
    "showWeekNumber"
  ])

  const years = createMemo(() => {
    const [minYear, maxYear] =
      local.startYear <= local.endYear
        ? [local.startYear, local.endYear]
        : [local.endYear, local.startYear]

    return Array.from({ length: maxYear - minYear + 1 }, (_, index) => {
      const year = minYear + index

      return {
        label: String(year),
        value: year
      }
    })
  })

  const setVisibleMonth = (
    calendar: CalendarPrimitiveChildrenProps,
    monthIndex: number,
    year: number,
    month: number
  ) => {
    calendar.setMonth(addMonths(new Date(year, month, 1), -monthIndex))
  }

  const renderCalendar = (calendar: CalendarPrimitiveChildrenProps) => {
    const lastMonthIndex = calendar.months.length - 1

    return (
      <div
        data-slot="calendar"
        class={cn(
          "cn-calendar group/calendar w-fit bg-background",
          "in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
          local.class
        )}
        {...others}
      >
        <div class="relative flex flex-col gap-4 md:flex-row">
          <Index each={calendar.months}>
            {(monthData, monthIndex) => {
              return (
                <div data-slot="calendar-month" class="flex w-full flex-col gap-4">
                  <div
                    data-slot="calendar-header"
                    class="grid grid-cols-[var(--cell-size)_1fr_var(--cell-size)] items-center gap-1"
                  >
                    <Show when={monthIndex === 0} fallback={<div class="size-(--cell-size)" />}>
                      <CalendarPrimitive.Nav
                        action="prev-month"
                        aria-label="Go to previous month"
                        as={Button}
                        class={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-(--cell-size) p-0"
                        )}
                        variant="ghost"
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="ChevronLeftIcon"
                          tabler="IconChevronLeft"
                        />
                        <span class="sr-only">Previous month</span>
                      </CalendarPrimitive.Nav>
                    </Show>

                    <Show
                      when={local.monthYearSelection}
                      fallback={
                        <CalendarPrimitive.Label
                          class="flex h-(--cell-size) items-center justify-center px-(--cell-size) text-sm font-medium whitespace-nowrap"
                          index={monthIndex}
                        >
                          {monthData().month.toLocaleString("default", {
                            month: "long",
                            year: "numeric"
                          })}
                        </CalendarPrimitive.Label>
                      }
                    >
                      <CalendarPrimitive.Label
                        as="div"
                        class="flex h-(--cell-size) items-center justify-center gap-1.5 text-sm font-medium"
                        index={monthIndex}
                      >
                        <CalendarHeaderSelect
                          onChange={(option) => {
                            setVisibleMonth(
                              calendar,
                              monthIndex,
                              monthData().month.getFullYear(),
                              option.value
                            )
                          }}
                          options={MONTHS}
                          value={MONTHS[monthData().month.getMonth()]}
                        />

                        <CalendarHeaderSelect
                          contentClass="no-scrollbar max-h-72"
                          onChange={(option) => {
                            setVisibleMonth(
                              calendar,
                              monthIndex,
                              option.value,
                              monthData().month.getMonth()
                            )
                          }}
                          options={years()}
                          value={years().find(
                            (year) => year.value === monthData().month.getFullYear()
                          )}
                        />
                      </CalendarPrimitive.Label>
                    </Show>

                    <Show
                      when={monthIndex === lastMonthIndex}
                      fallback={<div class="size-(--cell-size)" />}
                    >
                      <CalendarPrimitive.Nav
                        action="next-month"
                        aria-label="Go to next month"
                        as={Button}
                        class={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "size-(--cell-size) p-0"
                        )}
                        variant="ghost"
                      >
                        <IconPlaceholder
                          class="size-4"
                          lucide="ChevronRightIcon"
                          tabler="IconChevronRight"
                        />
                        <span class="sr-only">Next month</span>
                      </CalendarPrimitive.Nav>
                    </Show>
                  </div>

                  <CalendarPrimitive.Table class="w-full border-collapse" index={monthIndex}>
                    <thead data-slot="calendar-weekdays">
                      <tr class="flex">
                        <Show when={local.showWeekNumber}>
                          <th
                            data-slot="calendar-week-number-header"
                            class="w-(--cell-size) select-none"
                          />
                        </Show>
                        <Index each={calendar.weekdays}>
                          {(weekday) => (
                            <CalendarPrimitive.HeadCell
                              class="flex-1 rounded-(--cell-radius) text-[0.8rem] font-normal text-muted-foreground select-none"
                              data-slot="calendar-weekday"
                            >
                              {weekday()
                                .toLocaleString("default", { weekday: "short" })
                                .slice(0, 2)}
                            </CalendarPrimitive.HeadCell>
                          )}
                        </Index>
                      </tr>
                    </thead>

                    <tbody data-slot="calendar-weeks">
                      <Index each={monthData().weeks}>
                        {(week) => (
                          <tr class="mt-2 flex w-full" data-slot="calendar-week">
                            <Show when={local.showWeekNumber}>
                              <td
                                data-slot="calendar-week-number"
                                class="text-[0.8rem] text-muted-foreground select-none"
                              >
                                <div class="flex size-(--cell-size) items-center justify-center text-center">
                                  {getISOWeek(week()[0])}
                                </div>
                              </td>
                            </Show>

                            <Index each={week()}>
                              {(day) => (
                                <CalendarDay
                                  customCell={local.customCell}
                                  day={day()}
                                  disabled={local.disabled}
                                  month={monthData().month}
                                  value={calendar.value}
                                  showWeekNumber={local.showWeekNumber}
                                />
                              )}
                            </Index>
                          </tr>
                        )}
                      </Index>
                    </tbody>
                  </CalendarPrimitive.Table>
                </div>
              )
            }}
          </Index>
        </div>
      </div>
    )
  }

  return (
    <CalendarPrimitive
      {...({
        children: renderCalendar,
        disabled: local.disabled,
        fixedWeeks: local.fixedWeeks,
        initialMonth: local.defaultMonth,
        initialValue: local.defaultValue,
        mode: local.mode,
        month: local.month,
        numberOfMonths: local.numberOfMonths,
        onMonthChange: local.onMonthChange,
        onValueChange: local.onValueChange,
        value: local.value
      } as CalendarPrimitiveProps)}
    />
  )
}

function CalendarDay(props: CalendarDayProps) {
  const [isMounted, setIsMounted] = createSignal(false)

  onMount(() => {
    setIsMounted(true)
  })

  const dayState = createMemo(() => {
    const isOutsideMonth = props.day.getMonth() !== props.month.getMonth()
    const isToday = isMounted() && isSameDay(props.day, new Date())
    const isDisabled = isOutsideMonth || (props.disabled?.(props.day) ?? false)
    const selectionState = getCalendarDaySelectionState(props.day, props.value)

    return {
      isDisabled,
      isOutsideMonth,
      isToday,
      ...selectionState
    }
  })

  return (
    <CalendarPrimitive.Cell
      class={cn(
        "group/day relative aspect-square h-full w-full rounded-(--cell-radius) p-0 text-center select-none",
        props.showWeekNumber
          ? "[&:nth-child(2)[data-selected]_button]:rounded-l-(--cell-radius)"
          : "[&:first-child[data-selected]_button]:rounded-l-(--cell-radius)",
        "[&:last-child[data-selected]_button]:rounded-r-(--cell-radius)",
        dayState().isRangeStart &&
          "isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted",
        dayState().isRangeEnd &&
          "isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted",
        dayState().isInRange && "rounded-none"
      )}
      data-outside={dayState().isOutsideMonth ? "" : undefined}
      data-selected={dayState().isSelected ? "" : undefined}
      data-slot="calendar-day"
    >
      <CalendarPrimitive.CellTrigger
        class={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "cn-calendar-day-button relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal",
          "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
          "data-[today]:rounded-(--cell-radius) data-[today]:bg-muted data-[today]:text-foreground",
          "data-[selected-single]:rounded-(--cell-radius) data-[selected-single]:bg-primary data-[selected-single]:text-primary-foreground",
          "data-[range-start]:rounded-(--cell-radius) data-[range-start]:rounded-l-(--cell-radius) data-[range-start]:bg-primary data-[range-start]:text-primary-foreground",
          "data-[range-end]:rounded-(--cell-radius) data-[range-end]:rounded-r-(--cell-radius) data-[range-end]:bg-primary data-[range-end]:text-primary-foreground",
          "data-[range-middle]:rounded-none data-[range-middle]:bg-muted data-[range-middle]:text-foreground",
          "data-[today]:data-[selected-single]:rounded-(--cell-radius) data-[today]:data-[selected-single]:bg-primary data-[today]:data-[selected-single]:text-primary-foreground",
          "data-[today]:data-[range-start]:rounded-(--cell-radius) data-[today]:data-[range-start]:rounded-l-(--cell-radius) data-[today]:data-[range-start]:bg-primary data-[today]:data-[range-start]:text-primary-foreground",
          "data-[today]:data-[range-end]:rounded-(--cell-radius) data-[today]:data-[range-end]:rounded-r-(--cell-radius) data-[today]:data-[range-end]:bg-primary data-[today]:data-[range-end]:text-primary-foreground",
          "data-[today]:data-[range-middle]:rounded-none data-[today]:data-[range-middle]:bg-muted data-[today]:data-[range-middle]:text-foreground",
          "dark:hover:text-foreground",
          "data-[outside]:text-muted-foreground data-[outside]:aria-selected:text-muted-foreground",
          "data-disabled:text-muted-foreground data-disabled:opacity-50",
          props.customCell && "h-auto min-h-(--cell-size) py-1"
        )}
        data-range-end={dayState().isRangeEnd ? "" : undefined}
        data-range-middle={dayState().isInRange ? "" : undefined}
        data-range-start={dayState().isRangeStart ? "" : undefined}
        data-outside={dayState().isOutsideMonth ? "" : undefined}
        data-selected-single={dayState().isSingleSelected ? "" : undefined}
        data-slot="calendar-day-button"
        day={props.day}
        month={props.month}
      >
        <span>{props.day.getDate()}</span>
        <Show when={props.customCell}>
          {(renderCell) =>
            renderCell()({
              date: props.day,
              isDisabled: dayState().isDisabled,
              isOutsideMonth: dayState().isOutsideMonth,
              isSelected: dayState().isSelected,
              isToday: dayState().isToday
            })
          }
        </Show>
      </CalendarPrimitive.CellTrigger>
    </CalendarPrimitive.Cell>
  )
}

const getCalendarDaySelectionState = (day: Date, value: CalendarValue) => {
  if (value == null) {
    return {
      isInRange: false,
      isRangeEnd: false,
      isRangeStart: false,
      isSelected: false,
      isSingleSelected: false
    }
  }

  if (value instanceof Date) {
    const isSelected = isSameDay(value, day)

    return {
      isInRange: false,
      isRangeEnd: false,
      isRangeStart: false,
      isSelected,
      isSingleSelected: isSelected
    }
  }

  if (Array.isArray(value)) {
    const isSelected = value.some((selectedDate) => isSameDay(selectedDate, day))

    return {
      isInRange: false,
      isRangeEnd: false,
      isRangeStart: false,
      isSelected,
      isSingleSelected: isSelected
    }
  }

  const isRangeStart = value.from != null && isSameDay(value.from, day)
  const isRangeEnd = value.to != null && isSameDay(value.to, day)
  const isInRange =
    value.from != null &&
    value.to != null &&
    !isRangeStart &&
    !isRangeEnd &&
    isSameDayOrAfter(day, value.from) &&
    isSameDayOrBefore(day, value.to)
  const isSelected = isRangeStart || isRangeEnd || isInRange

  return {
    isInRange,
    isRangeEnd,
    isRangeStart,
    isSelected,
    isSingleSelected: false
  }
}

const isSameDay = (left: Date, right: Date) => {
  return (
    left.getDate() === right.getDate() &&
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth()
  )
}

const isSameDayOrBefore = (left: Date, right: Date) => {
  return isSameDay(left, right) || left.getTime() < right.getTime()
}

const isSameDayOrAfter = (left: Date, right: Date) => {
  return isSameDay(left, right) || left.getTime() > right.getTime()
}

export { Calendar }
