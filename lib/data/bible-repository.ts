// Bible repository — the single gateway to Scripture.
// Fixture implementation loads public-domain KJV/WEB JSON from
// lib/fixtures/verses. Production swaps this for a Supabase-backed
// implementation of the same interface (translations/verses tables).

import { getBookByIdOrAbbrev, getBookTitle, type BibleBook, type TranslationSlug } from '@/lib/fixtures/books';
import type { ChapterContent, ChapterVerse } from '@/lib/data/types';

export interface BibleRepository {
  listTranslations(): Promise<{ slug: TranslationSlug; name: string; abbreviation: string; isPublicDomain: boolean; licenseUrl?: string }[]>;
  listBooks(): Promise<BibleBook[]>;
  getBook(query: string): Promise<BibleBook | undefined>;
  getChapter(bookId: string, chapter: number, translation: TranslationSlug): Promise<ChapterContent>;
}

type ChapterMap = { [chapter: string]: ChapterVerse[] };
type LazyLoaders = { [book: string]: () => Promise<ChapterMap> };

async function loadChapterMap(translation: TranslationSlug): Promise<LazyLoaders> {
  return (await import(`@/lib/fixtures/verses/${translation}/index`)).loaders as LazyLoaders;
}

export class FixtureBibleRepository implements BibleRepository {
  async listTranslations() {
    const { TRANSLATIONS } = await import('@/lib/fixtures/books');
    return TRANSLATIONS.map((t) => ({
      slug: t.slug,
      name: t.name,
      abbreviation: t.abbreviation,
      isPublicDomain: t.isPublicDomain,
      licenseUrl: t.licenseUrl,
    }));
  }

  async listBooks() {
    const { BOOKS } = await import('@/lib/fixtures/books');
    return BOOKS;
  }

  async getBook(query: string) {
    return getBookByIdOrAbbrev(query);
  }

  async getChapter(bookId: string, chapter: number, translation: TranslationSlug): Promise<ChapterContent> {
    const book = getBookByIdOrAbbrev(bookId) ?? (await this.getBook(bookId));
    if (!book) throw new Error(`Unknown book: ${bookId}`);
    if (chapter < 1 || chapter > book.chapterCount) {
      throw new RangeError(`Chapter ${chapter} out of range for ${book.title} (1-${book.chapterCount})`);
    }
    const loaders = await loadChapterMap(translation);
    const load = loaders[book.abbreviation];
    if (!load) throw new Error(`No verse fixture for ${translation}/${book.abbreviation}`);
    const chapterMap = await load();
    const verses = chapterMap[String(chapter)];
    if (!Array.isArray(verses) || verses.length === 0) {
      throw new Error(`Verse fixture missing: ${translation}/${book.abbreviation} ${chapter}`);
    }
    return {
      bookId: book.id,
      bookTitle: book.title,
      chapter,
      translation,
      verses: verses.map((v) => ({ n: v.n, t: v.t })),
    };
  }

  // Format a Scripture reference string ("John 3:16") from a chapter + verse.
  formatReference(bookId: string, chapter: number, verse?: number): string {
    const title = getBookTitle(bookId);
    return verse ? `${title} ${chapter}:${verse}` : `${title} ${chapter}`;
  }
}

export const bibleRepository: BibleRepository = new FixtureBibleRepository();