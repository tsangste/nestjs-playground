import { defineConfig } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'

export default defineConfig({
  host: process.env.POSTGRES_HOST || 'postgres',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  dbName: process.env.POSTGRES_DATABASE || 'nest',
  debug: process.env.NODE_ENV !== 'production',
  extensions: [Migrator],
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  migrations: {
    path: 'build/migrations',
    pathTs: 'src/migrations',
  },
})
