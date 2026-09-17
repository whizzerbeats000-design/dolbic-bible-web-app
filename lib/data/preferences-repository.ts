// User preferences & reader settings (client persistence).
// Defaults follow the product spec: 06:00 · Africa/Lagos.

import { DEFAULT_NOTIFICATION_TIME, DEFAULT_TIMEZONE } from '@/lib/notifications/subscription';
import type { TranslationSlug } from '@/lib/fixtures/books';

export type ReaderTheme = 'system' | 'light' | 'dark';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ReaderSettings {
  fontSize: FontSize;
  theme: ReaderTheme;
  showVerseNumbers: boolean;
  translation: TranslationSlug;
}

export interface NotificationPrefs {
  dailyScripture: boolean;
  dailyPrayer: boolean;
  dailyReflection: boolean;
  readingReminder: boolean;
  prayerReminder: boolean;
  time: string;
  timezone: string;
}

export interface ProfilePrefs {
  displayName?: string;
  preferredTranslation: TranslationSlug;
  offlineChapters: number;
}

const KEYS = {
  reader: 'dolbic.prefs.reader',
  notifications: 'dolbic.prefs.notifications',
  profile: 'dolbic.prefs.profile',
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...fallback, ...(JSON.parse(raw) as T) } : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const DEFAULT_READER: ReaderSettings = {
  fontSize: 'md',
  theme: 'system',
  showVerseNumbers: true,
  translation: 'kjv',
};

export const DEFAULT_NOTIF_PREFS: NotificationPrefs = {
  dailyScripture: true,
  dailyPrayer: false,
  dailyReflection: true,
  readingReminder: true,
  prayerReminder: false,
  time: DEFAULT_NOTIFICATION_TIME,
  timezone: DEFAULT_TIMEZONE,
};

export const DEFAULT_PROFILE: ProfilePrefs = {
  preferredTranslation: 'kjv',
  offlineChapters: 24,
};

export function loadReaderSettings(): ReaderSettings {
  return read(KEYS.reader, DEFAULT_READER);
}

export function saveReaderSettings(settings: ReaderSettings): void {
  write(KEYS.reader, settings);
}

export function loadNotificationPrefs(): NotificationPrefs {
  return read(KEYS.notifications, DEFAULT_NOTIF_PREFS);
}

export function saveNotificationPrefs(prefs: NotificationPrefs): void {
  write(KEYS.notifications, prefs);
}

export function loadProfilePrefs(): ProfilePrefs {
  return read(KEYS.profile, DEFAULT_PROFILE);
}

export function saveProfilePrefs(prefs: ProfilePrefs): void {
  write(KEYS.profile, prefs);
}

export const FONT_SIZES: { id: FontSize; label: string; px: string }[] = [
  { id: 'sm', label: 'S', px: '16px' },
  { id: 'md', label: 'M', px: '19px' },
  { id: 'lg', label: 'L', px: '22px' },
  { id: 'xl', label: 'XL', px: '26px' },
];