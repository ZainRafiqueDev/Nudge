import { Navigate } from "react-router-dom"
import { useSessionStore } from "@/store/session"
import type { Role } from "@/types"

export function RequireRole({ role, children }: { role: Role; children: React.ReactNode }) {
  const sessionRole = useSessionStore((s) => s.role)
  if (sessionRole !== role) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
