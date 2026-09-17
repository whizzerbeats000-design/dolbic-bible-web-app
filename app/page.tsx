'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dailyRepository } from '@/lib/data/daily-repository';
import { useSaved } from '@/lib/hooks/use-saved';
import { useVerseText } from '@/lib/hooks/use-bible';
import type { DailyContent } from '@/lib/data/types';
import { BookOpenIcon, ChevronRightIcon, PrayerHandsIcon } from '@/components/ui/icons';

function Splash() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // Enforce 3000ms for brand exposure
    return () => clearTimeout(timer);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0B2E68] overflow-hidden animate-[fade-in_200ms_ease]">
      <svg className="absolute top-0 left-0 w-full h-[38%]" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V180C1100 260 900 300 720 300C540 300 340 260 0 180V0Z" fill="#C9A86A" opacity="0.95"/><path d="M0 0H1440V140C1100 220 900 250 720 250C540 250 340 220 0 140V0Z" fill="#D4B77A" opacity="0.9"/></svg>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative">
        <span className="flex h-28 w-28 md:h-32 md:w-32 items-center justify-center bg-transparent mb-6"><Image src="/logos/dolbic-mark.png" alt="DOLBIC logo" width={128} height={128} className="h-28 w-28 md:h-32 md:w-32 object-contain" priority /></span>
        <h1 className="font-sans text-[34px] md:text-[40px] font-extrabold tracking-[-0.03em] text-white leading-none">DOLBIC BIBLE</h1>
        <p className="mt-3 font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-white/85">Read • Reflect • Pray • Grow</p>
      </div>
      <div className="relative h-[36%] overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=80" alt="Open Bible" fill priority sizes="100vw" style={{objectFit: 'cover'}} className="opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E68] via-[#0B2E68]/30 to-transparent" />
        <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80C360 20 720 0 1080 20C1260 30 1380 50 1440 80V120H0V80Z" fill="#C9A86A"/><path d="M0 100C360 50 720 30 1080 50C1260 60 1380 80 1440 100V120H0V100Z" fill="#0B2E68"/></svg>
      </div>
    </div>
  );
}

export default function Home() {
  const [today, setToday] = useState<DailyContent | null>(null);
  const saved = useSaved();
  useEffect(() => { void dailyRepository.today().then(setToday); }, []);
  const ref = today?.scripture ? { bookId: today.scripture.bookId, chapter: today.scripture.chapter, verse: today.scripture.verse, translation: today.scripture.translation } : null;
  const verseText = useVerseText(ref);
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-6">
      <Splash />
      {/* Sunrise Hero */}
      <section className="relative overflow-hidden bg-[#0B2E68]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80" alt="Sunrise over mountains" fill priority sizes="100vw" style={{objectFit: 'cover'}} className="opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E68] via-[#0B2E68]/40 to-[#0B2E68]/10" />
          <svg className="absolute bottom-0 left-0 w-full h-10" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 Q360 0 720 10 T1440 20 L1440 40 L0 40 Z" fill="#F8FAFC" /></svg>
        </div>
        <div className="relative max-w-[720px] mx-auto px-4 pt-5 pb-10">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[13px] font-medium text-white/80">{greeting}</p>
            <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur px-3 py-1 font-sans text-[11px] font-semibold text-white border border-white/20">{dateStr}</span>
          </div>
          <h1 className="mt-3 font-sans text-[26px] font-bold leading-tight text-white max-w-[16ch]">{today ? today.theme : 'The Word, prayed & kept.'}</h1>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/70 max-w-xl">Daily Scripture, a reflection, and a prayer — everything you need to begin the day rooted in Christ.</p>
        </div>
      </section>

      {/* Scripture Card — floating */}
      <section className="max-w-[720px] mx-auto px-4 -mt-6 relative z-10" aria-label="Today's Scripture">
        {today ? (
          <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-5">
            <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">Today&apos;s Scripture — {today.reference}</p>
            <p className="mt-3 font-serif text-[16px] leading-[1.7] text-[#0F172A] italic">“{verseText ?? today.quote}”</p>
            <p className="mt-2 font-sans text-[11px] text-[#94A3B8]">{today.reference} • {today.translation.toUpperCase()}</p>
            <Link href={`/bible/${today.scripture.bookId}/${today.scripture.chapter}`} className="mt-4 flex h-11 items-center justify-center rounded-full bg-[#0B2E68] px-6 font-sans text-[14px] font-semibold text-white hover:bg-[#0A2655] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2E68] focus-visible:ring-offset-2">Read Full Chapter</Link>
          </div>
        ) : (
          <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-5 space-y-3"><div className="h-4 w-1/3 rounded bg-[#F1F5F9] skeleton" /><div className="h-5 w-full rounded bg-[#F1F5F9] skeleton" /></div>
        )}
      </section>

      {/* Quick Access — soft-blue rows */}
      <section className="max-w-[720px] mx-auto px-4 mt-4" aria-label="Quick access">
        <div className="rounded-[12px] bg-white border border-[#E2E8F0] p-2">
          {[
            { label: "Today's Quote", sub: today?.quote ? `"${today.quote.slice(0, 42)}..."` : 'Inspiration for today', href: '/daily', icon: BookOpenIcon },
            { label: "Today's Prayer", sub: today?.prayer ? today.prayer.slice(0, 44) + '...' : 'A prayer to carry', href: '/prayer', icon: PrayerHandsIcon },
            { label: 'Daily Reflection', sub: today?.reflection ? today.reflection.slice(0, 44) + '...' : 'Reflect on the Word', href: '/daily', icon: BookOpenIcon },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-[12px] px-3 py-3 hover:bg-[#F8FAFC] transition-colors min-h-[56px] group">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><item.icon size={18} strokeWidth={1.8} /></span>
              <span className="flex-1 min-w-0">
                <span className="block font-sans text-[14px] font-semibold text-[#0F172A]">{item.label}</span>
                <span className="block truncate font-sans text-[12px] text-[#64748B]">{item.sub}</span>
              </span>
              <ChevronRightIcon size={18} className="shrink-0 text-[#94A3B8] group-hover:text-[#0B2E68]" />
            </Link>
          ))}
        </div>
      </section>

      {/* Secondary cards */}
      <section className="max-w-[720px] mx-auto px-4 mt-4 grid gap-3 sm:grid-cols-2">
        <Link href="/bible" className="flex items-center gap-3 rounded-[12px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:border-[#CBD5E1] transition-colors min-h-[64px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><BookOpenIcon size={18} /></span>
          <span className="flex-1"><span className="block font-sans text-[14px] font-semibold text-[#0F172A]">The Bible</span><span className="block font-sans text-[12px] text-[#64748B]">KJV • WEB</span></span><ChevronRightIcon size={16} className="text-[#94A3B8]" />
        </Link>
        <Link href="/plans" className="flex items-center gap-3 rounded-[12px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:border-[#CBD5E1] transition-colors min-h-[64px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><BookOpenIcon size={18} /></span>
          <span className="flex-1"><span className="block font-sans text-[14px] font-semibold text-[#0F172A]">Reading Plans</span><span className="block font-sans text-[12px] text-[#64748B]">Track your journey</span></span><ChevronRightIcon size={16} className="text-[#94A3B8]" />
        </Link>
      </section>
    </div>
  );
}
