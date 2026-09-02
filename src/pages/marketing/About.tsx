import { motion } from "framer-motion"
import { HeartHandshake, Lock, ShieldCheck, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeading } from "@/components/marketing/SectionHeading"
import { CtaSection } from "@/components/marketing/CtaSection"
import { portrait } from "@/lib/images"
import { scene } from "@/lib/images"

const team = [
  { name: "Aaliyah Chen", role: "Cofounder and Chief Executive Officer", avatar: portrait("aisha") },
  { name: "Miles Okafor", role: "Cofounder and Chief Technology Officer", avatar: portrait("leon") },
  { name: "Renee Fischer", role: "Head of Customer Success", avatar: portrait("hannah") },
  { name: "Diego Alvarez", role: "Head of Product", avatar: portrait("tomas") },
]

const values = [
  {
    icon: Users,
    title: "Built for reps, not just managers",
    description: "Every drafted message should sound like something the rep who owns the deal would actually send.",
  },
  {
    icon: ShieldCheck,
    title: "A human always has the final say",
    description: "Automation should remove busywork, not judgment. Approval and audit history are never optional add ons.",
  },
  {
    icon: HeartHandshake,
    title: "Respect the relationship",
    description: "A follow up should feel like a person checking in, not a system reminding someone they exist.",
  },
  {
    icon: Lock,
    title: "Privacy comes first",
    description: "Deal and contact data stays scoped to your workspace and is never used to train shared models.",
  },
]

export function About() {
  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            Our story
          </span>
          <h1 className="mt-6 text-4xl font-display font-semibold tracking-tight sm:text-5xl">
            We built the tool we wished we had as reps
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Nudge started after years spent watching good deals go cold, not because anyone stopped caring,
            but because a follow up list is easy to lose in a busy week. We wanted a system that noticed a quiet
            deal before a manager had to ask about it, and that wrote a message worth sending rather than one
            that felt automated.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Today the team is spread across product, engineering, and customer success, all focused on the same
            idea: automation should protect relationships, not replace them.
          </p>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          src={scene("officeTeam", 900, 720)}
          alt="Team collaborating together in a bright modern office"
          loading="lazy"
          className="aspect-[5/4] w-full rounded-2xl border object-cover shadow-lg"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="What we believe" title="A few principles that shape every decision we make" />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex gap-4 rounded-2xl border bg-card p-6"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <value.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Leadership" title="The people steering the product" />
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="text-center"
            >
              <Avatar className="mx-auto size-20">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <p className="mt-4 text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <CtaSection />
      </div>
    </div>
  )
}
