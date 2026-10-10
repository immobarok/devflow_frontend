import { useState } from "react"
import { Settings2, Lock, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Milesto Team")
  const [isPrivate, setIsPrivate] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-white">
          Workspace Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize workspace details, preferences, and member permissions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
        {/* General Profile Card */}
        <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings2 className="size-4 text-[#EF4671]" />
            Workspace Profile
          </h2>

          <div className="flex items-center gap-4 pt-1">
            <Avatar className="size-16 ring-4 ring-white/90 dark:ring-slate-800 shadow-md">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" alt="Brenda" />
              <AvatarFallback className="bg-slate-900 text-white font-bold">MT</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workspace Avatar</h3>
              <p className="text-xs text-slate-400">Team representation across all boards</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Workspace Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="h-10 w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#EF4671]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="size-3.5 text-slate-500" />
                Private Workspace
              </h4>
              <p className="text-[11px] text-slate-400">Only invited members can access workspace assets</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isPrivate ? "bg-[#EF4671]" : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  isPrivate ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            className="h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-5 text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            <Save className="mr-1.5 size-3.5" />
            Save Changes
          </Button>
          {saved && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ✓ Settings saved!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
