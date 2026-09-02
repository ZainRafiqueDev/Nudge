import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DraftStatus } from "@/types"

const statusConfig: Record<DraftStatus, { label: string; className: string }> = {
  pending: { label: "Awaiting Review", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  approved: { label: "Approved", className: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  sent: { label: "Sent", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  auto_sent: { label: "Auto Sent", className: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" },
  rejected: { label: "Rejected", className: "bg-neutral-500/10 text-neutral-500 border-neutral-500/20" },
}

export function StatusBadge({ status, className }: { status: DraftStatus; className?: string }) {
  const config = statusConfig[status]
  return (
    <Badge variant="outline" className={cn("border font-medium", config.className, className)}>
      {config.label}
    </Badge>
  )
}
