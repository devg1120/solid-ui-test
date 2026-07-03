import { ArrowLeftIcon, ArrowRightIcon } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"

export default function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          1
        </Button>
        <Button size="sm" variant="outline">
          2
        </Button>
        <Button size="sm" variant="outline">
          3
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Previous" size="icon-sm" variant="outline">
          <ArrowLeftIcon class="size-4" />
        </Button>
        <Button aria-label="Next" size="icon-sm" variant="outline">
          <ArrowRightIcon class="size-4" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
