import { Crown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWorkspaces } from "@/lib/workspaceStore"

interface DashboardTitleBarProps {
  onAddClick?: () => void
}

export function DashboardTitleBar({ onAddClick }: DashboardTitleBarProps) {
  const { activeWorkspace } = useWorkspaces()

  const teamAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
  ]

  return (
    <div className="space-y-3.5">
      {/* 1. Breadcrumb & Metadata Row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-xs font-normal text-slate-400">
          <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors font-medium text-slate-600 dark:text-slate-300">
            {activeWorkspace.name}
          </span>
          <span className="text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
            Ongoing Projects
          </span>
          <span className="text-slate-300 dark:text-slate-600">&gt;</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            DevFlow - SaaS Dashboard
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-normal text-slate-500 dark:text-slate-400">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span>Last Update on Sep 5, 2025 - 10:50 AM</span>
        </div>
      </div>

      {/* 2. Project Title Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white">
            DevFlow - SaaS Dashboard
          </h1>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f3e8ff]/80 dark:bg-purple-950/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[#7e22ce] dark:text-purple-300 border border-white/80 dark:border-purple-800/40 shadow-2xs">
            <Crown className="size-3.5 fill-[#7e22ce] dark:fill-purple-300" />
            <span>Pro member</span>
          </div>
        </div>

        {/* Team Avatars & Add Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            {teamAvatars.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Team member"
                className="size-8 rounded-full border-2 border-white dark:border-slate-800 object-cover"
              />
            ))}
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              +6
            </div>
          </div>

          <Button
            type="button"
            onClick={onAddClick}
            className="group relative overflow-hidden h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 px-4 text-xs font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 hover:ring-2 hover:ring-[#EF4671]/40"
          >
            <Plus className="mr-1.5 size-3.5 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
