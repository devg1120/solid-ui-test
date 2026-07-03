import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
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

const MIN_GOAL = 200
const MAX_GOAL = 400

export default function DrawerDemo() {
  const [goal, setGoal] = createSignal(350)

  const updateGoal = (adjustment: number) => {
    setGoal((value) => Math.max(MIN_GOAL, Math.min(MAX_GOAL, value + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger as={Button} variant="outline">
        Open Drawer
      </DrawerTrigger>
      <DrawerContent>
        <div class="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div class="space-y-4 px-4 pb-2">
            <div class="flex items-center justify-center gap-2">
              <Button
                class="rounded-full"
                disabled={goal() <= MIN_GOAL}
                onClick={() => updateGoal(-10)}
                size="icon-sm"
                variant="outline"
              >
                -<span class="sr-only">Decrease goal</span>
              </Button>
              <div class="flex-1 text-center">
                <div class="text-5xl font-semibold tracking-tight">{goal()}</div>
                <div class="text-[0.7rem] text-muted-foreground uppercase">Calories/day</div>
              </div>
              <Button
                class="rounded-full"
                disabled={goal() >= MAX_GOAL}
                onClick={() => updateGoal(10)}
                size="icon-sm"
                variant="outline"
              >
                +<span class="sr-only">Increase goal</span>
              </Button>
            </div>
            <p class="text-center text-xs leading-relaxed text-muted-foreground">
              Small daily increments are easier to maintain over time.
            </p>
          </div>
          <DrawerFooter>
            <Button>Save goal</Button>
            <DrawerClose as={Button} variant="outline">
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
