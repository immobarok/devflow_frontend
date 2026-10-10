import { useState } from "react"
import {
  DashboardTitleBar,
  DashboardTabs,
  TaskCard,
  CalendarWidget,
  MeetScheduleWidget,
  TeamChatWidget,
  QuickWidgets,
} from "@/components/dashboard"

interface TaskItem {
  priority: {
    label: string
    bgColor: string
    textColor: string
  }
  dueDate: string
  title: string
  description: string
  assignees: string[]
  extraCount?: number
  commentsCount: number
  attachmentsCount: number
  subtasks: string
}

const initialTasks: TaskItem[] = [
  {
    priority: { label: "Urgent", bgColor: "#ff5722", textColor: "#ffffff" },
    dueDate: "Due Sep 14",
    title: "Revamp Sidebar",
    description: "Redesign navigation with better spacing for easier access.",
    assignees: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
    extraCount: 2,
    commentsCount: 10,
    attachmentsCount: 2,
    subtasks: "0/2",
  },
  {
    priority: { label: "Low Priority", bgColor: "#fef08a", textColor: "#854d0e" },
    dueDate: "Due Sep 26",
    title: "Onboarding Flow",
    description: "Simplify first-time user journey and reduce unnecessary setup steps.",
    assignees: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    ],
    extraCount: 3,
    commentsCount: 7,
    attachmentsCount: 3,
    subtasks: "0/7",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("To Do")

  return (
    <div className="p-3 sm:p-4 lg:p-4.5 space-y-3.5 max-w-[1640px]">
      {/* 1. Project Title & Breadcrumb Header */}
      <DashboardTitleBar />

      {/* 2. Pipeline Filter Tabs */}
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. First Row: Task Cards & Calendar Widget */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        {initialTasks.map((task, idx) => (
          <TaskCard key={idx} {...task} />
        ))}
        <CalendarWidget />
      </div>

      {/* 4. Second Row: Meet Schedule, Team Chat, and Quick Widgets */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        <MeetScheduleWidget />
        <TeamChatWidget />
        <QuickWidgets />
      </div>
    </div>
  )
}
