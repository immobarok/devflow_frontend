import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarViewPage() {
  const currentMonth = "September 2025"

  const events = [
    { time: "10:00 - 10:15 AM", title: "Daily Scrum 👏", tag: "Meet", color: "bg-[#EF4671]/10 text-[#EF4671] border-[#EF4671]/20" },
    { time: "01:30 - 02:30 PM", title: "Design System Review", tag: "Design", color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
    { time: "04:00 - 04:45 PM", title: "Sprint Retrospective", tag: "DevFlow", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Calendar &amp; Schedule
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize meetings, sprint ceremonies, and milestone deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-white/80 bg-white/70 dark:border-white/10 dark:bg-slate-900/70 p-1">
            <button type="button" className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-900 dark:text-white">{currentMonth}</span>
            <button type="button" className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <ChevronRight className="size-4" />
            </button>
          </div>

          <Button className="h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-4 text-xs font-bold shadow-xs active:scale-95 transition-all">
            <Plus className="mr-1.5 size-3.5" />
            New Event
          </Button>
        </div>
      </div>

      {/* Grid: Events Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Events Column */}
        <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="size-4 text-slate-500" />
              Today's Schedule
            </h2>
            <span className="text-[11px] font-bold text-[#EF4671]">Sep 12</span>
          </div>

          <div className="space-y-3">
            {events.map((evt, idx) => (
              <div key={idx} className={`p-3.5 rounded-2xl border ${evt.color} backdrop-blur-md space-y-1.5 transition-all hover:scale-[1.01]`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">{evt.tag}</span>
                  <span className="text-[11px] font-semibold">{evt.time}</span>
                </div>
                <h3 className="text-sm font-bold">{evt.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Month View Matrix */}
        <div className="lg:col-span-2 rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm space-y-3">
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 pb-2 border-b border-slate-100 dark:border-white/10">
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1
              const isToday = day === 12
              const hasEvent = day === 12 || day === 14 || day === 26
              return (
                <div
                  key={day}
                  className={`min-h-[64px] p-2 rounded-2xl border transition-all flex flex-col justify-between items-center ${
                    isToday
                      ? "border-[#EF4671] bg-[#fceaf0]/50 dark:bg-[#EF4671]/20 font-bold"
                      : "border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-white/40"
                  }`}
                >
                  <span className={`text-xs ${isToday ? "text-[#EF4671] font-extrabold" : ""}`}>{day}</span>
                  {hasEvent && (
                    <span className="size-1.5 rounded-full bg-[#EF4671]" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
