import type { Customer } from "@/types"
import { contacts } from "@/data/contacts"
import { deals } from "@/data/deals"

const portalContactIds = ["contact-1", "contact-3", "contact-9", "contact-12", "contact-15"]

export const customers: Customer[] = portalContactIds.map((contactId, index) => {
  const contact = contacts.find((c) => c.id === contactId)!
  return {
    id: `customer-${index + 1}`,
    name: contact.name,
    company: contact.company,
    email: contact.email,
    avatar: contact.avatar,
    contactId: contact.id,
  }
})

export const customerById = new Map(customers.map((c) => [c.id, c]))

export function dealsForCustomer(customerId: string) {
  const customer = customerById.get(customerId)
  if (!customer) return []
  return deals.filter((d) => d.contactId === customer.contactId)
}

/** The customer used for the demo "Continue as Customer" login. */
export const demoCustomerId = "customer-2"
