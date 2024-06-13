'use client'

import { useMultistepFormContext } from '@/providers/useMultiStepFormProvider'
import { useFormContext } from 'react-hook-form'
import { SignUpSchemaType } from '../page'
import { OtpStyledInput } from '@/components/shadcn/opt-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form'
import { Button } from '@/components/shadcn/button'

const EmailVerification: React.FC = () => {
  const { next, back } = useMultistepFormContext()
  const form = useFormContext<SignUpSchemaType>()

  return (
    <div className="w-80 flex flex-col flex-1 mt-40">
      <div className="text-center space-y-2">
        <h1 className=" text-3xl font-bold">Email Verification</h1>
        <p className="text-gray-400">
          To complete the sign up verification process, please insert the code
          we just send to{' '}
          <span className="text-white font-bold">{form.getValues().email}</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <div className="max-w-xs h-fit flex items-center justify-center outline outline-1 outline-muted rounded-md p-4 bg-background">
          <div className="w-full space-y-2">
            <div className="space-y-1">
              <h2 className="font-semibold">OTP verification</h2>
              <p className="text-xs">
                Enter the 5-digit code sent to your email address
              </p>
            </div>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormControl>
                  <>
                    <FormItem>
                      <OtpStyledInput
                        numInputs={5}
                        inputType="number"
                        {...field}
                      />
                    </FormItem>
                    <FormMessage />
                  </>
                </FormControl>
              )}
            />
            <Button
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
