import { useState, useId } from "react"
import { useNavigate } from "react-router"
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Trash2,
  ExternalLink,
  Clock,
  RotateCcw,
} from "lucide-react"
import {
  useCalendarEvents,
  type CalendarEvent,
  type EventTag,
} from "@/lib/calendarStore"
import { AddEventModal } from "./AddEventModal"
import { EventTooltip } from "./EventTooltip"

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

export function CalendarWidget() {
  const navigate = useNavigate()
  const { events, addEvent, removeEvent, resetEvents } = useCalendarEvents()

  // Initialized to September 2025 to match the DevFlow mock context
  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonth, setCurrentMonth] = useState(8) // 0-indexed: 8 is September
  const [selectedDateStr, setSelectedDateStr] = useState("2025-09-12") // Default to Daily Scrum day

  // UI state for dropdowns & modal
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Unique IDs for accessible dropdowns
  const monthPickerId = useId()
  const moreMenuId = useId()

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
    setIsMonthPickerOpen(false)
    setIsMoreMenuOpen(false)
  }

  const handleSelectMonth = (monthIdx: number) => {
    setCurrentMonth(monthIdx)
    setIsMonthPickerOpen(false)
  }

  // Calendar calculations
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay() // 0 = Sunday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  // Leading days from previous month
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

  // Trailing days from next month to complete the grid (target 35 or 42 slots)
  const totalSlotsNeeded = leadingDays.length + currentDays.length > 35 ? 42 : 35
  const trailingCount = totalSlotsNeeded - (leadingDays.length + currentDays.length)
  const trailingDays: { day: number; dateStr: string }[] = []
  for (let day = 1; day <= trailingCount; day++) {
    const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
    const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    trailingDays.push({ day, dateStr })
  }

  // Map events for quick lookup
  const eventsByDate = new Map<string, CalendarEvent[]>()
  events.forEach((evt) => {
    const list = eventsByDate.get(evt.date) || []
    list.push(evt)
    eventsByDate.set(evt.date, list)
  })

  // Selected date events
  const selectedDayEvents = eventsByDate.get(selectedDateStr) || []

  // Formatting helper for selected date
  const formatSelectedDateTitle = () => {
    try {
      const [y, m, d] = selectedDateStr.split("-").map(Number)
      const dateObj = new Date(y, m - 1, d)
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return selectedDateStr
    }
  }

  // Helper to determine styling for a day's event tag
  const getEventTagStyle = (tag: EventTag) => {
    switch (tag) {
      case "Meet":
        return "bg-[#a855f7] text-white hover:bg-[#9333ea]"
      case "Sprint":
        return "bg-[#ffe4e6] dark:bg-[#EF4671]/20 text-[#EF4671] hover:bg-[#ffd1d7]"
      case "Deadline":
        return "bg-[#fef08a] dark:bg-yellow-950/60 text-[#854d0e] dark:text-yellow-300 hover:bg-[#fde047]"
      case "DevFlow":
        return "bg-[#f3e8ff] dark:bg-purple-950/70 text-[#9333ea] dark:text-purple-300 hover:bg-[#e9d5ff]"
      case "Design":
        return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
    }
  }

  return (
    <div className="relative flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm shadow-slate-900/[0.03] dark:shadow-none transition-all hover:bg-white/85 dark:hover:bg-[#192133]/80 hover:border-white dark:hover:border-white/20 hover:shadow-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
          <CalendarDays className="size-4.5 text-slate-700 dark:text-slate-300" />
          <span>Calendar</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Previous Month Arrow */}
          <button
            type="button"
            onClick={handlePrevMonth}
            className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Previous month"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          {/* Month & Year Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsMonthPickerOpen(!isMonthPickerOpen)
                setIsMoreMenuOpen(false)
              }}
              className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <span>
                {SHORT_MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              <ChevronDown
                className={`size-3 text-slate-500 dark:text-slate-400 transition-transform ${
                  isMonthPickerOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Month Picker Dropdown Menu */}
            {isMonthPickerOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsMonthPickerOpen(false)}
                />
                <div
                  id={monthPickerId}
                  className="absolute right-0 top-8 z-30 w-56 rounded-2xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-[#141a29]/95 backdrop-blur-xl p-3 shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2">
                    <button
                      type="button"
                      onClick={() => setCurrentYear((y) => y - 1)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentYear}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentYear((y) => y + 1)}
                      className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>

                  {/* 12 Months Grid */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {SHORT_MONTH_NAMES.map((mName, idx) => {
                      const isCurrent = idx === currentMonth
                      return (
                        <button
                          key={mName}
                          type="button"
                          onClick={() => handleSelectMonth(idx)}
                          className={`rounded-xl py-1 text-xs font-medium transition-all ${
                            isCurrent
                              ? "bg-[#EF4671] text-white font-bold shadow-xs"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {mName}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentYear(2025)
                        setCurrentMonth(8)
                        setIsMonthPickerOpen(false)
                      }}
                      className="text-[11px] font-semibold text-[#EF4671] hover:underline"
                    >
                      Sep 2025 (Demo)
                    </button>
                    <button
                      type="button"
                      onClick={handleJumpToToday}
                      className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      Today
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Next Month Arrow */}
          <button
            type="button"
            onClick={handleNextMonth}
            className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Next month"
          >
            <ChevronRight className="size-3.5" />
          </button>

          {/* More Options Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsMoreMenuOpen(!isMoreMenuOpen)
                setIsMonthPickerOpen(false)
              }}
              className="flex size-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              title="More actions"
            >
              <MoreHorizontal className="size-4.5" />
            </button>

            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div
                  id={moreMenuId}
                  className="absolute right-0 top-8 z-30 w-48 rounded-2xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-[#141a29]/95 backdrop-blur-xl p-1.5 shadow-xl space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(true)
                      setIsMoreMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Plus className="size-3.5 text-[#EF4671]" />
                    <span>Add New Event</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleJumpToToday}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Clock className="size-3.5 text-slate-400" />
                    <span>Jump to Today</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/dashboard/calendar")
                      setIsMoreMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ExternalLink className="size-3.5 text-slate-400" />
                    <span>Open Calendar Page</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetEvents()
                      setIsMoreMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-left font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Reset Default Events</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mt-3.5">
        {/* Day Names Header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500 pb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Month Days Matrix */}
        <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-normal text-slate-700 dark:text-slate-300 pt-0.5">
          {/* Leading Days (Previous Month) */}
          {leadingDays.map(({ day, dateStr }) => {
            const isSelected = selectedDateStr === dateStr
            const dayEvents = eventsByDate.get(dateStr) || []
            const prevMonthIdx = currentMonth === 0 ? 11 : currentMonth - 1
            const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
            const dateTitle = `${MONTH_NAMES[prevMonthIdx]} ${day}, ${prevYear}`

            return (
              <div key={dateStr} className="flex items-center justify-center">
                <EventTooltip events={dayEvents} dateTitle={dateTitle}>
                  <button
                    type="button"
                    onClick={() => {
                      handlePrevMonth()
                      setSelectedDateStr(dateStr)
                    }}
                    className={`size-7 rounded-full text-slate-300 dark:text-slate-600 flex items-center justify-center transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      isSelected
                        ? "ring-2 ring-[#EF4671] font-bold text-slate-500"
                        : ""
                    }`}
                  >
                    {day}
                  </button>
                </EventTooltip>
              </div>
            )
          })}

          {/* Current Month Days */}
          {currentDays.map(({ day, dateStr }) => {
            const isSelected = selectedDateStr === dateStr
            const dayEvents = eventsByDate.get(dateStr) || []
            const hasEvents = dayEvents.length > 0
            const primaryEvent = dayEvents[0]
            const dateTitle = `${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}`

            let customClass =
              "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"

            if (hasEvents && primaryEvent) {
              customClass = getEventTagStyle(primaryEvent.tag)
            }

            return (
              <div key={dateStr} className="flex items-center justify-center">
                <EventTooltip events={dayEvents} dateTitle={dateTitle}>
                  <button
                    type="button"
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`size-7 rounded-full flex items-center justify-center text-xs transition-all cursor-pointer relative ${customClass} ${
                      isSelected
                        ? "ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#141a29] font-bold scale-110 z-10 shadow-sm"
                        : ""
                    }`}
                  >
                    <span>{day}</span>
                    {dayEvents.length > 1 && (
                      <span className="absolute bottom-0.5 size-1 rounded-full bg-white dark:bg-white" />
                    )}
                  </button>
                </EventTooltip>
              </div>
            )
          })}

          {/* Trailing Days (Next Month) */}
          {trailingDays.map(({ day, dateStr }) => {
            const isSelected = selectedDateStr === dateStr
            const dayEvents = eventsByDate.get(dateStr) || []
            const nextMonthIdx = currentMonth === 11 ? 0 : currentMonth + 1
            const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
            const dateTitle = `${MONTH_NAMES[nextMonthIdx]} ${day}, ${nextYear}`

            return (
              <div key={dateStr} className="flex items-center justify-center">
                <EventTooltip events={dayEvents} dateTitle={dateTitle}>
                  <button
                    type="button"
                    onClick={() => {
                      handleNextMonth()
                      setSelectedDateStr(dateStr)
                    }}
                    className={`size-7 rounded-full text-slate-300 dark:text-slate-600 flex items-center justify-center transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      isSelected
                        ? "ring-2 ring-[#EF4671] font-bold text-slate-500"
                        : ""
                    }`}
                  >
                    {day}
                  </button>
                </EventTooltip>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Day Schedule Preview & Quick Add Bar */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {formatSelectedDateTitle()}
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
              {selectedDayEvents.length}{" "}
              {selectedDayEvents.length === 1 ? "Event" : "Events"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 rounded-full bg-[#EF4671]/10 px-2.5 py-1 text-[11px] font-semibold text-[#EF4671] hover:bg-[#EF4671] hover:text-white transition-all active:scale-95"
          >
            <Plus className="size-3" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Events List for Selected Day */}
        {selectedDayEvents.length > 0 ? (
          <div className="space-y-1.5 max-h-[72px] overflow-y-auto pr-1">
            {selectedDayEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex items-center justify-between rounded-xl bg-slate-50/80 dark:bg-slate-900/60 p-2 text-xs border border-slate-100 dark:border-white/5 group hover:border-[#EF4671]/30 transition-all"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className={`size-2 shrink-0 rounded-full ${
                      evt.tag === "Meet"
                        ? "bg-[#a855f7]"
                        : evt.tag === "Sprint"
                          ? "bg-[#EF4671]"
                          : evt.tag === "Deadline"
                            ? "bg-amber-500"
                            : evt.tag === "Design"
                              ? "bg-emerald-500"
                              : "bg-blue-500"
                    }`}
                  />
                  <div className="truncate">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">
                      {evt.title}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {evt.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {evt.tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEvent(evt.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete event"
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl bg-slate-50/60 dark:bg-slate-900/40 p-2 text-[11px] text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-white/5">
            <span>No events scheduled for this day</span>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="text-[#EF4671] hover:underline font-semibold text-[11px]"
            >
              Schedule now
            </button>
          </div>
        )}
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
