import { IconGitBranch } from "@tabler/icons-solidjs"

import { Button } from "~/registry/ui/button"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}
