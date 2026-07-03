import { Construction } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"

export default function CreateInConstruction() {
  return (
    <Empty class="mx-auto max-w-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Construction />
        </EmptyMedia>
        <EmptyTitle>New Project is under construction</EmptyTitle>
        <EmptyDescription>
          The visual project generator is not ported yet. The landing page button is wired up, and
          the full create flow will land here next.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent class="gap-3">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Button as="a" href="/docs/components">
            View Components
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
