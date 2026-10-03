import { SITE_CONFIG, getCanonicalUrl, getAbsoluteAssetUrl } from '../config/site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface VideoSchemaData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  duration?: string; // ISO 8601 e.g. "PT35S"
}

export interface ArticleSchemaData {
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  updatedDate?: string;
  authorName: string;
  imageUrl?: string;
}

export interface ServiceSchemaData {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string;
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    inLanguage: ['fa', 'en'],
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logoUrl,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.siteUrl,
    logo: SITE_CONFIG.logoUrl,
    description: SITE_CONFIG.description,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
      jobTitle: 'Video Editor & Visual Designer',
      url: SITE_CONFIG.siteUrl,
    },
    sameAs: Object.values(SITE_CONFIG.socialLinks),
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.founder,
    jobTitle: 'Video Editor & Visual Designer',
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
    },
    url: SITE_CONFIG.siteUrl,
    description: 'Independent video editor and motion designer specializing in high-retention short-form video and creator workflows.',
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function generateServiceSchema(service: ServiceSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: getCanonicalUrl(service.path),
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
    },
    areaServed: service.areaServed || SITE_CONFIG.geographicArea,
  };
}

export function generateArticleSchema(article: ArticleSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl ? getAbsoluteAssetUrl(article.imageUrl) : SITE_CONFIG.defaultOgImage,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.authorName || SITE_CONFIG.founder,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(`/resources/${article.slug}`),
    },
  };
}

export function generateVideoSchema(video: VideoSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: getAbsoluteAssetUrl(video.thumbnailUrl),
    uploadDate: video.uploadDate,
    contentUrl: getAbsoluteAssetUrl(video.contentUrl),
    embedUrl: getAbsoluteAssetUrl(video.contentUrl),
    duration: video.duration || 'PT30S',
    creator: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
    },
  };
}
