// @ts-nocheck
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Singleton — reuse in Server Actions & Route Handlers
// Uses Supabase pooled connection (pgBouncer) via DATABASE_URL
// e.g. postgres://postgres.<ref>:5432/postgres?pgbouncer=true

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL missing — set Supabase pooled connection string');
  const client = postgres(url, { prepare: false, max: 1 });
  _db = drizzle(client, { schema });
  return _db;
}

export type Db = ReturnType<typeof getDb>;
export * as dbSchema from './schema';
