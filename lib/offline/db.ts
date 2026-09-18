// @ts-nocheck
import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface OfflineDB extends DBSchema {
  bible_books: { key: string; value: { id: string; title: string; testament: 'old'|'new'; chapterCount: number; abbreviation: string } };
  bible_chapters: { key: string; value: { key: string; translation: string; bookId: string; chapter: number; data: any; updatedAt: string }; indexes: { 'by-book': string } };
  bookmarks: { key: string; value: any };
  highlights: { key: string; value: any };
  prayers: { key: string; value: any };
  plan_progress: { key: string; value: any };
  sync_queue: { key: number; value: { table: string; op: 'insert'|'update'|'delete'; payload: any; createdAt: string }; indexes: { 'by-table': string } };
}

let _db: IDBPDatabase<OfflineDB> | null = null;

export async function getOfflineDb(): Promise<IDBPDatabase<OfflineDB>> {
  if (_db) return _db;
  _db = await openDB<OfflineDB>('dolbic-v1', 1, {
    upgrade(db) {
      db.createObjectStore('bible_books', { keyPath: 'id' });
      const ch = db.createObjectStore('bible_chapters', { keyPath: 'key' });
      ch.createIndex('by-book', 'bookId');
      db.createObjectStore('bookmarks', { keyPath: 'id' });
      db.createObjectStore('highlights', { keyPath: 'id' });
      db.createObjectStore('prayers', { keyPath: 'id' });
      db.createObjectStore('plan_progress', { keyPath: 'planId' });
      const q = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true });
      q.createIndex('by-table', 'table');
    },
  });
  return _db;
}

// Typed helpers
export async function putChapter(translation: string, bookId: string, chapter: number, data: any) {
  const db = await getOfflineDb();
  const key = `${translation}/${bookId}/${chapter}`;
  await db.put('bible_chapters', { key, translation, bookId, chapter, data, updatedAt: new Date().toISOString() });
}
export async function getChapter(translation: string, bookId: string, chapter: number) {
  const db = await getOfflineDb();
  return db.get('bible_chapters', `${translation}/${bookId}/${chapter}`);
}
export async function enqueue(table: string, op: 'insert'|'update'|'delete', payload: any) {
  const db = await getOfflineDb();
  await db.add('sync_queue', { table, op, payload, createdAt: new Date().toISOString() } as any);
}
