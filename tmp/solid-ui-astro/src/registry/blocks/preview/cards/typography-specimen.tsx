import { createMemo } from "solid-js"

import { useDesignSystem } from "~/hooks/use-design-system"
import { FONTS } from "~/lib/create/config"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardFooter } from "~/registry/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/registry/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"
import { Textarea } from "~/registry/ui/textarea"

export function TypographySpecimen() {
  const design = useDesignSystem()
  const currentFont = createMemo(() => FONTS.find((font) => font.value === design.font()))
  const currentHeadingFont = createMemo(() =>
    FONTS.find((font) => font.value === design.fontHeading())
  )
  const headingLabel = createMemo(() => {
    const headingFont = currentHeadingFont()?.name
    return headingFont && headingFont !== currentFont()?.name ? headingFont : "Inherit"
  })

  return (
    <Card>
      <CardContent class="flex flex-col gap-2">
        <div class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {headingLabel()} - {currentFont()?.name ?? "Default"}
        </div>
        <p class="cn-font-heading text-2xl font-medium">Designing with rhythm and hierarchy.</p>
        <p class="text-sm leading-relaxed text-muted-foreground">
          A strong body style keeps long-form content readable and balances the visual weight of
          headings.
        </p>
        <p class="text-sm leading-relaxed text-muted-foreground">
          Thoughtful spacing and cadence help paragraphs scan quickly without feeling dense.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger as={Button} variant="outline" class="w-full">
            Share Feedback
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Feedback</DialogTitle>
              <DialogDescription>Let us know how we can improve your experience.</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <div class="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel for="feedback-name">Name</FieldLabel>
                  <Input id="feedback-name" placeholder="Your name" />
                </Field>
                <Field>
                  <FieldLabel for="feedback-email">Email</FieldLabel>
                  <Input id="feedback-email" type="email" placeholder="you@example.com" />
                </Field>
              </div>
              <Field>
                <FieldLabel for="feedback-category">Category</FieldLabel>
                <NativeSelect id="feedback-category">
                  <NativeSelectOption value="general">General</NativeSelectOption>
                  <NativeSelectOption value="bug">Bug Report</NativeSelectOption>
                  <NativeSelectOption value="feature">Feature Request</NativeSelectOption>
                  <NativeSelectOption value="improvement">Improvement</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel for="feedback-message">Message</FieldLabel>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us what's on your mind..."
                  class="min-h-24 resize-none"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose as={Button} variant="outline">
                Cancel
              </DialogClose>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
