import { IconPlaceholder } from "~/components/icon-placeholder"
import { Button } from "~/registry/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/registry/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/registry/ui/input-group"

export function SocialLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="spotify-url">Spotify Artist URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder lucide="CirclePlusIcon" tabler="IconCirclePlus" />
              </InputGroupAddon>
              <InputGroupInput id="spotify-url" value="spotify.com/artist/3j...2k" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="instagram-handle">Instagram Handle</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder lucide="CameraIcon" tabler="IconCamera" />
              </InputGroupAddon>
              <InputGroupInput id="instagram-handle" value="@julianduryea_music" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="soundcloud-url">SoundCloud URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder lucide="CloudIcon" tabler="IconCloud" />
              </InputGroupAddon>
              <InputGroupInput id="soundcloud-url" placeholder="soundcloud.com/username" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="website-url">Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <IconPlaceholder lucide="GlobeIcon" tabler="IconWorld" />
              </InputGroupAddon>
              <InputGroupInput id="website-url" placeholder="https://yoursite.com" />
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter class="justify-end gap-2">
        <Button variant="secondary">Discard</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
