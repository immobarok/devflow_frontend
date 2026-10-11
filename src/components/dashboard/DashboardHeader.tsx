import { useState, useRef, useEffect } from "react"
import { Link } from "react-router"
import { Search, SlidersHorizontal, Bell, Sun, Moon, X } from "lucide-react"
import { Logo } from "@/components/logo/logo"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "@/components/theme-provider"
import { useSearchFilter } from "@/lib/searchFilterStore"
import { FilterPopover } from "./FilterPopover"
import { SearchCommandPalette } from "./SearchCommandPalette"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const inputRef = useRef<HTMLInputElement>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  const {
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    clearSearchQuery,
  } = useSearchFilter()

  // Global Keyboard Shortcuts (⌘ S, ⌘ K, /, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. ⌘ S or Ctrl + S: Intercept browser save and focus search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsPaletteOpen(true)
        return
      }

      // 2. ⌘ K or Ctrl + K: Focus command search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsPaletteOpen(true)
        return
      }

      // 3. / shortcut when not in input
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault()
        inputRef.current?.focus()
        setIsPaletteOpen(true)
        return
      }

      // 4. Escape closes search and filters
      if (e.key === "Escape") {
        setIsPaletteOpen(false)
        setIsFilterOpen(false)
        inputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 w-full items-center justify-between bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 border-none shadow-none transition-colors duration-200">
      {/* Left: Logo & Mobile Trigger */}
      <div className="flex items-center gap-3 lg:gap-4">
        <SidebarTrigger className="lg:hidden text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" />
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DevFlow</span>
        </Link>
      </div>

      {/* Center: Search Bar with Shortcuts & Interactive Command Palette */}
      <div className="relative mx-4 hidden max-w-md flex-1 md:block lg:max-w-lg">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 size-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsPaletteOpen(true)
            }}
            onFocus={() => setIsPaletteOpen(true)}
            placeholder="Search tasks, meetings, members..."
            className="h-10 w-full rounded-full border border-slate-200 bg-slate-50/70 pl-10 pr-22 text-sm font-medium text-slate-900 placeholder:text-[11.5px] placeholder:font-normal placeholder:text-slate-400/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder:text-slate-500/80 transition-all focus:border-[#EF4671] focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-[#EF4671]/10"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearchQuery}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear query"
              >
                <X className="size-3.5" />
              </button>
            )}

            <kbd
              onClick={() => {
                inputRef.current?.focus()
                setIsPaletteOpen(true)
              }}
              className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-400 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400 sm:inline-block shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-white/20 select-none"
              title="Press ⌘ S or / to search"
            >
              ⌘ S
            </kbd>

            {/* Filter Toggle Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen)
                  setIsPaletteOpen(false)
                }}
                className={`relative flex size-7 items-center justify-center rounded-full transition-colors ${
                  activeFilterCount > 0 || isFilterOpen
                    ? "bg-[#EF4671] text-white shadow-xs"
                    : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                }`}
                title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount} active)` : ""}`}
              >
                <SlidersHorizontal className="size-3.5" />
                {activeFilterCount > 0 && !isFilterOpen && (
                  <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-[#EF4671] text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Filter Popover Dropdown */}
              <FilterPopover
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
        </div>

        {/* Live Search Command Palette Dropdown */}
        <SearchCommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onSelectTask={(title) => {
            setSearchQuery(title)
            setIsPaletteOpen(false)
          }}
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle Pill */}
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex h-9 items-center gap-1 rounded-full border border-slate-100 bg-slate-50 p-1 text-slate-500 dark:border-white/10 dark:bg-slate-900 transition-colors hover:border-slate-300 dark:hover:border-white/20 cursor-pointer"
          title="Toggle theme"
        >
          <div
            className={`flex size-7 items-center justify-center rounded-full transition-all ${
              !isDark
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
            }`}
          >
            <Sun className="size-3.5" />
          </div>
          <div
            className={`flex size-7 items-center justify-center rounded-full transition-all ${
              isDark
                ? "bg-white text-slate-950 shadow-xs dark:bg-white dark:text-slate-950"
                : "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
            }`}
          >
            <Moon className="size-3.5" />
          </div>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 transition-colors hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-800"
          title="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#EF4671] ring-2 ring-white dark:ring-slate-950" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
            alt="Brenda"
            className="size-9 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <span className="hidden text-sm font-normal text-slate-700 dark:text-slate-200 sm:inline-block bg-slate-50 border border-slate-100 dark:border-white/10 hover:border-slate-200  p-2 rounded-full dark:bg-slate-900 dark:text-slate-300">
            Brenda
          </span>
        </div>
      </div>
    </header>
  )
}
