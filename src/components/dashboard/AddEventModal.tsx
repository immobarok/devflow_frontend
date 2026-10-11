import { useState } from "react"
import { createPortal } from "react-dom"
import { X, Calendar, Clock, Plus, Tag, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CalendarEvent, EventTag } from "@/lib/calendarStore"

interface AddEventModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: CalendarEvent) => void
  defaultDate?: string
}

const tagOptions: { tag: EventTag; label: string; bg: string; text: string }[] = [
  { tag: "Meet", label: "Meeting", bg: "bg-[#a855f7]/15", text: "text-[#a855f7]" },
  { tag: "Sprint", label: "Sprint", bg: "bg-[#EF4671]/15", text: "text-[#EF4671]" },
  { tag: "Deadline", label: "Deadline", bg: "bg-yellow-500/15", text: "text-amber-600 dark:text-yellow-400" },
  { tag: "DevFlow", label: "DevFlow", bg: "bg-blue-500/15", text: "text-blue-600 dark:text-blue-400" },
  { tag: "Design", label: "Design", bg: "bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-400" },
]

export function AddEventModal({
  isOpen,
  onClose,
  onAddEvent,
  defaultDate = "2025-09-12",
}: AddEventModalProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(defaultDate)
  const [time, setTime] = useState("10:00 - 11:00 AM")
  const [tag, setTag] = useState<EventTag>("Meet")
  const [description, setDescription] = useState("")

  if (!isOpen || typeof document === "undefined") return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      date,
      time: time.trim() || "All Day",
      tag,
      description: description.trim() || undefined,
    }

    onAddEvent(newEvent)
    setTitle("")
    setDescription("")
    onClose()
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md max-h-[88vh] overflow-y-auto rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#141a29]/95 sm:p-7 animate-in zoom-in-95 fade-in duration-200 z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#EF4671]/10 text-[#EF4671]">
              <Calendar className="size-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Calendar Event
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-400">
                Schedule a meeting, sprint deadline, or ceremony
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sprint Retrospective or Client Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium"
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="size-3.5 text-slate-400" />
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-900 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="size-3.5 text-slate-400" />
                Time
              </label>
              <input
                type="text"
                placeholder="10:00 - 11:00 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-900 placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Tag Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="size-3.5 text-slate-400" />
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tagOptions.map((opt) => {
                const isSelected = tag === opt.tag
                return (
                  <button
                    key={opt.tag}
                    type="button"
                    onClick={() => setTag(opt.tag)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs scale-102"
                        : `${opt.bg} ${opt.text} hover:opacity-80`
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="size-3.5 text-slate-400" />
              Notes / Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Add agenda or relevant links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 py-2 text-xs text-slate-900 placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 rounded-full px-4 text-xs font-semibold border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 rounded-full bg-[#EF4671] hover:bg-[#e0335e] text-white px-5 text-xs font-semibold shadow-sm active:scale-95 transition-all"
            >
              <Plus className="mr-1 size-3.5" />
              Add to Calendar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
