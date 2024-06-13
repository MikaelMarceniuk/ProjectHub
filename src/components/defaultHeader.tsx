import { Kanban } from 'lucide-react'
import Link from 'next/link'
import withChildren from '@/@types/withChildren'

const DefaultHeader: React.FC<withChildren> = ({ children }) => {
	return (
		<header className='flex h-16 items-center justify-between px-8'>
			<Link href='/'>
				<div className='flex gap-2'>
					<Kanban />
					<span>Project Hub</span>
				</div>
			</Link>
			{children}
		</header>
	)
}

export default DefaultHeader
