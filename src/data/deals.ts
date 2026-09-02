import type { Deal, DealStage, CrmSource } from "@/types"
import { companySeeds, contacts } from "@/data/contacts"
import { reps } from "@/data/reps"
import { mulberry32, pick, intBetween, daysAgo } from "@/lib/random"

const rng = mulberry32(20260819)

const stagePool: DealStage[] = [
  "new", "new", "new",
  "contacted", "contacted", "contacted", "contacted",
  "negotiation", "negotiation", "negotiation", "negotiation",
  "stalled", "stalled", "stalled", "stalled",
  "closed_won", "closed_won", "closed_won",
  "closed_lost", "closed_lost",
]

const sources: CrmSource[] = ["Salesforce", "HubSpot", "Pipedrive"]

const nextStepByStage: Record<DealStage, string[]> = {
  new: ["Send an intro proposal", "Schedule a discovery call", "Share a relevant case study"],
  contacted: ["Follow up on the proposal", "Confirm pricing questions", "Schedule a live demo"],
  negotiation: ["Finalize contract terms", "Get legal sign off", "Confirm budget approval"],
  stalled: ["Re engage after a quiet stretch", "Check in on the decision timeline", "Offer an updated proposal"],
  closed_won: ["Kick off onboarding", "Introduce the customer success team"],
  closed_lost: ["Log the loss reason", "Add to the long term nurture sequence"],
}

function lastActivityForStage(stage: DealStage): string {
  switch (stage) {
    case "new":
      return daysAgo(intBetween(rng, 0, 3))
    case "contacted":
      return daysAgo(intBetween(rng, 1, 6))
    case "negotiation":
      return rng() < 0.35 ? daysAgo(intBetween(rng, 7, 16)) : daysAgo(intBetween(rng, 1, 4))
    case "stalled":
      return daysAgo(intBetween(rng, 9, 32))
    case "closed_won":
    case "closed_lost":
      return daysAgo(intBetween(rng, 20, 95))
  }
}

interface DealSeed {
  companyIndex: number
  label: string
}

const dealSeeds: DealSeed[] = companySeeds.map((_, i) => ({ companyIndex: i, label: "Platform License" }))
const secondDealCompanies = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 23]
for (const idx of secondDealCompanies) {
  dealSeeds.push({ companyIndex: idx, label: rng() < 0.5 ? "Expansion Package" : "Renewal" })
}

export const deals: Deal[] = dealSeeds.map((seed, index) => {
  const company = companySeeds[seed.companyIndex]
  const contact = contacts[seed.companyIndex]
  const owner = reps[index % reps.length]
  const stage = pick(rng, stagePool)
  const lastActivityAt = lastActivityForStage(stage)
  const ageDays = intBetween(rng, 25, 160)
  const createdAt = daysAgo(ageDays)
  const valueCents = intBetween(rng, 9_000, 210_000) * 100

  return {
    id: `deal-${index + 1}`,
    name: `${company.company} ${seed.label}`,
    company: company.company,
    contactId: contact.id,
    ownerId: owner.id,
    stage,
    valueCents,
    source: pick(rng, sources),
    createdAt,
    lastActivityAt,
    nextStep: pick(rng, nextStepByStage[stage]),
    industry: company.industry,
  }
})

export const dealById = new Map(deals.map((d) => [d.id, d]))

export function dealsForRep(repId: string) {
  return deals.filter((d) => d.ownerId === repId)
}
