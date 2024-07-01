import withChildren from '@/@types/withChildren'
import { NextPage } from 'next'
import Header from './_components/header'
import Footer from '@/components/footer'

const AppLayout: NextPage<withChildren> = ({ children }) => {
	return (
		<div className='flex flex-col'>
			<Header />
			<main className='h-[calc(100vh-64px)]'>{children}</main>
			<Footer />
		</div>
	)
}

export default AppLayout
