import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { Calendar, Clock, Sparkles } from "lucide-react"
import type { CalendarEvent, EventTag } from "@/lib/calendarStore"

interface EventTooltipProps {
  events: CalendarEvent[]
  dateTitle: string
  children: React.ReactNode
}

const getTagBadgeStyle = (tag: EventTag) => {
  switch (tag) {
    case "Meet":
      return "bg-[#a855f7]/15 text-[#a855f7] border-[#a855f7]/30"
    case "Sprint":
      return "bg-[#EF4671]/15 text-[#EF4671] border-[#EF4671]/30"
    case "Deadline":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
    case "DevFlow":
      return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
    case "Design":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
    default:
      return "bg-slate-100 text-slate-700 border-slate-200"
  }
}

export function EventTooltip({ events, dateTitle, children }: EventTooltipProps) {
  // If no events, render children without tooltip
  if (!events || events.length === 0) {
    return <>{children}</>
  }

  return (
    <TooltipPrimitive.Provider delayDuration={120}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={8}
            align="center"
            collisionPadding={12}
            className="z-50 w-64 rounded-2xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-[#141a29]/95 backdrop-blur-2xl p-3 shadow-xl shadow-slate-900/10 dark:shadow-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150 pointer-events-none"
          >
            {/* Header: Date & Events count badge */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <Calendar className="size-3.5 text-[#EF4671]" />
                <span>{dateTitle}</span>
              </div>
              <span className="rounded-full bg-[#EF4671]/10 px-2 py-0.5 text-[10px] font-bold text-[#EF4671]">
                {events.length} {events.length === 1 ? "Event" : "Events"}
              </span>
            </div>

            {/* Event list */}
            <div className="space-y-2">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-xl bg-slate-50/90 dark:bg-slate-900/70 p-2 border border-slate-100 dark:border-white/5 space-y-1"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`rounded-md border px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${getTagBadgeStyle(
                        evt.tag
                      )}`}
                    >
                      {evt.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 dark:text-slate-400">
                      <Clock className="size-2.5" />
                      {evt.time}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {evt.title}
                  </h5>

                  {evt.description && (
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight">
                      {evt.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="size-2.5 text-[#EF4671]" />
                Click date to select
              </span>
              <span className="text-[9px] font-semibold text-slate-500">DevFlow</span>
            </div>

            <TooltipPrimitive.Arrow className="fill-white dark:fill-[#141a29] stroke-slate-200/50 dark:stroke-white/10 stroke-1" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
