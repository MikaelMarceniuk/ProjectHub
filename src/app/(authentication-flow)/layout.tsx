import { NextPage } from 'next'
import withChildren from '@/@types/withChildren'
import Header from './_components/header'
import Footer from '@/components/footer'

type AuthProps = withChildren

const AuthLayout: NextPage<AuthProps> = async ({ children }) => {
	return (
		<div className='min-h-screen'>
			<Header />
			<main className='h-page-children-wrapper'>{children}</main>
			<Footer />
		</div>
	)
}

export default AuthLayout
