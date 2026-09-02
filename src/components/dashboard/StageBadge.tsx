import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { DealStage } from "@/types"

const stageConfig: Record<DealStage, { label: string; className: string }> = {
  new: { label: "New", className: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  contacted: { label: "Contacted", className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  negotiation: { label: "Negotiation", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  stalled: { label: "Stalled", className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
  closed_won: { label: "Closed Won", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  closed_lost: { label: "Closed Lost", className: "bg-neutral-500/10 text-neutral-500 border-neutral-500/20" },
}

export function StageBadge({ stage, className }: { stage: DealStage; className?: string }) {
  const config = stageConfig[stage]
  return (
    <Badge variant="outline" className={cn("border font-medium", config.className, className)}>
      {config.label}
    </Badge>
  )
}
