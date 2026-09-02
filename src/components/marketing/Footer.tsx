import { Link } from "react-router-dom"
import { Logo } from "@/components/Logo"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Sign in", to: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact sales", to: "/login" },
    ],
  },
  {
    title: "Dashboards",
    links: [
      { label: "Admin overview", to: "/admin" },
      { label: "Sales rep workspace", to: "/rep" },
      { label: "Customer portal", to: "/portal" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <Link to="/">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Nudge watches every open deal in your CRM, drafts a personal message the moment one goes quiet, and
              sends it once a person approves it or your rules say it is safe to go.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Nudge. A product demo built for illustration purposes.</p>
          <p>Every screen in this demo uses sample data.</p>
        </div>
      </div>
    </footer>
  )
}
