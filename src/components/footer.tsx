import { Github, Kanban } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './shadcn/theme-toggle'

const Footer: React.FC = () => {
	return (
		<footer className='flex h-20 items-center justify-between px-6 py-7'>
			<div className='flex gap-2'>
				<Link href='/'>
					<div className='flex gap-2'>
						<Kanban />
						<span>Project Hub</span>
					</div>
				</Link>
				<p>© {new Date().getFullYear()}</p>
			</div>
			<div className='flex items-center gap-2'>
				<Link
					href='https://github.com/MikaelMarceniuk/ProjectHub-Frontend'
					target='_blank'
				>
					<Github
						size={20}
						className='text-gray-500 hover:text-black dark:hover:text-white'
					/>
				</Link>
				<ThemeToggle />
			</div>
		</footer>
	)
}

export default Footer
