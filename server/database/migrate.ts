import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

await migrate(db, { migrationsFolder: './server/database/migrations' })
console.log('Migrations applied.')
await pool.end()
