// Reading-plan repository.
// Development fixture with three calm, scriptural plans.
// Progress itself lives in the SavedRepository (client persistence).
// Production swaps this for Supabase `reading_plans` + `reading_plan_items`.

import { BOOKS, type TranslationSlug } from '@/lib/fixtures/books';
import type { PlanDay, ReadingPlan } from '@/lib/data/types';

export interface PlansRepository {
  list(): Promise<ReadingPlan[]>;
  get(id: string): Promise<ReadingPlan | undefined>;
}

function chapterDays(bookId: string, chapters: number[]): PlanDay[] {
  return chapters.map((chapter, i) => ({ day: i + 1, bookId, chapter }));
}

function psalmInitialPlan(): PlanDay[] {
  return Array.from({ length: 31 }, (_, i) => ({ day: i + 1, bookId: 'psa', chapter: i + 1 }));
}

function johnPlan(): PlanDay[] {
  const days: PlanDay[] = [];
  // John 1–21 spread over 30 readings.
  const plan: [number, number[]][] = [
    [1, [1, 2]], [2, [3, 4]], [3, [5, 6]], [4, [7, 8]], [5, [9, 10]],
    [6, [11, 12]], [7, [13, 14]], [8, [15, 16]], [9, [17, 18]], [10, [19, 20]],
    [11, [21]],
  ];
  for (const [bookIdx, chapters] of plan) {
    const bookId = 'jhn';
    for (const chapter of chapters) {
      days.push({ day: days.length + 1, bookId, chapter, note: bookIdx === 3 ? 'Nicodemus & the new birth' : undefined });
    }
  }
  return days;
}

function romansPlan(): PlanDay[] {
  const chapters = Array.from({ length: 16 }, (_, i) => i + 1);
  return chapterDays('rom', chapters);
}

export const PLANS_FIXTURE: ReadingPlan[] = [
  {
    id: 'gospel-john',
    title: 'The Gospel of John',
    description: 'Thirty days walking through John’s account of Jesus — the Word made flesh, the light of the world, and the life He offers.',
    durationDays: 30,
    translation: 'kjv',
    isPublic: true,
    accent: 'gold',
    days: johnPlan(),
  },
  {
    id: 'psalms-proverbs',
    title: 'A Psalm for Every Day',
    description: 'One psalm each day for a month — a daily rhythm of praise, lament, and trust to shape the morning.',
    durationDays: 31,
    translation: 'web',
    isPublic: true,
    accent: 'blue',
    days: psalmInitialPlan(),
  },
  {
    id: 'romans-foundations',
    title: 'Foundations: Romans',
    description: 'Paul’s letter to Rome, one chapter a day — the gospel in full: sin, grace, faith, and a life lived for God.',
    durationDays: 16,
    translation: 'kjv',
    isPublic: true,
    accent: 'flame',
    days: romansPlan(),
  },
];

export class FixturePlansRepository implements PlansRepository {
  async list() {
    return PLANS_FIXTURE;
  }
  async get(id: string) {
    return PLANS_FIXTURE.find((p) => p.id === id);
  }
}

export const plansRepository: PlansRepository = new FixturePlansRepository();

export function bookTitleFor(bookId: string): string {
  return BOOKS.find((b) => b.id === bookId)?.title ?? bookId;
}