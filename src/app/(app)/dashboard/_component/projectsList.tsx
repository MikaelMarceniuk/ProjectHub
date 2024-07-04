'use client'

import getProjectByUser from '@/api/getProjectByUser'
import { Button } from '@/components/shadcn/button'
import { Card, CardHeader } from '@/components/shadcn/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Skeleton } from '@/components/shadcn/skeleton'
import { generateRandomNumber } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Ellipsis, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Avatar from 'react-avatar'
import { useFormContext } from 'react-hook-form'
import { searchFormType } from '../_providers/searchFormProvider'
import { useDebounce } from '@uidotdev/usehooks'

const ProjectsList: React.FC = () => {
	const { data: session } = useSession()
	const form = useFormContext<searchFormType>()

	const query = form.watch('query')
	const debounceQuery = useDebounce(query, 500)

	const { isFetching, data } = useQuery({
		queryKey: ['projects', debounceQuery],
		queryFn: async () => {
			const apiResp = await getProjectByUser({
				userId: session?.user.id,
				query,
			})

			if (apiResp.isSuccess) {
				return apiResp.data
			}

			return Promise.reject()
		},
		enabled: !!session,
	})

	return (
		<ul className='mt-4 flex flex-wrap gap-4'>
			{isFetching &&
				Array.from({ length: generateRandomNumber(1, 8) }).map((_, i) => (
					<Skeleton key={i} className='h-24 w-full max-w-80' />
				))}

			{!isFetching &&
				data &&
				data.map((project) => (
					<Card
						key={project.id}
						className='w-full max-w-80 cursor-pointer transition-all hover:border-black/90 dark:hover:border-white/90'
					>
						<Link href={'project/' + project.id} prefetch={false}>
							<CardHeader className='flex flex-row justify-between'>
								<div className='flex flex-row items-center gap-4'>
									<Avatar name={project.name} size='40' maxInitials={2} round />
									{project.name}
								</div>
								<div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon'>
												<Ellipsis />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>
												<div className='flex items-center gap-4'>
													Add to Favorites
													<Star size={16} />
												</div>
											</DropdownMenuItem>
											<DropdownMenuItem>Settings</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CardHeader>
						</Link>
					</Card>
				))}
		</ul>
	)
}

export default ProjectsList
