import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCrmStore } from "@/store/crm"
import type { AutomationRule, DealStage } from "@/types"

const ruleSchema = z.object({
  name: z.string().min(3, "Give the rule a short name"),
  description: z.string().min(10, "Describe what this rule does in a full sentence"),
  stage: z.enum(["any", "new", "contacted", "negotiation", "stalled"]),
  idleDays: z.number().int().min(1, "Must be at least 1 day").max(60, "Keep it under 60 days"),
  action: z.enum(["require_approval", "auto_send"]),
  channel: z.enum(["email", "sms"]),
  enabled: z.boolean(),
})

type RuleFormValues = z.infer<typeof ruleSchema>

const stageChoices: { value: DealStage | "any"; label: string }[] = [
  { value: "any", label: "Any open stage" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "negotiation", label: "Negotiation" },
  { value: "stalled", label: "Stalled" },
]

export function RuleFormDialog() {
  const [open, setOpen] = useState(false)
  const addRule = useCrmStore((s) => s.addRule)

  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      description: "",
      stage: "stalled",
      idleDays: 7,
      action: "require_approval",
      channel: "email",
      enabled: true,
    },
  })

  function onSubmit(values: RuleFormValues) {
    const rule: AutomationRule = {
      id: `rule-${Date.now()}`,
      timesTriggered: 0,
      ...values,
    }
    addRule(rule)
    toast.success("Automation rule created", { description: rule.name })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4" />
          New rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create an automation rule</DialogTitle>
          <DialogDescription>
            Define when Nudge should draft a message and whether it needs your approval before sending.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Rule name</Label>
            <Input id="name" placeholder="For example, Negotiation gone quiet" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Explain in a sentence what triggers this rule and what happens next"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Deal stage</Label>
              <Select
                defaultValue={form.getValues("stage")}
                onValueChange={(v) => form.setValue("stage", v as RuleFormValues["stage"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stageChoices.map((choice) => (
                    <SelectItem key={choice.value} value={choice.value}>
                      {choice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="idleDays">Idle days threshold</Label>
              <Input
                id="idleDays"
                type="number"
                min={1}
                max={60}
                {...form.register("idleDays", { valueAsNumber: true })}
              />
              {form.formState.errors.idleDays && (
                <p className="text-xs text-destructive">{form.formState.errors.idleDays.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Action</Label>
              <Select
                defaultValue={form.getValues("action")}
                onValueChange={(v) => form.setValue("action", v as RuleFormValues["action"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="require_approval">Require approval</SelectItem>
                  <SelectItem value="auto_send">Auto send</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Channel</Label>
              <Select
                defaultValue={form.getValues("channel")}
                onValueChange={(v) => form.setValue("channel", v as RuleFormValues["channel"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">Text message</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="text-sm font-medium">Enable immediately</p>
              <p className="text-xs text-muted-foreground">Turn this rule on as soon as it is created</p>
            </div>
            <Switch
              checked={form.watch("enabled")}
              onCheckedChange={(checked) => form.setValue("enabled", checked)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create rule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
