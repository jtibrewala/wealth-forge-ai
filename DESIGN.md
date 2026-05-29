# WealthForge AI Portal — Design Specification

> **Purpose:** Complete design spec for building the WealthForge AI Portal web app.  
> **Wireframe:** See `assets/wireframe.html` for screen layouts.  
> **PRD:** See `PORTAL-PRD.md` for product requirements.  
> **Last Updated:** 2026-05-28

---

## 1. Brand Identity

| Attribute | Value |
|-----------|-------|
| Product Name | WealthForge AI |
| Tagline | "Am I on track?" |
| Logo | ⚡ WealthForge AI (text mark with lightning bolt icon) |
| Voice | Confident, precise, jargon-free. Like a smart friend who happens to be a CFP. |
| Personality | Trustworthy, data-driven, no-nonsense. Never vague. Always shows the math. |

### Brand Values
- **Deterministic** — Every number comes from a calculation, never from AI guessing
- **Accessible** — Complex finance made understandable for salaried professionals
- **Privacy-first** — Local parsing, no PDF storage, no PAN transmission
- **Action-oriented** — Every insight ends with a specific next step

---

## 2. Color System

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1a56db` | Primary buttons, links, active states, logo |
| `--color-primary-hover` | `#1648b8` | Button hover states |
| `--color-primary-light` | `#eff6ff` | Primary backgrounds, selected states |
| `--color-primary-subtle` | `#dbeafe` | Light highlights, chat bubbles (user) |

### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#111827` | Headings, primary text |
| `--color-text-secondary` | `#4b5563` | Body text, descriptions |
| `--color-text-muted` | `#9ca3af` | Placeholders, timestamps, captions |
| `--color-border` | `#e5e7eb` | Card borders, dividers |
| `--color-border-light` | `#f3f4f6` | Subtle separators |
| `--color-surface` | `#ffffff` | Cards, modals, panels |
| `--color-background` | `#f9fafb` | Page background |
| `--color-background-alt` | `#f3f4f6` | AI chat bubbles, alternate rows |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#16a34a` | Positive XIRR, gains, good scores |
| `--color-success-bg` | `#dcfce7` | Success badges background |
| `--color-warning` | `#d97706` | Caution states, near-threshold |
| `--color-warning-bg` | `#fef9c3` | Warning badges background |
| `--color-danger` | `#dc2626` | Negative returns, underperformers, errors |
| `--color-danger-bg` | `#fee2e2` | Error badges background |
| `--color-info` | `#2563eb` | Informational callouts |
| `--color-info-bg` | `#eff6ff` | Info box background |

### Score Gradient (Health Scorecard)

| Range | Color | Label |
|-------|-------|-------|
| 0–30 | `#dc2626` | Critical |
| 31–50 | `#ea580c` | Needs Work |
| 51–70 | `#d97706` | Fair |
| 71–85 | `#16a34a` | Good |
| 86–100 | `#059669` | Excellent |

---

## 3. Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-display` | 36px | 800 | 1.2 | Hero headline |
| `--text-h1` | 28px | 700 | 1.3 | Page titles |
| `--text-h2` | 22px | 700 | 1.3 | Section headings |
| `--text-h3` | 18px | 600 | 1.4 | Card titles, subsections |
| `--text-body` | 15px | 400 | 1.6 | Body text |
| `--text-body-medium` | 15px | 500 | 1.6 | Emphasized body |
| `--text-small` | 13px | 400 | 1.5 | Table cells, secondary info |
| `--text-caption` | 11px | 400 | 1.4 | Timestamps, footnotes |
| `--text-number-large` | 28px | 800 | 1.2 | Score circles, big metrics |
| `--text-number` | 22px | 700 | 1.3 | XIRR values, amounts |
| `--text-number-small` | 15px | 600 | 1.4 | Table numbers |

### Font Weight Tokens

| Token | Value |
|-------|-------|
| `--font-regular` | 400 |
| `--font-medium` | 500 |
| `--font-semibold` | 600 |
| `--font-bold` | 700 |
| `--font-extrabold` | 800 |

---

## 4. Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps (badge padding) |
| `--space-2` | 8px | Icon gaps, compact padding |
| `--space-3` | 12px | Card internal padding (compact) |
| `--space-4` | 16px | Standard padding, grid gap |
| `--space-5` | 20px | Section padding (small) |
| `--space-6` | 24px | Card padding, section gaps |
| `--space-8` | 32px | Section spacing |
| `--space-10` | 40px | Large section gaps |
| `--space-12` | 48px | Hero padding, major sections |
| `--space-16` | 64px | Page-level vertical rhythm |

### Layout Grid

| Breakpoint | Width | Columns | Gutter |
|------------|-------|---------|--------|
| Mobile | < 640px | 1 | 16px |
| Tablet | 640–1024px | 2 | 20px |
| Desktop | 1024–1280px | 12 | 24px |
| Wide | > 1280px | 12 (max 1200px container) | 24px |

### Container

```css
--container-max: 1200px;
--container-padding: 24px;
```

---

## 5. Border & Shadow

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, small elements |
| `--radius-md` | 8px | Cards, inputs, buttons |
| `--radius-lg` | 12px | Modals, large cards, upload zones |
| `--radius-xl` | 16px | Feature cards, pricing cards |
| `--radius-full` | 9999px | Pills, avatars, score circles |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Hover states, dropdowns |
| `--shadow-lg` | `0 10px 25px rgba(0,0,0,0.1)` | Modals, featured pricing card |
| `--shadow-focus` | `0 0 0 3px rgba(26,86,219,0.2)` | Focus rings (accessibility) |

---

## 6. Component Specifications

### Buttons

| Variant | Background | Text | Border | Radius | Height |
|---------|-----------|------|--------|--------|--------|
| Primary | `--color-primary` | white | none | 8px | 44px |
| Secondary | white | `--color-primary` | 1px `--color-primary` | 8px | 44px |
| Ghost | transparent | `--color-text-secondary` | none | 8px | 44px |
| Danger | `--color-danger` | white | none | 8px | 44px |

- Padding: 12px 24px
- Font: 14px / 600 weight
- Hover: darken 8%, add `--shadow-md`
- Disabled: opacity 0.5, cursor not-allowed
- Loading: spinner replaces text, same dimensions

### Inputs

| Property | Value |
|----------|-------|
| Height | 44px |
| Border | 1px `--color-border` |
| Border (focus) | 2px `--color-primary` |
| Radius | 8px |
| Padding | 12px 16px |
| Font size | 14px |
| Placeholder color | `--color-text-muted` |
| Error border | `--color-danger` |
| Error text | 12px, `--color-danger`, 4px below input |

### Cards

| Property | Value |
|----------|-------|
| Background | `--color-surface` |
| Border | 1px `--color-border` |
| Radius | 12px |
| Padding | 24px |
| Shadow (default) | `--shadow-sm` |
| Shadow (hover) | `--shadow-md` |
| Transition | all 0.2s ease |

### Badges

| Variant | Background | Text | Padding | Radius |
|---------|-----------|------|---------|--------|
| Success | `--color-success-bg` | `--color-success` | 2px 8px | 4px |
| Warning | `--color-warning-bg` | `--color-warning` | 2px 8px | 4px |
| Danger | `--color-danger-bg` | `--color-danger` | 2px 8px | 4px |
| Neutral | `--color-background-alt` | `--color-text-secondary` | 2px 8px | 4px |

Font: 11px / 600 weight

### Tables

| Property | Value |
|----------|-------|
| Header bg | `#f8fafc` |
| Header font | 12px / 600 weight |
| Cell font | 13px / 400 weight |
| Row border | 1px `--color-border-light` |
| Cell padding | 10px 12px |
| Hover row | `--color-background` |
| Number alignment | Right-aligned |
| Negative numbers | `--color-danger` |
| Positive numbers | `--color-success` |

### Navigation Bar

| Property | Value |
|----------|-------|
| Height | 64px |
| Background | `--color-surface` |
| Border bottom | 1px `--color-border` |
| Logo font | 18px / 800 weight |
| Link font | 14px / 500 weight |
| Link color | `--color-text-secondary` |
| Link active | `--color-primary` + 2px bottom border |
| CTA button | Primary button (compact: 36px height) |

---

## 7. Screen Specifications

### 7.1 Landing Page (Unauthenticated)

**Layout:** Full-width hero → 3-column feature grid → social proof → CTA

| Section | Spec |
|---------|------|
| Hero | Centered, max-width 640px. H1 display size. Subtitle body size, muted. Two CTAs (primary + secondary). |
| Feature cards | 3-column grid. Icon (24px) + H3 title + body description. Border card style. |
| Trust signals | Logos or text: "Deterministic math • No AI hallucinations • Privacy-first" |
| Footer CTA | Repeat primary CTA with LTCG hook: "Calculate your tax-free LTCG harvest →" |

### 7.2 CAS Upload

**Layout:** Centered single-column (max 640px)

| Element | Spec |
|---------|------|
| Upload zone | Dashed border (2px, `--color-primary`), radius 12px, padding 48px. Drag-and-drop + click. |
| Icon | Upload cloud icon, 48px, `--color-primary` |
| Primary text | "Drop your CAS PDF here" — 16px / 600 |
| Secondary text | "Supports CAMS, KFintech, MFCentral" — 12px / muted |
| Password field | Appears if PDF is password-protected. Standard input. |
| Privacy notice | Info box (green-tinted): "PDF parsed in-memory, deleted after session" |
| Progress | Linear progress bar during parsing. Show "Parsing X schemes..." |

### 7.3 Portfolio Dashboard

**Layout:** Full-width table with summary stats row above

| Element | Spec |
|---------|------|
| Summary row | 4 metric boxes: Total Value, Portfolio XIRR, Schemes, LTCG Harvestable |
| Metric box | Card style, number in `--text-number` size, label in caption |
| Table | Full-width, sortable columns. Columns: Fund Name, Category, Value (₹), XIRR (%), vs Benchmark |
| XIRR cell | Color-coded: green if > benchmark, red if < benchmark - 3% |
| Benchmark badge | Shows "+X.X%" or "-X.X%" with appropriate semantic color |
| Footer | "Showing X of Y schemes • Benchmark: Nifty 50 TRI (14.2% 5Y CAGR)" |

### 7.4 Financial Health Scorecard

**Layout:** Score circle (centered) → 6-dimension grid (2×3) → priority action box

| Element | Spec |
|---------|------|
| Score circle | 120px diameter, 8px border (color from score gradient), score number centered |
| Score label | Below circle: "Good — Room to Improve" in appropriate color |
| Dimension cards | 2×3 grid on desktop, 1-col on mobile. Each: icon + title + value + progress bar |
| Progress bar | 8px height, rounded, fill color = score gradient for that dimension |
| Priority action | Info box (blue-tinted) at bottom: bold "Priority Action:" + specific recommendation |
| Paywall hint | If free tier: "🔒 Full breakdown available on Pro plan" in muted text |

### 7.5 LTCG Harvesting Calculator

**Layout:** 3 metric boxes → exit plan table → strategy callout

| Element | Spec |
|---------|------|
| Metric boxes | 3-column: Harvestable LTCG (green, large number), Tax Saved (green), Remaining Headroom |
| Exit plan table | Columns: Fund, Units to Redeem, LTCG Booked (₹), Action |
| Action column | Green badge: "Redeem & Reinvest" |
| Strategy box | Green-tinted info box explaining the redeem-and-reinvest strategy |
| Deadline | Prominent: "Complete before March 31, 2026" with countdown if < 30 days |

### 7.6 AI Chat Interface

**Layout:** Sidebar (240px) + main chat area (flex)

| Element | Spec |
|---------|------|
| Sidebar | Session list (card per session: title + date), session limit counter at bottom |
| Chat area | Messages flex-column, input bar fixed at bottom |
| User message | Right-aligned, `--color-primary-light` background, radius 12px |
| AI message | Left-aligned, `--color-background-alt` background, radius 12px |
| AI message content | Supports bold, bullet lists, tables, code blocks. Disclaimer in muted italic at end. |
| Input bar | Full-width input (radius 8px) + Send button (primary, icon) |
| Typing indicator | Three animated dots in AI bubble while waiting |
| Session limit | "Free: X of 3 sessions remaining" — warning color if 0 remaining |

### 7.7 Pricing Page

**Layout:** Centered heading → 3-column pricing grid → FAQ

| Element | Spec |
|---------|------|
| Cards | Equal height, center-aligned. Featured card (Pro) has primary border + shadow-lg |
| Price | `--text-number-large` size, extrabold. "/month" in muted small text |
| Feature list | Checkmark (green) + feature text. 13px. Divider between items. |
| CTA | Full-width primary button (featured) or secondary button (others) |
| Annual toggle | Switch above cards: "Monthly / Annual (2 months free)" |
| Footer | "Cancel anytime • Powered by Razorpay" in muted caption |

---

## 8. Interaction & Motion

| Interaction | Spec |
|-------------|------|
| Button hover | Scale 1.02, shadow-md, 150ms ease |
| Card hover | Shadow-md, translateY(-2px), 200ms ease |
| Page transitions | Fade-in 200ms on route change |
| Upload progress | Linear progress bar, indeterminate while parsing |
| Score animation | Count-up from 0 to final score over 1s (ease-out) |
| Chat message | Slide-up + fade-in, 200ms, staggered 50ms per message |
| Skeleton loading | Pulse animation on placeholder blocks while data loads |
| Toast notifications | Slide-in from top-right, auto-dismiss 5s |

---

## 9. Responsive Behavior

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Nav | Full links + CTA | Hamburger menu | Hamburger menu |
| Feature grid | 3 columns | 2 columns | 1 column |
| Portfolio table | Full table | Horizontal scroll | Card view per fund |
| Health scorecard | 2×3 grid | 2×3 grid | 1 column stack |
| LTCG boxes | 3 columns | 3 columns | 1 column stack |
| Chat sidebar | Visible | Collapsible | Hidden (drawer) |
| Pricing cards | 3 columns | 2+1 | 1 column stack |

---

## 10. Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text) |
| Focus indicators | `--shadow-focus` ring on all interactive elements |
| Keyboard navigation | Full tab order, Enter/Space for buttons, Escape for modals |
| Screen readers | ARIA labels on icons, role="table" on data tables, live regions for chat |
| Reduced motion | Respect `prefers-reduced-motion`, disable animations |
| Error states | Never color-only — always include text/icon alongside color |
| Upload | Keyboard-accessible file picker, drag-and-drop is enhancement only |

---

## 11. Tech Stack Recommendation

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | SSR for landing/SEO, client for dashboard |
| Styling | Tailwind CSS 3.4 | Utility-first, matches token system, fast iteration |
| Components | shadcn/ui | Accessible, unstyled primitives. Customizable with Tailwind. |
| Charts | Recharts or Chart.js | Portfolio allocation pie, score visualizations |
| Chat UI | Custom (flex layout) | No heavy chat SDK needed for v1 |
| Icons | Lucide React | Consistent, tree-shakeable |
| Animation | Framer Motion | Score count-up, page transitions, chat messages |
| Forms | React Hook Form + Zod | Lightweight, type-safe validation |
| Auth | NextAuth.js or Clerk | Email/Google sign-in, session management |
| Payments | Razorpay JS SDK | India-first, UPI + cards + netbanking |
| PDF Upload | react-dropzone | Drag-and-drop with keyboard fallback |
| State | React Query (TanStack) | Server state for portfolio data, chat sessions |

---

## 12. File Structure (Suggested)

```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Landing, pricing, about (public)
│   ├── (auth)/             # Login, signup
│   └── (dashboard)/        # Authenticated: portfolio, chat, health, ltcg
├── components/
│   ├── ui/                 # shadcn/ui primitives (button, card, input, table, badge)
│   ├── layout/             # Nav, Sidebar, Footer, Container
│   ├── portfolio/          # PortfolioTable, FundRow, MetricBox
│   ├── health/             # ScoreCircle, DimensionCard, ProgressBar
│   ├── ltcg/               # HarvestSummary, ExitPlanTable
│   ├── chat/               # ChatMessage, ChatInput, SessionList
│   └── pricing/            # PricingCard, TierToggle
├── lib/
│   ├── api/                # API client, endpoints
│   ├── auth/               # Auth config
│   └── utils/              # Formatters (₹ currency, % XIRR)
├── styles/
│   └── globals.css         # CSS variables (tokens from this doc)
└── types/                  # TypeScript interfaces
```

---

## 13. Key Design Decisions

1. **No dark mode in v1** — Financial data needs high readability; defer to v2 based on user demand.
2. **Numbers are always right-aligned** in tables — scannability for financial data.
3. **LTCG calculator is visually prominent** even on free tier — it's the acquisition hook.
4. **Chat disclaimer appears once per session** (first AI response), not on every message.
5. **Score circle color matches the score range** — immediate visual feedback without reading.
6. **Upload zone is the largest interactive element** on the CAS page — reduces friction.
7. **Pricing page highlights Pro** (not Family) — primary conversion target for v1.
8. **All financial numbers use Indian numbering** (₹1,25,000 not ₹125,000).

---

## 14. Asset Requirements

| Asset | Format | Notes |
|-------|--------|-------|
| Logo (full) | SVG | "⚡ WealthForge AI" text mark |
| Logo (icon) | SVG | Lightning bolt only (for favicon, mobile) |
| Favicon | ICO + PNG (32px, 192px) | Lightning bolt |
| OG Image | PNG 1200×630 | For social sharing — hero text + brand |
| Upload illustration | SVG | Cloud + document icon for upload zone |
| Empty state illustrations | SVG | For zero-schemes, no-sessions states |
| Score gauge | SVG/Canvas | Animated circular progress |

---

## Document History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-28 | Initial design spec from PRD + wireframe |
