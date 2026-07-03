import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  EllipsisIcon,
  ListFilterIcon,
  MailCheckIcon,
  TagIcon,
  Trash2Icon
} from "lucide-solid"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function ButtonGroupDemo() {
  const [label, setLabel] = createSignal("personal")

  return (
    <ButtonGroup>
      <ButtonGroup class="hidden sm:flex">
        <Button aria-label="Go Back" size="icon-sm" variant="outline">
          <ArrowLeftIcon class="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Archive
        </Button>
        <Button size="sm" variant="outline">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="outline">
          Snooze
        </Button>
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={Button<"button">}
            aria-label="More Options"
            size="icon-sm"
            variant="outline"
          >
            <EllipsisIcon class="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon class="size-4" />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon class="size-4" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon class="size-4" />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon class="size-4" />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterIcon class="size-4" />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon class="size-4" />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup onChange={setLabel} value={label()}>
                    <DropdownMenuRadioItem value="personal">Personal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon class="size-4" />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
