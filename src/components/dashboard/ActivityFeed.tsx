import {
  CheckCircle2,
  Mail,
  MailOpen,
  MessageCircle,
  Sparkles,
  Workflow,
  XCircle,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { relativeTime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { ActivityEvent, ActivityType } from "@/types"

const iconByType: Record<ActivityType, { icon: LucideIcon; className: string }> = {
  draft_generated: { icon: Sparkles, className: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  draft_approved: { icon: CheckCircle2, className: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  draft_rejected: { icon: XCircle, className: "bg-neutral-500/10 text-neutral-500" },
  email_sent: { icon: Mail, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  email_opened: { icon: MailOpen, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  email_replied: { icon: MessageCircle, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  stage_changed: { icon: Workflow, className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  rule_triggered: { icon: Workflow, className: "bg-primary/10 text-primary" },
}

export function ActivityFeed({ events, limit }: { events: ActivityEvent[]; limit?: number }) {
  const shown = limit ? events.slice(0, limit) : events

  if (shown.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No activity to show yet.</p>
  }

  return (
    <ol className="space-y-1">
      {shown.map((event) => {
        const { icon: Icon, className } = iconByType[event.type]
        return (
          <li key={event.id} className="flex gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/60">
            <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-full", className)}>
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">{event.message}</p>
              <p className="text-xs text-muted-foreground">{relativeTime(event.timestamp)}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
