import { CalendarDays, ChevronDown, MoreHorizontal } from "lucide-react"

export function CalendarWidget() {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4.5 shadow-sm shadow-slate-900/[0.03] dark:shadow-none transition-all hover:bg-white/85 dark:hover:bg-[#192133]/80 hover:border-white dark:hover:border-white/20 hover:shadow-md">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
          <CalendarDays className="size-4.5 text-slate-700 dark:text-slate-300" />
          <span>Calendar</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Sep</span>
            <ChevronDown className="size-3 text-slate-500 dark:text-slate-400" />
          </button>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <MoreHorizontal className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mt-4">
        {/* Day Names */}
        <div className="grid grid-cols-7 text-center text-[10.5px] font-medium text-slate-400 dark:text-slate-500 pb-2">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Month Days */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-normal text-slate-700 dark:text-slate-300 pt-1">
          {/* Row 1: 4 empty gray circles + 1, 2, 3 */}
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-slate-100/70 dark:bg-slate-800/50" />
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-slate-100/70 dark:bg-slate-800/50" />
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-slate-100/70 dark:bg-slate-800/50" />
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-slate-100/70 dark:bg-slate-800/50" />
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#ffe4e6] dark:bg-[#EF4671]/20 text-[#EF4671] font-semibold flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#ffe4e6] dark:bg-[#EF4671]/20 text-[#EF4671] font-semibold flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#ffe4e6] dark:bg-[#EF4671]/20 text-[#EF4671] font-semibold flex items-center justify-center">
              3
            </span>
          </div>

          {/* Row 2: 4, 5, 6, 7, 8, 9, 10 */}
          <div className="flex items-center justify-center py-1">4</div>
          <div className="flex items-center justify-center py-1">5</div>
          <div className="flex items-center justify-center py-1">6</div>
          <div className="flex items-center justify-center py-1">7</div>
          <div className="flex items-center justify-center py-1">8</div>
          <div className="flex items-center justify-center py-1">9</div>
          <div className="flex items-center justify-center py-1">10</div>

          {/* Row 3: 11, 12 (Purple), 13, 14, 15, 16 (Lavender), 17 */}
          <div className="flex items-center justify-center py-1">11</div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#a855f7] text-white font-semibold flex items-center justify-center shadow-xs">
              12
            </span>
          </div>
          <div className="flex items-center justify-center py-1">13</div>
          <div className="flex items-center justify-center py-1">14</div>
          <div className="flex items-center justify-center py-1">15</div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 text-[#9333ea] dark:text-purple-300 font-semibold flex items-center justify-center">
              16
            </span>
          </div>
          <div className="flex items-center justify-center py-1">17</div>

          {/* Row 4: 18, 19, 20, 21, 22, 23, 24 */}
          <div className="flex items-center justify-center py-1">18</div>
          <div className="flex items-center justify-center py-1">19</div>
          <div className="flex items-center justify-center py-1">20</div>
          <div className="flex items-center justify-center py-1">21</div>
          <div className="flex items-center justify-center py-1">22</div>
          <div className="flex items-center justify-center py-1">23</div>
          <div className="flex items-center justify-center py-1">24</div>

          {/* Row 5: 25, 26, 27 (Yellow/Gold Group), 28, 29, 30 */}
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#fef08a] dark:bg-yellow-950/60 text-[#854d0e] dark:text-yellow-300 font-semibold flex items-center justify-center">
              25
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#fef08a] dark:bg-yellow-950/60 text-[#854d0e] dark:text-yellow-300 font-semibold flex items-center justify-center">
              26
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-[#fef08a] dark:bg-yellow-950/60 text-[#854d0e] dark:text-yellow-300 font-semibold flex items-center justify-center">
              27
            </span>
          </div>
          <div className="flex items-center justify-center py-1">28</div>
          <div className="flex items-center justify-center py-1">29</div>
          <div className="flex items-center justify-center py-1">30</div>
          <div className="flex items-center justify-center">
            <span className="size-7 rounded-full bg-slate-100/70 dark:bg-slate-800/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
