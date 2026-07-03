import { DocsColorModeProvider } from "~/lib/docs-color-mode"
import { Toaster } from "~/registry/ui/sonner"

export default function SiteToaster() {
  return (
    <DocsColorModeProvider>
      <Toaster />
    </DocsColorModeProvider>
  )
}
