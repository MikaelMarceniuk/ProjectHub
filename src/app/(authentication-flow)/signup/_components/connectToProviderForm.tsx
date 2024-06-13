'use client'

import { Button } from '@/components/shadcn/button'
import { useMultistepFormContext } from '@/providers/multiStepFormProvider'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const ConnectToProviderForm: React.FC = () => {
	const { next } = useMultistepFormContext()
	const form = useFormContext()

	useEffect(() => {
		form.reset()
	}, [])

	return (
		<div className='mt-40 flex w-80 flex-1 flex-col'>
			<h1 className='mb-10 text-center text-3xl font-bold'>
				Let&apos;s connect to a provider
			</h1>
			<div className='flex flex-col gap-2'>
				<Button
					size='xlg'
					className='flex gap-2 bg-github hover:bg-github/90 dark:text-white'
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
				>
					<Image
						src='/discord-mark-white.svg'
						alt='github logo'
						width={20}
						height={20}
					/>
					Continue with Discord
				</Button>
				<Button
					size='xlg'
					variant='linkIconHover2'
					Icon={ArrowRight}
					iconPlacement='right'
					className='flex gap-2 text-link after:bg-link'
					onClick={next}
				>
					Continue with Email
				</Button>
			</div>
		</div>
	)
}

export default ConnectToProviderForm
