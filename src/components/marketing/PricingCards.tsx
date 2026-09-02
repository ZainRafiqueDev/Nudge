import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/data/pricing"

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {pricingPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className={cn(
            "flex flex-col rounded-2xl border p-7",
            plan.highlighted ? "border-primary bg-primary/[0.03] shadow-lg shadow-primary/10" : "bg-card",
          )}
        >
          {plan.highlighted && (
            <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Most popular
            </span>
          )}
          <h3 className="text-lg font-display font-semibold">{plan.name}</h3>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-semibold tracking-tight">{plan.price}</span>
            <span className="text-sm text-muted-foreground">{plan.cadence}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <Button asChild className="mt-8" variant={plan.highlighted ? "default" : "outline"}>
            <Link to="/login">Get started</Link>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
