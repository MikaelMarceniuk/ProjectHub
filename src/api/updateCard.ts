'use server'

import CardType from '@/@types/card'
import db from '@/db'
import { CardSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type UpdateCardApiParams = CardType

const updateCardApi = async ({
	id,
	name,
	description,
	dueTo,
	columnId,
}: UpdateCardApiParams) => {
	try {
		const [dbUpdatedCard] = await db
			.update(CardSchema)
			.set({
				name,
				description,
				dueTo: dueTo?.toISOString(),
				columnId,
			})
			.where(eq(CardSchema.id, id))
			.returning()

		return {
			isSuccess: true,
			data: dbUpdatedCard,
		}
	} catch (e) {
		console.log('UpdateCardApi/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in create card.',
		}
	}
}

export default updateCardApi
