import { RuleCard } from "@/components/dashboard/RuleCard"
import { RuleFormDialog } from "@/components/dashboard/RuleFormDialog"
import { useCrmStore } from "@/store/crm"

export function AdminAutomationRules() {
  const rules = useCrmStore((s) => s.rules)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold tracking-tight">Automation Rules</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Define when a draft should be created and whether it needs approval or can send on its own.
          </p>
        </div>
        <RuleFormDialog />
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  )
}
