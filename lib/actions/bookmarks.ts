// @ts-nocheck
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { bookmarks } from '@/lib/db/schema';
import { getAuthenticatedUser } from '@/lib/supabase/server';

const RefSchema = z.object({
  bookId: z.string().min(1).max(16),
  chapter: z.number().int().min(1),
  verse: z.number().int().min(1),
  translation: z.enum(['kjv','web']),
});

export async function toggleBookmark(input: z.infer<typeof RefSchema>) {
  const { bookId, chapter, verse, translation } = RefSchema.parse(input);
  const { user } = await getAuthenticatedUser();
  const db = getDb();

  const existing = await db.select().from(bookmarks).where(
    and(eq(bookmarks.userId, user.id), eq(bookmarks.bookId, bookId), eq(bookmarks.chapter, chapter), eq(bookmarks.verse, verse), eq(bookmarks.translation, translation))
  ).limit(1);

  if (existing.length) {
    await db.delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
    revalidatePath('/saved');
    revalidatePath('/bible');
    return { bookmarked: false, id: existing[0].id };
  }

  const [row] = await db.insert(bookmarks).values({
    userId: user.id, bookId, chapter, verse, translation,
  }).returning();
  revalidatePath('/saved');
  return { bookmarked: true, id: row.id };
}

export async function listBookmarks() {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  return db.select().from(bookmarks).where(eq(bookmarks.userId, user.id)).orderBy(bookmarks.createdAt);
}

export async function deleteBookmark(id: string) {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  await db.delete(bookmarks).where(and(eq(bookmarks.id, id), eq(bookmarks.userId, user.id)));
  revalidatePath('/saved');
  return { ok: true };
}
