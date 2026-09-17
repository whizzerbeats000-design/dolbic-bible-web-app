// Saved-content repository — bookmarks, highlights, prayer journal,
// plan progress (client persistence).
// Interface stays stable so a Supabase-backed implementation can replace
// the localStorage one without touching the UI.

import type {
  Bookmark,
  Highlight,
  PlanProgress,
  PrayerEntry,
  ScriptureRef,
} from '@/lib/data/types';

export interface SavedRepository {
  listBookmarks(): Promise<Bookmark[]>;
  hasBookmark(ref: ScriptureRef): Promise<boolean>;
  addBookmark(ref: ScriptureRef, label?: string): Promise<void>;
  removeBookmark(id: string): Promise<void>;
  toggleBookmark(ref: ScriptureRef): Promise<boolean>;

  listHighlights(): Promise<Highlight[]>;
  highlightsFor(ref: Omit<ScriptureRef, 'verse'> & { verse?: number }): Promise<Highlight[]>;
  addHighlight(ref: ScriptureRef, color: Highlight['color'], note?: string): Promise<void>;
  removeHighlight(id: string): Promise<void>;

  listPrayers(): Promise<PrayerEntry[]>;
  addPrayer(text: string): Promise<PrayerEntry>;
  removePrayer(id: string): Promise<void>;

  getPlanProgress(planId: string): Promise<PlanProgress | undefined>;
  savePlanProgress(progress: PlanProgress): Promise<void>;
  resetPlanProgress(planId: string): Promise<void>;
}

const KEYS = {
  bookmarks: 'dolbic.saved.bookmarks',
  highlights: 'dolbic.saved.highlights',
  prayers: 'dolbic.saved.prayers',
  progress: 'dolbic.saved.plan-progress',
};

function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode / quota) — degrade silently.
  }
}

function refKey(ref: ScriptureRef): string {
  return `${ref.bookId}/${ref.chapter}/${ref.verse}/${ref.translation}`;
}

export class LocalSavedRepository implements SavedRepository {
  async listBookmarks() {
    return read<Bookmark[]>(KEYS.bookmarks, []);
  }

  async hasBookmark(ref: ScriptureRef) {
    const items = await this.listBookmarks();
    return items.some((b) => refKey(b.reference) === refKey(ref));
  }

  async addBookmark(ref: ScriptureRef, label?: string) {
    const items = await this.listBookmarks();
    if (items.some((b) => refKey(b.reference) === refKey(ref))) return;
    items.unshift({ id: uid(), reference: ref, label, createdAt: new Date().toISOString() });
    write(KEYS.bookmarks, items);
  }

  async removeBookmark(id: string) {
    const items = await this.listBookmarks();
    write(KEYS.bookmarks, items.filter((b) => b.id !== id));
  }

  async toggleBookmark(ref: ScriptureRef) {
    const items = await this.listBookmarks();
    const existing = items.find((b) => refKey(b.reference) === refKey(ref));
    if (existing) {
      write(KEYS.bookmarks, items.filter((b) => b.id !== existing.id));
      return false;
    }
    items.unshift({ id: uid(), reference: ref, createdAt: new Date().toISOString() });
    write(KEYS.bookmarks, items);
    return true;
  }

  async listHighlights() {
    return read<Highlight[]>(KEYS.highlights, []);
  }

  async highlightsFor(ref: Omit<ScriptureRef, 'verse'> & { verse?: number }) {
    const items = await this.listHighlights();
    const exact = (h: Highlight) =>
      h.reference.bookId === ref.bookId &&
      h.reference.chapter === ref.chapter &&
      h.reference.translation === ref.translation &&
      (ref.verse === undefined || h.reference.verse === ref.verse);
    return items.filter(exact);
  }

  async addHighlight(ref: ScriptureRef, color: Highlight['color'], note?: string) {
    const items = await this.listHighlights();
    items.unshift({ id: uid(), reference: ref, color, note, createdAt: new Date().toISOString() });
    write(KEYS.highlights, items);
  }

  async removeHighlight(id: string) {
    const items = await this.listHighlights();
    write(KEYS.highlights, items.filter((h) => h.id !== id));
  }

  async listPrayers() {
    return read<PrayerEntry[]>(KEYS.prayers, []);
  }

  async addPrayer(text: string) {
    const items = await this.listPrayers();
    const entry: PrayerEntry = { id: uid(), text: text.trim(), createdAt: new Date().toISOString() };
    items.unshift(entry);
    write(KEYS.prayers, items);
    return entry;
  }

  async removePrayer(id: string) {
    const items = await this.listPrayers();
    write(KEYS.prayers, items.filter((p) => p.id !== id));
  }

  async getPlanProgress(planId: string) {
    const all = read<Record<string, PlanProgress>>(KEYS.progress, {});
    return all[planId];
  }

  async savePlanProgress(progress: PlanProgress) {
    const all = read<Record<string, PlanProgress>>(KEYS.progress, {});
    all[progress.planId] = progress;
    write(KEYS.progress, all);
  }

  async resetPlanProgress(planId: string) {
    const all = read<Record<string, PlanProgress>>(KEYS.progress, {});
    delete all[planId];
    write(KEYS.progress, all);
  }
}

export const savedRepository: SavedRepository = new LocalSavedRepository();