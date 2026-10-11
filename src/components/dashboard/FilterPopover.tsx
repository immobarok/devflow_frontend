import { X, Check, RotateCcw, Filter, User, AlertCircle, ListTodo } from "lucide-react"
import { useSearchFilter, type FilterCriteria } from "@/lib/searchFilterStore"

interface FilterPopoverProps {
  isOpen: boolean
  onClose: () => void
}

const priorityOptions = [
  { label: "All", value: "All" },
  { label: "Urgent", value: "Urgent", color: "bg-[#ff5722] text-white" },
  { label: "High", value: "High", color: "bg-[#EF4671] text-white" },
  { label: "Medium", value: "Medium", color: "bg-amber-500 text-white" },
  { label: "Low", value: "Low Priority", color: "bg-[#fef08a] text-[#854d0e]" },
]

const statusOptions = [
  { label: "All", value: "All" },
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Under Review", value: "Under Review" },
  { label: "Completed", value: "Completed" },
]

const assigneeOptions = [
  { label: "All", value: "All", avatar: "" },
  {
    label: "Brenda",
    value: "Brenda",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    label: "Michie",
    value: "Michie",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    label: "Alex",
    value: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    label: "Sarah",
    value: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
]

export function FilterPopover({ isOpen, onClose }: FilterPopoverProps) {
  const { filters, setFilterCriteria, resetAllFilters, activeFilterCount } =
    useSearchFilter()

  if (!isOpen) return null

  return (
    <>
      {/* Click outside backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Floating Filter Menu Card */}
      <div className="absolute right-0 top-12 z-50 w-80 rounded-3xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-[#141a29]/95 backdrop-blur-2xl p-4.5 shadow-2xl shadow-slate-900/10 dark:shadow-none animate-in fade-in zoom-in-95 duration-150 text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-xl bg-[#EF4671]/10 text-[#EF4671]">
              <Filter className="size-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Filter Pipeline
              </h4>
              <p className="text-[10px] text-slate-400">
                {activeFilterCount > 0
                  ? `${activeFilterCount} active criteria`
                  : "Refine dashboard cards"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-red-500 transition-colors p-1"
                title="Reset filters"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="mt-3.5 space-y-3.5">
          {/* 1. Priority */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <AlertCircle className="size-3 text-slate-400" />
              <span>Priority</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {priorityOptions.map((opt) => {
                const isSelected = filters.priority === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterCriteria("priority", opt.value)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs scale-102"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Status */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <ListTodo className="size-3 text-slate-400" />
              <span>Status Column</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((opt) => {
                const isSelected = filters.status === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterCriteria("status", opt.value)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs scale-102"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. Assignee */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <User className="size-3 text-slate-400" />
              <span>Team Assignee</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {assigneeOptions.map((opt) => {
                const isSelected = filters.assignee === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFilterCriteria("assignee", opt.value)}
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? "bg-[#EF4671] text-white shadow-xs scale-102"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {opt.avatar && (
                      <img
                        src={opt.avatar}
                        alt={opt.label}
                        className="size-3.5 rounded-full object-cover"
                      />
                    )}
                    <span>{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400">
            {activeFilterCount > 0 ? "Filters applied" : "Showing all tasks"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-1 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </>
  )
}
