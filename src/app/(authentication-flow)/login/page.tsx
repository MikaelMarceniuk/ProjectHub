'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/shadcn/button'
import { Separator } from '@/components/shadcn/separator'
import ContentWrapper from './_components/contentWrapper'

const LoginPage: NextPage = () => {
	return (
		<ContentWrapper>
			<h1 className='mb-10 text-center text-3xl font-bold'>
				Log in to Project Hub
			</h1>
			<div className='flex w-80 flex-col gap-2'>
				<Button
					size='xlg'
					className='flex gap-2 bg-github hover:bg-github/90 dark:text-white'
					onClick={() => signIn('github')}
				>
					<Image
						src='/github-mark-white.svg'
						alt='github logo'
						width={20}
						height={20}
					/>
					Continue with Github
				</Button>
				<Button
					size='xlg'
					className='flex gap-2 bg-discord hover:bg-discord/90 dark:text-white'
					onClick={() => signIn('discord')}
				>
					<Image
						src='/discord-mark-white.svg'
						alt='github logo'
						width={20}
						height={20}
					/>
					Continue with Discord
				</Button>
				<Separator className='my-2' />
				<Button size='xlg' variant='outline'>
					Continue with Email
				</Button>
			</div>
		</ContentWrapper>
	)
}

export default LoginPage
