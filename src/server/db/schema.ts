// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import { pgTableCreator, timestamp, varchar, text, boolean } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cnla_${name}`)

export const signins = createTable('signin', {
    id: varchar('id', { length: 256 }).primaryKey(),
    ninja_name: text('ninja_name').notNull(),
    guardian_signature: text('guardian_signature'),
    time_in: timestamp('time_in', { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    time_out: timestamp('time_out', { withTimezone: true }),
    checked_out: boolean('checked_out').default(false)
})
