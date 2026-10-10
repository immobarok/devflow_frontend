import { Video, Bell, ChevronDown, Maximize2, MicOff, PhoneOff, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MeetScheduleWidget() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm shadow-slate-900/[0.03] dark:shadow-none transition-all hover:bg-white/85 dark:hover:bg-[#192133]/80 hover:border-white dark:hover:border-white/20 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
          <Video className="size-4.5 text-slate-700 dark:text-slate-300" />
          <span>Meet Schedule</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button type="button" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Bell className="size-4" />
          </button>
          <button type="button" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      {/* Video Preview */}
      <div className="relative mt-4 overflow-hidden rounded-2xl bg-slate-950 h-48 shadow-inner">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
          alt="Video preview"
          className="h-full w-full object-cover object-[center_15%]"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5">
          <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-white tracking-wider">
            Preview
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
          >
            <Maximize2 className="size-3.5" />
          </button>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title="Mute"
          >
            <MicOff className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full bg-[#ff3b30] text-white hover:bg-[#e02e24] shadow-sm transition-colors"
            title="End call"
          >
            <PhoneOff className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title="Camera"
          >
            <Video className="size-3.5" />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            title="More"
          >
            <MoreHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Footer Info & Join Button */}
      <div className="mt-4 flex items-center justify-between pt-2">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Daily Scrum 👏</h4>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-400 font-normal">
            Sep 12 &nbsp; 10:00 - 10:15
          </p>
        </div>

        <Button
          className="h-9 rounded-full bg-slate-100 dark:bg-slate-800 px-4 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-[#EF4671] hover:text-white dark:hover:bg-[#EF4671] dark:hover:text-white transition-all shadow-2xs"
        >
          <span>Join Meet</span>
          <Video className="ml-1.5 size-3.5" />
        </Button>
      </div>
    </div>
  )
}
