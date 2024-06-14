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
		await db.insert(UserSchema).values(newUser)
		return true
	} catch (e) {
		console.log('CreateUserApi/Error: ', e)
		return false
	}
}

export default createUserApi
