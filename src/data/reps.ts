import type { Rep } from "@/types"
import { portrait } from "@/lib/images"

export const reps: Rep[] = [
  {
    id: "rep-1",
    name: "Daniel Cho",
    title: "Senior Account Executive",
    email: "daniel.cho@fernbridge.io",
    avatar: portrait("daniel"),
    quotaCents: 42_000_000,
    autoSendEnabled: true,
    autoSendIdleDays: 6,
    tone: "friendly",
  },
  {
    id: "rep-2",
    name: "Priya Nandakumar",
    title: "Account Executive",
    email: "priya.n@fernbridge.io",
    avatar: portrait("priya"),
    quotaCents: 30_000_000,
    autoSendEnabled: false,
    autoSendIdleDays: 5,
    tone: "formal",
  },
  {
    id: "rep-3",
    name: "Marcus Webb",
    title: "Account Executive",
    email: "marcus.webb@fernbridge.io",
    avatar: portrait("marcus"),
    quotaCents: 30_000_000,
    autoSendEnabled: true,
    autoSendIdleDays: 7,
    tone: "direct",
  },
  {
    id: "rep-4",
    name: "Lena Ostrowski",
    title: "Senior Account Executive",
    email: "lena.o@fernbridge.io",
    avatar: portrait("lena"),
    quotaCents: 42_000_000,
    autoSendEnabled: false,
    autoSendIdleDays: 8,
    tone: "friendly",
  },
  {
    id: "rep-5",
    name: "Omar Haddad",
    title: "Account Executive",
    email: "omar.haddad@fernbridge.io",
    avatar: portrait("omar"),
    quotaCents: 30_000_000,
    autoSendEnabled: true,
    autoSendIdleDays: 5,
    tone: "direct",
  },
]

export const repById = new Map(reps.map((r) => [r.id, r]))
