import { db } from '../../../database/client'
import { columns } from '../../../database/schema'

export default defineEventHandler(async () => {
    return db.select().from(columns)
})
