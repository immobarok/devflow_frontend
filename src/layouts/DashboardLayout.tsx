import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-svh w-full flex-col overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-200">
        {/* Top Header (fixed height, non-shrinking) */}
        <DashboardHeader />

        {/* Unified Dashboard Frame / Container with Glassmorphic Backdrop */}
        <main className="flex flex-1 min-h-0 flex-col overflow-hidden p-2 sm:p-2.5 lg:p-3 relative">
          <div className="relative mx-auto flex h-full w-full max-w-[1680px] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100/60 shadow-lg shadow-slate-900/[0.03] dark:border-white/10 dark:bg-[#0e1320]/80 dark:shadow-2xl transition-colors duration-200">
            {/* Ambient Glass Glow Orbs */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-[#EF4671]/12 dark:bg-[#EF4671]/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 right-1/4 size-80 rounded-full bg-purple-400/10 dark:bg-purple-600/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-10 size-96 rounded-full bg-pink-300/10 dark:bg-pink-500/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-1/4 left-1/3 size-72 rounded-full bg-indigo-300/10 dark:bg-indigo-600/15 blur-3xl" />

            {/* Fixed Sidebar: stays in place */}
            <AppSidebar />

            {/* Scrollable Body: only this area scrolls, without visible scrollbar */}
            <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar bg-transparent min-w-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
