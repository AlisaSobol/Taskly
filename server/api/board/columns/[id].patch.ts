import { eq } from 'drizzle-orm'
import { db } from '../../../database/client'
import { columns } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')!
    const body = await readBody<Partial<{ name: string }>>(event)

    const [updated] = await db.update(columns).set(body).where(eq(columns.id, id)).returning()

    if (!updated) {
        throw createError({ statusCode: 404, statusMessage: 'Column not found' })
    }

    return updated
})
