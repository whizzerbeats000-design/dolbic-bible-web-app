'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useChapter, useChapterNav } from '@/lib/hooks/use-bible';
import { useSaved, useReaderSettings } from '@/lib/hooks/use-saved';
import { Verse } from '@/components/bible/verse';
import { VerseSkeleton } from '@/components/ui/skeleton';
import {
  BookmarkIcon,
  BookmarkFilledIcon,
  CopyIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
import type { HighlightColor } from '@/lib/data/types';

const FONT_ORDER = ['sm', 'md', 'lg', 'xl'] as const;

export function Reader({ bookId, chapter, translation }: { bookId: string; chapter: number; translation: string }) {
  const { data, error, loading } = useChapter(bookId, chapter, translation as 'kjv' | 'web');
  const [settings, updateSettings] = useReaderSettings();
  const saved = useSaved();
  const { toast } = useToast();
  const nav = useChapterNav(bookId, chapter);

  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => setSelectedVerse(null), [bookId, chapter, translation]);

  useEffect(() => {
    document.body.classList.toggle('focus-mode', focusMode);
    return () => document.body.classList.remove('focus-mode');
  }, [focusMode]);

  const activeRef = selectedVerse
    ? { bookId, chapter, verse: selectedVerse, translation: translation as 'kjv' | 'web' }
    : null;
  const isBookmarked = activeRef
    ? saved.bookmarks.some((b) => b.reference.bookId === bookId && b.reference.chapter === chapter && b.reference.verse === selectedVerse && b.reference.translation === translation)
    : false;

  function stepFont(dir: -1 | 1) {
    const idx = FONT_ORDER.indexOf(settings.fontSize as (typeof FONT_ORDER)[number]);
    const next = FONT_ORDER[Math.max(0, Math.min(FONT_ORDER.length - 1, idx + dir))];
    if (next !== settings.fontSize) updateSettings({ ...settings, fontSize: next });
  }

  async function handleBookmark() {
    if (!activeRef) return;
    const now = await saved.toggleBookmark(activeRef);
    toast({ message: now ? 'Bookmarked' : 'Bookmark removed', type: 'success' });
  }

  async function handleHighlight(color: HighlightColor) {
    if (!activeRef) return;
    const existing = saved.highlights.find(
      (h) =>
        h.reference.bookId === bookId &&
        h.reference.chapter === chapter &&
        h.reference.verse === selectedVerse &&
        h.reference.translation === translation &&
        h.color === color,
    );
    if (existing) {
      await saved.removeHighlight(existing.id);
      toast({ message: 'Highlight removed' });
    } else {
      await saved.addHighlight(activeRef, color);
      toast({ message: 'Highlighted', type: 'success' });
    }
    setShowHighlightPicker(false);
  }

  async function handleCopy() {
    if (!data || selectedVerse == null) return;
    const v = data.verses.find((x) => x.n === selectedVerse);
    if (!v) return;
    const ref = `${data.bookTitle} ${data.chapter}:${v.n}`;
    const text = `${ref}\n${v.t}\n— ${translation.toUpperCase()}`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ message: 'Copied verse' });
    } catch {
      toast({ message: 'Could not copy. Select the text above.', type: 'error' });
    }
  }

  function handleShare() {
    if (!data || selectedVerse == null) return;
    const v = data.verses.find((x) => x.n === selectedVerse);
    const text = v ? `${data.bookTitle} ${data.chapter}:${v.n} — ${v.t}` : `${data.bookTitle} ${data.chapter}`;
    const url = `${window.location.origin}${window.location.pathname}`;
    if (navigator.share) {
      void navigator
        .share({ title: 'DOLBIC Bible', text, url })
        .catch(() => {});
    } else {
      void navigator.clipboard.writeText(`${text}\n${url}`);
      toast({ message: 'Link and verse copied' });
    }
  }

  if (loading) {
    return (
      <div className="max-w-reader mx-auto px-5 py-8">
        <VerseSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-reader mx-auto px-5 py-10 text-center" role="alert">
        <p className="font-serif text-lg text-[var(--text-main)]">We could not load this chapter.</p>
        <p className="mt-1 font-sans text-sm text-[var(--text-muted)]">{error?.message}</p>
        <p className="mt-1 font-sans text-xs text-[var(--text-muted)]">Verify the verse fixtures exist for this translation (scripts/fetch-bible.mjs).</p>
      </div>
    );
  }

  const fontSizeClass =
    settings.fontSize === 'xl' ? 'text-[clamp(1.4rem,1.28rem+0.9vw,1.8rem)]' :
    settings.fontSize === 'lg' ? 'text-scripture-lg' :
    settings.fontSize === 'sm' ? 'text-[clamp(1rem,0.9rem+0.5vw,1.15rem)]' :
    'text-scripture';

  return (
    <>
      <div className="max-w-reader mx-auto px-5 pt-6 pb-8">
        {/* Chapter heading */}
        <header className={`mb-7 ${focusMode ? 'text-center' : ''}`}>
          {!focusMode && (
            <p className="eyebrow mb-2 text-[var(--color-flame)]">
              {data.translation === 'web' ? 'World English Bible' : 'King James Version'}
            </p>
          )}
          <h1 className="font-serif text-[28px] font-semibold leading-tight text-[var(--color-deep)] dark:text-white tracking-[-0.01em]">
            <span className="sr-only">{data.bookTitle} </span>
            {data.bookTitle}
            <span className="text-[var(--color-gold)]"> {data.chapter}</span>
          </h1>
          {!focusMode && <div className="mt-3 h-px w-12 bg-[var(--color-gold)]" aria-hidden="true" />}
        </header>

        {/* Reader controls */}
        {!focusMode && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 shadow-card">
            <div className="flex items-center gap-1">
              <span className="mr-1 hidden sm:inline font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                Text
              </span>
              <button
                type="button"
                onClick={() => stepFont(-1)}
                aria-label="Smaller text"
                title="Smaller text"
                disabled={settings.fontSize === 'sm'}
                className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-sans text-[13px] font-semibold text-[var(--text-main)] hover:bg-[var(--color-cream)] dark:hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => stepFont(1)}
                aria-label="Larger text"
                title="Larger text"
                disabled={settings.fontSize === 'xl'}
                className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-sans text-[17px] font-semibold text-[var(--text-main)] hover:bg-[var(--color-cream)] dark:hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              onClick={() => updateSettings({ ...settings, showVerseNumbers: !settings.showVerseNumbers })}
              aria-pressed={settings.showVerseNumbers}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[12px] font-medium text-[var(--text-main)] hover:bg-[var(--color-cream)] dark:hover:bg-white/10 transition-colors"
            >
              <span className={`font-sans text-[11px] font-bold ${settings.showVerseNumbers ? 'text-[var(--color-gold)]' : 'text-[var(--text-muted)]'}`}>#</span>
              Verse numbers {settings.showVerseNumbers ? 'on' : 'off'}
            </button>

            <button
              type="button"
              onClick={() => setFocusMode(true)}
              aria-pressed={focusMode}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-[var(--color-deep)] px-3.5 py-1.5 font-sans text-[12px] font-medium text-white hover:bg-[var(--color-medium)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
              Focus
            </button>
          </div>
        )}

        {/* Verse text */}
        <div className={fontSizeClass} role="doc-chapter">
          {data.verses.map((v) => (
            <Verse
              key={v.n}
              num={v.n}
              text={v.t}
              showVerseNumber={settings.showVerseNumbers}
              isSelected={selectedVerse === v.n}
              isBookmarked={saved.bookmarks.some(
                (b) =>
                  b.reference.bookId === bookId &&
                  b.reference.chapter === chapter &&
                  b.reference.verse === v.n &&
                  b.reference.translation === translation,
              )}
              highlight={saved.highlights.find(
                (h) =>
                  h.reference.bookId === bookId &&
                  h.reference.chapter === chapter &&
                  h.reference.verse === v.n &&
                  h.reference.translation === translation,
              )?.color}
              onSelect={() => setSelectedVerse((cur) => (cur === v.n ? null : v.n))}
            />
          ))}
        </div>

        {/* Prev / Next chapter */}
        {!focusMode && (
          <nav className="mt-12 flex flex-col gap-3 sm:flex-row" aria-label="Chapter navigation">
            {nav.prevBookId && nav.prevChapter ? (
              <Link
                href={`/bible/${nav.prevBookId}/${nav.prevChapter}`}
                className="inline-flex flex-1 items-center gap-2 rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 font-sans text-[14px] font-medium text-[var(--text-main)] hover:border-[var(--color-gold)] transition-colors min-h-[48px]"
              >
                <ChevronLeftIcon size={18} className="shrink-0 text-[var(--color-gold)]" />
                Previous chapter
              </Link>
            ) : (
              <span className="hidden" aria-hidden="true" />
            )}
            {nav.nextBookId && nav.nextChapter ? (
              <Link
                href={`/bible/${nav.nextBookId}/${nav.nextChapter}`}
                className="inline-flex flex-1 items-center justify-between gap-2 rounded-dolbic-md border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 font-sans text-[14px] font-medium text-[var(--text-main)] hover:border-[var(--color-gold)] transition-colors min-h-[48px]"
              >
                <span className="sr-only">Next chapter</span>
                <span className="flex-1 text-right">Next chapter</span>
                <ChevronRightIcon size={18} className="shrink-0 text-[var(--color-gold)]" />
              </Link>
            ) : null}
          </nav>
        )}

        {focusMode && (
          <p className="mt-12 text-center font-sans text-[12px] text-[var(--text-muted)]">
            Tap a verse to save, highlight or share it.
          </p>
        )}
      </div>

      {/* Sticky bottom action pill — + Add to Bookmarks */}
      {selectedVerse && activeRef && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-md z-50">
          <div className="rounded-full bg-[#0B2E68] text-white shadow-[0px_4px_12px_rgba(0,0,0,0.15)] px-2 py-2 flex items-center gap-1">
            <span className="flex-1 truncate px-3 font-sans text-[13px] font-semibold">
              {data.bookTitle} {data.chapter}:{selectedVerse}
            </span>
            <button
              onClick={handleBookmark}
              aria-pressed={isBookmarked}
              title={isBookmarked ? 'Remove bookmark' : 'Add to Bookmarks'}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 h-9 font-sans text-[13px] font-semibold transition-colors ${isBookmarked ? 'bg-white text-[#0B2E68]' : 'bg-white text-[#0B2E68] hover:bg-[#F8FAFC]'}`}
            >
              {isBookmarked ? <BookmarkFilledIcon size={16} /> : <span className="text-[16px] leading-none">+</span>} {isBookmarked ? 'Saved' : 'Add to Bookmarks'}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowHighlightPicker((s) => !s)}
                aria-expanded={showHighlightPicker}
                title="Highlight"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 11-6 6v3h3l6-6" />
                  <path d="m14 6 4 4 3-3-4-4z" />
                </svg>
              </button>
              {showHighlightPicker && (
                <div className="absolute bottom-12 right-0 flex items-center gap-1.5 rounded-dolbic-md bg-white text-[var(--color-deep)] shadow-xl px-2.5 py-2 animate-in-slide-up">
                  <span className="mr-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">Colour</span>
                  {(['gold', 'flame', 'blue'] as HighlightColor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleHighlight(c)}
                      aria-label={`Highlight ${c}`}
                      className={`h-7 w-7 rounded-full border-2 border-white shadow ${c === 'gold' ? 'bg-[#CFAE5D]' : c === 'flame' ? 'bg-[#D93025]' : 'bg-[#3A5B8C]'}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleCopy}
              title="Copy verse"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white"
            >
              <CopyIcon size={18} />
            </button>
            <button
              onClick={handleShare}
              title="Share verse"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white"
            >
              <ShareIcon size={18} />
            </button>
            <button
              onClick={() => setSelectedVerse(null)}
              aria-label="Close verse tools"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Exit focus */}
      {focusMode && (
        <button
          type="button"
          onClick={() => setFocusMode(false)}
          className="fixed top-4 right-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-deep)] px-4 py-2 font-sans text-[13px] font-medium text-white shadow-[0_6px_24px_rgba(10,39,64,0.3)] hover:bg-[var(--color-medium)] transition-colors min-h-[44px]"
        >
          <XIcon size={15} />
          Exit focus
        </button>
      )}
    </>
  );
}