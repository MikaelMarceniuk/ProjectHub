import {
	pgTable,
	varchar,
	timestamp,
	uniqueIndex,
	uuid,
} from 'drizzle-orm/pg-core'

export const UserSchema = pgTable(
	'user',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		username: varchar('username').notNull(),
		email: varchar('email').notNull(),
		image: varchar('image').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		providerId: varchar('provider_id').notNull(),
		providerName: varchar('provider_name').notNull(),
	},
	(user) => ({
		uniqueIdx: uniqueIndex('uniqueIdx').on(user.providerId),
	}),
)

export const ProjectSchema = pgTable('project', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('username').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	ownerId: uuid('owner_id').references(() => UserSchema.id),
})
