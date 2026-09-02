export interface PricingPlan {
  id: string
  name: string
  price: string
  cadence: string
  description: string
  highlighted?: boolean
  features: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$39",
    cadence: "per rep, per month",
    description: "For small teams that want stale deals caught automatically without a lot of setup.",
    features: [
      "Up to 5 reps",
      "One CRM connection",
      "Approval queue for every draft",
      "Email follow ups",
      "Standard reporting",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$79",
    cadence: "per rep, per month",
    description: "For revenue teams ready to automate routine follow ups and keep reps focused on selling.",
    highlighted: true,
    features: [
      "Unlimited reps",
      "Up to three CRM connections",
      "Custom automation rules",
      "Email and text message channels",
      "Auto send with full audit history",
      "Team and rule level analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "annual agreement",
    description: "For larger organizations with advanced approval workflows and dedicated support.",
    features: [
      "Everything in Growth",
      "Role based approval chains",
      "Single sign on and audit exports",
      "Dedicated onboarding specialist",
      "Custom tone and brand guidelines",
    ],
  },
]

export const pricingFaqs = [
  {
    question: "Does Nudge replace our CRM?",
    answer:
      "No. Nudge connects to the CRM you already use and reads deal activity from it. It never becomes the system of record, it just watches it and helps close the follow up gap.",
  },
  {
    question: "Can a rep stop an automatic send?",
    answer:
      "Yes. Any rule can be switched from automatic sending to requiring approval at any time, and individual reps can pause automation on a specific deal from the deal view.",
  },
  {
    question: "What happens if a draft sounds wrong?",
    answer:
      "Every draft can be edited in place before it goes out, or rejected so a new version gets generated. Nothing sends without either a rule or a person signing off on it.",
  },
  {
    question: "How is a reply detected?",
    answer:
      "Once a message sends, opens and replies are tracked and logged directly on the deal timeline, so the full conversation history stays in one place for the rep and their manager.",
  },
]
