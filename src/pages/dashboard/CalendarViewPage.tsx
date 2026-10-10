import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Calendar as CalendarIcon,
  Trash2,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useCalendarEvents,
  type CalendarEvent,
  type EventTag,
} from "@/lib/calendarStore"
import { AddEventModal } from "@/components/dashboard/AddEventModal"
import { EventTooltip } from "@/components/dashboard/EventTooltip"

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default function CalendarViewPage() {
  const { events, addEvent, removeEvent } = useCalendarEvents()

  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonth, setCurrentMonth] = useState(8) // 0-indexed: 8 is September
  const [selectedDateStr, setSelectedDateStr] = useState("2025-09-12")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((prev) => prev - 1)
    } else {
      setCurrentMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((prev) => prev + 1)
    } else {
      setCurrentMonth((prev) => prev + 1)
    }
  }

  const handleJumpToToday = () => {
    const today = new Date()
    setCurrentYear(today.getFullYear())
    setCurrentMonth(today.getMonth())
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    setSelectedDateStr(dateStr)
  }

  // Grid calculation
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  // Leading days
  const leadingDays: { day: number; dateStr: string }[] = []
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    leadingDays.push({ day, dateStr })
  }

  // Current month days
  const currentDays: { day: number; dateStr: string }[] = []
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    currentDays.push({ day, dateStr })
  }

  // Trailing days
  const totalSlotsNeeded = leadingDays.length + currentDays.length > 35 ? 42 : 35
  const trailingCount = totalSlotsNeeded - (leadingDays.length + currentDays.length)
  const trailingDays: { day: number; dateStr: string }[] = []
  for (let day = 1; day <= trailingCount; day++) {
    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    trailingDays.push({ day, dateStr })
  }

  // Group events by date
  const eventsByDate = new Map<string, CalendarEvent[]>()
  events.forEach((evt) => {
    const list = eventsByDate.get(evt.date) || []
    list.push(evt)
    eventsByDate.set(evt.date, list)
  })

  const selectedDayEvents = eventsByDate.get(selectedDateStr) || []

  // Formatting date string for title
  const formatSelectedDate = () => {
    try {
      const [y, m, d] = selectedDateStr.split("-").map(Number)
      const dateObj = new Date(y, m - 1, d)
      return dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    } catch {
      return selectedDateStr
    }
  }

  const getTagColor = (tag: EventTag) => {
    switch (tag) {
      case "Meet":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      case "Sprint":
        return "bg-[#EF4671]/10 text-[#EF4671] border-[#EF4671]/20 dark:bg-[#EF4671]/20"
      case "Deadline":
        return "bg-amber-100 text-amber-800 dark:bg-yellow-950/60 dark:text-yellow-300 border-amber-200 dark:border-yellow-800"
      case "DevFlow":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800"
      case "Design":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-white/10"
    }
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 dark:text-white">
            Calendar &amp; Schedule
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize meetings, sprint ceremonies, and milestone deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Month Switcher Bar */}
          <div className="flex items-center gap-1 rounded-full border border-white/80 bg-white/70 dark:border-white/10 dark:bg-slate-900/70 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleJumpToToday}
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-slate-800/60 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            Today
          </button>

          <Button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-4 text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            <Plus className="mr-1.5 size-3.5" />
            New Event
          </Button>
        </div>
      </div>

      {/* Grid: Events Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Selected Date Schedule Column */}
        <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="size-4 text-slate-500" />
              Schedule for {formatSelectedDate()}
            </h2>
            <span className="rounded-full bg-[#EF4671]/10 px-2 py-0.5 text-[11px] font-bold text-[#EF4671]">
              {selectedDayEvents.length} {selectedDayEvents.length === 1 ? "Event" : "Events"}
            </span>
          </div>

          <div className="space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-3.5 rounded-2xl border ${getTagColor(
                    evt.tag
                  )} backdrop-blur-md space-y-1.5 transition-all hover:scale-[1.01] group relative`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">
                      {evt.tag}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold">{evt.time}</span>
                      <button
                        type="button"
                        onClick={() => removeEvent(evt.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete event"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>
                  {evt.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                      {evt.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-6 text-center space-y-2.5">
                <div className="flex size-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                  <CalendarIcon className="size-4.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    No events scheduled
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Click below to create an event on this date
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="h-8 rounded-full bg-[#EF4671] text-white hover:bg-[#e0335e] text-xs font-semibold px-3.5 active:scale-95 transition-all shadow-xs"
                >
                  <Plus className="mr-1 size-3" />
                  Schedule Event
                </Button>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5 text-[#EF4671]" />
              Synced across dashboard
            </span>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="text-[#EF4671] font-semibold hover:underline text-xs"
            >
              + Quick Add
            </button>
          </div>
        </div>

        {/* Month View Matrix */}
        <div className="lg:col-span-2 rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm space-y-3">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 pb-2 border-b border-slate-100 dark:border-white/10">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
          </div>

          {/* Matrix Cells */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            {/* Leading days */}
            {leadingDays.map(({ day, dateStr }) => (
              <button
                key={dateStr}
                type="button"
                onClick={() => {
                  handlePrevMonth()
                  setSelectedDateStr(dateStr)
                }}
                className="min-h-[64px] p-2 rounded-2xl border border-transparent text-slate-300 dark:text-slate-600 transition-all flex flex-col justify-between items-center hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
              >
                <span className="text-xs">{day}</span>
                <span className="text-[10px] uppercase font-normal text-slate-400">
                  {SHORT_MONTH_NAMES[currentMonth === 0 ? 11 : currentMonth - 1]}
                </span>
              </button>
            ))}

            {/* Current month days */}
            {currentDays.map(({ day, dateStr }) => {
              const isSelected = selectedDateStr === dateStr
              const dayEvents = eventsByDate.get(dateStr) || []
              const hasEvents = dayEvents.length > 0
              const isToday =
                new Date().toISOString().slice(0, 10) === dateStr ||
                (currentYear === 2025 && currentMonth === 8 && day === 12)
              const dateTitle = `${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}`

              return (
                <EventTooltip key={dateStr} events={dayEvents} dateTitle={dateTitle}>
                  <button
                    type="button"
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`min-h-[64px] w-full p-2 rounded-2xl border transition-all flex flex-col justify-between items-center text-left ${
                      isSelected
                        ? "border-[#EF4671] bg-[#fceaf0]/50 dark:bg-[#EF4671]/20 font-bold ring-2 ring-[#EF4671]/40 shadow-xs"
                        : "border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-white/40 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <span
                        className={`text-xs ${
                          isToday
                            ? "text-[#EF4671] font-bold"
                            : isSelected
                              ? "text-slate-900 dark:text-white font-bold"
                              : ""
                        }`}
                      >
                        {day}
                      </span>
                      {isToday && (
                        <span className="rounded-full bg-[#EF4671] px-1 text-[9px] font-bold text-white">
                          Today
                        </span>
                      )}
                    </div>

                    {/* Event indicators */}
                    {hasEvents && (
                      <div className="w-full space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          {dayEvents.slice(0, 3).map((evt, idx) => (
                            <span
                              key={idx}
                              className={`size-1.5 rounded-full ${
                                evt.tag === "Meet"
                                  ? "bg-[#a855f7]"
                                  : evt.tag === "Sprint"
                                    ? "bg-[#EF4671]"
                                    : evt.tag === "Deadline"
                                      ? "bg-amber-500"
                                      : "bg-blue-500"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="truncate text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          {dayEvents[0].title}
                        </p>
                      </div>
                    )}
                  </button>
                </EventTooltip>
              )
            })}

            {/* Trailing days */}
            {trailingDays.map(({ day, dateStr }) => (
              <button
                key={dateStr}
                type="button"
                onClick={() => {
                  handleNextMonth()
                  setSelectedDateStr(dateStr)
                }}
                className="min-h-[64px] p-2 rounded-2xl border border-transparent text-slate-300 dark:text-slate-600 transition-all flex flex-col justify-between items-center hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
              >
                <span className="text-xs">{day}</span>
                <span className="text-[10px] uppercase font-normal text-slate-400">
                  {SHORT_MONTH_NAMES[currentMonth === 11 ? 0 : currentMonth + 1]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={addEvent}
        defaultDate={selectedDateStr}
      />
    </div>
  )
}
