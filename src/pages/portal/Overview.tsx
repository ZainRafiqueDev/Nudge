import { Link } from "react-router-dom"
import { ArrowRight, Building2, MessageSquare, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StageBadge } from "@/components/dashboard/StageBadge"
import { useSessionStore } from "@/store/session"
import { customerById, demoCustomerId, dealsForCustomer } from "@/data/customers"
import { repById } from "@/data/reps"
import { formatCompactCurrency, formatDate } from "@/lib/format"
import { scene } from "@/lib/images"

export function PortalOverview() {
  const userId = useSessionStore((s) => s.userId)
  const customer = customerById.get(userId ?? "") ?? customerById.get(demoCustomerId)!
  const deals = dealsForCustomer(customer.id)
  const primaryDeal = deals[0]
  const rep = primaryDeal ? repById.get(primaryDeal.ownerId) : undefined

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border">
        <img
          src={scene("modernOffice", 1400, 420)}
          alt="Bright modern office workspace"
          loading="lazy"
          className="h-40 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative -mt-14 px-6 pb-6">
          <h1 className="text-2xl font-display font-semibold tracking-tight">Welcome back, {customer.name.split(" ")[0]}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here is the latest on your account with Fernbridge Software.</p>
        </div>
      </div>

      {primaryDeal ? (
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-base">{primaryDeal.name}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Current status of your active engagement</p>
            </div>
            <StageBadge stage={primaryDeal.stage} />
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Estimated value</p>
              <p className="mt-1 text-lg font-display font-semibold">{formatCompactCurrency(primaryDeal.valueCents)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Started</p>
              <p className="mt-1 text-lg font-display font-semibold">{formatDate(primaryDeal.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Next step</p>
              <p className="mt-1 text-sm font-medium">{primaryDeal.nextStep}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No active deal on file yet.
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4 text-muted-foreground" />
              Your account manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rep ? (
              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarImage src={rep.avatar} alt={rep.name} />
                  <AvatarFallback>{rep.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{rep.name}</p>
                  <p className="text-xs text-muted-foreground">{rep.title}</p>
                  <p className="text-xs text-muted-foreground">{rep.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not assigned yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="size-4 text-muted-foreground" />
              Quick links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/portal/deals">
                View all deals
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link to="/portal/messages">
                <span className="flex items-center gap-2">
                  <MessageSquare className="size-3.5" />
                  Open messages
                </span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
