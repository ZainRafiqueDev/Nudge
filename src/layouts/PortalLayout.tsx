import { FileText, LayoutDashboard, MessageSquare, UserCircle } from "lucide-react"
import { DashboardShell, type NavItem } from "@/components/dashboard/DashboardShell"
import { useSessionStore } from "@/store/session"
import { customerById, demoCustomerId } from "@/data/customers"

const navItems: NavItem[] = [
  { to: "/portal", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/portal/deals", label: "My Deals", icon: FileText },
  { to: "/portal/messages", label: "Messages", icon: MessageSquare },
  { to: "/portal/profile", label: "Profile", icon: UserCircle },
]

export function PortalLayout() {
  const userId = useSessionStore((s) => s.userId)
  const customer = customerById.get(userId ?? "") ?? customerById.get(demoCustomerId)!

  return (
    <DashboardShell
      navItems={navItems}
      roleLabel="Customer"
      roleBadgeClass="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
      userName={customer.name}
      userSubtitle={customer.company}
      userAvatar={customer.avatar}
    />
  )
}
