import type { DraftStatus, FollowupDraft } from "@/types"
import { deals } from "@/data/deals"
import { contactById } from "@/data/contacts"
import { repById } from "@/data/reps"
import { daysSince } from "@/lib/format"
import { mulberry32, pick, intBetween, daysAgo } from "@/lib/random"

const rng = mulberry32(74)

const subjectTemplates = [
  (company: string) => `Checking in on ${company}`,
  () => "Quick follow up from our last conversation",
  (company: string) => `Still the right time for ${company}?`,
  () => "A short update before we lose momentum",
]

function bodyForTone(
  tone: "friendly" | "formal" | "direct",
  contactFirstName: string,
  company: string,
  nextStep: string,
  repName: string,
) {
  if (tone === "friendly") {
    return `Hi ${contactFirstName},

Hope things have been good on your end. I wanted to check back in since we last spoke about how ${company} could put this to use. I know priorities shift fast, so no worries if this slipped down the list.

The natural next step on our side is to ${nextStep.toLowerCase()}. Happy to hop on a quick call this week if that is useful, or I can just send over the details here.

Let me know what works best for you.

Best,
${repName}`
  }
  if (tone === "formal") {
    return `Dear ${contactFirstName},

I am writing to follow up regarding our recent discussion with ${company}. We have not connected since our last exchange, and I wanted to confirm whether this remains a priority on your end.

The recommended next step is to ${nextStep.toLowerCase()}. Please let me know a convenient time to reconnect so we can move this forward together.

Kind regards,
${repName}`
  }
  return `${contactFirstName},

Following up on ${company}. Last touch point was a little while back, and I want to make sure this has not lost priority.

Suggested next step: ${nextStep.toLowerCase()}. Let me know if you want to proceed or if timing has changed on your end.

${repName}`
}

const reasonTemplates = [
  (days: number) => `No activity logged for ${days} days`,
  (days: number) => `Deal has been idle ${days} days past the follow up threshold`,
  (days: number) => `Automation rule triggered after ${days} days of silence`,
]

const statusPool: DraftStatus[] = [
  "pending", "pending", "pending", "pending",
  "approved", "approved",
  "sent", "sent", "sent",
  "rejected",
  "auto_sent", "auto_sent",
]

const staleDeals = deals.filter(
  (d) => d.stage !== "closed_won" && d.stage !== "closed_lost" && daysSince(d.lastActivityAt) >= 3,
)

export const followupDrafts: FollowupDraft[] = staleDeals.map((deal, index) => {
  const contact = contactById.get(deal.contactId)!
  const rep = repById.get(deal.ownerId)!
  const days = daysSince(deal.lastActivityAt)
  const status = pick(rng, statusPool)
  const createdAt = daysAgo(intBetween(rng, 0, Math.min(days, 3)))

  return {
    id: `draft-${index + 1}`,
    dealId: deal.id,
    channel: "email",
    subject: pick(rng, subjectTemplates)(deal.company),
    body: bodyForTone(rep.tone, contact.name.split(" ")[0], deal.company, deal.nextStep, rep.name),
    status,
    reason: pick(rng, reasonTemplates)(days),
    createdAt,
    sentAt: status === "sent" || status === "auto_sent" ? daysAgo(intBetween(rng, 0, 2)) : undefined,
  }
})

export const draftById = new Map(followupDrafts.map((d) => [d.id, d]))

export function draftsForDeal(dealId: string) {
  return followupDrafts.filter((d) => d.dealId === dealId)
}

export function draftsForRep(repId: string) {
  const repDealIds = new Set(deals.filter((d) => d.ownerId === repId).map((d) => d.id))
  return followupDrafts.filter((d) => repDealIds.has(d.dealId))
}
