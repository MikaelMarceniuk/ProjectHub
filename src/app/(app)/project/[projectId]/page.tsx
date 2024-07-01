import getProjectById from '@/api/getProjectById'
import { Button } from '@/components/shadcn/button'
import { Settings } from 'lucide-react'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import ProjectColumn from './_components/projectColumn'
import DragAndDropContext from './_components/DragAndDropContext'

type ProjectPageType = {
	params: {
		projectId: string
	}
}

const ProjectPage: NextPage<ProjectPageType> = async ({ params }) => {
	const apiProject = await getProjectById({ projectId: params.projectId })
	if (!apiProject.success) redirect('/dashboard?error=projectnotfound')

	return (
		<div>
			<div className='flex h-16 items-center justify-between border-b border-b-gray-500 px-8 py-4'>
				<span>{apiProject.data?.project.name}</span>
				<Button size='icon' variant='ghost'>
					<Settings />
				</Button>
			</div>
			<div className='flex h-[calc(100%-64px)] gap-14 p-8'>
				<DragAndDropContext>
					{apiProject.data?.project.columns.map((c) => (
						<ProjectColumn key={c.id} {...c} />
					))}
				</DragAndDropContext>
			</div>
		</div>
	)
}

export default ProjectPage
