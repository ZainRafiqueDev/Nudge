import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { reps } from "@/data/reps"
import { dealsForRep } from "@/data/deals"
import { formatCompactCurrency } from "@/lib/format"
import { isOpenDeal, staleDeals } from "@/lib/metrics"

export function AdminTeam() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every rep using Nudge, their current pipeline, and how much automation is set to help them.
        </p>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rep</TableHead>
                <TableHead>Open pipeline</TableHead>
                <TableHead>Stale deals</TableHead>
                <TableHead>Quota progress</TableHead>
                <TableHead>Automation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reps.map((rep) => {
                const repDeals = dealsForRep(rep.id)
                const openDeals = repDeals.filter(isOpenDeal)
                const openValue = openDeals.reduce((sum, d) => sum + d.valueCents, 0)
                const wonValue = repDeals
                  .filter((d) => d.stage === "closed_won")
                  .reduce((sum, d) => sum + d.valueCents, 0)
                const attainment = Math.min(100, Math.round((wonValue / rep.quotaCents) * 100))
                const stale = staleDeals(repDeals)

                return (
                  <TableRow key={rep.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarImage src={rep.avatar} alt={rep.name} />
                          <AvatarFallback>{rep.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-tight">{rep.name}</p>
                          <p className="text-xs text-muted-foreground">{rep.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCompactCurrency(openValue)}</TableCell>
                    <TableCell>
                      {stale.length > 0 ? (
                        <Badge variant="outline" className="border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400">
                          {stale.length} idle
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell className="w-48">
                      <div className="flex items-center gap-2">
                        <Progress value={attainment} className="h-2" />
                        <span className="w-10 text-right text-xs text-muted-foreground">{attainment}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rep.autoSendEnabled ? "default" : "secondary"}>
                        {rep.autoSendEnabled ? `Auto send after ${rep.autoSendIdleDays}d` : "Approval only"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
