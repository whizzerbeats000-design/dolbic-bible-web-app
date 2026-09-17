'use client';

import React, { useMemo, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { SearchIcon, ChevronRightIcon } from '@/components/ui/icons';
import { useBookSearch } from '@/lib/hooks/use-bible';

interface BookSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectBook: (bookId: string, chapter?: number) => void;
  currentBookId?: string;
}

export function BookSelector({ open, onOpenChange, onSelectBook, currentBookId }: BookSelectorProps) {
  const [query, setQuery] = useState('');
  const books = useBookSearch(query);

  const groups = useMemo(() => {
    const grouped = { old: [] as typeof books, new: [] as typeof books };
    for (const b of books) grouped[b.testament === 'old' ? 'old' : 'new'].push(b);
    return grouped;
  }, [books]);

  const hasResults = books.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Browse Books" description="Choose a book of the Bible to read.">
      <div className="relative mb-4">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          <SearchIcon size={18} />
        </span>
        <input
          autoFocus
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books…"
          aria-label="Search books"
          className="w-full h-12 rounded-dolbic-sm border border-[var(--border)] bg-[var(--bg-surface)] pl-11 pr-4 font-sans text-[15px] text-[var(--text-main)] outline-none focus:ring-2 focus:ring-[var(--color-gold)]/60 focus:border-[var(--color-gold)]"
        />
      </div>

      {!hasResults && (
        <p className="py-10 text-center font-sans text-sm text-[var(--text-muted)]">
          No books match "{query}".
        </p>
      )}

      {['old', 'new'].map((testament) => {
        const list = groups[testament as 'old' | 'new'];
        if (list.length === 0) return null;
        return (
          <div key={testament} className="mb-5">
            <h3 className="eyebrow mb-2 text-[var(--color-flame)]">
              {testament === 'old' ? 'Old Testament' : 'New Testament'}
            </h3>
            <ul className="divide-y divide-[var(--border)] rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
              {list.map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => onSelectBook(b.id, 1)}
                    aria-current={b.id === currentBookId ? 'page' : undefined}
                    className={[
                      'flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors',
                      'min-h-[48px]',
                      b.id === currentBookId
                        ? 'bg-[var(--color-cream)] text-[var(--color-deep)]'
                        : 'text-[var(--text-main)] hover:bg-[var(--color-cream)] dark:hover:bg-white/5',
                    ].join(' ')}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span className="shrink-0 w-12 font-sans text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{b.abbreviation}</span>
                      <span className="truncate font-sans text-[15px] font-medium">{b.title}</span>
                    </span>
                    <ChevronRightIcon size={16} className="shrink-0 text-[var(--text-muted)]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </Sheet>
  );
}