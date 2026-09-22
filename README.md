# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Copy the env example and set `DATABASE_URL` to point at your Postgres instance:

```bash
cp .env.example .env
```

## Database

This project uses PostgreSQL via [Drizzle ORM](https://orm.drizzle.team/). For local development you can run a
project-local Postgres cluster (data stored in the gitignored `.data/` folder, so it never touches any other
Postgres install on your machine):

```bash
# one-time setup
initdb -D .data/postgres -U postgres --auth=trust

# start/stop the local cluster (listens on port 5433)
yarn db:start
yarn db:stop

# create the database (one-time)
psql -h 127.0.0.1 -p 5433 -U postgres -d postgres -c "CREATE DATABASE nuxt3_app;"

# apply schema migrations
yarn db:migrate

# seed with the sample board from mock-api/db.json
yarn db:seed

# browse the data
yarn db:studio
```

If you already have a Postgres server running elsewhere, just point `DATABASE_URL` at it instead and skip the
`db:start`/`initdb` steps.

After changing `server/database/schema.ts`, generate a new migration with `yarn db:generate` and apply it with
`yarn db:migrate`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

Make sure your Postgres database is running and migrated first (see [Database](#database) above).

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
