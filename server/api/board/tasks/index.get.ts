import { db } from '../../../database/client'
import { tasks } from '../../../database/schema'

export default defineEventHandler(async () => {
    return db.select().from(tasks)
})
