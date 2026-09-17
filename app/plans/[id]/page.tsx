'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { plansRepository, bookTitleFor } from '@/lib/data/plans-repository';
import { useSaved } from '@/lib/hooks/use-saved';
import { usePlanProgress } from '@/lib/hooks/use-plan-progress';
import type { ReadingPlan } from '@/lib/data/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeftIcon, CheckCircleIcon, CheckIcon, BookOpenIcon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
import { DOLBICScriptureSurface } from '@/components/bible/Surface';
import { DOLBICReaderNav } from '@/components/bible/ReaderNav';

export default function PlanPage() {
  const params = useParams();
  const router = useRouter();
  const planId = typeof params.id === 'string' ? params.id : (params.id?.[0] ?? '');
  const [plan, setPlan] = useState<ReadingPlan | null>(null);
  const progressItem = usePlanProgress(planId);
  const saved = useSaved();
  const { toast } = useToast();

  const planIdKey = String(planId ?? '');
  useEffect(() => {
    if (!planIdKey) return;
    void plansRepository.get(planIdKey).then((p) => setPlan(p ?? null));
  }, [planIdKey]);

  if (!planIdKey) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
        <DOLBICScriptureSurface>
          <main className="max-w-page mx-auto px-5 md:px-8 pt-6 pb-16 text-center">
            <p className="font-serif text-lg text-[var(--text-main)]">Plan not found</p>
            <Button href="/plans" variant="secondary" size="sm" className="mt-3">
              Back to plans
            </Button>
          </main>
        </DOLBICScriptureSurface>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
        <DOLBICScriptureSurface>
          <main className="max-w-page mx-auto px-5 md:px-8 pt-6 pb-16">
            <div className="space-y-4">
              <div className="h-32 rounded-[8px] bg-[var(--color-cream)] skeleton" />
              <div className="h-64 rounded-[8px] bg-[var(--color-cream)] skeleton" />
            </div>
          </main>
        </DOLBICScriptureSurface>
      </div>
    );
  }

  const progress = progressItem === null ? undefined : progressItem;
  const started = Boolean(progress?.startedAt);
  const currentDay = Math.min(progress?.currentDay ?? 1, plan.durationDays);
  const completedCount = progress?.completedDays.length ?? 0;
  const isComplete = completedCount === plan.durationDays;

  const todayPlanDay = plan.days.find((d) => d.day === currentDay);

  async function markDay(day: number) {
    if (!plan) return;
    await saved.completeDay(plan.id, day, plan.durationDays);
    if (progress && progress.completedDays.includes(day)) {
      toast({ message: 'Day unmarked' });
      return;
    }
    toast({ message: `Day ${day} marked complete` });
  }

  async function resetPlan() {
    if (!plan) return;
    await saved.resetPlan(plan.id);
    toast({ message: 'Plan progress reset' });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
      <DOLBICScriptureSurface>
        <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]/95 backdrop-blur-md">
          <div className="max-w-page mx-auto px-5 md:px-8 pt-4 pb-6">
            <Link
              href="/plans"
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium transition-colors text-[var(--text-muted)] hover:text-[var(--color-deep)]"
            >
              <ArrowLeftIcon size={16} aria-hidden="true" /> All plans
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[12px] font-medium uppercase tracking-wider text-[var(--color-deep)]">
                <BookOpenIcon size={13} aria-hidden="true" /> {plan.durationDays} days · {plan.translation.toUpperCase()}
              </span>
              {isComplete && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/60 px-2.5 py-1 font-sans text-[12px] font-medium uppercase tracking-wider text-emerald-600">
                  <CheckIcon size={13} aria-hidden="true" /> Complete
                </span>
              )}
            </div>
            <h1 className="mt-3 font-sans text-[28px] md:text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-deep)] dark:text-white">
              {plan.title}
            </h1>
            <p className="mt-2 max-w-xl font-sans text-[14px] leading-relaxed text-[var(--text-muted)]">
              {plan.description}
            </p>
          </div>
        </header>

        <main className="max-w-prose mx-auto px-5 md:px-8 pt-6 pb-16">
          {/* Start CTA */}
          {!started && (
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-card mb-8">
              <p className="font-serif text-[17px] font-medium text-[var(--text-main)]">
                Begin with {plan.days[0] ? `${bookTitleFor(plan.days[0].bookId)} ${plan.days[0].chapter}` : ''}.
              </p>
              <p className="mt-1 font-sans text-[14px] text-[var(--text-muted)]">
                You'll read {plan.durationDays} {plan.durationDays === 1 ? 'chapter' : 'chapters'} at an unhurried pace. Progress stays on this device.
              </p>
              <Button
                href={plan.days[0] ? `/bible/${plan.days[0].bookId}/${plan.days[0].chapter}` : '/bible'}
                className="mt-4 w-full sm:w-auto bg-[var(--color-gold)] text-[var(--color-deep)] hover:bg-white"
              >
                Start day 1
              </Button>
            </div>
          )}

          {/* Day list */}
          <section aria-label="Plan days">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-serif text-[19px] font-semibold text-[var(--color-deep)] dark:text-white">
                Reading list
              </h2>
              <span className="font-sans text-[12px] font-medium text-[var(--text-muted)]">
                {completedCount} of {plan.durationDays} done
              </span>
            </div>
            <ol className="divide-y divide-[var(--border)] rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
              {plan.days.map((d, idx) => {
                const done = progress?.completedDays.includes(d.day) ?? false;
                const isToday = started && d.day === currentDay && !done && !isComplete;
                return (
                  <li key={`${d.bookId}-${d.chapter}-${d.day}`}>
                    <div className="flex items-center gap-3 px-4 py-3.5 min-h-[60px]">
                      <button
                        onClick={() => markDay(d.day)}
                        aria-pressed={done}
                        aria-label={done ? `Mark day ${d.day} incomplete` : `Mark day ${d.day} complete`}
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                          done ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[var(--border-strong)] text-transparent hover:border-[var(--color-gold)]'
                        }"
                      >
                        <CheckIcon size={16} aria-hidden="true" />
                      </button>
                      <Link
                        href={`/bible/${d.bookId}/${d.chapter}`}
                        className="flex flex-1 items-center justify-between gap-3 min-w-0"
                        aria-label={`Read ${bookTitleFor(d.bookId)} ${d.chapter}`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-sans text-[15px] font-medium ${
                            done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-main)]'
                          }">
                            {bookTitleFor(d.bookId)} {d.chapter}
                          </span>
                          {d.note && <span className="block font-sans text-[12px] text-[var(--text-muted)]">{d.note}</span>}
                        </span>
                        {isToday && (
                          <span className="shrink-0 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-white bg-[var(--color-flame)]">
                            Today
                          </span>
                        )}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Progress summary */}
          {started && (
            <div className="mt-6 flex items-center justify-between gap-3 rounded-[8px] bg-[var(--bg-surface)] px-4 py-3">
              <p className="font-sans text-[13px] text-[var(--color-deep)]">
                {isComplete ? (
                  <>
                    <CheckCircleIcon size={16} className="inline text-emerald-600" />
                    Finished — praise God!
                  </>
                ) : `${completedCount}/${plan.durationDays} days complete`}
              </p>
              <button onClick={resetPlan} className="font-sans text-[13px] font-medium text-[var(--text-muted)] underline-offset-2 hover:underline">
                Reset
              </button>
            </div>
          )}
        </main>
      </DOLBICScriptureSurface>
    </div>
  );
}