/**
 * HesLab Automated SEO Generator
 * Generates:
 * 1. public/sitemap.xml
 * 2. public/robots.txt
 * 3. public/seo-manifest.json
 * 
 * Powered by SITE_URL (single source of truth).
 */

const fs = require('fs');
const path = require('path');

// Extract or derive SITE_URL from env or default
const RAW_SITE_URL = (process.env.VITE_SITE_URL || 'https://heslab.studio').trim();
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

// Static Core Routes
const coreRoutes = [
  {
    path: '/',
    pageType: 'home',
    priority: '1.0',
    changefreq: 'weekly',
    titleFa: 'حس‌لب | استودیو تدوین ویدیوهای کوتاه و موشن دیزاین',
    titleEn: 'HesLab — Short-Form Video Editing & Motion Design Studio',
    descriptionFa: 'استودیو تخصصی تدوین ریلز، یوتیوب شورتس و تیک‌تاک با هوک‌های ۳ ثانیه‌ای، موشن کینتیک و طراحی صدای سه‌بعدی برای کریتورها و برندها.',
    descriptionEn: 'Independent creative studio specializing in high-retention short-form video editing, Reels, YouTube Shorts, and bespoke motion design for creators and brands.',
    searchIntent: 'brand-commercial',
    primaryTopic: 'Short-form video editing and motion design',
    contentCluster: 'Brand & Studio Core',
    indexable: true,
  },
  {
    path: '/work',
    pageType: 'portfolio-index',
    priority: '0.9',
    changefreq: 'weekly',
    titleFa: 'نمونه‌کارها و پروژه‌های منتخب تدوین ویدیو | حس‌لب',
    titleEn: 'Selected Work & Portfolio | HesLab',
    descriptionFa: 'نمونه‌کارهای ادیت ریلز، شورتس، موشن دیزاین و ویدیوهای عمودی پربازدید ادیت شده در استودیو حس‌لب.',
    descriptionEn: 'Explore HesLab portfolio of high-retention vertical edits, YouTube Shorts, Reels, and commercial motion projects.',
    searchIntent: 'proof-commercial',
    primaryTopic: 'Short-form video portfolio and case studies',
    contentCluster: 'Proof & Portfolio',
    indexable: true,
  },
  {
    path: '/services',
    pageType: 'services-index',
    priority: '0.9',
    changefreq: 'monthly',
    titleFa: 'خدمات استودیو حس‌لب | تدوین شورتس، موشن دیزاین و پکیج ماهانه',
    titleEn: 'Services | HesLab Short-Form Video & Motion Studio',
    descriptionFa: 'خدمات تخصصی تدوین ریلز، یوتیوب شورتس، موشن دیزاین کینتیک و پکیج‌های منظم ماهانه برای کریتورها، بنیان‌گذاران و برندها.',
    descriptionEn: 'Explore HesLab services: high-retention short-form video editing, custom motion design, and dedicated monthly content retainers.',
    searchIntent: 'commercial',
    primaryTopic: 'Video editing services overview',
    contentCluster: 'Services',
    indexable: true,
  },
  {
    path: '/services/short-form-video-editing',
    pageType: 'service-pillar',
    priority: '0.95',
    changefreq: 'monthly',
    titleFa: 'تدوین شورتس و ریلز برای کریتورها و برندها | حس‌لب',
    titleEn: 'Short-Form Video Editing for Creators & Brands | HesLab',
    descriptionFa: 'خدمات تخصصی تدوین ویدیوهای کوتاه، اینستاگرام ریلز، یوتیوب شورتس و تیک‌تاک توسط حس‌لب با تمرکز بر حفظ حداکثری نگاه مخاطب و هویت بصری یکپارچه.',
    descriptionEn: 'Professional short-form video editing for Reels, Shorts, and TikTok. High-retention editing, custom sound design, kinetic typography, and fast turnaround.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Short-form video editing service',
    linkedService: 'short-form-video-editing',
    contentCluster: 'Short-Form Video',
    indexable: true,
  },
  {
    path: '/services/instagram-reels-editing',
    pageType: 'service-pillar',
    priority: '0.92',
    changefreq: 'monthly',
    titleFa: 'خدمات تدوین حرفه‌ای اینستاگرام ریلز | حس‌لب',
    titleEn: 'Instagram Reels Video Editing Services | HesLab',
    descriptionFa: 'ادیتور تخصصی اینستاگرام ریلز. افزایش بازدید ارگانیک و نرخ شیر ویدیوها با تدوین سرعتی، هوک ۳ ثانیه‌ای و طراحی صدای اختصاصی توسط حس‌لب.',
    descriptionEn: 'Hire an experienced Instagram Reels video editor. High retention, custom animated subtitles, and rapid turnaround for creators and brands.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Instagram reels video editing',
    linkedService: 'instagram-reels-editing',
    contentCluster: 'Instagram Reels',
    indexable: true,
  },
  {
    path: '/services/youtube-shorts-editing',
    pageType: 'service-pillar',
    priority: '0.92',
    changefreq: 'monthly',
    titleFa: 'تدوین یوتیوب شورتس با نگه‌داشت بالا و ضد سوایپ | حس‌لب',
    titleEn: 'YouTube Shorts Video Editing with High Retention | HesLab',
    descriptionFa: 'خدمات تخصصی تدوین یوتیوب شورتس برای کانال‌های یوتیوب با تکنیک‌های حفظ مخاطب، کات‌های میلی‌ثانیه‌ای و طراحی صدای ضربه‌ای.',
    descriptionEn: 'Engineered YouTube Shorts editing to conquer the algorithm. High completion rate, frame-zero hooks, and kinetic typography.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'YouTube Shorts editing',
    linkedService: 'youtube-shorts-editing',
    contentCluster: 'YouTube Shorts',
    indexable: true,
  },
  {
    path: '/services/social-media-video-editing',
    pageType: 'service-pillar',
    priority: '0.90',
    changefreq: 'monthly',
    titleFa: 'تدوین ویدیوی شبکه‌های اجتماعی برای برندها و کسب‌وکارها | حس‌لب',
    titleEn: 'Social Media Video Editing for Brands & Startups | HesLab',
    descriptionFa: 'تدوین چندسکویی ویدیو برای اینستاگرام، تیک‌تاک، لینکدین و توییتر با انطباق کادر و هویت بصری یکپارچه.',
    descriptionEn: 'Cross-platform social media video editing for startups, agencies, and businesses looking for polished visual presence.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Social media video editing',
    linkedService: 'social-media-video-editing',
    contentCluster: 'Social Media',
    indexable: true,
  },
  {
    path: '/services/personal-brand-video-editing',
    pageType: 'service-pillar',
    priority: '0.90',
    changefreq: 'monthly',
    titleFa: 'تدوین ویدیو برای پرسنال برندها و بنیان‌گذاران | حس‌لب',
    titleEn: 'Personal Brand & Founder Video Editing | HesLab',
    descriptionFa: 'خدمات تخصصی ادیت ویدیوهای گفتاری و پرستیژ بصری برای مدیران، بنیان‌گذاران و متخصصان در لینکدین و اینستاگرام.',
    descriptionEn: 'Sophisticated video editing for founders, creators, and personal brands seeking authority, clean aesthetics, and engagement.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Personal brand video editing',
    linkedService: 'personal-brand-video-editing',
    contentCluster: 'Personal Brand',
    indexable: true,
  },
  {
    path: '/services/podcast-video-editing',
    pageType: 'service-pillar',
    priority: '0.90',
    changefreq: 'monthly',
    titleFa: 'تدوین پادکست ویدیویی و خرد کردن مصاحبه | حس‌لب',
    titleEn: 'Video Podcast Editing & Dialogue Reframing | HesLab',
    descriptionFa: 'تبدیل اپیزودهای صوتی و تصویری پادکست به ویدیوهای تعامل‌برانگیز عمودی و افقی با کادربندی داینامیک و بیست‌کات هوشمند.',
    descriptionEn: 'Video podcast editing, multi-cam dynamic switching, noise cleaning, and dialogue pacing for show hosts.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Video podcast editing',
    linkedService: 'podcast-video-editing',
    contentCluster: 'Podcast Video',
    indexable: true,
  },
  {
    path: '/services/content-repurposing',
    pageType: 'service-pillar',
    priority: '0.92',
    changefreq: 'monthly',
    titleFa: 'بازآفرینی و تبدیل محتوای طولانی به شورتس و ریلز | حس‌لب',
    titleEn: 'Long-Form to Short-Form Video Repurposing | HesLab',
    descriptionFa: 'سرویس تبدیل وبینارها، پادکست‌ها و ویدیوهای یوتیوب به ده‌ها میکرومحتوای عمودی با پتانسیل وایرال بالا توسط استودیو حس‌لب.',
    descriptionEn: 'Turn 1 long-form webinar or podcast into 10+ viral vertical short videos. Comprehensive extraction, kinetic captions, and sound design.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Content repurposing service',
    linkedService: 'content-repurposing',
    contentCluster: 'Content Repurposing',
    indexable: true,
  },
  {
    path: '/services/motion-design',
    pageType: 'service-pillar',
    priority: '0.9',
    changefreq: 'monthly',
    titleFa: 'موشن دیزاین و هویت بصری برای ویدیو | حس‌لب',
    titleEn: 'Motion Design & Visual Identity for Video | HesLab',
    descriptionFa: 'خدمات طراحی موشن دیزاین و انیمیشن متن، استیکر و عناصر بصری برای ویدیوهای یوتیوب و اینستاگرام توسط استودیو حس‌لب.',
    descriptionEn: 'Bespoke motion graphics, kinetic subtitles, animated illustrations, and UI walkthroughs for creators and tech brands by HesLab.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Custom motion design service',
    linkedService: 'motion-design',
    contentCluster: 'Motion Design',
    indexable: true,
  },
  {
    path: '/services/ongoing-video-content',
    pageType: 'service-pillar',
    priority: '0.92',
    changefreq: 'monthly',
    titleFa: 'پکیج‌های منظم ماهانه تدوین ویدیو (ریتینر) | حس‌لب',
    titleEn: 'Ongoing Video Content Retainers | HesLab',
    descriptionFa: 'پکیج‌های ماهانه تدوین ویدیوهای کوتاه حس‌لب برای تولید مداوم محتوا در شبکه‌های اجتماعی با تحویل منظم ۲۴ تا ۴۸ ساعته.',
    descriptionEn: 'Dedicated monthly video editing capacity, rapid 24-48h turnaround, and consistent brand quality for creators and startups.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Monthly video editing retainer packages',
    linkedService: 'ongoing-video-content',
    contentCluster: 'Ongoing Retainers',
    indexable: true,
  },
  {
    path: '/services/ongoing-content',
    pageType: 'service-pillar',
    priority: '0.88',
    changefreq: 'monthly',
    titleFa: 'اشتراک ماهانه تدوین محتوای مستمر | حس‌لب',
    titleEn: 'Continuous Video Production Retainers | HesLab',
    descriptionFa: 'همکاری پیوسته با استودیو حس‌لب برای تامین بدون وقفه محتوای ویدیویی عمودی با کیفیت استودیویی.',
    descriptionEn: 'Dedicated partner retainer for continuous monthly video editing with guaranteed turnaround.',
    searchIntent: 'commercial-pillar',
    primaryTopic: 'Continuous video editing retainer packages',
    linkedService: 'ongoing-content',
    contentCluster: 'Ongoing Retainers',
    indexable: true,
  },
  {
    path: '/resources',
    pageType: 'resources-index',
    priority: '0.85',
    changefreq: 'weekly',
    titleFa: 'منابع و مقالات تخصصی تدوین شورتس و موشن دیزاین | حس‌لب',
    titleEn: 'Resources & Video Editing Guides | HesLab',
    descriptionFa: 'راهنماها، کالبدشکافی هوک‌ها و تجربیات عملی استودیو حس‌لب در تدوین ریلز، یوتیوب شورتس، موشن دیزاین و فیزیک انیمیشن.',
    descriptionEn: 'In-depth guides, hook breakdowns, and practical creator workflows for short-form video editing and motion design by HesLab.',
    searchIntent: 'informational-hub',
    primaryTopic: 'Video editing educational resources',
    contentCluster: 'Creator Resources',
    indexable: true,
  },
  {
    path: '/blog',
    pageType: 'resources-index',
    priority: '0.85',
    changefreq: 'weekly',
    titleFa: 'بلاگ تخصصی حس‌لب | مقالات تدوین شورتس و موشن',
    titleEn: 'HesLab Blog | Video Editing & Motion Insights',
    descriptionFa: 'راهنماها، کالبدشکافی هوک‌ها و تجربیات عملی استودیو حس‌لب در تدوین ریلز، یوتیوب شورتس، موشن دیزاین و فیزیک انیمیشن.',
    descriptionEn: 'In-depth guides, hook breakdowns, and practical creator workflows for short-form video editing and motion design by HesLab.',
    searchIntent: 'informational-hub',
    primaryTopic: 'Video editing educational blog',
    contentCluster: 'Creator Resources',
    indexable: true,
  },
  {
    path: '/about',
    pageType: 'about',
    priority: '0.8',
    changefreq: 'monthly',
    titleFa: 'درباره حس‌لب | استودیو تخصصی تدوین ویدیوی کوتاه',
    titleEn: 'About HesLab | Independent Video Editing & Motion Studio',
    descriptionFa: 'آشنایی با حس‌لب، فلسفه تدوین ویدیوی کوتاه، رویکرد ما در نگه‌داشت نگاه مخاطب و بنیان‌گذار استودیو.',
    descriptionEn: 'Learn about HesLab: an independent video editing and motion design studio founded by Hesam, dedicated to high-retention creator workflows.',
    searchIntent: 'navigational-brand',
    primaryTopic: 'Studio background and philosophy',
    contentCluster: 'About',
    indexable: true,
  },
  {
    path: '/contact',
    pageType: 'contact',
    priority: '0.85',
    changefreq: 'monthly',
    titleFa: 'دریافت برآورد هزینه و ثبت سفارش تدوین ویدیو | حس‌لب',
    titleEn: 'Get a Project Quote & Contact | HesLab',
    descriptionFa: 'ارسال اطلاعات پروژه، فوتیج‌های خام یا درخواست پکیج ماهانه تدوین ریلز و شورتس به استودیو حس‌لب.',
    descriptionEn: 'Request a project quote, discuss monthly video editing retainers, or send raw footage to HesLab.',
    searchIntent: 'conversion',
    primaryTopic: 'Project inquiry and quote request',
    contentCluster: 'Conversion',
    indexable: true,
  },
];

// Project Routes
const projectSlugs = [
  { slug: 'tokyo-24h-vlog', titleFa: '۲۴ ساعت در توکیو با ریتم سرعتی و ساند دیزاین سینمایی', date: '2026-01-15' },
  { slug: 'crypto-empire-documentary', titleFa: 'ظهور و سقوط امپراتوری‌های کریپتو در ۳ دقیقه', date: '2026-02-02' },
  { slug: 'founder-routine-podcast', titleFa: 'راز واقعی برنامه‌ریزی روزانه بنیان‌گذاران ۱۰ میلیون دلاری', date: '2026-02-18' },
  { slug: 'wireless-headphone-commercial', titleFa: 'تیزر رونمایی هدفون نسل جدید با موشن گرافیک سه‌بعدی', date: '2026-03-01' },
  { slug: 'ai-tools-breakdown', titleFa: '۳ ابزار هوش مصنوعی که جای یک آژانس کامل را می‌گیرند', date: '2026-03-12' },
  { slug: 'creator-growth-story', titleFa: 'چگونه در ۱ سال از صفر به ۱۰۰ هزار مخاطب رسیدم؟', date: '2026-03-20' },
];

const projectRoutes = projectSlugs.map((p) => ({
  path: `/work/${p.slug}`,
  pageType: 'project-case-study',
  priority: '0.8',
  changefreq: 'monthly',
  lastmod: p.date,
  titleFa: `${p.titleFa} | نمونه‌کار تدوین حس‌لب`,
  titleEn: `${p.titleFa} | HesLab Portfolio`,
  descriptionFa: `کالبدشکافی تدوین، مشخصات فنی ویدیوی عمودی و مراحل اجرای پروژه ${p.titleFa} در استودیو حس‌لب.`,
  descriptionEn: `Technical case study and edit breakdown for ${p.slug} by HesLab.`,
  searchIntent: 'proof-informational',
  primaryTopic: 'Project case study',
  contentCluster: 'Portfolio',
  indexable: true,
}));

// Resource Routes
const resourceSlugs = [
  { slug: 'short-form-video-hooks-retention', titleFa: 'چگونه در ۳ ثانیه اول ویدیوهای کوتاه نگاه مخاطب را قفل کنیم؟', date: '2026-03-15', cluster: 'Short-Form Video', service: 'short-form-video-editing' },
  { slug: 'podcast-to-shorts-workflow', titleFa: 'راهنمای گام‌به‌گام تبدیل پادکست به شورتس و ریلزهای پربازدید', date: '2026-03-20', cluster: 'Creator Workflow', service: 'short-form-video-editing' },
  { slug: 'kinetic-typography-motion-design', titleFa: 'کالبدشکافی موشن دیزاین و فیزیک انیمیشن در ویدیوهای کوتاه', date: '2026-03-25', cluster: 'Motion Design', service: 'motion-design' },
  { slug: 'short-form-video-editing-cost-guide', titleFa: 'هزینه ادیت ویدیوهای کوتاه چقدر است؟ راهنمای انتخاب پکیج مناسب', date: '2026-03-28', cluster: 'Buying Intent', service: 'ongoing-content' },
];

const resourceRoutes = resourceSlugs.map((r) => ({
  path: `/resources/${r.slug}`,
  pageType: 'resource-article',
  priority: '0.85',
  changefreq: 'monthly',
  lastmod: r.date,
  titleFa: `${r.titleFa} | ژورنال حس‌لب`,
  titleEn: `${r.titleFa} | HesLab Journal`,
  descriptionFa: `مقاله تخصصی استودیو حس‌لب درباره ${r.titleFa}.`,
  descriptionEn: `Educational guide and breakdown on ${r.titleFa} by HesLab.`,
  searchIntent: 'informational',
  primaryTopic: r.titleFa,
  linkedService: r.service,
  contentCluster: r.cluster,
  indexable: true,
}));

const allManifestRoutes = [...coreRoutes, ...projectRoutes, ...resourceRoutes];

// 1. Generate XML Sitemap
const currentDate = new Date().toISOString().split('T')[0];
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

allManifestRoutes
  .filter((r) => r.indexable)
  .forEach((route) => {
    const loc = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`;
    const lastmod = route.lastmod || currentDate;
    sitemapXml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
  });

sitemapXml += `</urlset>\n`;

// 2. Generate robots.txt
const robotsTxt = `# HesLab Production Robots Configuration
# Canonical domain: ${SITE_URL}
# Explicitly configured for modern crawlers, LLM search agents, and AI discovery bots.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /*?*sort=
Disallow: /*?*filter=

# Search Engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Discovery & Search Crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Canonical Sitemap Reference
Sitemap: ${SITE_URL}/sitemap.xml
`;

// 3. Generate SEO Manifest
const seoManifest = {
  version: '2.0.0',
  generatedAt: new Date().toISOString(),
  canonicalDomain: SITE_URL,
  brand: {
    name: 'HesLab',
    nameFa: 'حس‌لب',
    positioning: 'Independent video editor / visual designer',
    founder: 'Hesam',
    primaryServices: [
      'short-form-video-editing',
      'instagram-reels-editing',
      'youtube-shorts-editing',
      'social-media-video-editing',
      'personal-brand-video-editing',
      'podcast-video-editing',
      'content-repurposing',
      'motion-design',
      'ongoing-video-content',
    ],
  },
  routes: allManifestRoutes.map((r) => ({
    route: r.path,
    canonical: r.path === '/' ? SITE_URL : `${SITE_URL}${r.path}`,
    title: r.titleFa,
    titleEn: r.titleEn,
    description: r.descriptionFa,
    descriptionEn: r.descriptionEn,
    pageType: r.pageType,
    searchIntent: r.searchIntent,
    contentCluster: r.contentCluster,
    priority: r.priority,
    changefreq: r.changefreq,
    indexable: r.indexable,
    ...(r.linkedService ? { linkedService: r.linkedService } : {}),
  })),
};

// Write outputs to public/
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');
fs.writeFileSync(path.join(publicDir, 'seo-manifest.json'), JSON.stringify(seoManifest, null, 2), 'utf8');

console.log(`✅ [SEO Generator] Successfully generated:`);
console.log(`   - public/sitemap.xml (${allManifestRoutes.length} URLs, Canonical: ${SITE_URL})`);
console.log(`   - public/robots.txt (AI Crawlers enabled: OAI-SearchBot, PerplexityBot, ClaudeBot, etc.)`);
console.log(`   - public/seo-manifest.json (${allManifestRoutes.length} routes registered)`);
