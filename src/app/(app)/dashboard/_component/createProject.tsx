'use client'

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
import { useProjectContext } from '@/providers/projectsProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newProjectSchema = z.object({
	name: z.string().min(6),
})

type newProjectSchemaType = z.infer<typeof newProjectSchema>

const CreateProject = () => {
	const { createNewProject } = useProjectContext()

	const newProjectForm = useForm<newProjectSchemaType>({
		resolver: zodResolver(newProjectSchema),
		defaultValues: {
			name: '',
		},
	})

	useEffect(() => {
		if (newProjectForm.formState.isSubmitSuccessful) newProjectForm.reset()
	}, [newProjectForm.formState.isSubmitSuccessful])

	const handleCreateNewProject = ({ name }: newProjectSchemaType) => {
		createNewProject(name)
	}

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
