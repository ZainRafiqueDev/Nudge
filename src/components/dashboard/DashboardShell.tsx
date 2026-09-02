import { useState } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import { Bell, LogOut, Menu, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LogoMark } from "@/components/Logo"
import { cn } from "@/lib/utils"
import { useSessionStore } from "@/store/session"
import type { Role } from "@/types"

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

interface DashboardShellProps {
  navItems: NavItem[]
  roleLabel: string
  roleBadgeClass: string
  userName: string
  userSubtitle: string
  userAvatar: string
}

function SidebarContent({ navItems, roleLabel, roleBadgeClass, onNavigate }: {
  navItems: NavItem[]
  roleLabel: string
  roleBadgeClass: string
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <LogoMark />
        <div>
          <p className="font-display text-sm font-semibold leading-tight">Nudge</p>
          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", roleBadgeClass)}>
            {roleLabel}
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-muted"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}

export function DashboardShell({
  navItems,
  roleLabel,
  roleBadgeClass,
  userName,
  userSubtitle,
  userAvatar,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const logout = useSessionStore((s) => s.logout)
  const loginAs = useSessionStore((s) => s.loginAs)
  const navigate = useNavigate()

  function switchRole(role: Role) {
    loginAs(role)
    navigate(role === "admin" ? "/admin" : role === "rep" ? "/rep" : "/portal")
  }

  return (
    <div className="min-h-svh bg-muted/30">
      <div className="mx-auto flex min-h-svh max-w-[1600px]">
        <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
          <div className="sticky top-0 h-svh">
            <SidebarContent navItems={navItems} roleLabel={roleLabel} roleBadgeClass={roleBadgeClass} />
          </div>
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden">
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            <SidebarContent
              navItems={navItems}
              roleLabel={roleLabel}
              roleBadgeClass={roleBadgeClass}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
                <Menu className="size-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                    Preview another role
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Switch dashboard</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => switchRole("admin")}>Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("rep")}>Sales Rep</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("customer")}>Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon">
                <Bell className="size-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted">
                    <Avatar className="size-7">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline">{userName}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <p className="font-medium">{userName}</p>
                    <p className="text-xs font-normal text-muted-foreground">{userSubtitle}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate("/login") }}>
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
