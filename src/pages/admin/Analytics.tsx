import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { deals } from "@/data/deals"
import { activity } from "@/data/activity"
import { useCrmStore } from "@/store/crm"
import { dealsByStage, responseOutcomes } from "@/lib/metrics"
import type { DealStage } from "@/types"

const stageLabels: Record<DealStage, string> = {
  new: "New",
  contacted: "Contacted",
  negotiation: "Negotiation",
  stalled: "Stalled",
  closed_won: "Closed Won",
  closed_lost: "Closed Lost",
}

const pieColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-4)"]

export function AdminAnalytics() {
  const drafts = useCrmStore((s) => s.drafts)
  const rules = useCrmStore((s) => s.rules)

  const stageCounts = dealsByStage(deals)
  const stageData = (Object.keys(stageLabels) as DealStage[]).map((stage) => ({
    stage: stageLabels[stage],
    count: stageCounts[stage] ?? 0,
  }))

  const ruleData = [...rules]
    .sort((a, b) => b.timesTriggered - a.timesTriggered)
    .map((rule) => ({ name: rule.name, triggered: rule.timesTriggered }))

  const outcomeData = responseOutcomes(drafts, activity)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How the pipeline is distributed, which rules are doing the most work, and how contacts respond.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pipeline by stage</CardTitle>
          </CardHeader>
          <CardContent className="h-72 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-border" />
                <XAxis dataKey="stage" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Response outcomes on sent follow ups</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={outcomeData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {outcomeData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex justify-center gap-5 pb-5">
            {outcomeData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2.5 rounded-full" style={{ background: pieColors[index % pieColors.length] }} />
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Automation rule performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ruleData} layout="vertical" margin={{ left: 24, right: 24, top: 8, bottom: 0 }}>
                <CartesianGrid horizontal={false} strokeDasharray="4 4" className="stroke-border" />
                <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} fontSize={12} width={180} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="triggered" fill="var(--color-chart-2)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
