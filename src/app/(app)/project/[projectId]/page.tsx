import getProjectById from '@/api/getProjectById'
import { Button } from '@/components/shadcn/button'
import { Plus, Settings } from 'lucide-react'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import CardSheet from './_components/cardSheet'

type ProjectPageType = {
	params: {
		projectId: string
	}
}

const ProjectPage: NextPage<ProjectPageType> = async ({ params }) => {
	const apiProject = await getProjectById({ projectId: params.projectId })
	if (!apiProject.success) redirect('/dashboard?error=projectnotfound')

	return (
		<div className='h-full w-full'>
			<div className='flex items-center justify-between border-b border-b-gray-500 px-8 py-4'>
				<span>{apiProject.data?.project.name}</span>
				<Button size='icon' variant='ghost'>
					<Settings />
				</Button>
			</div>
			<div className='flex gap-14 p-8'>
				{apiProject.data?.project.columns.map((c) => (
					<ul key={c.id} className='w-full'>
						<div className='flex items-center justify-between'>
							<div>
								<span className='text-lg font-bold uppercase'>{c.name}</span>
							</div>
							<CardSheet type='CREATE' columnId={c.id} />
						</div>
						<li></li>
					</ul>
				))}
			</div>
		</div>
	)
}

export default ProjectPage
