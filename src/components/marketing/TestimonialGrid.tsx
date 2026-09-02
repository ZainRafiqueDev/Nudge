import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeading } from "@/components/marketing/SectionHeading"
import { portrait } from "@/lib/images"

const testimonials = [
  {
    quote:
      "Our reps used to keep follow ups in a spreadsheet that nobody trusted. Now the drafts show up already sounding like the rep wrote them, and we approve most in under a minute.",
    name: "Zara Whitfield",
    title: "Head of Data, Brightline Analytics",
    avatar: portrait("zara"),
  },
  {
    quote:
      "The auto send rules gave us back hours every week. Routine check ins go out on their own, and the team only steps in for the deals that actually need a human voice.",
    name: "Ravi Chandran",
    title: "Chief Operating Officer, Vertex Logistics",
    avatar: portrait("ravi"),
  },
  {
    quote:
      "We could see the impact within the first month. Stalled deals stopped quietly dying, and our reply rate on cold pipeline nearly doubled.",
    name: "Grace Liu",
    title: "VP of Operations, Northwind Traders",
    avatar: portrait("grace"),
  },
]

export function TestimonialGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Customer stories"
        title="Revenue teams trust Nudge with their pipeline"
        description="A sample of what teams say once follow ups stop depending on someone remembering to send them."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="flex flex-col rounded-2xl border bg-card p-6"
          >
            <Quote className="size-6 text-primary/40" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{testimonial.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
