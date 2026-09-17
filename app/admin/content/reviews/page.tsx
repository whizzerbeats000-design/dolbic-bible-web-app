'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CheckCircleIcon, RefreshIcon, CalendarIcon } from '@/components/ui/icons';

interface ReviewItem {
  id: string;
  title: string;
  type: string;
  updated: string;
  status: 'review';
}

const reviewQueue: ReviewItem[] = [
  { id: 'c-109', title: 'Day 109 — God’s faithfulness', type: 'Devotional', updated: '2h ago', status: 'review' },
  { id: 'c-110', title: 'Day 110 — The Good Shepherd', type: 'Devotional', updated: '5h ago', status: 'review' },
  { id: 'c-104r', title: 'Day 104 — Rework after feedback', type: 'Devotional', updated: '1d ago', status: 'review' },
];

export default function AdminReviews() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-6 pb-16">
        <Link href="/admin" className="mb-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--color-flame)] underline-offset-2 hover:underline min-h-[44px]">
          <ArrowLeftIcon size={14} aria-hidden="true" /> Back to dashboard
        </Link>

        <header className="mb-6">
          <h1 className="font-sans text-[26px] font-semibold text-[var(--color-deep)] dark:text-white tracking-[-0.02em]">Approvals queue</h1>
          <p className="mt-2 font-sans text-[13px] text-[var(--text-muted)] leading-relaxed">
            Reviewers approve or return items to the creator. Creators cannot approve their own content.
          </p>
        </header>

        {reviewQueue.length === 0 ? (
          <EmptyState
            icon={<CheckCircleIcon size={22} />}
            title="Queue is clear"
            body="Nothing is waiting for review right now."
          />
        ) : (
          <ul className="divide-y divide-[var(--border)] rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] shadow-card">
            {reviewQueue.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-4">
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="block font-sans text-[15px] font-medium text-[var(--text-main)]">{item.title}</span>
                    <StatusBadge status={item.status} />
                  </span>
                  <span className="mt-0.5 flex items-center gap-3 font-sans text-[12px] text-[var(--text-muted)]">
                    <span>{item.type} · #{item.id}</span>
                    <span className="inline-flex items-center gap-1"><RefreshIcon size={12} aria-hidden="true" /> {item.updated}</span>
                  </span>
                </span>
                <div className="flex shrink-0 gap-2">
                  <Button variant="secondary" size="sm">Review</Button>
                  <Button size="sm" onClick={() => { /* Phase 3: write approve action to Supabase */ }}>
                    <CheckCircleIcon size={14} aria-hidden="true" /> Approve
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center gap-2 rounded-dolbic-md border border-dashed border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 font-sans text-[12px] text-[var(--text-muted)]">
          <CalendarIcon size={14} className="shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
          Approved items move to the schedule; the creator is notified by the Phase 3 workflow service.
        </div>
      </div>
    </main>
  );
}