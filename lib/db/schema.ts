// @ts-nocheck
import { pgTable, pgEnum, uuid, varchar, text, integer, boolean, timestamp, primaryKey, unique, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ── Enums ──────────────────────────────────────────────────────
export const translationSlugEnum = pgEnum('translation_slug', ['kjv', 'web']);
export const highlightColorEnum = pgEnum('highlight_color', ['gold', 'flame', 'blue']);
export const planAccentEnum = pgEnum('plan_accent', ['blue', 'gold', 'flame']);
export const contentStatusEnum = pgEnum('content_status', ['draft', 'review', 'approved', 'scheduled', 'published', 'archived']);
export const testamentEnum = pgEnum('testament', ['old', 'new']);

// ── Profiles (1:1 with auth.users) ─────────────────────────────
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // = auth.users.id
  displayName: varchar('display_name', { length: 64 }),
  avatarUrl: text('avatar_url'),
  offlineChapters: integer('offline_chapters').notNull().default(24),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Bookmarks ──────────────────────────────────────────────────
export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  bookId: varchar('book_id', { length: 16 }).notNull(),
  chapter: integer('chapter').notNull(),
  verse: integer('verse').notNull(),
  translation: translationSlugEnum('translation').notNull(),
  label: varchar('label', { length: 128 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  uniqRef: unique('bookmarks_user_ref_unique').on(t.userId, t.bookId, t.chapter, t.verse, t.translation),
  userIdx: index('bookmarks_user_idx').on(t.userId),
}));

// ── Highlights ─────────────────────────────────────────────────
export const highlights = pgTable('highlights', {
  id: uuid('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  bookId: varchar('book_id', { length: 16 }).notNull(),
  chapter: integer('chapter').notNull(),
  verse: integer('verse').notNull(),
  translation: translationSlugEnum('translation').notNull(),
  color: highlightColorEnum('color').notNull(),
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  userIdx: index('highlights_user_idx').on(t.userId),
}));

// ── Prayers ────────────────────────────────────────────────────
export const prayers = pgTable('prayers', {
  id: uuid('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  category: varchar('category', { length: 32 }).notNull().default('All'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  userIdx: index('prayers_user_idx').on(t.userId),
}));

// ── Reading Plans (catalog) ────────────────────────────────────
export const readingPlans = pgTable('reading_plans', {
  id: varchar('id', { length: 64 }).primaryKey(), // e.g. 'one-year'
  title: varchar('title', { length: 128 }).notNull(),
  description: text('description').notNull(),
  durationDays: integer('duration_days').notNull(),
  translation: translationSlugEnum('translation').notNull(),
  isPublic: boolean('is_public').notNull().default(true),
  accent: planAccentEnum('accent').notNull().default('blue'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const readingPlanDays = pgTable('reading_plan_days', {
  id: uuid('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  planId: varchar('plan_id', { length: 64 }).notNull().references(() => readingPlans.id, { onDelete: 'cascade' }),
  day: integer('day').notNull(),
  bookId: varchar('book_id', { length: 16 }).notNull(),
  chapter: integer('chapter').notNull(),
  note: text('note'),
}, (t) => ({
  planDayUnique: unique('plan_day_unique').on(t.planId, t.day),
  planIdx: index('plan_days_plan_idx').on(t.planId),
}));

// ── Enrollments / Progress (per user) ──────────────────────────
export const readingPlanEnrollments = pgTable('reading_plan_enrollments', {
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  planId: varchar('plan_id', { length: 64 }).notNull().references(() => readingPlans.id, { onDelete: 'cascade' }),
  currentDay: integer('current_day').notNull().default(1),
  completedDays: integer('completed_days').array().notNull().default([]),
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.planId] }),
}));

// ── Optional Bible verses (for CMS; fixtures remain offline fallback) ─
export const bibleBooks = pgTable('bible_books', {
  id: varchar('id', { length: 16 }).primaryKey(),
  testament: testamentEnum('testament').notNull(),
  orderIndex: integer('order_index').notNull(),
  abbreviation: varchar('abbreviation', { length: 8 }).notNull(),
  name: varchar('name', { length: 64 }).notNull(),
  chapterCount: integer('chapter_count').notNull(),
});

export const bibleChapters = pgTable('bible_chapters', {
  id: uuid('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  bookId: varchar('book_id', { length: 16 }).notNull().references(() => bibleBooks.id),
  chapterNumber: integer('chapter_number').notNull(),
  translation: translationSlugEnum('translation').notNull(),
  versesJson: text('verses_json').notNull(), // JSON stringified ChapterVerse[]
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (t) => ({
  uniq: unique('chapter_unique').on(t.bookId, t.chapterNumber, t.translation),
}));

// ── Relations ──────────────────────────────────────────────────
export const profilesRelations = relations(profiles, ({ many }) => ({
  bookmarks: many(bookmarks),
  highlights: many(highlights),
  prayers: many(prayers),
  enrollments: many(readingPlanEnrollments),
}));
export const readingPlansRelations = relations(readingPlans, ({ many }) => ({
  days: many(readingPlanDays),
  enrollments: many(readingPlanEnrollments),
}));
