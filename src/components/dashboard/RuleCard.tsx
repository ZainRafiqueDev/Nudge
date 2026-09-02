import { Mail, MessageSquareText, ShieldCheck, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useCrmStore } from "@/store/crm"
import type { AutomationRule } from "@/types"

export function RuleCard({ rule }: { rule: AutomationRule }) {
  const toggleRule = useCrmStore((s) => s.toggleRule)

  return (
    <Card className={rule.enabled ? "" : "opacity-60"}>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {rule.action === "auto_send" ? <Zap className="size-5" /> : <ShieldCheck className="size-5" />}
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{rule.name}</p>
              <Badge variant="secondary" className="font-normal">
                {rule.stage === "any" ? "Any stage" : rule.stage}
              </Badge>
              <Badge variant="outline" className="gap-1 font-normal">
                {rule.channel === "email" ? <Mail className="size-3" /> : <MessageSquareText className="size-3" />}
                {rule.channel === "email" ? "Email" : "Text"}
              </Badge>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">{rule.description}</p>
            <p className="text-xs text-muted-foreground">
              Idle for {rule.idleDays} days ·{" "}
              {rule.action === "auto_send" ? "sends automatically" : "held for approval"} · triggered{" "}
              {rule.timesTriggered} times
            </p>
          </div>
        </div>
        <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
      </CardContent>
    </Card>
  )
}
