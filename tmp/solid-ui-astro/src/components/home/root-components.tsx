import AppearanceSettings from "~/components/home/appearance-settings"
import ButtonGroupDemo from "~/components/home/button-group-demo"
import ButtonGroupInputGroup from "~/components/home/button-group-input-group"
import ButtonGroupNested from "~/components/home/button-group-nested"
import ButtonGroupPopover from "~/components/home/button-group-popover"
import EmptyAvatarGroup from "~/components/home/empty-avatar-group"
import FieldCheckbox from "~/components/home/field-checkbox"
import FieldDemo from "~/components/home/field-demo"
import FieldHear from "~/components/home/field-hear"
import FieldSlider from "~/components/home/field-slider"
import InputGroupButton from "~/components/home/input-group-button"
import InputGroupDemo from "~/components/home/input-group-demo"
import ItemDemo from "~/components/home/item-demo"
import NotionPromptForm from "~/components/home/notion-prompt-form"
import SpinnerBadge from "~/components/home/spinner-badge"
import SpinnerEmpty from "~/components/home/spinner-empty"
import { FieldSeparator } from "~/registry/ui/field"

export default function RootComponents() {
  return (
    <div class="mx-auto grid gap-8 py-1 theme-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
      <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <FieldDemo />
      </div>
      <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <EmptyAvatarGroup />
        <SpinnerBadge />
        <ButtonGroupInputGroup />
        <FieldSlider />
        <InputGroupDemo />
      </div>
      <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
        <InputGroupButton />
        <ItemDemo />
        <FieldSeparator class="my-4">Appearance Settings</FieldSeparator>
        <AppearanceSettings />
      </div>
      <div class="order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex *:[div]:w-full *:[div]:max-w-full">
        <NotionPromptForm />
        <ButtonGroupDemo />
        <FieldCheckbox />
        <div class="flex justify-between gap-4">
          <ButtonGroupNested />
          <ButtonGroupPopover />
        </div>
        <FieldHear />
        <SpinnerEmpty />
      </div>
    </div>
  )
}
