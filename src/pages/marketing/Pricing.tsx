import { Check, Minus } from "lucide-react"
import { PricingCards } from "@/components/marketing/PricingCards"
import { SectionHeading } from "@/components/marketing/SectionHeading"
import { CtaSection } from "@/components/marketing/CtaSection"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { pricingFaqs } from "@/data/pricing"

const comparisonRows: { label: string; starter: boolean; growth: boolean; enterprise: boolean }[] = [
  { label: "Stale deal detection", starter: true, growth: true, enterprise: true },
  { label: "Approval queue", starter: true, growth: true, enterprise: true },
  { label: "Email follow ups", starter: true, growth: true, enterprise: true },
  { label: "Text message follow ups", starter: false, growth: true, enterprise: true },
  { label: "Custom automation rules", starter: false, growth: true, enterprise: true },
  { label: "Auto send with audit history", starter: false, growth: true, enterprise: true },
  { label: "Rule and rep level analytics", starter: false, growth: true, enterprise: true },
  { label: "Role based approval chains", starter: false, growth: false, enterprise: true },
  { label: "Single sign on", starter: false, growth: false, enterprise: true },
  { label: "Dedicated onboarding specialist", starter: false, growth: false, enterprise: true },
]

function Mark({ included }: { included: boolean }) {
  return included ? (
    <Check className="mx-auto size-4 text-primary" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" />
  )
}

export function Pricing() {
  return (
    <div className="pb-24">
      <section className="mx-auto max-w-3xl px-4 pt-20 pb-8 text-center sm:px-6 sm:pt-28">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          Pricing
        </span>
        <h1 className="mt-6 text-4xl font-display font-semibold tracking-tight sm:text-5xl">
          Plans built around how many follow ups you need to automate
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Every plan includes the core detection and drafting engine. Upgrade when your team is ready to automate
          more of the pipeline.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Compare plans" title="See exactly what changes at each tier" />
        <div className="mt-12 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="px-5 py-4 font-medium">Feature</th>
                <th className="px-5 py-4 text-center font-medium">Starter</th>
                <th className="px-5 py-4 text-center font-medium">Growth</th>
                <th className="px-5 py-4 text-center font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b last:border-0">
                  <td className="px-5 py-3.5 text-muted-foreground">{row.label}</td>
                  <td className="px-5 py-3.5"><Mark included={row.starter} /></td>
                  <td className="px-5 py-3.5"><Mark included={row.growth} /></td>
                  <td className="px-5 py-3.5"><Mark included={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-12">
          {pricingFaqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <div className="px-4 sm:px-6">
        <CtaSection />
      </div>
    </div>
  )
}
