import { NextPage } from 'next'
import SearchProjectAndTask from './_component/searchProjectAndTask'
import CreateProject from './_component/createProject'
import ProjectsList from './_component/projectsList'

const DashboardPage: NextPage = () => {
	return (
		<div className='mt-4 flex h-full flex-col gap-8 px-9 py-2'>
			<div className='flex gap-4'>
				<SearchProjectAndTask />
				<CreateProject />
			</div>
			<div className='flex gap-8'>
				<div className='w-3/5'>
					<span>Recent Previews</span>
					<ul></ul>
				</div>

				<div className='w-full'>
					<span>Projects</span>
					{/* <ProjectsList /> */}
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
