/**
 * HesLab Content Intelligence & Search Acquisition Matrix
 * Maps user queries, real-world problems, search intents, and funnel stages
 * directly to canonical HesLab URLs with commercial priority scoring.
 */

export type SearchIntent =
  | 'commercial-investigation'
  | 'transactional'
  | 'informational'
  | 'brand'
  | 'navigational';

export type FunnelStage = 'top' | 'middle' | 'bottom';

export type TargetPersona = 'creator' | 'founder' | 'business' | 'agency';

export type ContentStatus = 'live' | 'planned';

export interface ContentMatrixEntry {
  id: string;
  queryFa: string;
  queryEn: string;
  problemFa: string;
  problemEn: string;
  intent: SearchIntent;
  funnelStage: FunnelStage;
  targetPersona: TargetPersona;
  targetUrl: string;
  serviceSlug?: string;
  resourceSlug?: string;
  commercialPriority: number; // 1 - 100
  status: ContentStatus;
  keyEntities: string[];
}

export const CONTENT_INTELLIGENCE_MATRIX: ContentMatrixEntry[] = [
  // Commercial & Transactional Core (Bottom of Funnel)
  {
    id: 'hire-reels-editor',
    queryFa: 'ادیتور حرفه‌ای ریلز اینستاگرام',
    queryEn: 'hire instagram reels video editor',
    problemFa: 'کریتور یا برندی که ویدیوی باکیفیت می‌خواهد اما وقت یا مهارت تدوین سرعتی ریلز را ندارد.',
    problemEn: 'Creators needing specialized high-retention vertical editing without spending 6 hours per video.',
    intent: 'transactional',
    funnelStage: 'bottom',
    targetPersona: 'creator',
    targetUrl: '/services/instagram-reels-editing',
    serviceSlug: 'instagram-reels-editing',
    commercialPriority: 98,
    status: 'live',
    keyEntities: ['HesLab', 'Instagram Reels', 'Vertical Video', 'Kinetic Typography', 'Retention Editing'],
  },
  {
    id: 'youtube-shorts-editor',
    queryFa: 'تدوین‌گر یوتیوب شورتس با حفظ نگاه بالا',
    queryEn: 'youtube shorts video editor retention',
    problemFa: 'کانال یوتیوب که بازدید شورتس کمی دارد به خاطر سوایپ سریع کاربران در ۳ ثانیه اول.',
    problemEn: 'YouTube channels suffering high drop-off and swipe-away rates in first 3 seconds of Shorts.',
    intent: 'transactional',
    funnelStage: 'bottom',
    targetPersona: 'creator',
    targetUrl: '/services/youtube-shorts-editing',
    serviceSlug: 'youtube-shorts-editing',
    commercialPriority: 96,
    status: 'live',
    keyEntities: ['HesLab', 'YouTube Shorts', 'Retention Engineering', 'Sound Design', 'Frame Zero Hook'],
  },
  {
    id: 'monthly-video-retainer',
    queryFa: 'پکیج ماهانه ادیت ویدیو برای تولید مداوم',
    queryEn: 'monthly video editing retainer for creators',
    problemFa: 'نیاز به انتشار مداوم ۳ تا ۵ ویدیو در هفته بدون درگیری با ادیتورهای نامطمئن فریلنسری.',
    problemEn: 'Need for reliable, continuous 12-20 monthly vertical video deliveries with predictable turnaround.',
    intent: 'transactional',
    funnelStage: 'bottom',
    targetPersona: 'founder',
    targetUrl: '/services/ongoing-video-content',
    serviceSlug: 'ongoing-video-content',
    commercialPriority: 95,
    status: 'live',
    keyEntities: ['HesLab', 'Retainer Package', '48h Turnaround', 'Content Consistency', 'Frame.io Workflow'],
  },
  {
    id: 'podcast-repurposing-service',
    queryFa: 'تبدیل پادکست به ریلز و شورتس',
    queryEn: 'podcast to short form video repurposing',
    problemFa: 'ضبط پادکست ۱ ساعته با زحمت زیاد، اما عدم توانایی در استخراج کلیپ‌های وایرال برای سوشال مدیا.',
    problemEn: 'Long-form podcasts losing 80% audience discovery potential without dedicated vertical extraction.',
    intent: 'commercial-investigation',
    funnelStage: 'middle',
    targetPersona: 'founder',
    targetUrl: '/services/content-repurposing',
    serviceSlug: 'content-repurposing',
    commercialPriority: 94,
    status: 'live',
    keyEntities: ['HesLab', 'Podcast Repurposing', 'Multi-Angle Framing', 'B-roll Integration', 'Micro-Moments'],
  },
  {
    id: 'personal-brand-editing',
    queryFa: 'ادیت ویدیوی پرسنال برند برای لینکدین و اینستاگرام',
    queryEn: 'personal brand video editing founder',
    problemFa: 'بنیان‌گذاران و متخصصانی که تصویر حرفه‌ای و ادیت باکلاس و بدون شوآف کودکانه می‌خواهند.',
    problemEn: 'Executives and founders needing polished, sophisticated short-form video that preserves gravitas.',
    intent: 'commercial-investigation',
    funnelStage: 'middle',
    targetPersona: 'founder',
    targetUrl: '/services/personal-brand-video-editing',
    serviceSlug: 'personal-brand-video-editing',
    commercialPriority: 91,
    status: 'live',
    keyEntities: ['HesLab', 'Personal Branding', 'Founder Media', 'Executive Presence', 'Clean Motion'],
  },
  {
    id: 'motion-design-service',
    queryFa: 'طراحی موشن گرافیک و هویت بصری برای ویدیو',
    queryEn: 'custom motion graphics for video creators',
    problemFa: 'ویدیوهایی که فاقد انیمیشن اختصاصی، تایتل‌های داینامیک و نمودارهای حرفه‌ای هستند.',
    problemEn: 'Videos lacking visual identity, custom lower-thirds, animated diagrams, or kinetic brand styling.',
    intent: 'commercial-investigation',
    funnelStage: 'middle',
    targetPersona: 'business',
    targetUrl: '/services/motion-design',
    serviceSlug: 'motion-design',
    commercialPriority: 89,
    status: 'live',
    keyEntities: ['HesLab', 'Motion Graphics', 'Spring Physics', 'Kinetic Typography', 'After Effects'],
  },

  // Informational & Authority Hub (Middle & Top of Funnel)
  {
    id: 'short-form-hooks-guide',
    queryFa: 'چگونه در ۳ ثانیه اول ریلز نگاه مخاطب را جذب کنیم',
    queryEn: 'how to create 3 second video hooks for reels',
    problemFa: 'نرخ افت شدید مخاطب در ثانیه اول و اسکرول سریع کاربران روی ریلز و شورتس.',
    problemEn: 'Viewers scrolling away within 1-2 seconds before hearing the main value proposition.',
    intent: 'informational',
    funnelStage: 'top',
    targetPersona: 'creator',
    targetUrl: '/resources/short-form-video-hooks-retention',
    resourceSlug: 'short-form-video-hooks-retention',
    commercialPriority: 85,
    status: 'live',
    keyEntities: ['HesLab', 'Hook Design', 'Curiosity Gap', 'Audio Risers', 'Retention Graph'],
  },
  {
    id: 'podcast-workflow-guide',
    queryFa: 'مراحل خرد کردن پادکست به ویدیوهای عمودی',
    queryEn: 'step by step podcast repurposing to shorts workflow',
    problemFa: 'عدم آشنایی با سیستم شناسایی جملات طلایی و بازآرایی فریم افقی به عمودی ۹:۱۶.',
    problemEn: 'Unclear methodology for pinpointing clip-worthy insights and multi-track reformatting.',
    intent: 'informational',
    funnelStage: 'middle',
    targetPersona: 'creator',
    targetUrl: '/resources/podcast-to-shorts-workflow',
    resourceSlug: 'podcast-to-shorts-workflow',
    commercialPriority: 82,
    status: 'live',
    keyEntities: ['HesLab', 'Workflow Pipeline', 'Split Screen', 'Dynamic Switching', 'Mobile Subtitles'],
  },
  {
    id: 'motion-physics-guide',
    queryFa: 'فیزیک انیمیشن اسپرینگ و ترنزیشن در موشن دیزاین',
    queryEn: 'spring physics in UI motion design and video transitions',
    problemFa: 'انیمیشن‌های خشن و خطی که حس غیرطبیعی و رباتیک به بیننده منتقل می‌کنند.',
    problemEn: 'Stiff linear transitions that feel robotic instead of natural tactile motion.',
    intent: 'informational',
    funnelStage: 'top',
    targetPersona: 'creator',
    targetUrl: '/resources/motion-physics-spring-dynamics',
    resourceSlug: 'motion-physics-spring-dynamics',
    commercialPriority: 76,
    status: 'live',
    keyEntities: ['HesLab', 'Spring Dynamics', 'Damping Ratio', 'Stiffness', 'Kinetic Fluidity'],
  },

  // Proof & Portfolio (Middle & Bottom)
  {
    id: 'portfolio-vlog-case-study',
    queryFa: 'نمونه ادیت ریلز سبک ولاگ مسافرتی و سرعتی',
    queryEn: 'fast paced travel vlog reels editing portfolio',
    problemFa: 'نیاز به دیدن نمونه واقعی از اصلاح رنگ، ساند دیزاین کات‌های سرعتی و خروجی 4K.',
    problemEn: 'Prospects wanting proof of fast-cut storytelling, color enhancement, and sound design caliber.',
    intent: 'brand',
    funnelStage: 'bottom',
    targetPersona: 'creator',
    targetUrl: '/work/tokyo-24h-vlog',
    commercialPriority: 90,
    status: 'live',
    keyEntities: ['HesLab', 'Tokyo 24h Vlog', 'Dynamic Cut', '4K Vertical', 'Soundscape'],
  },
  {
    id: 'portfolio-founder-podcast',
    queryFa: 'نمونه ادیت مصاحبه و پادکست استارتاپی عمودی',
    queryEn: 'founder interview vertical short video portfolio',
    problemFa: 'بررسی نمونه کار ادیت حرفه‌ای صحبت‌های بنیان‌گذار با زیرنویس دو زبانه و نمودار.',
    problemEn: 'Wanting concrete demonstration of executive podcast clipping with animated visuals.',
    intent: 'brand',
    funnelStage: 'bottom',
    targetPersona: 'founder',
    targetUrl: '/work/founder-routine-podcast',
    commercialPriority: 88,
    status: 'live',
    keyEntities: ['HesLab', 'Founder Podcast', 'Split Screen', 'Kinetic Graphics', 'Retention 82%'],
  },
];

/**
 * Filter helpers for search queries, funnel stages, and personas.
 */
export function getMatrixEntriesByFunnel(stage: FunnelStage): ContentMatrixEntry[] {
  return CONTENT_INTELLIGENCE_MATRIX.filter((e) => e.funnelStage === stage);
}

export function getMatrixEntriesByPersona(persona: TargetPersona): ContentMatrixEntry[] {
  return CONTENT_INTELLIGENCE_MATRIX.filter((e) => e.targetPersona === persona);
}

export function getHighPriorityCommercialEntries(minPriority = 85): ContentMatrixEntry[] {
  return CONTENT_INTELLIGENCE_MATRIX
    .filter((e) => e.commercialPriority >= minPriority)
    .sort((a, b) => b.commercialPriority - a.commercialPriority);
}
