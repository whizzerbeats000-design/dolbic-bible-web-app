'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { bibleRepository } from '@/lib/data/bible-repository';
import type { BibleBook, TranslationSlug } from '@/lib/fixtures/books';
import type { ChapterContent } from '@/lib/data/types';

const chapterCache = new Map<string, Promise<ChapterContent>>();
const bookCachePromise = bibleRepository.listBooks();
const LS_PREFIX = 'bible:chapter:';

function getCachedChapter(key: string): ChapterContent | null {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    return raw ? (JSON.parse(raw) as ChapterContent) : null;
  } catch { return null; }
}
function setCachedChapter(key: string, data: ChapterContent) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(data)); } catch {}
}

export function useChapter(bookId: string, chapter: number, translation: TranslationSlug) {
  const [data, setData] = useState<ChapterContent | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setData(null);
    setError(null);
    const key = `${translation}/${bookId}/${chapter}`;
    // Instant return from localStorage for perceived 0 delay
    const ls = getCachedChapter(key);
    if (ls) { setData(ls); setLoading(false); return; }
    let promise = chapterCache.get(key);
    if (!promise) {
      promise = bibleRepository.getChapter(bookId, chapter, translation).then((ch) => { setCachedChapter(key, ch); return ch; }).catch((err) => {
        chapterCache.delete(key);
        throw err;
      });
      chapterCache.set(key, promise);
    }
    promise
      .then((ch) => {
        if (!cancelled) setData(ch);
      })
      .catch((err) => {
        if (!cancelled) setError(err as Error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookId, chapter, translation]);

  return { data, error, loading };
}

export function useBookList() {
  const [books, setBooks] = useState<BibleBook[]>([]);
  useEffect(() => {
    let cancelled = false;
    bookCachePromise.then((b) => {
      if (!cancelled) setBooks(b);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return books;
}

export function useBookSearch(query: string) {
  const books = useBookList();
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q) ||
        b.id.includes(q),
    );
  }, [books, query]);
}

export function useTranslations() {
  const [translations, setTranslations] = useState<{ slug: TranslationSlug; name: string; abbreviation: string; isPublicDomain: boolean }[]>([]);
  useEffect(() => {
    bibleRepository.listTranslations().then(setTranslations);
  }, []);
  return translations;
}

export interface ChapterNav {
  prevBookId: string | null;
  prevChapter: number | null;
  nextBookId: string | null;
  nextChapter: number | null;
}

export function useChapterNav(bookId: string, chapter: number): ChapterNav {
  const books = useBookList();
  return useMemo(() => {
    const idx = books.findIndex((b) => b.id === bookId);
    if (idx === -1) return { prevBookId: null, prevChapter: null, nextBookId: null, nextChapter: null };
    const book = books[idx];
    let prevBookId: string | null = null;
    let prevChapter: number | null = null;
    let nextBookId: string | null = null;
    let nextChapter: number | null = null;
    if (chapter > 1) {
      prevBookId = book.id;
      prevChapter = chapter - 1;
    } else if (idx > 0) {
      const prev = books[idx - 1];
      prevBookId = prev.id;
      prevChapter = prev.chapterCount;
    }
    if (chapter < book.chapterCount) {
      nextBookId = book.id;
      nextChapter = chapter + 1;
    } else if (idx < books.length - 1) {
      const next = books[idx + 1];
      nextBookId = next.id;
      nextChapter = 1;
    }
    return { prevBookId, prevChapter, nextBookId, nextChapter };
  }, [books, bookId, chapter]);
}

const verseCache = new Map<string, Promise<string | null>>();

export function useVerseText(ref: { bookId: string; chapter: number; verse: number; translation: TranslationSlug } | null): string | null {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    if (!ref) {
      setText(null);
      return;
    }
    let cancelled = false;
    setText(null);
    const key = `${ref.translation}/${ref.bookId}/${ref.chapter}#${ref.verse}`;
    let promise = verseCache.get(key);
    if (!promise) {
      promise = bibleRepository
        .getChapter(ref.bookId, ref.chapter, ref.translation)
        .then((ch) => ch.verses.find((v) => v.n === ref.verse)?.t ?? null)
        .catch(() => null);
      verseCache.set(key, promise);
    }
    promise.then((t) => {
      if (!cancelled) setText(t);
    });
    return () => {
      cancelled = true;
    };
  }, [ref?.bookId, ref?.chapter, ref?.verse, ref?.translation]);

  return text;
}