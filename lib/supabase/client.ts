// Supabase integration boundary — Phase 3
// Actual initialization requires environment variables (not committed)
// This creates typed interfaces for data that will come from Supabase

export interface TranslationRecord {
  id: string;
  slug: string;
  name: string;
  language: string;
  is_public_domain: boolean;
  license_url?: string;
  status: 'active' | 'deprecated';
}

export interface BibleBookRecord {
  id: string;
  testament: 'old' | 'new';
  order_index: number;
  abbreviation: string;
  name: string;
}

export interface ChapterRecord {
  id: string;
  book_id: string;
  chapter_number: number;
}

export interface VerseRecord {
  id: string;
  chapter_id: string;
  translation_id: string;
  verse_number: number;
  text: string;
}

export interface DailyContentRecord {
  id: string;
  date: string;
  scripture_book_id: string;
  scripture_chapter_id: string;
  scripture_verse_start: number;
  scripture_verse_end: number;
  translation_id: string;
  quote: string;
  prayer: string;
  reflection: string;
  theme?: string;
  cover_image_url?: string;
  status: 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived';
  published_at?: string;
  created_by: string;
}

// Supabase client initialization boundary
export function getSupabaseClient() {
  // Requires: SUPABASE_URL, SUPABASE_ANON_KEY at build/deploy time
  // Implementation deferred until environment is configured
  throw new Error('Supabase client requires SUPABASE_URL and SUPABASE_ANON_KEY');
}
