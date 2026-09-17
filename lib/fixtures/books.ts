// DOLBIC Bible — Canonical book metadata (development fixture)
// Verified public-domain translations only (KJV, WEB). Translation-agnostic.
// Production: this table is replaced by Supabase `books` / `translations`.
//
// Each entry mirrors the architecture's `books` table:
//   id, testament, order_index, abbreviation, name, chapter_count

export type Testament = 'old' | 'new';

export interface BibleBook {
  id: string;
  abbreviation: string;
  title: string;
  testament: Testament;
  chapterCount: number;
}

export type TranslationSlug = 'kjv' | 'web';

export interface TranslationFixture {
  id: string;
  slug: TranslationSlug;
  name: string;
  abbreviation: string;
  language: string;
  isPublicDomain: boolean;
  licenseUrl?: string;
  attribution: string;
}

// Canonical 66-book ordering per the architecture's `books` table.
export const BOOKS: BibleBook[] = [
  { id: 'gen', abbreviation: 'GEN', title: 'Genesis', testament: 'old', chapterCount: 50 },
  { id: 'exo', abbreviation: 'EXO', title: 'Exodus', testament: 'old', chapterCount: 40 },
  { id: 'lev', abbreviation: 'LEV', title: 'Leviticus', testament: 'old', chapterCount: 27 },
  { id: 'num', abbreviation: 'NUM', title: 'Numbers', testament: 'old', chapterCount: 36 },
  { id: 'deu', abbreviation: 'DEU', title: 'Deuteronomy', testament: 'old', chapterCount: 34 },
  { id: 'jos', abbreviation: 'JOS', title: 'Joshua', testament: 'old', chapterCount: 24 },
  { id: 'jdg', abbreviation: 'JDG', title: 'Judges', testament: 'old', chapterCount: 21 },
  { id: 'rut', abbreviation: 'RUT', title: 'Ruth', testament: 'old', chapterCount: 4 },
  { id: '1sa', abbreviation: '1SA', title: '1 Samuel', testament: 'old', chapterCount: 31 },
  { id: '2sa', abbreviation: '2SA', title: '2 Samuel', testament: 'old', chapterCount: 24 },
  { id: '1ki', abbreviation: '1KI', title: '1 Kings', testament: 'old', chapterCount: 22 },
  { id: '2ki', abbreviation: '2KI', title: '2 Kings', testament: 'old', chapterCount: 25 },
  { id: '1ch', abbreviation: '1CH', title: '1 Chronicles', testament: 'old', chapterCount: 29 },
  { id: '2ch', abbreviation: '2CH', title: '2 Chronicles', testament: 'old', chapterCount: 36 },
  { id: 'ezr', abbreviation: 'EZR', title: 'Ezra', testament: 'old', chapterCount: 10 },
  { id: 'neh', abbreviation: 'NEH', title: 'Nehemiah', testament: 'old', chapterCount: 13 },
  { id: 'est', abbreviation: 'EST', title: 'Esther', testament: 'old', chapterCount: 10 },
  { id: 'job', abbreviation: 'JOB', title: 'Job', testament: 'old', chapterCount: 42 },
  { id: 'psa', abbreviation: 'PSA', title: 'Psalms', testament: 'old', chapterCount: 150 },
  { id: 'pro', abbreviation: 'PRO', title: 'Proverbs', testament: 'old', chapterCount: 31 },
  { id: 'ecc', abbreviation: 'ECC', title: 'Ecclesiastes', testament: 'old', chapterCount: 12 },
  { id: 'sng', abbreviation: 'SNG', title: 'Song of Solomon', testament: 'old', chapterCount: 8 },
  { id: 'isa', abbreviation: 'ISA', title: 'Isaiah', testament: 'old', chapterCount: 66 },
  { id: 'jer', abbreviation: 'JER', title: 'Jeremiah', testament: 'old', chapterCount: 52 },
  { id: 'lam', abbreviation: 'LAM', title: 'Lamentations', testament: 'old', chapterCount: 5 },
  { id: 'ezk', abbreviation: 'EZK', title: 'Ezekiel', testament: 'old', chapterCount: 48 },
  { id: 'dan', abbreviation: 'DAN', title: 'Daniel', testament: 'old', chapterCount: 12 },
  { id: 'hos', abbreviation: 'HOS', title: 'Hosea', testament: 'old', chapterCount: 14 },
  { id: 'jol', abbreviation: 'JOL', title: 'Joel', testament: 'old', chapterCount: 3 },
  { id: 'amo', abbreviation: 'AMO', title: 'Amos', testament: 'old', chapterCount: 9 },
  { id: 'oba', abbreviation: 'OBA', title: 'Obadiah', testament: 'old', chapterCount: 1 },
  { id: 'jon', abbreviation: 'JON', title: 'Jonah', testament: 'old', chapterCount: 4 },
  { id: 'mic', abbreviation: 'MIC', title: 'Micah', testament: 'old', chapterCount: 7 },
  { id: 'nam', abbreviation: 'NAM', title: 'Nahum', testament: 'old', chapterCount: 3 },
  { id: 'hab', abbreviation: 'HAB', title: 'Habakkuk', testament: 'old', chapterCount: 3 },
  { id: 'zep', abbreviation: 'ZEP', title: 'Zephaniah', testament: 'old', chapterCount: 3 },
  { id: 'hag', abbreviation: 'HAG', title: 'Haggai', testament: 'old', chapterCount: 2 },
  { id: 'zec', abbreviation: 'ZEC', title: 'Zechariah', testament: 'old', chapterCount: 14 },
  { id: 'mal', abbreviation: 'MAL', title: 'Malachi', testament: 'old', chapterCount: 4 },
  { id: 'mat', abbreviation: 'MAT', title: 'Matthew', testament: 'new', chapterCount: 28 },
  { id: 'mar', abbreviation: 'MRK', title: 'Mark', testament: 'new', chapterCount: 16 },
  { id: 'luk', abbreviation: 'LUK', title: 'Luke', testament: 'new', chapterCount: 24 },
  { id: 'jhn', abbreviation: 'JHN', title: 'John', testament: 'new', chapterCount: 21 },
  { id: 'act', abbreviation: 'ACT', title: 'Acts', testament: 'new', chapterCount: 28 },
  { id: 'rom', abbreviation: 'ROM', title: 'Romans', testament: 'new', chapterCount: 16 },
  { id: '1co', abbreviation: '1CO', title: '1 Corinthians', testament: 'new', chapterCount: 16 },
  { id: '2co', abbreviation: '2CO', title: '2 Corinthians', testament: 'new', chapterCount: 13 },
  { id: 'gal', abbreviation: 'GAL', title: 'Galatians', testament: 'new', chapterCount: 6 },
  { id: 'eph', abbreviation: 'EPH', title: 'Ephesians', testament: 'new', chapterCount: 6 },
  { id: 'php', abbreviation: 'PHP', title: 'Philippians', testament: 'new', chapterCount: 4 },
  { id: 'col', abbreviation: 'COL', title: 'Colossians', testament: 'new', chapterCount: 4 },
  { id: '1th', abbreviation: '1TH', title: '1 Thessalonians', testament: 'new', chapterCount: 5 },
  { id: '2th', abbreviation: '2TH', title: '2 Thessalonians', testament: 'new', chapterCount: 3 },
  { id: '1ti', abbreviation: '1TI', title: '1 Timothy', testament: 'new', chapterCount: 6 },
  { id: '2ti', abbreviation: '2TI', title: '2 Timothy', testament: 'new', chapterCount: 4 },
  { id: 'tit', abbreviation: 'TIT', title: 'Titus', testament: 'new', chapterCount: 3 },
  { id: 'phm', abbreviation: 'PHM', title: 'Philemon', testament: 'new', chapterCount: 1 },
  { id: 'heb', abbreviation: 'HEB', title: 'Hebrews', testament: 'new', chapterCount: 13 },
  { id: 'jas', abbreviation: 'JAS', title: 'James', testament: 'new', chapterCount: 5 },
  { id: '1pe', abbreviation: '1PE', title: '1 Peter', testament: 'new', chapterCount: 5 },
  { id: '2pe', abbreviation: '2PE', title: '2 Peter', testament: 'new', chapterCount: 3 },
  { id: '1jn', abbreviation: '1JN', title: '1 John', testament: 'new', chapterCount: 5 },
  { id: '2jn', abbreviation: '2JN', title: '2 John', testament: 'new', chapterCount: 1 },
  { id: '3jn', abbreviation: '3JN', title: '3 John', testament: 'new', chapterCount: 1 },
  { id: 'jud', abbreviation: 'JUD', title: 'Jude', testament: 'new', chapterCount: 1 },
  { id: 'rev', abbreviation: 'REV', title: 'Revelation', testament: 'new', chapterCount: 22 },
];

export const TRANSLATIONS: TranslationFixture[] = [
  {
    id: 'kjv-1',
    slug: 'kjv',
    name: 'King James Version',
    abbreviation: 'KJV',
    language: 'en',
    isPublicDomain: true,
    attribution: 'King James Version — public domain.',
  },
  {
    id: 'web-1',
    slug: 'web',
    name: 'World English Bible',
    abbreviation: 'WEB',
    language: 'en',
    isPublicDomain: true,
    licenseUrl: 'https://ebible.org/engwebp/copyright.htm',
    attribution: 'World English Bible — public domain. No copyright.',
  },
];

export const DEFAULT_TRANSLATION: TranslationSlug = 'kjv';

export function getBookByIdOrAbbrev(query: string): BibleBook | undefined {
  const q = query.toLowerCase();
  return BOOKS.find((b) => b.id === q || b.abbreviation.toLowerCase() === q);
}

export function getTranslation(slug: string): TranslationFixture | undefined {
  return TRANSLATIONS.find((t) => t.slug === slug);
}

export function getBooksByTestament(testament: Testament): BibleBook[] {
  return BOOKS.filter((b) => b.testament === testament);
}

export function getBookTitle(abbreviation: string): string {
  return getBookByIdOrAbbrev(abbreviation)?.title ?? abbreviation;
}