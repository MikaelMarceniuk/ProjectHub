import withChildren from '@/@types/withChildren'
import { NextPage } from 'next'
import Header from './_components/header'
import Footer from '@/components/footer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const AppLayout: NextPage<withChildren> = async ({ children }) => {
	const session = await getServerSession()
	if (!session) redirect('/login')

	return (
		<div className='flex flex-col'>
			<Header />
			<main className='h-[calc(100vh-64px)]'>{children}</main>
			<Footer />
		</div>
	)
}

export default AppLayout
