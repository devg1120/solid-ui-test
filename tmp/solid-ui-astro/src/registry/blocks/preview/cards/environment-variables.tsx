import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"

const variables = [
  { key: "DATABASE_URL", masked: true },
  { key: "NEXT_PUBLIC_API", masked: false },
  { key: "STRIPE_SECRET", masked: true }
]

export function EnvironmentVariables() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-2">
        <For each={variables}>
          {(env) => (
            <div class="flex items-center gap-2 rounded-md px-2.5 py-2 font-mono text-xs ring ring-border">
              <span class="font-medium">{env.key}</span>
              <span class="ml-auto text-muted-foreground">
                {env.masked ? "••••••••" : "https://api.example.com"}
              </span>
            </div>
          )}
        </For>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit</Button>
        <Button class="ml-auto">Deploy</Button>
      </CardFooter>
    </Card>
  )
}
