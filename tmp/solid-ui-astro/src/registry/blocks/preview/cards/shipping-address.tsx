import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"
import { Checkbox } from "~/registry/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { NativeSelect, NativeSelectOption } from "~/registry/ui/native-select"

export function ShippingAddress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>Where should we deliver?</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="shipping-street">Street address</FieldLabel>
            <Input id="shipping-street" placeholder="123 Main Street" />
          </Field>
          <Field>
            <FieldLabel for="shipping-apt">Apt / Suite</FieldLabel>
            <Input id="shipping-apt" placeholder="Apt 4B" />
          </Field>
          <FieldGroup class="grid grid-cols-2">
            <Field>
              <FieldLabel for="shipping-city">City</FieldLabel>
              <Input id="shipping-city" placeholder="San Francisco" />
            </Field>
            <Field>
              <FieldLabel for="shipping-state">State</FieldLabel>
              <NativeSelect id="shipping-state" class="w-full">
                <NativeSelectOption value="CA">California</NativeSelectOption>
                <NativeSelectOption value="NY">New York</NativeSelectOption>
                <NativeSelectOption value="TX">Texas</NativeSelectOption>
              </NativeSelect>
            </Field>
          </FieldGroup>
          <FieldGroup class="grid grid-cols-2">
            <Field>
              <FieldLabel for="shipping-zip">ZIP Code</FieldLabel>
              <Input id="shipping-zip" placeholder="94102" />
            </Field>
            <Field>
              <FieldLabel for="shipping-country">Country</FieldLabel>
              <NativeSelect id="shipping-country" class="w-full">
                <NativeSelectOption value="US">United States</NativeSelectOption>
                <NativeSelectOption value="CA">Canada</NativeSelectOption>
                <NativeSelectOption value="UK">United Kingdom</NativeSelectOption>
              </NativeSelect>
            </Field>
          </FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="shipping-save" defaultChecked />
            <FieldLabel for="shipping-save" class="font-normal">
              Save as default address
            </FieldLabel>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm" class="ml-auto">
          Save Address
        </Button>
      </CardFooter>
    </Card>
  )
}
