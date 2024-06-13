'use client'

import { useMultistepFormContext } from '@/providers/multiStepFormProvider'
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
	const form = useFormContext<SignUpSchemaType>()

	return (
		<div className='mt-40 flex w-80 flex-1 flex-col'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold'>Email Verification</h1>
				<p className='text-gray-400'>
					To complete the sign up verification process, please insert the code
					we just send to{' '}
					<span className='font-bold text-white'>{form.getValues().email}</span>
				</p>
			</div>
			<div className='mt-5 flex flex-col gap-2'>
				<div className='flex h-fit max-w-xs items-center justify-center rounded-md bg-background p-4 outline outline-1 outline-muted'>
					<div className='w-full space-y-2'>
						<div className='space-y-1'>
							<h2 className='font-semibold'>OTP verification</h2>
							<p className='text-xs'>
								Enter the 5-digit code sent to your email address
							</p>
						</div>
						<FormField
							control={form.control}
							name='otp'
							render={({ field }) => (
								<FormControl>
									<>
										<FormItem>
											<OtpStyledInput
												numInputs={5}
												inputType='number'
												{...field}
											/>
										</FormItem>
										<FormMessage />
									</>
								</FormControl>
							)}
						/>
						<Button type='submit' className='w-full'>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmailVerification
