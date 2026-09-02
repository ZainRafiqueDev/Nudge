import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DraftCard } from "@/components/dashboard/DraftCard"
import { useSessionStore } from "@/store/session"
import { dealsForRep } from "@/data/deals"
import { useCrmStore } from "@/store/crm"

export function RepDrafts() {
  const userId = useSessionStore((s) => s.userId)
  const allDrafts = useCrmStore((s) => s.drafts)
  const repDealIds = useMemo(() => new Set(dealsForRep(userId ?? "rep-1").map((d) => d.id)), [userId])
  const myDrafts = useMemo(() => allDrafts.filter((d) => repDealIds.has(d.dealId)), [allDrafts, repDealIds])

  const grouped = {
    pending: myDrafts.filter((d) => d.status === "pending"),
    approved: myDrafts.filter((d) => d.status === "approved"),
    sent: myDrafts.filter((d) => d.status === "sent" || d.status === "auto_sent"),
    rejected: myDrafts.filter((d) => d.status === "rejected"),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Drafts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Messages Nudge has written for your deals. Approve, edit, or reject each one.
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Awaiting review ({grouped.pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({grouped.approved.length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({grouped.sent.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({grouped.rejected.length})</TabsTrigger>
        </TabsList>

        {(["pending", "approved", "sent", "rejected"] as const).map((key) => (
          <TabsContent key={key} value={key} className="mt-6 space-y-4">
            {grouped[key].length === 0 ? (
              <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                Nothing in this list right now.
              </p>
            ) : (
              grouped[key].map((draft) => <DraftCard key={draft.id} draft={draft} />)
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
