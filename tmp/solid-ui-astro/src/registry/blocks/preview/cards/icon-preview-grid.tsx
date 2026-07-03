import { For } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { Card, CardContent } from "~/registry/ui/card"

const previewIcons = [
  ["CopyIcon", "IconCopy"],
  ["CircleAlertIcon", "IconExclamationCircle"],
  ["TrashIcon", "IconTrash"],
  ["ShareIcon", "IconShare"],
  ["ShoppingBagIcon", "IconShoppingBag"],
  ["MoreHorizontalIcon", "IconDots"],
  ["Loader2Icon", "IconLoader"],
  ["PlusIcon", "IconPlus"],
  ["MinusIcon", "IconMinus"],
  ["ArrowLeftIcon", "IconArrowLeft"],
  ["ArrowRightIcon", "IconArrowRight"],
  ["CheckIcon", "IconCheck"],
  ["ChevronDownIcon", "IconChevronDown"],
  ["ChevronRightIcon", "IconChevronRight"],
  ["SearchIcon", "IconSearch"],
  ["SettingsIcon", "IconSettings"]
] as const

export function IconPreviewGrid() {
  return (
    <Card>
      <CardContent>
        <div class="grid grid-cols-8 place-items-center gap-4">
          <For each={previewIcons}>
            {(icon) => (
              <div class="flex size-8 items-center justify-center rounded-md ring ring-border *:[svg]:size-4">
                <IconPlaceholder lucide={icon[0]} tabler={icon[1]} />
              </div>
            )}
          </For>
        </div>
      </CardContent>
    </Card>
  )
}
