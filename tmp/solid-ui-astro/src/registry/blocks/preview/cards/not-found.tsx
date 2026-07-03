import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Card, CardContent } from "~/registry/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "~/registry/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"
import { Kbd } from "~/registry/ui/kbd"

export function NotFound() {
  return (
    <Card>
      <CardContent>
        <Empty class="h-72">
          <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>
              The page you're looking for doesn't exist. Try searching for what you need below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <InputGroup class="w-3/4">
              <InputGroupInput placeholder="Try searching for pages..." />
              <InputGroupAddon>
                <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Button variant="link">Go to homepage</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
