import { Link } from "react-router-dom"
import { AlertTriangle, ArrowRight, Inbox, Table2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/StatCard"
import { StageBadge } from "@/components/dashboard/StageBadge"
import { DraftCard } from "@/components/dashboard/DraftCard"
import { useSessionStore } from "@/store/session"
import { repById } from "@/data/reps"
import { dealsForRep } from "@/data/deals"
import { contactById } from "@/data/contacts"
import { useCrmStore } from "@/store/crm"
import { formatCompactCurrency, daysSince } from "@/lib/format"
import { isOpenDeal, staleDeals } from "@/lib/metrics"

export function RepOverview() {
  const userId = useSessionStore((s) => s.userId)
  const rep = repById.get(userId ?? "") ?? repById.get("rep-1")!
  const allDrafts = useCrmStore((s) => s.drafts)

  const repDeals = dealsForRep(rep.id)
  const openDeals = repDeals.filter(isOpenDeal)
  const openValue = openDeals.reduce((sum, d) => sum + d.valueCents, 0)
  const stale = staleDeals(repDeals)
  const repDealIds = new Set(repDeals.map((d) => d.id))
  const myDrafts = allDrafts.filter((d) => repDealIds.has(d.dealId))
  const pending = myDrafts.filter((d) => d.status === "pending")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Good to see you, {rep.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here is where your pipeline stands today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open deals" value={String(openDeals.length)} icon={Table2} trend={formatCompactCurrency(openValue) + " open"} />
        <StatCard label="Gone quiet" value={String(stale.length)} icon={AlertTriangle} tone="warning" trend="Idle 5 or more days" />
        <StatCard label="Drafts to review" value={String(pending.length)} icon={Inbox} trend="Waiting on you" />
        <StatCard
          label="Closed this quarter"
          value={formatCompactCurrency(repDeals.filter((d) => d.stage === "closed_won").reduce((s, d) => s + d.valueCents, 0))}
          icon={TrendingUp}
          tone="success"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Deals that need a nudge</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/rep/pipeline">
                View pipeline
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {stale.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">Nothing has gone quiet. Great work.</p>}
            {stale.slice(0, 5).map((deal) => {
              const contact = contactById.get(deal.contactId)
              return (
                <Link
                  key={deal.id}
                  to={`/rep/deals/${deal.id}`}
                  className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-muted/60"
                >
                  <div>
                    <p className="text-sm font-medium">{deal.company}</p>
                    <p className="text-xs text-muted-foreground">{contact?.name} · {daysSince(deal.lastActivityAt)} days quiet</p>
                  </div>
                  <StageBadge stage={deal.stage} />
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Ready for your review</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/rep/drafts">
                View all drafts
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {pending.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No drafts waiting on you right now.</p>}
            {pending.slice(0, 5).map((draft) => {
              const deal = repDeals.find((d) => d.id === draft.dealId)
              return (
                <Link
                  key={draft.id}
                  to="/rep/drafts"
                  className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-muted/60"
                >
                  <div>
                    <p className="text-sm font-medium">{deal?.company}</p>
                    <p className="truncate text-xs text-muted-foreground">{draft.subject}</p>
                  </div>
                  <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {pending[0] && (
        <div>
          <h2 className="mb-3 text-lg font-display font-semibold">Next up</h2>
          <DraftCard draft={pending[0]} />
        </div>
      )}
    </div>
  )
}
