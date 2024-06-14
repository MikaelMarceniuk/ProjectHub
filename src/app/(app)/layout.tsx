import withChildren from '@/@types/withChildren'
import { NextPage } from 'next'
import Header from './_components/header'
import Footer from '@/components/footer'
import ProjectsProvider from '@/providers/projectsProvider'

const AppLayout: NextPage<withChildren> = ({ children }) => {
	return (
		<div className='flex min-h-screen flex-col'>
			<Header />
			<ProjectsProvider>
				<main className='h-page-children-wrapper'>{children}</main>
			</ProjectsProvider>
			<Footer />
		</div>
	)
}

export default AppLayout
