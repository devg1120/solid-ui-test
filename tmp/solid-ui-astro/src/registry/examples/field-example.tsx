import { createSignal } from "solid-js"

import { Example, ExampleWrapper } from "~/registry/examples/example"
import { Badge } from "~/registry/ui/badge"
import { Checkbox } from "~/registry/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/registry/ui/input-otp"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "~/registry/ui/native-select"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/registry/ui/select"
import { Slider } from "~/registry/ui/slider"
import { Switch } from "~/registry/ui/switch"
import { Textarea } from "~/registry/ui/textarea"

type SelectOption = {
  label: string
  value: string | null
}

const REGEXP_ONLY_DIGITS = "^\\d*$"

const basicSelectItems: SelectOption[] = [
  { label: "Choose an option", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" }
]

const countrySelectItems: SelectOption[] = [
  { label: "Select your country", value: null },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" }
]

const timezoneSelectItems: SelectOption[] = [
  { label: "Select timezone", value: null },
  { label: "UTC", value: "utc" },
  { label: "Eastern Time", value: "est" },
  { label: "Pacific Time", value: "pst" }
]

const invalidSelectItems: SelectOption[] = [
  { label: "This field has an error", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" }
]

const disabledSelectItems: SelectOption[] = [
  { label: "Cannot select", value: null },
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" }
]

const horizontalSelectItems: SelectOption[] = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" }
]

function SelectField(props: {
  id: string
  items: SelectOption[]
  disabled?: boolean
  invalid?: boolean
}) {
  return (
    <Select<SelectOption>
      options={props.items}
      optionValue="value"
      optionTextValue="label"
      disabled={props.disabled}
      itemComponent={(itemProps) => (
        <SelectItem item={itemProps.item}>{itemProps.item.rawValue.label}</SelectItem>
      )}
    >
      <SelectTrigger aria-invalid={props.invalid} id={props.id}>
        <SelectValue<SelectOption>>{(state) => state.selectedOption()?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  )
}

function OtpSlots(props: { count: number; start?: number }) {
  return (
    <InputOTPGroup>
      {Array.from({ length: props.count }, (_, index) => (
        <InputOTPSlot index={(props.start ?? 0) + index} />
      ))}
    </InputOTPGroup>
  )
}

export default function FieldExample() {
  return (
    <ExampleWrapper>
      <InputFields />
      <TextareaFields />
      <SelectFields />
      <CheckboxFields />
      <RadioFields />
      <SwitchFields />
      <SliderFields />
      <NativeSelectFields />
      <InputOTPFields />
      <HorizontalFields />
    </ExampleWrapper>
  )
}

function InputFields() {
  return (
    <Example title="Input Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="input-basic">Basic Input</FieldLabel>
          <Input id="input-basic" placeholder="Enter text" />
        </Field>
        <Field>
          <FieldLabel for="input-with-desc">Input with Description</FieldLabel>
          <Input id="input-with-desc" placeholder="Enter your username" />
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="input-desc-first">Email Address</FieldLabel>
          <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
          <Input id="input-desc-first" type="email" placeholder="email@example.com" />
        </Field>
        <Field>
          <FieldLabel for="input-required">
            Required Field <span class="text-destructive">*</span>
          </FieldLabel>
          <Input id="input-required" placeholder="This field is required" required />
          <FieldDescription>This field must be filled out.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="input-disabled">Disabled Input</FieldLabel>
          <Input id="input-disabled" placeholder="Cannot edit" disabled />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel class="items-center gap-2" for="input-badge">
            Input with Badge
            <Badge class="ml-auto" variant="secondary">
              Recommended
            </Badge>
          </FieldLabel>
          <Input id="input-badge" placeholder="Enter value" />
        </Field>
        <Field data-invalid>
          <FieldLabel for="input-invalid">Invalid Input</FieldLabel>
          <Input aria-invalid id="input-invalid" placeholder="This field has an error" />
          <FieldDescription>This field contains validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="input-disabled-field">Disabled Field</FieldLabel>
          <Input id="input-disabled-field" placeholder="Cannot edit" disabled />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function TextareaFields() {
  return (
    <Example title="Textarea Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="textarea-basic">Basic Textarea</FieldLabel>
          <Textarea id="textarea-basic" placeholder="Enter your message" />
        </Field>
        <Field>
          <FieldLabel for="textarea-comments">Comments</FieldLabel>
          <Textarea
            class="min-h-[100px]"
            id="textarea-comments"
            placeholder="Share your thoughts..."
          />
          <FieldDescription>Maximum 500 characters allowed.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="textarea-bio">Bio</FieldLabel>
          <FieldDescription>Tell us about yourself in a few sentences.</FieldDescription>
          <Textarea class="min-h-[120px]" id="textarea-bio" placeholder="I am a..." />
        </Field>
        <Field>
          <FieldLabel for="textarea-desc-after">Message</FieldLabel>
          <Textarea id="textarea-desc-after" placeholder="Enter your message" />
          <FieldDescription>
            Enter your message so it is long enough to test the layout.
          </FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel for="textarea-invalid">Invalid Textarea</FieldLabel>
          <Textarea aria-invalid id="textarea-invalid" placeholder="This field has an error" />
          <FieldDescription>This field contains validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="textarea-disabled-field">Disabled Field</FieldLabel>
          <Textarea id="textarea-disabled-field" placeholder="Cannot edit" disabled />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function SelectFields() {
  return (
    <Example title="Select Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="select-basic">Basic Select</FieldLabel>
          <SelectField id="select-basic" items={basicSelectItems} />
        </Field>
        <Field>
          <FieldLabel for="select-country">Country</FieldLabel>
          <SelectField id="select-country" items={countrySelectItems} />
          <FieldDescription>Select the country where you currently reside.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="select-timezone">Timezone</FieldLabel>
          <FieldDescription>Choose your local timezone for accurate scheduling.</FieldDescription>
          <SelectField id="select-timezone" items={timezoneSelectItems} />
        </Field>
        <Field data-invalid>
          <FieldLabel for="select-invalid">Invalid Select</FieldLabel>
          <SelectField id="select-invalid" items={invalidSelectItems} invalid />
          <FieldDescription>This field contains validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="select-disabled-field">Disabled Field</FieldLabel>
          <SelectField id="select-disabled-field" items={disabledSelectItems} disabled />
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function NativeSelectFields() {
  return (
    <Example title="Native Select Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="native-select-basic">Basic Native Select</FieldLabel>
          <NativeSelect id="native-select-basic">
            <NativeSelectOption value="">Choose an option</NativeSelectOption>
            <NativeSelectOption value="option1">Option 1</NativeSelectOption>
            <NativeSelectOption value="option2">Option 2</NativeSelectOption>
            <NativeSelectOption value="option3">Option 3</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel for="native-select-country">Country</FieldLabel>
          <NativeSelect id="native-select-country">
            <NativeSelectOption value="">Select your country</NativeSelectOption>
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="ca">Canada</NativeSelectOption>
          </NativeSelect>
          <FieldDescription>Select the country where you currently reside.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="native-select-timezone">Timezone</FieldLabel>
          <FieldDescription>Choose your local timezone for accurate scheduling.</FieldDescription>
          <NativeSelect id="native-select-timezone">
            <NativeSelectOption value="">Select timezone</NativeSelectOption>
            <NativeSelectOption value="utc">UTC</NativeSelectOption>
            <NativeSelectOption value="est">Eastern Time</NativeSelectOption>
            <NativeSelectOption value="pst">Pacific Time</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field>
          <FieldLabel for="native-select-grouped">Grouped Options</FieldLabel>
          <NativeSelect id="native-select-grouped">
            <NativeSelectOption value="">Select a region</NativeSelectOption>
            <NativeSelectOptGroup label="North America">
              <NativeSelectOption value="us">United States</NativeSelectOption>
              <NativeSelectOption value="ca">Canada</NativeSelectOption>
              <NativeSelectOption value="mx">Mexico</NativeSelectOption>
            </NativeSelectOptGroup>
            <NativeSelectOptGroup label="Europe">
              <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
              <NativeSelectOption value="fr">France</NativeSelectOption>
              <NativeSelectOption value="de">Germany</NativeSelectOption>
            </NativeSelectOptGroup>
          </NativeSelect>
          <FieldDescription>Native select with grouped options using optgroup.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel for="native-select-invalid">Invalid Native Select</FieldLabel>
          <NativeSelect aria-invalid id="native-select-invalid">
            <NativeSelectOption value="">This field has an error</NativeSelectOption>
            <NativeSelectOption value="option1">Option 1</NativeSelectOption>
            <NativeSelectOption value="option2">Option 2</NativeSelectOption>
            <NativeSelectOption value="option3">Option 3</NativeSelectOption>
          </NativeSelect>
          <FieldDescription>This field contains validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="native-select-disabled-field">Disabled Field</FieldLabel>
          <NativeSelect id="native-select-disabled-field" disabled>
            <NativeSelectOption value="">Cannot select</NativeSelectOption>
            <NativeSelectOption value="option1">Option 1</NativeSelectOption>
            <NativeSelectOption value="option2">Option 2</NativeSelectOption>
            <NativeSelectOption value="option3">Option 3</NativeSelectOption>
          </NativeSelect>
          <FieldDescription>This field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function CheckboxFields() {
  return (
    <Example title="Checkbox Fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-basic" defaultChecked />
          <FieldLabel class="font-normal" for="checkbox-basic">
            I agree to the terms and conditions
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <FieldLabel for="checkbox-right">Accept terms and conditions</FieldLabel>
          <Checkbox id="checkbox-right" />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-with-desc" />
          <FieldContent>
            <FieldLabel for="checkbox-with-desc">Subscribe to newsletter</FieldLabel>
            <FieldDescription>
              Receive weekly updates about new features and promotions.
            </FieldDescription>
          </FieldContent>
        </Field>
        <FieldLabel for="checkbox-with-title">
          <Field orientation="horizontal">
            <Checkbox id="checkbox-with-title" />
            <FieldContent>
              <FieldTitle>Enable Touch ID</FieldTitle>
              <FieldDescription>Enable Touch ID to quickly unlock your device.</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldSet>
          <FieldLegend variant="label">Preferences</FieldLegend>
          <FieldDescription>Select all that apply to customize your experience.</FieldDescription>
          <FieldGroup class="gap-3">
            <Field orientation="horizontal">
              <Checkbox id="pref-dark" />
              <FieldLabel class="font-normal" for="pref-dark">
                Dark mode
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-compact" />
              <FieldLabel class="font-normal" for="pref-compact">
                Compact view
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="pref-notifications" />
              <FieldLabel class="font-normal" for="pref-notifications">
                Enable notifications
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field data-invalid orientation="horizontal">
          <Checkbox aria-invalid id="checkbox-invalid" />
          <FieldLabel class="font-normal" for="checkbox-invalid">
            Invalid checkbox
          </FieldLabel>
        </Field>
        <Field data-disabled orientation="horizontal">
          <Checkbox id="checkbox-disabled-field" disabled />
          <FieldLabel class="font-normal" for="checkbox-disabled-field">
            Disabled checkbox
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function RadioFields() {
  return (
    <Example title="Radio Fields">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Subscription Plan</FieldLegend>
          <RadioGroup defaultValue="free">
            <Field orientation="horizontal">
              <RadioGroupItem id="radio-free" value="free" />
              <FieldLabel class="font-normal" for="radio-free">
                Free Plan
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="radio-pro" value="pro" />
              <FieldLabel class="font-normal" for="radio-pro">
                Pro Plan
              </FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="radio-enterprise" value="enterprise" />
              <FieldLabel class="font-normal" for="radio-enterprise">
                Enterprise
              </FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
        <FieldSet>
          <FieldLegend variant="label">Battery Level</FieldLegend>
          <FieldDescription>Choose your preferred battery level.</FieldDescription>
          <RadioGroup>
            <Field orientation="horizontal">
              <RadioGroupItem id="battery-high" value="high" />
              <FieldLabel for="battery-high">High</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="battery-medium" value="medium" />
              <FieldLabel for="battery-medium">Medium</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="battery-low" value="low" />
              <FieldLabel for="battery-low">Low</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
        <RadioGroup class="gap-6">
          <Field orientation="horizontal">
            <RadioGroupItem id="radio-content-1" value="option1" />
            <FieldContent>
              <FieldLabel for="radio-content-1">Enable Touch ID</FieldLabel>
              <FieldDescription>Enable Touch ID to quickly unlock your device.</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="radio-content-2" value="option2" />
            <FieldContent>
              <FieldLabel for="radio-content-2">
                Enable Touch ID and Face ID to make it even faster to unlock your device. This is a
                long label to test the layout.
              </FieldLabel>
              <FieldDescription>Enable Touch ID to quickly unlock your device.</FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>
        <RadioGroup class="gap-3">
          <FieldLabel for="radio-title-1">
            <Field orientation="horizontal">
              <RadioGroupItem id="radio-title-1" value="title1" />
              <FieldContent>
                <FieldTitle>Enable Touch ID</FieldTitle>
                <FieldDescription>Enable Touch ID to quickly unlock your device.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
          <FieldLabel for="radio-title-2">
            <Field orientation="horizontal">
              <RadioGroupItem id="radio-title-2" value="title2" />
              <FieldContent>
                <FieldTitle>
                  Enable Touch ID and Face ID to make it even faster to unlock your device. This is
                  a long label to test the layout.
                </FieldTitle>
                <FieldDescription>Enable Touch ID to quickly unlock your device.</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        </RadioGroup>
        <FieldSet>
          <FieldLegend variant="label">Invalid Radio Group</FieldLegend>
          <RadioGroup>
            <Field data-invalid orientation="horizontal">
              <RadioGroupItem aria-invalid id="radio-invalid-1" value="invalid1" />
              <FieldLabel for="radio-invalid-1">Invalid Option 1</FieldLabel>
            </Field>
            <Field data-invalid orientation="horizontal">
              <RadioGroupItem aria-invalid id="radio-invalid-2" value="invalid2" />
              <FieldLabel for="radio-invalid-2">Invalid Option 2</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
        <FieldSet>
          <FieldLegend variant="label">Disabled Radio Group</FieldLegend>
          <RadioGroup disabled>
            <Field data-disabled orientation="horizontal">
              <RadioGroupItem id="radio-disabled-1" value="disabled1" disabled />
              <FieldLabel for="radio-disabled-1">Disabled Option 1</FieldLabel>
            </Field>
            <Field data-disabled orientation="horizontal">
              <RadioGroupItem id="radio-disabled-2" value="disabled2" disabled />
              <FieldLabel for="radio-disabled-2">Disabled Option 2</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </Example>
  )
}

function SwitchFields() {
  return (
    <Example title="Switch Fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="switch-airplane">Airplane Mode</FieldLabel>
            <FieldDescription>Turn on airplane mode to disable all connections.</FieldDescription>
          </FieldContent>
          <Switch id="switch-airplane" />
        </Field>
        <Field orientation="horizontal">
          <FieldLabel for="switch-dark">Dark Mode</FieldLabel>
          <Switch id="switch-dark" />
        </Field>
        <Field orientation="horizontal">
          <Switch id="switch-marketing" />
          <FieldContent>
            <FieldLabel for="switch-marketing">Marketing Emails</FieldLabel>
            <FieldDescription>
              Receive emails about new products, features, and more.
            </FieldDescription>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Privacy Settings</FieldLabel>
          <FieldDescription>Manage your privacy preferences.</FieldDescription>
          <Field orientation="horizontal">
            <Switch id="switch-profile" defaultChecked />
            <FieldContent>
              <FieldLabel class="font-normal" for="switch-profile">
                Make profile visible to others
              </FieldLabel>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Switch id="switch-email" />
            <FieldContent>
              <FieldLabel class="font-normal" for="switch-email">
                Show email on profile
              </FieldLabel>
            </FieldContent>
          </Field>
        </Field>
        <Field data-invalid orientation="horizontal">
          <FieldContent>
            <FieldLabel for="switch-invalid">Invalid Switch</FieldLabel>
            <FieldDescription>This switch has validation errors.</FieldDescription>
          </FieldContent>
          <Switch aria-invalid id="switch-invalid" />
        </Field>
        <Field data-disabled orientation="horizontal">
          <FieldContent>
            <FieldLabel for="switch-disabled-field">Disabled Switch</FieldLabel>
            <FieldDescription>This switch is currently disabled.</FieldDescription>
          </FieldContent>
          <Switch id="switch-disabled-field" disabled />
        </Field>
      </FieldGroup>
    </Example>
  )
}

function SliderFields() {
  const [volume, setVolume] = createSignal([50])
  const [brightness, setBrightness] = createSignal([75])
  const [temperature, setTemperature] = createSignal([0.3, 0.7])
  const [priceRange, setPriceRange] = createSignal([25, 75])
  const [colorBalance, setColorBalance] = createSignal([10, 20, 70])

  return (
    <Example title="Slider Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="slider-volume">Volume</FieldLabel>
          <Slider id="slider-volume" max={100} onChange={setVolume} step={1} value={volume()} />
        </Field>
        <Field>
          <FieldLabel for="slider-brightness">Screen Brightness</FieldLabel>
          <Slider
            id="slider-brightness"
            max={100}
            onChange={setBrightness}
            step={5}
            value={brightness()}
          />
          <FieldDescription>Current brightness: {brightness()[0]}%</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="slider-quality">Video Quality</FieldLabel>
          <FieldDescription>Higher quality uses more bandwidth.</FieldDescription>
          <Slider id="slider-quality" defaultValue={[720]} max={1080} min={360} step={360} />
        </Field>
        <Field>
          <FieldLabel for="slider-temperature">Temperature Range</FieldLabel>
          <Slider
            id="slider-temperature"
            max={1}
            min={0}
            onChange={setTemperature}
            step={0.1}
            value={temperature()}
          />
          <FieldDescription>
            Range: {temperature()[0].toFixed(1)} - {temperature()[1].toFixed(1)}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="slider-price-range">Price Range</FieldLabel>
          <Slider
            id="slider-price-range"
            max={100}
            onChange={setPriceRange}
            step={5}
            value={priceRange()}
          />
          <FieldDescription>
            ${priceRange()[0]} - ${priceRange()[1]}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="slider-color-balance">Color Balance</FieldLabel>
          <Slider
            id="slider-color-balance"
            max={100}
            onChange={setColorBalance}
            step={10}
            value={colorBalance()}
          />
          <FieldDescription>
            Red: {colorBalance()[0]}%, Green: {colorBalance()[1]}%, Blue: {colorBalance()[2]}%
          </FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel for="slider-invalid">Invalid Slider</FieldLabel>
          <Slider aria-invalid id="slider-invalid" defaultValue={[30]} max={100} />
          <FieldDescription>This slider has validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="slider-disabled-field">Disabled Slider</FieldLabel>
          <Slider id="slider-disabled-field" defaultValue={[50]} max={100} disabled />
          <FieldDescription>This slider is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputOTPFields() {
  const [value, setValue] = createSignal("")
  const [pinValue, setPinValue] = createSignal("")

  return (
    <Example title="OTP Input Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="otp-basic">Verification Code</FieldLabel>
          <InputOTP id="otp-basic" maxLength={6}>
            <OtpSlots count={6} />
          </InputOTP>
        </Field>
        <Field>
          <FieldLabel for="otp-with-desc">Enter OTP</FieldLabel>
          <InputOTP id="otp-with-desc" maxLength={6} onValueChange={setValue} value={value()}>
            <OtpSlots count={6} />
          </InputOTP>
          <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="otp-separator">Two-Factor Authentication</FieldLabel>
          <InputOTP id="otp-separator" maxLength={6}>
            <OtpSlots count={3} />
            <InputOTPSeparator />
            <OtpSlots count={3} start={3} />
          </InputOTP>
          <FieldDescription>Enter the code from your authenticator app.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="otp-pin">PIN Code</FieldLabel>
          <InputOTP
            id="otp-pin"
            maxLength={4}
            onValueChange={setPinValue}
            pattern={REGEXP_ONLY_DIGITS}
            value={pinValue()}
          >
            <OtpSlots count={4} />
          </InputOTP>
          <FieldDescription>Enter your 4-digit PIN (numbers only).</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel for="otp-invalid">Invalid OTP</FieldLabel>
          <InputOTP id="otp-invalid" maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot aria-invalid index={0} />
              <InputOTPSlot aria-invalid index={1} />
              <InputOTPSlot aria-invalid index={2} />
              <InputOTPSlot aria-invalid index={3} />
              <InputOTPSlot aria-invalid index={4} />
              <InputOTPSlot aria-invalid index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>This OTP field contains validation errors.</FieldDescription>
        </Field>
        <Field data-disabled>
          <FieldLabel for="otp-disabled-field">Disabled OTP</FieldLabel>
          <InputOTP id="otp-disabled-field" maxLength={6} disabled>
            <OtpSlots count={6} />
          </InputOTP>
          <FieldDescription>This OTP field is currently disabled.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function HorizontalFields() {
  return (
    <Example title="Horizontal Fields">
      <FieldGroup class="**:data-[slot=field-content]:min-w-48">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-input">Username</FieldLabel>
            <FieldDescription>Enter your preferred username.</FieldDescription>
          </FieldContent>
          <Input id="horizontal-input" placeholder="johndoe" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-textarea">Bio</FieldLabel>
            <FieldDescription>Write a short description about yourself.</FieldDescription>
          </FieldContent>
          <Textarea id="horizontal-textarea" placeholder="Tell us about yourself..." />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-switch">Email Notifications</FieldLabel>
            <FieldDescription>Receive email updates about your account.</FieldDescription>
          </FieldContent>
          <Switch id="horizontal-switch" />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-select">Favorite Fruit</FieldLabel>
            <FieldDescription>Choose your favorite fruit.</FieldDescription>
          </FieldContent>
          <SelectField id="horizontal-select" items={horizontalSelectItems} />
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-native-select">Country</FieldLabel>
            <FieldDescription>Select your country.</FieldDescription>
          </FieldContent>
          <NativeSelect id="horizontal-native-select">
            <NativeSelectOption value="">Select a country</NativeSelectOption>
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="ca">Canada</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="horizontal-slider">Volume</FieldLabel>
            <FieldDescription>Adjust the volume level.</FieldDescription>
          </FieldContent>
          <Slider id="horizontal-slider" defaultValue={[50]} max={100} />
        </Field>
      </FieldGroup>
    </Example>
  )
}
