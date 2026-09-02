import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { contactById } from "@/data/contacts"
import { formatCompactCurrency, daysSince } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Deal, DealStage } from "@/types"

const columns: { stage: DealStage; label: string }[] = [
  { stage: "new", label: "New" },
  { stage: "contacted", label: "Contacted" },
  { stage: "negotiation", label: "Negotiation" },
  { stage: "stalled", label: "Stalled" },
  { stage: "closed_won", label: "Closed Won" },
]

export function PipelineBoard({ deals }: { deals: Deal[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 sm:grid-cols-2 lg:grid-cols-5">
      {columns.map((column) => {
        const columnDeals = deals.filter((d) => d.stage === column.stage)
        const total = columnDeals.reduce((sum, d) => sum + d.valueCents, 0)
        return (
          <div key={column.stage} className="min-w-0">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold">{column.label}</p>
              <span className="text-xs text-muted-foreground">{formatCompactCurrency(total)}</span>
            </div>
            <div className="space-y-3">
              {columnDeals.length === 0 && (
                <p className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                  Nothing here right now
                </p>
              )}
              {columnDeals.map((deal) => {
                const contact = contactById.get(deal.contactId)
                const stale = column.stage !== "closed_won" && daysSince(deal.lastActivityAt) >= 5
                return (
                  <Link key={deal.id} to={`/rep/deals/${deal.id}`}>
                    <Card
                      className={cn(
                        "gap-2 p-4 transition-shadow hover:shadow-md",
                        stale && "border-rose-300/60 dark:border-rose-800/60",
                      )}
                    >
                      <p className="text-sm font-medium leading-tight">{deal.company}</p>
                      <p className="text-xs text-muted-foreground">{contact?.name}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-semibold">{formatCompactCurrency(deal.valueCents)}</span>
                        {stale && (
                          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
                            {daysSince(deal.lastActivityAt)}d quiet
                          </span>
                        )}
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
