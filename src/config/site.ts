/**
 * HesLab Canonical Site Configuration
 * Single Source of Truth for domain, brand entity, and SEO metadata.
 * 
 * Changing VITE_SITE_URL in your environment or .env updates
 * canonical URLs, Open Graph, sitemaps, robots, and JSON-LD schemas automatically.
 */

// Fallback canonical domain (production-ready format, configurable via VITE_SITE_URL)
const RAW_SITE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  'https://heslab.studio'
).trim();

// Strip any trailing slash for consistent URL composition
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

export const SITE_CONFIG = {
  brandName: 'HesLab',
  siteUrl: SITE_URL,
  founder: 'Hesam',
  email: 'hesammousavizadeh@gmail.com',
  tagline: 'Short-Form Video Editing & Motion Design Studio',
  description: 'Independent video editor and motion designer specializing in high-retention short-form video editing, Reels, TikTok, YouTube Shorts, and creator workflows.',
  descriptionFa: 'استودیو تخصصی تدوین ویدیوهای کوتاه، ریلز و شورتس، موشن گرافیک و طراحی هویت بصری برای کریتورها و برندهای پیشرو.',
  category: 'Short-form video editing & motion design',
  positioning: 'Independent video editor / visual designer',
  audience: 'Creators, YouTubers, founders, and modern brands',
  geographicArea: 'Remote / International',
  defaultOgImage: `${SITE_URL}/mock/showreel_hero.webp`,
  logoUrl: `${SITE_URL}/brand/logo_icon.png`,
  logoTypeUrl: `${SITE_URL}/brand/logo_type.svg`,
  socialLinks: {
    instagram: 'https://instagram.com/heslab',
    youtube: 'https://youtube.com/@heslab',
    twitter: 'https://twitter.com/heslab',
    linkedin: 'https://linkedin.com/company/heslab',
  },
};

/**
 * Returns a normalized canonical URL for any internal route path.
 */
export function getCanonicalUrl(path = '/'): string {
  if (!path || path === '/') {
    return SITE_URL;
  }
  // Ensure path starts with / and remove any trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const trimmed = cleanPath.replace(/\/+$/, '');
  return `${SITE_URL}${trimmed}`;
}

/**
 * Returns full asset URL based on SITE_URL
 */
export function getAbsoluteAssetUrl(relativePath: string): string {
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  const clean = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return `${SITE_URL}${clean}`;
}
