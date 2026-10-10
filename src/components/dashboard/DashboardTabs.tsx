import { Plus } from "lucide-react"

interface DashboardTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  const tabs = [
    { name: "To Do", count: 2 },
    { name: "In Progress", count: 4 },
    { name: "Under Review", count: 5 },
    { name: "Completed", count: 7 },
  ]

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name
        return (
          <button
            key={tab.name}
            type="button"
            onClick={() => onTabChange(tab.name)}
            className={`flex h-10 items-center gap-2 rounded-full px-4 text-xs font-bold transition-all ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                : "border border-white/80 bg-white/60 dark:border-white/10 dark:bg-slate-900/60 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-white dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-2xs"
            }`}
          >
            <span>{tab.name}</span>
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[11px] font-extrabold ${
                isActive
                  ? "bg-white text-slate-950 dark:bg-slate-950 dark:text-white"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {tab.count}
            </span>
            <Plus className="size-3 text-slate-400 dark:text-slate-500" />
          </button>
        )
      })}
    </div>
  )
}
