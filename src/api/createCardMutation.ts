'use server'

import CardType from '@/@types/card'
import db from '@/db'
import { CardSchema } from '@/db/schema'

type CreateCardApiParams = CardType

const createCardApi = async ({
	name,
	description,
	dueTo,
	columnId,
}: CreateCardApiParams) => {
	try {
		const [dbCreateCard] = await db
			.insert(CardSchema)
			.values({
				name,
				description,
				dueTo: dueTo?.toISOString(),
				columnId,
			})
			.returning()

		return {
			isSuccess: true,
			data: dbCreateCard,
		}
	} catch (e) {
		console.log('CreateCardApi/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in create card.',
		}
	}
}

export default createCardApi
