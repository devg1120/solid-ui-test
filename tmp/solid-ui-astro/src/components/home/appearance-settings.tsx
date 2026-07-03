import { IconMinus, IconPlus } from "@tabler/icons-solidjs"
import { createSignal } from "solid-js"

import { Button } from "~/registry/ui/button"
import { ButtonGroup } from "~/registry/ui/button-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from "~/registry/ui/field"
import { Input } from "~/registry/ui/input"
import { RadioGroup, RadioGroupItem } from "~/registry/ui/radio-group"
import { Switch } from "~/registry/ui/switch"

export default function AppearanceSettings() {
  const [gpuCount, setGpuCount] = createSignal(8)

  const adjustGpuCount = (adjustment: number) => {
    setGpuCount((count) => Math.max(1, Math.min(99, count + adjustment)))
  }

  const handleGpuInput = (event: InputEvent & { currentTarget: HTMLInputElement }) => {
    const value = Number.parseInt(event.currentTarget.value, 10)

    if (!Number.isNaN(value) && value >= 1 && value <= 99) {
      setGpuCount(value)
    }
  }

  return (
    <FieldSet>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Compute Environment</FieldLegend>
          <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel for="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s configured cluster. This is the default.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem aria-label="Kubernetes" id="kubernetes-r2h" value="kubernetes" />
              </Field>
            </FieldLabel>
            <FieldLabel for="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a VM configured cluster to run workloads. (Coming soon)
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem aria-label="Virtual Machine" id="vm-z4k" value="vm" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="number-of-gpus-f6l">Number of GPUs</FieldLabel>
            <FieldDescription>You can add more later.</FieldDescription>
          </FieldContent>
          <ButtonGroup>
            <Input
              class="h-7 w-14! font-mono"
              id="number-of-gpus-f6l"
              maxLength={3}
              onInput={handleGpuInput}
              size={3}
              value={gpuCount()}
            />
            <Button
              aria-label="Decrement"
              disabled={gpuCount() <= 1}
              onClick={() => adjustGpuCount(-1)}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <IconMinus />
            </Button>
            <Button
              aria-label="Increment"
              disabled={gpuCount() >= 99}
              onClick={() => adjustGpuCount(1)}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <IconPlus />
            </Button>
          </ButtonGroup>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="tinting">Wallpaper Tinting</FieldLabel>
            <FieldDescription>Allow the wallpaper to be tinted.</FieldDescription>
          </FieldContent>
          <Switch defaultChecked id="tinting" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
