import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSessionStore } from "@/store/session"
import { customerById, demoCustomerId, dealsForCustomer } from "@/data/customers"
import { repById } from "@/data/reps"
import { useCrmStore } from "@/store/crm"
import { activity } from "@/data/activity"
import { formatDateTime } from "@/lib/format"
import { cn } from "@/lib/utils"

const genericReplies = [
  "Thanks for checking in. Let me review this with my team and get back to you shortly.",
  "Appreciate the update. This is still very much on our radar, just been a busy stretch on our end.",
  "Good timing, actually. Can we set up a short call this week to go over the details?",
]

interface Message {
  id: string
  direction: "outgoing" | "incoming"
  body: string
  timestamp: string
}

export function PortalMessages() {
  const userId = useSessionStore((s) => s.userId)
  const customer = customerById.get(userId ?? "") ?? customerById.get(demoCustomerId)!
  const deals = dealsForCustomer(customer.id)
  const drafts = useCrmStore((s) => s.drafts)
  const rep = deals[0] ? repById.get(deals[0].ownerId) : undefined

  const messages = useMemo<Message[]>(() => {
    const dealIds = new Set(deals.map((d) => d.id))
    const list: Message[] = []

    for (const draft of drafts) {
      if (!dealIds.has(draft.dealId)) continue
      if (draft.status !== "sent" && draft.status !== "auto_sent") continue
      list.push({
        id: `out-${draft.id}`,
        direction: "outgoing",
        body: `${draft.subject}\n\n${draft.body}`,
        timestamp: draft.sentAt ?? draft.createdAt,
      })
    }

    let replyIndex = 0
    for (const event of activity) {
      if (!dealIds.has(event.dealId) || event.type !== "email_replied") continue
      list.push({
        id: `in-${event.id}`,
        direction: "incoming",
        body: genericReplies[replyIndex % genericReplies.length],
        timestamp: event.timestamp,
      })
      replyIndex += 1
    }

    return list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }, [deals, drafts])

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your conversation history with your account manager.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          {rep && (
            <>
              <Avatar>
                <AvatarImage src={rep.avatar} alt={rep.name} />
                <AvatarFallback>{rep.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{rep.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{rep.title}</p>
              </div>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No messages yet.</p>
          )}
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.direction === "outgoing" ? "justify-start" : "justify-end")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line",
                  message.direction === "outgoing" ? "rounded-tl-sm bg-muted" : "rounded-tr-sm bg-primary text-primary-foreground",
                )}
              >
                <p>{message.body}</p>
                <p
                  className={cn(
                    "mt-2 text-[11px]",
                    message.direction === "outgoing" ? "text-muted-foreground" : "text-primary-foreground/70",
                  )}
                >
                  {formatDateTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
