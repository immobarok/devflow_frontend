import { useState } from "react"
import { createPortal } from "react-dom"
import {
  X,
  Plus,
  Lock,
  Users,
  Globe,
  Briefcase,
  Sparkles,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useWorkspaces,
  type CreateWorkspacePayload,
} from "@/lib/workspaceStore"

interface CreateWorkspaceModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated?: (workspaceId: string) => void
}

const colorPresets = [
  { label: "Rose Pink", value: "bg-[#EF4671]", border: "border-[#EF4671]" },
  { label: "Purple", value: "bg-purple-600", border: "border-purple-600" },
  { label: "Indigo", value: "bg-indigo-600", border: "border-indigo-600" },
  { label: "Blue", value: "bg-blue-600", border: "border-blue-600" },
  { label: "Emerald", value: "bg-emerald-600", border: "border-emerald-600" },
  { label: "Amber", value: "bg-amber-500", border: "border-amber-500" },
]

const visibilityOptions: {
  type: "Private" | "Team" | "Public"
  label: string
  desc: string
  icon: typeof Lock
}[] = [
  {
    type: "Private",
    label: "Private Workspace",
    desc: "Only invited team members have access",
    icon: Lock,
  },
  {
    type: "Team",
    label: "Team Shared",
    desc: "Visible to all members in your org",
    icon: Users,
  },
  {
    type: "Public",
    label: "Public Showcase",
    desc: "Open for external clients or guest review",
    icon: Globe,
  },
]

export function CreateWorkspaceModal({
  isOpen,
  onClose,
  onCreated,
}: CreateWorkspaceModalProps) {
  const { createWorkspace } = useWorkspaces()

  const [name, setName] = useState("")
  const [type, setType] = useState<"Private" | "Team" | "Public">("Private")
  const [color, setColor] = useState("bg-[#EF4671]")
  const [description, setDescription] = useState("")

  if (!isOpen || typeof document === "undefined") return null

  // Compute initials for live preview
  const words = name.trim().split(/\s+/)
  const liveInitials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.trim().slice(0, 2).toUpperCase() || "WS"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const payload: CreateWorkspacePayload = {
      name: name.trim(),
      type,
      color,
      description: description.trim() || undefined,
    }

    const created = createWorkspace(payload)
    setName("")
    setDescription("")
    setType("Private")
    setColor("bg-[#EF4671]")
    if (onCreated) {
      onCreated(created.id)
    }
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
              <Briefcase className="size-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create Workspace
              </h3>
              <p className="text-xs text-slate-400">
                Setup a shared hub for sprints and team members
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Live Workspace Preview Card */}
        <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`size-10 rounded-2xl ${color} flex items-center justify-center text-white text-xs font-bold shadow-xs transition-colors`}
            >
              {liveInitials}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                {name.trim() || "Workspace Name"}
              </h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                <Lock className="size-2.5" />
                {type} Workspace
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#EF4671]/10 px-2 py-0.5 text-[10px] font-semibold text-[#EF4671]">
            <Sparkles className="size-2.5" />
            New
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Workspace Name Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Workspace Name <span className="text-[#EF4671]">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Acme Design Studio or Sprint Squad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400/80 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium"
            />
          </div>

          {/* Visibility / Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Workspace Privacy
            </label>
            <div className="space-y-1.5">
              {visibilityOptions.map((opt) => {
                const isSelected = type === opt.type
                const Icon = opt.icon
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setType(opt.type)}
                    className={`flex w-full items-center justify-between rounded-2xl p-2.5 text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#EF4671] bg-[#EF4671]/5 dark:bg-[#EF4671]/10 ring-1 ring-[#EF4671]/30"
                        : "border-slate-200/80 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`size-7 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? "bg-[#EF4671] text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        <Icon className="size-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">
                          {opt.label}
                        </p>
                        <p className="text-[10.5px] text-slate-400 font-normal">
                          {opt.desc}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="size-4 text-[#EF4671] shrink-0 mr-1" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Theme Accent Color
            </label>
            <div className="flex items-center gap-2">
              {colorPresets.map((c) => {
                const isSelected = color === c.value
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`size-7 rounded-full ${c.value} flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "ring-2 ring-slate-900 dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-[#141a29] scale-110"
                        : "hover:scale-105"
                    }`}
                    title={c.label}
                  >
                    {isSelected && <Check className="size-3 text-white" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="What is this workspace focused on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3.5 py-2 text-xs text-slate-900 placeholder:text-[11px] placeholder:font-normal placeholder:text-slate-400/80 focus:border-[#EF4671] focus:outline-none focus:ring-2 focus:ring-[#EF4671]/20 dark:border-white/10 dark:bg-slate-900/60 dark:text-white transition-all font-medium resize-none"
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
              Create Workspace
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
