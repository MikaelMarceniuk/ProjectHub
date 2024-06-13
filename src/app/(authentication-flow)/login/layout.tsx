import { NextPage } from 'next'
import withChildren from '@/@types/withChildren'
import Link from 'next/link'

const LoginLayout: NextPage<withChildren> = ({ children }) => {
	return (
		<div className='flex h-full flex-col items-center'>
			<div className='flex flex-1 flex-col'>{children}</div>
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

export default LoginLayout
