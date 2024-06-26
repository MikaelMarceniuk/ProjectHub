'use server'

import db from '@/db'
import { CardSchema, ColumnSchema, ProjectSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getCardByIdParams = {
	cardId: string
}

const getCardById = async ({ cardId }: getCardByIdParams) => {
	try {
		const [dbCard] = await db
			.select()
			.from(CardSchema)
			.where(eq(CardSchema.id, cardId))

		return {
			success: true,
			data: dbCard,
		}
	} catch (e) {
		console.log('getCardById/Error: ', e)
		return {
			success: false,
			message: 'Error in getting cards.',
		}
	}
}

export default getCardById
