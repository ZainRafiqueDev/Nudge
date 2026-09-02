import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { AppRouter } from "@/router"

function App() {
  return (
    <TooltipProvider>
      <AppRouter />
      <Toaster position="bottom-right" />
    </TooltipProvider>
  )
}

export default App
