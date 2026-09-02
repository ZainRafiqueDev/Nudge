import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AlertTriangle, Clock, Inbox, Send, Table2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/StatCard"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { deals } from "@/data/deals"
import { activity } from "@/data/activity"
import { useCrmStore } from "@/store/crm"
import { avgReplyHours, draftsPerDay, pendingDrafts, sentThisWeek, staleDeals } from "@/lib/metrics"

export function AdminOverview() {
  const drafts = useCrmStore((s) => s.drafts)
  const stale = staleDeals(deals)
  const pending = pendingDrafts(drafts)
  const sent = sentThisWeek(drafts)
  const avgHours = avgReplyHours(activity)
  const chartData = draftsPerDay(drafts, 14)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A live look at every deal Nudge is watching across the whole team.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Deals monitored" value={String(deals.length)} icon={Table2} trend="Across 5 reps" />
        <StatCard
          label="Stale deals"
          value={String(stale.length)}
          icon={AlertTriangle}
          tone="warning"
          trend="Idle 5 or more days"
        />
        <StatCard label="Drafts awaiting review" value={String(pending.length)} icon={Inbox} trend="Needs a decision" />
        <StatCard
          label="Sent this week"
          value={String(sent.length)}
          icon={Send}
          tone="success"
          trend="Approved and auto sent"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Drafts generated, last 14 days</CardTitle>
          </CardHeader>
          <CardContent className="h-72 pl-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="draftGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 4" className="stroke-border" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} interval={2} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} width={28} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-popover)",
                    fontSize: 13,
                  }}
                />
                <Area type="monotone" dataKey="drafts" stroke="var(--color-primary)" fill="url(#draftGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="size-4 text-muted-foreground" />
              Average reply time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-display font-semibold tracking-tight">
              {avgHours ? `${avgHours.toFixed(1)}h` : "N/A"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Measured from when a follow up sends to when the contact replies, across all reps.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent automation activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed events={activity} limit={10} />
        </CardContent>
      </Card>
    </div>
  )
}
