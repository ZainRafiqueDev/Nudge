import { Card, CardContent } from "@/components/ui/card"
import { DealTable } from "@/components/dashboard/DealTable"
import { deals } from "@/data/deals"

export function AdminDealMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Deal Monitor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every open and closed deal across the team, with the most quiet deals surfaced first.
        </p>
      </div>

      <Card>
        <CardContent>
          <DealTable deals={deals} />
        </CardContent>
      </Card>
    </div>
  )
}
