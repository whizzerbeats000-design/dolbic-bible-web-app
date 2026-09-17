# DOLBIC Bible App — Master Implementation TODO

## Phase 0 — Foundation [MOSTLY DONE]
- [x] Inspect repo (Next.js 14.2.3, Tailwind 3.4.1, TypeScript 5, React 18)
- [x] Design tokens (lib/design/tokens.ts)
- [x] Global CSS theme (DOLBIC colors: deep blue, flame, gold, ivory)
- [x] Typography (Merriweather + Inter)
- [x] Bottom navigation component
- [x] Design primitives (Button, Card, Badge)
- [x] Loading and error components
- [x] PWA manifest
- [x] App layout with shell
- [x] Home page with Scripture card (KJV/Web translation badges)
- [x] Build passes (pre-existing three.js error only)
- [x] Accessibility primitives (focus-visible gold ring, reduced motion, aria-labels)
- [x] Translation-agnostic structure (no hard-coded translations)

## Phase 1 — Bible Experience [IN PROGRESS]
- [x] Bible page with translation selector
- [x] Book page (chapter grid)
- [x] Chapter page (fixture verses marked development-only)
- [ ] Real Bible reader with focus mode (to be enhanced)
- [ ] Verse selection / bookmark / highlight / copy / share (UI structures present; needs data integration)
- [ ] Bible search component
- [ ] Reading progress
- [ ] Dark mode support (CSS prefers-color-scheme set)
- [ ] Font-size controls (designed in docs; UI structure needed)

## Phase 2 — Daily Spiritual Experience [IN PROGRESS]
- [x] Daily devotional page (Scripture + Quote + Prayer + Reflection)
- [x] Prayer page (centered writing experience)
- [x] Reading plans discovery
- [x] Saved content page
- [ ] Notification preferences UI
- [ ] Daily content scheduling integration

## Phase 3 — Auth & PWA [IN PROGRESS]
- [x] Profile/settings page (translation preference, notification time 06:00 Lagos)
- [x] Auth sign-in page
- [x] Notification preferences page
- [x] PWA manifest and design
- [ ] Web Push subscription flow (requires Supabase + VAPID keys)
- [ ] Service worker with cache strategy
- [ ] Offline Bible experience (service worker design; needs real data)

## Phase 4 — Admin [IN PROGRESS]
- [x] Admin dashboard scaffold (DRAFT/REVIEW/APPROVED/SCHEDULED/PUBLISHED/ARCHIVED reminder)
- [ ] Full content creation UI
- [ ] Review queue UI
- [ ] Scheduling calendar
- [ ] Publishing controls
- [ ] Audit log view

## Phase 5 — Hardening [PENDING]
- [ ] Security audit (RLS requires Supabase init; CSP needs meta tags)
- [ ] Dependency vulnerability scan
- [ ] Performance audit (3G targets)
- [ ] Accessibility audit (axe-core integration needed)
- [ ] PWA compliance verification (service worker needs production keys)
- [ ] E2E tests
- [ ] Final release report
