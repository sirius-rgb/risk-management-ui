"use client"

import { useEffect, useState } from "react"
import { useFilterStore } from "@/store/filter"
import { format, isAfter, parse, startOfDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Helper function to parse string to Date
const parseDate = (dateStr: string): Date => {
  if (!dateStr) return new Date()
  return parse(dateStr, "yyyy-MM-dd", new Date())
}

export default function DatePickerPage() {
  const { startDate, endDate, setStartDate, setEndDate } = useFilterStore()

  console.log("Start Date:", startDate, "End Date:", endDate)

  // covert string into date for calendar component
  const [date, setDate] = useState<DateRange>({
    from: parseDate(startDate),
    to: parseDate(endDate),
  })

  // State to track if popover is open
  const [isOpen, setIsOpen] = useState(false)

  // Get today's date for the date restriction
  const today = startOfDay(new Date())

  // Handle date selection with validation
  const handleDateSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange) {
      setDate({ from: undefined, to: undefined })
      return
    }

    // Ensure dates don't exceed today
    const validFrom = selectedRange.from
      ? isAfter(selectedRange.from, today)
        ? today
        : selectedRange.from
      : undefined

    const validTo = selectedRange.to
      ? isAfter(selectedRange.to, today)
        ? today
        : selectedRange.to
      : undefined

    setDate({ from: validFrom, to: validTo })
  }

  useEffect(() => {
    if (date?.from) {
      setStartDate(format(date.from, "yyyy-MM-dd"))
    }
    if (date?.to) {
      setEndDate(format(date.to, "yyyy-MM-dd"))
    }
  }, [date, setStartDate, setEndDate])

  useEffect(() => {
    setDate({
      from: parseDate(startDate),
      to: parseDate(endDate),
    })
  }, [startDate, endDate])

  return (
    <div className="container mx-auto py-10">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "yyyy-MM-dd")} -{" "}
                  {format(date.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(date.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={(date) => isAfter(date, today)}
              className="rounded-md border"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
