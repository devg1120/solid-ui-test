import { TerminalIcon } from "lucide-solid"
import { createMemo, createSignal, For } from "solid-js"

import { CopyButton } from "~/components/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/registry/ui/tabs"

const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const

type PackageManager = (typeof PACKAGE_MANAGERS)[number]

function isPackageManager(value: string): value is PackageManager {
  return PACKAGE_MANAGERS.includes(value as PackageManager)
}

type CodeBlockCommandProps = {
  __npm__: string
  __yarn__: string
  __pnpm__: string
  __bun__: string
}

export function CodeBlockCommand(props: CodeBlockCommandProps) {
  const [selectedPackageManager, setSelectedPackageManager] = createSignal<PackageManager>("pnpm")

  const commands = createMemo(() => ({
    pnpm: props.__pnpm__,
    npm: props.__npm__,
    yarn: props.__yarn__,
    bun: props.__bun__
  }))

  const selectedCommand = createMemo(() => commands()[selectedPackageManager()])

  const handlePackageManagerChange = (value: string) => {
    if (!isPackageManager(value)) return

    setSelectedPackageManager(value)
  }

  return (
    <div class="overflow-x-auto">
      <Tabs value={selectedPackageManager()} class="gap-0" onChange={handlePackageManagerChange}>
        <div class="flex items-center gap-2 border-b border-border/50 px-3 py-1">
          <div class="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
            <TerminalIcon class="size-3 text-code" />
          </div>
          <TabsList class="rounded-none bg-transparent p-0">
            <For each={PACKAGE_MANAGERS}>
              {(packageManager) => (
                <TabsTrigger
                  value={packageManager}
                  class="h-7 border border-transparent pt-0.5 shadow-none! data-selected:border-input data-selected:bg-background!"
                >
                  {packageManager}
                </TabsTrigger>
              )}
            </For>
          </TabsList>
        </div>
        <div class="no-scrollbar overflow-x-auto">
          <For each={PACKAGE_MANAGERS}>
            {(packageManager) => (
              <TabsContent value={packageManager} class="mt-0 px-4 py-3.5">
                <pre>
                  <code class="relative font-mono text-sm leading-none" data-language="bash">
                    {commands()[packageManager]}
                  </code>
                </pre>
              </TabsContent>
            )}
          </For>
        </div>
      </Tabs>
      <CopyButton class="top-2" value={selectedCommand()} />
    </div>
  )
}
