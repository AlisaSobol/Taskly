import { db } from '../../../database/client'
import { tasks } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: string, columnId: string, name: string, description: string }>(event)

    const [created] = await db.insert(tasks).values(body).returning()

    setResponseStatus(event, 201)
    return created
})
