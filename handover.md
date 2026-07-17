# Holistic Physio — Handover

Last updated: 2026-07-17

## Project state

New template-based rebuild of holisticphysio.com.au, sourced from the original WordPress export at `C:\1myguy\projects\holisticphysio.com.au ORIGINAL`. 47 HTML pages, static site, no build step. Root directory is the live document root (flat file structure, e.g. `acupuncture.html`, `annerley.html`).

**Structure:**
- `index.html` — homepage
- 13 service/condition pages: `acupuncture`, `physiotherapy`, `chinese-herbal-medicine`, `clinical-pilates`, `fertility-acupuncture`, `pain`, `fatigue`, `stress`, `digestive-issues`, `migraines-and-headaches`, `sports-injuries`, `womens-health`, `work-injuries`, `stress-anxiety-and-depression`, `fertility`
- 27 suburb pages (Brisbane inner suburbs, templated)
- 6 misc pages: `about-us`, `contact`, `faq-frequently-asked-questions`, `holistic-physio-difference`
- `css/main.css`, `scripts/app.js` — shared across every page
- `images/` — all real photos, converted to `.webp`, named `holisticphysio-holistic-physio-{semantic}.webp`

**Deliberately not built (do not recreate these):**
- `chronic-and-acute-pain.html` and `chronic-fatigue.html` — original site had these as separate nav items, but their content is a full subset of what `pain.html` and `fatigue.html` already cover. Building duplicates would cannibalize rankings.
- `pregnancy-and-fertility.html` — was a dead 404 in the original site, no real content ever existed for it.

---

## Outstanding: SEO (from `/seo-audit`)

### Done this session
1. **`sitemap.xml`** — added at root, lists all 47 pages, referenced from `robots.txt`.
2. **`robots.txt`** — added, allows all, points to the sitemap.
3. **Canonical tags** — every page now has a self-referencing `<link rel="canonical" href="https://holisticphysio.com.au/{page}">` (root `/` for `index.html`).
4. **Schema markup** — added via JSON-LD on every page:
   - `MedicalBusiness` (address, phone, email, geo, `sameAs` Facebook/LinkedIn, `hasMap` using the confirmed Google Place ID `ChIJPYIJUwtakWsRsGcrZF1zqa4`, and `openingHoursSpecification`: Mon 10:00–18:30, Tue 13:30–17:30, Thu 10:00–18:30, closed Wed/Fri/Sat/Sun — pulled live from the Google Maps listing, confirmed by user, not guessed)
   - `FAQPage` on the 20 pages that have a `.faq-list` section, auto-extracted from the real `<summary>`/`<p>` Q&A pairs already on the page

   Domain used throughout: `https://holisticphysio.com.au` (site not live yet — re-verify canonical/sitemap URLs match the real domain before launch if this changes).

### Done this session (cont.)
5. **Title tags** — all 47 trimmed to ≤65 rendered characters (≤60 on all but a couple), unique across the site. Suburb pages use a shared trimmed template (`Physio & Acupuncture near {Suburb} | Holistic Physio`); service/misc pages hand-trimmed individually.
6. **Meta descriptions** — all 47 trimmed to ≤160 rendered characters, unique across the site.

Verified programmatically: 0 pages over the 60/160 char limits (HTML entities decoded before counting), 47/47 unique titles, 47/47 unique descriptions, HTML structure (`<head>`/`<title>` tag counts) intact on every page.

### Not checkable yet (site isn't live)
- Core Web Vitals / PageSpeed Insights — meaningless on `file://`, run once deployed
- Search Console coverage / indexation — needs a live domain first
- Mobile-Friendly Test — same

### Fixed this session
- **27 orphaned suburb pages** — previously had zero internal links pointing to them anywhere on the site (the homepage distance-calculator only used JS `<button>` elements, not links). Fixed three ways: (1) suburb pills are now real `<a href>` links that still preserve the click-to-see-distance UX, (2) added a site-wide "Areas we serve" footer grid linking all 27 suburbs from every page, (3) added suburb-to-suburb "Nearby areas" cross-links using real Brisbane geography (each suburb page links to 2-3 geographic neighbours).
- Softened all "yes you're covered" health fund/Medicare claims across the site to "in most cases" + "check with your fund" language.

---

## Outstanding: content / images

- **`stress-anxiety-and-depression.html`** is the one remaining page still reusing generic photos (the fatigue couch/tea images) rather than a dedicated photo. Original archive had no real photo for this specific topic — still open if a better photo turns up.
- **38 unconverted-but-imported photos** sit in `images/` prefixed `holisticphysio-holistic-physio-extra-*.webp` — pulled from the original archive per the "bring in everything over 2KB" request, but not yet curated/assigned to any page. Available for future page refreshes (more Pilates, fatigue, pain lifestyle shots, a Brisbane skyline shot, an alternate clinic exterior, etc.)
- No **privacy policy** or **terms** page exists anywhere on the site. Not part of the original scope but flagged since it's a standard trust signal (E-E-A-T) and likely expected at launch, especially since the contact form / booking portal (Zanda Health) collects personal health information.

---

## Standing conventions (for future work on this project)

- **Image naming**: `holisticphysio-holistic-physio-{semantic-or-page}-{description}.webp`, strip WordPress hash suffixes, convert everything to webp. Source of truth for original photos/content is `C:\1myguy\projects\holisticphysio.com.au ORIGINAL`.
- **Real content only** — no fake CTAs, no reused stock photos as generic decoration, no invented content when the original site has real copy to pull from. Where original topics had zero content ("coming soon" stubs), original-voice copy was written to match the site's tone rather than left thin.
- **No em dashes** anywhere (chat replies or page copy) — checked and clean site-wide as of this session.
- **Purple accent** (`#930f86` / `#690a60`, CSS vars `--purple` / `--purple-deep` / `--purple-tint`) is used for the nav bar and the "difference"-pattern purple sections, layered on top of the primary green brand palette (`--brand` etc.) — pulled from the real original site's nav colour, not invented.
- Site-wide reusable sections follow a component pattern (`.hero`, `.mission`, `.visit`, `.difference`, `.testimonials`, `.faq`, `.contact`, `.footer`) shared via `css/main.css` — new pages should reuse these rather than one-off styles.
- Google review testimonials sourced from `.md/reviews from google.txt` (~40 real reviews). Only ~15-20 have been used across the homepage + 5 therapy pages carousels/grids so far; more are available if additional variety is wanted later. All ratings are 5-star except Dorothy Shanks (4-star) — this is reflected accurately in the star icons used.

---

## Verification status

Every change this session was verified with a full-site Playwright pass (all 47 pages): zero console errors, zero failed network requests, all internal links resolve. Last full clean pass confirmed at end of this session.
