'use server'

import db from '@/db'
import { ProjectSchema } from '@/db/schema'
import { and, eq, ilike } from 'drizzle-orm'

type getProjectByUserParams = {
	userId: string
	query: string | null
}

const getProjectByUser = async ({ userId, query }: getProjectByUserParams) => {
	try {
		const dbResp = await db
			.select()
			.from(ProjectSchema)
			.where(
				and(
					eq(ProjectSchema.ownerId, userId),
					ilike(ProjectSchema.name, `%${query || ''}%`),
				),
			)

		return {
			isSuccess: true,
			data: dbResp,
		}
	} catch (e) {
		console.log('getProjectByUser/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in creating user.',
		}
	}
}

export default getProjectByUser
