export type Role = "admin" | "rep" | "customer"

export type DealStage =
  | "new"
  | "contacted"
  | "negotiation"
  | "stalled"
  | "closed_won"
  | "closed_lost"

export type CrmSource = "Salesforce" | "HubSpot" | "Pipedrive"

export interface Rep {
  id: string
  name: string
  title: string
  email: string
  avatar: string
  quotaCents: number
  autoSendEnabled: boolean
  autoSendIdleDays: number
  tone: "friendly" | "formal" | "direct"
}

export interface Contact {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  avatar: string
}

export interface Customer {
  id: string
  name: string
  company: string
  email: string
  avatar: string
  contactId: string
}

export interface Deal {
  id: string
  name: string
  company: string
  contactId: string
  ownerId: string
  customerId?: string
  stage: DealStage
  valueCents: number
  source: CrmSource
  createdAt: string
  lastActivityAt: string
  nextStep: string
  industry: string
}

export type DraftStatus = "pending" | "approved" | "sent" | "rejected" | "auto_sent"
export type DraftChannel = "email" | "sms"

export interface FollowupDraft {
  id: string
  dealId: string
  channel: DraftChannel
  subject: string
  body: string
  status: DraftStatus
  reason: string
  createdAt: string
  sentAt?: string
}

export type RuleAction = "require_approval" | "auto_send"

export interface AutomationRule {
  id: string
  name: string
  description: string
  stage: DealStage | "any"
  idleDays: number
  action: RuleAction
  channel: DraftChannel
  enabled: boolean
  timesTriggered: number
}

export type ActivityType =
  | "draft_generated"
  | "draft_approved"
  | "draft_rejected"
  | "email_sent"
  | "email_opened"
  | "email_replied"
  | "stage_changed"
  | "rule_triggered"

export interface ActivityEvent {
  id: string
  dealId: string
  type: ActivityType
  message: string
  timestamp: string
  actor: string
}
