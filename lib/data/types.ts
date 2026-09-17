// DOLBIC Bible — shared domain types (translation-agnostic)
// These mirror the architecture's Supabase tables so the UI never
// depends on a fixture vs. production data source.

import type { TranslationSlug } from '@/lib/fixtures/books';

export interface ChapterVerse {
  n: number;
  t: string;
}

export interface ChapterContent {
  bookId: string;
  bookTitle: string;
  chapter: number;
  translation: TranslationSlug;
  verses: ChapterVerse[];
}

export type HighlightColor = 'gold' | 'flame' | 'blue';

export interface ScriptureRef {
  bookId: string;
  chapter: number;
  verse: number;
  translation: TranslationSlug;
}

export interface Bookmark {
  id: string;
  reference: ScriptureRef;
  label?: string;
  createdAt: string;
}

export interface Highlight {
  id: string;
  reference: ScriptureRef;
  color: HighlightColor;
  note?: string;
  createdAt: string;
}

export interface PrayerEntry {
  id: string;
  text: string;
  createdAt: string;
}

export interface DailyContent {
  id: string;
  date: string; // YYYY-MM-DD (Africa/Lagos)
  title?: string;
  theme?: string;
  reference: string; // display reference, e.g. "John 3:16"
  scripture: ScriptureRef;
  quote: string;
  quoteAuthor?: string;
  prayer: string;
  reflection: string;
  translation: TranslationSlug;
  status: 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived';
}

export interface PlanDay {
  day: number;
  bookId: string;
  chapter: number;
  note?: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  translation: TranslationSlug;
  isPublic: boolean;
  accent: 'blue' | 'gold' | 'flame';
  days: PlanDay[];
}

export interface PlanProgress {
  planId: string;
  currentDay: number;
  completedDays: number[];
  startedAt?: string;
  completedAt?: string;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  theme: 'system' | 'light' | 'dark';
  showVerseNumbers: boolean;
  translation: TranslationSlug;
}