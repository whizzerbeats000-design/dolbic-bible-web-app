'use client';

import React, { useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import { useBookList } from '@/lib/hooks/use-bible';

interface ChapterSelectorProps {
  bookId: string;
  currentChapter: number;
  onSelect: (chapter: number) => void;
}

export function ChapterSelector({ bookId, currentChapter, onSelect }: ChapterSelectorProps) {
  const books = useBookList();
  const [open, setOpen] = useState(false);
  const book = books.find((b) => b.id === bookId);
  const chapterCount = book?.chapterCount ?? 31;
  const chapters = Array.from({ length: chapterCount }, (_, i) => i + 1);

  return (
    <>
      {/* Horizontal chip row */}
      <div className="flex gap-1.5 overflow-x-auto py-1 px-0.5 hide-scrollbar" role="tablist" aria-label={`${book?.title ?? ''} chapters`}>
        {chapters.map((ch) => (
          <a
            key={ch}
            href={`/bible/${bookId}/${ch}`}
            role="tab"
            aria-selected={ch === currentChapter}
            aria-label={`Chapter ${ch}`}
            className={[
              'shrink-0 inline-flex items-center justify-center min-w-[44px] h-[44px] rounded-full border px-3 font-sans text-[14px] font-medium transition-colors duration-150',
              ch === currentChapter
                ? 'border-[var(--color-deep)] bg-[var(--color-deep)] text-white'
                : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--color-deep)]/40',
            ].join(' ')}
          >
            {ch}
          </a>
        ))}
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 inline-flex items-center justify-center min-w-[44px] h-[44px] rounded-full border border-dashed border-[var(--border-strong)] px-3 font-sans text-[14px] font-medium text-[var(--text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-deep)]"
          aria-haspopup="dialog"
        >
          All
        </button>
      </div>

      {/* Jump-to-chapter grid */}
      <Sheet open={open} onOpenChange={setOpen} title={book?.title ?? 'Chapters'} description="Jump to a chapter.">
        <div className="grid grid-cols-5 gap-2" role="list" aria-label="Chapters">
          {chapters.map((ch) => (
            <button
              key={ch}
              onClick={() => {
                onSelect(ch);
                setOpen(false);
              }}
              className={[
                'min-h-[52px] rounded-dolbic-sm border font-sans text-[15px] font-medium transition-colors',
                ch === currentChapter
                  ? 'border-[var(--color-deep)] bg-[var(--color-deep)] text-white'
                  : 'border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--color-gold)]',
              ].join(' ')}
            >
              {ch}
            </button>
          ))}
        </div>
      </Sheet>
    </>
  );
}