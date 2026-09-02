import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Role } from "@/types"
import { reps } from "@/data/reps"
import { demoCustomerId } from "@/data/customers"

interface SessionState {
  role: Role | null
  userId: string | null
  loginAs: (role: Role) => void
  logout: () => void
}

const defaultUserByRole: Record<Role, string> = {
  admin: "admin-1",
  rep: reps[0].id,
  customer: demoCustomerId,
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      role: null,
      userId: null,
      loginAs: (role) => set({ role, userId: defaultUserByRole[role] }),
      logout: () => set({ role: null, userId: null }),
    }),
    { name: "followup-ai-session" },
  ),
)
