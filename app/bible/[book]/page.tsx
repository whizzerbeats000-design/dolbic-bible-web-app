'use client';

import Link from 'next/link';
import { useBookList } from '@/lib/hooks/use-bible';
import { useReaderSettings } from '@/lib/hooks/use-saved';
import { ArrowLeftIcon } from '@/components/ui/icons';
import { VerseSkeleton } from '@/components/ui/skeleton';

export default function BookPage({ params }: { params: { book: string } }) {
  const books = useBookList();
  const [settings] = useReaderSettings();
  const book = books.find((b) => b.id === params.book || b.abbreviation.toLowerCase() === params.book.toLowerCase());

  if (books.length === 0) return <div className="px-5 py-10"><VerseSkeleton /></div>;

  if (!book) {
    return (
      <div className="px-5 py-20 text-center" role="status">
        <p className="font-serif text-lg text-[var(--text-main)]">Book not found</p>
        <p className="mt-2 font-sans text-[14px] text-[var(--text-muted)]">
          Check the URL or <Link href="/bible" className="underline font-medium">browse all books</Link>.
        </p>
      </div>
    );
  }

  const chapters = Array.from({ length: book.chapterCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-page mx-auto px-5 md:px-8 pt-4 pb-4">
          <Link
            href="/bible"
            className="inline-flex items-center gap-1.5 font-sans text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--color-deep)] dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon size={16} aria-hidden="true" /> All books
          </Link>
          <h1 className="font-sans text-[24px] md:text-[28px] font-bold leading-tight text-[#0F172A] tracking-[-0.02em] mt-3">
            {book.title} - Select Chapter
          </h1>
          <p className="font-sans text-[13px] text-[#475569] mt-1">
            {book.chapterCount} {book.chapterCount === 1 ? 'chapter' : 'chapters'} · {settings.translation.toUpperCase()} · Tap a chapter to read
          </p>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-4 pt-6 pb-20">
        <section aria-label={`${book.title} chapters`} className="grid grid-cols-5 sm:grid-cols-8 gap-3">
          {chapters.map((ch) => (
            <Link
              key={ch}
              href={`/bible/${book.id}/${ch}`}
              className="flex h-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-[8px] bg-slate-100 dark:bg-slate-800 font-sans text-[15px] font-semibold text-[#0F172A] dark:text-white hover:bg-[#0B2E68] hover:text-white active:bg-[#0B2E68] active:text-white border border-transparent hover:border-[#0B2E68] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68] focus-visible:ring-offset-2"
            >
              {ch}
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}