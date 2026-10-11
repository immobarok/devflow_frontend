import { useState } from "react"
import {
  DashboardTitleBar,
  DashboardTabs,
  TaskCard,
  CalendarWidget,
  MeetScheduleWidget,
  TeamChatWidget,
  QuickWidgets,
  CreateTaskModal,
  type TaskPayload,
} from "@/components/dashboard"
import { Plus, X, FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchFilter } from "@/lib/searchFilterStore"

interface TaskItem {
  id: string
  status: string
  priority: {
    label: string
    bgColor: string
    textColor: string
  }
  dueDate: string
  title: string
  description: string
  assignees: string[]
  extraCount?: number
  commentsCount: number
  attachmentsCount: number
  subtasks: string
}

const initialTasks: TaskItem[] = [
  {
    id: "task-1",
    status: "To Do",
    priority: { label: "Urgent", bgColor: "#ff5722", textColor: "#ffffff" },
    dueDate: "Due Sep 14",
    title: "Revamp Sidebar",
    description: "Redesign navigation with better spacing for easier access.",
    assignees: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
    extraCount: 2,
    commentsCount: 10,
    attachmentsCount: 2,
    subtasks: "0/2",
  },
  {
    id: "task-2",
    status: "To Do",
    priority: { label: "Low Priority", bgColor: "#fef08a", textColor: "#854d0e" },
    dueDate: "Due Sep 26",
    title: "Onboarding Flow",
    description: "Simplify first-time user journey and reduce unnecessary setup steps.",
    assignees: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    ],
    extraCount: 3,
    commentsCount: 7,
    attachmentsCount: 3,
    subtasks: "0/7",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("To Do")
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDefaultStatus, setModalDefaultStatus] = useState("To Do")

  const {
    searchQuery,
    filters,
    clearSearchQuery,
    resetAllFilters,
    hasActiveFiltersOrSearch,
  } = useSearchFilter()

  const handleOpenModal = (tabName: string = activeTab) => {
    setModalDefaultStatus(tabName)
    setIsModalOpen(true)
  }

  const handleCreateTask = (payload: TaskPayload) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      status: payload.status,
      priority: payload.priority,
      dueDate: payload.dueDate,
      title: payload.title,
      description: payload.description,
      assignees: payload.assignees,
      extraCount: payload.extraCount,
      commentsCount: payload.commentsCount,
      attachmentsCount: payload.attachmentsCount,
      subtasks: payload.subtasks,
    }

    setTasks((prev) => [newTask, ...prev])
    setActiveTab(payload.status)
  }

  // Filter tasks based on activeTab, searchQuery, and filter criteria
  const visibleTasks = tasks.filter((task) => {
    // 1. Status Filter: if explicit status filter is chosen, respect it, otherwise match active tab
    const matchesStatus =
      filters.status !== "All"
        ? task.status === filters.status
        : task.status === activeTab

    // 2. Priority Filter
    const matchesPriority =
      filters.priority === "All" ||
      task.priority.label.toLowerCase() === filters.priority.toLowerCase()

    // 3. Assignee Filter
    let matchesAssignee = true
    if (filters.assignee !== "All") {
      const avatarMap: Record<string, string> = {
        Brenda: "photo-1494790108377",
        Michie: "photo-1534528741775",
        Alex: "photo-1507003211169",
        Sarah: "photo-1517841905240",
      }
      const needle = avatarMap[filters.assignee]
      if (needle) {
        matchesAssignee = task.assignees.some((url) => url.includes(needle))
      }
    }

    // 4. Search Query Filter
    let matchesSearch = true
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      matchesSearch =
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.priority.label.toLowerCase().includes(q) ||
        task.dueDate.toLowerCase().includes(q)
    }

    return matchesStatus && matchesPriority && matchesAssignee && matchesSearch
  })

  const tabCounts = {
    "To Do": tasks.filter((t) => t.status === "To Do").length,
    "In Progress": 4 + tasks.filter((t) => t.status === "In Progress").length,
    "Under Review": 5 + tasks.filter((t) => t.status === "Under Review").length,
    "Completed": 7 + tasks.filter((t) => t.status === "Completed").length,
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-3.5 max-w-[1640px]">
      {/* 1. Project Title & Breadcrumb Header with Interactive Add Button */}
      <DashboardTitleBar onAddClick={() => handleOpenModal(activeTab)} />

      {/* 2. Pipeline Filter Tabs with Interactive Plus Badges */}
      <DashboardTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={(tabName) => handleOpenModal(tabName)}
        tabCounts={tabCounts}
      />

      {/* Active Search & Filter Notification Banner */}
      {hasActiveFiltersOrSearch && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/80 bg-white/80 dark:border-white/10 dark:bg-[#141a29]/80 backdrop-blur-xl px-4 py-2.5 text-xs shadow-xs animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Active Filter:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EF4671]/10 px-2.5 py-1 text-[11px] font-semibold text-[#EF4671]">
                Query: "{searchQuery}"
                <button
                  type="button"
                  onClick={clearSearchQuery}
                  className="hover:opacity-75 cursor-pointer"
                  title="Clear search"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}

            {filters.priority !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Priority: {filters.priority}
              </span>
            )}

            {filters.status !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Status: {filters.status}
              </span>
            )}

            {filters.assignee !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Assignee: {filters.assignee}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={resetAllFilters}
            className="flex items-center gap-1 font-semibold text-slate-400 hover:text-red-500 transition-colors cursor-pointer text-xs"
          >
            <FilterX className="size-3.5" />
            <span>Clear filters</span>
          </button>
        </div>
      )}

      {/* 3. First Row: Task Cards & Calendar Widget */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {visibleTasks.length > 0 ? (
          visibleTasks.slice(0, 2).map((task) => (
            <div key={task.id} className="animate-in fade-in zoom-in-95 duration-300">
              <TaskCard {...task} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-white/40 dark:bg-[#141a29]/40 p-8 text-center space-y-3 min-h-[260px] animate-in fade-in">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EF4671]/10 text-[#EF4671]">
              {hasActiveFiltersOrSearch ? (
                <FilterX className="size-5" />
              ) : (
                <Plus className="size-5" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {hasActiveFiltersOrSearch
                  ? "No tasks match your search or filter"
                  : `No tasks in ${activeTab}`}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {hasActiveFiltersOrSearch
                  ? "Try adjusting your query or resetting filter criteria"
                  : "Create a task to kickstart this pipeline column"}
              </p>
            </div>
            {hasActiveFiltersOrSearch ? (
              <Button
                type="button"
                onClick={resetAllFilters}
                className="h-8.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 text-xs font-semibold px-4 active:scale-95 transition-all shadow-sm"
              >
                Reset Search &amp; Filters
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => handleOpenModal(activeTab)}
                className="h-8.5 rounded-full bg-[#EF4671] text-white hover:bg-[#e0335e] text-xs font-semibold px-4 active:scale-95 transition-all shadow-sm"
              >
                <Plus className="mr-1 size-3.5" />
                Create Task
              </Button>
            )}
          </div>
        )}

        <CalendarWidget />
      </div>

      {/* 4. Second Row: Meet Schedule, Team Chat, and Quick Widgets */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        <MeetScheduleWidget />
        <TeamChatWidget />
        <QuickWidgets />
      </div>

      {/* 5. Animated Interactive Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={handleCreateTask}
        defaultStatus={modalDefaultStatus}
      />
    </div>
  )
}
