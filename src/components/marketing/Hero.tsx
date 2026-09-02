import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, PlayCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { portrait } from "@/lib/images"

const trustNames = [
  "Northwind Traders", "Bluepeak Software", "Vertex Logistics", "Alderly Health Group",
  "Meridian Capital", "Brightline Analytics", "Cobalt Robotics", "Kestrel Aerospace",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid bg-radial-fade pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
           

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl font-display font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Never let a deal go{" "}
              <span className="text-gradient">quiet again</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Nudge watches every open deal in your CRM, notices the moment one goes cold, and drafts a genuinely
              personal message in the voice of the rep who owns it. You approve it or let your own rules send it, and
              every reply flows straight back into the deal timeline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" asChild>
                <Link to="/login">
                  See it in your workspace
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">
                  <PlayCircle className="size-4" />
                  Watch how it works
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {(["daniel", "priya", "marcus", "lena"] as const).map((key) => (
                  <Avatar key={key} className="size-8 border-2 border-background">
                    <AvatarImage src={portrait(key)} />
                    <AvatarFallback>{key.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Built for revenue teams who would rather sell than chase their own follow up list.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="animate-float rounded-2xl border bg-card p-4 shadow-2xl shadow-primary/10">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-muted-foreground">Drafts awaiting review</span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border bg-muted/40 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={portrait("clara")} />
                      <AvatarFallback>CJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Cobalt Robotics</p>
                      <p className="text-xs text-muted-foreground">Idle 9 days, negotiation stage</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    "Hi Clara, wanted to check back in since our last call about the rollout timeline. Still a good
                    time to reconnect this week?"
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 flex-1">
                      Edit
                    </Button>
                    <Button size="sm" className="h-8 flex-1">
                      <CheckCircle2 className="size-3.5" />
                      Approve and send
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Bluepeak Software</p>
                    <p className="text-xs text-muted-foreground">Auto sent 2 hours ago</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Opened
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -top-8 hidden rounded-xl border bg-card px-4 py-3 shadow-lg sm:block">
              <p className="text-2xl font-display font-semibold">63%</p>
              <p className="text-xs text-muted-foreground">Faster reply rate</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 overflow-hidden">
          <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Trusted by revenue teams at growing companies
          </p>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-12">
              {[...trustNames, ...trustNames].map((name, i) => (
                <span key={i} className="text-lg font-display font-medium whitespace-nowrap text-muted-foreground/70">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
