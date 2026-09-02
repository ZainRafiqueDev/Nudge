import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scene } from "@/lib/images"

export function CtaSection() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-4 sm:px-6 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border bg-primary text-primary-foreground"
      >
        <img
          src={scene("officeMeeting", 1600, 700)}
          alt="Sales team meeting around a table reviewing deal progress"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-16 sm:py-20">
          <h2 className="max-w-2xl text-3xl font-display font-semibold tracking-tight sm:text-4xl">
            Give every deal in your pipeline a second chance
          </h2>
          <p className="max-w-xl text-primary-foreground/85">
            See how Nudge would look against your own pipeline. No setup required to explore the demo
            workspace and every dashboard inside it.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/login">
              Explore the demo workspace
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
