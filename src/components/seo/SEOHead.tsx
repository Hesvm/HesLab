import { FC, useEffect } from 'react';
import { SITE_CONFIG, getCanonicalUrl, getAbsoluteAssetUrl } from '../../config/site';
import { JsonLd } from './JsonLd';

export interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.other';
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  jsonLdId?: string;
}

export const SEOHead: FC<SEOHeadProps> = ({
  title,
  description,
  path = '/',
  ogImage,
  ogType = 'website',
  noindex = false,
  structuredData,
  jsonLdId = 'page-schema',
}) => {
  const canonicalUrl = getCanonicalUrl(path);
  const fullTitle = title.includes(SITE_CONFIG.brandName)
    ? title
    : `${title} | ${SITE_CONFIG.brandName}`;
  const resolvedOgImage = ogImage
    ? getAbsoluteAssetUrl(ogImage)
    : SITE_CONFIG.defaultOgImage;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to create or update meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to create or update link tags
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('property', 'og:site_name', SITE_CONFIG.brandName);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', resolvedOgImage);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', resolvedOgImage);
  }, [fullTitle, description, canonicalUrl, resolvedOgImage, ogType, noindex]);

  return structuredData ? <JsonLd data={structuredData} id={jsonLdId} /> : null;
};

export default SEOHead;
