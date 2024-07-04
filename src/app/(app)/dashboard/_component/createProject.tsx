'use client'

import ProjectType from '@/@types/project'
import createProjectApi from '@/api/createProject'
import { Button } from '@/components/shadcn/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/shadcn/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newProjectSchema = z.object({
	name: z.string().min(6),
})

type newProjectSchemaType = z.infer<typeof newProjectSchema>

const CreateProject = () => {
	const { data: session } = useSession()
	const queryClient = useQueryClient()

	const newProjectForm = useForm<newProjectSchemaType>({
		resolver: zodResolver(newProjectSchema),
		defaultValues: {
			name: '',
		},
	})

	const createProjectMutation = useMutation({
		mutationFn: createProjectApi,
		onSuccess({ isSuccess, data }) {
			if (!isSuccess) {
				// TODO Should send some error message
				return
			}

			const projectsInCache = queryClient.getQueriesData<ProjectType[]>({
				queryKey: ['projects', ''],
			})

			const [cacheKey, cache] = projectsInCache[0]
			const newCache = cache ? [...cache, data] : [data]

			queryClient.setQueryData(cacheKey, newCache)
		},
	})

	useEffect(() => {
		if (newProjectForm.formState.isSubmitSuccessful) newProjectForm.reset()
	}, [newProjectForm.formState.isSubmitSuccessful])

	const handleCreateNewProject = async ({ name }: newProjectSchemaType) =>
		await createProjectMutation.mutate({ name, userId: session?.user.id })

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='xlg'>Create new Project...</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Let's build something new.</DialogTitle>
					<DialogDescription>
						This will create a new project with the "Kanban" default columns.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...newProjectForm}>
						<form
							className='space-y-4'
							onSubmit={newProjectForm.handleSubmit(handleCreateNewProject)}
						>
							<FormField
								control={newProjectForm.control}
								name='name'
								render={({ field }) => (
									<FormItem className='flex-1'>
										<FormLabel>Project Name</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Your new project name'
												className='h-12'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button size='xlg' className='w-full'>
								Create project
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CreateProject
