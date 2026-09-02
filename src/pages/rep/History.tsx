import { useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSessionStore } from "@/store/session"
import { dealsForRep, dealById } from "@/data/deals"
import { activity } from "@/data/activity"
import { useCrmStore } from "@/store/crm"
import { formatDateTime } from "@/lib/format"

export function RepHistory() {
  const userId = useSessionStore((s) => s.userId)
  const allDrafts = useCrmStore((s) => s.drafts)
  const repDeals = useMemo(() => dealsForRep(userId ?? "rep-1"), [userId])
  const repDealIds = useMemo(() => new Set(repDeals.map((d) => d.id)), [repDeals])

  const sent = useMemo(
    () =>
      allDrafts
        .filter((d) => repDealIds.has(d.dealId) && (d.status === "sent" || d.status === "auto_sent"))
        .sort((a, b) => new Date(b.sentAt ?? 0).getTime() - new Date(a.sentAt ?? 0).getTime()),
    [allDrafts, repDealIds],
  )

  function outcomeFor(dealId: string) {
    const dealEvents = activity.filter((e) => e.dealId === dealId)
    if (dealEvents.some((e) => e.type === "email_replied")) return { label: "Replied", tone: "success" as const }
    if (dealEvents.some((e) => e.type === "email_opened")) return { label: "Opened", tone: "warning" as const }
    return { label: "No response yet", tone: "muted" as const }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">History</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every follow up sent on your deals and how the contact responded.</p>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>How it was sent</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Nothing sent yet.
                  </TableCell>
                </TableRow>
              )}
              {sent.map((draft) => {
                const deal = dealById.get(draft.dealId)
                const outcome = outcomeFor(draft.dealId)
                return (
                  <TableRow key={draft.id}>
                    <TableCell>
                      <Link to={`/rep/deals/${draft.dealId}`} className="font-medium hover:underline">
                        {deal?.company}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-56 truncate text-sm text-muted-foreground">{draft.subject}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {draft.sentAt ? formatDateTime(draft.sentAt) : "Not sent"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {draft.status === "auto_sent" ? "Auto sent" : "Approved by you"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          outcome.tone === "success"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : outcome.tone === "warning"
                              ? "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "text-muted-foreground"
                        }
                      >
                        {outcome.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
