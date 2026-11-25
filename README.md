# DFASH Express Logistics Services — Landing Page

Single-page, GitHub Pages–ready luxury landing page for **DFASH Express Logistics Services (D-Fash Express)** built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

## Tech Stack
- **Markup & Styling:** Semantic HTML5 (`lang="en-NG"`), modular CSS3 with `:root` design tokens, fluid `clamp()` typography, and responsive `<picture>` WebP images.
- **Libraries (pinned CDN versions, `defer`):** GSAP `3.12.5` + ScrollTrigger, Lenis `1.1.14` (fine-pointer desktop only; native touch scroll preserved on mobile), Swiper `11.1.14` (Services carousel).
- **Icons:** Inline Lucide geometric SVGs (`stroke-width="1.8"`–`2.2`) for zero FOUC/CLS and offline resilience.
- **Mobile Override:** Intentionally omits any fixed/sticky bottom CTA bar on mobile per project specification.

---

## Quick Edit Guide (`<!-- EDIT: ... -->` Markers)

Search `index.html`, `robots.txt`, and `sitemap.xml` for `EDIT:` to update business details quickly:

| Marker | File(s) | What It Controls |
| :--- | :--- | :--- |
| `EDIT: Page title and meta description` | `index.html` | `<title>` and SEO description |
| `EDIT: Canonical URL` | `index.html`, `robots.txt`, `sitemap.xml` | Canonical URL, Open Graph URL, and Sitemap location |
| `EDIT: Business details` | `index.html` | `LocalBusiness` / `CourierService` JSON-LD structured data |
| `EDIT: Opening hours` | `index.html` | Top utility bar & Bodija office hours |
| `EDIT: Office location` / `Office street address` | `index.html` | Bodija Joke Plaza street address |
| `EDIT: Client portal URL` | `index.html` | Top utility bar, mobile drawer & footer portal links |
| `EDIT: Social media links` / `profiles` | `index.html` | Instagram (`@dfash_express`) and Facebook links |
| `EDIT: Primary phone number` / `WhatsApp` | `index.html`, `js/main.js` | `tel:` and `https://wa.me/2349067270530` links |
| `EDIT: Replace the three clearly marked placeholders` | `index.html` | Customer review slots (paste verbatim Google reviews) |
| `TODO: connect to a form service` | `index.html`, `js/main.js` | Quote form submission backend (Formspree, Web3Forms, etc.) |

---

## Customising Brand Tokens (`css/style.css`)

All visual tokens live inside `:root` at the top of `css/style.css`:

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#09090B` | Main luxury dark canvas |
| `--bg-elevated` | `#121216` | Navbar, cards, accordions, mobile drawer |
| `--bg-white` | `#FFFFFF` | High-contrast trust strip, checklist & service cards |
| `--gold-primary` | `#FFB800` | Gold headings, icons & active highlights on dark |
| `--gold-cta` | `#F0A800` | Primary buttons, slanted nav wedge & diagonal accent |
| `--gold-text-on-light` | `#8A5B00` | WCAG AA (`≥ 5.39:1`) antique gold text on white/ivory |
| `--font-display` | `Barlow Condensed` | Bold condensed display headings matching the logo |
| `--font-body` | `Plus Jakarta Sans` | Clean geometric body & UI typography |

---

## Swapping the Logo in One Edit

The header, mobile drawer, footer, and `404.html` all reference a single file:

- `assets/svg/logo-placeholder.svg` (horizontal lockup)
- `assets/svg/favicon.svg` (square browser tab emblem)

To switch to your master vector logo later, simply overwrite `assets/svg/logo-placeholder.svg` (keeping a horizontal aspect ratio around `340×76`) and `assets/svg/favicon.svg` (`64×64`). No HTML edits are required.

---

## Deploying to GitHub Pages

1. Commit and push all files to the `main` branch of your GitHub repository:
   ```bash
   git add .
   git commit -m "Build DFASH Express luxury landing page"
   git push origin main
   ```
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, select **`main`** and folder **`/ (root)`**, then click **Save**.
4. Wait ~1–2 minutes; GitHub Pages will publish at `https://<your-username>.github.io/<repo-name>/` (all paths in the project are relative, so it works at any subpath without edits).

### Connecting a Custom Domain (`dfashexpresslogistics.com`)
1. In **Settings → Pages → Custom domain**, enter `dfashexpresslogistics.com` and click **Save** (GitHub creates a `CNAME` file automatically).
2. At your DNS registrar, point the apex domain (`@`) to GitHub Pages' four `A` records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and point `www` via a `CNAME` record to `<your-username>.github.io`.
3. Once DNS propagates, enable **Enforce HTTPS** in **Settings → Pages**.
