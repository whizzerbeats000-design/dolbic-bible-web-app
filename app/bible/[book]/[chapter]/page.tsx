'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { VerseSkeleton } from '@/components/ui/skeleton';
import { useBookList } from '@/lib/hooks/use-bible';
import { useReaderSettings } from '@/lib/hooks/use-saved';
const Reader = dynamic(() => import('@/components/bible/reader').then(m => m.Reader), { loading: () => <div className="max-w-[680px] mx-auto px-4 py-6"><div className="space-y-3 animate-pulse"><div className="h-4 bg-[#F1F5F9] rounded w-1/3" /><div className="h-4 bg-[#F1F5F9] rounded w-full" /><div className="h-4 bg-[#F1F5F9] rounded w-5/6" /></div></div>, ssr: false });
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, BookmarkIcon } from '@/components/ui/icons';
import { getBookTitle } from '@/lib/fixtures/books';
export default function ChapterPage({ params }: { params: { book: string; chapter: string } }) {
  const [settings] = useReaderSettings();
  const books = useBookList();
  const router = useRouter();
  const chapter = Math.max(1, parseInt(params.chapter, 10) || 1);
  const bookId = params.book;
  const book = books.find((b) => b.id === bookId);
  const bookTitle = book?.title ?? getBookTitle(bookId);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; setProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [bookId, chapter]);
  const go = (dir: number) => {
    const next = chapter + dir;
    if (next < 1) return;
    router.push(`/bible/${bookId}/${next}`);
  };
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
            <span className="font-sans text-[15px] font-bold text-[#0F172A] min-w-[110px] text-center">{bookTitle} {chapter}</span>
            <button onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Next chapter"><ChevronRightIcon size={18} /></button>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/bible" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Search books"><SearchIcon size={18} /></Link>
            <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F8FAFC] text-[#475569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68]" aria-label="Bookmark this chapter"><BookmarkIcon size={18} /></button>
          </div>
        </header>
        <div className="h-[3px] bg-[#F1F5F9]"><div className="h-full bg-[#0B2E68] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      </div>
      <main><Reader bookId={bookId} chapter={chapter} translation={settings.translation} /></main>
    </div>
  );
}
