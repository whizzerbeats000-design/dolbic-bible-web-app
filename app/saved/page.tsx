'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSaved } from '@/lib/hooks/use-saved';
import { BookmarkIcon, BookmarkFilledIcon, TrashIcon } from '@/components/ui/icons';
const bibleTitles: Record<string,string> = { gen:'Genesis', exo:'Exodus', lev:'Leviticus', num:'Numbers', deu:'Deuteronomy', jos:'Joshua', jdg:'Judges', rut:'Ruth', '1sa':'1 Samuel', '2sa':'2 Samuel', '1ki':'1 Kings', '2ki':'2 Kings', '1ch':'1 Chronicles', '2ch':'2 Chronicles', ezr:'Ezra', neh:'Nehemiah', est:'Esther', job:'Job', psa:'Psalms', pro:'Proverbs', ecc:'Ecclesiastes', sng:'Song of Solomon', isa:'Isaiah', jer:'Jeremiah', lam:'Lamentations', ezk:'Ezekiel', dan:'Daniel', hos:'Hosea', jol:'Joel', amo:'Amos', oba:'Obadiah', jon:'Jonah', mic:'Micah', nam:'Nahum', hab:'Habakkuk', zep:'Zephaniah', hag:'Haggai', zec:'Zechariah', mal:'Malachi', mat:'Matthew', mrk:'Mark', luk:'Luke', jhn:'John', act:'Acts', rom:'Romans', '1co':'1 Corinthians', '2co':'2 Corinthians', gal:'Galatians', eph:'Ephesians', php:'Philippians', col:'Colossians', '1th':'1 Thessalonians', '2th':'2 Thessalonians', '1ti':'1 Timothy', '2ti':'2 Timothy', tit:'Titus', phm:'Philemon', heb:'Hebrews', jas:'James', '1pe':'1 Peter', '2pe':'2 Peter', '1jn':'1 John', '2jn':'2 John', '3jn':'3 John', jud:'Jude', rev:'Revelation' };
function label(b:any){ const t=bibleTitles[b.bookId]||b.bookId; return b.verse?`${t} ${b.chapter}:${b.verse}`:`${t} ${b.chapter}`; }
function fmt(iso:string){ try{ return new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}catch{return iso;}}
export default function SavedPage(){
  const [tab,setTab]=useState<'verses'|'devotionals'>('verses');
  const saved=useSaved();
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[720px] mx-auto px-4 pt-4 pb-3">
          <h1 className="font-sans text-[22px] font-bold text-[#0F172A]">Bookmarks</h1>
          <p className="mt-1 font-sans text-[13px] text-[#64748B]">Your saved verses and devotionals.</p>
          <div className="mt-3 inline-flex rounded-full bg-[#F1F5F9] p-1 gap-1">
            <button onClick={()=>setTab('verses')} className={`h-8 rounded-full px-5 font-sans text-[13px] font-semibold transition-colors ${tab==='verses'?'bg-[#0B2E68] text-white shadow':'text-[#475569]'}`}>Verses</button>
            <button onClick={()=>setTab('devotionals')} className={`h-8 rounded-full px-5 font-sans text-[13px] font-semibold transition-colors ${tab==='devotionals'?'bg-[#0B2E68] text-white shadow':'text-[#475569]'}`}>Devotionals</button>
          </div>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto px-4 py-4">
        {tab==='verses' ? (
          saved.bookmarks.length===0 ? (
            <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-10 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B2E68]"><BookmarkIcon size={20}/></div>
              <p className="mt-3 font-sans text-[14px] font-semibold text-[#0F172A]">No saved verses</p>
              <p className="mt-1 font-sans text-[13px] text-[#64748B]">Tap a verse in the reader and bookmark it.</p>
              <Link href="/bible" className="mt-4 inline-flex h-9 items-center rounded-full bg-[#0B2E68] px-5 font-sans text-[13px] font-semibold text-white">Open Bible</Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {saved.bookmarks.map((b:any)=>(
                <li key={b.id} className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/bible/${b.reference.bookId}/${b.reference.chapter}`} className="flex-1 min-w-0">
                      <p className="flex items-center gap-2 font-sans text-[14px] font-bold text-[#0F172A]"><BookmarkFilledIcon size={14} className="text-[#0B2E68] shrink-0"/>{label(b.reference)}</p>
                      <p className="mt-1 font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-[#94A3B8]">{b.reference.translation.toUpperCase()} • {fmt(b.createdAt)}</p>
                    </Link>
                    <button onClick={()=>saved.removeBookmark(b.id)} aria-label="Remove" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F1F5F9] text-[#94A3B8] hover:text-[#0B2E68]"><TrashIcon size={14}/></button>
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          saved.prayers.length===0 ? (
            <div className="rounded-[16px] bg-white border border-[#E2E8F0] p-10 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
              <p className="font-sans text-[14px] font-semibold text-[#0F172A]">No devotionals saved</p>
              <p className="mt-1 font-sans text-[13px] text-[#64748B]">Save from Daily Devotional.</p>
              <Link href="/daily" className="mt-4 inline-flex h-9 items-center rounded-full bg-[#0B2E68] px-5 font-sans text-[13px] font-semibold text-white">Go to Devotional</Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {saved.prayers.map((p:any)=>(
                <li key={p.id} className="rounded-[12px] bg-white border border-[#E2E8F0] p-4 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                  <p className="font-serif text-[14px] leading-[1.6] text-[#0F172A] line-clamp-3">“{p.text}”</p>
                  <p className="mt-2 font-sans text-[11px] text-[#94A3B8]">{fmt(p.createdAt)}</p>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
