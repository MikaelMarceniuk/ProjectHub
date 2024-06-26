'use client'

import ColumnType from '@/@types/column'
import CardSheet from './cardSheet'
import { useQuery } from '@tanstack/react-query'
import getCardsByColumnId from '@/api/getCardsByColumnId'

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
			<li>
				{/* TODO Create Skeleton and error card */}

				{data?.success &&
					data.data?.map((card) => <div key={card.id}>{card.name}</div>)}
			</li>
		</ul>
	)
}

export default ProjectColumn
