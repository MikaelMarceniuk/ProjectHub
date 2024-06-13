'use client'

import useMultiStepForm from '@/hooks/useMultistepform'
import { NextPage } from 'next'
import ConnectToProviderForm from './components/connectToProviderForm'
import EmailForm from './components/emailForm'
import MultistepFormProvider from '@/providers/useMultiStepFormProvider'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordForm from './components/passwordForm'
import { Form } from '@/components/shadcn/form'
import EmailVerification from './components/emailVerification'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(0),
  confirmPassword: z.string().min(0),
  otp: z.number().max(5),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>

const SignUpPage: NextPage = () => {
  const multistepForm = useMultiStepForm([
    <ConnectToProviderForm key={0} />,
    <EmailForm key={1} />,
    <PasswordForm key={2} />,
    <EmailVerification key={3} />,
  ])

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = () => {
    console.log('Submiting')
  }

  return (
    <div className="h-full flex flex-col items-center">
      <MultistepFormProvider {...multistepForm}>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {multistepForm.currentStep}
          </form>
        </Form>
      </MultistepFormProvider>
    </div>
  )
}

export default SignUpPage
