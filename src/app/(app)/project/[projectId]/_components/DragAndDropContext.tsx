'use client'

import withChildren from '@/@types/withChildren'
import updateCardColumnId from '@/api/updateCardColumnId'
import { DndContext } from '@dnd-kit/core'
import { useMutation } from '@tanstack/react-query'

const DragAndDropContext: React.FC<withChildren> = ({ children }) => {
	const moveCardMutation = useMutation({
		mutationFn: updateCardColumnId,
	})

	const handleDragEnd = async (event: any) => {
		const { active, over } = event

		const cardId = active.id.split('task-')[1]
		const columnId = over.id.split('column-')[1]

		await moveCardMutation.mutateAsync({
			cardId,
			columnId,
		})
	}

	return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>
}

export default DragAndDropContext
