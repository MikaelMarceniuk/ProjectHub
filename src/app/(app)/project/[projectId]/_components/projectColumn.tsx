'use client'

import ColumnType from '@/@types/column'
import { useDroppable } from '@dnd-kit/core'
import { ScrollArea } from '@/components/shadcn/scroll-area'
import CardSheet from './cardSheet'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDTOType } from '@/api/getProjectDetailsById'
import TaskCard from './taskCard'

const ProjectColumn: React.FC<ColumnType> = ({ id, name, projectId }) => {
	const queryClient = useQueryClient()
	const { setNodeRef } = useDroppable({
		id: `column-${id}`,
	})

	const getCards = () => {
		const [[_cacheKey, cache]] = queryClient.getQueriesData<{
			id: string
			name: string
			columns: ColumnDTOType
		}>({
			queryKey: ['project', projectId],
		})

		return cache?.columns.find((c) => c.id == id)?.cards || []
	}

	return (
		<ul className='w-full rounded border bg-black p-2'>
			<div className='flex items-center justify-between'>
				<div>
					<span className='text-lg font-bold uppercase'>{name}</span>
				</div>
				<CardSheet type='CREATE' columnId={id} />
			</div>
			<ScrollArea className='h-[660px]' ref={setNodeRef}>
				{getCards().map((c) => (
					<TaskCard key={c.id} {...c} />
				))}
			</ScrollArea>
		</ul>
	)
}

export default ProjectColumn
