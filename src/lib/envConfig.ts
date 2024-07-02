import { loadEnvConfig } from '@next/env'
import { z } from 'zod'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const envSchema = z.object({
	DISCORD_CLIENT_ID: z.string().min(1),
	DISCORD_CLIENT_SECRET: z.string().min(1),

	GITHUB_ID: z.string().min(1),
	GITHUB_SECRET: z.string().min(1),

	NEXTAUTH_URL: z.string().min(1),
	NEXTAUTH_SECRET: z.string().min(1),

	POSTGRES_URL: z.string().min(1),
})

const { data, error } = envSchema.safeParse(process.env)

if (error) {
	throw new Error(error.toString())
}

const env = data

export default env
