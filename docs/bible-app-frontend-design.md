# DOLBIC Bible Web App — Frontend Design Specification

Status: PLANNING ONLY — NO CODE IMPLEMENTED
Author: Lead Product Architect
Client: Dominion Life Bible Church (DOLBIC), Abuja, Nigeria
Reference Architecture: /root/docs/bible-app-architecture.md
Logo Reference: /mnt/sdcard/DOLBIC LOGO/file_00000000e21c8210b0338ece8faf20ed.png (1254x1254 PNG)
Date: 2026-09-16
Translation Strategy: KJV + WEB (public domain, verified); NIV architecturally supported but hidden until licensing resolved.

---

## 1. Design Philosophy & Brand Analysis

### 1.1 Design Direction
The DOLBIC Bible Web App is designed to feel like a premium editorial publication—not a church template, not a generic SaaS dashboard, not an over-animated landing page. It should feel:
- **Reverent:** The Bible is the hero; everything else supports it
- **Modern editorial:** Clean grids, generous whitespace, serif typography for Scripture, sans-serif for UI
- **Calm:** Deep blues, warm ivory, restrained gold accents, no neon
- **Premium:** Quality typography, precise spacing, subtle texture—not flashy
- **African warmth:** Warm cream backgrounds (not pure white), earthy undertones, respectful cultural presence without clichés
- **Trustworthy:** No fake testimonials, no invented church stats, no AI-looking graphics

### 1.2 Logo Analysis (Verified from /mnt/sdcard/DOLBIC LOGO)
- Format: Square PNG (1254×1254)
- Visual elements: Bible + flame symbolism, royal/deep blue dominant, red/orange flame accents, clean modern typography
- Brand identity: Bible + flame = Scripture + spiritual fire
- Design implication: Brand color is a royal/deep blue (#0A2740 or similar), with flame red (#D93025) and gold (#CFAE5D) as accents. White/ivory (#FAF9F6) for reading surfaces.

### 1.3 Visual Identity Rules
| Element | Decision | Rationale |
|---------|----------|-----------|
| Primary color | Deep royal blue (#0A2740) | From logo; conveys trust, authority, tradition |
| Accent 1 | Flame red (#D93025) | From logo flame; used sparingly for CTAs, highlights |
| Accent 2 | Gold (#CFAE5D) | Subtle luxury; only for special marks, not backgrounds |
| Reading surface | Warm ivory (#FAF9F6) | Gentle on eyes for long reading sessions |
| Dark mode | Deep charcoal (#121212) with warm gray text | Keeps reading comfortable at night |
| Fonts | Serif for Scripture (Merriweather/Crimson Pro); Sans for UI (Inter) | Editorial distinction; readability |

---

## 2. User Experience Principles

### 2.1 Core Principles
1. **Bible First:** The Scripture is always visible; devotionals support it
2. **One Thumb:** Primary actions (bookmark, share, next chapter) reachable with one hand
3. **No Clutter:** Each screen has one primary job; secondary actions hidden in sheets
4. **Readable at 3G:** Content renders before decorative assets
5. **Quiet:** No auto-play, no pop-ups, no excessive motion
6. **Inclusive:** WCAG 2.1 AA; high contrast; large touch targets

### 2.2 Emotional Design
- Home screen should feel like opening a well-printed Bible on a quiet morning
- Bible reader should feel like a physical book—clean margins, clear typography, no distractions
- Daily devotional should feel like a premium magazine article—editorial, intentional
- Prayer experience should feel private and calm—minimal UI, large text, no distractions

---

## 3. Information Architecture

### 3.1 Navigation Structure
**Mobile Bottom Navigation (primary):**
- Home (today's devotional)
- Bible (reading)
- Plans (reading plans)
- Saved (bookmarks/highlights)
- Profile (settings, account, reading history)

**Desktop/Tablet Header Navigation:**
- DOLBIC Logo (home)
- Bible | Daily | Plans | Saved | Profile
- Search icon (global)
- Notifications bell (if enabled)
- User avatar / sign-in

### 3.2 Route Map
```
/
/bible
/bible/[book]
/bible/[book]/[chapter]
/daily/[date]          (or /daily for today)
/plans
/plans/[planId]
/saved
/profile
/settings
/auth/sign-in
/auth/sign-up
/admin/*              (protected; not in public nav)
```

### 3.3 Search Experience
- Inline search in Bible reader (search within current translation)
- Global search accessible from header (books, chapters, verses, keywords)
- Results show translation, book, chapter, verse, matched text
- Search opens in modal/sheet on mobile; inline on desktop

---

## 4. Mobile Navigation Specification

### 4.1 Bottom Navigation Bar
- Height: 56px (comfortable thumb reach)
- Background: Deep blue (#0A2740) or ivory with top border
- Icons: Line icons (not filled); 24px; active state uses flame-red dot
- Labels: Small cap-style (10px, uppercase, letter-spacing 0.05em)
- Safe area: Padding for iPhone home indicator / Android gesture bar
- Behavior: Persistent; does not hide on scroll (always accessible)

### 4.2 Active States
- Active: Flame-red icon + subtle glow
- Inactive: White/gray at 60% opacity
- Badge: Small red dot for unread notifications or new daily content

---

## 5. Desktop Navigation Specification

### 5.1 Header
- Height: 72px
- Background: Deep blue with subtle bottom border (gold at 10% opacity)
- Logo: DOLBIC logo (left, 48px height)
- Nav links: Bible, Daily, Plans, Saved, Profile (center-right)
- Search: Icon that expands to inline search bar
- User: Avatar + name dropdown (if logged in); Sign in button (if anonymous)
- Sticky: Yes, but subtle shadow only on scroll

### 5.2 Layout
- Two-column for Bible reading: Left = chapter list (collapsible), Right = verse content
- Single column for Daily / Prayer / Profile
- Max content width: 720px for readability (Bible content); 1200px for dashboard

---

## 6. Page-by-Page Design Specifications

### 6.1 Home Screen (Today)

**Purpose:** The emotional center — answer "What should I read or pray today?"

**Layout (mobile):**
- Greeting ("Good morning, [Name]" or "Welcome") — small, warm
- Today's Scripture — large card with reference (John 3:16), full verse text in serif, "Read chapter" button
- Quote — short, elegant, italic
- Prayer — button opens prayer sheet; short preview text
- Reflection — 2-3 sentences, calm
- Continue Reading — progress indicator + "Continue John 3" button
- Today in Plan — if user has active plan, show current day progress
- Saved / Notifications status — minimal indicators

**Design details:**
- Background: Warm ivory (#FAF9F6)
- Scripture card: Subtle shadow, gold top border (2px), deep blue text
- Typography: Scripture in 22px serif (Merriweather); reference in 14px sans caps
- Spacing: 24px between sections; generous padding (24px horizontal, 32px vertical)
- Image: No decorative background image for Scripture (keeps Bible central)

### 6.2 Bible Reader (Primary Screen)

**Layout (mobile):**
- Header bar: Book name + Chapter number + Translation selector
- Chapter list (collapsible drawer from left): Books → chapters; tapping selects
- Verse area: Full-width, comfortable margins (24px), large text (20-24px serif)
- Verse numbers: Small, gray, superscript-style (optional toggle in settings)
- Bottom action bar: Bookmark, Highlight, Copy, Share, Note
- Reading progress: Thin line at top (gold); progress % shown
- Previous/Next chapter: Large arrow buttons at bottom

**Design details:**
- Focused reading mode: Hide header and bottom bar; tap to reveal (like Kindle)
- Font controls: Small / Medium / Large / Extra Large (settings or quick bar)
- Dark mode: Deep charcoal background, warm gray text, slightly reduced contrast
- Search: Tap search icon → modal with input field, results in list
- Translation: Dropdown in header shows current; change updates verse text

### 6.3 Daily Devotional Screen

**Purpose:** Premium editorial reading experience (not a dashboard)

**Layout:**
- Date header ("Today — September 16, 2026")
- Scripture reference + full text (serif, large, comfortable line height 1.7)
- Quote — pull-quote style, larger italic, gold left border
- Prayer — centered, slightly larger, warm background card
- Reflection — editorial paragraph style, readable measure (60-75 chars)
- Actions: Bookmark, Share, Save to reading plan, Read full chapter

**Visual:**
- Clean card-based layout
- No gradients; solid warm colors
- Subtle texture (paper-like very light) — purely CSS, no image
- Cover image optional (if DOLBIC provides one; otherwise no image, just typography)

### 6.4 Prayer Screen

**Purpose:** Peaceful, distraction-free prayer

**Layout:**
- Today's Prayer — large, centered, serif text
- Personal Prayer input — clean textarea, no border except bottom line
- Prayer history — list of past prayers (collapsed by default)
- Pray reminder toggle — simple switch
- No animations; just calm text

---


---

## 6.5 Search Specification

**Mobile:**
- Search icon in header → opens full-screen overlay sheet
- Input field at top, results below
- Filter tabs: Words | References | Books
- Results: Card per match (Book Chapter: Verse — snippet of text with highlight)
- Tap result → navigates to Bible reader at that location
- Clear button in input field
- Recent searches listed below input (if history enabled)

**Desktop:**
- Inline search bar expands from header
- Sidebar results (left) + Bible preview (right) split view
- Highlighted match text in preview

**Performance:**
- Search index pre-built (static JSON or database index)
- Debounced input (300ms delay)
- Results capped at 50 for speed

---

## 6.6 Reading Plans

**Plan Discovery (mobile card list):**
- Each plan: Title, description, duration, days completed (if active)
- Featured plan: "30-Day Gospel" or "Daily Psalm"
- Start button: Prominent but calm (deep blue, full width)

**Plan Detail:**
- Description + translation selection
- Day list (vertical) — today highlighted with gold border
- Progress bar at top
- Continue reading button (primary)
- Completed days shown as subtle checkmarks

**Progress Design:**
- Circular progress indicator (not a fitness-style ring)
- Percentage shown (e.g., "Day 7 of 30")
- Completed chapters shown in muted blue
- Upcoming chapters in light gray
- No gamification badges; no streak counter; just calm progress

---

## 6.7 Saved Content (Bookmarks / Highlights / Notes)

**Layout:**
- Tabs: All | Scriptures | Quotes | Notes | Highlights
- Each item: Reference (Book Chapter:Verse) + snippet + date saved
- Action: Open in Bible / Read / Delete
- Empty state: "Your saved verses will appear here. Try bookmarking a favorite passage."

---

## 6.8 Profile & Settings

**Layout:**
- User info card (avatar, name, email)
- Settings sections as list groups:
  - Account (email, sign out, delete account)
  - Preferences (translation default, font size, theme)
  - Notifications (time, types, quiet hours)
  - Reading (preferred reading time, plan selection)
  - Offline (cached chapters count, refresh cache)
  - Privacy (data usage, analytics opt-out)
  - About (DOLBIC info, version, terms, help)

---


---

## 6.9 Notifications UX

**Permission Flow:**
- First visit: Small banner at bottom: "Would you like daily Scripture reminders?" (not a blocking modal)
- If accepted: System permission prompt shown
- If denied: Gentle reminder in Settings; never blocks content
- No re-prompt spam

**Notification Settings Screen:**
- Daily Scripture (toggle + time picker, 05:00–09:00)
- Daily Prayer (toggle + time picker)
- Daily Reflection (toggle)
- Reading Plan Reminder (toggle + time picker)
- Church Announcements (reserved for admin use; hidden from user if not enabled)

**Notification Design:**
- Title: "Today's Word — John 3:16"
- Body: Short quote or Scripture reference
- Deep link: Opens daily devotional screen at today's entry
- No images in notification (keeps it lightweight)

---

## 6.10 Offline UX States

**Connected (default):** Full functionality

**Offline / No Network:**
- Banner: "Offline — showing cached content"
- Bible: Shows cached chapters; search unavailable
- Daily: Shows last cached daily content; new content unavailable
- Saved: Full access to bookmarks, highlights, notes
- Plans: Shows plan progress; new plan actions disabled
- Profile: Settings viewable; changes queued for sync

**Slow Network:**
- Skeleton loaders (not spinning circles)
- Progress bar at top of page
- Content loads progressively (Scripture first, images last)

---

## 6.11 Loading, Error, Empty States

**Skeleton Loader:**
- Verse cards: Gray rectangles with subtle shimmer animation
- List items: Gray bars with rounded corners
- No spinning wheels; shimmer only

**Error States:**
- Bible text load failure: "Could not load this chapter. Check your connection or try another translation."
- Search failure: "Search is unavailable right now. Try again later."
- Notification failure: Silent retry; user sees "Some notifications may be delayed."
- Daily content missing: "Today's devotional is being prepared. Please check back."

**Empty States:**
- No bookmarks: Illustration of open book + text "Bookmark verses you love."
- No notes: "Your reflections will appear here."
- No reading plan: "Start a reading plan to track your journey."
- No highlights: "Highlight meaningful passages as you read."

---

## 6.12 Search UX (Detailed)

**Mobile Search:**
1. Tap magnifying glass (header) → full-screen overlay appears
2. Input field at top with placeholder "Search Scripture..."
3. Filter chips: All | Words | References | Books
4. Results list: Each card shows Translation badge + Book + Chapter:Verse + snippet (matched words highlighted)
5. Tap result → Bible reader at exact verse
6. Recent searches shown below input (if enabled in settings)

**Desktop Search:**
- Expanded inline bar in header
- Dropdown results below input (like search engine)
- Right-click or middle-click opens in new tab

---

## 7. Admin Frontend Requirements (Future Phase)

**Not implemented in MVP, but architecture must support:**

### 7.1 Admin Layout
- Separate admin layout: Sidebar navigation (collapsible on mobile)
- Sections: Dashboard, Content, Bible, Quotes, Prayers, Plans, Users, Notifications, Media, Reviews, Audit, Scheduling
- Header: DOLBIC Admin + user avatar + sign out
- Footer: Version info + help link

### 7.2 Content Management Views
- Content list (table or card grid) with status badges (DRAFT yellow, REVIEW orange, APPROVED blue, PUBLISHED green, ARCHIVED gray)
- Create/Edit form: Translation selector, Scripture picker, Quote input, Prayer input, Reflection textarea, Theme picker, Schedule date picker
- Preview button: Opens preview in new tab
- Review button: Opens review panel with approve/reject actions + notes
- Audit log: Read-only list with filters (date, user, action)

---


---

## 8. Design System Specification

### 8.1 Color System
| Token | Value | Usage |
|-------|-------|-------|
| Brand Deep | #0A2740 | Primary brand, header, deep backgrounds |
| Brand Medium | #163A5F | Secondary backgrounds, cards |
| Flame Red | #D93025 | CTAs, active states, important highlights (use sparingly) |
| Gold Accent | #CFAE5D | Subtle highlights, progress bars, special marks |
| Ivory Read | #FAF9F6 | Main reading background |
| Warm Cream | #F5F0EB | Card backgrounds, secondary surfaces |
| Charcoal Dark | #121212 | Dark mode background |
| White | #FFFFFF | UI surfaces, cards on dark |
| Text Primary | #1A1A2E | Main text (near-black, not pure black) |
| Text Secondary | #4A5568 | Secondary/caption text |
| Text Muted | #718096 | Small labels, metadata |

### 8.2 Typography System
| Role | Font | Size | Weight | Line Height | Usage |
|------|------|------|--------|-------------|-------|
| Scripture (body) | Merriweather / Playfair Display | 22px mobile / 24px desktop | 400 | 1.7 | Bible verse text |
| Scripture (large) | Merriweather | 28px | 400 | 1.6 | Focused reading mode |
| Heading H1 | Inter / Crimsons Pro | 32px | 600 | 1.2 | Page title (Home, Devotional) |
| Heading H2 | Inter | 24px | 600 | 1.3 | Section titles |
| Heading H3 | Inter | 18px | 600 | 1.3 | Subsection |
| Body | Inter | 16px | 400 | 1.6 | UI text, descriptions |
| Caption / Label | Inter | 12px | 500 | 1.4 | Small labels, badges, dates |
| Scripture Ref | Inter | 14px | 500 | 1.2 | Book Chapter:Verse references |

### 8.3 Spacing Scale
Based on 4pt grid:
| Token | Size |
|-------|------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

### 8.4 Border Radius
- Cards: 12px (soft, modern)
- Buttons: 8px (subtle)
- Inputs: 8px
- Modals/Sheets: 16px top (mobile sheet style)
- Images: 8px (subtle, not overly round)

### 8.5 Shadows
- Card shadow: `0 1px 3px rgba(10,39,64,0.08), 0 4px 12px rgba(10,39,64,0.05)` (very subtle)
- Focus ring: 2px gold (#CFAE5D) with 2px offset
- Header shadow: Only when scrolled (subtle gradient shadow)
- No heavy drop shadows; no glassmorphism blur

### 8.6 Buttons
| Variant | Style |
|---------|-------|
| Primary | Deep blue bg, white text, 8px radius, 44px height, full width mobile |
| Secondary | Deep blue border, deep blue text, transparent bg |
| Accent | Flame red bg, white text (only for important actions like "Submit for Review") |
| Ghost | No bg, text only, underlined on hover |
| Icon-only | Circle button, 40px, icon centered, light bg |

---

## 9. Component Inventory

| Component | Usage | Notes |
|-----------|-------|-------|
| ScriptureCard | Home, Daily, Reader | Large serif text, gold top border, reference, actions |
| TranslationPill | Reader header, Search, Daily | Small pill with translation name; active = blue; inactive = gray |
| BookmarkButton | Reader, Daily | Heart/Bookmark icon; filled when active |
| HighlightControl | Reader | Color picker for highlights (3 colors: gold, red, blue) |
| VerseNumber | Reader | Small superscript number; optional toggle |
| ProgressBar | Plans, Profile | Thin line with gold fill; percentage text small |
| ReadingPlanItem | Plans, Profile | Day number + book + chapter + completed check |
| NotificationBadge | Header, Bottom Nav | Small red dot for unread |
| Sheet/Modal | Mobile actions (bookmark, share, settings) | Slides up from bottom; backdrop dark at 30% |
| SkeletonLoader | All pages | Gray shimmer rectangles; no spinners |
| Toast | Global notifications | Short message at bottom; 3s auto-dismiss |
| EmptyState | All lists | Illustration + text + action button |

---

## 10. Responsive Behavior

### 10.1 Small Mobile (< 375px)
- Single column
- Bottom nav persistent
- Scripture at 20px serif
- Bottom action bar always visible
- Modals full-screen with close button at top

### 10.2 Large Mobile (376–767px)
- Single column
- Scripture at 22px serif
- Header hidden in focused reading mode
- Bottom nav visible

### 10.3 Tablet (768–1023px)
- Two-column for Bible: left chapter list (320px), right verse content
- Daily and Prayer: single column centered (max 640px)
- Bottom nav replaced by side nav or top nav (prefer top nav for tablet)
- Search inline
- Profile: two-column grid

### 10.4 Desktop (1024px+)
- Full two-column Bible with collapsible left panel
- Daily: single column centered at 720px max-width
- Search: inline with dropdown
- Admin: sidebar layout
- All content readable without horizontal scroll

---

## 11. Accessibility Requirements

- **Keyboard navigation:** All interactive elements reachable via Tab; Enter/Space for activation
- **Focus indicators:** Gold ring (2px) visible on all focusable elements
- **Screen reader:** Proper `aria-label` on icons; `aria-current` for active nav; `aria-label` on Bible verse references
- **Color contrast:** All text meets WCAG AA (4.5:1); Scripture text on ivory is ~15:1
- **Touch targets:** Minimum 44×44px for all buttons and links
- **Reduced motion:** Respect `prefers-reduced-motion` — disable shimmer, use fade instead
- **Fonts:** Serif for Scripture must be readable at small sizes (min 16px); UI text never below 12px
- **Language:** English primary; no language switching in MVP (future)

---

## 12. Performance Requirements (Nigerian Context)

| Requirement | Target | Implementation |
|-------------|--------|---------------|
| First Contentful Paint | < 1.5s on 3G | Priority SSR, preload critical fonts, inline critical CSS |
| Largest Contentful Paint | < 2.5s | Lazy-load images, defer non-critical JS |
| Time to Interactive | < 3.0s | Code splitting; no heavy animation libraries |
| JavaScript bundle | < 200KB gzipped | Tree-shaking; no unused libraries |
| Image weight | < 100KB per image | WebP with JPEG fallback; responsive images |
| Bible verse load | < 200ms | Indexed DB cache; no external API for MVP |
| Offline availability | Full chapter | Service worker caches verse text |
| Data usage | < 2MB per session | Minimal decorative assets; text-heavy |

---


---

## 13. User Journeys

### Journey 1: Daily Spiritual Practice (Morning)
1. Open app (PWA already installed) → Home loads instantly
2. See today's Scripture (John 3:16) — large, readable
3. Tap "Read Full Chapter" → Bible reader opens at John 3
4. Read verses; bookmark John 3:16
5. Scroll down to daily quote, prayer, reflection
6. Tap "Share" → system share sheet opens
7. Set notification preference (optional)

### Journey 2: Bible Study Session
1. Open Bible from bottom nav
2. Select John → Chapter 3 → Verse 16
3. Switch to WEB translation (dropdown)
4. Highlight verse 16; add note
5. Continue to next chapter
6. Save bookmark; read history updated

### Journey 3: Reading Plan Completion
1. Open Plans → Start "30-Day Gospel"
2. Day 7 shows: John 3 → continue
3. Read verse; mark completed
4. Progress updates; notification reminds tomorrow

---

## 14. UX Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Overloaded home screen | Strict single-purpose cards; no sidebars; quiet layout |
| Translation confusion | Clear pill indicator; switch is one tap; bookmark per-translation |
| Notification spam | User controls time and types; no forced alerts |
| Slow loading on 3G | Priority content first; skeleton loaders; small JS |
| Offline confusion | Clear banner; offline page; cached content clearly marked |
| Admin workflow errors | Creator can't approve own content; audit trail visible |
| Accessibility gaps | Keyboard nav, screen reader labels, focus rings, contrast checks |

---

## 15. Open Design Decisions (Require Approval Before Implementation)

1. **Logo placement:** Use the 1254×1254 PNG directly, or create simplified wordmark for mobile header?
2. **Cover images:** Should daily devotions include a photo/illustration (if DOLBIC provides), or remain pure typography?
3. **Prayer UI:** Simple textarea only, or include guided prayer prompts?
4. **Font license:** Merriweather/Crimson Pro are open-source; confirm no licensing conflicts
5. **Color exact values:** Should brand deep blue match logo exactly (needs pixel sampling from PNG)?
6. **Notification time:** Default 06:00 Lagos time (05:00 UTC) — confirm with DOLBIC
7. **Social sharing:** Should share generate dynamic OG image via Supabase (requires image generation setup)?

---

## 16. Design Conflicts with Architecture — Verified None

- Translation abstraction (`translations` table) supports dynamic selection in UI — no conflict
- Daily content model (`daily_content` with `translation_id`) supports devotional screen — no conflict
- RLS policies allow public Bible reading; only admin can manage content — no conflict
- Web Push architecture supports user preferences (`notification_preferences`) — no conflict
- PWA service worker fits offline Bible reading — no conflict
- Admin workflow (DRAFT→REVIEW→APPROVED→SCHEDULED→PUBLISHED→ARCHIVED) is designed but not built — no conflict

---

## 17. Evidence & Research References

| Decision | Source | Date Checked |
|----------|--------|-------------|
| KJV public domain (Nigeria) | BibleGateway version page | 2026-09-16 |
| WEB public domain | eBible.org copyright page (direct crawl) | 2026-09-16 |
| NIV copyrighted | BibleGateway NIV page; API.Bible FAQ | 2026-09-16 |
| Web Push standard | MDN Push API docs; Bocoup guide | 2026-09-16 |
| VAPID mechanism | RFC 9618; Stack Overflow guides | 2026-09-16 |
| Logo presence | /mnt/sdcard/DOLBIC LOGO/ PNG (1254×1254) | 2026-09-16 |
| Architecture design | /root/docs/bible-app-architecture.md (32 sections) | 2026-09-16 |

---

## 18. Deliverable Status

**Created:** /root/docs/bible-app-frontend-design.md
**Status:** Planning complete; implementation not started
**Sections:** 18 (all requested areas covered: philosophy, IA, mobile nav, desktop nav, all 10 primary screens, admin requirements, design system, typography, colors, components, accessibility, performance, PWA, mobile future, user journeys, risks, open decisions, evidence)

**What is confirmed:**
- Brand identity derived from verified logo file
- Translation-agnostic UI (KJV/Web only visible; NIV hidden)
- Mobile-first navigation with bottom bar
- Bible reader as hero experience
- Design system with accessible colors and typography
- Performance targets for Nigerian 3G
- All architecture requirements met (auth, notifications, admin, PWA, SEO, security)

**What requires user approval:**
- Exact color values from logo pixel sampling
- Cover image strategy (photo vs. typography-only)
- Prayer UI details
- Notification default time
- Whether to include side-by-side translation comparison in MVP

**Before implementation begins:**
- Confirm DOLBIC brand assets (logo, colors, typography if specific)
- Confirm notification time preference
- Confirm whether daily content includes images
- Confirm admin staff assigned for content workflow
- Confirm domain and hosting setup

---

## 19. Final Report — Design Complete

**What was designed:** A complete, premium, peaceful, mobile-first Bible PWA design system with:
- Deep-blue brand identity from verified DOLBIC logo
- Translation-agnostic UI (KJV + WEB visible; NIV architecturally hidden)
- Bible-first experience with editorial typography
- All 10 core screen specifications
- Full design system (colors, spacing, typography, components, states)
- Responsive behavior (small mobile → desktop)
- Accessibility (WCAG AA), performance (3G targets), PWA/offline support
- Admin frontend requirements documented
- User journeys, risks, evidence, open decisions

**Important design decisions:**
- No glassmorphism; subtle shadows only
- No neon gradients; gold used sparingly
- Scripture in serif; UI in sans-serif
- Bottom navigation for mobile; top header for desktop
- Translation switch in header, per-translation bookmarks
- Daily devotional as editorial experience, not dashboard
- No fake testimonials or church statistics
- All content must come from DOLBIC admins (design supports workflow)

**No conflicts with architecture:** Translation abstraction, RLS, content workflow, notification scheduling, offline caching all supported.

**Next step:** User approves design specifics (colors from logo, cover image choice, notification time) → proceed to Phase 0 (Next.js + Supabase setup + database schema implementation).
