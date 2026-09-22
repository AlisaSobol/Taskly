import { pgTable, text } from 'drizzle-orm/pg-core'

export const columns = pgTable('columns', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
})

export const tasks = pgTable('tasks', {
    id: text('id').primaryKey(),
    columnId: text('column_id').notNull().references(() => columns.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
})
