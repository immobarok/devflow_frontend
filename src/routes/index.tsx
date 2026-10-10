import { createBrowserRouter } from "react-router"
import RootLayout from "@/layouts/RootLayout"
import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProtectedRoute from "./ProtectedRoute"
import ErrorBoundary from "./ErrorBoundary"

import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import DashboardPage from "@/pages/Dashboard"
import TaskOverviewPage from "@/pages/dashboard/TaskOverviewPage"
import CalendarViewPage from "@/pages/dashboard/CalendarViewPage"
import TeamMembersPage from "@/pages/dashboard/TeamMembersPage"
import ReportSummaryPage from "@/pages/dashboard/ReportSummaryPage"
import SettingsPage from "@/pages/dashboard/SettingsPage"
import NotFoundPage from "@/pages/NotFound"
import HomePage from "@/pages/Home/Home"
import PricingPage from "@/pages/Pricing/PricingPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "pricing", element: <PricingPage /> },
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
          { path: "/dashboard/tasks", element: <TaskOverviewPage /> },
          { path: "/dashboard/calendar", element: <CalendarViewPage /> },
          { path: "/dashboard/team", element: <TeamMembersPage /> },
          { path: "/dashboard/reports", element: <ReportSummaryPage /> },
          { path: "/dashboard/settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
])
