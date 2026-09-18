// @ts-nocheck
'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { readingPlanEnrollments } from '@/lib/db/schema';
import { getAuthenticatedUser } from '@/lib/supabase/server';

export async function enrollPlan(planId: string) {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  const existing = await db.select().from(readingPlanEnrollments).where(and(eq(readingPlanEnrollments.userId, user.id), eq(readingPlanEnrollments.planId, planId))).limit(1);
  if (existing.length) return existing[0];
  const [row] = await db.insert(readingPlanEnrollments).values({ userId: user.id, planId, currentDay: 1, completedDays: [] }).returning();
  revalidatePath('/plans');
  return row;
}

const CompleteSchema = z.object({ planId: z.string(), day: z.number().int().min(1), totalDays: z.number().int().min(1) });

export async function completeDay(input: z.infer<typeof CompleteSchema>) {
  const { planId, day } = CompleteSchema.parse(input);
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  const [enroll] = await db.select().from(readingPlanEnrollments).where(and(eq(readingPlanEnrollments.userId, user.id), eq(readingPlanEnrollments.planId, planId))).limit(1);
  if (!enroll) throw new Error('Not enrolled');
  const set = new Set(enroll.completedDays);
  const wasDone = set.has(day);
  if (wasDone) set.delete(day); else set.add(day);
  const completedDays = Array.from(set).sort((a,b)=>a-b);
  const currentDay = completedDays.length ? Math.min(Math.max(...completedDays)+1, enroll.completedDays.length) : enroll.currentDay;
  // Simplified currentDay progression: max completed + 1
  const nextDay = completedDays.length ? Math.min(Math.max(...completedDays) + 1, 365) : 1;
  const [updated] = await db.update(readingPlanEnrollments).set({ completedDays, currentDay: nextDay, updatedAt: new Date() }).where(and(eq(readingPlanEnrollments.userId, user.id), eq(readingPlanEnrollments.planId, planId))).returning();
  revalidatePath('/plans');
  revalidatePath(`/plans/${planId}`);
  return { updated, wasDone };
}

export async function getProgress(planId: string) {
  const { user } = await getAuthenticatedUser();
  const db = getDb();
  const [row] = await db.select().from(readingPlanEnrollments).where(and(eq(readingPlanEnrollments.userId, user.id), eq(readingPlanEnrollments.planId, planId))).limit(1);
  return row ?? null;
}
