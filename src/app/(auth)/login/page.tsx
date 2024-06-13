'use client'

import { Button } from '@/components/shadcn/button'
import { Separator } from '@/components/shadcn/separator'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

enum EAvailableSignIn {
	GITHUB = 'GITHUB',
	DISCORD = 'DISCORD',
	EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
	NO_ACCOUNT = 'NO_ACCOUNT',
}

const LoginPage: NextPage = () => {
	const handleSignIn = (key: keyof typeof EAvailableSignIn) => () => {
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
				console.log('Loggin in with', key)
				break
			}

			case 'NO_ACCOUNT': {
				console.log('Loggin in with', key)
				break
			}
		}
	}

	return (
		<div className='flex h-full flex-col items-center'>
			<div className='mt-40 flex flex-1 flex-col'>
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
			</div>
			<div className='flex h-24 w-full items-center justify-center border-b border-t'>
				<Link
					href='/signup'
					className='text-link underline-offset-4 hover:underline'
				>
					Don&apos;t have an account? Sign Up
				</Link>
			</div>
		</div>
	)
}

export default LoginPage
