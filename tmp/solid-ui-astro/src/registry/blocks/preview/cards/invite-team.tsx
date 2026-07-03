import { For } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Field, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"
import { Separator } from "~/registry/ui/separator"

const invites = [
  { email: "alex@example.com", role: "editor" },
  { email: "sam@example.com", role: "viewer" }
]

export function InviteTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team</CardTitle>
        <CardDescription>Add members to your workspace</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-3">
          <For each={invites}>
            {(invite) => (
              <div class="flex items-center gap-2">
                <Input value={invite.email} class="flex-1" />
                <NativeSelect class="w-24">
                  <NativeSelectOption value="admin" selected={invite.role === "admin"}>
                    Admin
                  </NativeSelectOption>
                  <NativeSelectOption value="editor" selected={invite.role === "editor"}>
                    Editor
                  </NativeSelectOption>
                  <NativeSelectOption value="viewer" selected={invite.role === "viewer"}>
                    Viewer
                  </NativeSelectOption>
                </NativeSelect>
              </div>
            )}
          </For>
        </div>
        <Button variant="outline">
          <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" data-icon="inline-start" />
          Add another
        </Button>
        <Separator />
        <Field>
          <FieldLabel for="invite-link">Or share invite link</FieldLabel>
          <InputGroup>
            <InputGroupInput id="invite-link" value="https://app.co/invite/x8f2k" readOnly />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy link">
                <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Send Invites</Button>
      </CardFooter>
    </Card>
  )
}
