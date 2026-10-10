import { useState } from "react"
import { Search, Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateTaskModal, type TaskPayload } from "@/components/dashboard"

interface Task {
  id: string
  title: string
  category: string
  status: "To Do" | "In Progress" | "Under Review" | "Completed"
  priority: "Urgent" | "High" | "Medium" | "Low"
  dueDate: string
  assignee: { name: string; avatar: string }
}

const mockTasks: Task[] = [
  {
    id: "DEV-101",
    title: "Revamp Sidebar & Navigation spacing",
    category: "Design System",
    status: "To Do",
    priority: "Urgent",
    dueDate: "Sep 14",
    assignee: { name: "Brenda", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
  },
  {
    id: "DEV-102",
    title: "Optimize onboarding wizard flow",
    category: "UX Research",
    status: "In Progress",
    priority: "Low",
    dueDate: "Sep 26",
    assignee: { name: "Michie", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
  },
  {
    id: "DEV-103",
    title: "Dark mode color tokens & glass contrast",
    category: "Frontend",
    status: "Under Review",
    priority: "High",
    dueDate: "Sep 18",
    assignee: { name: "Alex", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
  },
  {
    id: "DEV-104",
    title: "Setup ESLint & pre-commit hooks",
    category: "DevOps",
    status: "Completed",
    priority: "Medium",
    dueDate: "Sep 10",
    assignee: { name: "Sarah", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
  },
  {
    id: "DEV-105",
    title: "Video call preview component controls",
    category: "Features",
    status: "In Progress",
    priority: "Urgent",
    dueDate: "Sep 20",
    assignee: { name: "Brenda", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
  },
]

export default function TaskOverviewPage() {
  const [filter, setFilter] = useState<string>("All")
  const [search, setSearch] = useState("")
  const [tasksList, setTasksList] = useState<Task[]>(mockTasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateTask = (payload: TaskPayload) => {
    let normalizedPriority: Task["priority"] = "Medium"
    if (payload.priority.label.includes("Urgent")) normalizedPriority = "Urgent"
    else if (payload.priority.label.includes("High")) normalizedPriority = "High"
    else if (payload.priority.label.includes("Low")) normalizedPriority = "Low"

    const newTask: Task = {
      id: `DEV-${100 + tasksList.length + 1}`,
      title: payload.title,
      category: "Feature Sprint",
      status: (payload.status as Task["status"]) || "To Do",
      priority: normalizedPriority,
      dueDate: payload.dueDate,
      assignee: {
        name: "Brenda",
        avatar: payload.assignees[0] || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      },
    }

    setTasksList([newTask, ...tasksList])
  }

  const filteredTasks = tasksList.filter((task) => {
    const matchesFilter = filter === "All" || task.status === filter
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.id.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "Urgent":
        return "bg-[#ff5722] text-white"
      case "High":
        return "bg-[#EF4671] text-white"
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
      case "Low":
        return "bg-[#fef08a] text-[#854d0e] dark:bg-yellow-950/60 dark:text-yellow-300"
    }
  }

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "To Do":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Clock className="size-3.5" /> To Do
          </span>
        )
      case "In Progress":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Clock className="size-3.5" /> In Progress
          </span>
        )
      case "Under Review":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <AlertCircle className="size-3.5" /> Under Review
          </span>
        )
      case "Completed":
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3.5" /> Completed
          </span>
        )
    }
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Task Overview
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitor and track team tasks across all active sprint cycles.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="group relative overflow-hidden h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 px-4 text-xs font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 hover:ring-2 hover:ring-[#EF4671]/40 w-fit"
        >
          <Plus className="mr-1.5 size-3.5 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
          <span>Create Task</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {["All", "To Do", "In Progress", "Under Review", "Completed"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                filter === tab
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-xs"
                  : "border border-white/80 bg-white/60 dark:border-white/10 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-white/90"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="h-9 w-full rounded-full border border-white/80 bg-white/70 pl-8 pr-3 text-xs text-slate-900 dark:border-white/10 dark:bg-slate-900/70 dark:text-white focus:outline-none focus:border-[#EF4671]"
          />
        </div>
      </div>

      {/* Tasks Table Card */}
      <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4 shadow-sm shadow-slate-900/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Key</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Priority</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
                <th className="pb-3 pr-2 text-right">Assignee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 pl-2 font-mono font-bold text-slate-500 dark:text-slate-400">
                    {task.id}
                  </td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">
                    {task.title}
                  </td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">
                    {task.category}
                  </td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    {getStatusBadge(task.status)}
                  </td>
                  <td className="py-3 font-semibold text-[#EF4671]">
                    {task.dueDate}
                  </td>
                  <td className="py-3 pr-2 text-right">
                    <div className="inline-flex items-center gap-2">
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="size-6 rounded-full border border-white object-cover"
                      />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {task.assignee.name}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animated Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateTask={handleCreateTask}
        defaultStatus="To Do"
      />
    </div>
  )
}
