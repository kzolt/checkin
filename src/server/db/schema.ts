// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import {
    pgTableCreator,
    timestamp,
    varchar,
    text,
    boolean,
    pgEnum
} from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cnla_${name}`)

export const centers = pgEnum('centers', ['northridge', 'silverlake', 'altadena'])

export const signins = createTable('signin', {
    id: varchar('id', { length: 256 }).primaryKey(),

    ninja_name: text('ninja_name').notNull(),
    dropoff_guardian: text('dropoff_guardian').notNull(),
    pickup_guardian: text('pickup_guardian'),
    actual_pickup_guardian: text('actual_pickup_guardian'),
    phone_number: text('phone_number'),
    center: centers('center').notNull(),

    time_in: timestamp('time_in', { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    time_out: timestamp('time_out', { withTimezone: true }),
    checked_out: boolean('checked_out').default(false)
})
