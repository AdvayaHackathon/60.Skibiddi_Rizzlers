"use client"

import { useState } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addDays,
  differenceInDays,
} from "date-fns"

interface DateSelectionProps {
  onSubmit: (dates: Date[]) => void
  onBack: () => void
}

export default function DateSelection({ onSubmit, onBack }: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const weekdays = ["M", "T", "W", "T", "F", "S", "S"]

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else {
      // Ensure end date is after start date
      if (date < startDate) {
        setEndDate(startDate)
        setStartDate(date)
      } else {
        // Check if the range exceeds 7 days
        const dayDifference = differenceInDays(date, startDate)
        if (dayDifference > 6) {
          // If more than 7 days, set end date to start date + 6 days
          setEndDate(addDays(startDate, 6))
        } else {
          setEndDate(date)
        }
      }
    }
  }

  const handleMouseEnter = (date: Date) => {
    if (startDate && !endDate) {
      setHoveredDate(date)
    }
  }

  const handleMouseLeave = () => {
    setHoveredDate(null)
  }

  const isInRange = (date: Date) => {
    if (startDate && endDate) {
      return date >= startDate && date <= endDate
    }
    if (startDate && hoveredDate) {
      return (date >= startDate && date <= hoveredDate) || (date >= hoveredDate && date <= startDate)
    }
    return false
  }

  const handleSubmit = () => {
    if (startDate && endDate) {
      const dates = eachDayOfInterval({ start: startDate, end: endDate })
      onSubmit(dates)
    } else if (startDate) {
      onSubmit([startDate])
    }
  }

  const handleSkip = () => {
    onSubmit([])
  }

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="mb-2 text-center text-3xl font-bold">When are you going?</h1> */}
      <p className="mb-8 text-center text-xl text-gray-600">Choose the dates</p>

      <div className="mb-8 w-full max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="rounded-full p-2 hover:bg-gray-100" aria-label="Previous month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h2 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
          <button onClick={nextMonth} className="rounded-full p-2 hover:bg-gray-100" aria-label="Next month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdays.map((day) => (
            <div key={day} className="py-2 text-sm font-medium">
              {day}
            </div>
          ))}

    

          {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map(
            (_, i) => (
              <div key={`empty-${i}`} className="h-10 w-10"></div>
            ),
          )}

          {daysInMonth.map((day) => {
            const isStart = startDate && isSameDay(day, startDate)
            const isEnd = endDate && isSameDay(day, endDate)
            const isSelected = isStart || isEnd
            const isRangeDay = isInRange(day) && !isSelected

            return (
              <div
                key={day.toString()}
                className="flex items-center justify-center"
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleDateClick(day)}
                  className={`h-10 w-10 rounded-full text-sm ${
                    !isSameMonth(day, currentMonth)
                      ? "text-gray-300"
                      : isSelected
                        ? "bg-black text-white"
                        : isRangeDay
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                  }`}
                >
                  {format(day, "d")}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <button onClick={handleSkip} className="mb-4 text-sm text-gray-600 underline">
        I don&apos;t know my dates yet
      </button>

      <div className="flex w-full max-w-md justify-between">
        <button onClick={onBack} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:underline">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!startDate}
          className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
