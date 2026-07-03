import { InputOTP, InputOTPGroup, InputOTPSlot } from "~/registry/ui/input-otp"

const REGEXP_ONLY_DIGITS = "^\\d*$"

export default function InputOTPFourDigits() {
  return (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  )
}
