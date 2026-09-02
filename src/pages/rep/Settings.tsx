import { useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSessionStore } from "@/store/session"
import { repById } from "@/data/reps"

export function RepSettings() {
  const userId = useSessionStore((s) => s.userId)
  const rep = repById.get(userId ?? "") ?? repById.get("rep-1")!

  const [autoSend, setAutoSend] = useState(rep.autoSendEnabled)
  const [idleDays, setIdleDays] = useState(rep.autoSendIdleDays)
  const [tone, setTone] = useState(rep.tone)
  const [signature, setSignature] = useState(`Best,\n${rep.name}\n${rep.title}`)

  function handleSave() {
    toast.success("Settings saved")
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Personal preferences for how Nudge works on your deals.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={rep.avatar} alt={rep.name} />
            <AvatarFallback>{rep.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{rep.name}</p>
            <p className="text-sm text-muted-foreground">{rep.title}</p>
            <p className="text-sm text-muted-foreground">{rep.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Automation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Auto send for my deals</p>
              <p className="text-xs text-muted-foreground">
                When on, drafts that match an auto send rule go out without waiting for your review
              </p>
            </div>
            <Switch checked={autoSend} onCheckedChange={setAutoSend} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="idleDays">Idle days before a draft is generated</Label>
            <Input
              id="idleDays"
              type="number"
              min={1}
              max={30}
              value={idleDays}
              onChange={(e) => setIdleDays(Number(e.target.value))}
              className="w-32"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Writing tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Email signature</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea value={signature} onChange={(e) => setSignature(e.target.value)} rows={4} />
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save settings</Button>
    </div>
  )
}
