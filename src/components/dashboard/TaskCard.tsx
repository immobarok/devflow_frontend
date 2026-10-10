import { MoreHorizontal, MessageSquare, Paperclip, Clock } from "lucide-react"

export interface TaskCardProps {
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

export function TaskCard({
  priority,
  dueDate,
  title,
  description,
  assignees,
  extraCount,
  commentsCount,
  attachmentsCount,
  subtasks,
}: TaskCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm shadow-slate-900/[0.03] dark:shadow-none transition-all hover:bg-white/85 dark:hover:bg-[#192133]/80 hover:border-white dark:hover:border-white/20 hover:shadow-md">
      <div>
        {/* Badges Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold shadow-2xs"
              style={{ backgroundColor: priority.bgColor, color: priority.textColor }}
            >
              {priority.label}
            </span>
            <span className="rounded-full bg-[#fceaf0] dark:bg-[#EF4671]/20 px-3 py-1 text-[11px] font-bold text-[#EF4671]">
              {dueDate}
            </span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="Options"
          >
            <MoreHorizontal className="size-4.5" />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {/* Avatars */}
        <div className="flex items-center -space-x-2">
          {assignees.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="Assignee"
              className="size-7 rounded-full border-2 border-white dark:border-slate-800 object-cover"
            />
          ))}
          {extraCount && (
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
              +{extraCount}
            </div>
          )}
        </div>

        {/* Metrics Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-3 text-xs font-semibold text-slate-400 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
              <MessageSquare className="size-3.5" />
              {commentsCount}
            </span>
            <span className="flex items-center gap-1.5 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors">
              <Paperclip className="size-3.5" />
              {attachmentsCount}
            </span>
          </div>
          <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300 font-bold">
            <Clock className="size-3.5 text-slate-400 dark:text-slate-500" />
            {subtasks}
          </span>
        </div>
      </div>
    </div>
  )
}
