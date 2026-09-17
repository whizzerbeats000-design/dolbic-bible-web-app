// Bible data service — Phase 1
// Development fixtures clearly isolated; production will use Supabase translations/verses
import { BOOKS, TRANSLATIONS } from '@/lib/fixtures/books';

export const availableTranslations = TRANSLATIONS.filter(t => t.isPublicDomain);

export function getBooks() {
  return BOOKS; // Fixture only; replace with Supabase query
}

export function getBookById(id: string) {
  return BOOKS.find(b => b.id === id || b.abbreviation.toLowerCase() === id.toLowerCase());
}

// Translation-agnostic verse lookup — uses translation_id concept
export function getVerseContext(bookId: string, chapterNum: number, translationSlug: string = 'kjv') {
  // Fixture: return example verses for development UI verification
  // Production: query Supabase verses table by translation_id
  const book = getBookById(bookId);
  if (!book) return null;
  return {
    book,
    chapter: chapterNum,
    translationSlug,
    translationId: translationSlug === 'kjv' ? 'kjv-1' : 'web-1',
    verses: [
      { id: `v1-${translationSlug}`, num: 1, text: 'Fixture verse text for development. Real data from Supabase translations/verses.' },
    ],
    note: 'Fixture data — not production Bible content.',
  };
}
