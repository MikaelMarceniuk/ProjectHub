'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/shadcn/button'
import DefaultHeader from '@/components/defaultHeader'

const Header: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	const isLogInPage = pathname.includes('login')

	const handleHeaderBtnClick = () => {
		isLogInPage ? router.push('/signup') : router.push('/login')
	}

	return (
		<DefaultHeader>
			<nav>
				<Button variant='outline' onClick={handleHeaderBtnClick}>
					{isLogInPage ? 'Sign Up' : 'Log In'}
				</Button>
			</nav>
		</DefaultHeader>
	)
}

export default Header
