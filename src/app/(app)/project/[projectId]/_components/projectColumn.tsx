'use client'

import ColumnType from '@/@types/column'
import CardSheet from './cardSheet'
import { useQuery } from '@tanstack/react-query'
import getCardsByColumnId from '@/api/getCardsByColumnId'
import { Card, CardHeader, CardTitle } from '@/components/shadcn/card'

const ProjectColumn: React.FC<ColumnType> = ({ id, name }) => {
	const { data, isFetching } = useQuery({
		queryKey: ['column', { id }],
		queryFn: () => getCardsByColumnId({ columnId: id }),
	})

	return (
		<ul className='w-full'>
			<div className='flex items-center justify-between'>
				<div>
					<span className='text-lg font-bold uppercase'>{name}</span>
				</div>
				<CardSheet type='CREATE' columnId={id} />
			</div>
			<li className='mt-4 space-y-2'>
				{/* TODO Create Skeleton and error card */}

				{data?.success &&
					data.data?.map((c) => (
						<CardSheet
							key={c.id}
							type='UPDATE'
							columnId={c.columnId}
							cardId={c.id}
							trigger={
								<Card>
									<CardHeader>
										<CardTitle className='cursor-pointer text-left font-normal hover:font-bold'>
											{c.name}
										</CardTitle>
									</CardHeader>
								</Card>
							}
						/>
					))}
			</li>
		</ul>
	)
}

export default ProjectColumn
