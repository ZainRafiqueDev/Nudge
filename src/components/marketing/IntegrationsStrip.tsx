import { motion } from "framer-motion"
import { Cloud, Database, Layers, PieChart, Radio, Workflow } from "lucide-react"
import { SectionHeading } from "@/components/marketing/SectionHeading"

const integrations = [
  { name: "Salesforce", icon: Cloud },
  { name: "HubSpot", icon: Layers },
  { name: "Pipedrive", icon: Workflow },
  { name: "Zoho CRM", icon: Database },
  { name: "Close", icon: Radio },
  { name: "Copper", icon: PieChart },
]

export function IntegrationsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Connections"
        title="Works with the CRM your team already lives in"
        description="Connect once and Nudge reads deal stages, activity timestamps, and contact records without asking your team to change how they work."
      />

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {integrations.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex flex-col items-center gap-3 rounded-xl border bg-card py-8 text-center"
          >
            <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-foreground/70">
              <item.icon className="size-5" />
            </div>
            <p className="text-sm font-medium">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
