import type { ActivityEvent, Deal, FollowupDraft } from "@/types"
import { daysSince } from "@/lib/format"

const OPEN_STAGES = new Set(["new", "contacted", "negotiation", "stalled"])

export function isOpenDeal(deal: Deal) {
  return OPEN_STAGES.has(deal.stage)
}

export function staleDeals(deals: Deal[], threshold = 5) {
  return deals.filter((d) => isOpenDeal(d) && daysSince(d.lastActivityAt) >= threshold)
}

export function pendingDrafts(drafts: FollowupDraft[]) {
  return drafts.filter((d) => d.status === "pending")
}

export function sentThisWeek(drafts: FollowupDraft[]) {
  return drafts.filter((d) => {
    if (d.status !== "sent" && d.status !== "auto_sent") return false
    if (!d.sentAt) return false
    return daysSince(d.sentAt) <= 7
  })
}

export function avgReplyHours(activity: ActivityEvent[]): number | null {
  const byDeal = new Map<string, ActivityEvent[]>()
  for (const event of activity) {
    if (event.type !== "email_sent" && event.type !== "email_replied") continue
    const list = byDeal.get(event.dealId) ?? []
    list.push(event)
    byDeal.set(event.dealId, list)
  }

  const diffsHours: number[] = []
  for (const events of byDeal.values()) {
    const sent = events.find((e) => e.type === "email_sent")
    const replied = events.find((e) => e.type === "email_replied")
    if (!sent || !replied) continue
    const diff = new Date(replied.timestamp).getTime() - new Date(sent.timestamp).getTime()
    if (diff > 0) diffsHours.push(diff / (1000 * 60 * 60))
  }

  if (diffsHours.length === 0) return null
  return diffsHours.reduce((sum, v) => sum + v, 0) / diffsHours.length
}

export function dealsByStage(deals: Deal[]) {
  const counts: Record<string, number> = {}
  for (const deal of deals) {
    counts[deal.stage] = (counts[deal.stage] ?? 0) + 1
  }
  return counts
}

export function responseOutcomes(drafts: FollowupDraft[], activity: ActivityEvent[]) {
  const sentDealIds = new Set(
    drafts.filter((d) => d.status === "sent" || d.status === "auto_sent").map((d) => d.dealId),
  )
  const repliedDealIds = new Set(
    activity.filter((e) => e.type === "email_replied" && sentDealIds.has(e.dealId)).map((e) => e.dealId),
  )
  const openedDealIds = new Set(
    activity
      .filter((e) => e.type === "email_opened" && sentDealIds.has(e.dealId) && !repliedDealIds.has(e.dealId))
      .map((e) => e.dealId),
  )
  const replied = repliedDealIds.size
  const opened = openedDealIds.size
  const noResponse = Math.max(0, sentDealIds.size - replied - opened)
  return [
    { name: "Replied", value: replied },
    { name: "Opened", value: opened },
    { name: "No response yet", value: noResponse },
  ]
}

/** Buckets draft creation into the last N days for a simple activity chart. */
export function draftsPerDay(drafts: FollowupDraft[], days = 14) {
  const buckets = new Map<string, number>()
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    buckets.set(key, 0)
  }
  for (const draft of drafts) {
    const created = new Date(draft.createdAt)
    const diffDays = Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 0 || diffDays >= days) continue
    const key = created.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1)
  }
  return Array.from(buckets.entries()).map(([date, count]) => ({ date, drafts: count }))
}
