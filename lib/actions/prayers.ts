// @ts-nocheck
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { eq, and, desc } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { prayers } from '@/lib/db/schema';
import { getAuthenticatedUser } from '@/lib/supabase/server';

const CreateSchema = z.object({
  text: z.string().trim().min(1).max(2000),
  category: z.string().trim().max(32).default('All'),
});

export async function addPrayer(input: z.infer<typeof CreateSchema>) {
  const { text, category } = CreateSchema.parse(input);
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  const [row] = await db.insert(prayers).values({ userId: user.id, text, category }).returning();
  revalidatePath('/prayer');
  revalidatePath('/saved');
  return row;
}

export async function listPrayers() {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  return db.select().from(prayers).where(eq(prayers.userId, user.id)).orderBy(desc(prayers.createdAt));
}

export async function deletePrayer(id: string) {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  await db.delete(prayers).where(and(eq(prayers.id, id), eq(prayers.userId, user.id)));
  revalidatePath('/prayer');
  revalidatePath('/saved');
  return { ok: true };
}
