import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, Building2, Calendar, DollarSign, Mail, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { StageBadge } from "@/components/dashboard/StageBadge"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { DraftCard } from "@/components/dashboard/DraftCard"
import { dealById } from "@/data/deals"
import { contactById } from "@/data/contacts"
import { repById } from "@/data/reps"
import { activityForDeal } from "@/data/activity"
import { draftsForDeal } from "@/data/followupDrafts"
import { formatCompactCurrency, formatDate, daysSince } from "@/lib/format"

export function RepDealDetail() {
  const { dealId } = useParams()
  const [notes, setNotes] = useState("")
  const deal = dealId ? dealById.get(dealId) : undefined

  if (!deal) {
    return <Navigate to="/rep/pipeline" replace />
  }

  const contact = contactById.get(deal.contactId)
  const owner = repById.get(deal.ownerId)
  const events = activityForDeal(deal.id)
  const drafts = draftsForDeal(deal.id)
  const idleDays = daysSince(deal.lastActivityAt)

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/rep/pipeline">
          <ArrowLeft className="size-4" />
          Back to pipeline
        </Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-semibold tracking-tight">{deal.name}</h1>
            <StageBadge stage={deal.stage} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Owned by {owner?.name} · {idleDays === 0 ? "Active today" : `Quiet for ${idleDays} days`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityFeed events={events} />
            </CardContent>
          </Card>

          {drafts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-semibold">Follow ups</h2>
              {drafts.map((draft) => (
                <DraftCard key={draft.id} draft={draft} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contact && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.title}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Building2 className="size-4" />
                      {contact.company}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="size-4" />
                      {contact.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="size-4" />
                      {contact.phone}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deal details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4" />
                  Value
                </span>
                <span className="font-medium">{formatCompactCurrency(deal.valueCents)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  Opened
                </span>
                <span className="font-medium">{formatDate(deal.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Source</span>
                <Badge variant="outline">{deal.source}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Industry</span>
                <span className="font-medium">{deal.industry}</span>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                Next step: {deal.nextStep}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Private notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add a note only your team can see"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
