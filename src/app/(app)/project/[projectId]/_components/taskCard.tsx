'use client'

import { Card, CardHeader, CardTitle } from '@/components/shadcn/card'
import CardSheet from './cardSheet'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/shadcn/button'
import { GripVerticalIcon } from 'lucide-react'
import { InferSelectModel } from 'drizzle-orm'
import { CardSchema } from '@/db/schema'

const TaskCard: React.FC<InferSelectModel<typeof CardSchema>> = ({
	id,
	columnId,
	name,
}) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `task-${id}`,
	})

	const style = {
		transform: CSS.Translate.toString(transform),
	}

	return (
		<div ref={setNodeRef} style={style}>
			<CardSheet
				type='UPDATE'
				columnId={columnId}
				cardId={id}
				trigger={
					<Card className='mt-2'>
						<CardHeader className='flex flex-row items-center justify-between'>
							<CardTitle className='cursor-pointer text-left font-normal transition-all hover:font-bold'>
								{name}
							</CardTitle>
							<Button
								size='icon'
								variant='ghost'
								className='cursor-grab active:cursor-grabbing'
								{...listeners}
								{...attributes}
							>
								<GripVerticalIcon />
							</Button>
						</CardHeader>
					</Card>
				}
			/>
		</div>
	)
}

export default TaskCard
