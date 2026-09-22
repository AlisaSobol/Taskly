import { eq } from 'drizzle-orm'
import { db } from '../../../database/client'
import { tasks } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')!
    const body = await readBody<Partial<{ columnId: string, name: string, description: string }>>(event)

    const [updated] = await db.update(tasks).set(body).where(eq(tasks.id, id)).returning()

    if (!updated) {
        throw createError({ statusCode: 404, statusMessage: 'Task not found' })
    }

    return updated
})
