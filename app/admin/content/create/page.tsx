'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/badge';
import { Field, SelectField } from '@/components/ui/field';
import { useToast } from '@/components/ui/toast';
import { ArrowLeftIcon } from '@/components/ui/icons';

export default function AdminContentCreate() {
  const [submitting, setSubmitting] = useState<'draft' | 'review' | null>(null);
  const { toast } = useToast();

  async function submit(kind: 'draft' | 'review') {
    setSubmitting(kind);
    await new Promise((r) => setTimeout(r, 350));
    setSubmitting(null);
    toast({
      message: kind === 'draft'
        ? 'Draft saved. Reviewers will pick it up in the queue.'
        : 'Submitted for review — a reviewer must approve before scheduling.',
      type: 'success',
    });
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-6 pb-16">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--color-flame)] underline-offset-2 hover:underline min-h-[44px]"
        >
          <ArrowLeftIcon size={14} aria-hidden="true" /> Back to dashboard
        </Link>

        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-sans text-[26px] font-semibold text-[var(--color-deep)] dark:text-white tracking-[-0.02em]">
              Create daily content
            </h1>
            <StatusBadge status="draft" />
          </div>
          <p className="mt-2 font-sans text-[13px] text-[var(--text-muted)] leading-relaxed">
            A DRAFT must pass REVIEW before approval. Creators cannot approve their own content.
          </p>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); submit('draft'); }} className="space-y-5">
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-card">
            <p className="eyebrow mb-3 text-[var(--color-flame)]">Scripture</p>
            <Field
              label="Reference"
              id="scripture-ref"
              placeholder="John 3:16"
              defaultValue="John 3:16"
            />
            <div className="mt-3">
              <SelectField label="Translation" id="translation">
                <option value="kjv">King James Version (KJV)</option>
                <option value="web">World English Bible (WEB)</option>
              </SelectField>
            </div>
          </div>

          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-5 shadow-card">
            <p className="eyebrow mb-3 text-[var(--color-flame)]">Daily items</p>
            <div className="space-y-4">
              <Field
                label="Quote"
                id="quote"
                as="textarea"
                rows={3}
                placeholder="A short inspirational quote for the day…"
                hint="Displayed on the Daily screen under the Scripture."
              />
              <Field
                label="Prayer"
                id="prayer"
                as="textarea"
                rows={3}
                placeholder="A written prayer for readers to begin with…"
              />
              <Field
                label="Reflection"
                id="reflection"
                as="textarea"
                rows={4}
                placeholder="A reflection drawing today's Scripture into everyday life…"
                hint="Keep it under 200 words; it is also syndicated to the RSS feed."
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="submit" disabled={submitting !== null}>
              {submitting === 'draft' ? 'Saving…' : 'Save draft'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={submitting !== null}
              onClick={() => submit('review')}
            >
              {submitting === 'review' ? 'Submitting…' : 'Submit for review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}