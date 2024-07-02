import { NextPage } from 'next'
import withChildren from '@/@types/withChildren'
import Header from './_components/header'
import Footer from '@/components/footer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type AuthProps = withChildren

const AuthLayout: NextPage<AuthProps> = async ({ children }) => {
	const session = await getServerSession()
	if (session) redirect('/dashboard')

	return (
		<div className='min-h-screen'>
			<Header />
			<main className='h-page-children-wrapper'>{children}</main>
			<Footer />
		</div>
	)
}

export default AuthLayout
