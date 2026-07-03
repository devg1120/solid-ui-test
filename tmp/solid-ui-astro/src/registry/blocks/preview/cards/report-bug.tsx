import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"
import { Textarea } from "~/registry/ui/textarea"

export function ReportBug() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Bug</CardTitle>
        <CardDescription>Help us fix issues faster.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="bug-title">Title</FieldLabel>
            <Input id="bug-title" placeholder="Brief description of the issue" />
          </Field>
          <div class="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel for="bug-severity">Severity</FieldLabel>
              <NativeSelect id="bug-severity" class="w-full">
                <NativeSelectOption value="critical">Critical</NativeSelectOption>
                <NativeSelectOption value="high">High</NativeSelectOption>
                <NativeSelectOption value="medium" selected>
                  Medium
                </NativeSelectOption>
                <NativeSelectOption value="low">Low</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel for="bug-component">Component</FieldLabel>
              <NativeSelect id="bug-component" class="w-full">
                <NativeSelectOption value="dashboard" selected>
                  Dashboard
                </NativeSelectOption>
                <NativeSelectOption value="auth">Auth</NativeSelectOption>
                <NativeSelectOption value="api">API</NativeSelectOption>
                <NativeSelectOption value="billing">Billing</NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>
          <Field>
            <FieldLabel for="bug-steps">Steps to reproduce</FieldLabel>
            <Textarea
              id="bug-steps"
              placeholder={"1. Go to\n2. Click on\n3. Observe..."}
              class="min-h-24 resize-none"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" class="justify-end">
          <Button variant="outline">Attach File</Button>
          <Button>Submit Bug</Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
