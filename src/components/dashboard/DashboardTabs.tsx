import { Plus } from "lucide-react"

interface DashboardTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onAddClick?: (tabName: string) => void
  tabCounts?: Record<string, number>
}

export function DashboardTabs({
  activeTab,
  onTabChange,
  onAddClick,
  tabCounts,
}: DashboardTabsProps) {
  const tabs = [
    { name: "To Do", count: tabCounts?.["To Do"] ?? 2 },
    { name: "In Progress", count: tabCounts?.["In Progress"] ?? 4 },
    { name: "Under Review", count: tabCounts?.["Under Review"] ?? 5 },
    { name: "Completed", count: tabCounts?.["Completed"] ?? 7 },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name
        return (
          <div
            key={tab.name}
            className={`group flex h-10 items-center gap-2 rounded-full pl-4 pr-2 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "border border-white/80 bg-white/60 dark:border-white/10 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-white dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-2xs"
            }`}
          >
            <button
              type="button"
              onClick={() => onTabChange(tab.name)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <span>{tab.name}</span>
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                  isActive
                    ? "bg-white text-slate-950 dark:bg-slate-950 dark:text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {tab.count}
              </span>
            </button>

            {/* Clickable Animated Plus Icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onAddClick?.(tab.name)
              }}
              title={`Add task to ${tab.name}`}
              className="flex size-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 active:scale-90 transition-all"
            >
              <Plus className="size-3 transition-transform duration-300 hover:rotate-90 hover:scale-125" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
