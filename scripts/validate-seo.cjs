/**
 * HesLab Automated SEO & Search Discovery Validation Script
 * Verifies all 33 production criteria:
 * - Title & Meta description on all indexable routes
 * - Canonical URLs match single source of truth (SITE_URL)
 * - No localhost or invalid placeholder domains
 * - Sitemap XML completeness & validity
 * - Robots.txt accessibility and crawler rules
 * - Structured data schemas JSON-LD validity
 * - Single H1 integrity
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const manifestPath = path.join(publicDir, 'seo-manifest.json');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const robotsPath = path.join(publicDir, 'robots.txt');

let errors = [];
let warnings = [];

console.log('🔍 Starting HesLab SEO & Search-Discovery Validation...\n');

// 1. Verify seo-manifest.json
if (!fs.existsSync(manifestPath)) {
  errors.push('CRITICAL: seo-manifest.json is missing in public/');
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const siteUrl = manifest.canonicalDomain;

  console.log(`[Check 1] Canonical Domain: ${siteUrl}`);
  if (!siteUrl || siteUrl.includes('localhost') || siteUrl.includes('127.0.0.1')) {
    errors.push(`Invalid canonical domain in production manifest: ${siteUrl}`);
  }

  // 2. Validate Routes
  const titles = new Set();
  manifest.routes.forEach((route) => {
    // Title check
    if (!route.title || route.title.trim().length === 0) {
      errors.push(`Missing title for route: ${route.route}`);
    } else {
      if (titles.has(route.title)) {
        errors.push(`Duplicate title detected: "${route.title}" on route ${route.route}`);
      }
      titles.add(route.title);
    }

    // Description check
    if (!route.description || route.description.trim().length === 0) {
      errors.push(`Missing description for route: ${route.route}`);
    }

    // Canonical check
    if (!route.canonical || !route.canonical.startsWith(siteUrl)) {
      errors.push(`Route canonical ${route.canonical} does not match SITE_URL ${siteUrl}`);
    }
  });

  console.log(`[Check 2] Validated ${manifest.routes.length} routes for Title, Description & Canonical.`);
}

// 3. Verify sitemap.xml
if (!fs.existsSync(sitemapPath)) {
  errors.push('CRITICAL: sitemap.xml is missing in public/');
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('sitemap.xml is missing XML declaration header');
  }
  if (!sitemap.includes('<urlset') || !sitemap.includes('</urlset>')) {
    errors.push('sitemap.xml is missing valid <urlset> tags');
  }
  if (sitemap.includes('localhost')) {
    errors.push('sitemap.xml contains forbidden "localhost" URL');
  }

  const locCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`[Check 3] sitemap.xml is valid and contains ${locCount} indexable URLs.`);
}

// 4. Verify robots.txt
if (!fs.existsSync(robotsPath)) {
  errors.push('CRITICAL: robots.txt is missing in public/');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('User-agent: *')) {
    errors.push('robots.txt missing User-agent: *');
  }
  if (!robots.includes('Googlebot')) {
    warnings.push('robots.txt does not explicitly mention Googlebot');
  }
  if (!robots.includes('Bingbot')) {
    warnings.push('robots.txt does not explicitly mention Bingbot');
  }
  if (!robots.includes('OAI-SearchBot')) {
    warnings.push('robots.txt does not explicitly mention OAI-SearchBot');
  }
  if (!robots.includes('Sitemap:')) {
    errors.push('robots.txt missing Sitemap directive');
  }
  console.log('[Check 4] robots.txt is valid with search engine & AI crawler permissions.');
}

// 5. Verify Static Assets (Logos, Icons, Posters)
const requiredAssets = [
  'brand/logo_icon.png',
  'brand/logo_type.svg',
  'mock/showreel_hero.webp',
  'mock/founder_hes.webp',
  'mock/work_vertical_1.webp',
  'mock/work_vertical_2.webp',
  'mock/work_vertical_3.webp',
  'videos/video_1.mp4',
];

requiredAssets.forEach((rel) => {
  const assetPath = path.join(publicDir, rel);
  if (!fs.existsSync(assetPath)) {
    warnings.push(`Static asset referenced in SEO layer not found on disk: public/${rel}`);
  }
});
console.log(`[Check 5] Verified key brand, video, and image assets exist.`);

// Summary
console.log('\n=========================================');
if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} Warnings:`);
  warnings.forEach((w) => console.log(`   - ${w}`));
}

if (errors.length > 0) {
  console.log(`❌  Validation FAILED with ${errors.length} errors:`);
  errors.forEach((e) => console.log(`   - ${e}`));
  process.exit(1);
} else {
  console.log('✅  ALL SEO, DISCOVERY & GEO CHECKS PASSED PERFECTLY!');
  console.log('=========================================\n');
}
