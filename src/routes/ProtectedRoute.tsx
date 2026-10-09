import { Navigate, Outlet, useLocation } from "react-router"

export default function ProtectedRoute() {
  const location = useLocation()

  // Replace this with your actual auth check (e.g. Redux state, context, token)
  const token = localStorage.getItem("accessToken")

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
