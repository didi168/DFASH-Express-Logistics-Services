# Design Notes — DFASH Express Logistics Services (ELIOS Architectural Layout)

Measured design specification rebuilt to match the newly attached **ELIOS** Swiss-editorial logistics landing page reference (`176×1024` vertical full-page preview of a `1440 px` desktop design), while retaining 100% of DFASH Express's verified copy and **Black, Gold & Crisp White** brand palette (sampled from the official D-Fash Express logo, `1024×682`).

> **User Directives Applied:**
> - **Layout fidelity:** Matches the ELIOS reference's exact section sequence, alternating crisp white (`#FFFFFF`) and pitch obsidian (`#0C0C0E`) bands, architectural corner crosshair ticks (`+`), floating pill navigation bar, staggered 3-tile KPI stack flanking a vertical spine visual, 50/50 split service & industry showcases, 2-row monochrome capability grid, split customer proof card, full-bleed photo frosted quote panel, and monumental footer wordmark.
> - **Brand & Copy retained:** 100% verified DFASH Express facts, services, guidelines, 4.8★/114 Google rating, DHL partnership, Bodija address/hours/accessibility, Client Portal links, static quote form, zero invented testimonials/logos, and **explicit omission of any fixed mobile bottom CTA bar**.

---

## 1. Reference Dimensions & Responsive Scale

| Asset | Dimensions | Design Width Basis |
| :--- | :--- | :--- |
| ELIOS Full-Page Layout Reference | `176 × 1024 px` | `1440 px` desktop (`1280 px` max content container) |
| Official D-Fash Express Logo | `1024 × 682 px` | `1×` brand palette reference (`#010000`, `#FFE040`–`#FD8701`, `#FFFDED`) |
| Mobile & Tablet Breakpoints | Derived from desktop language | `320`, `360`, `375`, `390`, `412`, `430`, `768`, `820`, `1024` px + `667×375` & `844×390` landscape |

---

## 2. Section-by-Section Layout Tree (Matching ELIOS Cadence)

```text
header.site-header (crisp #FFFFFF sticky minimal bar)
├── a.brand-logo (assets/svg/logo-on-light.svg)
├── nav.nav-pill (floating #F3F3F1 centre pill bar: About, Services, Guidelines, Reviews, Contact, Portal)
├── a.btn-header (sharp #0B0B0D obsidian CTA "Request a Quote")
└── button.nav-toggle (< 1024px; 44×44px; focus-trapped mobile drawer; NO fixed bottom bar)

main#main-content
├── 1. section#home.hero (pure #FFFFFF Swiss editorial canvas; min-height 100dvh)
│      ├── Asymmetric top-left H1 ("Moving Ibadan forward. / One parcel at a time.") + 4.8★ / 114 reviews micro-proof
│      ├── Right-middle summary paragraph + paired sharp CTAs ("Book via WhatsApp" dark + "Request a Quote" bordered)
│      ├── Centrepiece framed express fleet visual (hero-van-desktop.webp) with architectural registration ticks
│      └── Bottom geometric stacked obsidian / burnished-gold / alabaster modular cargo blocks transitioning into dark band
├── 2. section#about.statement-band (#0C0C0E obsidian full bleed)
│      ├── Top-left micro eyebrow ("• ABOUT D-FASH EXPRESS")
│      ├── Right 62% large editorial statement headline (Est. 2020 in Bodija, Ibadan...)
│      └── Lower split: left architectural fleet thumbnail (about-fleet.webp) + right body copy & gold CTA
├── 3. section#services.services-showcase (#0C0C0E obsidian, hairline top divider)
│      ├── Header row: left H2 ("Express logistics built around your business") + right copy & gold/outline CTAs
│      └── 50/50 Split Swiper Showcase across all 6 verified services:
│          ├── Left #18181B architectural panel (+ ticks, 01/06 counter, title, copy, 3-col specs, gold CTA + < > arrows)
│          └── Right full-bleed service photo (service-1..6.webp) + translucent corner verified metric badge
├── 4. section#reach.reach-band (pure #FFFFFF)
│      ├── Left column: H2 ("Dispatch solutions built to go further") + CTAs + 2×2 #F5F5F3 operational hub tiles
│      ├── Centre column: Tall vertical logistics spine photo (about-dispatch.webp)
│      └── Right column: 3 staggered square KPI blocks (Light #EFEFED "4.8★", overlapping Black #0C0C0E "230+", Gold #F0A800 "2020")
├── 5. section#guidelines.standards-band (pure #FFFFFF)
│      ├── Left column: H2 ("Built on trust. Driven by performance.") + numbered 01/02/03 editorial rules (Rate factors, 17"×17"×15" box limit, Prohibited items)
│      └── Right column: Tall interstate fleet image (service-4-interstate.webp) w/ dark overlay bar (Mon–Sat 9–6 & Wheelchair Access)
├── 6. section#solutions.solutions-band (#0C0C0E obsidian)
│      ├── Header row: H2 ("Logistics solutions designed for every sender") + right subtitle
│      └── 2 wide side-by-side split cards (45% vertical photo + 55% #18181B panel w/ specs & gold CTA):
│          ├── Card 1: E-Commerce Brands & Online Vendors (COD, Dashboards, Warehousing)
│          └── Card 2: Personal, Interstate & Diaspora Senders (Ibadan–Lagos, Errands, DHL Foodstuffs)
├── 7. section.network-strip (pure #FFFFFF)
│      ├── Header row: H2 ("Chosen by vendors & senders who keep moving") + right line
│      └── 2-row crisp #F6F6F4 sharp-cornered verified capabilities & route tiles (zero invented client logos)
├── 8. section#reviews.proof-faq-band (pure #FFFFFF)
│      ├── Split testimonial showcase (35% left title + 4.8★ summary + arrows / 65% right #F6F6F4 card with obsidian 4.8★ seal + 3 bracketed placeholder review slides)
│      └── Swiss hairline FAQ accordion (6 verified customer questions)
└── 9. section#contact.contact-hero (full-bleed moody dark photo backdrop + obsidian scrim)
       ├── Left: H2 ("Let's keep your deliveries moving.") + Bodija address, hours, wheelchair access, phone/WhatsApp/Maps links
       └── Right: Translucent frosted dark Quote Request panel (static UI only, 16px inputs, WhatsApp prefill)

footer.site-footer (#09090B pitch obsidian)
├── Top row: statement ("Reliable logistics, delivered with clarity.") + horizontal nav anchors
├── Middle row: 4-column micro links (Services, Company/Portal, Socials, Bodija Desk)
└── Bottom row: Monumental giant display wordmark ("D-FASH EXPRESS") + copyright & Back to top
```

---

## 3. Colour Tokens, Typography & Radii

- **Surfaces:** `--white: #FFFFFF`, `--stone-100: #F5F5F3`, `--stone-200: #EAEAE6`, `--obsidian: #0C0C0E`, `--obsidian-card: #161619`, `--obsidian-deep: #070709`.
- **Brand Gold:** `--gold-cta: #F0A800`, `--gold-primary: #FFB800`, `--gold-bright: #FFE040`, `--gold-on-light: #8A5B00` (WCAG AA `5.87:1` on `#FFFFFF`, `5.25:1` on `#F5F5F3`).
- **Typography (matching ELIOS Swiss-editorial restraint):**
  - Primary editorial UI & Headlines: `Plus Jakarta Sans` (`400`, `500`, `600`, `700`) — tight negative tracking (`-0.03em`) and medium weight (`500`) on headings just like ELIOS.
  - Monumental wordmark & KPI numerals: `Barlow Condensed` (`600`, `700`, `800`).
- **Radii:** Ultra-crisp architectural corners (`2px`–`4px` on buttons, tiles, and cards; zero bubbly pill clutter except subtle tag chips), accented by hairline borders (`1px solid`) and corner `+` registration marks matching ELIOS.
