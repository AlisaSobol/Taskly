# Taskly

A kanban-style task board. Create columns, add tasks to them, and edit or delete both — built with Nuxt 4, Vue 3,
Pinia, Nuxt UI, and PostgreSQL via Drizzle ORM.

## Setup

```bash
yarn install
cp .env.example .env
```

## Database

`.env` is gitignored and never shared, so anyone setting this project up fresh (a new machine, a collaborator)
needs their own database. Skip this section if you already have a working `.env` — it's a one-time bootstrap step.

Two connection strings are used:

- `DATABASE_URL` — a **direct** connection, used for migrations and seeding (`yarn db:migrate`, `yarn db:seed`).
- `DATABASE_URL_POOLED` — a **pooled** connection, used by the running app itself. Falls back to `DATABASE_URL`
  when unset.

### Option A: managed Postgres (recommended — e.g. [Neon](https://neon.tech))

1. Create a project and database.
2. Copy the direct connection string into `DATABASE_URL`, and the pooled/PgBouncer connection string into
   `DATABASE_URL_POOLED` (Neon shows both — the pooled one has `-pooler` in the hostname). Using the pooled
   string for the app avoids exhausting the provider's connection limit.
3. Apply schema + sample data:

```bash
yarn db:migrate
yarn db:seed
```

### Option B: local Postgres

Run a project-local cluster (data stored in the gitignored `.data/` folder, so it never touches any other
Postgres install on your machine):

```bash
# one-time setup
initdb -D .data/postgres -U postgres --auth=trust

# start/stop the local cluster (listens on port 5433)
yarn db:start
yarn db:stop

# create the database (one-time)
psql -h 127.0.0.1 -p 5433 -U postgres -d postgres -c "CREATE DATABASE nuxt3_app;"
```

Point both `DATABASE_URL` and `DATABASE_URL_POOLED` (or just leave the latter unset) at
`postgres://postgres@127.0.0.1:5433/nuxt3_app`, then run the same `yarn db:migrate` / `yarn db:seed` as above.

### Everyday commands

```bash
# apply schema migrations
yarn db:migrate

# seed with the sample board from mock-api/db.json
yarn db:seed

# browse the data
yarn db:studio
```

After changing `server/database/schema.ts`, generate a new migration with `yarn db:generate` and apply it with
`yarn db:migrate`.

## Development

Make sure your database is migrated (see above), then:

```bash
yarn dev
```

Runs on `http://localhost:3000`.

## Production

```bash
yarn build
yarn preview   # locally preview the production build
```
