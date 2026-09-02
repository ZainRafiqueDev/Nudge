import { Card, CardContent } from "@/components/ui/card"
import { StageBadge } from "@/components/dashboard/StageBadge"
import { useSessionStore } from "@/store/session"
import { customerById, demoCustomerId, dealsForCustomer } from "@/data/customers"
import { formatCompactCurrency, formatDate } from "@/lib/format"

export function PortalMyDeals() {
  const userId = useSessionStore((s) => s.userId)
  const customer = customerById.get(userId ?? "") ?? customerById.get(demoCustomerId)!
  const deals = dealsForCustomer(customer.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">My Deals</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every engagement your account has open or completed with Fernbridge Software.</p>
      </div>

      <div className="space-y-4">
        {deals.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">No deals on file yet.</CardContent>
          </Card>
        )}
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-medium">{deal.name}</p>
                  <StageBadge stage={deal.stage} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Opened {formatDate(deal.createdAt)}</p>
                <p className="mt-2 text-sm text-muted-foreground">Next step: {deal.nextStep}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-display font-semibold">{formatCompactCurrency(deal.valueCents)}</p>
                <p className="text-xs text-muted-foreground">Estimated value</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
