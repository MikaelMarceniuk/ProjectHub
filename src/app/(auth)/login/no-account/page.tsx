'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/shadcn/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ContentWrapper from '../_components/contentWrapper'
import { Input } from '@/components/shadcn/input'
import { Button } from '@/components/shadcn/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const noAccountLoginSchema = z.object({
	username: z.string().min(3),
})

type noAccountLoginSchemaType = z.infer<typeof noAccountLoginSchema>

const NoAccountLoginPage: NextPage = () => {
	const methods = useForm<noAccountLoginSchemaType>({
		resolver: zodResolver(noAccountLoginSchema),
		defaultValues: {
			username: '',
		},
	})

	const onSubmit = (values: noAccountLoginSchemaType) => {
		localStorage.clear()

		const newLocaldata = {
			user: values.username,
		}

		localStorage.setItem('@project-hub/v1.0', JSON.stringify(newLocaldata))
	}

	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<ContentWrapper>
					<h1 className='mb-10 text-center text-3xl font-bold'>
						Log in without account to Project Hub
					</h1>
					<div className='flex flex-col gap-2'>
						<FormField
							control={methods.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder='How we should call you?'
											minLength={3}
											className='h-12'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button size='xlg' type='submit'>
							Continue without account
						</Button>
						<Button
							size='xlg'
							variant='linkIconHover2'
							Icon={ArrowLeft}
							iconPlacement='left'
							className='flex gap-2 text-link after:bg-link'
							type='button'
						>
							<Link href='/login'>Other Log In options</Link>
						</Button>
					</div>
				</ContentWrapper>
			</form>
		</Form>
	)
}

export default NoAccountLoginPage
