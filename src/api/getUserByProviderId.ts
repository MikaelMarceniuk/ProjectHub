'use server'

import db from '@/db'
import { UserSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getUserByProviderIdParams = {
	providerId: string
}

const getUserByProviderId = async (providerId: getUserByProviderIdParams) => {
	try {
		return {
			success: true,
			data: await db
				.select()
				.from(UserSchema)
				.where(eq(UserSchema.providerId, providerId)),
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
