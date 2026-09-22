import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { columns, tasks } from './schema'

const seedDataPath = fileURLToPath(new URL('../../mock-api/db.json', import.meta.url))
const seedData = JSON.parse(readFileSync(seedDataPath, 'utf-8'))

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function seed() {
    await db.delete(tasks)
    await db.delete(columns)

    await db.insert(columns).values(seedData.columns)
    await db.insert(tasks).values(seedData.tasks)

    console.log(`Seeded ${seedData.columns.length} columns and ${seedData.tasks.length} tasks.`)
    await pool.end()
}

seed()
