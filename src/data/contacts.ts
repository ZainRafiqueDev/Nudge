import type { Contact } from "@/types"
import { portrait, type PortraitKey } from "@/lib/images"

interface CompanySeed {
  company: string
  industry: string
  contactName: string
  title: string
  portraitKey: PortraitKey
}

export const companySeeds: CompanySeed[] = [
  { company: "Northwind Traders", industry: "Retail", contactName: "Grace Liu", title: "VP of Operations", portraitKey: "grace" },
  { company: "Cascade Manufacturing", industry: "Manufacturing", contactName: "Felix Tran", title: "Director of Procurement", portraitKey: "felix" },
  { company: "Bluepeak Software", industry: "Software", contactName: "Sofia Martins", title: "Head of Growth", portraitKey: "sofia" },
  { company: "Vertex Logistics", industry: "Logistics", contactName: "Ravi Chandran", title: "Chief Operating Officer", portraitKey: "ravi" },
  { company: "Alderly Health Group", industry: "Healthcare", contactName: "Noah Bergstrom", title: "VP of Sales", portraitKey: "noah" },
  { company: "Solstice Media", industry: "Media", contactName: "Hannah Voss", title: "Marketing Director", portraitKey: "hannah" },
  { company: "Ironclad Insurance", industry: "Insurance", contactName: "Tomas Alvarez", title: "Risk Manager", portraitKey: "tomas" },
  { company: "Meridian Capital", industry: "Financial Services", contactName: "Ines Kowalski", title: "Managing Partner", portraitKey: "ines" },
  { company: "Brightline Analytics", industry: "Software", contactName: "Zara Whitfield", title: "Head of Data", portraitKey: "zara" },
  { company: "Harbor and Co", industry: "Professional Services", contactName: "Leon Petrov", title: "Operations Director", portraitKey: "leon" },
  { company: "Fernwood Realty", industry: "Real Estate", contactName: "Yusuf Idris", title: "VP of Development", portraitKey: "yusuf" },
  { company: "Cobalt Robotics", industry: "Robotics", contactName: "Clara Jansen", title: "Chief Technology Officer", portraitKey: "clara" },
  { company: "Lumen Outdoor", industry: "Consumer Goods", contactName: "Ethan Reyes", title: "Purchasing Lead", portraitKey: "ethan" },
  { company: "Third Wave Foods", industry: "Food and Beverage", contactName: "Maya Solberg", title: "VP of Supply Chain", portraitKey: "maya" },
  { company: "Anchor Point Logistics", industry: "Logistics", contactName: "Aisha Rahman", title: "Logistics Director", portraitKey: "aisha" },
  { company: "Silverline Consulting", industry: "Consulting", contactName: "Priya Malhotra", title: "Engagement Manager", portraitKey: "priya" },
  { company: "Kestrel Aerospace", industry: "Aerospace", contactName: "Marcus Delaney", title: "Procurement Lead", portraitKey: "marcus" },
  { company: "Rowan Digital", industry: "Marketing", contactName: "Lena Fairweather", title: "Head of Brand", portraitKey: "lena" },
  { company: "Pinnacle Freight", industry: "Logistics", contactName: "Omar Siddiqui", title: "VP of Operations", portraitKey: "omar" },
  { company: "Glasswing Studio", industry: "Design", contactName: "Grace Anholt", title: "Creative Director", portraitKey: "grace" },
  { company: "Amberfield Energy", industry: "Energy", contactName: "Felix Norgaard", title: "Sustainability Lead", portraitKey: "felix" },
  { company: "Cinderpath Robotics", industry: "Robotics", contactName: "Sofia Byrne", title: "VP of Engineering", portraitKey: "sofia" },
  { company: "Thornbury Legal", industry: "Legal Services", contactName: "Ravi Deshpande", title: "Managing Associate", portraitKey: "ravi" },
  { company: "Wavecrest Hospitality", industry: "Hospitality", contactName: "Noah Fitzgerald", title: "Director of Operations", portraitKey: "noah" },
]

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

export const contacts: Contact[] = companySeeds.map((seed, index) => ({
  id: `contact-${index + 1}`,
  name: seed.contactName,
  title: seed.title,
  company: seed.company,
  email: `${toSlug(seed.contactName.split(" ")[0])}.${toSlug(seed.contactName.split(" ")[1])}@${toSlug(seed.company)}.com`,
  phone: `(${400 + index}) 555 ${String(1000 + index * 7).slice(0, 4)}`,
  avatar: portrait(seed.portraitKey),
}))

export const contactById = new Map(contacts.map((c) => [c.id, c]))
