'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TranslationSelector } from '@/components/bible/translation-selector';
import { useBookSearch, useTranslations } from '@/lib/hooks/use-bible';
import { useReaderSettings } from '@/lib/hooks/use-saved';
import { SearchIcon, ChevronRightIcon } from '@/components/ui/icons';
import { PageHeader } from '@/components/content/page-header';
import { VerseSkeleton } from '@/components/ui/skeleton';

export default function BiblePage() {
  const [query, setQuery] = useState('');
  const books = useBookSearch(query);
  const [settings, updateSettings] = useReaderSettings();
  const translations = useTranslations();

  const grouped = {
    old: books.filter((b) => b.testament === 'old'),
    new: books.filter((b) => b.testament === 'new'),
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <PageHeader
        eyebrow="Scripture"
        title="The Bible"
        description={`Read Scripture in ${settings.translation.toUpperCase()}.`}
      >
        <TranslationSelector
          value={settings.translation}
          onChange={(slug) => updateSettings({ ...settings, translation: slug })}
          options={translations.map((t) => ({
            slug: t.slug,
            name: t.name,
            abbreviation: t.abbreviation,
            isPublicDomain: t.isPublicDomain,
          }))}
        />
      </PageHeader>

      <main className="max-w-[720px] mx-auto px-4 pb-20 pt-4">
        <div className="flex gap-2 mb-4" role="tablist" aria-label="Bible sections">
          <Link href="/bible" aria-selected="true" className="inline-flex h-9 items-center rounded-full bg-[#0B2E68] px-5 font-sans text-[13px] font-semibold text-white">Read</Link>
          <Link href="/plans" className="inline-flex h-9 items-center rounded-full bg-[#F1F5F9] px-5 font-sans text-[13px] font-semibold text-[#475569] hover:bg-[#E2E8F0]">Plans</Link>
          <Link href="/saved" className="inline-flex h-9 items-center rounded-full bg-[#F1F5F9] px-5 font-sans text-[13px] font-semibold text-[#475569] hover:bg-[#E2E8F0]">Bookmarks</Link>
        </div>
        <div className="relative mb-6">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
            <SearchIcon size={18} />
          </span>
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..."
            aria-label="Search books"
            className="w-full h-11 rounded-full border border-[#E2E8F0] bg-white pl-11 pr-4 font-sans text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#0B2E68]/20 focus:border-[#0B2E68]"
          />
        </div>

        {books.length === 0 && !query.trim() && <VerseSkeleton />}

        {books.length === 0 && query.trim() && (
          <p className="py-10 text-center font-sans text-sm text-[var(--text-muted)]">
            No books match "{query}". Try another search.
          </p>
        )}

        {(['old', 'new'] as const).map((testament) => {
          if (grouped[testament].length === 0) return null;
          return (
            <section key={testament} className="mb-10" aria-label={testament === 'old' ? 'Old Testament' : 'New Testament'}>
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-sans text-[20px] md:text-[24px] font-bold tracking-[-0.02em] text-[var(--color-text)]">
                    {testament === 'old' ? 'Old Testament' : 'New Testament'}
                  </h2>
                  <span className="h-px w-12 bg-[var(--color-primary)]/60" aria-hidden="true" />
                </div>
                <span className="font-sans text-[12px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  {grouped[testament].length} books
                </span>
              </div>
              <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] shadow-card">
                {grouped[testament].map((b) => (
                  <li key={b.id}>
                      <Link
                      href={`/bible/${b.id}`}
                      className="group relative flex min-h-[56px] items-center gap-4 px-4 py-3 transition-all duration-150 hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B2E68]"
                    >
                      <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-[var(--color-primary)] opacity-0 transition-opacity duration-150 group-hover:opacity-100" aria-hidden="true" />
                      <span className="min-w-0 flex-1 font-sans text-[16px] font-bold text-[#0F172A] tracking-[-0.01em] text-left">
                        {b.title}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#94A3B8]">
                        {b.abbreviation}
                      </span>
                      <span className="shrink-0 font-sans text-[12px] text-[#475569] text-right min-w-[84px]">
                        {b.chapterCount} {b.chapterCount === 1 ? 'chapter' : 'chapters'}
                      </span>
                      <ChevronRightIcon
                        size={16}
                        className="shrink-0 text-[var(--text-muted)] transition-all duration-150 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}

        <section aria-label="Continue reading" className="mt-6">
          <Link
            href="/plans"
            className="flex items-center justify-between gap-3 rounded-[8px] bg-[var(--color-secondary)] px-6 py-5 text-white shadow-card hover:brightness-[0.98] transition-all duration-150"
          >
            <div>
              <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-white/90">Reading plans</p>
              <p className="font-sans text-[16px] font-semibold mt-1">A rhythm through Scripture — John, Psalms &amp; Romans</p>
            </div>
            <ChevronRightIcon size={22} className="shrink-0 text-white" />
          </Link>
        </section>
      </main>
    </div>
  );
}