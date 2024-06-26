'use server'

import db from '@/db'
import { UserSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getUserByProviderIdParams = {
	providerId: string
}

const getUserByProviderId = async (providerId: getUserByProviderIdParams) => {
	try {
		const dbUser = await db
			.select()
			.from(UserSchema)
			// TODO Solve the error
			// @ts-ignore
			.where(eq(UserSchema.providerId, providerId))

		return {
			success: true,
			data: dbUser,
		}
	} catch (e) {
		console.log('getUserByProviderId/Error: ', e)
		return {
			success: false,
			message: 'Error in creating user.',
		}
	}
}

export default getUserByProviderId
