import { CountUp } from "@/components/marketing/CountUp"

const stats = [
  { value: 4200, suffix: "+", label: "Stale deals caught before they were lost" },
  { value: 63, suffix: "%", label: "Faster average reply rate on drafted follow ups" },
  { value: 11, suffix: " sec", label: "Typical time for a draft to be ready for review" },
  { value: 28, suffix: "%", label: "More closed deals per rep after three months" },
]

export function StatHighlights() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="text-4xl font-display font-semibold tracking-tight text-primary">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
