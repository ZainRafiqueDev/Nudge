import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Pencil, Send, XCircle } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/dashboard/StatusBadge"
import { formatCompactCurrency } from "@/lib/format"
import { useCrmStore } from "@/store/crm"
import { dealById } from "@/data/deals"
import { contactById } from "@/data/contacts"
import type { FollowupDraft } from "@/types"

export function DraftCard({ draft }: { draft: FollowupDraft }) {
  const deal = dealById.get(draft.dealId)
  const contact = deal ? contactById.get(deal.contactId) : undefined
  const approveAndSend = useCrmStore((s) => s.approveAndSend)
  const rejectDraft = useCrmStore((s) => s.rejectDraft)
  const updateDraftBody = useCrmStore((s) => s.updateDraftBody)

  const [editing, setEditing] = useState(false)
  const [subject, setSubject] = useState(draft.subject)
  const [body, setBody] = useState(draft.body)

  if (!deal || !contact) return null

  const canAct = draft.status === "pending" || draft.status === "approved"

  function handleSave() {
    updateDraftBody(draft.id, body, subject)
    setEditing(false)
    toast.success("Draft updated")
  }

  function handleApprove() {
    approveAndSend(draft.id)
    toast.success(`Sent to ${contact?.name}`, { description: deal?.company })
  }

  function handleReject() {
    rejectDraft(draft.id)
    toast("Draft rejected", { description: "Nudge will generate a new version." })
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-tight">{deal.name}</p>
              <p className="text-xs text-muted-foreground">
                {contact.name} at {deal.company} · {formatCompactCurrency(deal.valueCents)}
              </p>
            </div>
          </div>
          <StatusBadge status={draft.status} />
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">{draft.reason}</p>
          {editing ? (
            <div className="space-y-2">
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="font-medium" />
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="text-sm" />
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="mb-2 text-sm font-medium">{draft.subject}</p>
              <p className="whitespace-pre-line text-sm text-muted-foreground">{draft.body}</p>
            </div>
          )}
        </CardContent>

        {canAct && (
          <CardFooter className="flex flex-wrap justify-end gap-2">
            {editing ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleReject}>
                  <XCircle className="size-4" />
                  Reject
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button size="sm" onClick={handleApprove}>
                  {draft.status === "approved" ? <Send className="size-4" /> : <CheckCircle2 className="size-4" />}
                  {draft.status === "approved" ? "Send now" : "Approve and send"}
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}
