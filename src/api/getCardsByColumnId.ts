'use server'

import db from '@/db'
import { CardSchema, ColumnSchema, ProjectSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getCardsByColumnIdParams = {
	columnId: string
}

const getCardsByColumnId = async ({ columnId }: getCardsByColumnIdParams) => {
	try {
		const dbCards = await db
			.select()
			.from(CardSchema)
			.where(eq(CardSchema.columnId, columnId))

		return {
			success: true,
			data: dbCards,
		}
	} catch (e) {
		console.log('getCardsByColumnId/Error: ', e)
		return {
			success: false,
			message: 'Error in getting cards.',
		}
	}
}

export default getCardsByColumnId
