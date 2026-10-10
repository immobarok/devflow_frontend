import { useState } from "react"
import {
  Home,
  ListTodo,
  CalendarDays,
  UsersRound,
  FileBarChart,
  Settings2,
  ChevronDown,
  FolderKanban,
  FolderClock,
  Palette,
  Plus,
  Lock,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [isProjectsOpen, setIsProjectsOpen] = useState(true)

  const menuItems = [
    { title: "Dashboard", icon: Home, badge: null },
    { title: "Task Overview", icon: ListTodo, badge: "4" },
    { title: "Calendar", icon: CalendarDays, badge: "2" },
    { title: "Team Members", icon: UsersRound, badge: null },
    { title: "Report Summary", icon: FileBarChart, badge: "5" },
    { title: "Settings", icon: Settings2, badge: null },
  ]

  return (
    <Sidebar
      className="w-64 shrink-0 h-full flex flex-col overflow-hidden border-r border-slate-200/60 dark:border-white/10 !bg-white/40 dark:!bg-[#101524]/60 backdrop-blur-xl shadow-none z-10 transition-colors duration-200"
      collapsible="none"
    >
      <SidebarHeader className="p-4 pb-2 shrink-0">
        {/* Workspace Team Switcher Card (Glassmorphic) */}
        <div className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/80 bg-white/75 dark:border-white/10 dark:bg-slate-900/70 backdrop-blur-xl p-2.5 shadow-2xs transition-all hover:bg-white/95 dark:hover:bg-slate-900/90 hover:border-white dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]">
          <div className="flex items-center gap-2.5">
            {/* Waveform Icon in Black Circle */}
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-2xs">
              <svg
                className="size-4.5 stroke-white dark:stroke-slate-950"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12h2l3-7 4 14 3-7 2 4 2-4h4" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Milesto Team
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Lock className="size-2.5" />
                Private
              </span>
            </div>
          </div>
          <ChevronDown className="size-4 text-slate-400 mr-1" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 no-scrollbar bg-transparent">
        {/* MENU GROUP */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 pb-2">
            <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add menu item" className="text-slate-400 hover:text-[#EF4671]">
              <Plus className="size-3.5" />
            </SidebarGroupAction>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => {
                const isActive = activeItem === item.title
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => setActiveItem(item.title)}
                      isActive={isActive}
                      className={`h-11 rounded-full px-4 text-sm font-semibold transition-all ${
                        isActive
                          ? "!bg-[#EF4671] !text-white shadow-md shadow-[#EF4671]/25 hover:!bg-[#E23560] hover:!text-white [&_svg]:!text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-[#fceaf0]/60 dark:hover:bg-[#EF4671]/20 hover:text-[#EF4671] dark:hover:text-[#EF4671] [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400 hover:[&_svg]:text-[#EF4671] dark:hover:[&_svg]:text-[#EF4671]"
                      }`}
                    >
                      <Icon className="size-4.5 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>

                    {item.badge && (
                      <SidebarMenuBadge
                        className={`right-3 rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors ${
                          isActive
                            ? "!text-white bg-white/25"
                            : "bg-[#fceaf0] text-[#EF4671] dark:bg-[#EF4671]/20 dark:text-[#EF4671]"
                        }`}
                      >
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* WORKSPACE GROUP */}
        <SidebarGroup className="mt-4">
          <div className="flex items-center justify-between px-2 pb-2">
            <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add workspace" className="text-slate-400 hover:text-[#EF4671]">
              <Plus className="size-3.5" />
            </SidebarGroupAction>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* Ongoing Projects */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  className="h-10 rounded-full px-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronDown
                    className={`size-3.5 text-slate-400 transition-transform ${
                      isProjectsOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  <FolderKanban className="size-4 text-slate-500 dark:text-slate-400" />
                  <span className="truncate">Ongoing Projects</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 px-2 py-0.5 text-[11px] font-bold">
                  2
                </SidebarMenuBadge>

                {isProjectsOpen && (
                  <SidebarMenuSub className="my-1 ml-6 border-l border-slate-200/80 dark:border-white/10 pl-2 space-y-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton className="h-8 rounded-full px-3 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10">
                        <span className="size-1.5 rounded-full bg-purple-400 mr-1.5" />
                        <span className="truncate">Neura Mobile Responsive</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={true}
                        className="h-8 rounded-full !bg-[#fceaf0] dark:!bg-[#EF4671]/20 px-3 text-xs font-bold !text-[#EF4671] hover:!bg-[#fbdde6] dark:hover:!bg-[#EF4671]/30"
                      >
                        <span className="size-1.5 rounded-full bg-[#EF4671] mr-1.5" />
                        <span className="truncate">DevFlow - SaaS Dashboard</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Daily Tasks */}
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 rounded-full px-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors">
                  <ChevronDown className="size-3.5 -rotate-90 text-slate-400" />
                  <FolderClock className="size-4 text-slate-500 dark:text-slate-400" />
                  <span className="truncate">Daily Tasks</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 px-2 py-0.5 text-[11px] font-bold text-[#9333ea] dark:text-purple-300">
                  6
                </SidebarMenuBadge>
              </SidebarMenuItem>

              {/* Dribbble Shots */}
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10 rounded-full px-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors">
                  <ChevronDown className="size-3.5 -rotate-90 text-slate-400" />
                  <Palette className="size-4 text-amber-500" />
                  <span className="truncate">Dribbble Shots</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 px-2 py-0.5 text-[11px] font-bold text-[#9333ea] dark:text-purple-300">
                  3
                </SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
