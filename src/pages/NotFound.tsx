import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-sm font-medium text-primary">404</p>
      <h1 className="text-3xl font-display font-semibold tracking-tight">This page does not exist</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you are looking for may have moved. Head back to the homepage to keep exploring.
      </p>
      <Button asChild>
        <Link to="/">
          <ArrowLeft className="size-4" />
          Back to homepage
        </Link>
      </Button>
    </div>
  )
}
