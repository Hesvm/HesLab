export interface ProjectItem {
  id: number;
  slug: string;
  category: 'vlog' | 'documentary' | 'podcast' | 'commercial' | 'educational';
  titleFa: string;
  titleEn: string;
  creatorFa: string;
  creatorEn: string;
  descriptionFa: string;
  descriptionEn: string;
  views: string;
  tag: string;
  image: string;
  video: string;
  durationSeconds: number;
  durationIso: string;
  aspectRatio: '9:16' | '16:9';
  resolution: string;
  uploadDate: string;
  workflowStepsFa: string[];
  workflowStepsEn: string[];
  featuresFa: string[];
  featuresEn: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    slug: 'tokyo-24h-vlog',
    category: 'vlog',
    titleFa: '۲۴ ساعت در توکیو با ریتم سرعتی و ساند دیزاین سینمایی',
    titleEn: '24 Hours in Tokyo: Fast-Paced Cinematic Travel Reel',
    creatorFa: 'ولاگ سبک زندگی و سفر',
    creatorEn: 'Lifestyle & Travel Creator',
    descriptionFa: 'تدوین سرعتی و ریتمیک ولاگ ۲۴ ساعته در توکیو با طراحی صدای سه‌بعدی خیابانی، فوتیج‌های پرتحرک و برش‌های همگام با ضرب‌آهنگ موزیک.',
    descriptionEn: 'High-energy, dynamic short-form travel edit featuring rhythmic cuts, spatial sound design, and custom street sound effects synced to upbeat music.',
    views: '۱.۸M',
    tag: 'Vlog',
    image: '/mock/work_vertical_1.webp',
    video: '/videos/video_1.mp4',
    durationSeconds: 34,
    durationIso: 'PT34S',
    aspectRatio: '9:16',
    resolution: '4K 60FPS',
    uploadDate: '2026-01-15',
    workflowStepsFa: [
      'بررسی و راف‌کات اولیه ۱۰ دقیقه فوتیج خام به ۳۴ ثانیه',
      'ایجاد هوک بصری ۲ ثانیه‌ای با صدای عبور قطار شینکانسن',
      'کالر گریدینگ لوک نئونی شب‌های توکیو',
      'صداگذاری لایه‌ای با بیش از ۲۰ افکت صوتی اختصاصی'
    ],
    workflowStepsEn: [
      'Raw footage culling down from 10 minutes to 34 seconds',
      '2-second visual hook with Shinkansen train whoosh sound design',
      'Cinematic Tokyo night neon color grading',
      'Multi-layer sound design with over 20 tailored SFX assets'
    ],
    featuresFa: ['هوک ۳ ثانیه‌ای پرانرژی', 'طراحی صدای سه‌بعدی SFX', 'کالر گریدینگ سینمایی', 'زیرنویس کینتیک'],
    featuresEn: ['3-Second High-Energy Hook', 'Spatial Audio Design', 'Cinematic Grading', 'Kinetic Subtitles'],
  },
  {
    id: 2,
    slug: 'crypto-empire-documentary',
    category: 'documentary',
    titleFa: 'ظهور و سقوط امپراتوری‌های کریپتو در ۳ دقیقه',
    titleEn: 'The Rise & Fall of Crypto Empires in 3 Minutes',
    creatorFa: 'مستند کوتاه و داستانی',
    creatorEn: 'Documentary Storyteller',
    descriptionFa: 'مستند کوتاه دراماتیک با کلاژ گرافیکی، تایپوگرافی متحرک، بی‌استوری و افکت‌های روزنامه‌ای برای بازگویی داستانی پرتعلیق در قالب ریلز.',
    descriptionEn: 'Gripping documentary micro-storytelling featuring mixed-media newspaper cutouts, kinetic text animations, and cinematic suspense pacing.',
    views: '۲.۴M',
    tag: 'Documentary',
    image: '/mock/work_vertical_2.webp',
    video: '/videos/video_2.mp4',
    durationSeconds: 45,
    durationIso: 'PT45S',
    aspectRatio: '9:16',
    resolution: '4K 60FPS',
    uploadDate: '2026-02-02',
    workflowStepsFa: [
      'تنظیم ساختار روایی سه‌پرده‌ای برای قالب عمودی',
      'طراحی موشن گرافیک اسناد و تیترهای خبری',
      'حذف مکث‌های گوینده و تسریع ریتم انتقال اطلاعات',
      'تنظیم افکت‌های نویز فیلم آنالوگ و ساند افکت‌های دراماتیک'
    ],
    workflowStepsEn: [
      'Three-act narrative structure tailored for vertical view retention',
      'Motion design newspaper and archival asset treatments',
      'Zero-gap voice track pacing to maintain attention',
      'Analog film grain and dramatic crescendo audio layering'
    ],
    featuresFa: ['روایت‌گری داستانی', 'کلاژ پیپر و بافت قدیمی', 'تایپوگرافی برجسته', 'نگه‌داشت بالای ۸۵٪'],
    featuresEn: ['Documentary Pacing', 'Paper Cutout Collage', 'Kinetic Bold Typography', '85%+ View Retention'],
  },
  {
    id: 3,
    slug: 'founder-routine-podcast',
    category: 'podcast',
    titleFa: 'راز واقعی برنامه‌ریزی روزانه بنیان‌گذاران ۱۰ میلیون دلاری',
    titleEn: 'Daily Routine Secrets of Eight-Figure Tech Founders',
    creatorFa: 'پادکست رشد و بنیان‌گذاران',
    creatorEn: 'Founder & Tech Podcast',
    descriptionFa: 'استخراج جذاب‌ترین قطعه یک مصاحبه ۹۰ دقیقه‌ای به همراه زیرنویس‌های داینامیک، نمودارهای متحرک و بیست‌کات‌های هوشمندانه برای جلب توجه کارآفرینان.',
    descriptionEn: 'High-value podcast extraction converting a 90-minute founder conversation into an engaging clip with dynamic animated subtitles and contextual graphics.',
    views: '۱.۴M',
    tag: 'Podcast',
    image: '/mock/work_vertical_3.webp',
    video: '/videos/video_3.mp4',
    durationSeconds: 38,
    durationIso: 'PT38S',
    aspectRatio: '9:16',
    resolution: '1080p 60FPS',
    uploadDate: '2026-02-18',
    workflowStepsFa: [
      'شناسایی و انتخاب قطعه با بالاترین نرخ گیرایی از پادکست کامل',
      'طراحی زیرنویس هوشمند با هایلایت خودکار کلمات کلیدی',
      'افزودن بیست‌کات‌های گرافیکی و اسکرین‌شات‌های مرتبط با صحبت گوینده',
      'میکس شفاف صدای دیالوگ با اکولایزر استاندارد'
    ],
    workflowStepsEn: [
      'Pinpointing the highest emotional and insightful podcast moment',
      'Smart styled animated captions with keyphrase highlighting',
      'Contextual screen b-roll overlays and UI elements',
      'Pristine dialogue voice equalization and subtle background ambiance'
    ],
    featuresFa: ['زیرنویس کلمه به کلمه رنگی', 'بیست‌کات‌های نموداری', 'بهینه‌سازی دیالوگ', 'برش‌های بدون پرش'],
    featuresEn: ['Word-by-Word Colored Captions', 'Graph Visual B-Roll', 'Vocal Enhancement', 'Smooth Jump Cuts'],
  },
  {
    id: 4,
    slug: 'wireless-headphone-commercial',
    category: 'commercial',
    titleFa: 'تیزر رونمایی هدفون نسل جدید با موشن گرافیک سه‌بعدی',
    titleEn: 'Next-Gen Wireless Headphones Commercial Reel',
    creatorFa: 'تبلیغات محصول و برندینگ',
    creatorEn: 'Product Brand & Hardware',
    descriptionFa: 'ریلز تبلیغاتی محصول با فوکوس روی جزییات متریال، انفجار قطعات هدفون با موشن گرافیک و طراحی صدای ضربه‌ای برای ایجاد هیجان خرید.',
    descriptionEn: 'High-conversion product showcase combining sleek hardware renders, exploded-view motion graphics, and heavy impact sound engineering.',
    views: '۹۵۰K',
    tag: 'Commercial',
    image: '/mock/work_4.webp',
    video: '/videos/video_4.mp4',
    durationSeconds: 26,
    durationIso: 'PT26S',
    aspectRatio: '9:16',
    resolution: '4K 60FPS',
    uploadDate: '2026-03-01',
    workflowStepsFa: [
      'استوری‌بورد ۲۶ ثانیه‌ای با هدف نمایش فیچرهای کلیدی در ثانیه‌های آغازین',
      'هماهنگی برش‌ها با ضرب‌های اصلی موسیقی الکترونیک',
      'انیمیشن متن مشخصات فنی و قابلیت‌های صوتی',
      'پایان‌بندی با کال‌تو‌اکشن مشخص خرید'
    ],
    workflowStepsEn: [
      '26-second product storyboard designed to front-load key benefits',
      'Snappy rhythm editing locked to electronic audio transients',
      'Feature callouts motion typography',
      'Clear high-converting end screen CTA'
    ],
    featuresFa: ['ادیت بیتی دقیق', 'طراحی صدای سنگین باس', 'تایپوگرافی متحرک محصول', 'کال‌تو‌اکشن شفاف'],
    featuresEn: ['Rhythmic Transient Sync', 'Heavy Bass SFX Design', 'Product Spec Typography', 'Conversion-Focused Outro'],
  },
  {
    id: 5,
    slug: 'ai-tools-breakdown',
    category: 'educational',
    titleFa: '۳ ابزار هوش مصنوعی که جای یک آژانس کامل را می‌گیرند',
    titleEn: '3 AI Tools That Replace an Entire Agency',
    creatorFa: 'آموزش تکنولوژی و ابزارهای AI',
    creatorEn: 'Tech & AI Educator',
    descriptionFa: 'ویدیوی آموزشی خوش‌ریتم با زوم‌های نرم، نشانه‌گذاری‌های بصری روی رابط کاربری نرم‌افزار و زیرنویس‌های تمیز برای یادگیری آسان مخاطب.',
    descriptionEn: 'Engaging software breakdown featuring seamless zoom transitions, on-screen UI highlights, and clean educational text pacing.',
    views: '۸۹۰K',
    tag: 'Educational',
    image: '/mock/work_5.webp',
    video: '/videos/video_5.mp4',
    durationSeconds: 42,
    durationIso: 'PT42S',
    aspectRatio: '9:16',
    resolution: '4K 60FPS',
    uploadDate: '2026-03-12',
    workflowStepsFa: [
      'برش ضبط‌های صفحه نمایش و بهینه‌سازی کادربندی برای موبایل',
      'افزودن زوم‌های داینامیک به دکمه‌ها و منوها',
      'طراحی نشانگرهای ماوس و افکت کلیک رضایت‌بخش',
      'تقسیم‌بندی گام‌های ۱، ۲ و ۳ برای درک سریع'
    ],
    workflowStepsEn: [
      'Screencast cropping and re-framing for vertical mobile readability',
      'Dynamic smooth zoom-ins on essential UI buttons',
      'Crisp mouse clicks and tactile UI audio feedback',
      'Clear numbered step pacing (01, 02, 03)'
    ],
    featuresFa: ['زوم‌های هدایت‌کننده نگاه', 'فیدبک صوتی کلیک UI', 'کادربندی عمودی استاندارد', 'دسته‌بندی شماره‌دار'],
    featuresEn: ['Eye-Guiding Zooms', 'Tactile UI Clicks', 'Mobile UI Framing', 'Numbered Breakdown'],
  },
  {
    id: 6,
    slug: 'creator-growth-story',
    category: 'vlog',
    titleFa: 'چگونه در ۱ سال از صفر به ۱۰۰ هزار مخاطب رسیدم؟',
    titleEn: 'From 0 to 100K Followers in 1 Year: Story Breakdown',
    creatorFa: 'ولاگ شخصی و داستان رشد',
    creatorEn: 'Personal Brand & Solo Creator',
    descriptionFa: 'روایت شخصی جذاب همراه با نمودارهای رشد متحرک، کات‌های تمیز و انتخاب موسیقی تدریجی که مخاطب را تا آخرین ثانیه مشتاق نگه می‌دارد.',
    descriptionEn: 'Inspiring personal creator growth story driven by kinetic statistics, clean pacing, and emotionally resonant soundtrack design.',
    views: '۱.۲M',
    tag: 'Vlog',
    image: '/mock/work_6.webp',
    video: '/videos/video_6.mp4',
    durationSeconds: 36,
    durationIso: 'PT36S',
    aspectRatio: '9:16',
    resolution: '4K 60FPS',
    uploadDate: '2026-03-20',
    workflowStepsFa: [
      'استخراج نکات کلیدی مصاحبه و تنظیم جریان انگیزشی ویدیو',
      'انیمیشن ارقام و آمار با کانترهای افزایشی',
      'اصلاح رنگ چهره و ارتقای حس و حال ویدیو',
      'انتخاب ساندترک صعودی برای همراهی احساسی مخاطب'
    ],
    workflowStepsEn: [
      'Distilling emotional high points into a motivating story arc',
      'Animated number counters and growth curves',
      'Natural skin tone grading and warm ambience',
      'Emotional crescendo soundtrack integration'
    ],
    featuresFa: ['نمودارهای رشد متحرک', 'روایت‌گری الهام‌بخش', 'اصلاح رنگ طبیعی', 'ریتم پیوسته'],
    featuresEn: ['Animated Growth Charts', 'Inspirational Arc', 'Natural Skin Tone Grade', 'Continuous Flow'],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): ProjectItem[] {
  return PROJECTS;
}
