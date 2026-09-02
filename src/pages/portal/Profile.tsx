import { useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSessionStore } from "@/store/session"
import { customerById, demoCustomerId } from "@/data/customers"

export function PortalProfile() {
  const userId = useSessionStore((s) => s.userId)
  const customer = customerById.get(userId ?? "") ?? customerById.get(demoCustomerId)!

  const [emailUpdates, setEmailUpdates] = useState(true)
  const [textUpdates, setTextUpdates] = useState(false)

  function handleSave() {
    toast.success("Profile updated")
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your account details and how you would like to be contacted.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-muted-foreground">{customer.company}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" defaultValue={customer.name} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue={customer.company} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={customer.email} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email updates</p>
              <p className="text-xs text-muted-foreground">Follow up messages and deal status changes</p>
            </div>
            <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Text message updates</p>
              <p className="text-xs text-muted-foreground">Short check ins for time sensitive items</p>
            </div>
            <Switch checked={textUpdates} onCheckedChange={setTextUpdates} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save changes</Button>
    </div>
  )
}
