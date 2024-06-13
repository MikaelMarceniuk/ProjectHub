'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { useMultistepFormContext } from '@/providers/multiStepFormProvider'
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

		if (result.success) {
			form.clearErrors('email')
			return next()
		}

		form.setError('email', {
			message: 'Inform a valid email.',
		})
	}

	return (
		<div className='mt-40 flex w-80 flex-1 flex-col'>
			<h1 className='mb-10 text-center text-3xl font-bold'>
				Sign up for Project Hub
			</h1>
			<div className='flex flex-col gap-2'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Your email'
									type='email'
									minLength={0}
									className='h-12'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button size='xlg' onClick={handleContinueClick} type='button'>
					<div className='flex gap-2'>
						<Mail size={20} />
						Continue with Email
					</div>
				</Button>
				<Button
					size='xlg'
					variant='linkIconHover2'
					Icon={ArrowLeft}
					iconPlacement='left'
					className='flex gap-2 text-link after:bg-link'
					onClick={back}
				>
					Other Sign Up options
				</Button>
			</div>
		</div>
	)
}

export default EmailForm
