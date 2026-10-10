import { useState, useEffect } from "react"
import { Timer as TimerIcon, StickyNote, Square } from "lucide-react"

export function TimerWidget() {
  const [timerSeconds, setTimerSeconds] = useState(1210) // 20:10
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerSeconds])

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-gradient-to-br from-[#dfd1fb]/80 via-[#edd8fa]/70 to-[#fedde7]/80 dark:border-white/10 dark:from-purple-950/70 dark:via-purple-900/40 dark:to-pink-950/60 backdrop-blur-xl p-4 shadow-sm shadow-slate-900/[0.03] dark:shadow-none flex-1 transition-all hover:border-white dark:hover:border-white/20 hover:shadow-md">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
        <TimerIcon className="size-4 text-purple-600 dark:text-purple-400" />
        <span>Timer</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
          {formatTimer(timerSeconds)}
        </span>

        <button
          type="button"
          onClick={() => setIsTimerRunning(!isTimerRunning)}
          className="flex size-11 items-center justify-center rounded-2xl bg-[#ff3b30] text-white shadow-md hover:bg-[#e02e24] active:scale-95 transition-all"
          title="Stop timer"
        >
          <Square className="size-4 fill-white" />
        </button>
      </div>
    </div>
  )
}

export function NotesWidget() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-gradient-to-br from-[#ffe4eb]/85 to-[#fed1dc]/75 dark:border-white/10 dark:from-pink-950/60 dark:to-rose-950/40 backdrop-blur-xl p-4 shadow-sm shadow-slate-900/[0.03] dark:shadow-none flex-1 transition-all hover:border-white dark:hover:border-white/20 hover:shadow-md">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
        <StickyNote className="size-4 text-[#EF4671]" />
        <span>Notes</span>
      </div>

      <div className="mt-2">
        <p className="text-xs font-bold leading-relaxed text-slate-800 dark:text-slate-100">
          Revamp Sidebar &amp; Update before Sep 14 🔥
        </p>
        <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Today</p>
      </div>
    </div>
  )
}

export function QuickWidgets() {
  return (
    <div className="flex flex-col gap-3 justify-between">
      <TimerWidget />
      <NotesWidget />
    </div>
  )
}
