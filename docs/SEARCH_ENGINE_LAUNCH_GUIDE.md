# 🚀 HesLab Search Engine & Webmaster Launch Guide

This document explains the steps to connect Google Search Console, Bing Webmaster Tools, and AI discovery engines (ChatGPT Search, Microsoft Copilot, Google AI Overviews) once the final production domain is connected.

---

## 1. Single Source of Truth: Canonical Domain Configuration

The entire SEO, sitemap, robots, Open Graph, and JSON-LD schema layers derive from a single configuration variable.

### Setting your production domain:
When deploying to production (e.g. Vercel, Netlify, Cloudflare Pages, VPS, Nginx), set the environment variable:

```bash
VITE_SITE_URL=https://your-final-domain.com
```

### Where it lives in the codebase:
- File: [`src/config/site.ts`](file:///c:/Users/NoteBook/Desktop/Hesam/Heslab/src/config/site.ts)
- Generator script: [`scripts/generate-seo.cjs`](file:///c:/Users/NoteBook/Desktop/Hesam/Heslab/scripts/generate-seo.cjs)

Changing `VITE_SITE_URL` updates:
* Canonical tags on all 19 indexable pages
* Open Graph and Twitter card absolute URLs
* Dynamic `public/sitemap.xml`
* `public/robots.txt` Sitemap reference
* All JSON-LD structured data schemas (`WebSite`, `Organization`, `Service`, `Article`, `VideoObject`, `BreadcrumbList`)
* Machine-readable `public/seo-manifest.json`

---

## 2. Publicly Accessible Endpoints

The following files are generated automatically in the `public/` root during `npm run build`:

1. **XML Sitemap**: `https://your-final-domain.com/sitemap.xml`
   - Covers all public pages, services, articles, and portfolio case studies.
   - Formatted with ISO 8601 `<lastmod>` dates and priorities.

2. **Robots.txt**: `https://your-final-domain.com/robots.txt`
   - Unblocks search engines and explicitly welcomes `Googlebot`, `Bingbot`, `OAI-SearchBot`, and `ChatGPT-User`.
   - References the canonical sitemap.

3. **SEO Manifest**: `https://your-final-domain.com/seo-manifest.json`
   - Machine-readable manifest tracking search intents, content clusters, and canonical mappings.

---

## 3. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property (e.g. `your-final-domain.com`) or **URL prefix** (`https://your-final-domain.com`).
3. Verification Methods:
   - **Recommended (Domain)**: Add the provided DNS TXT record at your domain registrar.
   - **Alternative (URL prefix)**: Upload the verification HTML file into `public/` or paste the HTML meta tag into `index.html`.
4. Submit the Sitemap:
   - In the left sidebar, click **Sitemaps**.
   - Under "Add a new sitemap", type: `sitemap.xml`
   - Click **Submit**.
5. Test URL Inspection:
   - Inspect `/` and `/services/short-form-video-editing` to confirm Googlebot renders the page and detects the structured data without errors.

---

## 4. Bing Webmaster Tools & AI Copilot Integration

Bing powers search discovery across Bing Search, Microsoft Copilot, and Windows Search.

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in and select **Import from Google Search Console** (fastest method) or enter your site URL manually.
3. Submit the Sitemap:
   - Navigate to **Sitemaps** -> **Submit sitemap**.
   - Enter: `https://your-final-domain.com/sitemap.xml`
4. Monitor **Bing AI Performance Reporting**:
   - Bing Webmaster Tools includes reporting for impressions and citations within Microsoft Copilot and AI experiences. Check this monthly to track how HesLab is cited for short-form video editing queries.

---

## 5. ChatGPT Search & AI-Engine Discoverability

HesLab's robots.txt explicitly allows:
- `OAI-SearchBot` (OpenAI's search crawler for ChatGPT Search)
- `ChatGPT-User` (User queries initiating live browsing in ChatGPT)

Because HesLab provides crawlable semantic HTML, answer-first paragraphs, and clear entity definitions (`Organization` & `Service` schemas), queries such as:
> "Who provides high-retention short-form video editing for creators?"
will naturally retrieve HesLab's service pillar pages.

---

## 6. Automated Validation Script

To verify that your site has zero SEO regressions before every deployment, run:

```bash
npm run validate:seo
# or
pnpm run validate:seo
```

This verifies:
- All indexable routes have titles and descriptions
- No duplicate titles
- Canonicals match `SITE_URL`
- Sitemap and robots.txt exist and are valid
- No forbidden localhost references in metadata
- Key media assets and poster images exist on disk

---

## 7. Acquisition Funnel Event Tracking

HesLab includes a centralized, privacy-friendly event tracker in [`src/lib/analytics.ts`](file:///c:/Users/NoteBook/Desktop/Hesam/Heslab/src/lib/analytics.ts).

The acquisition funnel tracks:
* `page_view`
* `service_view`
* `work_view`
* `resource_view`
* `contact_start`
* `contact_submit`
* `quote_request`
* `outbound_email_click`
* `primary_cta_click`

If you add Google Analytics 4 (GA4) or Plausible later, simply plug the measurement script into `index.html`. The event tracker automatically pushes into `window.dataLayer`.
