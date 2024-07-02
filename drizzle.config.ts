import './src/lib/envConfig'
import { defineConfig } from 'drizzle-kit'
import env from './src/lib/envConfig'

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/schema.ts',
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
	strict: true,
})
