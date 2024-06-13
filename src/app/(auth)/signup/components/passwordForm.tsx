'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { useMultistepFormContext } from '@/providers/useMultiStepFormProvider'
import { useFormContext } from 'react-hook-form'
import { SignUpSchemaType } from '../page'
import { Button } from '@/components/shadcn/button'
import { ArrowLeft, Mail } from 'lucide-react'
import { z } from 'zod'

const passwordSchema = z.object({
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
})

const PasswordForm: React.FC = () => {
  const { next, back } = useMultistepFormContext()
  const form = useFormContext<SignUpSchemaType>()

  const handleContinueClick = () => {
    const password = form.getValues().password
    const confirmPassword = form.getValues().confirmPassword

    console.log('password: ', password)
    console.log('confirmPassword: ', confirmPassword)

    const result = passwordSchema.safeParse({ password, confirmPassword })
    if (!result.success) {
      result.error.errors.forEach((error) => {
        if (error.code == 'too_small') {
          return form.setError(error.path[0], {
            message: 'Password must not be empty.',
          })
        }
      })
    }

    if (password != confirmPassword) {
      return form.setError('confirmPassword', {
        message: 'Password does not match.',
      })
    }

    form.clearErrors('password')
    form.clearErrors('confirmPassword')
    next()
  }

  return (
    <div className="w-80 flex flex-col flex-1 mt-40">
      <h1 className="text-center text-3xl font-bold mb-10">
        Let&apos;s setup your password
      </h1>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your password"
                  type="password"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
                  type="password"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="xlg"
          onClick={handleContinueClick}
          type="button"
        >
          Continue
        </Button>
        <Button
          size="xlg"
          variant="linkIconHover2"
          Icon={ArrowLeft}
          iconPlacement="left"
          className="text-link flex gap-2 after:bg-link"
          onClick={back}
        >
          Go back to email
        </Button>
      </div>
    </div>
  )
}

export default PasswordForm
