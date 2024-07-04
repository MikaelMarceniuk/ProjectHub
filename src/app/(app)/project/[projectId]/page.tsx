'use client'

import { Button } from '@/components/shadcn/button'
import { Settings } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import ProjectColumn from './_components/projectColumn'
import DragAndDropContext from './_components/DragAndDropContext'
import { useQuery } from '@tanstack/react-query'
import getProjectDetailsById from '@/api/getProjectDetailsById'
import { useToast } from '@/hooks/useToast'
import { Skeleton } from '@/components/shadcn/skeleton'

type ProjectPageType = {
	params: {
		projectId: string
	}
}

const ProjectPage: NextPage<ProjectPageType> = ({ params }) => {
	const { toast } = useToast()
	const router = useRouter()

	const { isFetching, data } = useQuery({
		queryKey: ['project', params.projectId],
		queryFn: async () => {
			const apiResp = await getProjectDetailsById({
				projectId: params.projectId,
			})
			if (!apiResp.isSuccess) {
				toast({
					title: 'Error in getting project.',
					description: 'Check your connection and try again later.',
					variant: 'destructive',
				})
				router.replace('/dashboard')
				return Promise.reject()
			}

			return apiResp.data
		},
		enabled: !!params.projectId,
	})

	return (
		<div className='h-full'>
			<div className='flex h-16 items-center justify-between border-b border-b-gray-500 px-8 py-4'>
				{isFetching ? (
					<div className='flex w-full justify-between'>
						<Skeleton className='h-6 w-32' />
						<Skeleton className='h-8 w-8' />
					</div>
				) : (
					<>
						<span>{data?.name}</span>
						<Button size='icon' variant='ghost'>
							<Settings />
						</Button>
					</>
				)}
			</div>
			<div className='flex h-[calc(100%-64px)] gap-14 p-8'>
				<DragAndDropContext>
					{isFetching ? (
						<div className='flex h-full w-full gap-14'>
							<Skeleton className='h-full w-full' />
							<Skeleton className='h-full w-full' />
							<Skeleton className='h-full w-full' />
						</div>
					) : (
						data?.columns.map((c) => <ProjectColumn key={c.id} {...c} />)
					)}
				</DragAndDropContext>
			</div>
		</div>
	)
}

export default ProjectPage
