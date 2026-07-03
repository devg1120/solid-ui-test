import { createMemo, createSignal } from "solid-js"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Slider } from "~/registry/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "~/registry/ui/toggle-group"

export function RollerShades() {
  const [position, setPosition] = createSignal<number[]>([50])

  const preset = createMemo(() =>
    position()[0] <= 10 ? "open" : position()[0] >= 90 ? "closed" : "half"
  )

  const setPreset = (value: string | null) => {
    if (value === "open") setPosition([0])
    if (value === "half") setPosition([50])
    if (value === "closed") setPosition([100])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Living Room</CardTitle>
        <CardDescription>Roller Shades</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex h-32 flex-col overflow-hidden rounded-lg border bg-muted">
          <div
            class="bg-muted-foreground transition-all duration-300"
            style={{ height: `${position()[0]}%` }}
          />
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Open
          </span>
          <Slider value={position()} onChange={setPosition} max={100} class="flex-1" />
          <span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Close
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          value={preset()}
          onChange={setPreset}
          variant="outline"
          spacing={1}
          class="w-full"
        >
          <ToggleGroupItem value="open" class="flex-1">
            Open
          </ToggleGroupItem>
          <ToggleGroupItem value="half" class="flex-1">
            Half
          </ToggleGroupItem>
          <ToggleGroupItem value="closed" class="flex-1">
            Closed
          </ToggleGroupItem>
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}
