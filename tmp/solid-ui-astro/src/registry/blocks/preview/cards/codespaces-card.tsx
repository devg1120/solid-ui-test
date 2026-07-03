import { createSignal, onCleanup } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Card, CardContent } from "~/registry/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "~/registry/ui/empty"
import { Field, FieldDescription, FieldLabel } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from "~/registry/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "~/registry/ui/item"
import { Separator } from "~/registry/ui/separator"
import { Spinner } from "~/registry/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

export function CodespacesCard() {
  const [isCreatingCodespace, setIsCreatingCodespace] = createSignal(false)
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  onCleanup(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="codespaces">
          <TabsList class="w-full">
            <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
            <TabsTrigger value="local">Local</TabsTrigger>
          </TabsList>
          <TabsContent value="codespaces">
            <Item size="sm" class="px-1 pt-2">
              <ItemContent>
                <ItemTitle>Codespaces</ItemTitle>
                <ItemDescription>Your workspaces in the cloud</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Tooltip>
                  <TooltipTrigger as={Button} variant="ghost" size="icon-sm">
                    <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" />
                  </TooltipTrigger>
                  <TooltipContent>Create a codespace on main</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger as={Button} variant="ghost" size="icon-sm" class="">
                    <IconPlaceholder lucide="MoreHorizontalIcon" tabler="IconDots" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" />
                        New with options...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="ContainerIcon" tabler="IconBox" />
                        Configure dev container
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="ZapIcon" tabler="IconBolt" />
                        Set up prebuilds
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="ServerIcon" tabler="IconServer" />
                        Manage codespaces
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="ShareIcon" tabler="IconShare2" />
                        Share deep link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder lucide="InfoIcon" tabler="IconInfoCircle" />
                        What are codespaces?
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ItemActions>
            </Item>
            <Separator class="-mx-2 my-2 w-auto!" />
            <Empty class="p-4">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <IconPlaceholder lucide="ServerIcon" tabler="IconServer" />
                </EmptyMedia>
                <EmptyTitle>No codespaces</EmptyTitle>
                <EmptyDescription>
                  You don't have any codespaces with this repository checked out
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreatingCodespace(true)
                    timeoutId = setTimeout(() => setIsCreatingCodespace(false), 2000)
                  }}
                  disabled={isCreatingCodespace()}
                >
                  {isCreatingCodespace() ? <Spinner data-icon="inline-start" /> : null}
                  Create Codespace
                </Button>
                <a
                  href="#learn-more"
                  class="text-xs text-muted-foreground underline underline-offset-4"
                >
                  Learn more about codespaces
                </a>
              </EmptyContent>
            </Empty>
            <Separator class="-mx-2 my-2 w-auto!" />
            <div class="p-1.5 text-xs text-muted-foreground">
              Codespace usage for this repository is paid for by{" "}
              <span class="font-medium">shadcn</span>.
            </div>
          </TabsContent>
          <TabsContent value="local">
            <Tabs defaultValue="https">
              <TabsList variant="line" class="w-full justify-start border-b *:[button]:flex-0">
                <TabsTrigger value="https">HTTPS</TabsTrigger>
                <TabsTrigger value="ssh">SSH</TabsTrigger>
                <TabsTrigger value="cli">GitHub CLI</TabsTrigger>
              </TabsList>
              <div class="rounded-md border bg-muted/30 p-2">
                <TabsContent value="https">
                  <Field class="gap-2">
                    <FieldLabel for="https-url" class="sr-only">
                      HTTPS URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="https-url"
                        value="https://github.com/shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>Clone using the web URL.</FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent value="ssh">
                  <Field class="gap-2">
                    <FieldLabel for="ssh-url" class="sr-only">
                      SSH URL
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="ssh-url"
                        value="git@github.com:shadcn-ui/ui.git"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>Use a password-protected SSH key.</FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent value="cli">
                  <Field class="gap-2">
                    <FieldLabel for="cli-command" class="sr-only">
                      CLI Command
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <IconPlaceholder lucide="CopyIcon" tabler="IconCopy" />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="cli-command"
                        value="gh repo clone shadcn-ui/ui"
                        readOnly
                      />
                    </InputGroup>
                    <FieldDescription>
                      Work fast with our official CLI. <a href="#learn-more">Learn more</a>
                    </FieldDescription>
                  </Field>
                </TabsContent>
              </div>
            </Tabs>
            <Separator class="-mx-2 my-2 w-auto!" />
            <div class="flex flex-col">
              <Button variant="ghost" size="sm" class="justify-start gap-1.5">
                <IconPlaceholder
                  lucide="MonitorIcon"
                  tabler="IconDeviceDesktop"
                  data-icon="inline-start"
                />
                Open with GitHub Desktop
              </Button>
              <Button variant="ghost" size="sm" class="justify-start gap-1.5">
                <IconPlaceholder
                  lucide="DownloadIcon"
                  tabler="IconDownload"
                  data-icon="inline-start"
                />
                Download ZIP
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
