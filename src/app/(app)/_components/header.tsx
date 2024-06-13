'use client'

import { Button } from '@/components/shadcn/button'
import DefaultHeader from '@/components/defaultHeader'
import { useUserContext } from '@/providers/userProvider'
import Avatar from '@/components/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Bell, LogOut } from 'lucide-react'

const Header: React.FC = () => {
	const { user, logOut } = useUserContext()

	return (
		<DefaultHeader>
			<nav className='flex gap-2'>
				<Button variant='outline' size='icon' className='rounded-full'>
					<Bell size={16} />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Button
							variant='destructiveExpandIcon'
							Icon={LogOut}
							iconPlacement='right'
							className='w-full'
							onClick={logOut}
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
