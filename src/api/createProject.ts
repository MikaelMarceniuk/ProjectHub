'use server'

import db from '@/db'
import { ProjectSchema } from '@/db/schema'

type CreateProjectApiParams = {
	userId: string
	name: string
}

const createProjectApi = async ({ userId, name }: CreateProjectApiParams) => {
	try {
		return {
			isSuccess: true,
			data: await db
				.insert(ProjectSchema)
				.values({
					name,
					ownerId: userId,
				})
				.returning(),
		}
	} catch (e) {
		console.log('CreateProjectApi/Error: ', e)
		return {
			isSuccess: false,
			message: 'Error in create project.',
		}
	}
}

export default createProjectApi
