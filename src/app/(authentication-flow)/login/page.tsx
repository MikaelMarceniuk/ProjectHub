'use client'

import { Button } from '@/components/shadcn/button'
import { Separator } from '@/components/shadcn/separator'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ContentWrapper from './_components/contentWrapper'

enum EAvailableSignIn {
	GITHUB = 'GITHUB',
	DISCORD = 'DISCORD',
	EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
	NO_ACCOUNT = 'NO_ACCOUNT',
}

const LoginPage: NextPage = () => {
	const router = useRouter()

	const handleSignIn = (key: keyof typeof EAvailableSignIn) => () => {
		console.log('handleSignIn/' + key)
		switch (key) {
			case 'GITHUB': {
				console.log('Loggin in with', key)
				break
			}

			case 'DISCORD': {
				console.log('Loggin in with', key)
				break
			}

			case 'EMAIL_AND_PASSWORD': {
				router.push('/login/email')
				break
			}

			case 'NO_ACCOUNT': {
				router.push('/login/no-account')
				break
			}
		}
	}

	return (
		<ContentWrapper>
			<h1 className='mb-10 text-center text-3xl font-bold'>
				Log in to Project Hub
			</h1>
			<div className='flex w-80 flex-col gap-2'>
				<Button
					size='xlg'
					className='flex gap-2 bg-github hover:bg-github/90 dark:text-white'
					onClick={handleSignIn('GITHUB')}
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
					onClick={handleSignIn('DISCORD')}
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
				<Button
					size='xlg'
					variant='outline'
					onClick={handleSignIn('EMAIL_AND_PASSWORD')}
				>
					Continue with Email
				</Button>
				<Button
					size='xlg'
					variant='outline'
					onClick={handleSignIn('NO_ACCOUNT')}
				>
					Continue without account
				</Button>
			</div>
		</ContentWrapper>
	)
}

export default LoginPage
