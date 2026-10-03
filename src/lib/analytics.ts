/**
 * HesLab Centralized Analytics & Acquisition Funnel Tracker
 * Minimal, privacy-friendly event tracking utility.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'service_view'
  | 'work_view'
  | 'resource_view'
  | 'contact_start'
  | 'contact_submit'
  | 'quote_request'
  | 'outbound_email_click'
  | 'primary_cta_click';

export interface AnalyticsEventPayload {
  path?: string;
  serviceId?: string;
  workId?: string | number;
  resourceSlug?: string;
  source?: string;
  tier?: string;
  [key: string]: unknown;
}

export function trackEvent(event: AnalyticsEventType, payload: AnalyticsEventPayload = {}): void {
  if (typeof window === 'undefined') return;

  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    path: payload.path || window.location.pathname,
    ...payload,
  };

  // Safe developer log in development mode
  if (import.meta.env.DEV) {
    console.debug(`[HesLab Analytics] ${event}:`, eventData);
  }

  // Push to dataLayer if Google Tag Manager / GA4 is present
  try {
    const win = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push(eventData);
    }
  } catch {
    // Silent fail if dataLayer is not configured
  }

  // Dispatch custom event for extensible client integration (Plausible / PostHog)
  try {
    window.dispatchEvent(new CustomEvent('heslab:event', { detail: eventData }));
  } catch {
    // Ignore in unsupported environments
  }
}
