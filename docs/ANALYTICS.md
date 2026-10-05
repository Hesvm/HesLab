# HesLab Analytics & PostHog Production Implementation Guide

This document is the single source of truth for analytics, traffic attribution, user intent tracking, conversion funnels, and privacy safeguards across the **HesLab** web application.

---

## 1. PostHog Installation & Architecture

HesLab uses **`posthog-js`** (`^1.435.6`) configured specifically for a high-performance **Vite + React Router (SPA)** environment.

### Client-Side Boundaries & SSR/SSG Safety
- **Framework**: Vite + React 18 SPA + React Router v7.
- **Safety**: PostHog initialization guards against non-browser environments (`typeof window === 'undefined'`) and prevents duplicate initializations through a module-level lock (`isPostHogInitialized`).
- **Zero Blocking**: The PostHog SDK loads asynchronously without blocking initial paint or user interactions. If network requests to PostHog fail or an ad blocker is present, all user-facing features and form submissions continue operating without interruption.
- **Single Client Instance**: PostHog is initialized once at startup in `src/main.tsx` through `initAnalytics()`. No duplicate client instances are created.

---

## 2. Environment Variables

PostHog configuration is driven entirely by environment variables. No API keys, hosts, or tokens are hardcoded.

In Vite, client-accessible variables use the `VITE_` prefix:

```env
# HesLab PostHog Analytics Environment Configuration
# Project API Key from your PostHog Project Settings (starts with phc_...)
VITE_PUBLIC_POSTHOG_KEY=phc_your_posthog_project_api_key_here

# PostHog Ingestion Host
# Cloud US: https://us.i.posthog.com
# Cloud EU: https://eu.i.posthog.com
# Or your custom reverse-proxy domain
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

*Note: The system also recognizes `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` as drop-in fallbacks.*

A template file [`.env.example`](../.env.example) is provided in the repository root. Real `.env` and `.env.local` files are ignored in [`.gitignore`](../.gitignore).

---

## 3. Central Analytics Layer (`src/lib/analytics.ts`)

Direct, raw calls to `posthog.capture` are strictly avoided in UI components. All tracking flows through the centralized analytics layer in `src/lib/analytics.ts`.

### Core API:
- `initAnalytics()`: Bootstraps PostHog with strict privacy and capture settings.
- `analytics.track(eventName, properties)`: Unified custom event dispatcher.
- `analytics.pageView(path, properties)`: Dispatches `$pageview` and `page_view` with deduplication.
- `analytics.identify(distinctId, properties)`: Associates an ID with qualified leads.
- `analytics.reset()`: Resets anonymous distinct IDs.
- `analytics.captureError(error, context)`: Reports handled frontend errors.

### Strongly-Typed Domain Trackers:
```ts
analytics.trackPageView(payload);
analytics.trackServiceView(payload);
analytics.trackResourceView(payload);
analytics.trackWorkView(payload);
analytics.trackPrimaryCta(payload);
analytics.trackContactStart(payload);
analytics.trackContactSubmit(payload);
analytics.trackQuoteRequest(payload);
analytics.trackOutboundEmail(payload);
analytics.trackContentNavigation(payload);
```

### Extensibility & Backwards Compatibility
- **DOM Event Bridge**: Dispatches `window.dispatchEvent(new CustomEvent('heslab:event', { detail }))` for downstream tools.
- **DataLayer Fallback**: Pushes to `window.dataLayer` if Google Tag Manager / GA4 is present.
- **`trackEvent()` Bridge**: Automatically normalizes legacy property names (e.g. `serviceId` -> `service_slug`, `workId` -> `work_slug`).

---

## 4. Canonical Event Taxonomy

All events follow strict `snake_case` naming conventions. We favor a compact, high-value taxonomy over dozens of noisy micro-events.

| Event | Meaning | Important Properties | Trigger Location |
| :--- | :--- | :--- | :--- |
| `page_view` | Meaningful route navigation | `page_type`, `page_path`, `page_title`, `service_slug`, `work_slug`, `resource_slug` | `PostHogPageviewTracker` on route change |
| `service_view` | Service pillar page viewed | `service_slug`, `service_name`, `service_type`, `page_path` | `ServicePillarPage.tsx` mount |
| `resource_view` | Journal/guide article viewed | `resource_slug`, `resource_title`, `resource_category`, `resource_intent`, `funnel_stage`, `target_audience`, `target_topic`, `page_path` | `ResourceDetailPage.tsx` mount |
| `work_view` | Portfolio item breakdown viewed | `work_slug`, `work_title`, `work_type`, `service_type`, `page_path` | `ProjectDetailPage.tsx` mount |
| `primary_cta_click` | Click on major conversion action | `cta_name`, `cta_location`, `page_path`, `page_type`, `service_slug`, `work_slug` | Navbar, Hero, Service pages, Work detail, Footer |
| `contact_start` | User begins filling inquiry form | `form_type`, `page_path` | `ContactPage.tsx` first field focus |
| `contact_submit` | Technical successful form submit | `form_type`, `service_interest`, `video_count`, `has_footage_link`, `page_path` | `ContactPage.tsx` on valid submission |
| `quote_request` | Business-qualified inquiry created | `service_interest`, `video_count`, `inquiry_source`, `page_path` | `ContactPage.tsx` & `ContentOpportunityCalculator.tsx` |
| `outbound_email_click`| User clicked direct `mailto:` link | `destination_type`, `cta_location`, `page_path` | `ContactPage.tsx` direct contact card |
| `content_discovery_click` | Cross-content navigation | `discovery_type`, `from_type`, `from_slug`, `to_type`, `to_slug`, `page_path` | Related service/resource links |

### Forbidden Events (Do NOT Create)
- `button_clicked`, `div_clicked`, `section_viewed`
- `mouse_moved`, `animation_played`, `scroll_depth_50%`, `input_blurred`
*Autocapture handles exploratory interaction discovery without bloating custom event data.*

---

## 5. Automatic Pageview Tracking & Deduplication

In client-side SPAs, native browser reloads do not occur on internal navigation. HesLab solves this with `PostHogPageviewTracker`:

1. **`capture_pageview: false`** in `posthog.init()` disables PostHog's default pageview tracker, which would otherwise conflict with SPA navigation or fire on unrendered states.
2. **`PostHogPageviewTracker.tsx`** listens to `react-router-dom`'s `useLocation()`.
3. **Strict Deduplication**: Uses a `lastTrackedPathRef` ref to compare `${pathname}${search}`. Consecutive duplicate calls caused by **React 18 Strict Mode** or parent component re-renders are completely filtered out.
4. **Title Synchronization**: Schedules tracking in a microtask timer so `SEOHead` updates `document.title` before the event is captured.

---

## 6. Acquisition & UTM Attribution

PostHog automatically extracts and persists acquisition parameters across sessions:
- First-touch attribution (`$initial_referrer`, `$initial_current_url`, `$initial_utm_source`, etc.) is retained in person properties.
- Current-session attribution (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) is captured per event.
- Internal navigation **never overwrites** first-touch source values.

### Verified URL Test Patterns:
- `?utm_source=x&utm_medium=social&utm_campaign=heslab_launch`
- `?utm_source=linkedin&utm_medium=social&utm_campaign=heslab_launch`
- `?utm_source=google&utm_medium=organic`

---

## 7. Content Intent Tracking

HesLab's Resources content model is built for search intent mapping. When an article is viewed, the following editorial metadata is attached:

```ts
resource_intent: 'informational' | 'commercial';
funnel_stage: 'top' | 'middle' | 'bottom';
target_audience: string; // e.g. 'creator', 'business'
target_topic: string; // e.g. 'Hook Psychology & Attention Retention'
```

This enables analyzing which search intent categories drive the highest downstream quote requests.

---

## 8. Conversion Funnel Architecture

The primary HesLab acquisition funnel is configured as follows:

```
Step 1: page_view (Landing Page: home, service, resource)
   ↓
Step 2: primary_cta_click (e.g. 'start_a_project', 'get_a_project_quote')
   ↓
Step 3: contact_start (First input focus on /contact)
   ↓
Step 4: contact_submit (Successful submission of form)
   ↓
Step 5: quote_request (Business conversion event)
```

### Distinction: `contact_submit` vs. `quote_request`
- **`contact_submit`**: Represents the **technical event** that the contact form was successfully validated and submitted.
- **`quote_request`**: Represents the **business conversion**. If the form represents a project quote or inquiry, `quote_request` is fired alongside it. In the `ContentOpportunityCalculator`, completing a quote estimate and clicking through to inquiry also fires `quote_request`.

---

## 9. Semantic Data Attributes

Key conversion elements carry semantic data attributes for clean autocapture identification and automated testing:

```html
<Link
  to="/contact"
  data-analytics="primary-cta"
  data-analytics-name="start_a_project"
  data-analytics-location="navigation"
>
  Start a Project
</Link>
```

Locations instrumented:
- Navbar: `data-analytics-location="navigation"`
- Mobile Menu: `data-analytics-location="navigation_mobile"`
- Hero / Final CTA: `data-analytics-location="home_final_cta"`
- Service Pages: `data-analytics-location="service_hero"`, `service_pricing"`, `"service_footer"`
- Resource Detail: `data-analytics-location="resource"`
- Work Detail: `data-analytics-location="work"`
- Contact Form: `data-analytics-location="contact_form"`
- Calculator: `data-analytics-location="calculator"`

---

## 10. Privacy & Session Replay Safeguards

HesLab serves an international audience. Conservative privacy principles are enforced by default:

1. **Input Masking**:
   All inputs are masked (`maskAllInputs: true`). Sensitive inputs (passwords, emails, phone numbers, text areas) are never recorded in plain text.
2. **Selector Masking**:
   Any element marked with `[data-ph-mask]` is blurred and excluded from Session Replay.
3. **Zero-PII Custom Events**:
   - `contact_submit` and `quote_request` **NEVER** transmit visitor names, email addresses, phone numbers, raw video links, or message bodies. Only categorical data (`projectType`, `videoCount`, `hasFootageLink: boolean`) is transmitted.
   - `outbound_email_click` transmits only the destination type (`direct_email`) and CTA location. The visitor's personal email is never logged.
4. **Do Not Track**:
   `respect_dnt: true` is configured in PostHog initialization, honoring browser privacy headers.

---

## 11. PostHog Acquisition Dashboard Specification

Create a new dashboard in PostHog titled: **`HesLab — Acquisition`**.

### Dashboard Widgets:

#### 1. Traffic & Acquisition
- **Total Pageviews & Unique Visitors** (Trend, 30 days)
  - Formula: Count of `page_view` + Unique `distinct_id`
- **Top Landing Pages** (Table)
  - Breakdown by `$initial_current_url`
- **Acquisition Channels** (Bar Chart)
  - Breakdown by `utm_source` / `$initial_referrer`

#### 2. Content Discovery
- **Top Service Pillars Viewed** (Bar Chart)
  - Event: `service_view`, breakdown by `service_slug`
- **Top Resources by Intent & Traffic** (Table)
  - Event: `resource_view`, properties: `resource_title`, `resource_intent`, `funnel_stage`
- **Content-to-Service Cross-Navigation** (Table)
  - Event: `content_discovery_click`, breakdown by `from_slug` → `to_slug`

#### 3. Conversion Funnel
- **Primary Inquiry Funnel** (Funnel View)
  - `page_view` → `primary_cta_click` → `contact_start` → `contact_submit` → `quote_request`
- **CTA Performance by Location** (Horizontal Bar)
  - Event: `primary_cta_click`, breakdown by `cta_location`
- **Quote Requests by Service Interest** (Pie Chart)
  - Event: `quote_request`, breakdown by `service_interest`

#### 4. Acquisition Quality
- **Conversion Rate by Acquisition Source**
  - Funnel of `utm_source` → `quote_request`
- **Conversion Rate by Content Intent**
  - `resource_view` (breakdown by `resource_intent`) → `quote_request`

---

## 12. Search Console + PostHog Synergy Playbook

Google Search Console and PostHog provide complementary perspectives on user behavior:

| Dimension | Google Search Console | PostHog |
| :--- | :--- | :--- |
| **Focus** | Pre-click (Search engine results page) | Post-click (On-site behavior & conversion) |
| **Metrics** | Queries, Impressions, Clicks, Position, CTR | Pageviews, Session duration, CTA clicks, Form submissions |
| **Question Answered** | "What queries brought people to our site?" | "Did those visitors submit a project inquiry?" |

### How to Correlate Data:
1. Export high-impression queries and destination landing pages from Google Search Console.
2. In PostHog, filter `page_view` by `page_path` matching the GSC destination URL.
3. Track the conversion rate (`quote_request` / `page_view`) for that specific page.
4. **Identify Gaps**:
   - **High Impressions (GSC) + High Clicks + Low Conversion (PostHog)**: Page needs stronger CTAs, clearer pricing guidance, or intent alignment.
   - **High Conversion (PostHog) + Low Impressions (GSC)**: High-value content that should be optimized for SEO keywords and backlinked internally.

---

## 13. Testing Analytics

Run the automated integration test suite:

```bash
npm run test:analytics
# or
pnpm test:analytics
```

This verifies:
1. PostHog package presence and module loading.
2. Contract schemas for all 10 taxonomy events.
3. Strict enforcement of zero-PII data models.
4. Correct UTM parameter extraction and session preservation.
