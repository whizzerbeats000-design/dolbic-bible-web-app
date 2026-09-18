// @ts-nocheck
import { getOfflineDb, putChapter, getChapter } from './db';
import { bibleRepository } from '@/lib/data/bible-repository';

// Stale-while-revalidate for offline Bible access
export async function getCachedChapter(translation: string, bookId: string, chapter: number) {
  // 1. Instant IndexedDB hit
  const cached = await getChapter(translation, bookId, chapter);
  if (cached) {
    // 2. Revalidate in background if older than 24h
    const age = Date.now() - new Date(cached.updatedAt).getTime();
    if (age > 24*3600*1000) {
      bibleRepository.getChapter(bookId, chapter, translation as any).then(data => putChapter(translation, bookId, chapter, data)).catch(()=>{});
    }
    return cached.data;
  }
  // 3. Miss → fetch, cache, return
  const data = await bibleRepository.getChapter(bookId, chapter, translation as any);
  await putChapter(translation, bookId, chapter, data);
  return data;
}

// Precache popular books on first install (call from useEffect on Home)
export async function precachePopularBooks(translation: string = 'kjv') {
  const popular: Array<[string, number]> = [['jhn', 21], ['psa', 10], ['gen', 5], ['mat', 5]];
  for (const [bookId, maxCh] of popular) {
    for (let ch = 1; ch <= maxCh; ch++) {
      try { await getCachedChapter(translation, bookId, ch); } catch {}
      // Yield to main thread
      await new Promise(r => setTimeout(r, 50));
    }
  }
}

// Warm all chapters of a book when user opens it
export async function precacheBook(bookId: string, translation: string, chapterCount: number) {
  for (let ch = 1; ch <= chapterCount; ch++) {
    getCachedChapter(translation, bookId, ch).catch(()=>{});
  }
}
