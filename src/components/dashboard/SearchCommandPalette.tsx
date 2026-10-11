import { useNavigate } from "react-router"
import {
  Search,
  ListTodo,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useCalendarEvents } from "@/lib/calendarStore"
import { useSearchFilter } from "@/lib/searchFilterStore"

interface SearchCommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSelectTask?: (taskTitle: string) => void
}

const quickNavItems = [
  { name: "Dashboard Board", path: "/dashboard", icon: Compass, badge: "Home" },
  { name: "Task Overview", path: "/dashboard/tasks", icon: ListTodo, badge: "Pipeline" },
  { name: "Calendar & Schedule", path: "/dashboard/calendar", icon: Calendar, badge: "Events" },
  { name: "Team Members", path: "/dashboard/team", icon: Compass, badge: "Collaborators" },
  { name: "Report Summary", path: "/dashboard/reports", icon: Compass, badge: "Metrics" },
]

export function SearchCommandPalette({
  isOpen,
  onClose,
  onSelectTask,
}: SearchCommandPaletteProps) {
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery } = useSearchFilter()
  const { events } = useCalendarEvents()

  if (!isOpen) return null

  const query = searchQuery.trim().toLowerCase()

  // Pre-configured mock tasks for search lookup
  const searchableTasks = [
    {
      id: "task-1",
      title: "Revamp Sidebar",
      description: "Redesign navigation with better spacing for easier access.",
      status: "To Do",
      priority: "Urgent",
      color: "text-[#ff5722]",
    },
    {
      id: "task-2",
      title: "Onboarding Flow",
      description: "Simplify first-time user journey and reduce unnecessary setup steps.",
      status: "To Do",
      priority: "Low Priority",
      color: "text-amber-500",
    },
    {
      id: "task-3",
      title: "Dark mode color tokens & glass contrast",
      description: "Refine CSS hsl variables and high contrast text for dark theme.",
      status: "Under Review",
      priority: "High",
      color: "text-[#EF4671]",
    },
    {
      id: "task-4",
      title: "Optimize onboarding wizard flow",
      description: "Improve completion rates and interactive onboarding feedback.",
      status: "In Progress",
      priority: "Medium",
      color: "text-amber-500",
    },
  ]

  const matchedTasks = searchableTasks.filter(
    (t) =>
      !query ||
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.priority.toLowerCase().includes(query)
  )

  const matchedEvents = events.filter(
    (e) =>
      !query ||
      e.title.toLowerCase().includes(query) ||
      e.tag.toLowerCase().includes(query) ||
      (e.description && e.description.toLowerCase().includes(query))
  )

  const matchedNav = quickNavItems.filter(
    (n) => !query || n.name.toLowerCase().includes(query)
  )

  const hasAnyResults =
    matchedTasks.length > 0 || matchedEvents.length > 0 || matchedNav.length > 0

  const handleSelectTask = (title: string) => {
    setSearchQuery(title)
    if (onSelectTask) {
      onSelectTask(title)
    }
    onClose()
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <>
      {/* Click outside backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Floating Dropdown */}
      <div className="absolute left-0 right-0 top-12 z-50 max-h-[460px] overflow-y-auto rounded-3xl border border-white/80 bg-white/95 dark:border-white/10 dark:bg-[#141a29]/95 backdrop-blur-2xl p-3 shadow-2xl shadow-slate-900/15 dark:shadow-none animate-in fade-in zoom-in-95 duration-150 text-left">
        {hasAnyResults ? (
          <div className="space-y-3">
            {/* Tasks section */}
            {matchedTasks.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ListTodo className="size-3 text-[#EF4671]" />
                    Matching Tasks ({matchedTasks.length})
                  </span>
                  <span>Tasks</span>
                </div>
                <div className="space-y-1 mt-1">
                  {matchedTasks.slice(0, 3).map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => handleSelectTask(task.title)}
                      className="flex w-full items-center justify-between rounded-2xl p-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="flex size-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                          <ListTodo className="size-3.5" />
                        </span>
                        <div className="truncate">
                          <h5 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-[#EF4671] transition-colors truncate">
                            {task.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${task.color} bg-slate-100 dark:bg-slate-800`}
                        >
                          {task.priority}
                        </span>
                        <ArrowRight className="size-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar Events section */}
            {matchedEvents.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3 text-purple-500" />
                    Calendar Schedule ({matchedEvents.length})
                  </span>
                  <span>Events</span>
                </div>
                <div className="space-y-1 mt-1">
                  {matchedEvents.slice(0, 3).map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => handleNavigate("/dashboard/calendar")}
                      className="flex w-full items-center justify-between rounded-2xl p-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="flex size-7 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#a855f7] shrink-0">
                          <Calendar className="size-3.5" />
                        </span>
                        <div className="truncate">
                          <h5 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-[#a855f7] transition-colors truncate">
                            {evt.title}
                          </h5>
                          <p className="text-[10px] text-slate-400 truncate">
                            {evt.date} • {evt.time}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#a855f7] px-2 py-0.5 text-[9px] font-bold">
                        {evt.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Navigation section */}
            {matchedNav.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-white/10">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Navigation
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {matchedNav.slice(0, 4).map((nav) => (
                    <button
                      key={nav.path}
                      type="button"
                      onClick={() => handleNavigate(nav.path)}
                      className="flex items-center gap-2 rounded-xl p-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <nav.icon className="size-3.5 text-slate-400" />
                      <span className="truncate">{nav.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center space-y-2">
            <div className="flex size-9 mx-auto items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Search className="size-4" />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              No results for "{searchQuery}"
            </p>
            <p className="text-[11px] text-slate-400">
              Try searching by task title, priority, or milestone
            </p>
          </div>
        )}

        {/* Footer shortcuts hint */}
        <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span>
              <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono">
                ⌘ S
              </kbd>{" "}
              or{" "}
              <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono">
                /
              </kbd>{" "}
              to focus
            </span>
            <span>•</span>
            <span>
              <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono">
                esc
              </kbd>{" "}
              to close
            </span>
          </div>
          <span className="flex items-center gap-1 text-[#EF4671] font-semibold">
            <Sparkles className="size-2.5" /> Live Search
          </span>
        </div>
      </div>
    </>
  )
}
