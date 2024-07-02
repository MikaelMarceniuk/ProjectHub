import env from '@/lib/envConfig'
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const db = drizzlePostgres(postgres(env.POSTGRES_URL))

export default db
