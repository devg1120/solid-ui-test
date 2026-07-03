import { For } from "solid-js"

import { Button } from "~/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/registry/ui/card"

const qrRows = [
  "111111100101011111111",
  "100000101001010000001",
  "101110100100010111101",
  "101110101111010111101",
  "101110101001010111101",
  "100000100111010000001",
  "111111101010101111111",
  "000000000111000000000",
  "111010111001101010111",
  "010110001111000110010",
  "001001110010111001100",
  "111100011101001011001",
  "010011100011110000101",
  "000000001100011101000",
  "111111101011110101110",
  "100000101100010001011",
  "101110100011111001001",
  "101110101100001010011",
  "101110100001111000101",
  "100000101111001101001",
  "111111100100101110111"
]

function FauxQrCode() {
  return (
    <svg viewBox="0 0 21 21" class="size-40 fill-black" aria-hidden="true">
      <rect width="21" height="21" fill="white" />
      <For each={qrRows}>
        {(row, y) => (
          <For each={row.split("")}>
            {(cell, x) => (cell === "1" ? <rect x={x()} y={y()} width="1" height="1" /> : null)}
          </For>
        )}
      </For>
    </svg>
  )
}

export function QrConnect() {
  return (
    <Card>
      <CardContent class="flex justify-center pt-6">
        <div class="rounded-xl border bg-white p-4">
          <FauxQrCode />
        </div>
      </CardContent>
      <CardHeader class="text-center">
        <CardTitle>Scan to connect your mobile device</CardTitle>
        <CardDescription>
          Open the Ledger mobile app and scan this code to link your device.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" class="w-full">
          Got it
        </Button>
      </CardFooter>
    </Card>
  )
}
