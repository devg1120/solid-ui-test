import { createSignal } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "~/registry/ui/alert-dialog"
import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import { Card, CardContent } from "~/registry/ui/card"
import { Checkbox } from "~/registry/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"
import { Field, FieldGroup } from "~/registry/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from "~/registry/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "~/registry/ui/item"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"
import { Slider } from "~/registry/ui/slider"
import { Switch } from "~/registry/ui/switch"
import { Textarea } from "~/registry/ui/textarea"

export function UIElements() {
  const [sliderValue, setSliderValue] = createSignal([500])

  return (
    <Card class="w-full">
      <CardContent class="flex flex-col gap-6">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <Button>Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Two-factor authentication</ItemTitle>
              <ItemDescription class="text-pretty xl:hidden 2xl:block">
                Verify via email or phone number.
              </ItemDescription>
            </ItemContent>
            <ItemActions class="hidden md:flex">
              <Button size="sm" variant="secondary">
                Enable
              </Button>
            </ItemActions>
          </Item>
        </div>
        <Slider
          value={sliderValue()}
          onChange={(value) => setSliderValue(Array.isArray(value) ? [...value] : [value])}
          max={1000}
          min={0}
          step={10}
          class="flex-1"
          aria-label="Slider"
        />
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field class="flex-1">
            <Textarea placeholder="Message" class="resize-none" />
          </Field>
        </FieldGroup>
        <div class="flex items-center gap-2">
          <div class="flex gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup defaultValue="apple" class="ml-auto flex w-fit gap-3">
            <RadioGroupItem value="apple" />
            <RadioGroupItem value="banana" />
          </RadioGroup>
          <div class="flex gap-3">
            <Checkbox defaultChecked />
            <Checkbox />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger as={Button} variant="outline">
              <span class="hidden md:block">Alert Dialog</span>
              <span class="block md:hidden">Dialog</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this device and your data?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don't allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonGroup>
            <Button variant="outline">Button Group</Button>
            <DropdownMenu>
              <DropdownMenuTrigger as={Button} variant="outline" size="icon" class="">
                <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                  <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">Delete Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Switch defaultChecked class="ml-auto" />
        </div>
      </CardContent>
    </Card>
  )
}
