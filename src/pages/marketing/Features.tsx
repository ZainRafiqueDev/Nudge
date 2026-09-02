import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { CtaSection } from "@/components/marketing/CtaSection"
import { cn } from "@/lib/utils"
import { scene } from "@/lib/images"

const deepDives = [
  {
    eyebrow: "Detection",
    title: "Know a deal has gone quiet before your pipeline review does",
    description:
      "Nudge checks every open deal against the activity your CRM already logs, comparing idle time to the thresholds you set per stage. A negotiation gone quiet for five days is treated very differently than a brand new lead, and every check happens continuously in the background.",
    points: [
      "Idle time thresholds configurable by deal stage",
      "Reads activity straight from your connected CRM",
      "Flags surface in the deal monitor the moment they trigger",
    ],
    image: scene("deskAnalytics", 900, 700),
    alt: "Dashboard showing pipeline analytics on a desk monitor",
  },
  {
    eyebrow: "Drafting",
    title: "A follow up that actually sounds like the person sending it",
    description:
      "Every draft pulls from the real deal history, the contact's name and role, and the tone a rep has set for themselves. The result reads like something a busy, thoughtful rep would write, not a mail merge with a first name dropped in.",
    points: [
      "Tone options per rep, from friendly to formal to direct",
      "References the actual next step on the deal",
      "Ready for review in seconds, not sitting in a queue",
    ],
    image: scene("workspaceLaptop", 900, 700),
    alt: "Person writing an email on a laptop at a bright workspace",
  },
  {
    eyebrow: "Approval",
    title: "Nothing sends without the right person signing off",
    description:
      "Drafts land in a review queue where a rep or manager can approve and send, edit the message in place, or reject it so a new version gets generated. Every action is timestamped, so there is a full record of who approved what and when.",
    points: [
      "Inline editing before a message goes out",
      "Reject and regenerate for a fresh version",
      "A complete audit trail tied to every deal",
    ],
    image: scene("salesCall", 900, 700),
    alt: "Sales professional on a call reviewing notes",
  },
  {
    eyebrow: "Automation",
    title: "Let routine follow ups run themselves",
    description:
      "Automation rules combine a deal stage, an idle day threshold, and an action, either holding for approval or sending automatically. Reps stay focused on deals that need judgment, while the predictable ones take care of themselves.",
    points: [
      "Unlimited rules across stages and channels",
      "Toggle any rule between automatic and approval required",
      "See exactly how many times each rule has fired",
    ],
    image: scene("graphAnalytics", 900, 700),
    alt: "Analytics graphs shown on a laptop screen",
  },
]

export function Features() {
  return (
    <div className="pb-24">
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-8 text-center sm:px-6 sm:pt-28">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          Product tour
        </span>
        <h1 className="mt-6 text-4xl font-display font-semibold tracking-tight sm:text-5xl">
          Every part of the follow up loop, handled in one place
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          From noticing a quiet deal to sending a message a person actually wants to reply to, here is what happens
          at each stage of the workflow.
        </p>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6">
        {deepDives.map((section, index) => (
          <div
            key={section.title}
            className={cn(
              "grid items-center gap-12 lg:grid-cols-2",
              index % 2 === 1 && "lg:[&>*:first-child]:order-2",
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-medium tracking-wide text-primary uppercase">{section.eyebrow}</span>
              <h2 className="mt-3 text-2xl font-display font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{section.description}</p>
              <ul className="mt-6 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              src={section.image}
              alt={section.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border object-cover shadow-lg"
            />
          </div>
        ))}
      </div>

      <div className="px-4 sm:px-6">
        <CtaSection />
      </div>
    </div>
  )
}
