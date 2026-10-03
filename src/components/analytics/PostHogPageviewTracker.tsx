import { useEffect, useRef, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics, type PageType } from '../../lib/analytics';

/**
 * Resolves semantic PageType from route path.
 */
export function getPageTypeFromPath(pathname: string): {
  pageType: PageType;
  slug?: string;
} {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/') {
    return { pageType: 'home' };
  }
  if (cleanPath === '/services') {
    return { pageType: 'services' };
  }
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    return { pageType: 'service_detail', slug };
  }
  if (cleanPath === '/work') {
    return { pageType: 'work' };
  }
  if (cleanPath.startsWith('/work/')) {
    const slug = cleanPath.replace('/work/', '');
    return { pageType: 'work_detail', slug };
  }
  if (cleanPath === '/resources' || cleanPath === '/blog') {
    return { pageType: 'resources' };
  }
  if (cleanPath.startsWith('/resources/') || cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace(/^\/(?:resources|blog)\//, '');
    return { pageType: 'resource_detail', slug };
  }
  if (cleanPath === '/about') {
    return { pageType: 'about' };
  }
  if (cleanPath === '/contact') {
    return { pageType: 'contact' };
  }

  return { pageType: 'other' };
}

/**
 * React Router listener that automatically tracks page views across SPA navigations.
 * Guards against React 18 Strict Mode double-firing and hydration remounts.
 */
export const PostHogPageviewTracker: FC = () => {
  const location = useLocation();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = `${location.pathname}${location.search}`;

    // Deduplicate consecutive identical route views (e.g. React Strict Mode in dev)
    if (lastTrackedPathRef.current === fullPath) {
      return;
    }
    lastTrackedPathRef.current = fullPath;

    const { pageType, slug } = getPageTypeFromPath(location.pathname);

    // Allow document.title to update via SEOHead before capturing
    const timer = setTimeout(() => {
      analytics.trackPageView({
        page_type: pageType,
        page_path: location.pathname,
        page_title: document.title,
        ...(pageType === 'service_detail' && slug ? { service_slug: slug } : {}),
        ...(pageType === 'work_detail' && slug ? { work_slug: slug } : {}),
        ...(pageType === 'resource_detail' && slug ? { resource_slug: slug } : {}),
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
};

export default PostHogPageviewTracker;
