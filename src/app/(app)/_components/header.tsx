'use client'

import { useSession, signOut } from 'next-auth/react'
import { Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import DefaultHeader from '@/components/defaultHeader'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/shadcn/avatar'
import { useRouter } from 'next/navigation'

const Header: React.FC = () => {
	const router = useRouter()
	const { data: session, status } = useSession()

	const handleSignOut = async () => {
		await signOut({ redirect: false })
		router.replace('/login')
	}

	// TODO Create Skeleton
	if (status != 'authenticated') return null

	return (
		<DefaultHeader>
			<nav className='flex gap-2'>
				<Button variant='outline' size='icon' className='rounded-full'>
					<Bell size={16} />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							{/* TODO Solve this problem */}
							<AvatarImage src={session.user?.image || ''} />
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Button
							variant='destructiveExpandIcon'
							Icon={LogOut}
							iconPlacement='right'
							className='w-full'
							onClick={handleSignOut}
						>
							Log Out
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</DefaultHeader>
	)
}

export default Header
