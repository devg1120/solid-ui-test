import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "~/registry/ui/card"
import { Item } from "~/registry/ui/item"
import { Label } from "~/registry/ui/label"

export function CoverArt() {
  return (
    <Card>
      <CardContent class="flex flex-col gap-3">
        <Label
          for="cover-art"
          class="text-center text-xs font-normal tracking-wider text-muted-foreground uppercase"
        >
          Cover Art
        </Label>
        <Item class="aspect-square" variant="outline">
          <label for="cover-art" class="flex size-full cursor-pointer items-center justify-center">
            <IconPlaceholder
              lucide="ImageIcon"
              tabler="IconPhoto"
              class="size-10 text-muted-foreground/50"
            />
          </label>
        </Item>
        <input id="cover-art" type="file" accept="image/jpeg,image/png" class="sr-only" />
      </CardContent>
      <CardFooter class="flex-col gap-2">
        <Button as="label" for="cover-art" variant="secondary" class="w-full cursor-pointer">
          Upload Artwork
        </Button>
        <CardDescription class="text-center text-xs">
          Minimum 3000 x 3000px
          <br />
          JPEG or PNG only
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
