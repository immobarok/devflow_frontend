import { Outlet } from "react-router"

export default function DashboardLayout() {
  return (
    <div className="flex min-h-svh">
      {/* Sidebar goes here */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
