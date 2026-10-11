import { useState, useEffect } from "react"

export interface FilterCriteria {
  priority: string // "All" | "Urgent" | "High" | "Medium" | "Low Priority"
  assignee: string // "All" | "Brenda" | "Michie" | "Alex" | "Sarah"
  status: string // "All" | "To Do" | "In Progress" | "Under Review" | "Completed"
}

export interface SearchFilterState {
  searchQuery: string
  filters: FilterCriteria
}

const DEFAULT_FILTERS: FilterCriteria = {
  priority: "All",
  assignee: "All",
  status: "All",
}

let currentState: SearchFilterState = {
  searchQuery: "",
  filters: { ...DEFAULT_FILTERS },
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((fn) => fn())
}

export function setSearchQuery(query: string) {
  currentState = { ...currentState, searchQuery: query }
  notify()
}

export function setFilterCriteria<K extends keyof FilterCriteria>(
  key: K,
  value: FilterCriteria[K]
) {
  currentState = {
    ...currentState,
    filters: { ...currentState.filters, [key]: value },
  }
  notify()
}

export function resetAllFilters() {
  currentState = {
    searchQuery: "",
    filters: { ...DEFAULT_FILTERS },
  }
  notify()
}

export function clearSearchQuery() {
  currentState = { ...currentState, searchQuery: "" }
  notify()
}

export function useSearchFilter() {
  const [state, setState] = useState<SearchFilterState>(() => currentState)

  useEffect(() => {
    const handleChange = () => {
      setState(currentState)
    }
    listeners.add(handleChange)
    return () => {
      listeners.delete(handleChange)
    }
  }, [])

  const activeFilterCount =
    (state.filters.priority !== "All" ? 1 : 0) +
    (state.filters.assignee !== "All" ? 1 : 0) +
    (state.filters.status !== "All" ? 1 : 0)

  const hasActiveFiltersOrSearch =
    state.searchQuery.trim().length > 0 || activeFilterCount > 0

  return {
    searchQuery: state.searchQuery,
    filters: state.filters,
    setSearchQuery,
    setFilterCriteria,
    resetAllFilters,
    clearSearchQuery,
    activeFilterCount,
    hasActiveFiltersOrSearch,
  }
}
