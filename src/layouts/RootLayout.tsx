import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="min-h-svh">
      <Outlet />
    </div>
  )
}
