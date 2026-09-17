'use client';
import { useState } from 'react';
import { useSaved } from '@/lib/hooks/use-saved';
import { useVerseText } from '@/lib/hooks/use-bible';
import { Button } from '@/components/ui/button';
import { PrayerHandsIcon, PlusIcon, ChevronRightIcon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';

const CATS = ['All', 'For Family', 'For Healing', 'For Faith'] as const;
type Cat = typeof CATS[number];
const SCRIPTURE_REF = { bookId: 'php', chapter: 4, verse: 6, translation: 'kjv' as const };

export default function PrayerPage() {
  const [active, setActive] = useState<Cat>('All');
  const [text, setText] = useState('');
  const saved = useSaved();
  const { toast } = useToast();
  const verseText = useVerseText(SCRIPTURE_REF);

  async function savePrayer() {
    const entry = await saved.addPrayer(text);
    if (entry) { setText(''); toast({ message: 'Prayer recorded' }); }
  }

  const filtered = active === 'All' ? saved.prayers : saved.prayers.filter((_, i) => (active === 'For Family' ? i % 3 === 0 : active === 'For Healing' ? i % 3 === 1 : i % 3 === 2));

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="bg-[#0B2E68] px-4 pt-6 pb-5">
        <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-white/70">Prayer journal</p>
        <h1 className="mt-1 font-sans text-[22px] font-bold text-white">Prayers</h1>
        <p className="mt-1 font-sans text-[13px] text-white/70">Written prayers are remembered prayers.</p>
      </div>

      <div className="max-w-[720px] mx-auto px-4 py-4 space-y-4">
        {/* Pill filter bar */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1" role="tablist" aria-label="Prayer categories">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={active===c} onClick={() => setActive(c)} className={`shrink-0 h-8 rounded-full px-4 font-sans text-[13px] font-semibold border transition-colors ${active===c ? 'bg-[#0B2E68] text-white border-[#0B2E68]' : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#CBD5E1]'}`}>{c}</button>
          ))}
        </div>

        {/* Anchor scripture */}
        <div className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3">
          <p className="font-sans text-[11px] font-bold tracking-[0.08em] uppercase text-[#0B2E68]">Philippians 4:6</p>
          <p className="mt-1 font-serif text-[14px] leading-[1.6] text-[#0F172A]">{verseText || 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'}</p>
        </div>

        {/* Category list rows */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><PrayerHandsIcon size={20} /></div>
              <p className="mt-3 font-sans text-[14px] font-semibold text-[#0F172A]">No prayers in {active}</p>
              <p className="mt-1 font-sans text-[12px] text-[#64748B]">Write your first prayer below.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#E2E8F0]">
              {filtered.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2E68] text-white"><PrayerHandsIcon size={16} /></span>
                  <span className="flex-1 min-w-0">
                    <span className="block truncate font-sans text-[14px] font-semibold text-[#0F172A]">{p.text.slice(0, 48)}</span>
                    <span className="block font-sans text-[12px] text-[#64748B]">{new Date(p.createdAt).toLocaleDateString()} • {active}</span>
                  </span>
                  <ChevronRightIcon size={16} className="shrink-0 text-[#94A3B8]" />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Compose */}
        <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
          <label htmlFor="prayer-text" className="block font-sans text-[13px] font-semibold text-[#0F172A]">Write your prayer</label>
          <p className="font-sans text-[12px] text-[#94A3B8] mb-2">Kept only on this device for now</p>
          <textarea id="prayer-text" value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Dear Lord…" className="w-full rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-3 font-serif text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0B2E68]/20 focus:border-[#0B2E68] resize-none" />
          <div className="mt-3 flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">{text.trim().length} characters</span>
            <Button onClick={savePrayer} disabled={!text.trim()} className="rounded-full bg-[#0B2E68] text-white h-9 px-5 font-sans text-[13px] font-semibold hover:bg-[#0A2655] disabled:opacity-40">Save Prayer</Button>
          </div>
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="font-sans text-[12px] text-[#64748B]">{saved.prayers.length} saved</span>
          <span className="font-sans text-[11px] text-[#94A3B8]">Private to this device</span>
        </div>
      </div>
    </div>
  );
}
