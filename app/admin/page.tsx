'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon, ChevronRightIcon, BookOpenIcon, CalendarIcon, CheckCircleIcon, PenIcon } from '@/components/ui/icons';

const workflow = ['draft', 'review', 'approved', 'scheduled', 'published', 'archived'] as const;

const statusMeta: Record<string, { count: number; caption: string }> = {
  draft: { count: 3, caption: 'Awaiting review' },
  review: { count: 2, caption: 'In editorial review' },
  approved: { count: 1, caption: 'Ready to schedule' },
  scheduled: { count: 1, caption: 'Queued for tomorrow' },
  published: { count: 7, caption: 'This week' },
  archived: { count: 12, caption: 'Previously used' },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
      <div className="mx-auto max-w-5xl px-5 md:px-8 pt-6 pb-16">
        <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]/95 backdrop-blur-md mb-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-1 text-[var(--color-flame)]">DOLBIC Content Management</p>
              <h1 className="font-sans text-[28px] md:text-[32px] font-semibold text-[var(--color-deep)] dark:text-white tracking-[-0.02em]">
                Admin dashboard
              </h1>
              <p className="mt-1 font-sans text-[14px] text-[var(--text-muted)]">
                Create, review and schedule daily content. Phase 3 replaces these fixtures with Supabase rows.
              </p>
            </div>
            <Button href="/admin/content/create">
              <PlusIcon size={16} aria-hidden="true" /> New content
            </Button>
          </div>
        </header>

        {/* Workflow reminder */}
        <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-card mb-8">
          <p className="font-sans text-[13px] leading-relaxed text-[var(--text-muted)]/90">
            <span className="font-semibold">Workflow:</span> DRAFT → REVIEW → APPROVED → SCHEDULED → PUBLISHED → ARCHIVED. Creators must not approve their own content.
          </p>
        </div>

        {/* Status cards */}
        <section aria-label="Content pipeline" className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {workflow.map((status) => {
            const meta = statusMeta[status];
            return (
              <div key={status} className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-4 shadow-card">
                <div className="flex items-center justify-between gap-2">
                  {/* Status badge would go here */}
                  <span className="font-serif text-[26px] font-semibold tabular-nums text-[var(--color-deep)] dark:text-white">{meta.count}</span>
                </div>
                <p className="mt-2 font-sans text-[12px] text-[var(--text-muted)]">{meta.caption}</p>
              </div>
            );
          })}
        </section>

        {/* Quick actions */}
        <section aria-label="Shortcuts" className="mt-10">
          <h2 className="mb-3 font-serif text-[19px] font-semibold text-[var(--color-deep)] dark:text-white">Shortcuts</h2>
          <ul className="divide-y divide-[var(--border)] rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] shadow-card">
            {[
              { label: 'Create a devotional', desc: 'Write or schedule daily Scripture, quote, prayer and reflection.', icon: PenIcon, href: '/admin/content/create' },
              { label: 'Today’s published content', desc: 'Review what readers see on the home screen.', icon: BookOpenIcon, href: '/daily' },
              { label: 'This week’s schedule', desc: 'Five of the seven daily entries are reviewed.', icon: CalendarIcon, href: '/plans' },
              { label: 'Approvals queue', desc: 'Two items in REVIEW need a second set of eyes.', icon: CheckCircleIcon, href: '/admin/content/reviews' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link href={item.href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-[var(--color-cream)] dark:hover:bg-white/5 transition-colors min-h-[56px]">
                    <Icon size={20} className="shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-sans text-[15px] font-medium text-[var(--text-main)]">{item.label}</span>
                      <span className="block font-sans text-[12px] text-[var(--text-muted)]">{item.desc}</span>
                    </span>
                    <ChevronRightIcon size={16} className="shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}