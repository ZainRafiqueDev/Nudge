import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowRight, Headset, Shield, Sparkles, UserCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSessionStore } from "@/store/session"
import type { Role } from "@/types"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const roleCards: { role: Role; title: string; description: string; icon: typeof Shield }[] = [
  {
    role: "admin",
    title: "Continue as Admin",
    description: "Manage automation rules, review escalations, and see performance across the whole team.",
    icon: Shield,
  },
  {
    role: "rep",
    title: "Continue as Sales Rep",
    description: "Work your own pipeline, review drafted follow ups, and see what has gone quiet.",
    icon: Headset,
  },
  {
    role: "customer",
    title: "Continue as Customer",
    description: "See what a customer sees: deal status, messages, and account details in the portal.",
    icon: UserCircle,
  },
]

export function Login() {
  const navigate = useNavigate()
  const loginAs = useSessionStore((s) => s.loginAs)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function handleRoleSelect(role: Role) {
    loginAs(role)
    navigate(role === "admin" ? "/admin" : role === "rep" ? "/rep" : "/portal")
  }

  function onSubmit() {
    toast("This is a demo workspace", {
      description: "Use one of the role cards to explore a dashboard instead of signing in.",
    })
  }

  return (
    <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl grid-cols-1 items-center gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Demo workspace
        </span>
        <h1 className="mt-6 text-3xl font-display font-semibold tracking-tight sm:text-4xl">
          Pick a dashboard to explore
        </h1>
        <p className="mt-4 text-muted-foreground">
          This build uses sample data throughout, so you can click into any role and see a fully populated
          workspace right away. No account needed.
        </p>

        <div className="mt-8 space-y-3">
          {roleCards.map((card) => (
            <button key={card.role} onClick={() => handleRoleSelect(card.role)} className="block w-full text-left">
              <Card className="group py-4 transition-all hover:border-primary hover:shadow-md">
                <CardContent className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <card.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{card.title}</p>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-2">
          <CardContent className="space-y-5 pt-4">
            <div>
              <h2 className="text-lg font-display font-semibold">Sign in with email</h2>
              <p className="text-sm text-muted-foreground">Shown for illustration. Use a role card to actually continue.</p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" placeholder="you@company.com" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" {...form.register("password")} />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
