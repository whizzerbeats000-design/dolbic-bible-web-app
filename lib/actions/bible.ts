// @ts-nocheck
'use server';
import { getCachedChapter } from '@/lib/offline/bible-cache';

// Server Action wrapper that also benefits from IndexedDB cache on client
// Usage: const { data } = await getChapterAction('jhn', 3, 'kjv')
// On client, prefer getCachedChapter() directly for instant offline read

export async function getChapterAction(bookId: string, chapter: number, translation: 'kjv'|'web') {
  // This runs on server — no IndexedDB here, just Drizzle or fixture fallback
  const { bibleRepository } = await import('@/lib/data/bible-repository');
  return bibleRepository.getChapter(bookId, chapter, translation);
}
