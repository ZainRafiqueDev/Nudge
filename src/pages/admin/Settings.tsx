import { useState } from "react"
import { CheckCircle2, Cloud, Layers, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const connections = [
  { name: "Salesforce", icon: Cloud, connected: true, detail: "Syncing every 15 minutes" },
  { name: "HubSpot", icon: Layers, connected: true, detail: "Syncing every 15 minutes" },
  { name: "Pipedrive", icon: Workflow, connected: false, detail: "Not connected" },
]

const notificationDefaults = [
  { id: "escalations", label: "Escalated approvals", description: "When a draft needs an admin to step in", enabled: true },
  { id: "weekly-digest", label: "Weekly performance digest", description: "A summary of reply rates and rule activity", enabled: true },
  { id: "rule-changes", label: "Rule changes", description: "When a teammate edits or disables an automation rule", enabled: false },
]

export function AdminSettings() {
  const [notifications, setNotifications] = useState(notificationDefaults)

  function saveOrgProfile() {
    toast.success("Organization profile saved")
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Organization profile, CRM connections, and notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organization profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="org-name">Organization name</Label>
              <Input id="org-name" defaultValue="Fernbridge Software" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="org-domain">Primary domain</Label>
              <Input id="org-domain" defaultValue="fernbridge.io" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="org-signature">Default sign off</Label>
            <Input id="org-signature" defaultValue="The Fernbridge Software team" />
          </div>
          <Button onClick={saveOrgProfile}>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">CRM connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {connections.map((connection) => (
            <div key={connection.name} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground/70">
                  <connection.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{connection.name}</p>
                  <p className="text-xs text-muted-foreground">{connection.detail}</p>
                </div>
              </div>
              {connection.connected ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3.5" />
                  Connected
                </span>
              ) : (
                <Button size="sm" variant="outline" onClick={() => toast("This is a demo connection")}>
                  Connect
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {notifications.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, enabled: checked } : n)))
                  }
                />
              </div>
              {index < notifications.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
