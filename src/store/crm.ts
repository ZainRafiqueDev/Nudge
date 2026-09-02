import { create } from "zustand"
import type { AutomationRule, DraftStatus, FollowupDraft } from "@/types"
import { followupDrafts } from "@/data/followupDrafts"
import { automationRules } from "@/data/automationRules"

interface CrmState {
  drafts: FollowupDraft[]
  rules: AutomationRule[]
  setDraftStatus: (id: string, status: DraftStatus, body?: string) => void
  approveAndSend: (id: string) => void
  rejectDraft: (id: string) => void
  updateDraftBody: (id: string, body: string, subject?: string) => void
  toggleRule: (id: string) => void
  addRule: (rule: AutomationRule) => void
  updateRule: (id: string, updates: Partial<AutomationRule>) => void
}

export const useCrmStore = create<CrmState>()((set) => ({
  drafts: followupDrafts,
  rules: automationRules,

  setDraftStatus: (id, status) =>
    set((state) => ({
      drafts: state.drafts.map((d) =>
        d.id === id
          ? { ...d, status, sentAt: status === "sent" || status === "auto_sent" ? new Date().toISOString() : d.sentAt }
          : d,
      ),
    })),

  approveAndSend: (id) =>
    set((state) => ({
      drafts: state.drafts.map((d) =>
        d.id === id ? { ...d, status: "sent", sentAt: new Date().toISOString() } : d,
      ),
    })),

  rejectDraft: (id) =>
    set((state) => ({
      drafts: state.drafts.map((d) => (d.id === id ? { ...d, status: "rejected" } : d)),
    })),

  updateDraftBody: (id, body, subject) =>
    set((state) => ({
      drafts: state.drafts.map((d) => (d.id === id ? { ...d, body, subject: subject ?? d.subject } : d)),
    })),

  toggleRule: (id) =>
    set((state) => ({
      rules: state.rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    })),

  addRule: (rule) => set((state) => ({ rules: [rule, ...state.rules] })),

  updateRule: (id, updates) =>
    set((state) => ({
      rules: state.rules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
}))
