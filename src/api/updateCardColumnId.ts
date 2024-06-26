'use server'

import db from '@/db'
import { CardSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type UpdateCardColumnIdParams = {
	cardId: string
	columnId: string
}

const updateCardColumnId = async ({
	cardId,
	columnId,
}: UpdateCardColumnIdParams) => {
	try {
		await db
			.update(CardSchema)
			.set({
				columnId,
			})
			.where(eq(CardSchema.id, cardId))

		return {
			isSuccess: true,
		}
	} catch (e) {
		console.log('UpdateCardColumnId/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in move card.',
		}
	}
}

export default updateCardColumnId
