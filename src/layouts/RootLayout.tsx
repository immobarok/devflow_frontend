import { Outlet } from "react-router"
import { Navbar } from "@/components/layout/Navbar"

export default function RootLayout() {
  return (
    <div className="min-h-svh flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
