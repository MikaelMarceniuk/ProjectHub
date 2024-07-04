'use server'

import db from '@/db'
import { CardSchema, ColumnSchema, ProjectSchema } from '@/db/schema'
import { InferSelectModel, eq } from 'drizzle-orm'

type getProjectByIdParams = {
	projectId: string
}

export type ColumnDTOType = {
	id: string
	name: string
	order: number
	projectId: string
	cards: InferSelectModel<typeof CardSchema>[]
}[]

type getProjectByIdResponseSuccess = {
	isSuccess: true
	data: {
		id: string
		name: string
		columns: ColumnDTOType
	}
}

type getProjectByIdResponseError = {
	isSuccess: false
	message: string
}

type getProjectByIdResponse =
	| getProjectByIdResponseSuccess
	| getProjectByIdResponseError

const getProjectDetailsById = async ({
	projectId,
}: getProjectByIdParams): Promise<getProjectByIdResponse> => {
	try {
		const [dbProject] = await db
			.select()
			.from(ProjectSchema)
			.where(eq(ProjectSchema.id, projectId))

		if (!dbProject) throw new Error('Project not found.')

		const dbColumns = await db
			.select()
			.from(ColumnSchema)
			.where(eq(ColumnSchema.projectId, projectId))

		const columnsWithCards: ColumnDTOType = []
		for (const column of dbColumns) {
			const cards = await db
				.select()
				.from(CardSchema)
				.where(eq(CardSchema.columnId, column.id))

			columnsWithCards.push({
				id: column.id,
				name: column.name,
				order: column.order,
				projectId: column.projectId,
				cards,
			})
		}

		return {
			isSuccess: true,
			data: {
				id: dbProject.id,
				name: dbProject.name,
				columns: columnsWithCards,
			},
		}
	} catch (e) {
		console.log('getProjectById/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in getting project.',
		}
	}
}

export default getProjectDetailsById
