# Invomaker SEO Audit

**Date:** 2026-09-15  
**Site:** https://www.invomaker.com (apex `invomaker.com` 308s → www)  
**Scope:** Full-site technical + on-page + content (codebase + live checks)

Use this as a follow-up checklist. Mark items done as you ship them.

---

## Locked decisions (2026-09-15 Critical + A/C/D pass)

| Topic | Choice |
|-------|--------|
| Canonical host | `https://www.invomaker.com` |
| Tool URL | `/create-invoice`; 301 `/invoice-builder` → it; invoice-builder route deleted |
| Head keyword | `/free-invoice-generator` owns it |
| About | Stay at `/free-invoice-maker`; About-intent metadata + light body; sitemap priority 0.5 |
| Canonicals | All public indexable pages (`buildPublicPageMetadata` + homepage/blog/About) |
| Sitemap | `transform` drops `/dashboard*`; regenerated committed XML (www locs) |
| Extras shipped | **A** lander CTAs, **C** homepage single H1, **D** expand thin FAQs |
| Deferred | JSON-LD, ad relocation |
| Deploy reminder | Set Vercel `NEXT_PUBLIC_APP_URL=https://www.invomaker.com` |

---

## Verdict

Crawl foundations are mostly in place, but **host inconsistency (www vs non-www)**, **no canonicals**, a **polluted sitemap**, and **heavy keyword cannibalization** were the biggest blockers at audit time. Money pages talked about the tool without linking into it.

**Critical + extras A/C/D from the action plan are implemented in code** (see checklist below). Remaining: GSC sitemap resubmit, JSON-LD (deferred), content cluster / CWV longer-term work.

| Area | Health (post-fix) |
|------|---------------------|
| Crawlability | Improved — www host, sitemap excludes dashboard/utility |
| Indexation signals | Improved — self-canonicals + page-specific `og:url` |
| On-page | Improved — About retargeted; single homepage H1; lander CTAs |
| Content | Better FAQs on landers; template risk still longer-term |
| Schema | None (JSON-LD deferred) |

---

## Site context

- **Type:** Freemium SaaS invoice generator (Next.js App Router)
- **Primary SEO goal:** Organic traffic to free-tool + conversion keywords
- **Priority themes:** `free invoice generator`, freelancer/consultant variants, US/CA tax/currency

### Key files

| Concern | Location |
|---------|----------|
| Sitemap config | `next-sitemap.config.js` |
| Robots | `public/robots.txt` |
| Generated sitemap | `public/sitemap.xml`, `public/sitemap-0.xml` |
| Shared public metadata | `app/(public-routes)/public-page-metadata.ts` |
| Site origin / defaults / OG | `app/constants/index.ts` (`SITE_ORIGIN`, `DEFAULT_METADATA`, `DEFAULT_OG_IMAGE_URL`) |
| SEO landers | `app/(public-routes)/(seo-content)/*` |
| About | `app/(public-routes)/(seo-content)/free-invoice-maker/page.tsx` (`APP_PATHS.ABOUT`) |
| Tool | `app/(public-routes)/create-invoice/` |
| Lander CTAs | `app/components/SeoLanderCta.tsx` |

---

## Prioritized action plan

### Critical

- [x] **Unify host** — www everywhere (sitemap, robots `Host`, `SITE_ORIGIN` / `NEXT_PUBLIC_APP_URL`, OG, canonicals). Live redirects already favor **www**.
- [x] **Add self-canonicals** per page via `alternates.canonical` in metadata helpers.
- [x] **Clean sitemap excludes** — `/dashboard*` via `transform`, plus auth/utility excludes; regenerated committed XML.
- [x] **Untangle cannibalization** — About stays `/free-invoice-maker`; FIG owns head term; tool is `/create-invoice` with `/invoice-builder` 301.

### High impact

- [x] **CTAs + internal links** from SEO landers → `/create-invoice` (`SeoLanderCta`; Extra A).
- [x] **301 duplicate tool URL** — `/invoice-builder` → `/create-invoice`; route deleted.
- [ ] **JSON-LD** — FAQPage on landers; Organization + WebSite on homepage; SoftwareApplication for the tool. Validate with [Rich Results Test](https://search.google.com/test/rich-results). *(Deferred by plan.)*
- [x] **Fix `og:url`** to page-specific absolute URLs (not site root).

### Quick wins

- [x] Single H1 on homepage (demote Zoho comparison to H2; Extra C).
- [x] Rewrite `/free-invoice-maker` About metadata (path kept; About-intent title/description + light body).
- [x] Expand one-word FAQ answers (“Yes.” / “PDF.”; Extra D).
- [ ] Resubmit sitemap in Google Search Console after deploy.

### Longer term

- [ ] Content cluster plan + refresh overlapping blog posts.
- [ ] Expand comparison/alternative pages carefully (Zoho table already on homepage).
- [ ] Core Web Vitals in PSI + GSC (verify manually).
- [ ] Ad relocation below first useful content / CTA on SEO landers *(deferred by plan).*

---

## Technical findings

### 1. www vs non-www host mismatch — Critical — Done

**Issue:** Live site 308s `invomaker.com` → `www.invomaker.com`, but robots, sitemap index, sitemap `<loc>`s, and most `og:url` values used `https://invomaker.com` (no www).

**Fix applied:** Canonical host locked to www. `SITE_ORIGIN`, `next-sitemap` `siteUrl`, robots `Host`/`Sitemap`, and metadata fallbacks use `https://www.invomaker.com`. Set Vercel `NEXT_PUBLIC_APP_URL` to match at deploy.

---

### 2. No self-referencing canonical tags — Critical — Done

**Issue:** Homepage, FIG, create-invoice, About, etc. lacked `<link rel="canonical">`.

**Fix applied:** `buildPublicPageMetadata({ …, path })` sets `alternates.canonical` + `openGraph.url`; homepage, blog articles, About, and thin layouts (contact/privacy/terms/support/tools) covered.

---

### 3. Sitemap includes disallowed / private URLs — Critical — Done

**Issue:** Live `sitemap-0.xml` included dashboard/utility URLs while robots Disallowed them.

**Fix applied:** `next-sitemap` `transform` returns `null` for `/dashboard*`; excludes expanded; committed sitemap regenerated (www locs; no invoice-builder; About priority 0.5).

---

### 4. Zero structured data — High — Deferred

**Issue:** No `application/ld+json` on homepage or landers.

**Status:** Out of scope for Critical + A/C/D pass. Revisit after FAQ copy and lander CTAs are live.

---

### 5. Broken OG URL pattern — High — Done

**Issue:** Helper set `openGraph.url` to site root for every page.

**Fix applied:** Page path passed into helper; `og:url` and canonical are absolute page URLs on www.

---

### 6. Homepage has two H1s — Medium — Done

**Issue:** HomeHero H1 plus Zoho comparison badge as H1.

**Fix applied:** Zoho comparison heading demoted to H2 in `ZohoInvoiceCompare.tsx` (Extra C).

---

## On-page findings

### 7. Keyword cannibalization cluster — Critical — Done (map locked)

| Intent | Primary URL |
|--------|-------------|
| Head “free invoice generator” | `/free-invoice-generator` |
| Tool / create PDF | `/create-invoice` (301 from `/invoice-builder`) |
| About | `/free-invoice-maker` (path kept; About-intent metadata) |
| Blog how-tos | Informational only; link up to primary tool page |

---

### 8. `/free-invoice-maker` is a mismatched About page — Critical — Done

**Issue:** About Us lived at a generator URL with generator-intent meta.

**Fix applied:** Kept path; About-intent title/description + light body; `APP_PATHS.ABOUT` → `/free-invoice-maker`; footer/nav use that constant; sitemap priority 0.5.

---

### 9. SEO landers don’t link to the product in the body — High — Done

**Issue:** Landers had no in-content CTAs to the tool.

**Fix applied:** `SeoLanderCta` on FIG, freelancer, consultant, and USA-Canada landers → `/create-invoice` (Extra A).

---

### 10. Near-duplicate tool URLs — High — Done

**Issue:** `/create-invoice` and `/invoice-builder` were both product surfaces.

**Fix applied:** Permanent redirect in `next.config.ts`; invoice-builder route deleted.

---

### 11. Thin FAQ answers on landers — Medium — Done

**Issue:** Stub answers like “Yes.” / “PDF.” on FIG FAQ.

**Fix applied:** Expanded to 2–4 sentence answers on the four SEO landers (Extra D). No FAQ schema yet.

---

### 12. Title / description quality gaps — Medium

**Issues:**
- Heavy em dashes in titles (AI-writing tell)
- Invoice-builder title missing space before `|` *(moot — route removed)*
- FIM description not CTR-oriented *(About-intent rewrite shipped)*

**Fix (remaining):** Unique ~50–60 char titles, ~150–160 char value-led descriptions; brand at end; cut remaining em-dash tells on landers/blog.

---

## Content findings

### 13. Templated programmatic SEO pages — Medium

**Issue:** Freelancer / consultant / USA-Canada landers share the same skeleton with heavy em-dash usage.

**Fix:** Differentiate with real examples, screenshots, sample invoice snippets, locale-specific tax notes; cut formulaic fillers. See `.claude/skills/seo-audit/references/ai-writing.md`.

---

### 14. Ads above the fold on SEO landers — Medium — Deferred

**Issue:** AdSense banner sits directly under the H1 on `/free-invoice-generator`.

**Status:** Out of scope for this pass. Move ads below first useful content block / CTA later.

---

### 15. Thin blog corpus — Medium / long-term

**Issue:** ~5 posts, several overlapping “how to create invoice / free generator”.

**Fix:** Cluster around freelancers, tax/VAT, payment reminders, vs alternatives — each post links to one primary product URL.

---

### 16. E-E-A-T gaps — Medium

**Issue:** About page was generic; no author bios on blog; limited trust proof beyond product claims.

**Partial:** About metadata/body light pass done. Still need author bylines, original screenshots/data. Contact/privacy/terms exist.

---

## What’s already working

- Unique titles/descriptions on most public layouts via `buildPublicPageMetadata`
- Self-canonicals + page-specific `og:url` on public indexable pages
- www host consistency in robots, sitemap, and metadata constants
- `robots.txt` correctly Disallows `/dashboard`, `/auth`, `/signup`
- HTTPS + HSTS on Vercel
- `lang="en"` on root layout
- Viewport configured; responsive public shell
- SEO landers for clear keyword themes + CTAs into `/create-invoice`
- Homepage title/description are solid brand + benefit messaging; single H1

---

## Suggested keyword map

| Primary keyword | Target URL | Status |
|-----------------|------------|--------|
| free invoice generator | `/free-invoice-generator` | Canonical + CTAs + expanded FAQs |
| create invoice online / PDF maker | `/create-invoice` | Tool live; `/invoice-builder` 301s here |
| freelancer invoice generator | `/freelancer-invoice-generator` | Exists + CTAs |
| consultant invoice generator | `/consultant-invoice-generator` | Exists + CTAs |
| invoice generator USA / Canada | `/invoice-generator-usa-canada` | Exists + CTAs |
| About Invomaker | `/free-invoice-maker` | About-intent metadata; path kept |

---

## Open questions (fill in when known)

1. Which keywords matter most right now (head term vs freelancer/consultant/geo)?
2. Search Console access? (coverage, queries, CWV)
3. Any recent domain / www migration or redesign?
4. Top organic competitors?
5. Current organic traffic baseline (and whether it dropped)?

---

## References

- Audit skill: `.claude/skills/seo-audit/SKILL.md`
- AI writing patterns to avoid: `.claude/skills/seo-audit/references/ai-writing.md`
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
