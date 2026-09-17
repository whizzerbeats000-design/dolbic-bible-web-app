'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { dailyRepository } from '@/lib/data/daily-repository';
import { useSaved } from '@/lib/hooks/use-saved';
import { useVerseText } from '@/lib/hooks/use-bible';
import type { DailyContent } from '@/lib/data/types';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, BookmarkFilledIcon, ShareIcon } from '@/components/ui/icons';
function formatLagosDate(iso: string): string { try { return new Date(`${iso}T12:00:00`).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' }); } catch { return iso; } }
export default function DailyPage() { return <Suspense fallback={<div className="min-h-screen bg-white p-6"><div className="h-64 rounded-[16px] bg-[#F1F5F9] skeleton" /></div>}><DailyContent /></Suspense>; }
function DailyContent() {
  const searchParams = useSearchParams(); const requestedDate = searchParams?.get('date') ?? undefined;
  const [content, setContent] = useState<DailyContent | null>(null); const [todayDate, setTodayDate] = useState(''); const saved = useSaved();
  useEffect(() => { void dailyRepository.today().then((c) => setTodayDate(c?.date)); }, []);
  useEffect(() => { if (requestedDate) void dailyRepository.byDate(requestedDate).then((c) => setContent(c ?? null)); else void dailyRepository.today().then((c) => setContent(c ?? null)); }, [requestedDate]);
  const ref = content?.scripture ? { bookId: content.scripture.bookId, chapter: content.scripture.chapter, verse: content.scripture.verse, translation: content.scripture.translation } : null;
  const verseText = useVerseText(ref);
  const isBookmarked = !!ref && saved.bookmarks.some((b) => b.reference.bookId === ref!.bookId && b.reference.chapter === ref!.chapter && b.reference.verse === ref!.verse && b.reference.translation === ref!.translation);
  async function toggleBookmark() { if (!ref) return; await saved.toggleBookmark(ref); }
  if (!content) return <div className="min-h-screen bg-[#F8FAFC] p-6"><div className="mx-auto max-w-[720px] space-y-4"><div className="h-56 rounded-[16px] bg-[#F1F5F9] skeleton" /><div className="h-24 rounded-[12px] bg-white border border-[#E2E8F0] skeleton" /></div></div>;
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero image with title overlay */}
      <div className="relative h-[280px] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Devotional hero" fill priority sizes="100vw" style={{objectFit: 'cover'}} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 max-w-[720px] mx-auto w-full">
          <span className="inline-flex self-start rounded-full bg-white/20 backdrop-blur px-3 py-1 font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-white border border-white/20">{content.reference} • {content.translation.toUpperCase()}</span>
          <h1 className="mt-3 font-sans text-[26px] font-bold leading-tight text-white max-w-[18ch]">{content.theme || "God's Plans Are For Your Good"}</h1>
          <p className="mt-1 font-sans text-[12px] text-white/80">{formatLagosDate(content.date)}</p>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-4 -mt-4 relative z-10 space-y-4 pb-10">
        {/* Scripture + Reflection Card */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5">
          <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">Today&apos;s Scripture</p>
          <p className="mt-2 font-serif text-[15px] leading-[1.7] text-[#0F172A] italic">“{verseText ?? content.quote}”</p>
          <div className="mt-4 flex gap-2">
            <Button href={`/bible/${content.scripture.bookId}/${content.scripture.chapter}`} className="rounded-full bg-[#0B2E68] text-white h-9 px-5 font-sans text-[13px] font-semibold">Read Full Chapter</Button>
            <button onClick={toggleBookmark} aria-pressed={isBookmarked} className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-4 h-9 font-sans text-[13px] font-medium text-[#0F172A] hover:bg-[#F8FAFC]">{isBookmarked ? <BookmarkFilledIcon size={14} className="text-[#0B2E68]" /> : <BookmarkIcon size={14} />} {isBookmarked ? 'Saved' : 'Save'}</button>
          </div>
        </div>

        {/* Reflection */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5">
          <h2 className="font-sans text-[16px] font-bold text-[#0F172A]">Reflection</h2>
          <p className="mt-3 font-sans text-[14px] leading-[1.65] text-[#475569]">{content.reflection}</p>
        </div>

        {/* Takeaway — light-blue callout */}
        <div className="rounded-[12px] bg-[#EFF6FF] border border-[#DBEAFE] p-5">
          <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">Takeaway</p>
          <p className="mt-2 font-sans text-[14px] leading-[1.6] text-[#1E3A5F]">{content.reflection.slice(0, 160)} — stay rooted in His Word today.</p>
        </div>

        {/* Quote overlay — full-screen sunset visual */}
        <div className="rounded-[16px] overflow-hidden relative h-[320px] flex flex-col">
          <Image src="https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=900&q=80" alt="Sunset quote background" fill sizes="100vw" style={{objectFit: 'cover'}} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
          <div className="relative flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="font-serif text-[18px] leading-[1.6] text-white max-w-[28ch]">“{content.quote}”</p>
            {content.quoteAuthor && <p className="mt-3 font-sans text-[11px] font-semibold tracking-[0.08em] uppercase text-white/80">— {content.quoteAuthor}</p>}
            <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">✦</span>
          </div>
          <div className="relative p-4 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#0B2E68] px-5 h-9 font-sans text-[13px] font-semibold text-white shadow"><ShareIcon size={14} /> Share Quote</button>
          </div>
        </div>

        {/* Today's Prayer preview */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-5">
          <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">Today&apos;s Prayer</p>
          <p className="mt-2 font-serif text-[14px] leading-[1.7] text-[#0F172A]">{content.prayer}</p>
          <Link href="/prayer" className="mt-3 inline-flex font-sans text-[13px] font-semibold text-[#0B2E68]">Go to Prayers →</Link>
        </div>

        {requestedDate && todayDate && requestedDate !== todayDate && <Link href="/daily" className="inline-flex font-sans text-[13px] font-semibold text-[#0B2E68]">← Back to today</Link>}
      </div>
    </div>
  );
}
