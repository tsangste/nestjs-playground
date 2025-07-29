import { defineConfig } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'

export default defineConfig({
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5440,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  dbName: process.env.PG_DATABASE || 'app',
  debug: process.env.NODE_ENV !== 'production',
  extensions: [Migrator],
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  migrations: {
    path: 'build/migrations',
    pathTs: 'src/migrations',
  },
})
