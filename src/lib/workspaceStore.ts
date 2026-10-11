import { useState, useEffect } from "react"

export interface Workspace {
  id: string
  name: string
  type: "Private" | "Team" | "Public"
  avatar?: string
  initials: string
  color: string // Tailwind bg class for initials avatar, e.g. "bg-[#EF4671]"
  description?: string
  projectsCount: number
  membersCount: number
  role: "Owner" | "Admin" | "Member"
}

export interface CreateWorkspacePayload {
  name: string
  type: "Private" | "Team" | "Public"
  color: string
  description?: string
  avatar?: string
}

export const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: "ws-milesto",
    name: "Milesto Team",
    type: "Private",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    initials: "MT",
    color: "bg-[#EF4671]",
    description: "Core product development & UX research team.",
    projectsCount: 3,
    membersCount: 8,
    role: "Owner",
  },
  {
    id: "ws-acme",
    name: "Acme Studio",
    type: "Team",
    initials: "AC",
    color: "bg-purple-600",
    description: "Brand identity, 3D animations, and marketing site.",
    projectsCount: 5,
    membersCount: 14,
    role: "Admin",
  },
  {
    id: "ws-nebula",
    name: "Nebula Labs",
    type: "Public",
    initials: "NL",
    color: "bg-blue-600",
    description: "Open source microservices and AI agent plugins.",
    projectsCount: 2,
    membersCount: 6,
    role: "Member",
  },
]

const STORAGE_WORKSPACES_KEY = "devflow_workspaces_v1"
const STORAGE_ACTIVE_WS_KEY = "devflow_active_workspace_id_v1"

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((fn) => fn())
}

export function getStoredWorkspaces(): Workspace[] {
  if (typeof window === "undefined") return INITIAL_WORKSPACES
  try {
    const raw = localStorage.getItem(STORAGE_WORKSPACES_KEY)
    if (!raw) return INITIAL_WORKSPACES
    return JSON.parse(raw) as Workspace[]
  } catch {
    return INITIAL_WORKSPACES
  }
}

export function getStoredActiveWorkspaceId(): string {
  if (typeof window === "undefined") return "ws-milesto"
  try {
    return localStorage.getItem(STORAGE_ACTIVE_WS_KEY) || "ws-milesto"
  } catch {
    return "ws-milesto"
  }
}

export function saveWorkspaces(workspaces: Workspace[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_WORKSPACES_KEY, JSON.stringify(workspaces))
    notify()
  } catch {
    // fallback
  }
}

export function setActiveWorkspaceId(id: string) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_ACTIVE_WS_KEY, id)
    notify()
  } catch {
    // fallback
  }
}

export function createWorkspace(payload: CreateWorkspacePayload): Workspace {
  const words = payload.name.trim().split(/\s+/)
  const initials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : payload.name.slice(0, 2).toUpperCase()

  const newWorkspace: Workspace = {
    id: `ws-${Date.now()}`,
    name: payload.name.trim(),
    type: payload.type,
    color: payload.color || "bg-[#EF4671]",
    initials: initials || "WS",
    avatar: payload.avatar,
    description: payload.description?.trim(),
    projectsCount: 1,
    membersCount: 1,
    role: "Owner",
  }

  const current = getStoredWorkspaces()
  const updated = [...current, newWorkspace]
  saveWorkspaces(updated)
  setActiveWorkspaceId(newWorkspace.id)
  return newWorkspace
}

export function removeWorkspace(id: string) {
  const current = getStoredWorkspaces()
  if (current.length <= 1) return // keep at least 1 workspace
  const updated = current.filter((w) => w.id !== id)
  saveWorkspaces(updated)
  if (getStoredActiveWorkspaceId() === id) {
    setActiveWorkspaceId(updated[0].id)
  }
}

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() =>
    getStoredWorkspaces()
  )
  const [activeWorkspaceId, setActiveId] = useState<string>(() =>
    getStoredActiveWorkspaceId()
  )

  useEffect(() => {
    const handleChange = () => {
      setWorkspaces(getStoredWorkspaces())
      setActiveId(getStoredActiveWorkspaceId())
    }
    listeners.add(handleChange)
    window.addEventListener("storage", handleChange)
    return () => {
      listeners.delete(handleChange)
      window.removeEventListener("storage", handleChange)
    }
  }, [])

  const activeWorkspace =
    workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0]

  return {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    switchWorkspace: setActiveWorkspaceId,
    createWorkspace,
    removeWorkspace,
  }
}
