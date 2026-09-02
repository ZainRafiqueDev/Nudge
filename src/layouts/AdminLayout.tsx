import { BarChart3, Inbox, LayoutDashboard, Settings, Table2, Users, Zap } from "lucide-react"
import { DashboardShell, type NavItem } from "@/components/dashboard/DashboardShell"
import { portrait } from "@/lib/images"

const navItems: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/deals", label: "Deal Monitor", icon: Table2 },
  { to: "/admin/rules", label: "Automation Rules", icon: Zap },
  { to: "/admin/approvals", label: "Approval Queue", icon: Inbox },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminLayout() {
  return (
    <DashboardShell
      navItems={navItems}
      roleLabel="Admin"
      roleBadgeClass="bg-violet-500/15 text-violet-600 dark:text-violet-400"
      userName="Jordan Ashby"
      userSubtitle="Revenue Operations Admin"
      userAvatar={portrait("hannah")}
    />
  )
}
