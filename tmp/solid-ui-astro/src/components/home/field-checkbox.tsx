import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldLabel } from "~/registry/ui/field"

export default function FieldCheckbox() {
  return (
    <FieldLabel for="checkbox-demo">
      <Field orientation="horizontal">
        <Checkbox defaultChecked id="checkbox-demo" />
        <FieldLabel class="line-clamp-1" for="checkbox-demo">
          I agree to the terms and conditions
        </FieldLabel>
      </Field>
    </FieldLabel>
  )
}
