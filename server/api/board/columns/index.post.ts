import { db } from '../../../database/client'
import { columns } from '../../../database/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody<{ id: string, name: string }>(event)

    const [created] = await db.insert(columns).values(body).returning()

    setResponseStatus(event, 201)
    return created
})
