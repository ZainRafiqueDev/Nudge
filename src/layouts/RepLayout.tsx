import { Columns3, History, LayoutDashboard, Mail, Settings } from "lucide-react"
import { DashboardShell, type NavItem } from "@/components/dashboard/DashboardShell"
import { useSessionStore } from "@/store/session"
import { repById } from "@/data/reps"

const navItems: NavItem[] = [
  { to: "/rep", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/rep/pipeline", label: "My Pipeline", icon: Columns3 },
  { to: "/rep/drafts", label: "Drafts", icon: Mail },
  { to: "/rep/history", label: "History", icon: History },
  { to: "/rep/settings", label: "Settings", icon: Settings },
]

export function RepLayout() {
  const userId = useSessionStore((s) => s.userId)
  const rep = repById.get(userId ?? "") ?? repById.get("rep-1")!

  return (
    <DashboardShell
      navItems={navItems}
      roleLabel="Sales Rep"
      roleBadgeClass="bg-sky-500/15 text-sky-600 dark:text-sky-400"
      userName={rep.name}
      userSubtitle={rep.title}
      userAvatar={rep.avatar}
    />
  )
}
