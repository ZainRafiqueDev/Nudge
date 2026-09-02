import type { ActivityEvent } from "@/types"
import { deals } from "@/data/deals"
import { followupDrafts } from "@/data/followupDrafts"
import { repById } from "@/data/reps"
import { mulberry32, intBetween, daysAgo } from "@/lib/random"

const rng = mulberry32(133)

let counter = 0
function nextId() {
  counter += 1
  return `activity-${counter}`
}

const events: ActivityEvent[] = []

for (const draft of followupDrafts) {
  const deal = deals.find((d) => d.id === draft.dealId)!
  const rep = repById.get(deal.ownerId)!

  events.push({
    id: nextId(),
    dealId: deal.id,
    type: "draft_generated",
    message: `Nudge drafted a ${draft.channel} message for ${deal.company}`,
    timestamp: draft.createdAt,
    actor: "Nudge",
  })

  if (draft.status === "approved" || draft.status === "sent") {
    events.push({
      id: nextId(),
      dealId: deal.id,
      type: "draft_approved",
      message: `${rep.name} approved the drafted message`,
      timestamp: draft.createdAt,
      actor: rep.name,
    })
  }

  if (draft.status === "rejected") {
    events.push({
      id: nextId(),
      dealId: deal.id,
      type: "draft_rejected",
      message: `${rep.name} rejected the drafted message and asked for a rewrite`,
      timestamp: draft.createdAt,
      actor: rep.name,
    })
  }

  if ((draft.status === "sent" || draft.status === "auto_sent") && draft.sentAt) {
    events.push({
      id: nextId(),
      dealId: deal.id,
      type: "email_sent",
      message:
        draft.status === "auto_sent"
          ? `Nudge auto sent the message to ${deal.company}`
          : `${rep.name} sent the message to ${deal.company}`,
      timestamp: draft.sentAt,
      actor: draft.status === "auto_sent" ? "Nudge" : rep.name,
    })

    if (rng() < 0.55) {
      events.push({
        id: nextId(),
        dealId: deal.id,
        type: "email_opened",
        message: `${deal.company} opened the email`,
        timestamp: daysAgo(Math.max(0, intBetween(rng, 0, 1))),
        actor: deal.company,
      })
    }
    if (rng() < 0.45) {
      const sentTime = new Date(draft.sentAt).getTime()
      const elapsedHours = Math.max(1, Math.floor((Date.now() - sentTime) / (1000 * 60 * 60)))
      const replyOffsetHours = intBetween(rng, 1, elapsedHours)
      events.push({
        id: nextId(),
        dealId: deal.id,
        type: "email_replied",
        message: `${deal.company} replied to the email`,
        timestamp: new Date(sentTime + replyOffsetHours * 60 * 60 * 1000).toISOString(),
        actor: deal.company,
      })
    }
  }
}

for (let i = 0; i < deals.length; i += 3) {
  const deal = deals[i]
  const rep = repById.get(deal.ownerId)!
  events.push({
    id: nextId(),
    dealId: deal.id,
    type: "stage_changed",
    message: `${rep.name} moved ${deal.company} to ${deal.stage.replace("_", " ")}`,
    timestamp: daysAgo(intBetween(rng, 1, 20)),
    actor: rep.name,
  })
}

export const activity: ActivityEvent[] = events.sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
)

export function activityForDeal(dealId: string) {
  return activity.filter((e) => e.dealId === dealId)
}

export function activityForRep(repId: string) {
  const repDealIds = new Set(deals.filter((d) => d.ownerId === repId).map((d) => d.id))
  return activity.filter((e) => repDealIds.has(e.dealId))
}
