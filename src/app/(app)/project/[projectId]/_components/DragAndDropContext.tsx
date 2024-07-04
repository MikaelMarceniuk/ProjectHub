'use client'

import CardType from '@/@types/card'
import withChildren from '@/@types/withChildren'
import updateCardColumnId from '@/api/updateCardColumnId'
import { useToast } from '@/hooks/useToast'
import { DndContext } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const DragAndDropContext: React.FC<withChildren> = ({ children }) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const moveCardMutation = useMutation({
		mutationFn: updateCardColumnId,
		onSuccess({ isSuccess, data }, { cardId, columnId }) {
			if (!isSuccess) {
				toast({
					title: 'Error in moving card.',
					description: 'Check your connection and try again later.',
					variant: 'destructive',
				})
				return Promise.reject()
			}
			const columnsInCache = queryClient.getQueriesData<CardType[]>({
				queryKey: ['column'],
			})

			// Removes the card from old column
			columnsInCache.forEach((column) => {
				const [cacheKey, cache] = column
				if (!cache) return cache

				const cardIndex = cache.findIndex((card) => card.id == cardId)
				if (cardIndex != -1) {
					const newCache = [...cache]
					newCache.splice(cardIndex, 1)
					queryClient.setQueryData(cacheKey, newCache)
				}
			})

			// Updates the card in new column
			const newColumnCache = queryClient.getQueriesData<CardType[]>({
				queryKey: ['column', { id: columnId }],
			})

			const [cacheKey, cache] = newColumnCache[0]
			const newCache = cache ? [...cache, data] : [data]

			queryClient.setQueryData(cacheKey, newCache)
		},
	})

	const handleDragEnd = async (event: any) => {
		const { active, over } = event

		if (!over.id) return

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
