/**
 * HesLab Production-Ready Centralized Analytics & Acquisition Funnel Tracker
 * Built on top of PostHog with strict event taxonomy, acquisition attribution,
 * conservative privacy safeguards, and zero-PII exposure.
 */

import posthog from 'posthog-js';

// ============================================================================
// Types & Taxonomy
// ============================================================================

export type CanonicalCtaName =
  | 'start_a_project'
  | 'get_a_project_quote'
  | 'lets_work_together'
  | 'claim_calculator_quote'
  | 'view_pricing'
  | 'view_work';

export type CtaLocation =
  | 'hero'
  | 'service'
  | 'service_hero'
  | 'service_pricing'
  | 'service_footer'
  | 'resource'
  | 'work'
  | 'footer'
  | 'navigation'
  | 'navigation_mobile'
  | 'about'
  | 'calculator';

export type PageType =
  | 'home'
  | 'services'
  | 'service_detail'
  | 'work'
  | 'work_detail'
  | 'resources'
  | 'resource_detail'
  | 'about'
  | 'contact'
  | 'calculator'
  | 'not_found'
  | 'other';

export type AnalyticsEventType =
  | 'page_view'
  | 'service_view'
  | 'resource_view'
  | 'work_view'
  | 'primary_cta_click'
  | 'contact_start'
  | 'contact_submit'
  | 'quote_request'
  | 'outbound_email_click'
  | 'content_discovery_click';

export interface PageViewPayload {
  page_type: PageType;
  page_path: string;
  page_title?: string;
  service_slug?: string;
  work_slug?: string;
  resource_slug?: string;
  resource_category?: string;
  [key: string]: unknown;
}

export interface ServiceViewPayload {
  service_slug: string;
  service_name: string;
  service_type?: string;
  page_path: string;
  [key: string]: unknown;
}

export interface ResourceViewPayload {
  resource_slug: string;
  resource_title: string;
  resource_category: string;
  resource_intent?: string;
  funnel_stage?: string;
  target_audience?: string;
  target_topic?: string;
  page_path: string;
  [key: string]: unknown;
}

export interface WorkViewPayload {
  work_slug: string;
  work_title: string;
  work_type: string;
  service_type?: string;
  page_path: string;
  [key: string]: unknown;
}

export interface PrimaryCtaPayload {
  cta_name: CanonicalCtaName | string;
  cta_location: CtaLocation | string;
  page_path: string;
  page_type?: PageType;
  service_slug?: string;
  resource_slug?: string;
  work_slug?: string;
  [key: string]: unknown;
}

export interface ContactStartPayload {
  form_type: 'project_inquiry' | string;
  page_path: string;
  [key: string]: unknown;
}

export interface ContactSubmitPayload {
  form_type: 'project_inquiry' | string;
  service_interest: string;
  video_count: string;
  has_footage_link: boolean;
  page_path: string;
  [key: string]: unknown;
}

export interface QuoteRequestPayload {
  service_interest: string;
  video_count?: string;
  estimated_clips?: number;
  inquiry_source: 'contact_page' | 'opportunity_calculator' | string;
  page_path: string;
  [key: string]: unknown;
}

export interface OutboundEmailPayload {
  destination_type: 'direct_email';
  cta_location: 'contact_page_direct_email' | 'footer' | string;
  page_path: string;
  [key: string]: unknown;
}

export interface ContentDiscoveryPayload {
  discovery_type: 'resource_to_service' | 'work_to_service' | 'service_to_work' | 'service_to_resource';
  from_type: 'resource' | 'work' | 'service';
  from_slug: string;
  to_type: 'resource' | 'work' | 'service';
  to_slug: string;
  page_path: string;
  [key: string]: unknown;
}

export interface AnalyticsEventPayload {
  path?: string;
  serviceId?: string;
  workId?: string | number;
  resourceSlug?: string;
  source?: string;
  tier?: string;
  [key: string]: unknown;
}

// ============================================================================
// PostHog Configuration & Initialization
// ============================================================================

let isPostHogInitialized = false;

/**
 * Safely resolves the PostHog API Key from Vite env variables.
 */
function getPostHogKey(): string | undefined {
  return import.meta.env.VITE_PUBLIC_POSTHOG_KEY || import.meta.env.VITE_POSTHOG_KEY;
}

/**
 * Safely resolves the PostHog Host from Vite env variables (defaults to Cloud US).
 */
function getPostHogHost(): string {
  return (
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST ||
    import.meta.env.VITE_POSTHOG_HOST ||
    'https://us.i.posthog.com'
  );
}

/**
 * Initialize PostHog client safely.
 * Non-blocking, fault-tolerant, and SSR/SSG/AdBlock safe.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || isPostHogInitialized) return;

  const apiKey = getPostHogKey();
  const apiHost = getPostHogHost();

  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.info(
        '[HesLab Analytics] PostHog API key is not configured. Analytics events will be logged in console only.'
      );
    }
    return;
  }

  try {
    posthog.init(apiKey, {
      api_host: apiHost,
      // We manage client-side SPA route pageviews explicitly to prevent duplicates
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage+cookie',
      respect_dnt: true,
      // Session Replay Conservative Privacy Configuration (Section 19)
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          color: false,
          date: false,
          'datetime-local': false,
          email: true,
          month: false,
          number: false,
          range: false,
          search: false,
          tel: true,
          text: true,
          time: false,
          url: false,
          week: false,
        },
        maskTextSelector: '[data-ph-mask]',
      },
      loaded: () => {
        isPostHogInitialized = true;
        if (import.meta.env.DEV) {
          console.debug('[HesLab Analytics] PostHog SDK initialized successfully.');
        }
      },
    });
    isPostHogInitialized = true;
  } catch (err) {
    console.warn('[HesLab Analytics] Failed to initialize PostHog SDK:', err);
  }
}

// ============================================================================
// Core Analytics Interface
// ============================================================================

export const analytics = {
  /**
   * Track a custom event through PostHog and peripheral channels.
   */
  track(event: AnalyticsEventType | string, properties: Record<string, unknown> = {}): void {
    if (typeof window === 'undefined') return;

    const enrichedProps = {
      ...properties,
      timestamp: new Date().toISOString(),
      page_path: properties.page_path || window.location.pathname,
    };

    if (import.meta.env.DEV) {
      console.debug(`[HesLab Analytics] ${event}:`, enrichedProps);
    }

    // 1. PostHog Event
    try {
      if (isPostHogInitialized) {
        posthog.capture(event, enrichedProps);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn(`[HesLab Analytics] PostHog track error (${event}):`, err);
      }
    }

    // 2. Google Tag Manager / GA4 DataLayer fallback
    try {
      const win = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({ event, ...enrichedProps });
      }
    } catch {
      // Ignore if dataLayer is unavailable
    }

    // 3. Custom DOM Event for extensible integrations
    try {
      window.dispatchEvent(
        new CustomEvent('heslab:event', {
          detail: { event, ...enrichedProps },
        })
      );
    } catch {
      // Ignore in unsupported environments
    }
  },

  /**
   * Record a pageview in PostHog.
   */
  pageView(path: string, properties: Record<string, unknown> = {}): void {
    if (typeof window === 'undefined') return;

    const payload: Record<string, unknown> = {
      $current_url: window.location.href,
      page_path: path || window.location.pathname,
      page_title: document.title,
      ...properties,
    };

    if (import.meta.env.DEV) {
      console.debug(`[HesLab Analytics] page_view:`, payload);
    }

    try {
      if (isPostHogInitialized) {
        // Native PostHog pageview event
        posthog.capture('$pageview', payload);
        // Custom snake_case event for unified taxonomy
        posthog.capture('page_view', payload);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[HesLab Analytics] PostHog pageView error:', err);
      }
    }

    // Dispatch DOM event & dataLayer
    try {
      const win = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({ event: 'page_view', ...payload });
      }
      window.dispatchEvent(new CustomEvent('heslab:event', { detail: { event: 'page_view', ...payload } }));
    } catch {
      // Ignore
    }
  },

  /**
   * Associate an ID with a user. (Used only when qualified conversion happens).
   */
  identify(distinctId: string, properties?: Record<string, unknown>): void {
    try {
      if (isPostHogInitialized) {
        posthog.identify(distinctId, properties);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[HesLab Analytics] PostHog identify error:', err);
      }
    }
  },

  /**
   * Reset user identity and session.
   */
  reset(): void {
    try {
      if (isPostHogInitialized) {
        posthog.reset();
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[HesLab Analytics] PostHog reset error:', err);
      }
    }
  },

  /**
   * Capture a handled frontend error without throwing.
   */
  captureError(error: unknown, context: Record<string, unknown> = {}): void {
    if (import.meta.env.DEV) {
      console.error('[HesLab Analytics Error]:', error, context);
    }
    try {
      if (isPostHogInitialized) {
        if (typeof posthog.captureException === 'function') {
          posthog.captureException(error, { extra: context });
        } else {
          posthog.capture('$exception', {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            ...context,
          });
        }
      }
    } catch {
      // Non-blocking
    }
  },

  // --------------------------------------------------------------------------
  // Strongly Typed Event Helpers
  // --------------------------------------------------------------------------

  trackPageView(payload: PageViewPayload): void {
    this.pageView(payload.page_path, payload);
  },

  trackServiceView(payload: ServiceViewPayload): void {
    this.track('service_view', payload);
  },

  trackResourceView(payload: ResourceViewPayload): void {
    this.track('resource_view', payload);
  },

  trackWorkView(payload: WorkViewPayload): void {
    this.track('work_view', payload);
  },

  trackPrimaryCta(payload: PrimaryCtaPayload): void {
    this.track('primary_cta_click', payload);
  },

  trackContactStart(payload: ContactStartPayload): void {
    this.track('contact_start', payload);
  },

  trackContactSubmit(payload: ContactSubmitPayload): void {
    this.track('contact_submit', payload);
  },

  trackQuoteRequest(payload: QuoteRequestPayload): void {
    this.track('quote_request', payload);
  },

  trackOutboundEmail(payload: OutboundEmailPayload): void {
    this.track('outbound_email_click', payload);
  },

  trackContentNavigation(payload: ContentDiscoveryPayload): void {
    this.track('content_discovery_click', payload);
  },

  getPostHogClient(): typeof posthog | null {
    return isPostHogInitialized ? posthog : null;
  },
};

// ============================================================================
// Backwards Compatibility Bridge
// ============================================================================

/**
 * Backwards compatible trackEvent bridge used across existing components.
 * Automatically normalizes legacy property names to canonical snake_case.
 */
export function trackEvent(event: AnalyticsEventType, payload: AnalyticsEventPayload = {}): void {
  const normalized: Record<string, unknown> = { ...payload };

  // Normalize legacy keys
  if (payload.serviceId) {
    normalized.service_slug = payload.serviceId;
    delete normalized.serviceId;
  }
  if (payload.workId) {
    normalized.work_slug = String(payload.workId);
    delete normalized.workId;
  }
  if (payload.resourceSlug) {
    normalized.resource_slug = payload.resourceSlug;
    delete normalized.resourceSlug;
  }
  if (payload.source && !normalized.cta_location) {
    normalized.cta_location = payload.source;
  }

  analytics.track(event, normalized);
}
