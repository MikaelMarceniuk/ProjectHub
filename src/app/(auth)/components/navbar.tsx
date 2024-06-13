'use client'

import { Button } from '@/components/shadcn/button'
import { usePathname, useRouter } from 'next/navigation'

const Navbar: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	const isLogInPage = pathname.includes('login')

	const handleOnClick = () => {
		isLogInPage ? router.push('/signup') : router.push('/login')
	}

	return (
		<nav>
			<Button variant='outline' onClick={handleOnClick}>
				{isLogInPage ? 'Sign Up' : 'Log In'}
			</Button>
		</nav>
	)
}

export default Navbar
