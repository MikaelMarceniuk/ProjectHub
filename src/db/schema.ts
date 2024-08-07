import { sql } from 'drizzle-orm'
import {
	pgTable,
	varchar,
	timestamp,
	uniqueIndex,
	uuid,
	integer,
	text,
	date,
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
		uniqueEmail: uniqueIndex('uniqueEmail').on(sql`lower(${user.email})`),
	}),
)

export const ProjectSchema = pgTable('project', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	ownerId: uuid('owner_id')
		.references(() => UserSchema.id)
		.notNull(),
})

export const ColumnSchema = pgTable('column', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name').notNull(),
	order: integer('order').notNull(),
	projectId: uuid('project_id')
		.references(() => ProjectSchema.id)
		.notNull(),
})

export const CardSchema = pgTable('card', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name').notNull(),
	description: text('description'),
	dueTo: date('dueTo'),
	columnId: uuid('column_id')
		.references(() => ColumnSchema.id)
		.notNull(),
})
