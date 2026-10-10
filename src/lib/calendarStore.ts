import { useState, useEffect } from "react"

export type EventTag = "Meet" | "Sprint" | "Design" | "DevFlow" | "Deadline"

export interface CalendarEvent {
  id: string
  title: string
  date: string // "YYYY-MM-DD" e.g. "2025-09-12"
  time: string // e.g. "10:00 - 10:15 AM"
  tag: EventTag
  description?: string
}

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Sprint 3 Retro",
    date: "2025-09-01",
    time: "09:30 - 10:30 AM",
    tag: "Sprint",
    description: "Review sprint deliverables and team velocity.",
  },
  {
    id: "evt-2",
    title: "Backlog Grooming",
    date: "2025-09-02",
    time: "11:00 - 12:00 PM",
    tag: "DevFlow",
    description: "Prioritize upcoming sprint tickets and user stories.",
  },
  {
    id: "evt-3",
    title: "Design Handoff",
    date: "2025-09-03",
    time: "02:00 - 03:00 PM",
    tag: "Design",
    description: "Handoff Figma tokens and icon sets to frontend engineers.",
  },
  {
    id: "evt-4",
    title: "Daily Scrum 👏",
    date: "2025-09-12",
    time: "10:00 - 10:15 AM",
    tag: "Meet",
    description: "Daily standup to sync progress, blockers, and milestones.",
  },
  {
    id: "evt-5",
    title: "Revamp Sidebar Due",
    date: "2025-09-14",
    time: "05:00 PM",
    tag: "Deadline",
    description: "Final deadline for sidebar revamp and mobile navigation.",
  },
  {
    id: "evt-6",
    title: "Product Architecture Review",
    date: "2025-09-16",
    time: "03:30 - 04:30 PM",
    tag: "DevFlow",
    description: "Architecture sync on GraphQL caching and offline state.",
  },
  {
    id: "evt-7",
    title: "Q3 Feature Freeze",
    date: "2025-09-25",
    time: "All Day",
    tag: "Sprint",
    description: "Code freeze ahead of release candidates.",
  },
  {
    id: "evt-8",
    title: "Onboarding Flow Due",
    date: "2025-09-26",
    time: "06:00 PM",
    tag: "Deadline",
    description: "Release the updated multi-step user onboarding flow.",
  },
  {
    id: "evt-9",
    title: "Milestone Demo 🚀",
    date: "2025-09-27",
    time: "11:00 - 12:00 PM",
    tag: "Meet",
    description: "Live product demo with stakeholders and investors.",
  },
]

const STORAGE_KEY = "devflow_calendar_events_v2"
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export function getStoredEvents(): CalendarEvent[] {
  if (typeof window === "undefined") return INITIAL_EVENTS
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    if (!item) return INITIAL_EVENTS
    return JSON.parse(item) as CalendarEvent[]
  } catch {
    return INITIAL_EVENTS
  }
}

export function saveStoredEvents(events: CalendarEvent[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    notify()
  } catch {
    // ignore local storage errors
  }
}

export function addCalendarEvent(event: CalendarEvent) {
  const current = getStoredEvents()
  const updated = [event, ...current]
  saveStoredEvents(updated)
}

export function removeCalendarEvent(id: string) {
  const current = getStoredEvents()
  const updated = current.filter((e) => e.id !== id)
  saveStoredEvents(updated)
}

export function resetCalendarEvents() {
  saveStoredEvents(INITIAL_EVENTS)
}

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => getStoredEvents())

  useEffect(() => {
    const handleChange = () => {
      setEvents(getStoredEvents())
    }
    listeners.add(handleChange)
    window.addEventListener("storage", handleChange)
    return () => {
      listeners.delete(handleChange)
      window.removeEventListener("storage", handleChange)
    }
  }, [])

  return {
    events,
    addEvent: addCalendarEvent,
    removeEvent: removeCalendarEvent,
    resetEvents: resetCalendarEvents,
  }
}
