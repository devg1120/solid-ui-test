import { PlusIcon } from "lucide-solid"

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "~/registry/ui/avatar"
import { Button } from "~/registry/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"

export default function EmptyAvatarGroup() {
  return (
    <Empty class="flex-none border py-10">
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup class="grayscale">
            <Avatar>
              <AvatarImage alt="@stefan-karger" src="https://github.com/stefan-karger.png" />
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage alt="@carere" src="https://github.com/carere.png" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage alt="@ryansolid" src="https://github.com/ryansolid.png" />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon class="size-4" />
          Invite Members
        </Button>
      </EmptyContent>
    </Empty>
  )
}
