import { motion } from "framer-motion"
import { SectionHeading } from "@/components/marketing/SectionHeading"
import { scene } from "@/lib/images"

const steps = [
  {
    number: "01",
    title: "Connect your CRM",
    description:
      "Link Salesforce, HubSpot, or Pipedrive in a few minutes. Nudge reads deal stages, activity timestamps, and contact details without changing how your team already works.",
  },
  {
    number: "02",
    title: "Detect what has gone quiet",
    description:
      "Every open deal is checked continuously against your automation rules, watching idle time by stage so nothing waits longer than it should before someone notices.",
  },
  {
    number: "03",
    title: "Draft a personal message",
    description:
      "A follow up is written in the rep's own tone, referencing real deal history and the specific next step, ready for review in seconds instead of sitting on a to do list.",
  },
  {
    number: "04",
    title: "Approve it or let it send",
    description:
      "Review the draft in your queue, edit it if needed, or let a matching rule send it automatically. Every open and reply flows straight back into the deal timeline.",
  },
]

export function ProcessSteps() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From a quiet deal to a personal reply in four steps"
          description="No new workflow to learn. Nudge sits alongside the CRM your team already uses and does the parts that used to fall through the cracks."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex gap-5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 font-display text-sm font-semibold text-primary">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src={scene("teamCollaborating", 900, 1000)}
              alt="Sales team reviewing pipeline activity together around a laptop"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl border object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-56 rounded-xl border bg-card p-4 shadow-lg sm:block">
              <p className="text-sm font-medium">Rule triggered</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Stalled deal rescue fired for Third Wave Foods after 10 quiet days
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
