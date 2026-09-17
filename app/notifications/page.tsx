'use client';
import { useState } from 'react';
import { loadNotificationPrefs, saveNotificationPrefs, DEFAULT_NOTIF_PREFS, type NotificationPrefs } from '@/lib/data/preferences-repository';
import { Switch } from '@/components/ui/switch';
import { SelectField } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { BellIcon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => loadNotificationPrefs());
  const { toast } = useToast();
  function update(partial: Partial<NotificationPrefs>) { const next = { ...prefs, ...partial }; setPrefs(next); saveNotificationPrefs(next); }
  function saveAll() { saveNotificationPrefs(prefs); toast({ message: 'Reminders saved' }); }
  const enabledCount = [prefs.dailyScripture, prefs.dailyPrayer, prefs.dailyReflection, prefs.readingReminder, prefs.prayerReminder].filter(Boolean).length;
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] antialiased">
      <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-page mx-auto px-5 md:px-8 pt-5 pb-6">
          <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-primary)] mb-1.5">Reminders</p>
          <h1 className="font-sans text-[32px] font-bold leading-[0.95] tracking-[-0.02em] text-[var(--color-text)]">Daily notifications</h1>
          <p className="mt-2 font-sans text-[16px] text-[var(--text-muted)]">Choose what arrives and when. <span className="font-medium text-[var(--color-text)]">{enabledCount} active</span>.</p>
        </div>
      </header>
      <main className="max-w-page mx-auto px-5 md:px-8 pt-6 pb-16">
        <div className="mx-auto max-w-md">
          <section aria-label="Notification types" className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-card">
            <div className="mb-3 flex items-center gap-2"><BellIcon size={18} className="text-[var(--color-primary)]" aria-hidden="true" /><h2 className="font-sans text-[16px] font-semibold text-[var(--color-text)]">What you receive</h2></div>
            <div className="divide-y divide-[var(--border)]">
              <div className="py-3"><Switch checked={prefs.dailyScripture} onChange={(v) => update({ dailyScripture: v })} label="Daily Scripture" description="Today's verse every morning." /></div>
              <div className="py-3"><Switch checked={prefs.dailyReflection} onChange={(v) => update({ dailyReflection: v })} label="Daily reflection" description="A short reflection on the day's reading." /></div>
              <div className="py-3"><Switch checked={prefs.dailyPrayer} onChange={(v) => update({ dailyPrayer: v })} label="Daily prayer prompt" description="A written prayer to carry into the day." /></div>
              <div className="py-3"><Switch checked={prefs.readingReminder} onChange={(v) => update({ readingReminder: v })} label="Reading plan reminder" description="Nudge when today's plan reading is waiting." /></div>
              <div className="py-3"><Switch checked={prefs.prayerReminder} onChange={(v) => update({ prayerReminder: v })} label="Evening prayer reminder" description="A gentle evening call to journal prayers." /></div>
            </div>
          </section>
          <section aria-label="Schedule" className="mt-4 rounded-[8px] border border-[var(--border)] bg-[var(--bg-surface)] p-6 shadow-card">
            <h2 className="font-sans text-[16px] font-semibold text-[var(--color-text)] mb-3">When</h2>
            <div className="grid grid-cols-2 gap-3">
              <SelectField label="Time" id="notif-time" value={prefs.time} onChange={(e) => update({ time: e.target.value })}>{['04:00','05:00','06:00','07:00','08:00'].map((t) => <option key={t} value={t}>{t}</option>)}</SelectField>
              <SelectField label="Timezone" id="notif-tz" value={prefs.timezone} onChange={(e) => update({ timezone: e.target.value })}><option value="Africa/Lagos">Africa/Lagos</option><option value="Africa/Abuja">Africa/Abuja</option><option value="UTC">UTC</option></SelectField>
            </div>
            <p className="mt-3 font-sans text-[12px] text-[var(--text-muted)]">Defaults follow the church: {DEFAULT_NOTIF_PREFS.time} · {DEFAULT_NOTIF_PREFS.timezone}.</p>
          </section>
          <div className="mt-6 flex gap-3">
            <Button onClick={saveAll} className="flex-1 min-h-[44px] rounded-[8px]">Save reminders</Button>
            <Button variant="secondary" onClick={() => { setPrefs({ ...DEFAULT_NOTIF_PREFS }); saveNotificationPrefs({ ...DEFAULT_NOTIF_PREFS }); }} className="rounded-[8px] min-h-[44px]">Reset defaults</Button>
          </div>
          <p className="mt-6 rounded-[8px] bg-[var(--bg-cream)] border border-[var(--border)] px-4 py-3 font-sans text-[12px] leading-[1.6] text-[var(--text-muted)]">Browser push notifications will be enabled in Phase 3 by the church&apos;s Supabase edge function with VAPID keys. Everything selected here will carry over.</p>
        </div>
      </main>
    </div>
  );
}
