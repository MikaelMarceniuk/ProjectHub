'use server'

import db from '@/db'
import { ProjectSchema, UserSchema } from '@/db/schema'
import { eq } from 'drizzle-orm'

type getUserProjectParams = {
	userId: string
}

const getUserProject = async (userId: getUserProjectParams) => {
	try {
		return {
			success: true,
			data: await db
				.select()
				.from(ProjectSchema)
				.where(eq(ProjectSchema.ownerId, userId)),
		}
	} catch (e) {
		console.log('getUserProject/Error: ', e)
		return {
			success: false,
			message: 'Error in creating user.',
		}
	}
}

export default getUserProject
