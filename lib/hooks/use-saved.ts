'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  loadReaderSettings,
  saveReaderSettings,
  type ReaderSettings,
} from '@/lib/data/preferences-repository';
import { savedRepository } from '@/lib/data/saved-repository';
import type {
  Bookmark,
  Highlight,
  PlanProgress,
  PrayerEntry,
  ScriptureRef,
} from '@/lib/data/types';
import type { TranslationSlug } from '@/lib/fixtures/books';

export interface SavedState {
  bookmarks: Bookmark[];
  highlights: Highlight[];
  prayers: PrayerEntry[];
  refresh: () => Promise<void>;
  toggleBookmark: (ref: ScriptureRef) => Promise<boolean>;
  removeBookmark: (id: string) => Promise<void>;
  addHighlight: (ref: ScriptureRef, color: Highlight['color'], note?: string) => Promise<void>;
  removeHighlight: (id: string) => Promise<void>;
  addPrayer: (text: string) => Promise<PrayerEntry | null>;
  removePrayer: (id: string) => Promise<void>;
  planProgress: (planId: string) => Promise<PlanProgress | undefined>;
  completeDay: (planId: string, day: number, totalDays: number) => Promise<void>;
  resetPlan: (planId: string) => Promise<void>;
}

export function useSaved(): SavedState {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [prayers, setPrayers] = useState<PrayerEntry[]>([]);

  const refresh = useCallback(async () => {
    const [b, h, p] = await Promise.all([
      savedRepository.listBookmarks(),
      savedRepository.listHighlights(),
      savedRepository.listPrayers(),
    ]);
    setBookmarks(b);
    setHighlights(h);
    setPrayers(p);
  }, []);

  useEffect(() => {
    void refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key?.startsWith('dolbic.')) void refresh();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refresh]);

  const toggleBookmark = useCallback(
    async (ref: ScriptureRef) => {
      const active = await savedRepository.toggleBookmark(ref);
      void refresh();
      return active;
    },
    [refresh],
  );

  const removeBookmark = useCallback(
    async (id: string) => {
      await savedRepository.removeBookmark(id);
      void refresh();
    },
    [refresh],
  );

  const addHighlight = useCallback(
    async (ref: ScriptureRef, color: Highlight['color'], note?: string) => {
      await savedRepository.addHighlight(ref, color, note);
      void refresh();
    },
    [refresh],
  );

  const removeHighlight = useCallback(
    async (id: string) => {
      await savedRepository.removeHighlight(id);
      void refresh();
    },
    [refresh],
  );

  const addPrayer = useCallback(
    async (text: string) => {
      if (!text.trim()) return null;
      const entry = await savedRepository.addPrayer(text);
      void refresh();
      return entry;
    },
    [refresh],
  );

  const removePrayer = useCallback(
    async (id: string) => {
      await savedRepository.removePrayer(id);
      void refresh();
    },
    [refresh],
  );

  const planProgress = useCallback(async (planId: string) => {
    return savedRepository.getPlanProgress(planId);
  }, []);

  const completeDay = useCallback(
    async (planId: string, day: number, totalDays: number) => {
      const progress = (await savedRepository.getPlanProgress(planId)) ?? {
        planId,
        currentDay: day,
        completedDays: [],
      };
      const completedDays = progress.completedDays.includes(day)
        ? progress.completedDays.filter((d) => d !== day)
        : [...progress.completedDays, day];
      const nextDay = Math.min(Math.max(day, progress.currentDay), totalDays);
      const payload: PlanProgress = {
        planId,
        currentDay: completedDays.includes(nextDay) ? Math.min(nextDay + 1, totalDays) : nextDay,
        completedDays,
        startedAt: progress.startedAt,
        completedAt: Array.from({ length: totalDays }, (_, i) => i + 1).every((d) =>
          completedDays.includes(d),
        )
          ? new Date().toISOString()
          : undefined,
      };
      await savedRepository.savePlanProgress(payload);
      void refresh();
    },
    [refresh],
  );

  const resetPlan = useCallback(
    async (planId: string) => {
      await savedRepository.resetPlanProgress(planId);
      void refresh();
    },
    [refresh],
  );

  return useMemo(
    () => ({
      bookmarks,
      highlights,
      prayers,
      refresh,
      toggleBookmark,
      removeBookmark,
      addHighlight,
      removeHighlight,
      addPrayer,
      removePrayer,
      planProgress,
      completeDay,
      resetPlan,
    }),
    [
      bookmarks,
      highlights,
      prayers,
      refresh,
      toggleBookmark,
      removeBookmark,
      addHighlight,
      removeHighlight,
      addPrayer,
      removePrayer,
      planProgress,
      completeDay,
      resetPlan,
    ],
  );
}

export function useReaderSettings(): [ReaderSettings, (s: ReaderSettings) => void] {
  const [settings, setSettings] = useState<ReaderSettings>(() => loadReaderSettings());
  const update = useCallback((next: ReaderSettings) => {
    setSettings(next);
    saveReaderSettings(next);
    if (typeof document !== 'undefined') {
      const theme =
        next.theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : next.theme;
      document.documentElement.dataset.theme = theme;
    }
  }, []);
  return [settings, update];
}

export function applyStoredTheme(): void {
  if (typeof document === 'undefined') return;
  const settings = loadReaderSettings();
  const theme =
    settings.theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : settings.theme;
  document.documentElement.dataset.theme = theme;
}

export function getActiveTranslation(preferred: TranslationSlug | undefined): TranslationSlug {
  return preferred ?? 'kjv';
}