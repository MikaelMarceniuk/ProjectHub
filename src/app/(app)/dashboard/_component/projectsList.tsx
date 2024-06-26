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
import { useQuery } from '@tanstack/react-query'
import { Ellipsis, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Avatar from 'react-avatar'

const ProjectsList: React.FC = () => {
	const searchParams = useSearchParams()
	const { data: session } = useSession()

	const { isFetching, data } = useQuery({
		queryKey: ['projects', { query: searchParams.get('query') }],
		queryFn: async () =>
			await (
				await getProjectByUser({
					// TODO Solve the error
					// @ts-ignore
					userId: session?.user.id,
					// TODO Solve the error
					// @ts-ignore
					query: searchParams.get('query'),
				})
			).data,
	})

	// TODO Create Skeleton and debounce for fetching

	return (
		<ul className='mt-4 flex flex-wrap gap-4'>
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
