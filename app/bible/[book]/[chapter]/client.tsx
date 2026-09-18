'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { VerseSkeleton } from '@/components/ui/skeleton';
import { useBookList } from '@/lib/hooks/use-bible';
import { useReaderSettings } from '@/lib/hooks/use-saved';
const Reader = dynamic(() => import('@/components/bible/reader').then(m => m.Reader), { loading: () => <div className="max-w-[680px] mx-auto px-4 py-6"><div className="space-y-3 animate-pulse"><div className="h-4 bg-[#F1F5F9] rounded w-1/3" /><div className="h-4 bg-[#F1F5F9] rounded w-full" /><div className="h-4 bg-[#F1F5F9] rounded w-5/6" /></div></div>, ssr: false });
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, BookmarkIcon, ChevronDownIcon } from '@/components/ui/icons';
import { getBookTitle } from '@/lib/fixtures/books';
import { Sheet } from '@/components/ui/sheet';
export default function ChapterClient({ book, chapter }: { book: string; chapter: string }) {
  const [settings] = useReaderSettings();
  const books = useBookList();
  const router = useRouter();
  const chNum = Math.max(1, parseInt(chapter, 10) || 1);
  const bookId = book;
  const found = books.find((b) => b.id === bookId);
  const bookTitle = found?.title ?? getBookTitle(bookId);
  const [progress, setProgress] = useState(0);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [switchBookId, setSwitchBookId] = useState(bookId);
  const switchBook = books.find((b) => b.id === switchBookId) ?? found;
  useEffect(() => { setSwitchBookId(bookId); }, [bookId]);
  useEffect(() => {
    function onScroll() { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [bookId, chNum]);
  const go = (dir: number) => { const next = chNum + dir; if (next < 1) return; router.push(`/bible/${bookId}/${next}`); };
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A]">
      <div className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[720px] mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-2">
            <Link href="/bible" className="inline-flex h-8 items-center rounded-full bg-[#F1F5F9] px-3 font-sans text-[13px] font-semibold text-[#475569]">Read</Link>
            <Link href="/plans" className="inline-flex h-8 items-center rounded-full bg-white border border-[#E2E8F0] px-3 font-sans text-[13px] font-medium text-[#475569]">Plans</Link>
            <Link href="/saved" className="inline-flex h-8 items-center rounded-full bg-white border border-[#E2E8F0] px-3 font-sans text-[13px] font-medium text-[#475569]">Bookmarks</Link>
          </div>
        </div>
        <header className="chapter-toolbar flex items-center justify-between gap-3 h-12 px-4 max-w-[720px] mx-auto">
          <Link href={`/bible/${bookId}`} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Back to book list"><ArrowLeftIcon size={18} /></Link>
          <div className="flex items-center gap-1">
            <button onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Previous chapter"><ChevronLeftIcon size={18} /></button>
            <button onClick={() => setSwitchOpen(true)} className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] px-3 py-1.5 font-sans text-[14px] font-bold text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68] transition-colors" aria-label={`Jump to passage, current ${bookTitle} ${chNum}`} aria-expanded={switchOpen}>
              {bookTitle} {chNum}
              <ChevronDownIcon size={14} className={`shrink-0 text-[#475569] transition-transform ${switchOpen ? 'rotate-180' : ''}`} />
            </button>
            <button onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Next chapter"><ChevronRightIcon size={18} /></button>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/bible" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Search books"><SearchIcon size={18} /></Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Bookmark this chapter"><BookmarkIcon size={18} /></button>
          </div>
        </header>
        <div className="h-[3px] bg-[#F1F5F9]"><div className="h-full bg-[#0B2E68] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      </div>
      <main><Reader bookId={bookId} chapter={chNum} translation={settings.translation} /></main>

      <Sheet open={switchOpen} onOpenChange={setSwitchOpen} title="Jump to passage" description="Select a book and chapter to jump directly">
        <div className="space-y-4">
          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68] mb-2">Select Book</p>
            <div className="max-h-[180px] overflow-y-auto rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-2">
              <div className="grid grid-cols-1 gap-1">
                {books.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSwitchBookId(b.id)}
                    className={`flex items-center justify-between rounded-[8px] px-3 py-2 text-left transition-colors min-h-[44px] ${switchBookId === b.id ? 'bg-[#0B2E68] text-white' : 'bg-white hover:bg-white border border-[#E2E8F0] text-[#0F172A]'}`}
                  >
                    <span className="font-sans text-[14px] font-semibold">{b.title}</span>
                    <span className={`font-mono text-[11px] ${switchBookId === b.id ? 'text-white/70' : 'text-[#94A3B8]'}`}>{b.abbreviation} • {b.chapterCount}</span>
                  </button>
                ))}
                {books.length === 0 && <div className="p-4 text-center font-sans text-[13px] text-[#64748B]">Loading books...</div>}
              </div>
            </div>
          </div>
          {switchBook && (
            <div>
              <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68] mb-2">{switchBook.title} — Select Chapter</p>
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                {Array.from({ length: switchBook.chapterCount }, (_, i) => i + 1).map((ch) => (
                  <Link
                    key={ch}
                    href={`/bible/${switchBook.id}/${ch}`}
                    onClick={() => setSwitchOpen(false)}
                    className={`flex h-12 min-h-[48px] items-center justify-center rounded-[8px] font-sans text-[14px] font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68] ${switchBook.id === bookId && ch === chNum ? 'bg-[#0B2E68] text-white border-[#0B2E68]' : 'bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-white border-transparent hover:bg-[#0B2E68] hover:text-white'}`}
                  >
                    {ch}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => setSwitchOpen(false)} className="w-full h-11 rounded-full border border-[#E2E8F0] bg-white font-sans text-[14px] font-semibold text-[#475569] hover:bg-[#F8FAFC]">Close</button>
        </div>
      </Sheet>
    </div>
  );
}
