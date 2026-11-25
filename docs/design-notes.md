# Design Notes — DFASH Express Logistics Services

Measured design specification derived from the two attached visual references:
1. **UI Layout Reference:** Logisco Cargo Transport Services desktop landing page (`512×1024` preview image representing a `1440 px` desktop design at `~0.355×` scale; cropped after the Services section).
2. **Brand & Palette Reference:** D-FASH EXPRESS LOGISTICS SERVICES official logo (`1024×682` at `1×` on pure obsidian `#010000` canvas).

> **User Brand Override Applied:** Per explicit instruction, the Logisco reference's exact layout grid, diagonal geometry, component anatomy, typography rhythm, and section flow are preserved, while its teal/orange palette is re-mapped to D-Fash Express's luxury **Obsidian Black, Metallic Gold, and Crisp White** identity (dark-dominant with high-contrast white cards and strips). Additionally, any **sticky/fixed mobile bottom CTA bar is explicitly omitted**.

---

## 1. Reference Scale, Dimensions & Viewport Strategy

| Asset | File Dimensions | Assumed Design Width | Scale Basis |
| :--- | :--- | :--- | :--- |
| UI Reference (Logisco) | `512 × 1024 px` | `1440 px` desktop (`1200 px` max content container) | `~0.355×` scaled preview |
| Brand Logo (D-Fash Express) | `1024 × 682 px` | `1×` raster logo lockup | `1×` direct colour sampling |
| Mobile Layouts | No mobile reference attached | Derived cleanly from desktop language across `320`, `360`, `375`, `390`, `412`, `430`, `768`, `820`, `1024` px (portrait + `667×375` & `844×390` landscape) | Fluid `clamp()` + CSS breakpoints |

---

## 2. Layout Tree (Measured Section-by-Section)

```text
body (bg: #09090B obsidian, color: #FAF9F6)
├── a.skip-link (sr-only until focused; high-contrast gold pill)
├── header.site-header
│   ├── div.topbar (height ~42px desktop; hidden/condensed < 1024px)
│   │   ├── div.topbar-left (bg: #FAF9F6 ivory-white; Hours + Bodija Address + Client Portal link)
│   │   └── div.topbar-right (angled clip-path dark obsidian #0D0D10 wedge; "REACH US:" + IG/FB icons)
│   └── nav.navbar (height ~78px desktop; sticky with scroll state)
│       ├── a.brand-logo (assets/svg/logo-placeholder.svg)
│       ├── ul.nav-links (desktop inline; active item has 2px top gold bar + subtle gold surface)
│       ├── a.nav-phone (circular gold phone badge + "Call Us Anytime" / +234 906 727 0530)
│       ├── div.nav-cta-wedge (slanted metallic gold right panel housing obsidian "REQUEST A QUOTE" btn)
│       └── button.nav-toggle (mobile < 1024px; 44×44px target; aria-expanded & aria-controls)
│   └── div.mobile-drawer (accessible focus-trapped slide drawer; locks Lenis scroll; no sticky bottom bar)
├── main#main-content
│   ├── section#home.hero (min-height: 100vh / 100dvh; overflow: clip)
│   │   ├── picture.hero-bg (dark air-cargo hub right-weighted backdrop + obsidian gradient veil)
│   │   ├── figure.hero-plane-inset (top-left circular cropped aircraft w/ 2px gold hairline ring)
│   │   ├── div.hero-content (centred pill badge, H1 display headline, concise subcopy, primary WhatsApp CTA w/ white arrow box + secondary Quote link)
│   │   ├── figure.hero-van-visual (bottom-left express van + matte parcel boxes breaking over diagonal divider)
│   │   └── div.hero-diagonal-cut (bold Logisco angled bottom geometry with metallic gold accent band)
│   ├── section.trust-strip (crisp #FFFFFF touch-of-white contrast band; 5 verified credential items incl. DHL)
│   ├── section#about.about (2-column asymmetric split: 52% / 48% on desktop)
│   │   ├── div.about-copy (gold pill eyebrow, H2, brand story, crisp white left-gold-bordered 2-col 6-item checklist card, dark/gold CTA + phone link)
│   │   └── div.about-media (vertical dispatch photo + overlapping fleet photo + gold chevron motifs + metallic gold "Est. 2020 / 120–230+ Countries" badge)
│   ├── section.kpi-band (full-width moody dark backdrop + 4 translucent obsidian stat cards w/ gold icons)
│   ├── section#services.services (dark subtle grid backdrop + edge gold chevrons + Swiper 3-col carousel of 6 services)
│   │   └── article.service-card (top 16:10 photo + floating 52px circular gold icon badge overlapping inset crisp #FFFFFF content card)
│   ├── section#guidelines.guidelines (extension in Logisco language: 3-step How It Works + Rates, 17"×17"×15" Size Limit & Prohibited Items card)
│   ├── section#reviews.reviews (verified 4.8★ / 114 Google Reviews showcase + 3 clearly marked placeholder review cards)
│   ├── section#faq.faq (6-item accessible accordion in crisp dark/gold cards)
│   └── section#contact.contact (2-col split: static Quote Enquiry Form + Bodija Joke Plaza Contact & Accessibility Hub)
└── footer.site-footer (deep #050507 obsidian, gold top hairline, 4-col desktop grid, Client Portal, socials, copyright)
```

---

## 3. Sampled Palette & Token Mapping

### Sampled from Attached Reference Images
- **Logisco UI Reference (`512×1024`):** Topbar `#F1F3F2` / `#2B5F6C`, Navbar `#104B59`, Hero dark `#09384A`, Accent CTA orange `#F69C6A` / `#E28C59`, Light sections `#FFFFFF` / `#F6F8F7`, KPI dark `#043543` / `#154E57`.
- **D-Fash Express Logo (`1024×682`):** Pitch obsidian `#010000`, warm glow `#3E1C00`, metallic wing/wordmark gold gradient `#FFE040` → `#FFD00C` → `#FDBD03` → `#F5A508` → `#FD8701`, crisp subtitle white `#FFFDED`.

### Production `:root` Tokens (Black, Gold & White Luxury Mapping)
- **Surfaces:**
  - `--bg-void: #050507` (footer & deepest recess)
  - `--bg-obsidian: #09090B` (primary page canvas — replaces `#09384A` / `#043543`)
  - `--bg-elevated: #121216` (navbar, cards, accordions — replaces `#104B59`)
  - `--bg-surface: #18181D` (translucent KPI cards & elevated hover surfaces — replaces `#154E57`)
  - `--bg-white: #FFFFFF` (high-contrast touch-of-white surfaces: trust strip, About checklist card, Service inset cards)
  - `--bg-ivory: #F7F5F0` (top utility strip & subtle light accents — replaces `#F1F3F2` / `#F6F8F7`)
- **Brand Gold Accents:**
  - `--gold-bright: #FFE040` (gradient highlight glint from wordmark top)
  - `--gold-primary: #FFB800` (icons, active indicators, gold headings on dark)
  - `--gold-cta: #F0A800` (primary buttons, slanted nav wedge, diagonal accent band, experience badge — replaces `#F69C6A` / `#E28C59`)
  - `--gold-amber: #D98200` (deep metallic gradient stop)
  - `--gold-text-on-light: #8A5B00` (WCAG AA compliant gold text on `#FFFFFF` and `#F7F5F0`)
  - `--gold-gradient: linear-gradient(135deg, #FFE040 0%, #FFB800 45%, #E08E00 100%)`
- **Text Tokens:**
  - `--text-on-dark: #FAF9F6` (`18.90:1` on `#09090B`)
  - `--text-muted-dark: #C8C5BE` (`11.54:1` on `#09090B`)
  - `--text-subtle-dark: #B8B3A8` (`8.80:1` on `#141417`)
  - `--text-on-light: #09090B` (`19.90:1` on `#FFFFFF`)
  - `--text-muted-light: #4A4945` (`9.01:1` on `#FFFFFF`)

---

## 4. Typography, Spacing, Radii & Shadows

- **Display Font:** `Barlow Condensed` (weights `600`, `700`, `800`) — mirrors the bold, condensed uppercase wordmark on the D-Fash Express logo (`D-FASH EXPRESS`) while adding high-fashion luxury precision. Fallback: `'Barlow Condensed', 'Arial Narrow', Arial, sans-serif`.
- **Body / UI Font:** `Plus Jakarta Sans` (weights `400`, `500`, `600`, `700`) — matches Logisco's clean geometric sans-serif headings, pills, and cards. Fallback: `'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif`.
- **Fluid Type Scale (`clamp()`):**
  - `--text-hero`: `clamp(2.5rem, 1.8rem + 3.2vw, 4.75rem)` (`40px → 76px`, line-height `1.04`, uppercase/tight tracking)
  - `--text-h2`: `clamp(1.875rem, 1.45rem + 1.8vw, 3rem)` (`30px → 48px`, line-height `1.1`)
  - `--text-h3`: `clamp(1.25rem, 1.12rem + 0.55vw, 1.5rem)` (`20px → 24px`)
  - `--text-body`: `clamp(1rem, 0.96rem + 0.15vw, 1.0625rem)` (strictly `≥ 16px` everywhere, line-height `1.65`)
  - `--text-sm`: `0.9375rem` / `0.875rem` (labels, metadata — kept high-contrast)
- **Spacing Scale:** `4px` base system (`--space-1: 0.25rem` through `--space-12: 3rem`), section padding `--section-py: clamp(3.75rem, 6vw, 6.25rem)`, container max-width `1220px` with `clamp(1rem, 4vw, 2rem)` inline gutter.
- **Radii (faithful to Logisco):**
  - `--radius-xs: 4px` (buttons, inner CTA arrow square)
  - `--radius-sm: 6px` (cards, checklist panel, inputs)
  - `--radius-md: 10px` (KPI translucent panels, photo frames, service cards)
  - `--radius-pill: 999px` (eyebrow pills, floating circular service icon badges, carousel prev/next buttons)
- **Borders & Shadows:**
  - Crisp `1px solid rgba(255, 184, 0, 0.2)` metallic hairlines on dark surfaces.
  - Elevated card shadow on desktop: `0 18px 42px rgba(0, 0, 0, 0.45)` (simplified on `< 768px` for smooth low-end Android rendering).
- **Icon Style:** Lucide inline SVG (`stroke-width="1.8"`, crisp geometric line icons, `20px–26px`) matching Logisco's clean outline icons in the KPI band and circular service badges.

---

## 5. Animation & Interaction Feel

- **Mood:** Crisp, confident, weighted luxury — never floaty or gimmicky. Smooth ease-out deceleration (`power3.out`, durations `0.6s–0.9s`).
- **Hero Entrance:** Bold choreographed reveal (staggered badge → headline → subcopy → CTAs, subtle slide-in of the foreground express van & circular aircraft inset).
- **Scroll Reveals:** Triggered once via `ScrollTrigger` (`start: "top 85%"`), animating **only `transform` and `opacity`**.
- **Mobile & Accessibility Rules:**
  - Lenis runs on desktop pointer devices; touch devices retain native momentum scrolling (`smoothTouch: false` / desktop-only Lenis activation).
  - `gsap.matchMedia()` lightens motion offsets on `< 768px` and disables all ScrollTrigger/Lenis animations under `prefers-reduced-motion: reduce`.
  - `ScrollTrigger.config({ ignoreMobileResize: true })` plus `orientationchange` refresh.
  - Failsafe reveal timeout (`1800ms`) + `<noscript>` rules guarantee all content stays 100% readable if JS or CDNs fail.
