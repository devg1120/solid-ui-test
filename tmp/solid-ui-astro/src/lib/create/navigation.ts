import { Index } from "~/registry/__index__"

export type CreateNavigationGroup = "Previews" | "Components"

export type CreateNavigationItem = {
  label: string
  value: string
  group: CreateNavigationGroup
}

const V1_CREATE_NAVIGATION_ITEMS = [
  { label: "Preview 01", value: "preview-02", group: "Previews" },
  { label: "Preview 02", value: "preview", group: "Previews" },
  { label: "Field", value: "field-example", group: "Components" },
  { label: "Item", value: "item-example", group: "Components" }
] as const satisfies readonly CreateNavigationItem[]

export async function getCreateNavigationItems(): Promise<CreateNavigationItem[]> {
  return V1_CREATE_NAVIGATION_ITEMS.filter((item) => Boolean(Index[item.value])).map((item) => ({
    label: item.label,
    value: item.value,
    group: item.group
  }))
}
