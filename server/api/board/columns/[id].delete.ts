import { eq } from 'drizzle-orm'
import { db } from '../../../database/client'
import { columns } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')!

    const [deleted] = await db.delete(columns).where(eq(columns.id, id)).returning()

    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: 'Column not found' })
    }

    return deleted
})
