import { useState } from "react"
import { X, Plus, Check, Calendar, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TaskPayload {
  title: string
  description: string
  status: string
  priority: {
    label: string
    bgColor: string
    textColor: string
  }
  dueDate: string
  assignees: string[]
  extraCount?: number
  commentsCount: number
  attachmentsCount: number
  subtasks: string
}

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTask: (task: TaskPayload) => void
  defaultStatus?: string
}

const availableAssignees = [
  {
    name: "Brenda",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Michie",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Alex",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
]

const priorityOptions = [
  { label: "Urgent", bgColor: "#ff5722", textColor: "#ffffff" },
  { label: "High", bgColor: "#EF4671", textColor: "#ffffff" },
  { label: "Medium", bgColor: "#f59e0b", textColor: "#ffffff" },
  { label: "Low Priority", bgColor: "#fef08a", textColor: "#854d0e" },
]

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
  defaultStatus = "To Do",
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(defaultStatus)
  const [selectedPriority, setSelectedPriority] = useState(priorityOptions[0])
  const [dueDateText, setDueDateText] = useState("Due Sep 28")
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([
    availableAssignees[0].avatar,
    availableAssignees[1].avatar,
  ])
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const toggleAssignee = (avatarUrl: string) => {
    setSelectedAssignees((prev) =>
      prev.includes(avatarUrl)
        ? prev.length > 1
          ? prev.filter((a) => a !== avatarUrl)
          : prev
        : [...prev, avatarUrl]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSuccess(true)

    setTimeout(() => {
      onCreateTask({
        title: title.trim(),
        description:
          description.trim() ||
          "Collaborative task update coordinated by the workspace team.",
        status,
        priority: selectedPriority,
        dueDate: dueDateText,
        assignees: selectedAssignees,
        commentsCount: 0,
        attachmentsCount: 1,
        subtasks: "0/1",
      })
      setTitle("")
      setDescription("")
      setIsSuccess(false)
      onClose()
    }, 450)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 dark:bg-black/65 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/80 dark:border-white/10 bg-white/95 dark:bg-[#111626]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-2xl bg-[#EF4671]/10 text-[#EF4671]">
              <Sparkles className="size-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Create New Task
              </h2>
              <p className="text-xs text-slate-400">
                Add an actionable item to your sprint pipeline
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4.5 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Task Title</span>
              <span className="text-[10px] text-slate-400 font-normal">Required</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design System Tokens & Glass UI"
              className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 px-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#EF4671] focus:ring-4 focus:ring-[#EF4671]/10 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be accomplished in this task?"
              className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#EF4671] focus:ring-4 focus:ring-[#EF4671]/10 transition-all resize-none"
            />
          </div>

          {/* Status Pipeline & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pipeline Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 px-3 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#EF4671]"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Calendar className="size-3 text-slate-400" />
                <span>Due Date</span>
              </label>
              <input
                type="text"
                value={dueDateText}
                onChange={(e) => setDueDateText(e.target.value)}
                placeholder="Due Sep 28"
                className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-900/80 px-3.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#EF4671]"
              />
            </div>
          </div>

          {/* Priority Options */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <AlertCircle className="size-3 text-slate-400" />
              <span>Priority Level</span>
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {priorityOptions.map((opt) => {
                const isSelected = selectedPriority.label === opt.label
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedPriority(opt)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all active:scale-95 ${
                      isSelected
                        ? "ring-2 ring-slate-900 dark:ring-white scale-105 shadow-xs"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: opt.bgColor, color: opt.textColor }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Assignees Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assign Team Members
            </label>
            <div className="flex items-center gap-2 pt-0.5">
              {availableAssignees.map((member) => {
                const isAssigned = selectedAssignees.includes(member.avatar)
                return (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => toggleAssignee(member.avatar)}
                    className={`group relative flex items-center gap-1.5 rounded-full p-1 pr-2.5 text-xs transition-all active:scale-95 ${
                      isAssigned
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 ring-2 ring-[#EF4671]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    <Avatar className="size-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-[11px]">{member.name}</span>
                    {isAssigned && <Check className="size-3 text-[#EF4671]" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-full px-4 text-xs font-semibold"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSuccess}
              className={`h-10 rounded-full px-5 text-xs font-semibold shadow-md active:scale-95 transition-all ${
                isSuccess
                  ? "bg-emerald-600 text-white"
                  : "bg-[#EF4671] text-white hover:bg-[#e0335e] shadow-[#EF4671]/25 hover:shadow-lg hover:shadow-[#EF4671]/35"
              }`}
            >
              {isSuccess ? (
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 animate-bounce" />
                  Task Created!
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Plus className="size-3.5" />
                  Create Task
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
