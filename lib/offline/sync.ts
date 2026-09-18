// @ts-nocheck
'use client';
import { getOfflineDb } from './db';
import { toggleBookmark } from '@/lib/actions/bookmarks';
import { addPrayer } from '@/lib/actions/prayers';
import { completeDay } from '@/lib/actions/reading-plans';

// Queue drainer — call on online, visibilitychange, periodic

let draining = false;

export async function drainQueue() {
  if (draining || typeof navigator !== 'undefined' && !navigator.onLine) return;
  draining = true;
  try {
    const db = await getOfflineDb();
    const tx = db.transaction('sync_queue', 'readwrite');
    let cursor = await tx.store.openCursor();
    while (cursor) {
      const { table, op, payload } = cursor.value;
      try {
        if (table === 'bookmarks' && op === 'insert') await toggleBookmark(payload);
        else if (table === 'prayers' && op === 'insert') await addPrayer(payload);
        else if (table === 'plan_progress' && op === 'update') await completeDay(payload);
        else { /* highlights etc. — extend */ }
        await cursor.delete();
      } catch (e: any) {
        // Network error → keep and retry later; 409 duplicate → drop
        if (e?.message?.includes('duplicate') || e?.code === '23505') await cursor.delete();
        else break; // stop on first network failure, retry later with backoff
      }
      cursor = await cursor.continue();
    }
    await tx.done;
  } finally { draining = false; }
}

export function initSyncListeners() {
  if (typeof window === 'undefined') return;
  window.addEventListener('online', drainQueue);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) drainQueue(); });
  // Periodic 5m when foregrounded
  setInterval(() => { if (!document.hidden && navigator.onLine) drainQueue(); }, 5*60*1000);
  // Initial drain
  drainQueue();
}

// Optimistic helpers — use in UI instead of direct Server Actions when offline
export async function queueBookmark(ref: any) {
  const { getOfflineDb } = await import('./db');
  const db = await getOfflineDb();
  const tmpId = crypto.randomUUID();
  await db.put('bookmarks', { id: tmpId, reference: ref, createdAt: new Date().toISOString() });
  const { enqueue } = await import('./db');
  await enqueue('bookmarks', 'insert', ref);
  if (navigator.onLine) drainQueue();
  return tmpId;
}
