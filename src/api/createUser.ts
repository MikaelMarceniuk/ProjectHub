'use server'

import db from '@/db'
import { UserSchema } from '@/db/schema'

type CreateUserApiParams = {
	username: string
	email: string
	image: string
	providerId: string
	providerName: string
}

const createUserApi = async (newUser: CreateUserApiParams) => {
	try {
		const createdUser = await db.insert(UserSchema).values(newUser).returning()

		return {
			isSuccess: true,
			data: createdUser,
		}
	} catch (e) {
		console.log('CreateUserApi/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in creating user.',
		}
	}
}

export default createUserApi
