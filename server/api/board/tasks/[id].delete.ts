import { eq } from 'drizzle-orm'
import { db } from '../../../database/client'
import { tasks } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')!

    const [deleted] = await db.delete(tasks).where(eq(tasks.id, id)).returning()

    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    return deleted
})
