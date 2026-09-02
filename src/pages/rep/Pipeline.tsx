import { PipelineBoard } from "@/components/dashboard/PipelineBoard"
import { useSessionStore } from "@/store/session"
import { dealsForRep } from "@/data/deals"

export function RepPipeline() {
  const userId = useSessionStore((s) => s.userId)
  const deals = dealsForRep(userId ?? "rep-1")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-semibold tracking-tight">My Pipeline</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every deal you own, grouped by stage. Click any card for the full history.</p>
      </div>

      <PipelineBoard deals={deals} />
    </div>
  )
}
