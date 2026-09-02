import { motion } from "framer-motion"
import { BarChart3, MessagesSquare, Radar, ShieldCheck, Wand2, Zap } from "lucide-react"
import { SectionHeading } from "@/components/marketing/SectionHeading"

const features = [
  {
    number: "01",
    icon: Radar,
    title: "Stale deal detection",
    description:
      "Nudge continuously watches every open deal against your CRM activity log and flags the moment one goes quiet, so nothing slips through a busy pipeline unnoticed.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Personal drafting",
    description:
      "Each draft is written in the voice of the rep who owns the deal, referencing the contact by name, the deal history, and the specific next step rather than a generic template.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Approval workflow",
    description:
      "Review, edit in place, or reject any draft before it goes out. Every decision is logged, so you always know who sent what message and when it happened.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Auto send rules",
    description:
      "Set conditions by deal stage and idle time, choose approval or automatic sending, and let routine follow ups handle themselves while reps focus on deals that need a human touch.",
  },
  {
    number: "05",
    icon: MessagesSquare,
    title: "Multiple channels",
    description:
      "Send by email or text message depending on what fits the relationship and the rule you have configured, all from a single review queue.",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Reporting and insight",
    description:
      "Track reply rate, response time, and exactly how much of your pipeline automation is rescuing, broken down by rep, rule, and stage.",
  },
]

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="What it does"
        title="Everything a busy pipeline needs to keep moving"
        description="Nudge handles the repetitive parts of staying in touch so your team can spend its time on the conversations that actually close deals."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <span className="font-display text-sm text-muted-foreground/50">{feature.number}</span>
            <div className="mt-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-display font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
