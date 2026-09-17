'use client';

import React, { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@/components/ui/icons';
import type { TranslationSlug } from '@/lib/fixtures/books';

interface TranslationOption {
  slug: TranslationSlug | 'niv';
  name: string;
  abbreviation: string;
  isPublicDomain: boolean;
  note?: string;
}

interface TranslationSelectorProps {
  value: TranslationSlug;
  onChange: (slug: TranslationSlug) => void;
  options?: TranslationOption[];
  compact?: boolean;
}

const DEFAULT_OPTIONS: TranslationOption[] = [
  { slug: 'kjv', name: 'King James Version', abbreviation: 'KJV', isPublicDomain: true, note: 'Classic · 1611 tradition' },
  { slug: 'web', name: 'World English Bible', abbreviation: 'WEB', isPublicDomain: true, note: 'Modern English' },
];

export function TranslationSelector({ value, onChange, options = DEFAULT_OPTIONS, compact = false }: TranslationSelectorProps) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.slug === value) ?? options[0];

  return (
    <>
      <Button
        variant="secondary"
        size={compact ? 'sm' : 'md'}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5"
      >
        <span className="font-semibold">{current?.abbreviation ?? 'KJV'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        title="Bible Translation"
        description="Choose the Scripture version you read."
      >
        <div role="radiogroup" aria-label="Translation" className="space-y-2.5">
          {options.map((opt) => {
            const locked = !opt.isPublicDomain;
            const selected = value === opt.slug && !locked;
            return (
              <button
                key={opt.slug}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={locked}
                onClick={() => {
                  if (!locked) {
                    onChange(opt.slug as TranslationSlug);
                    setOpen(false);
                  }
                }}
                className={[
                  'w-full rounded-dolbic-md border p-4 text-left transition-colors duration-150',
                  locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--color-gold)]',
                  selected ? 'border-[var(--color-gold)] bg-[var(--color-cream)]' : 'border-[var(--border)] bg-[var(--bg-surface)]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[15px] font-semibold text-[var(--text-main)]">{opt.abbreviation}</span>
                      {locked && (
                        <span className="rounded-full bg-[var(--color-cream)] px-2 py-[2px] font-sans text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                          Locked
                        </span>
                      )}
                    </div>
                    <p className="truncate font-sans text-[13px] text-[var(--text-muted)] mt-0.5">{opt.name}</p>
                    {opt.note && <p className="font-sans text-[12px] text-[var(--text-muted)]/80 mt-0.5">{opt.note}</p>}
                  </div>
                  {selected && <CheckIcon size={18} className="shrink-0 text-[var(--color-deep)] dark:text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </Sheet>
    </>
  );
}