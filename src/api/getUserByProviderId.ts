'use server'

import db from '@/db'
import { UserSchema } from '@/db/schema'
import { InferSelectModel, eq } from 'drizzle-orm'

type getUserByProviderIdSuccessResp = {
	isSuccess: true
	data: InferSelectModel<typeof UserSchema> | null
}

type getUserByProviderIdErrorResp = {
	isSuccess: false
	message: string
}

type getUserByProviderIdResp =
	| getUserByProviderIdSuccessResp
	| getUserByProviderIdErrorResp

const getUserByProviderId = async (
	providerId: string,
): Promise<getUserByProviderIdResp> => {
	try {
		const dbUser = await db
			.select()
			.from(UserSchema)
			.where(eq(UserSchema.providerId, providerId))

		return {
			isSuccess: true,
			data: dbUser[0] || null,
		}
	} catch (e) {
		console.log('getUserByProviderId/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in creating user.',
		}
	}
}

export default getUserByProviderId
