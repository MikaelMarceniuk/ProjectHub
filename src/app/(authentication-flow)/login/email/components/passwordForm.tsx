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
import { Button } from '@/components/shadcn/button'
import { ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { emailLoginSchemaType } from '../page'

const passwordSchema = z.object({
	password: z.string().min(1),
})

const PasswordForm: React.FC = () => {
	const { next, back } = useMultistepFormContext()
	const form = useFormContext<emailLoginSchemaType>()

	const handleContinueClick = () => {
		const password = form.getValues().password

		const result = passwordSchema.safeParse({ password })
		if (!result.success) {
			result.error.errors.forEach((error) => {
				if (error.code == 'too_small') {
					// TODO Solve this error
					// @ts-ignore
					return form.setError(error.path[0], {
						message: 'Password must not be empty.',
					})
				}
			})
		}

		form.clearErrors('password')
		next()
	}

	return (
		<div className='mt-40 flex w-80 flex-1 flex-col'>
			<h1 className='mb-10 text-center text-3xl font-bold'>
				Now insert your password
			</h1>
			<div className='flex flex-col gap-2'>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Your password'
									type='password'
									className='h-12'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button size='xlg' onClick={handleContinueClick} type='button'>
					Continue
				</Button>
				<Button
					size='xlg'
					variant='linkIconHover2'
					Icon={ArrowLeft}
					iconPlacement='left'
					className='flex gap-2 text-link after:bg-link'
					onClick={back}
				>
					Go back to email
				</Button>
			</div>
		</div>
	)
}

export default PasswordForm
