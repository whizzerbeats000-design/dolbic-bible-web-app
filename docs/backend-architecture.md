# DOLBIC Bible — Backend Architecture
*Next.js 14 Server Actions · Supabase PostgreSQL · Drizzle ORM · IndexedDB Offline Sync*

## 1. Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Next.js 14 App Router (Vercel)                                  │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  UI (RSC)    │→ │ Server Actions   │→ │ Drizzle ORM      │  │
│  │  Client      │  │  "use server"    │  │  (type-safe SQL) │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
│                           │                    │                │
│                           ↓                    ↓                │
│                    ┌────────────┐      ┌──────────────┐         │
│                    │ Supabase   │      │ IndexedDB    │         │
│                    │ Auth + PG  │←Sync→│ (idb) Offline│         │
│                    │ RLS        │      │ Bible Cache  │         │
│                    └────────────┘      └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

**Principles:**
- **Server Actions are the only write path** — no direct client Supabase writes (RLS defense-in-depth).
- **Drizzle is single source of truth** for schema; `drizzle-kit` generates SQL, Supabase runs it.
- **Offline-first**: IndexedDB is primary read for Bible text; Server Actions sync queue drains on `online` + `visibilitychange` + `periodicsync`.

## 2. Data Model

### 2.1 Entity Relationship

```
auth.users (Supabase Auth)
    1──1 profiles
    1──* bookmarks
    1──* highlights
    1──* prayers
    1──* reading_plan_progress
    1──* reading_plan_enrollments

reading_plans 1──* reading_plan_days
bible_books 1──* bible_chapters 1──* bible_verses (per translation)
```

### 2.2 Supabase vs IndexedDB

| Store | Tables | Purpose |
|-------|--------|---------|
| **Postgres (Supabase)** | profiles, bookmarks, highlights, prayers, reading_plans, reading_plan_days, reading_plan_enrollments, bible_* (optional) | Source of truth, RLS, cross-device |
| **IndexedDB (idb)** | `bible_chapters`, `bible_books`, `sync_queue`, `bookmarks`, `prayers`, `plan_progress` | Offline read + write queue |

Bible verses remain as JSON fixtures for offline bundle ( `lib/fixtures/verses/*.json` ) but are lazily cached to IndexedDB on first read; Postgres `bible_verses` is added for future CMS without breaking offline.

## 3. Drizzle Schemas

See `lib/db/schema.ts`. Key design decisions:

- **UUID primary keys** with `pgcrypto gen_random_uuid()` for offline id generation (no collision).
- **Cascading deletes** on `user_id` for GDPR `DELETE FROM auth.users`.
- **Composite unique** on `(user_id, book_id, chapter, verse, translation)` for bookmarks to prevent duplicates.
- **Enum types** for `translation_slug`, `highlight_color`, `plan_accent`, `content_status`.
- **Timestamps** `created_at timestamptz default now()` + `updated_at` trigger.

## 4. Server Actions Contract

All actions in `lib/actions/*.ts` are `"use server"` and:

1. `const supabase = await createSupabaseServerClient()` → get `user` via `auth.getUser()` (throws if unauthenticated).
2. `const db = getDb()` → Drizzle with `postgres-js` over Supabase connection string (pooled via `pg_bouncer`).
3. Validate with `zod` → Drizzle insert → `revalidatePath` → return `{ data, error }`.

Example: `actions/bookmarks.ts:toggleBookmark(ref)` handles idempotent toggle.

## 5. Offline Sync Strategy

### 5.1 IndexedDB Schema (`lib/offline/db.ts`)

```ts
// idb database `dolbic-v1`
stores: {
  bible_books: 'id',
  bible_chapters: '[translation+bookId+chapter]', // compound
  bookmarks: 'id',
  highlights: 'id',
  prayers: 'id',
  plan_progress: 'planId',
  sync_queue: '++id, table, op' // auto-increment
}
```

### 5.2 Write Path (Offline-First)

```
UI → useSaved().addBookmark(ref)
  → 1. Optimistic update local state
  → 2. put() to IndexedDB `bookmarks`
  → 3. push { table:'bookmarks', op:'insert', payload } to sync_queue
  → 4. if online: drainQueue() else: wait for `online` event
```

`drainQueue()` iterates `sync_queue` in order, calls corresponding Server Action, on success deletes queue entry, on 409 (duplicate) also deletes, on network error keeps and retries with exponential backoff.

### 5.3 Read Path (Stale-While-Revalidate)

```
useChapter(book, ch, tr):
  1. Try IndexedDB bible_chapters.get([tr, book, ch]) → instant render (0ms)
  2. In parallel, fetch Server Action getChapter() if not cached or `updated_at` > 24h
  3. On fetch, put to IndexedDB and re-render
```

First load after install triggers `precachePopularBooks(['jhn','psa','mat','gen'], translation)` in background (Web Worker).

### 5.4 Conflict Resolution

- **Bookmarks/Highlights**: Last-write-wins via `updated_at`; unique constraint prevents duplicates.
- **Prayers**: Append-only, no conflict.
- **Plan progress**: Merge `completedDays` as set union, `currentDay = max(local, remote)`.

### 5.5 Background Sync

- `window.addEventListener('online', drainQueue)`
- `document.addEventListener('visibilitychange', () => if (!hidden) drainQueue())`
- Periodic 5m `setInterval` when app foregrounded
- Future: `navigator.serviceWorker.ready.then(r => r.periodicSync.register('dolbic-sync'))` for PWA

## 6. Security (RLS)

All Postgres tables have `ENABLE ROW LEVEL SECURITY` + policies:

```sql
-- Example: bookmarks
CREATE POLICY "Users manage own bookmarks"
ON bookmarks FOR ALL USING (auth.uid() = user_id);
```

Supabase `service_role` bypasses RLS for Server Actions that need to validate via `auth.getUser()` server-side.

## 7. File Map

```
drizzle.config.ts
lib/db/
  schema.ts          # All tables + relations + enums
  index.ts           # getDb() singleton (postgres-js)
  migrate.ts         # runMigrations helper
lib/supabase/
  client.ts          # Browser client (anon key, for auth UI only)
  server.ts          # Server client (cookies, for Server Actions)
lib/actions/
  bookmarks.ts       # toggleBookmark, listBookmarks
  prayers.ts         # addPrayer, listPrayers
  reading-plans.ts   # enroll, completeDay, progress
  bible.ts           # getChapter (cached)
lib/offline/
  db.ts              # idb openDB + typed wrappers
  sync.ts            # queue + drainQueue + listeners
  bible-cache.ts     # precache, getCachedChapter
```

## 8. Setup

```bash
# 1. Env (Vercel + local .env.local)
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # server only
DATABASE_URL=postgres://postgres.<project>:6543/postgres?pgbouncer=true

# 2. Install
pnpm add drizzle-orm postgres @supabase/supabase-js idb
pnpm add -D drizzle-kit

# 3. Push schema (generates SQL from lib/db/schema.ts)
pnpm drizzle-kit push

# 4. Run
pnpm dev
```

## 9. Migration Path from Current Fixtures

Current `lib/data/*-repository.ts` (localStorage + JSON fixtures) remain as fallback. Server Actions first try Supabase, on failure fall back to IndexedDB/fixtures, ensuring zero-downtime incremental adoption.

See `lib/data/bible-repository.ts` — already abstracts `getChapter()`; swap internal `fetchFixture()` with `getCachedChapter() || fetchSupabase()`.

## 10. Future

- Supabase Realtime for prayer sharing
- VAPID push for reading reminders via `pg_cron`
- Full-text search via `pg_trgm` on `bible_verses`
