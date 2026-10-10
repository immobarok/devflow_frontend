import { FileBarChart, ArrowUpRight, CheckCircle2, Clock, AlertTriangle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportSummaryPage() {
  const metrics = [
    { title: "Completed Tasks", value: "18", change: "+24%", sub: "this sprint cycle", icon: CheckCircle2, color: "text-emerald-500" },
    { title: "In Progress", value: "4", change: "-10%", sub: "active tasks", icon: Clock, color: "text-blue-500" },
    { title: "Under Review", value: "5", change: "+15%", sub: "awaiting QA", icon: AlertTriangle, color: "text-purple-500" },
    { title: "Sprint Velocity", value: "92%", change: "+5%", sub: "on schedule", icon: ArrowUpRight, color: "text-[#EF4671]" },
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-4 max-w-[1640px]">
      {/* Title & Export Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Report Summary
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Weekly velocity metrics, burn-down summary, and team deliverables.
          </p>
        </div>

        <Button className="h-9 rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-4 text-xs font-bold shadow-xs active:scale-95 transition-all w-fit">
          <Download className="mr-1.5 size-3.5" />
          Export Report
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div
              key={idx}
              className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{metric.title}</span>
                <Icon className={`size-4 ${metric.color}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {metric.value}
                </span>
                <span className="text-[11px] font-bold text-emerald-500">{metric.change}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">{metric.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Highlights & Velocity Breakdown */}
      <div className="rounded-3xl border border-white/80 bg-white/70 dark:border-white/10 dark:bg-[#141a29]/70 backdrop-blur-xl p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileBarChart className="size-4.5 text-[#EF4671]" />
          Sprint Velocity Breakdown
        </h2>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Design System Components</span>
              <span className="text-[#EF4671]">85%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-[#EF4671] rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Frontend SaaS Dashboard UI</span>
              <span className="text-purple-600 dark:text-purple-400">92%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "92%" }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Backend API Services &amp; Auth</span>
              <span className="text-emerald-600 dark:text-emerald-400">78%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
