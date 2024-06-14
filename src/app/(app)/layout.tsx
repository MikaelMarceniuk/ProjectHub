import withChildren from '@/@types/withChildren'
import { NextPage } from 'next'
import Header from './_components/header'
import Footer from '@/components/footer'

const AppLayout: NextPage<withChildren> = ({ children }) => {
	return (
		<div className='flex min-h-screen flex-col'>
			<Header />
			<main className='h-page-children-wrapper'>{children}</main>
			<Footer />
		</div>
	)
}

export default AppLayout
