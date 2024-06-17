'use server'

import db from '@/db'
import { ColumnSchema, ProjectSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getProjectByIdParams = {
	projectId: string
}

// type getProjectByIdResponseSuccess = {
// 	isSuccess: true,
// 	data: {
// 		project
// 	}
// }

const getProjectById = async ({ projectId }: getProjectByIdParams) => {
	try {
		const dbProject = await db
			.select()
			.from(ProjectSchema)
			.where(eq(ProjectSchema.id, projectId))

		const dbColumns = await db
			.select()
			.from(ColumnSchema)
			.where(eq(ColumnSchema.projectId, projectId))

		return {
			success: true,
			data: {
				project: {
					...dbProject[0],
					columns: dbColumns,
				},
			},
		}
	} catch (e) {
		console.log('getProjectById/Error: ', e)
		return {
			success: false,
			message: 'Error in getting project.',
		}
	}
}

export default getProjectById
