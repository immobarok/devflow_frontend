import { createBrowserRouter } from "react-router"
import RootLayout from "@/layouts/RootLayout"
import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProtectedRoute from "./ProtectedRoute"
import ErrorBoundary from "./ErrorBoundary"

import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import DashboardPage from "@/pages/Dashboard"
import NotFoundPage from "@/pages/NotFound"
import HomePage from "@/pages/Home/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
        ],
      },
    ],
  },
])
