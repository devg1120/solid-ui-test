import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-solidjs"
import { ArrowUpIcon, SearchIcon } from "lucide-solid"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea
} from "~/registry/ui/input-group"
import { Separator } from "~/registry/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export default function InputGroupDemo() {
  return (
    <div class="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon class="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput class="pl-1!" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              as={InputGroupButton}
              aria-label="Info"
              class="rounded-full"
              size="icon-xs"
            >
              <IconInfoCircle class="size-4" />
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton aria-label="Add" class="rounded-full" size="icon-xs" variant="outline">
            <IconPlus class="size-4" />
          </InputGroupButton>
          <DropdownMenu placement="top-start">
            <DropdownMenuTrigger as={InputGroupButton} variant="ghost">
              Auto
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText class="ml-auto">52% used</InputGroupText>
          <Separator class="h-4!" orientation="vertical" />
          <InputGroupButton class="rounded-full" size="icon-xs" variant="default">
            <ArrowUpIcon class="size-4" />
            <span class="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="@stefan-karger" />
        <InputGroupAddon align="inline-end">
          <div class="flex size-4 items-center justify-center rounded-full bg-primary text-foreground">
            <IconCheck class="size-3 text-background" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
