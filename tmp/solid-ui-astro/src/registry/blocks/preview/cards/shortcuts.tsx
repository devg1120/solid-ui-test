import { For } from "solid-js"

import { Card, CardContent } from "~/registry/ui/card"
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle
} from "~/registry/ui/item"
import { Kbd } from "~/registry/ui/kbd"

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] }
] as const

export function Shortcuts() {
  return (
    <Card>
      <CardContent>
        <div class="flex flex-col gap-3">
          <div class="text-sm font-medium">Shortcuts</div>
          <ItemGroup class="gap-2 text-muted-foreground" data-size="xs">
            <For each={shortcuts}>
              {(shortcut, index) => (
                <>
                  {index() > 0 ? <ItemSeparator /> : null}
                  <Item variant="default" size="xs" class="border-0 px-0 py-0">
                    <ItemHeader>
                      <ItemTitle class="font-normal">{shortcut.label}</ItemTitle>
                      <ItemActions>
                        <div class="flex gap-1">
                          <For each={shortcut.keys}>{(key) => <Kbd>{key}</Kbd>}</For>
                        </div>
                      </ItemActions>
                    </ItemHeader>
                  </Item>
                </>
              )}
            </For>
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  )
}
