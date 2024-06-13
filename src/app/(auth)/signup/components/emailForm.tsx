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

const emailFormSchema = z.string().email()

const EmailForm: React.FC = () => {
  const { next, back } = useMultistepFormContext()
  const form = useFormContext<SignUpSchemaType>()

  const handleContinueClick = () => {
    const result = emailFormSchema.safeParse(form.getValues().email)
    console.log('email: ', form.getValues())
    console.log('result: ', result)
    if (result.success) {
      form.clearErrors('email')
      return next()
    }

    form.setError('email', {
      message: 'Inform a valid email.',
    })
  }

  return (
    <div className="w-80 flex flex-col flex-1 mt-40">
      <h1 className="text-center text-3xl font-bold mb-10">
        Sign up for Project Hub
      </h1>
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Your email"
                  type="email"
                  minLength={0}
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
          <div className="flex gap-2">
            <Mail size={20} />
            Continue with Email
          </div>
        </Button>
        <Button
          size="xlg"
          variant="linkIconHover2"
          Icon={ArrowLeft}
          iconPlacement="left"
          className="text-link flex gap-2 after:bg-link"
          onClick={back}
        >
          Other Sign Up options
        </Button>
      </div>
    </div>
  )
}

export default EmailForm
