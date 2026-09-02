import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PageLoader } from "@/components/PageLoader"
import { MarketingLayout } from "@/layouts/MarketingLayout"
import { AdminLayout } from "@/layouts/AdminLayout"
import { RepLayout } from "@/layouts/RepLayout"
import { PortalLayout } from "@/layouts/PortalLayout"
import { RequireRole } from "@/layouts/RequireRole"

const Home = lazy(() => import("@/pages/marketing/Home").then((m) => ({ default: m.Home })))
const Features = lazy(() => import("@/pages/marketing/Features").then((m) => ({ default: m.Features })))
const Pricing = lazy(() => import("@/pages/marketing/Pricing").then((m) => ({ default: m.Pricing })))
const About = lazy(() => import("@/pages/marketing/About").then((m) => ({ default: m.About })))
const Login = lazy(() => import("@/pages/marketing/Login").then((m) => ({ default: m.Login })))

const AdminOverview = lazy(() => import("@/pages/admin/Overview").then((m) => ({ default: m.AdminOverview })))
const AdminDealMonitor = lazy(() => import("@/pages/admin/DealMonitor").then((m) => ({ default: m.AdminDealMonitor })))
const AdminAutomationRules = lazy(() => import("@/pages/admin/AutomationRules").then((m) => ({ default: m.AdminAutomationRules })))
const AdminApprovalQueue = lazy(() => import("@/pages/admin/ApprovalQueue").then((m) => ({ default: m.AdminApprovalQueue })))
const AdminTeam = lazy(() => import("@/pages/admin/Team").then((m) => ({ default: m.AdminTeam })))
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics").then((m) => ({ default: m.AdminAnalytics })))
const AdminSettings = lazy(() => import("@/pages/admin/Settings").then((m) => ({ default: m.AdminSettings })))

const RepOverview = lazy(() => import("@/pages/rep/Overview").then((m) => ({ default: m.RepOverview })))
const RepPipeline = lazy(() => import("@/pages/rep/Pipeline").then((m) => ({ default: m.RepPipeline })))
const RepDrafts = lazy(() => import("@/pages/rep/Drafts").then((m) => ({ default: m.RepDrafts })))
const RepDealDetail = lazy(() => import("@/pages/rep/DealDetail").then((m) => ({ default: m.RepDealDetail })))
const RepHistory = lazy(() => import("@/pages/rep/History").then((m) => ({ default: m.RepHistory })))
const RepSettings = lazy(() => import("@/pages/rep/Settings").then((m) => ({ default: m.RepSettings })))

const PortalOverview = lazy(() => import("@/pages/portal/Overview").then((m) => ({ default: m.PortalOverview })))
const PortalMyDeals = lazy(() => import("@/pages/portal/MyDeals").then((m) => ({ default: m.PortalMyDeals })))
const PortalMessages = lazy(() => import("@/pages/portal/Messages").then((m) => ({ default: m.PortalMessages })))
const PortalProfile = lazy(() => import("@/pages/portal/Profile").then((m) => ({ default: m.PortalProfile })))

const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: withSuspense(<Home />) },
      { path: "/features", element: withSuspense(<Features />) },
      { path: "/pricing", element: withSuspense(<Pricing />) },
      { path: "/about", element: withSuspense(<About />) },
      { path: "/login", element: withSuspense(<Login />) },
    ],
  },
  {
    path: "/admin",
    element: (
      <RequireRole role="admin">
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      { index: true, element: withSuspense(<AdminOverview />) },
      { path: "deals", element: withSuspense(<AdminDealMonitor />) },
      { path: "rules", element: withSuspense(<AdminAutomationRules />) },
      { path: "approvals", element: withSuspense(<AdminApprovalQueue />) },
      { path: "team", element: withSuspense(<AdminTeam />) },
      { path: "analytics", element: withSuspense(<AdminAnalytics />) },
      { path: "settings", element: withSuspense(<AdminSettings />) },
    ],
  },
  {
    path: "/rep",
    element: (
      <RequireRole role="rep">
        <RepLayout />
      </RequireRole>
    ),
    children: [
      { index: true, element: withSuspense(<RepOverview />) },
      { path: "pipeline", element: withSuspense(<RepPipeline />) },
      { path: "drafts", element: withSuspense(<RepDrafts />) },
      { path: "deals/:dealId", element: withSuspense(<RepDealDetail />) },
      { path: "history", element: withSuspense(<RepHistory />) },
      { path: "settings", element: withSuspense(<RepSettings />) },
    ],
  },
  {
    path: "/portal",
    element: (
      <RequireRole role="customer">
        <PortalLayout />
      </RequireRole>
    ),
    children: [
      { index: true, element: withSuspense(<PortalOverview />) },
      { path: "deals", element: withSuspense(<PortalMyDeals />) },
      { path: "messages", element: withSuspense(<PortalMessages />) },
      { path: "profile", element: withSuspense(<PortalProfile />) },
    ],
  },
  { path: "*", element: withSuspense(<NotFound />) },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
