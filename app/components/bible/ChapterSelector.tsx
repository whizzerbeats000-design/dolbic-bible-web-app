import { useState } from 'react';
import Link from 'next/link';

export const ChapterSelector = ({
  bookId,
  currentChapter,
  onSelect,
}: {
  bookId: string;
  currentChapter: number;
  onSelect: (chapter: number) => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 rounded-md border border-white/25 px-3 py-1.5 text-sm hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        aria-label="Select chapter"
      >
        <span>{currentChapter}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {show && (
        <div
          className="absolute top-full mt-2 w-40 rounded-md border bg-[var(--bg-surface)] shadow-card py-2"
        >
          {Array.from({ length: 150 }, (_, i) => i + 1).map((ch) => (
            <Link
              key={ch}
              href={`/bible/${bookId}/${ch}`}
              className={`block px-3 py-1.5 rounded-md ${
                ch === currentChapter
                  ? 'bg-[var(--color-gold)] text-[var(--color-deep)] font-medium'
                  : 'text-[var(--text-main)] hover:bg-[var(--color-cream)] dark:hover:bg-white/10'
              }`}
              onClick={() => {
                onSelect(ch);
                setShow(false);
              }}
            >
              {ch}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};