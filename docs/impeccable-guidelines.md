# Impeccable Design System — Implementation Guidelines

> **Design intent in one sentence:** Impeccable is a warm, confident editorial-poster system that creates rhythm through alternating cream and burnt-orange sections punctuated by a sharp amber accent.

## 1. Context and goals

Impeccable serves dense, content-forward products that need editorial hierarchy without losing product clarity. It pairs high-contrast type and color blocks with strict spacing rhythm so scan-ability wins on first paint.

**Goals:**
- Make hierarchy obvious in <3s: title > action > meta.
- Reuse 6 tokens everywhere; no one-off hex values.
- Ship WCAG 2.2 AA by default, not as an audit fix.
- Keep interaction states explicit so keyboard, pointer, and touch users share the same understanding.

**Non-goals:** decorative gradients, low-contrast pastels, ambiguous icon-only controls.

## 2. Design tokens and foundations

Follow foundations first. No component rule may override a token.

### 2.1 Color — semantic tokens only

| Token | Raw | Usage | Contrast note |
|-------|-----|-------|---------------|
| `--color-primary` | `#CC8800` amber | Primary action, focus ring, active indicator | Must pair with `#FFFFFF` (contrast 4.63:1) or `#111827` text on amber requires 16px bold+ or use amber only for non-body UI |
| `--color-secondary` | `#C55221` burnt orange | Alternating section bg, secondary emphasis | Never for body text on white — use for large blocks with white text (white on #C55221 = 4.58:1) |
| `--color-surface` | `#FFFFFF` | Card/section surface, page base | — |
| `--color-text` | `#111827` | Primary text | 16.9:1 on white |
| `--color-text-muted` | `rgba(17,24,39,0.65)` | Secondary/meta text | Must be ≥14px medium or 16px regular to pass AA on white |
| `--color-border` | `rgba(17,24,39,0.12)` | Dividers, card borders | 3:1 not required; visual only |
| `--color-success` | `#16A34A` | Success states | White text only |
| `--color-warning` | `#D97706` | Warning states | White text only |
| `--color-danger` | `#DC2626` | Destructive actions, errors | White text only |

**Rules:**
- Must use tokens above; raw hex outside this table is prohibited.
- Cream sections must be `#FFF7ED` (derived `secondary/08`) or `surface`; do not introduce new creams.
- Burnt-orange sections must be `secondary` with white text. Do not place `text` (#111827) on `secondary`.
- Amber (`primary`) must never be used as a large background for body copy — it is action/accent only.

### 2.2 Typography

Scale: `12 / 14 / 16 / 20 / 24 / 32` (1:1.2–1.33). Fonts: `Chakra Petch` for all UI/display, `JetBrains Mono` for caps/labels only.

| Role | Font | Size | Weight | Tracking | Usage |
|------|------|------|--------|----------|-------|
| `display` | Chakra Petch | 32 | 700 | -0.02em | Page title, poster headline |
| `h2` | Chakra Petch | 24 | 600 | -0.01em | Section title |
| `h3` | Chakra Petch | 20 | 600 | -0.01em | Card title |
| `body-md` | Chakra Petch | 16 | 400 | 0 | Body copy |
| `body-sm` | Chakra Petch | 14 | 400 | 0 | Descriptions, meta |
| `label` | Chakra Petch | 14 | 600 | 0 | Field labels, button text |
| `label-caps` | JetBrains Mono | 12 | 500 | 0.14em | Eyebrow, caps meta |

**Rules:**
- Must keep hierarchy: no page may have body text larger than its section heading.
- Eyebrow must always be `label-caps` + `primary` or `secondary`; never use `body-sm` for eyebrows.
- Weights allowed: 400/500/600/700 only. 100/200/300/800/900 are in font file but must not be used except display 700.

### 2.3 Spacing and radius

Scale: `4 / 8 / 12 / 16 / 24 / 32`. No 6, 10, 18, 20.

- `xs=4`, `sm=8`, `md=12`, `lg=16`, `xl=24`, `2xl=32`
- Stack rhythm: `12` between label→control, `16` between controls, `24` between sections, `32` between page blocks.
- Radius: `sm=4px` (badges, inputs), `md=8px` (cards, buttons). No pill buttons except nav tabs — those are `999px` by exception.
- Section alternation: `surface` → `cream (#FFF7ED)` → `secondary` → `surface`. Must alternate; never place two `secondary` sections adjacent.

## 3. Component-level rules

### 3.1 Button

**Anatomy:** label (Chakra Petch 14/600) + optional 16px leading icon + 8px gap. Min-height 44px. Padding 12px 16px. Radius md 8px.

**Variants:**
- `primary`: bg `primary`, text `#111827` (or white if contrast audit demands — test 4.5:1), border transparent. Use for 1 primary action per view.
- `secondary`: bg transparent, border `border`, text `text`, hover bg `rgba(17,24,39,0.04)`.
- `ghost`: no border, text `text-muted`, hover text `text`.
- `danger`: bg `danger`, text white.

**States (all variants must implement):**
- `default`: as above.
- `hover`: primary darken 6% (`#B87A00`), secondary bg muted. Transition 150ms.
- `focus-visible`: 2px solid `primary` ring, 2px offset, radius preserved. Must be visible on both light and dark sections.
- `active`: translateY 0.5px, brightness 0.98.
- `disabled`: opacity 0.45, pointer-events none, no hover.
- `loading`: disabled + spinner 16px, label stays, `aria-busy="true"`.
- `error` (form submit): adjacent `aria-live` message, button not in error style — error lives in field, not button.

**Interaction:** Enter/Space activates. Touch target must be ≥44px. Must support `fullWidth` prop for mobile forms.

**Responsive / edge:** Long labels truncate, never wrap to 2 lines. Max 2 buttons per row on <640px; stack vertically with 12px gap otherwise.

**Don't:** amber button with white text at 12px (fails contrast) — use 14px medium + `#111827` text on amber instead.

### 3.2 Card and Alternating Section

**Anatomy:** surface `surface`, border `border`, radius md, padding `xl` (24px). Header: eyebrow (`label-caps` 12, `primary`) + title (`h3` 20/600) + 8px gap. Body: `body-sm` 14.

**Elevation:** `shadow-sm` (`0 1px 2px rgba(0,0,0,0.06)`). Never use large blur shadows. Hover on interactive cards: `border` → `primary/30` + `shadow-md` (150ms).

**Alternating Section Container:** full-bleed section with `py-32` (32px) on mobile, `py-48` on desktop. Cream (`#FFF7ED`) or `secondary` (burnt orange, white text). Must set `color` explicitly when bg is `secondary`.

**Responsive:** Card grid: 1 col <640, 2 col 640–1024, 3 col ≥1024, gap `lg` (16px). Cards must be equal height per row (`flex flex-col h-full`).

**Empty state:** inside card, center icon 24px `text-muted`, title `h3`, body `body-sm` + `text-muted`, single primary action.

### 3.3 Field / Input / Select

**Anatomy:** label (`label` 14/600 `text`) 8px above control. Control: height 44px, padding 12px, border `border`, radius sm 4px, bg `surface`, text 16/400. Hint below: `body-sm` 12 `text-muted` 8px gap.

**States:**
- `default`: border `border`.
- `hover`: border `rgba(17,24,39,0.22)`.
- `focus-visible`: border `primary`, ring 2px `primary/30`.
- `error`: border `danger`, ring 2px `danger/20`, message 12px `danger` with `aria-describedby`.
- `disabled`: bg `rgba(17,24,39,0.04)`, text muted, cursor not-allowed.
- `loading`: skeleton 44px `cream`.

**Do:** use `SelectField` with native `<select>` + chevron. Don't: custom div-select without keyboard support.

### 3.4 Badge / Status

Height 22px, padding 8px horizontal, radius sm 4px, text `label-caps` 12/500. Colors: draft `surface`+`border`+`text`, review `warning`+white, published `success`+white, danger `danger`+white. Count numbers use `h3` 20/600 tabular-nums.

### 3.5 Navigation (Header + BottomNav)

**Header:** height 56px mobile / 64px desktop, bg `surface` or `secondary` for editorial pages, border-b `border`. Logo 36px, title `label` 14/600. Active link: text `primary` + 3px amber dot/underline. Inactive: `text-muted` → `text` on hover.

**BottomNav (mobile):** fixed bottom, bg `surface/95` backdrop-blur, border-t `border`. 4–5 items, icon 24px + 10px caps label + 3px active indicator `primary`. Min tap 44px.

**Interaction:** keyboard roving tabindex; arrow keys move focus; Enter activates.

## 4. Accessibility requirements and testable acceptance criteria

WCAG 2.2 AA. Keyboard-first; every pointer interaction must have keyboard equivalent.

1. **Contrast:** body text on `surface` must be `text` (#111827) — 16.9:1. Amber buttons must not use white 12px text — test with axe `color-contrast` rule; must pass.
2. **Focus visible:** all interactive elements must show 2px `primary` ring with 2px offset on `focus-visible` only (not `focus`). Test: Tab through page; every control has visible ring; mouse click does not show ring.
3. **Keyboard:** Tab order matches visual order; no trap; Esc closes sheets/menus. Test: Tab → Shift+Tab covers all controls; no JS `outline:none` without replacement.
4. **Touch target:** all tappable areas ≥44×44px. Test: measure rendered box.
5. **Screen reader:** every icon has `aria-hidden="true"` + visible label; status counts have `aria-label`. Test: VoiceOver reads "Bookmarks 3" not "3".
6. **Reduced motion:** all transitions must be wrapped in `@media (prefers-reduced-motion: reduce) { transition: none }`. Test: enable reduce-motion, hover should not animate.
7. **Forms:** error messages are `role="alert"` + `aria-describedby` linked to input; `aria-invalid="true"` on error. Test: submit empty required field → screen reader announces error.
8. **Alternating sections:** when bg is `secondary`, text color must be white with 4.5:1 verified. Test: axe on orange section passes.

## 5. Content and tone standards

Tone: concise, confident, helpful. No jargon, no hedging.

- **Eyebrows:** 2–3 words, caps mono. Do: `DAILY DEVOTIONAL` Don’t: `Your Daily Devotional for Today!!!`
- **Headings:** sentence case, ≤6 words. Do: `A rhythm through Scripture` Don’t: `We Have Curated A Delightful Selection Of Plans For Your Spiritual Journey`
- **Body:** 14–16px, ≤20 words/sentence, active voice. Do: `Written prayers are remembered prayers.` Don’t: `It is considered that writing prayers may help with remembrance.`
- **Buttons:** verb + object, 1–3 words. Do: `Save prayer` `Read chapter` Don’t: `Click here` `Submit`
- **Empty states:** title + one line + one action. Do: `No bookmarks yet — tap a verse and press bookmark.` Don’t: `Oops! Looks like you haven’t added anything yet :(`
- **Errors:** what happened + how to fix. Do: `Enter a valid email address.` Don’t: `Invalid input.`

## 6. Anti-patterns and prohibited implementations

| Don't | Why | Do instead |
|-------|-----|------------|
| Use raw `#CC8800` inline in 12 places | Breaks token contract, prevents theming | Use `bg-[var(--color-primary)]` / `text-[var(--color-primary)]` |
| Low-contrast muted text 12px on `cream` | Fails AA (3.2:1) | Bump to 14px medium or use `text` at 60% opacity on 16px |
| Inconsistent gaps: 10px here, 18px there | Breaks rhythm, feels cheap | Use scale: 8/12/16/24/32 only |
| Icon-only button without label | Ambiguous, a11y fail | Add `aria-label` + visible text or tooltip; prefer labeled button |
| Pill radius everywhere | Erodes editorial poster feel | Use `md 8px` for cards/buttons; pill only for tabs |
| Amber large background for body copy | Contrast fail, eye strain | Reserve amber for actions/accents; body stays on `surface`/`cream` |
| Two adjacent burnt-orange sections | No rhythm, vibration | Alternate: `surface` → `cream` → `secondary` |
| Custom select without keyboard | Breaks a11y, mobile UX | Use native `<select>` styled with border sm 4px + focus ring |

**Migration notes for existing inconsistent UI:**
- Replace all `bg-main` / `text-main` / `text-deep` shorthand with `bg-[var(--bg-main)]` etc. — codemod: `sed 's/bg-main/bg-[var(--bg-main)]/g'`.
- Consolidate 6 greys to 2: `text` and `text-muted` only.
- Normalize card padding to `xl` (24px) — audit with `grep -r "p-5\|p-6\|p-7"` and replace with `p-6`.
- If legacy code uses `serif` for UI labels, swap to `Chakra Petch` — keep `serif` only for long-form Scripture/quote blocks.

## 7. QA checklist (execute in code review)

Copy this into PR descriptions:

- [ ] Tokens only: no raw hex outside `primary #CC8800`, `secondary #C55221`, `success #16A34A`, `warning #D97706`, `danger #DC2626`, `surface #FFFFFF`, `text #111827`
- [ ] Spacing uses 4/8/12/16/24/32 only; gaps are 12/16/24/32 per spec
- [ ] Typography uses scale 12/14/16/20/24/32; Chakra Petch for UI/display, JetBrains Mono for caps only; weights 400/500/600/700
- [ ] Every button implements default/hover/focus-visible/active/disabled/loading; focus ring is 2px `primary` + 2px offset
- [ ] Cards/sections use radius md 8px (sm 4px for inputs/badges); interactive card hover changes border to `primary/30`
- [ ] Sections alternate `surface` → `cream` → `secondary` — no two `secondary` adjacent
- [ ] Contrast passes axe `color-contrast`; amber buttons use 14px medium `#111827` text, not 12px white
- [ ] Keyboard: Tab order matches visual, focus visible on Tab only, no trap, Esc closes overlays
- [ ] Touch targets ≥44px; long labels truncate, empty states show icon+title+body+action
- [ ] Forms: error has `role="alert"` + `aria-describedby` + `aria-invalid`, hint 12px `text-muted`
- [ ] `prefers-reduced-motion` disables transitions
- [ ] No ambiguous `Click here`; buttons are verb+object; eyebrows are 2–3 caps words
- [ ] Mobile: card grid 1→2→3 cols, gap 16; header 56→64px, bottom nav fixed with 5 items max
