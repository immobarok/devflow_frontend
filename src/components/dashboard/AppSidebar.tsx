import { useState } from "react"
import { Link, useLocation } from "react-router"
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
  Check,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspaces } from "@/lib/workspaceStore"
import { CreateWorkspaceModal } from "./CreateWorkspaceModal"

export function AppSidebar() {
  const location = useLocation()
  const [isProjectsOpen, setIsProjectsOpen] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { workspaces, activeWorkspace, switchWorkspace } = useWorkspaces()

  const menuItems = [
    { title: "Dashboard", icon: Home, badge: null, path: "/dashboard" },
    { title: "Task Overview", icon: ListTodo, badge: "4", path: "/dashboard/tasks" },
    { title: "Calendar", icon: CalendarDays, badge: "2", path: "/dashboard/calendar" },
    { title: "Team Members", icon: UsersRound, badge: null, path: "/dashboard/team" },
    { title: "Report Summary", icon: FileBarChart, badge: "5", path: "/dashboard/reports" },
    { title: "Settings", icon: Settings2, badge: null, path: "/dashboard/settings" },
  ]

  return (
    <Sidebar
      className="w-64 shrink-0 h-full flex flex-col overflow-hidden border-r border-slate-200/60 dark:border-white/10 !bg-white/40 dark:!bg-[#101524]/60 backdrop-blur-xl shadow-none z-10 transition-colors duration-200"
      collapsible="none"
    >
      <SidebarHeader className="p-4 pb-2 shrink-0">
        {/* Workspace Team Switcher Card with shadcn Avatar & Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/80 bg-white/75 dark:border-white/10 dark:bg-slate-900/70 backdrop-blur-xl p-2.5 shadow-2xs transition-all hover:bg-white/95 dark:hover:bg-slate-900/90 hover:border-white dark:hover:border-white/20 hover:shadow-xs active:scale-[0.99]">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {activeWorkspace.avatar ? (
                  <Avatar className="size-9 shrink-0 ring-2 ring-white/90 dark:ring-slate-800 shadow-2xs">
                    <AvatarImage
                      src={activeWorkspace.avatar}
                      alt={activeWorkspace.name}
                    />
                    <AvatarFallback className={`${activeWorkspace.color} text-white text-xs font-semibold`}>
                      {activeWorkspace.initials}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div
                    className={`size-9 shrink-0 rounded-2xl ${activeWorkspace.color} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/90 dark:ring-slate-800 shadow-2xs`}
                  >
                    {activeWorkspace.initials}
                  </div>
                )}
                <div className="flex flex-col text-left truncate">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate">
                    {activeWorkspace.name}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-normal text-slate-400">
                    <Lock className="size-2.5" />
                    {activeWorkspace.type}
                  </span>
                </div>
              </div>
              <ChevronDown className="size-4 text-slate-400 mr-1 shrink-0" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 rounded-2xl p-1.5 border border-white/80 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl z-50">
            <DropdownMenuLabel className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
              Workspaces ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((ws) => {
              const isSelected = ws.id === activeWorkspace.id
              return (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => switchWorkspace(ws.id)}
                  className={`flex items-center gap-2.5 rounded-xl px-2 py-2 text-xs font-medium cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-slate-100/90 dark:bg-slate-800/90 font-semibold"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {ws.avatar ? (
                    <Avatar className="size-6 shrink-0">
                      <AvatarImage src={ws.avatar} alt={ws.name} />
                      <AvatarFallback className={`${ws.color} text-white text-[10px]`}>
                        {ws.initials}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className={`flex size-6 shrink-0 items-center justify-center rounded-lg ${ws.color} text-white text-[10px] font-bold`}
                    >
                      {ws.initials}
                    </div>
                  )}
                  <span className="flex-1 truncate text-slate-900 dark:text-white">
                    {ws.name}
                  </span>
                  {isSelected && (
                    <Check className="size-3.5 text-[#EF4671] shrink-0" />
                  )}
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />
            <DropdownMenuItem
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-semibold cursor-pointer text-[#EF4671] hover:bg-[#fceaf0]/50 dark:hover:bg-[#EF4671]/20"
            >
              <Plus className="size-3.5" />
              <span>Create Workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 no-scrollbar bg-transparent">
        {/* MENU GROUP */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 pb-2">
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupAction title="Add menu item" className="text-slate-400 hover:text-[#EF4671]">
              <Plus className="size-3.5" />
            </SidebarGroupAction>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`h-11 rounded-full px-4 text-sm font-medium transition-all ${
                        isActive
                          ? "!bg-[#EF4671] !text-white shadow-md shadow-[#EF4671]/25 hover:!bg-[#E23560] hover:!text-white [&_svg]:!text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-[#fceaf0]/60 dark:hover:bg-[#EF4671]/20 hover:text-[#EF4671] dark:hover:text-[#EF4671] [&_svg]:text-slate-500 dark:[&_svg]:text-slate-400 hover:[&_svg]:text-[#EF4671] dark:hover:[&_svg]:text-[#EF4671]"
                      }`}
                    >
                      <Link to={item.path} className="flex items-center gap-3 w-full">
                        <Icon className="size-4.5 shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {item.badge && (
                      <SidebarMenuBadge
                        className={`right-3 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors pointer-events-none ${
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
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Add workspace"
              onClick={() => setIsCreateModalOpen(true)}
              className="text-slate-400 hover:text-[#EF4671] cursor-pointer"
            >
              <Plus className="size-3.5" />
            </SidebarGroupAction>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* Ongoing Projects */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  className="h-10 rounded-full px-3.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors"
                >
                  <ChevronDown
                    className={`size-3.5 text-slate-400 transition-transform ${
                      isProjectsOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  <FolderKanban className="size-4 text-slate-500 dark:text-slate-400" />
                  <span className="truncate">Ongoing Projects</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 px-2 py-0.5 text-[11px] font-semibold">
                  2
                </SidebarMenuBadge>

                {isProjectsOpen && (
                  <SidebarMenuSub className="my-1 ml-6 border-l border-slate-200/80 dark:border-white/10 pl-2 space-y-1">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        className="h-8 rounded-full px-3 text-xs font-normal text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10"
                      >
                        <Link to="/dashboard/tasks" className="flex items-center w-full">
                          <span className="size-1.5 rounded-full bg-purple-400 mr-1.5" />
                          <span className="truncate">Neura Mobile Responsive</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={location.pathname === "/dashboard"}
                        className={`h-8 rounded-full px-3 text-xs font-medium transition-colors ${
                          location.pathname === "/dashboard"
                            ? "!bg-[#fceaf0] dark:!bg-[#EF4671]/20 !text-[#EF4671]"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10"
                        }`}
                      >
                        <Link to="/dashboard" className="flex items-center w-full">
                          <span className="size-1.5 rounded-full bg-[#EF4671] mr-1.5" />
                          <span className="truncate">DevFlow - SaaS Dashboard</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              {/* Daily Tasks */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-10 rounded-full px-3.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors"
                >
                  <Link to="/dashboard/tasks" className="flex items-center gap-2 w-full">
                    <ChevronDown className="size-3.5 -rotate-90 text-slate-400" />
                    <FolderClock className="size-4 text-slate-500 dark:text-slate-400" />
                    <span className="truncate">Daily Tasks</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 px-2 py-0.5 text-[11px] font-semibold text-[#9333ea] dark:text-purple-300 pointer-events-none">
                  6
                </SidebarMenuBadge>
              </SidebarMenuItem>

              {/* Dribbble Shots */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-10 rounded-full px-3.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors"
                >
                  <Link to="/dashboard/reports" className="flex items-center gap-2 w-full">
                    <ChevronDown className="size-3.5 -rotate-90 text-slate-400" />
                    <Palette className="size-4 text-amber-500" />
                    <span className="truncate">Dribbble Shots</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="right-2.5 rounded-full bg-[#f3e8ff] dark:bg-purple-950/70 px-2 py-0.5 text-[11px] font-semibold text-[#9333ea] dark:text-purple-300 pointer-events-none">
                  3
                </SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Sidebar>
  )
}
