import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/marketing/Hero"
import { StatHighlights } from "@/components/marketing/StatHighlights"
import { FeatureGrid } from "@/components/marketing/FeatureGrid"
import { ProcessSteps } from "@/components/marketing/ProcessSteps"
import { TestimonialGrid } from "@/components/marketing/TestimonialGrid"
import { IntegrationsStrip } from "@/components/marketing/IntegrationsStrip"
import { SectionHeading } from "@/components/marketing/SectionHeading"
import { PricingCards } from "@/components/marketing/PricingCards"
import { CtaSection } from "@/components/marketing/CtaSection"

export function Home() {
  return (
    <div className="pb-24">
      <Hero />
      <StatHighlights />
      <FeatureGrid />
      <ProcessSteps />
      <IntegrationsStrip />
      <TestimonialGrid />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans that scale with your pipeline"
          description="Start with the essentials and grow into full automation as your team gets comfortable letting Nudge handle routine follow ups."
        />
        <div className="mt-16">
          <PricingCards />
        </div>
        <div className="mt-8 text-center">
          <Link to="/pricing" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Compare every plan in detail
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <CtaSection />
      </div>
    </div>
  )
}
