import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DraftCard } from "@/components/dashboard/DraftCard"
import { useCrmStore } from "@/store/crm"

export function AdminApprovalQueue() {
  const drafts = useCrmStore((s) => s.drafts)

  const grouped = useMemo(
    () => ({
      pending: drafts.filter((d) => d.status === "pending"),
      approved: drafts.filter((d) => d.status === "approved"),
      sent: drafts.filter((d) => d.status === "sent" || d.status === "auto_sent"),
      rejected: drafts.filter((d) => d.status === "rejected"),
    }),
    [drafts],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Approval Queue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every drafted follow up across the team, in one place, regardless of which rep owns the deal.
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
