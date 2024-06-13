'use client'

import useMultistepForm from '@/hooks/useMultistepform'
import { NextPage } from 'next'
import EmailForm from './components/emailForm'
import MultistepFormProvider from '@/providers/multiStepFormProvider'
import { Form } from '@/components/shadcn/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PasswordForm from './components/passwordForm'

const emailLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
})

export type emailLoginSchemaType = z.infer<typeof emailLoginSchema>

const EmailLoginPage: NextPage = () => {
	const multistepForm = useMultistepForm([
		<EmailForm key={0} />,
		<PasswordForm key={1} />,
	])

	const methods = useForm<emailLoginSchemaType>({
		resolver: zodResolver(emailLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	return (
		<MultistepFormProvider {...multistepForm}>
			<Form {...methods}>
				<form>{multistepForm.currentStep}</form>
			</Form>
		</MultistepFormProvider>
	)
}

export default EmailLoginPage
