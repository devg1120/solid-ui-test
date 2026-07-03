import {
  createEffect,
  createSignal,
  onCleanup,
  Show,
  splitProps,
  type ComponentProps
} from "solid-js"

import { cn } from "~/lib/utils"
import { Button } from "~/registry/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "~/registry/ui/drawer"
import { Input } from "~/registry/ui/input"
import { Label } from "~/registry/ui/label"

export default function DrawerDialog() {
  const [open, setOpen] = createSignal(false)
  const [isDesktop, setIsDesktop] = createSignal(false)

  createEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    handleChange(mediaQuery)

    onCleanup(() => mediaQuery.removeEventListener("change", handleChange))
  })

  return (
    <Show
      fallback={
        <Drawer onOpenChange={setOpen} open={open()}>
          <DrawerTrigger as={Button} variant="outline">
            Edit Profile
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader class="text-left">
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <ProfileForm class="px-4" />
            <DrawerFooter class="pt-2">
              <DrawerClose as={Button} variant="outline">
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      }
      when={isDesktop()}
    >
      <Dialog onOpenChange={setOpen} open={open()}>
        <DialogTrigger as={Button} variant="outline">
          Edit Profile
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    </Show>
  )
}

function ProfileForm(props: ComponentProps<"form">) {
  const [local, others] = splitProps(props, ["class"])

  return (
    <form
      class={cn("grid items-start gap-6", local.class)}
      onSubmit={(event) => {
        event.preventDefault()
      }}
      {...others}
    >
      <div class="grid gap-3">
        <Label for="drawer-dialog-email">Email</Label>
        <Input id="drawer-dialog-email" type="email" value="shadcn@example.com" />
      </div>
      <div class="grid gap-3">
        <Label for="drawer-dialog-username">Username</Label>
        <Input id="drawer-dialog-username" value="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
