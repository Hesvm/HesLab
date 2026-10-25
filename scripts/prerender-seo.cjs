/**
 * HesLab Static HTML Prerender Engine
 * Generates pre-rendered HTML files for all 43 canonical routes inside dist/
 * Ensures 100% crawlability for Googlebot, Twitter, Telegram, and LLM scrapers (OAI, Claude, Perplexity)
 * without needing Next.js or full SSR rewrite!
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const manifestPath = path.join(distDir, 'seo-manifest.json');
const baseHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(distDir) || !fs.existsSync(baseHtmlPath)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

if (!fs.existsSync(manifestPath)) {
  console.error('❌ dist/seo-manifest.json not found.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`🚀 [Prerender Engine] Prerendering ${manifest.routes.length} canonical routes...`);

let generatedCount = 0;

manifest.routes.forEach((route) => {
  if (route.route === '/' || route.route === '') {
    // Root already has index.html, update its head tags specifically
    return;
  }

  // Remove leading and trailing slashes for directory path
  const cleanPath = route.route.replace(/^\/+|\/+$/g, '');
  const targetDir = path.join(distDir, cleanPath);
  const targetFile = path.join(targetDir, 'index.html');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const title = route.title || 'HesLab — Short-Form Video Editing & Motion Design Studio';
  const description = route.description || 'Independent creative studio specializing in high-retention short-form video editing, Reels, YouTube Shorts, and bespoke motion design.';
  const canonical = route.canonical || `https://heslab.space/${cleanPath}`;

  // Replace base metadata in baseHtml template
  let pageHtml = baseHtml;

  // 1. Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // 2. Replace Description
  pageHtml = pageHtml.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${description}" />`);

  // 3. Replace Canonical
  pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonical}" />`);

  // 4. Replace OG Tags
  pageHtml = pageHtml.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${description}" />`);
  pageHtml = pageHtml.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonical}" />`);

  // 5. Replace Twitter Tags
  pageHtml = pageHtml.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${title}" />`);
  pageHtml = pageHtml.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${description}" />`);

  fs.writeFileSync(targetFile, pageHtml, 'utf8');
  generatedCount++;
});

console.log(`✅ [Prerender Engine] Successfully generated ${generatedCount} static HTML entrypoints inside dist/!`);
