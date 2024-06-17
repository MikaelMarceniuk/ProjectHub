'use server'

import db from '@/db'
import { ColumnSchema, ProjectSchema } from '@/db/schema'

type CreateProjectApiParams = {
	userId: string
	name: string
}

const createProjectApi = async ({ userId, name }: CreateProjectApiParams) => {
	try {
		const [dbCreatedProject] = await db
			.insert(ProjectSchema)
			.values({
				name,
				ownerId: userId,
			})
			.returning()

		await db.insert(ColumnSchema).values([
			{ name: 'To-do', order: 0, projectId: dbCreatedProject.id },
			{ name: 'Doing', order: 1, projectId: dbCreatedProject.id },
			{ name: 'Done', order: 2, projectId: dbCreatedProject.id },
		])

		return {
			isSuccess: true,
			data: dbCreatedProject,
		}
	} catch (e) {
		console.log('CreateProjectApi/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in create project.',
		}
	}
}

export default createProjectApi
