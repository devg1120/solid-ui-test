import { toast } from "solid-sonner"

import { Button } from "~/registry/ui/button"

export default function SonnerDescription() {
  return (
    <Button
      class="w-fit"
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm"
        })
      }
    >
      Show Toast
    </Button>
  )
}
