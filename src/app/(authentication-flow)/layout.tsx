import { NextPage } from 'next'
import Link from 'next/link'
import { Github, Kanban } from 'lucide-react'
import withChildren from '@/@types/withChildren'
import { ThemeToggle } from '@/components/shadcn/theme-toggle'
import Header from './_components/header'
import Footer from '@/components/footer'

type AuthProps = withChildren

const AuthLayout: NextPage<AuthProps> = ({ children }) => {
	return (
		<div className='min-h-screen'>
			<Header />
			<main className='h-page-children-wrapper'>{children}</main>
			<Footer />
		</div>
	)
}

export default AuthLayout
