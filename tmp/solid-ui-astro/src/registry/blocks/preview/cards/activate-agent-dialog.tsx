import { For } from "solid-js"

import { IconPlaceholder } from "~/components/icon-placeholder"
import { Alert, AlertDescription } from "~/registry/ui/alert"
import { Badge } from "~/registry/ui/badge"
import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "~/registry/ui/item"

const agentFeatures = [
  {
    id: "code-reviews",
    parts: ["Code reviews", " with full codebase context to catch ", "hard-to-find", " bugs."]
  },
  {
    id: "code-suggestions",
    parts: ["Code suggestions", " validated in sandboxes before you merge."]
  },
  {
    id: "root-cause",
    parts: ["Root-cause analysis", " for production issues with deployment context."]
  }
]

export function ActivateAgentDialog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship faster & safer with Vercel Agent</CardTitle>
        <CardDescription>
          Your use is subject to Vercel's <a href="#beta">Public Beta Agreement</a> and{" "}
          <a href="#ai-terms">AI Product Terms</a>.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <ItemGroup class="gap-0">
          <For each={agentFeatures}>
            {(feature) => (
              <Item size="xs" class="px-0">
                <ItemMedia variant="icon" class="self-start">
                  <IconPlaceholder
                    lucide="CheckCircle2Icon"
                    tabler="IconCircleCheckFilled"
                    class="size-5 fill-primary text-primary-foreground"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle class="inline leading-relaxed font-normal text-muted-foreground">
                    <strong class="font-medium text-foreground">{feature.parts[0]}</strong>
                    {feature.parts[1]}
                    {feature.parts[2] ? (
                      <strong class="font-medium text-foreground">{feature.parts[2]}</strong>
                    ) : null}
                    {feature.parts[3] ?? null}
                    {feature.id === "root-cause" ? (
                      <>
                        <span> </span>
                        <Badge variant="secondary" class="bg-chart-1 text-chart-5">
                          Requires Observability Plus
                        </Badge>
                      </>
                    ) : null}
                  </ItemTitle>
                </ItemContent>
              </Item>
            )}
          </For>
        </ItemGroup>
        <Alert>
          <AlertDescription>
            Pro teams get $100 in Vercel Agent trial credit for 2 weeks after activation.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter class="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Enable with $100 credits</Button>
      </CardFooter>
    </Card>
  )
}
