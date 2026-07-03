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

export default function BlocksInConstruction() {
  return (
    <Empty class="mx-auto max-w-xl">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Construction />
        </EmptyMedia>
        <EmptyTitle>Blocks library under construction</EmptyTitle>
        <EmptyDescription>
          The block collection is still being ported. Component docs and registry examples are
          available now, and the larger page-level patterns will land here next.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent class="gap-3">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Button as="a" href="/docs/components">
            Back to Components
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
