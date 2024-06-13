import withChildren from '@/@types/withChildren'
import { ThemeToggle } from '@/components/shadcn/theme-toggle'
import { Github, Kanban } from 'lucide-react'
import { NextPage } from 'next'
import Link from 'next/link'
import Navbar from './_components/navbar'

type AuthProps = withChildren

const AuthLayout: NextPage<AuthProps> = ({ children }) => {
	return (
		<div className='min-h-screen'>
			<header className='flex h-16 items-center justify-between px-8'>
				<Link href='#'>
					<div className='flex gap-2'>
						<Kanban />
						<span>Project Hub</span>
					</div>
				</Link>
				<Navbar />
			</header>
			<main className='h-page-children-wrapper'>{children}</main>
			<footer className='flex h-20 items-center justify-between px-6 py-7'>
				<div className='flex gap-2'>
					<Link href='#'>
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
		</div>
	)
}

export default AuthLayout
