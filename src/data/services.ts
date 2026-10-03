export interface ServiceApproach {
  hook: string;
  pacing: string;
  captions: string;
  sound: string;
  motion: string;
}

export interface ServiceBeforeAfter {
  beforeState: string;
  editingDecisions: string;
  finalOutcome: string;
}

export interface ServicePillar {
  slug: string;
  path: string;
  nameFa: string;
  nameEn: string;
  heroTagFa: string;
  heroTagEn: string;
  titleFa: string;
  titleEn: string;
  subtitleFa: string;
  subtitleEn: string;
  metaDescriptionFa: string;
  metaDescriptionEn: string;
  serviceType: string;
  iconName: string;
  supportedContentTypesFa: string[];
  supportedContentTypesEn: string[];
  editingApproachFa: ServiceApproach;
  editingApproachEn: ServiceApproach;
  beforeAfterFa: ServiceBeforeAfter;
  beforeAfterEn: ServiceBeforeAfter;
  whoItsForFa: { title: string; desc: string }[];
  whoItsForEn: { title: string; desc: string }[];
  whatsIncludedFa: string[];
  whatsIncludedEn: string[];
  philosophyFa: { heading: string; body: string };
  philosophyEn: { heading: string; body: string };
  workflowFa: { step: string; title: string; desc: string }[];
  workflowEn: { step: string; title: string; desc: string }[];
  pricingGuidanceFa: {
    recommendedTier: string;
    details: string;
    turnaround: string;
  };
  pricingGuidanceEn: {
    recommendedTier: string;
    details: string;
    turnaround: string;
  };
  faqsFa: { question: string; answer: string }[];
  faqsEn: { question: string; answer: string }[];
  relatedWorkSlugs: string[];
  relatedResourceSlugs: string[];
}

export const SERVICES_DATA: Record<string, ServicePillar> = {
  'short-form-video-editing': {
    slug: 'short-form-video-editing',
    path: '/services/short-form-video-editing',
    nameFa: 'تدوین شورتس و ریلز',
    nameEn: 'Short-Form Video Editing',
    heroTagFa: 'ستون اصلی خدمات حس‌لب',
    heroTagEn: 'Core Pillar Service',
    titleFa: 'تدوین ویدیوی کوتاه برای کریتورها، بنیان‌گذاران و برندها',
    titleEn: 'High-Retention Short-Form Video Editing for Creators & Brands',
    subtitleFa: 'ادیت با ضرب‌آهنگ مهندسی‌شده، هوک‌های ۳ ثانیه‌ای میخکوب‌کننده، زیرنویس‌های پویا و طراحی صدای سه‌بعدی برای فتح الگوریتم ریلز و شورتس.',
    subtitleEn: 'Engineered narrative pacing, 3-second hooks, kinetic subtitles, and spatial sound design built to capture attention and boost algorithmic completion rates.',
    metaDescriptionFa: 'خدمات تخصصی تدوین ویدیوهای کوتاه، اینستاگرام ریلز، یوتیوب شورتس و تیک‌تاک توسط حس‌لب با تمرکز بر حفظ حداکثری نگاه مخاطب و هویت بصری یکپارچه.',
    metaDescriptionEn: 'Professional short-form video editing for Reels, Shorts, and TikTok. High-retention editing, custom sound design, kinetic typography, and fast turnaround.',
    serviceType: 'VideoEditingService',
    iconName: 'VideoPlay',
    supportedContentTypesFa: ['ویدیوهای صحبت مستقیم (Talking Head)', 'پادکست و گفتگوهای دونفره', 'ولاگ‌های سرعتی و مسافرتی', 'ویدیوهای آموزشی و نرم‌افزاری', 'تیزرهای تبلیغاتی محصول'],
    supportedContentTypesEn: ['Talking-Head Creator Videos', 'Podcast & Interview Clips', 'Fast-Paced Vlogs', 'Educational Tech Demos', 'Product Commercial Teasers'],
    editingApproachFa: {
      hook: 'جداسازی جذاب‌ترین جمله یا شوک بصری در فریم صفر برای جلوگیری از سوایپ کاربر.',
      pacing: 'حذف تک‌تک میلی‌ثانیه‌های سکوت و مکث‌های غیرضروری برای حفظ پویایی مداوم.',
      captions: 'زیرنویس کلمه به کلمه همگام با صوت، همراه با فونت اختصاصی و هایلایت واژه‌های کلیدی.',
      sound: 'استفاده از وووش‌ها، کلیک‌های تاچ و ساند افکت‌های ضربه‌ای برای ایجاد عمق شنیداری.',
      motion: 'زوم‌های نرم متناوب و نمودارهای گرافیکی برای هدایت مسیر نگاه مخاطب.',
    },
    editingApproachEn: {
      hook: 'Front-loading the most contrarian statement or visual curiosity at frame zero to prevent swipe-aways.',
      pacing: 'Millisecond-level silence removal and momentum editing ensuring seamless visual rhythm.',
      captions: 'Word-by-word kinetic captions styled to your custom typography with colored semantic highlights.',
      sound: 'Layered tactile audio, dynamic risers, and impact transients establishing auditory immersion.',
      motion: 'Smooth directional punch-in zooms and animated graphical cues directing viewer gaze.',
    },
    beforeAfterFa: {
      beforeState: 'فوتیج خام با نور معمولی، مکث‌های متوالی گوینده، فقدان هوک و نرخ خروج ۶۵٪ در ثانیه اول.',
      editingDecisions: 'برش جسورانه ۳۵ ثانیه اول، ایجاد هوک صوتی وووش با کلاژ متنی، تنظیم کالر گریدینگ شاداب و زیرنویس متحرک.',
      finalOutcome: 'ویدیوی ۳۴ ثانیه‌ای پرانرژی با میانگین تماشای ۸۴٪ و جذب کامنت‌های تحسین‌برانگیز.',
    },
    beforeAfterEn: {
      beforeState: 'Flat raw footage with dead-air pauses, uninspired framing, and heavy 65% drop-off in the first second.',
      editingDecisions: 'Aggressive trimming, dynamic sound riser hook, tailored color grading, and responsive motion graphics.',
      finalOutcome: 'A compelling 34-second vertical edit achieving 84% average retention and high engagement.',
    },
    whoItsForFa: [
      {
        title: 'تولیدکنندگان محتوا و یوتیوبرها',
        desc: 'کریتورهایی که می‌خواهند با ریلزهای جذاب و حرفه‌ای، فالوورهای وفادار جذب کنند و نرخ وایرالیتی را ارتقا دهند.',
      },
      {
        title: 'بنیان‌گذاران استارتاپ و پرسنال برندها',
        desc: 'افرادی که می‌خواهند در لینکدین و اینستاگرام محتوای تخصصی جذاب با پرستیژ بصری بالا منتشر کنند.',
      },
      {
        title: 'کسب‌وکارها و فروشگاه‌های آنلاین',
        desc: 'برندهایی که می‌خواهند محصولات و خدمات خود را در قالب ویدیوهای کوتاه جذاب به فروش برسانند.',
      },
    ],
    whoItsForEn: [
      {
        title: 'Content Creators & YouTubers',
        desc: 'Creators looking to drive follower growth and high viewer retention through engaging vertical content.',
      },
      {
        title: 'Startup Founders & Personal Brands',
        desc: 'Professionals looking to establish authority and trust with sleek, high-prestige short videos.',
      },
      {
        title: 'E-commerce & Digital Brands',
        desc: 'Businesses aiming to turn organic viewers into paying customers with conversion-focused video pacing.',
      },
    ],
    whatsIncludedFa: [
      'برش میلی‌ثانیه‌ای دقیق فوتیج خام و حذف کامل مکث‌ها و تپق‌ها',
      'طراحی هوک تصویری و کلامی در ۳ ثانیه اول ویدیو',
      'زیرنویس کینتیک سفارشی با فونت اختصاصی و انیمیشن روان',
      'طراحی صدای چندلایه‌ای (وووش، کلیک، بوم و افکت‌های ضربه‌ای)',
      'افزودن بیست‌کات، نمودار، تصاویر مرتبط و میم‌های به جا',
      'اصلاح رنگ سینمایی و بهبود کیفیت نور و چهره',
      'خروجی بهینه با کیفیت 4K و 1080p برای اینستاگرام و یوتیوب',
      'پشتیبانی و اصلاحات سریع تا رضایت کامل شما',
    ],
    whatsIncludedEn: [
      'Millisecond-accurate raw footage cut removing filler words and pauses',
      'Engineered visual & verbal 3-second attention hooks',
      'Kinetic word-by-word animated captions tailored to your brand font',
      'Multi-track sound design with cinematic transitions and risers',
      'Relevant visual b-roll overlays, graphs, and UI screenshots',
      'Cinematic color grading and skin-tone enhancement',
      'Crisp 4K/1080p compression optimized for Instagram and YouTube Shorts',
      'Quick turnarounds with hassle-free revisions until perfection',
    ],
    philosophyFa: {
      heading: 'فلسفه تدوین حس‌لب: احترام به توجه انسان',
      body: 'ما ویدیوها را با افکت‌های تصادفی و شلوغ پر نمی‌کنیم. هر ثانیه از تدوین باید دلیلی برای ماندن به کاربر بدهد. سرعت کات‌ها متناسب با انرژی کلمات گوینده تنظیم می‌شود و طراحی صدا حس لامسه بصری ایجاد می‌کند.',
    },
    philosophyEn: {
      heading: 'The HesLab Editing Philosophy: Respecting Viewer Attention',
      body: 'We do not overload videos with pointless animations. Every visual transition and sound effect serves one clear purpose: pulling the viewer into the core idea and maintaining effortless watch time.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال فوتیج خام', desc: 'لینک درایو یا فایل ویدیوی خام خود را بدون نیاز به آماده‌سازی پیچیده ارسال کنید.' },
      { step: '۰۲', title: 'تدوین و هوک‌نویسی', desc: 'ما راف‌کات اولیه، ساختار هوک و لایه‌بندی ساند دیزاین را پیاده‌سازی می‌کنیم.' },
      { step: '۰۳', title: 'بازبینی آنلاین', desc: 'لینک نسخه اولیه را تماشا کرده و در صورت نیاز نکات اصلاحی را اعلام کنید.' },
      { step: '۰۴', title: 'تحویل نهایی آماده انتشار', desc: 'فایل با بالاترین کیفیت آماده آپلود در ریلز یا شورتس در اختیارتان قرار می‌گیرد.' },
    ],
    workflowEn: [
      { step: '01', title: 'Send Raw Footage', desc: 'Drop your raw video links into Google Drive or Frame.io.' },
      { step: '02', title: 'Craft & Pacing', desc: 'We engineer the hook, tighten the pacing, layer sound effects, and animate graphics.' },
      { step: '03', title: 'Frictionless Review', desc: 'Review the private cut and give instant timestamped feedback.' },
      { step: '04', title: 'Final Delivery', desc: 'Download your high-resolution render ready for instant publish.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج رشد (Growth) — ۱۲ ویدیو در ماه',
      details: 'برای کریتورهایی که می‌خواهند ۳ بار در هفته ویدیوی حرفه‌ای منتشر کنند و الگوریتم را تغذیه نمایند.',
      turnaround: 'تحویل ۲۴ تا ۴۸ ساعته برای هر ویدیو',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Growth Tier — 12 Videos / Month',
      details: 'Best for creators publishing 3 high-impact reels weekly to maintain continuous audience momentum.',
      turnaround: '24-48 hour turnaround per video',
    },
    faqsFa: [
      {
        question: 'چطور فایل‌های خام را برای شما ارسال کنم؟',
        answer: 'بهترین راه استفاده از گوگل درایو، دراپ‌باکس یا WeTransfer است. نیازی به تفکیک فایل‌ها ندارید؛ کافیست پوشه ضبط شده را بفرستید.',
      },
      {
        question: 'آیا برای ویدیوها خودتان موزیک و افکت صوتی انتخاب می‌کنید؟',
        answer: 'بله، ما آرشیو کاملی از موزیک‌های مجاز تجاری و افکت‌های صوتی اختصاصی داریم و بهترین قطعه را بر اساس مود ویدیوی شما تنظیم می‌کنیم.',
      },
      {
        question: 'اگر تغییری در ویدیو بخواهم چه می‌شود؟',
        answer: 'اصلاحات منطقی (مانند تغییر واژه‌ها، رنگ یا زمان‌بندی کات‌ها) تا رسیدن به نتیجه مطلوب بدون هزینه اضافه انجام می‌شود.',
      },
    ],
    faqsEn: [
      {
        question: 'How do I send my raw footage?',
        answer: 'Simply share a Google Drive, Dropbox, or WeTransfer link. No need for complex preparation; we handle the culling.',
      },
      {
        question: 'Do you select royalty-free background music and SFX?',
        answer: 'Yes, we curate commercially licensed soundtracks and bespoke sound effects matching the precise energy of your content.',
      },
      {
        question: 'What if I need revisions?',
        answer: 'Reasonable revisions regarding text, audio balancing, or pacing adjustments are completely included until you are fully satisfied.',
      },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'crypto-empire-documentary', 'founder-routine-podcast'],
    relatedResourceSlugs: ['short-form-video-hooks-retention', 'podcast-to-shorts-workflow'],
  },

  'instagram-reels-editing': {
    slug: 'instagram-reels-editing',
    path: '/services/instagram-reels-editing',
    nameFa: 'تدوین اینستاگرام ریلز',
    nameEn: 'Instagram Reels Editing',
    heroTagFa: 'بهینه‌سازی برای الگوریتم اینستاگرام',
    heroTagEn: 'Instagram Algorithm Optimized',
    titleFa: 'خدمات تدوین حرفه‌ای اینستاگرام ریلز برای افزایش ریچ و تعامل',
    titleEn: 'Professional Instagram Reels Video Editing Services',
    subtitleFa: 'ادیت متناسب با رفتارهای اسکرول کاربران اینستاگرام، قلاب‌های بصری، زیرنویس‌های تمیز بدون مزاحمت برای آیکون‌های UI و ترنزیشن‌های ترند.',
    subtitleEn: 'Engineered for Instagram feed mechanics: safe-zone UI layout, high completion signals, shareable hooks, and trend-aware visual pacing.',
    metaDescriptionFa: 'ادیتور تخصصی اینستاگرام ریلز. افزایش بازدید ارگانیک و نرخ شیر ویدیوها با تدوین سرعتی، هوک ۳ ثانیه‌ای و طراحی صدای اختصاصی توسط حس‌لب.',
    metaDescriptionEn: 'Hire an experienced Instagram Reels video editor. High retention, custom animated subtitles, and rapid turnaround for creators and brands.',
    serviceType: 'VideoEditingService',
    iconName: 'VideoPlay',
    supportedContentTypesFa: ['ریلزهای آموزشی و مشاوره', 'ریلز معرفی و بررسی محصول', 'ریلزهای کلاژ و ولاگ لایف‌استایل', 'تیزرهای رویداد و ورکشاپ'],
    supportedContentTypesEn: ['Educational & Consulting Reels', 'E-commerce Product Features', 'Vlog & Travel Lifestyle Reels', 'Event & Launch Teasers'],
    editingApproachFa: {
      hook: 'طراحی فریم اول با متن بزرگ خوانا درون محدوده امن اینستاگرام (Safe Zone).',
      pacing: 'برش‌های تمیز متناسب با ضرب‌آهنگ موزیک‌های ترند اینستاگرام.',
      captions: 'زیرنویس در مرکز کادر تا با دکمه‌های لایک، کامنت و کپشن تداخل پیدا نکند.',
      sound: 'میکس شفاف گفتار به گونه‌ای که حتی در ولوم‌های پایین موبایل مفهوم باشد.',
      motion: 'ترنزیشن‌های کات نوری و زوم حرکتی متناسب با زبان بصری مدرن.',
    },
    editingApproachEn: {
      hook: 'Safe-zone framed visual hook stopping the scroll before thumb swipe movement.',
      pacing: 'Snappy transient editing synchronized with high-tempo audio tracks.',
      captions: 'Center-aligned subtitles avoiding native Instagram UI overlays.',
      sound: 'Pristine voice EQ tuned specifically for mobile speaker playback.',
      motion: 'Subtle motion graphic arrows, stickers, and brand icons.',
    },
    beforeAfterFa: {
      beforeState: 'ویدیوی افقی یا عمودی نامنظم با زیرنویس چسبیده به دکمه‌های اینستاگرام و نرخ اشتراک‌گذاری پایین.',
      editingDecisions: 'تغییر کادر به نسبت ۹:۱۶ دقیق، تنظیم زیرنویس در کادر ایمن، افزودن هوک متنی و طراحی صدای اختصاصی.',
      finalOutcome: 'افزایش چشمگیر زمان تماشا (Watch Time) و قرارگیری مداوم در صفحه Explore اینستاگرام.',
    },
    beforeAfterEn: {
      beforeState: 'Poorly cropped raw recording with subtitles covered by Instagram action icons.',
      editingDecisions: 'Re-framed into pure 9:16 safe zone, added dynamic hook, and layered sound transients.',
      finalOutcome: 'Significant rise in completion rate and repeat views driving organic Explore distribution.',
    },
    whoItsForFa: [
      { title: 'کریتورهای اینستاگرام', desc: 'تولیدکنندگانی که به دنبال رشد سریع پیج و جذب فالوورهای هدفمند هستند.' },
      { title: 'کسب‌وکارهای اینستاگرامی', desc: 'برندهایی که می‌خواهند از طریق ریلز فروش و لید جذب کنند.' },
      { title: 'مدرسان و کوچ‌ها', desc: 'ارائه نکات تخصصی در قالب ویدیوهای کوتاه پرمخاطب.' },
    ],
    whoItsForEn: [
      { title: 'Instagram Creators', desc: 'Content creators scaling their audience with daily high-value vertical reels.' },
      { title: 'E-commerce Businesses', desc: 'Direct-to-consumer brands driving product sales through short reels.' },
      { title: 'Coaches & Consultants', desc: 'Thought leaders building high-trust authority in their niche.' },
    ],
    whatsIncludedFa: [
      'تنظیم دقیق نسبت ابعاد ۹:۱۶ با در نظر گرفتن منطقه امن اینستاگرام',
      'طراحی هوک جذاب و کات‌های ضربه‌ای',
      'افزودن زیرنویس خوانا با رنگ‌بندی اختصاصی پیج شما',
      'انتخاب موزیک مجاز و ساند افکت‌های هماهنگ',
      'تحویل در بازه زمانی ۲۴ تا ۴۸ ساعته',
    ],
    whatsIncludedEn: [
      'Precision 9:16 vertical formatting conforming to Instagram safe zones',
      'Engaging 3-second hook cut and dynamic pacing',
      'Bespoke animated captions aligned with your brand color palette',
      'Curated royalty-free music and custom sound effects',
      'Rapid 24-48h turnaround delivery',
    ],
    philosophyFa: {
      heading: 'فلسفه ریلز در حس‌لب: تبدیل رهگذر به مخاطب دائمی',
      body: 'کاربران اینستاگرام بسیار بی‌حوصله‌اند. اگر ریلز در ثانیه اول وعده ارزشمندی ندهد، شانس خوانده شدن کپشن یا فالو کردن پیج از بین می‌رود. ما ویدیوها را برای تعامل حداکثری و تحریک به سیو و شیر می‌سازیم.',
    },
    philosophyEn: {
      heading: 'The HesLab Reels Approach: Converting Scrollers into Followers',
      body: 'Instagram attention is fleeting. If a Reel does not provide an immediate visual and auditory hook, the chance of retention is lost. We craft edits specifically designed to drive saves and shares.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال ضبط‌ها', desc: 'ویدیوهای ضبط شده با موبایل یا دوربین را در درایو قرار دهید.' },
      { step: '۰۲', title: 'ادیت و طراحی صدا', desc: 'تیم حس‌لب ویدیو را در چارچوب ریلز استاندارد تدوین می‌کند.' },
      { step: '۰۳', title: 'تایید و انتشار', desc: 'ویدیو با کیفیت بالا و آماده انتشار به شما تحویل داده می‌شود.' },
    ],
    workflowEn: [
      { step: '01', title: 'Upload Raw Clips', desc: 'Drop your smartphone or camera footage directly into Drive.' },
      { step: '02', title: 'Editing & Sound', desc: 'We engineer the pacing, add captions, and balance audio.' },
      { step: '03', title: 'Publish Ready', desc: 'Download your pristine 4K vertical render ready to post.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج ماهانه ۱۲ یا ۲۰ ریلز',
      details: 'بهترین انتخاب برای حفظ ریتم انتشار هفتگی و کاهش هزینه به ازای هر ویدیو.',
      turnaround: 'تحویل منظم طبق تقویم',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Monthly 12 or 20 Reels Package',
      details: 'Optimized for sustained posting frequency with significant per-video savings.',
      turnaround: 'Predictable scheduled deliveries',
    },
    faqsFa: [
      { question: 'آیا ویدیوهای ضبط شده با گوشی آیفون را هم ادیت می‌کنید؟', answer: 'بله، بیش از نیمی از پروژه‌های ریلز با کیفیت عالی آیفون ضبط و در حس‌لب حرفه‌ای تدوین می‌شوند.' },
      { question: 'آیا برای ریلز کاور هم طراحی می‌کنید؟', answer: 'بله، یک فریم جذاب یا کاور مینیمال متناسب با گرید پیج شما به عنوان پوستر ارائه می‌شود.' },
    ],
    faqsEn: [
      { question: 'Do you edit footage shot on smartphones/iPhones?', answer: 'Absolutely. High-grade smartphone footage can look studio-grade with our color and sound grading.' },
      { question: 'Do you provide cover frames?', answer: 'Yes, we select and style a clean cover frame fitting seamlessly into your profile grid.' },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'founder-routine-podcast', 'creator-growth-story'],
    relatedResourceSlugs: ['short-form-video-hooks-retention', 'short-form-video-editing-cost-guide'],
  },

  'youtube-shorts-editing': {
    slug: 'youtube-shorts-editing',
    path: '/services/youtube-shorts-editing',
    nameFa: 'تدوین یوتیوب شورتس',
    nameEn: 'YouTube Shorts Editing',
    heroTagFa: 'بهینه‌سازی برای الگوریتم یوتیوب',
    heroTagEn: 'YouTube Algorithm Optimized',
    titleFa: 'تدوین یوتیوب شورتس با نگه‌داشت بالا برای رشد کانال‌های یوتیوب',
    titleEn: 'High-Retention YouTube Shorts Video Editing Services',
    subtitleFa: 'افزایش نرخ Viewed vs Swiped Away، طراحی ساختارهای لوپ بی‌نهایت، تایپوگرافی کینتیک و کات‌های سرعتی برای تبدیل بیننده شورتس به سابسکرایبر کانال.',
    subtitleEn: 'Engineered specifically for YouTube Shorts feed retention, seamless loop structures, kinetic storytelling, and channel subscriber conversion.',
    metaDescriptionFa: 'خدمات تدوین یوتیوب شورتس توسط استودیو حس‌لب. افزایش Viewed Rate و Watch Time با ادیتور حرفه‌ای شورتس برای یوتیوبرها و برندها.',
    metaDescriptionEn: 'Professional YouTube Shorts video editing. Maximize Viewed vs Swiped Away metrics with seamless loop transitions and dynamic pacing by HesLab.',
    serviceType: 'VideoEditingService',
    iconName: 'VideoPlay',
    supportedContentTypesFa: ['برش و تبدیل ویدیوهای طولانی یوتیوب به شورتس', 'شورتس‌های کدنویسی و معرفی ابزار', 'شورتس‌های داستانی و مستند کوتاه', 'نکات سریع آموزشی و ترفندها'],
    supportedContentTypesEn: ['YouTube Long-Form to Shorts Cuts', 'Software & Tech Quick Tips', 'Micro-Documentary Stories', 'High-Energy Educational Shorts'],
    editingApproachFa: {
      hook: 'شروع مستقیم با گزاره تحریک‌کننده کنجکاوی در فریم اول برای غلبه بر Swiped Away.',
      pacing: 'ریتم پیوسته و بدون افت انرژی تا ثانیه آخر.',
      captions: 'زیرنویس داینامیک کینتیک متناسب با استانداردهای بصری یوتیوبرهای تراز اول.',
      sound: 'صداگذاری غنی با افکت‌های رضایت‌بخش (ASMR / Mechanical clicks / Risers).',
      motion: 'طراحی پایان ویدیو به صورت لوپ نامرئی (Seamless Loop) برای تماشای مجدد خودکار.',
    },
    editingApproachEn: {
      hook: 'Curiosity-driven intro at frame zero crushing the critical 1.5s swipe decision window.',
      pacing: 'Unrelenting forward momentum with zero audio dips.',
      captions: 'Dynamic kinetic word pops mirroring top-tier creator benchmarks.',
      sound: 'Crisp layered foley and tactile transients.',
      motion: 'Seamless loop endings reconnecting the last word directly to the intro.',
    },
    beforeAfterFa: {
      beforeState: 'ویدیوی خام با Viewed Rate زیر ۴۰٪ و خروج زودهنگام تماشاگران یوتیوب.',
      editingDecisions: 'اصلاح ساختار شروع، حذف مقدمه، تبدیل پایان به لوپ نامرئی و افزودن بیست‌کات‌های بصری.',
      finalOutcome: 'رسیدن Viewed Rate به بالای ۷۴٪ و افزایش نرخ سابسکرایب به ازای هر ۱۰۰۰ بازدید.',
    },
    beforeAfterEn: {
      beforeState: 'Shorts clip struggling below 40% Viewed vs Swiped Away rate.',
      editingDecisions: 'Front-loaded curiosity hook, removed dead air, and engineered a seamless loop ending.',
      finalOutcome: 'Viewed rate exceeding 74% with steady conversion of viewers into long-form subscribers.',
    },
    whoItsForFa: [
      { title: 'یوتیوبرهای در حال رشد', desc: 'کانال‌هایی که می‌خواهند از ترافیک عظیم فید شورتس برای جذب سابسکرایبر استفاده کنند.' },
      { title: 'کانال‌های پادکست و مصاحبه', desc: 'برش قطعات جذاب و هدایت مخاطب به اپیزودهای کامل.' },
      { title: 'تولیدکنندگان محتوای تکنولوژی', desc: 'معرفی سریع فیچرها و ترفندهای کاربردی در کمتر از ۴۵ ثانیه.' },
    ],
    whoItsForEn: [
      { title: 'Growing YouTubers', desc: 'Channels leveraging the massive Shorts shelf to funnel subscribers to main videos.' },
      { title: 'Podcast Creators', desc: 'Extracting viral teaser clips that send traffic to full-length episodes.' },
      { title: 'Tech & Tool Reviewers', desc: 'Concise, high-velocity breakdowns under 45 seconds.' },
    ],
    whatsIncludedFa: [
      'برش و تدوین اختصاصی برای الگوریتم یوتیوب شورتس',
      'طراحی لوپ نامرئی (در صورت امکان‌پذیر بودن سناریو)',
      'زیرنویس با کیفیت و انیمیشن کلمات',
      'کالر گریدینگ و بهبود کنتراست تصویر',
      'تحویل با رزولوشن 4K بدون افت کیفیت در پردازش یوتیوب',
    ],
    whatsIncludedEn: [
      'Bespoke pacing optimized for YouTube Shorts algorithmic metrics',
      'Seamless loop transition engineering where narrative allows',
      'High-legibility kinetic captions',
      'Contrast and dynamic range enhancement for mobile displays',
      '4K master renders preventing YouTube re-compression artifacts',
    ],
    philosophyFa: {
      heading: 'فلسفه شورتس: متریک Viewed vs Swiped Away پادشاه است',
      body: 'در یوتیوب شورتس، اگر کاربر ویدیو را در همان ثانیه اول رد کند، ویدیو می‌میرد. تمام تمرکز حس‌لب روی افزایش درصدی است که ویدیو را انتخاب و تا انتها تماشا می‌کنند.',
    },
    philosophyEn: {
      heading: 'The Shorts Paradigm: Viewed Rate is Everything',
      body: 'On YouTube Shorts, the ratio of viewers who chose to stay versus swipe away determines algorithmic reach. Our editing is surgically calibrated to win that initial choice.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال ویدیوهای طولانی یا خام', desc: 'فایل کامل را بفرستید یا تایم‌کدهای دلخواهتان را مشخص کنید.' },
      { step: '۰۲', title: 'استخراج و تدوین شورتس', desc: 'ما قطعات مستعد وایرالیتی را استخراج و ادیت می‌کنیم.' },
      { step: '۰۳', title: 'تحویل نسخه بهینه', desc: 'فایل نهایی همراه با پیشنهاد تایتل برای یوتیوب ارائه می‌شود.' },
    ],
    workflowEn: [
      { step: '01', title: 'Send Long-form or Raw', desc: 'Provide your long video or specify timestamp highlights.' },
      { step: '02', title: 'Shorts Extraction & Edit', desc: 'We pinpoint high-retention segments and apply our dynamic style.' },
      { step: '03', title: 'Final Delivery', desc: 'Receive YouTube-optimized vertical video files ready to schedule.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج بازنشر محتوا یا پکیج ماهانه شورتس',
      details: 'از هر ویدیوی بلند یوتیوب می‌توان بین ۳ تا ۸ شورتس باکیفیت استخراج کرد.',
      turnaround: 'تحویل در ۴۸ ساعت',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Content Repurposing / Monthly Shorts Retainer',
      details: 'Extract 3 to 8 high-performing Shorts from each long-form episode.',
      turnaround: '48-hour delivery cadence',
    },
    faqsFa: [
      { question: 'آیا برای شورتس عنوان و هشتگ هم پیشنهاد می‌دهید؟', answer: 'بله، برای هر ویدیوی شورتس تایتل بهینه‌شده برای نرخ کلیک و سئو پیشنهاد می‌شود.' },
      { question: 'طول ایده‌آل شورتس چقدر است؟', answer: 'بهترین نرخ نگه‌داشت معمولاً بین ۲۵ تا ۴۲ ثانیه ثبت می‌شود.' },
    ],
    faqsEn: [
      { question: 'Do you recommend titles and tags?', answer: 'Yes, each Shorts delivery includes an algorithmic-friendly title recommendation.' },
      { question: 'What is the ideal Shorts duration?', answer: 'Highest completion rates are consistently observed between 25 and 42 seconds.' },
    ],
    relatedWorkSlugs: ['crypto-empire-documentary', 'ai-tools-breakdown'],
    relatedResourceSlugs: ['podcast-to-shorts-workflow', 'short-form-video-hooks-retention'],
  },

  'social-media-video-editing': {
    slug: 'social-media-video-editing',
    path: '/services/social-media-video-editing',
    nameFa: 'تدوین ویدیو برای شبکه‌های اجتماعی',
    nameEn: 'Social Media Video Editing',
    heroTagFa: 'پوشش چندپلتفرمه',
    heroTagEn: 'Multi-Platform Video',
    titleFa: 'خدمات تدوین ویدیو برای شبکه‌های اجتماعی (اینستاگرام، یوتیوب، تیک‌تاک و لینکدین)',
    titleEn: 'Social Media Video Editing for Multi-Platform Publishing',
    subtitleFa: 'یکبار ضبط کنید؛ در تمام پلتفرم‌ها بدرخشید. تدوین تخصصی متناسب با لحن و فرمت هر شبکه اجتماعی با یکپارچگی هویت بصری برند شما.',
    subtitleEn: 'Record once, dominate everywhere. Custom multi-platform video editing tailored to the distinct cultural norms of Instagram, YouTube, TikTok, and LinkedIn.',
    metaDescriptionFa: 'تدوین ویدیوهای شبکه‌های اجتماعی توسط استودیو حس‌لب. تولید و بهینه‌سازی محتوا برای اینستاگرام، تیک‌تاک، شورتس و لینکدین با کیفیت سینمایی.',
    metaDescriptionEn: 'Multi-platform social media video editing by HesLab. Tailored formatting, kinetic motion, and fast turnarounds for brands and creators.',
    serviceType: 'VideoEditingService',
    iconName: 'Flash',
    supportedContentTypesFa: ['ویدیوهای لینکدین بنیان‌گذاران', 'کمپین‌های ویدیویی چندکاناله', 'محتوای آموزشی چندپلتفرمه', 'تیزرهای رویداد و اطلاعیه‌ها'],
    supportedContentTypesEn: ['Founder LinkedIn Video Thought Leadership', 'Omnichannel Video Campaigns', 'Cross-Platform Educational Series', 'Brand Event & Announcement Teasers'],
    editingApproachFa: {
      hook: 'تنظیم هوک متناسب با فضای هر پلتفرم (رسمی‌تر برای لینکدین، سرعتی‌تر برای ریلز و تیک‌تاک).',
      pacing: 'توزیع بهینه اطلاعات بدون اضافه گویی.',
      captions: 'زیرنویس چندزبانه یا فارسی با تایپوگرافی اصولی.',
      sound: 'طراحی صدای استاندارد هم برای گوشی و هم برای دسکتاپ.',
      motion: 'استفاده از هویت بصری و لوگوی شما برای ساختار یکدست در تمام کانال‌ها.',
    },
    editingApproachEn: {
      hook: 'Platform-conscious hook tailoring (professional for LinkedIn, high-velocity for TikTok).',
      pacing: 'Information density tuned to audience expectations.',
      captions: 'Multi-lingual or styled typography with clear readability.',
      sound: 'Audio mastering balanced for both mobile speakers and desktop headphones.',
      motion: 'Cohesive brand elements unifying your presence across channels.',
    },
    beforeAfterFa: {
      beforeState: 'انتشار یک فایل یکسان بدون در نظر گرفتن تفاوت‌های محیطی اینستاگرام، یوتیوب و لینکدین.',
      editingDecisions: 'تنظیم نسخه‌های چندگانه با زیرنویس اختصاصی، کادربندی‌های استاندارد و اصلاح ریتم برای هر جامعه مخاطب.',
      finalOutcome: 'رشد هماهنگ حضور برند در تمام شبکه‌های اجتماعی با کمترین صرف وقت از سوی کارفرما.',
    },
    beforeAfterEn: {
      beforeState: 'Single unoptimized video file cross-posted haphazardly across incompatible platforms.',
      editingDecisions: 'Engineered tailored cuts with native safe zones, pacing variants, and platform-specific caption styles.',
      finalOutcome: 'Unified brand expansion across Instagram, YouTube, and LinkedIn with zero added filming overhead.',
    },
    whoItsForFa: [
      { title: 'برندها و استارتاپ‌ها', desc: 'تیم‌هایی که می‌خواهند با یک بار ضبط، در تمام کانال‌های اجتماعی حضور قدرتمند داشته باشند.' },
      { title: 'کریتورهای مولتی‌پلتفرم', desc: 'سازندگانی که همزمان اینستاگرام، یوتیوب و تلگرام را مدیریت می‌کنند.' },
      { title: 'آژانس‌های بازاریابی محتوا', desc: 'برون‌سپاری بخش تدوین با کیفیت تضمین‌شده و تحویل سریع.' },
    ],
    whoItsForEn: [
      { title: 'Brands & Tech Startups', desc: 'Companies seeking maximum omnichannel content leverage from minimal recording time.' },
      { title: 'Omnichannel Creators', desc: 'Creators maintaining active communities across YouTube, Instagram, and TikTok.' },
      { title: 'Marketing Agencies', desc: 'Outsourcing high-tier video post-production with strict deadlines.' },
    ],
    whatsIncludedFa: [
      'بهینه‌سازی نسبت ابعاد (۹:۱۶ عمودی، ۱:۱ مربعی، یا ۱۶:۹ افقی)',
      'زیرنویس خوانا برای تماشای بدون صدا (Silent Viewing)',
      'ساند افکت‌ها و موسیقی با مجوز تجاری',
      'فولدر ابری اشتراکی و هماهنگی سریع',
    ],
    whatsIncludedEn: [
      'Aspect ratio optimization (9:16 vertical, 1:1 square, or 16:9 widescreen)',
      'Silent-viewing optimized subtitles',
      'Commercial royalty-free sound engineering',
      'Shared cloud workspace with instant async feedback',
    ],
    philosophyFa: {
      heading: 'فلسفه مولتی‌پلتفرم: یک پیام، زبان‌های بومی مختلف',
      body: 'هر شبکه اجتماعی فرهنگ و قواعد بازی خودش را دارد. مخاطب لینکدین با دیدن ترنزیشن‌های جیغ تیک‌تاک فراری می‌شود و کاربر ریلز حوصله ویدیوهای خشک را ندارد. ما فرم ویدیو را متناسب با هر بستر بازآفرینی می‌کنیم.',
    },
    philosophyEn: {
      heading: 'Omnichannel Ethos: One Core Story, Native Dialects',
      body: 'Every social platform carries its own cultural norms. LinkedIn requires credible pacing, while TikTok demands kinetic immediacy. We re-craft your raw video into native formats that feel natural on every feed.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال ضبط‌ها', desc: 'محتوای اصلی را آپلود کنید و کانال‌های مقصد را مشخص نمایید.' },
      { step: '۰۲', title: 'تولید نسخه‌های بهینه', desc: 'نسخه‌های منطبق با هر شبکه اجتماعی ادیت می‌شوند.' },
      { step: '۰۳', title: 'تحویل منظم', desc: 'فایل‌ها نام‌گذاری‌شده و آماده آپلود تحویل داده می‌شوند.' },
    ],
    workflowEn: [
      { step: '01', title: 'Provide Source Video', desc: 'Upload your footage and indicate your target publishing channels.' },
      { step: '02', title: 'Tailored Cuts', desc: 'We produce native cuts formatted for each destination platform.' },
      { step: '03', title: 'Organized Delivery', desc: 'Receive cleanly labeled master files ready for social scheduling.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج‌های منظم ماهانه یا پروژه‌ای',
      details: 'تعرفه بر اساس تعداد ویدیو و تنوع پلتفرم‌ها محاسبه می‌شود.',
      turnaround: 'تحویل ۲۴ تا ۷۲ ساعته',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Monthly Omnichannel Retainers',
      details: 'Discounted per-video packages based on volume and multi-format requirements.',
      turnaround: '24-72 hour delivery',
    },
    faqsFa: [
      { question: 'آیا برای لینکدین هم ویدیو ادیت می‌کنید؟', answer: 'بله، ویدیوهای لینکدین با تمرکز بر پرستیژ کاری، زیرنویس دقیق و ریتم حرفه‌ای تدوین می‌شوند.' },
    ],
    faqsEn: [
      { question: 'Do you edit specifically for LinkedIn video?', answer: 'Yes, LinkedIn videos are styled with high visual prestige, concise pacing, and clear professional titling.' },
    ],
    relatedWorkSlugs: ['ai-tools-breakdown', 'tokyo-24h-vlog'],
    relatedResourceSlugs: ['short-form-video-editing-cost-guide', 'podcast-to-shorts-workflow'],
  },

  'personal-brand-video-editing': {
    slug: 'personal-brand-video-editing',
    path: '/services/personal-brand-video-editing',
    nameFa: 'تدوین ویدیو برای پرسنال برند',
    nameEn: 'Personal Brand Video Editing',
    heroTagFa: 'اعتبار و نفوذ کلام',
    heroTagEn: 'Executive Authority & Influence',
    titleFa: 'تدوین تخصصی ویدیو برای پرسنال برندها، بنیان‌گذاران و متخصصان',
    titleEn: 'Personal Brand Video Editing for Founders, Executives & Creators',
    subtitleFa: 'تبدیل دانش و تجربیات شما به ویدیوهای معتبر و جذاب. تدوین باوقار، هویت بصری ممتاز و انتقال پیام بدون جلوه‌های سطحی و شلخته.',
    subtitleEn: 'Turn your knowledge into magnetic personal authority. Refined pacing, prestige aesthetics, and thought-leadership video production that commands respect.',
    metaDescriptionFa: 'ادیتور تخصصی پرسنال برند و ویدیوهای تالکینگ‌هد بنیان‌گذاران. افزایش اعتبار و جذب فرصت‌های بیزینسی با تدوین ویدیویی استودیو حس‌لب.',
    metaDescriptionEn: 'Elevate your executive brand with HesLab. Bespoke personal brand video editing for founders, consultants, and creators seeking high-trust influence.',
    serviceType: 'VideoEditingService',
    iconName: 'User',
    supportedContentTypesFa: ['ویدیوهای روایتگری شخصی و درس‌های زندگی', 'تحلیل‌های تخصصی صنعت و تجارت', 'نکات راهبردی بنیان‌گذاران و مدیران ارشد', 'ویدیوهای معرفی رویداد و دستاوردها'],
    supportedContentTypesEn: ['Personal Founder Narrative & Growth Stories', 'In-Depth Industry & Market Breakdowns', 'Strategic Leadership & Management Insights', 'Keynote & Milestone Videos'],
    editingApproachFa: {
      hook: 'جلب توجه با طرح یک بینش عمیق یا پارادوکس ذهنی در ثانیه نخست.',
      pacing: 'ریتم ملایم و محکم که اجازه می‌دهد وزن کلمات گوینده احساس شود.',
      captions: 'تایپوگرافی مینیمال با رنگ‌بندی موقر و خوانایی بسیار بالا.',
      sound: 'موسیقی ملایم سینمایی یا لوفای با ساند افکت‌های ارگانیک و لطیف.',
      motion: 'اسکرین‌شات‌های مقالات، توییت‌ها، داده‌های نموداری و لوگوی اختصاصی.',
    },
    editingApproachEn: {
      hook: 'Leading with profound contrarian insight or strategic business paradox.',
      pacing: 'Measured, confident pacing allowing key intellectual points to land with weight.',
      captions: 'Minimalist editorial typography designed for high readability without juvenile noise.',
      sound: 'Subtle ambient cinematic soundtrack paired with organic tactile foley.',
      motion: 'Clean on-screen tweets, market graphs, and brand marks.',
    },
    beforeAfterFa: {
      beforeState: 'صحبت‌های طولانی و خسته‌کننده روبروی دوربین که با وجود محتوای ارزشمند، ویو و تعاملی نمی‌گیرد.',
      editingDecisions: 'استخراج عصاره کلام در ۶۰ ثانیه، کات زدن سکوت‌ها، افزودن نمودارهای بصری و گریدینگ رنگی گرم چهره.',
      finalOutcome: 'ویدیویی حرفه‌ای و پرستیژدار که توجه سرمایه‌گذاران، مشتریان بزرگ و فعالان صنعت را جلب می‌کند.',
    },
    beforeAfterEn: {
      beforeState: 'Valuable insights buried in rambling monologues failing to capture busy decision-makers.',
      editingDecisions: 'Distilled to 60 seconds of pure substance, added data overlays, and applied warm prestige color grading.',
      finalOutcome: 'An authoritative asset generating corporate inquiries, speaking invitations, and peer respect.',
    },
    whoItsForFa: [
      { title: 'بنیان‌گذاران و مدیران ارشد', desc: 'افرادی که می‌خواهند نام خود را با رهبری فکری و تخصص در بازار گره بزنند.' },
      { title: 'مشاوران و منتورهای بیزینس', desc: 'متخصصانی که ارزش خدماتشان وابسته به میزان اعتماد و اعتبار اولیه است.' },
      { title: 'کریتورهای حوزه‌های جدی', desc: 'سازندگان محتوای مالی، تکنولوژی، پزشکی و حقوقی که شلوغ‌کاری سطحی به اعتبارشان ضربه می‌زند.' },
    ],
    whoItsForEn: [
      { title: 'Founders & CEOs', desc: 'Executives building category authority and attracting enterprise opportunities.' },
      { title: 'High-Ticket Consultants', desc: 'Advisors whose business depends on undeniable professional trust.' },
      { title: 'Serious Niche Creators', desc: 'Creators in tech, finance, legal, and medicine requiring intellectual prestige over cheap gimmicks.' },
    ],
    whatsIncludedFa: [
      'اصلاح رنگ پوست و پرتره برای ظاهری آراسته و طبیعی',
      'حذف دقیق تپق‌ها بدون افت پیوستگی کلام',
      'انیمیشن مستندات، نمودارها و ارجاعات متنی',
      'طراحی اینترو و اوتروی اختصاصی پرسنال برند',
      'پشتیبانی مستقیم و تعامل با تدوین‌گر ارشد',
    ],
    whatsIncludedEn: [
      'Portrait and skin-tone grading for natural executive polish',
      'Surgical cadence editing preserving natural vocal cadence without stutter',
      'Motion graphics for data charts, article highlights, and quotes',
      'Custom personal brand signature title animations',
      'Direct asynchronous collaboration with lead editor',
    ],
    philosophyFa: {
      heading: 'فلسفه پرسنال برند: محتوا، کارت ویزیت دیجیتال شماست',
      body: 'یک ویدیوی ضعیف می‌تواند ماه‌ها تلاش برای ساخت پرستیژ کاری را خدشه‌دار کند. ما ویدیوهای شما را طوری ادیت می‌کنیم که نماینگر بالاترین سطح استاندارد حرفه‌ای شما باشد.',
    },
    philosophyEn: {
      heading: 'The Personal Brand Standard: Your Digital Reputation',
      body: 'Low-effort editing damages hard-won executive reputation. We edit your video content to communicate the unmistakable caliber of your real-world expertise.',
    },
    workflowFa: [
      { step: '۰۱', title: 'بررسی لحن و هویت', desc: 'سبک صحبت و پرسونای برند شخصی شما را بررسی و همسو می‌کنیم.' },
      { step: '۰۲', title: 'تدوین باوقار', desc: 'کات‌های دقیق و متریال‌های گرافیکی با استاندارد بالا اضافه می‌شوند.' },
      { step: '۰۳', title: 'خروجی آماده انتشار', desc: 'ویدیوها همراه با پیشنهاد تیترهای جذاب تحویل داده می‌شوند.' },
    ],
    workflowEn: [
      { step: '01', title: 'Tone & Persona Alignment', desc: 'We align on your communication style and brand visual language.' },
      { step: '02', title: 'Prestige Post-Production', desc: 'Surgical cut, data animations, and subtle audio mastering.' },
      { step: '03', title: 'High-Res Delivery', desc: 'Ready-to-post vertical files delivered directly to your queue.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج ماهانه رشد (۱۲ ویدیو) یا پکیج اختصاصی',
      details: 'همکاری منظم برای تثبیت نام شما در ذهن مخاطبان شبکه اجتماعی.',
      turnaround: 'تحویل ۴۸ ساعته',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Monthly Growth (12 Videos) or Custom Retainer',
      details: 'Consistent presence reinforcing your authority every single week.',
      turnaround: '48-hour delivery',
    },
    faqsFa: [
      { question: 'من زیاد مکث می‌کنم و تپق می‌زنم، آیا در ادیت درست می‌شود؟', answer: 'قطعاً. تکنیک‌های کات نامرئی (Jump Cut Smoothening) و زوم‌های تدریجی باعث می‌شوند روان و بی‌نقص به نظر برسید.' },
    ],
    faqsEn: [
      { question: 'I pause frequently and stumble on words. Can editing fix this?', answer: 'Yes. Our micro-cadence cuts and seamless jump transitions make your delivery sound fluid and effortless.' },
    ],
    relatedWorkSlugs: ['founder-routine-podcast', 'creator-growth-story'],
    relatedResourceSlugs: ['how-to-make-talking-head-videos-engaging', 'how-to-brief-a-video-editor'],
  },

  'podcast-video-editing': {
    slug: 'podcast-video-editing',
    path: '/services/podcast-video-editing',
    nameFa: 'تدوین ویدیو پادکست و گفتگو',
    nameEn: 'Podcast Video Editing & Repurposing',
    heroTagFa: 'استخراج قطعات طلایی پادکست',
    heroTagEn: 'Micro-Clip Extraction Engine',
    titleFa: 'تدوین ویدیو پادکست و استخراج شورتس‌های وایرال از مصاحبه‌ها',
    titleEn: 'Video Podcast Editing & Viral Clip Extraction Services',
    subtitleFa: 'اپیزودهای یک‌ساعته خود را به ماشین تولید محتوای شبکه‌های اجتماعی تبدیل کنید. شناسایی هوشمندانه قطعات پرتعامل، زیرنویس پویا و کادربندی دونفره حرفه‌ای.',
    subtitleEn: 'Turn full-length podcast recordings into high-converting social clips. Automated moment detection, split-screen mobile framing, and animated captions.',
    metaDescriptionFa: 'تبدیل پادکست به ریلز و شورتس با تدوین حرفه‌ای حس‌لب. استخراج قطعات طلایی، کادربندی عمودی و طراحی صدای سینمایی پادکست ویدیویی.',
    metaDescriptionEn: 'Podcast video editing by HesLab. We transform long-form podcast recordings into viral Reels, Shorts, and TikTok clips with animated subtitles.',
    serviceType: 'VideoEditingService',
    iconName: 'Microphone2',
    supportedContentTypesFa: ['مصاحبه‌های دو نفره یا چند نفره پادکست', 'اپیزودهای انفرادی صوتی همراه با تصویر', 'وبینارها و جلسات استریم ضبط شده', 'مکالمات ویدیویی زوم و گوگل‌میت'],
    supportedContentTypesEn: ['Two-Host & Guest Podcast Recordings', 'Solo Long-Form Episodes', 'Recorded Webinars & Live Streams', 'Zoom & Remote Video Interviews'],
    editingApproachFa: {
      hook: 'استخراج تکان‌دهنده‌ترین جمله مهمان یا مجری در ثانیه نخست کلیپ.',
      pacing: 'حفظ ضرب‌آهنگ طبیعی مکالمه همراه با حذف حاشیه‌ها و لکنت‌ها.',
      captions: 'زیرنویس متمایز با دو رنگ مجزا برای مجری و مهمان.',
      sound: 'اکولایزر و پالایش نویز صدای میکروفون برای وضوح کلمه به کلمه.',
      motion: 'سوئیچ خودکار کادر روی گوینده فعال (Active Speaker Switching) یا اسپلیت اسکرین عمودی.',
    },
    editingApproachEn: {
      hook: 'Front-loading the guest’s most provocative or vulnerable confession.',
      pacing: 'Preserving conversational authenticity while tightening dead air.',
      captions: 'Color-coded dual speaker captions clearly distinguishing host and guest.',
      sound: 'Broadcast voice mastering and noise isolation.',
      motion: 'Dynamic speaker switching or stacked 9:16 split-screen framing.',
    },
    beforeAfterFa: {
      beforeState: 'یک فایل ویدیویی ۶۰ دقیقه‌ای با بازدید کم که فرصت‌های وایرال شدنش پنهان مانده است.',
      editingDecisions: 'استخراج ۱۰ قطعه ۳۰ تا ۴۵ ثانیه‌ای طلایی، بهینه‌سازی کادربندی عمودی و افزودن زیرنویس و انیمیشن‌های بیست‌کات.',
      finalOutcome: 'تولید محتوای یک ماه شبکه‌های اجتماعی پادکست و هدایت هزاران مخاطب جدید به اپیزود کامل.',
    },
    beforeAfterEn: {
      beforeState: 'A 60-minute interview sitting underwatched on YouTube with no social reach.',
      editingDecisions: 'Extracted 10 high-impact 30-45s moments, converted into 9:16 vertical, and animated key quotes.',
      finalOutcome: 'A month of social clips driving high viewer conversion directly to the full episode.',
    },
    whoItsForFa: [
      { title: 'میزبانان پادکست‌های ویدیویی', desc: 'تیم‌هایی که می‌خواهند از هر مصاحبه حداکثر بهره‌وری اجتماعی را کسب کنند.' },
      { title: 'کانال‌های گفتگو و مصاحبه یوتیوب', desc: 'هدایت بینندگان جدید از فید شورتس به ویدیوهای بلند کانال.' },
      { title: 'برگزارکنندگان وبینار', desc: 'تبدیل جلسات ضبط شده به دارایی‌های تبلیغاتی مداوم.' },
    ],
    whoItsForEn: [
      { title: 'Video Podcast Hosts', desc: 'Creators maximizing subscriber acquisition from every recorded interview.' },
      { title: 'YouTube Interview Channels', desc: 'Directing Shorts shelf traffic directly into full episodes.' },
      { title: 'Webinar Organizers', desc: 'Turning recorded training sessions into marketing assets.' },
    ],
    whatsIncludedFa: [
      'بازبینی دقیق ویدیو و انتخاب بهترین زمان‌های قطعات طلایی',
      'کادربندی مجدد ۹:۱۶ هوشمند برای نمایش همزمان یا متناوب افراد',
      'طراحی زیرنویس دو نفره با رنگ‌های تفکیک‌شده',
      'افزودن تیترهای کنجکاوی‌برانگیز در بالای ویدیو',
      'تحویل گروهی ویدیوهای شورتس آماده انتشار',
    ],
    whatsIncludedEn: [
      'Full review and identification of the highest-value micro-moments',
      'Smart 9:16 vertical re-framing for multi-speaker podcasts',
      'Color-differentiated dual speaker animated captions',
      'Engaging contextual header bars',
      'Batch delivery of social clips ready to schedule',
    ],
    philosophyFa: {
      heading: 'فلسفه پادکست: هر گفتگوی عمیق، حاوی ده‌ها هوک وایرال است',
      body: 'مخاطب امروز زمان ندارد یک ساعت مصاحبه ناشناس را گوش کند. شورتس پادکستی مثل تیزر فیلم سینمایی است؛ باید جذاب‌ترین قطعه را نشان دهید تا مشتاق دیدن کل اثر شوند.',
    },
    philosophyEn: {
      heading: 'The Podcast Repurposing Mindset: Golden Micro-Moments',
      body: 'No new viewer commits 60 minutes to an unfamiliar podcast. Shorts clips act as movie trailers: show them the most mesmerizing 30 seconds to earn their long-form attention.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال لینک پادکست', desc: 'لینک درایو، یوتوب یا فایل را به اشتراک بگذارید.' },
      { step: '۰۲', title: 'شناسایی و ادیت قطعات', desc: 'لحظات طلایی گلچین شده و با استانداردهای ریلز تدوین می‌شوند.' },
      { step: '۰۳', title: 'تحویل پکیج شورتس', desc: 'ویدیوها با کیفیت عالی برای انتشار هفتگی تحویل داده می‌شوند.' },
    ],
    workflowEn: [
      { step: '01', title: 'Share Episode Link', desc: 'Provide your Google Drive, YouTube, or raw audio/video files.' },
      { step: '02', title: 'Selection & Editing', desc: 'We pinpoint the strongest soundbites and apply vertical editing.' },
      { step: '03', title: 'Batch Delivery', desc: 'Receive a structured folder of clips ready for distribution.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج استخراج ۸ تا ۱۲ شورتس از هر اپیزود',
      details: 'پوشش کامل تقویم انتشار بین دو قسمت متوالی پادکست.',
      turnaround: 'تحویل در ۴۸ تا ۷۲ ساعت',
    },
    pricingGuidanceEn: {
      recommendedTier: '8 to 12 Shorts Extraction Package',
      details: 'Full social coverage between consecutive podcast releases.',
      turnaround: '48 to 72 hour turnaround',
    },
    faqsFa: [
      { question: 'آیا خودتان لحظات خوب پادکست را پیدا می‌کنید یا من باید تایم بدهم؟', answer: 'ما می‌توانیم کل مصاحبه را بررسی و بهترین لحظات را پیدا کنیم. اگر خودتان هم تایم خاصی مد نظر دارید با کمال میل اعمال می‌شود.' },
    ],
    faqsEn: [
      { question: 'Do you find the moments yourself or do I provide timestamps?', answer: 'We independently identify the highest-retention moments, but you are always welcome to designate priority timestamps.' },
    ],
    relatedWorkSlugs: ['founder-routine-podcast', 'crypto-empire-documentary'],
    relatedResourceSlugs: ['how-to-turn-podcast-into-short-form-content', 'how-to-make-talking-head-videos-engaging'],
  },

  'content-repurposing': {
    slug: 'content-repurposing',
    path: '/services/content-repurposing',
    nameFa: 'بازنشر و بازیافت هوشمند محتوا',
    nameEn: 'Content Repurposing',
    heroTagFa: 'حداکثر بهره‌وری از یک بار ضبط',
    heroTagEn: 'Max ROI per Recording Hour',
    titleFa: 'تبدیل محتواهای ویدیویی طولانی به ریلز و شورتس‌های تعاملی',
    titleEn: 'Long-Form to Short-Form Video Content Repurposing Services',
    subtitleFa: 'وقت ضبط محتوای روزانه ندارید؟ از آرشیو یوتیوب، وبینارها، جلسات مشاوره و سخنرانی‌های خود جریان بی‌پایانی از ویدیوهای کوتاه بسازید.',
    subtitleEn: 'Unlock exponential output from existing footage. We turn your YouTube backlog, client calls, and webinars into months of ready-to-post short videos.',
    metaDescriptionFa: 'خدمات بازنشر و تبدیل محتواهای بلند به شورتس و ریلز در حس‌لب. حداکثر بهره‌وری از آرشیو یوتیوب و پادکست با تدوین تخصصی.',
    metaDescriptionEn: 'Content repurposing video editing by HesLab. Maximize the value of your existing footage by converting webinars and long videos into viral social assets.',
    serviceType: 'VideoEditingService',
    iconName: 'Flash',
    supportedContentTypesFa: ['آرشیو ویدیوهای طولانی یوتیوب', 'وبینارها و ارائه‌های شرکتی', 'جلسات ضبط شده مشاوره و لایوها', 'سخنرانی‌های همایشی'],
    supportedContentTypesEn: ['YouTube Long-Form Archives', 'Corporate Webinars & Keynotes', 'Recorded Live Streams & Q&A Calls', 'Conference Presentations'],
    editingApproachFa: {
      hook: 'بازنویسی شروع کلیپ با استخراج تیتر اصلی صحبت و افزودن تایپوگرافی گیرا.',
      pacing: 'فشرده‌سازی اطلاعات طولانی در قطعات سریع و آموزنده زیر ۴۵ ثانیه.',
      captions: 'زیرنویس پویا با تبدیل خودکار اعداد و کلمات کلیدی.',
      sound: 'حذف طنین و اکوی سالن سخنرانی و افزودن موسیقی پرانرژی متناسب.',
      motion: 'افزودن اینفوگرافیک‌ها و اسکرین‌شات‌ها برای پوشش زوم‌های بیش از حد.',
    },
    editingApproachEn: {
      hook: 'Re-engineering narrative entry points with dynamic on-screen text hooks.',
      pacing: 'Condensing sprawling lectures into punchy 45-second high-value capsules.',
      captions: 'Dynamic captions with stylized keyword pops.',
      sound: 'De-reverberation and vocal audio enhancement.',
      motion: 'Overlaid graphic callouts hiding excessive crop artifacts.',
    },
    beforeAfterFa: {
      beforeState: 'ساعت‌ها محتوای ضبط شده در یوتیوب یا درایو که گرد و خاک می‌خورد و ترافیک جدیدی تولید نمی‌کند.',
      editingDecisions: 'اسکن آرشیو، استخراج ۲۰ کلیپ مستقل و ریلز استاندارد، اصلاح کادربندی به ۹:۱۶ و تدوین حرفه‌ای.',
      finalOutcome: 'رشد تصاعدی ترافیک ورودی و تبدیل محتوای بایگانی‌شده به لیدهای بیزینسی جدید.',
    },
    beforeAfterEn: {
      beforeState: 'Hours of existing footage gathering digital dust in cloud drives with zero new traffic.',
      editingDecisions: 'Audited archives, extracted 20 standalone high-retention vertical edits, and updated sound beds.',
      finalOutcome: 'Revitalized organic audience growth and a steady stream of new qualified project inquiries.',
    },
    whoItsForFa: [
      { title: 'کریتورهای پرمشغله', desc: 'سازندگانی که زمان کمی برای ضبط‌های مداوم هفتگی دارند.' },
      { title: 'مجموعه‌های آموزشی و اساتید', desc: 'بهره‌برداری حداکثری از دوره‌های ضبط شده برای جذب دانشجو.' },
      { title: 'شرکت‌های نرم‌افزاری و B2B', desc: 'تبدیل دموی محصولات و وبینارهای فروش به ریلزهای جذاب.' },
    ],
    whoItsForEn: [
      { title: 'Time-Constrained Creators', desc: 'Busy founders who cannot film new content every single day.' },
      { title: 'Course Creators & Academies', desc: 'Transforming existing curriculums into organic social acquisition engines.' },
      { title: 'B2B & SaaS Companies', desc: 'Turning product demos and client case webinars into bite-sized reels.' },
    ],
    whatsIncludedFa: [
      'بررسی محتوای طولانی و استخراج سناریوهای مستقل',
      'تدوین کامل با استانداردهای ریلز و شورتس',
      'زیرنویس، ساند دیزاین و ترنزیشن‌های حرکتی',
      'تقویم زمان‌بندی انتشار ویدیوها',
    ],
    whatsIncludedEn: [
      'In-depth review and extraction of standalone narrative arcs',
      'Full post-production tailored for Reels and Shorts retention',
      'Animated captions, layered sound design, and motion cues',
      'Suggested publishing schedule',
    ],
    philosophyFa: {
      heading: 'فلسفه بازنشر: هوشمندانه‌تر کار کنید، نه سخت‌تر',
      body: 'تولید محتوای جدید از صفر هر روز خسته‌کننده است. راز رشد کانال‌های بزرگ، استخراج ۱۰ دارایی جدید از هر ۱ ساعت ضبط هوشمندانه است.',
    },
    philosophyEn: {
      heading: 'The Repurposing Principle: Leverage Over Exhaustion',
      body: 'Constantly recording from scratch burns out founders. The secret to sustainable authority is extracting ten high-value assets from every single hour of filming.',
    },
    workflowFa: [
      { step: '۰۱', title: 'ارسال آرشیو', desc: 'لینک ویدیوهای یوتیوب یا وبینارهای قبلی خود را بفرستید.' },
      { step: '۰۲', title: 'استخراج قطعات طلایی', desc: 'ما محتوا را دسته‌بندی و کلیپ‌های کوتاه را ادیت می‌کنیم.' },
      { step: '۰۳', title: 'دریافت تقویم محتوایی', desc: 'ویدیوهای ادیت شده آماده انتشار در تمام کانال‌ها تحویل داده می‌شوند.' },
    ],
    workflowEn: [
      { step: '01', title: 'Submit Archive Links', desc: 'Share your existing YouTube links or webinar drive folders.' },
      { step: '02', title: 'Extract & Polish', desc: 'We identify modular stories and apply vertical editing.' },
      { step: '03', title: 'Deploy Content', desc: 'Receive ready-to-post short videos and a distribution calendar.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'پکیج استخراج ۱۰، ۲۰ یا ۳۰ ویدیوی کوتاه',
      details: 'تخفیف ویژه به ازای سفارش تعداد بالاتر از آرشیو.',
      turnaround: 'تحویل مرحله‌ای در طول هفته',
    },
    pricingGuidanceEn: {
      recommendedTier: '10, 20, or 30 Short Clips Repurposing Pack',
      details: 'Volume discounts based on footage archive depth.',
      turnaround: 'Staged weekly delivery',
    },
    faqsFa: [
      { question: 'آیا کیفیت ویدیوهای ضبط شده قدیمی برای ریلز مناسب است؟', answer: 'با ابزارهای آپ‌اسکیل و اصلاح رنگ مدرن حس‌لب، حتی فوتیج‌های ۱۰۸۰p قدیمی نیز شارپ و جذاب رندر می‌شوند.' },
    ],
    faqsEn: [
      { question: 'Is older footage suitable for modern Reels?', answer: 'With our sharpening, color grading, and framing, even older 1080p recordings look crisp on mobile screens.' },
    ],
    relatedWorkSlugs: ['founder-routine-podcast', 'ai-tools-breakdown'],
    relatedResourceSlugs: ['how-to-turn-podcast-into-short-form-content', 'how-to-turn-youtube-videos-into-shorts'],
  },

  'motion-design': {
    slug: 'motion-design',
    path: '/services/motion-design',
    nameFa: 'موشن دیزاین و هویت بصری',
    nameEn: 'Motion Design & Visual Identity',
    heroTagFa: 'ستون تخصصی موشن و انیمیشن',
    heroTagEn: 'Core Motion Pillar',
    titleFa: 'موشن گرافیک پیشرفته و انیمیشن المان‌ها در ویدیوهای کوتاه',
    titleEn: 'Custom Motion Graphics & Dynamic Visuals for Video Content',
    subtitleFa: 'تایپوگرافی کینتیک با فیزیک واقعی فنر، گرافیک‌های اختصاصی برند، شبیه‌سازی رابط کاربری و انیمیشن‌های لوگو برای ایجاد شخصیت بصری متمایز.',
    subtitleEn: 'Spring-physics kinetic typography, custom brand assets, UI mockups, and visual storytelling that elevate your content above template-heavy competitors.',
    metaDescriptionFa: 'خدمات طراحی موشن دیزاین و انیمیشن متن، استیکر و عناصر بصری برای ویدیوهای یوتیوب و اینستاگرام توسط استودیو حس‌لب.',
    metaDescriptionEn: 'Bespoke motion graphics, kinetic subtitles, animated illustrations, and UI walkthroughs for creators and tech brands by HesLab.',
    serviceType: 'DesignService',
    iconName: 'Magicpen',
    supportedContentTypesFa: ['تایپوگرافی کینتیک و انیمیشن تیترها', 'انیمیشن رابط کاربری و دموی نرم‌افزار', 'نمودارها و گراف‌های آماری متحرک', 'اینترو، اوترو و پکیج بصری برند'],
    supportedContentTypesEn: ['Kinetic Typography & Title Stings', 'Software UI Interactions & Screencasts', 'Animated Data Infographics & Charts', 'Brand Signature Intro & Outro Packages'],
    editingApproachFa: {
      hook: 'انیمیشن لوگو یا واژگان کلیدی با اینرسی و جهش فنری در صدم ثانیه نخست.',
      pacing: 'سرعت حرکت المان‌ها هماهنگ با فرکانس‌های صوتی و هیجان گوینده.',
      captions: 'زیرنویس‌های کینتیک چندبعدی با پرش‌های کنترل‌شده بدون خستگی چشم.',
      sound: 'صداگذاری همگام با میکرواینترکشن‌ها (تیک، هوش، کلیک).',
      motion: 'محاسبه ریاضی انیمیشن با فرمول‌های میرایی فنر (Damped Harmonic Motion).',
    },
    editingApproachEn: {
      hook: 'High-impact kinetic logo or keyword reveal with realistic spring inertia.',
      pacing: 'Motion velocity locked to transient sound frequencies.',
      captions: 'Dimensionally animated subtitles with controlled harmonic bounce.',
      sound: 'Micro-interaction tactile audio cues for every motion element.',
      motion: 'Physically calculated spring curves using stiffness and damping parameters.',
    },
    beforeAfterFa: {
      beforeState: 'استفاده از ترنزیشن‌ها و متن‌های پیش‌فرض نرم‌افزارها که حس آماتور و ارزان به برند می‌دهد.',
      editingDecisions: 'طراحی موشن دیزاین اختصاصی بر پایه گایدلاین برند، پیاده‌سازی فیزیک فنر و تنظیم افکت‌های صوتی منطبق.',
      finalOutcome: 'هویت بصری لوکس، چشم‌نواز و غیرقابل تقلید که سطح حرفه‌ای بودن محصول را نشان می‌دهد.',
    },
    beforeAfterEn: {
      beforeState: 'Generic CapCut or Premiere default transitions making the brand look cheap and template-driven.',
      editingDecisions: 'Custom coded kinetic typography, physics-based springs, and bespoke transient audio sync.',
      finalOutcome: 'A distinct, unmistakable aesthetic establishing visual superiority in your niche.',
    },
    whoItsForFa: [
      {
        title: 'استارتاپ‌های نرم‌افزاری و SaaS',
        desc: 'شرکت‌هایی که می‌خواهند قابلیت‌های پیچیده نرم‌افزار خود را با انیمیشن روان رابط کاربری معرفی کنند.',
      },
      {
        title: 'کانال‌های یوتیوب و بیزینس‌های آموزشی',
        desc: 'آموزش‌دهندگانی که برای انتقال مفاهیم نیاز به نمودارها، دیاگرام‌ها و تایپوگرافی کینتیک دارند.',
      },
      {
        title: 'برندهای نیازمند هویت بصری منحصربه‌فرد',
        desc: 'برندهایی که از قالب‌های تکراری خسته شده‌اند و انیمیشن اختصاصی منطبق بر گایدلاین خود می‌خواهند.',
      },
    ],
    whoItsForEn: [
      {
        title: 'Software & SaaS Startups',
        desc: 'Tech companies needing sleek UI animations and screen breakdowns to explain product value quickly.',
      },
      {
        title: 'Educational & Business Channels',
        desc: 'Educators who rely on charts, kinetic statistics, and visual metaphors to explain complex ideas.',
      },
      {
        title: 'Brands Demanding Custom Identity',
        desc: 'Forward-thinking brands looking to replace generic templates with bespoke signature visual motion.',
      },
    ],
    whatsIncludedFa: [
      'طراحی تایپوگرافی کینتیک اختصاصی با فیزیک طبیعی حرکت',
      'انیمیشن المان‌های رابط کاربری (UI Animation) و کلیک‌های سه‌بعدی',
      'طراحی لوپ‌های وکتور، نمودارها و گراف‌های پویا',
      'کیت موشن اختصاصی شامل اینترو، اوترو و زیرنویس‌های هماهنگ با برند',
      'افکت‌های متنی و ترنزیشن‌های سفارشی بدون استفاده از قالب‌های آماده ارزان',
      'صداگذاری هماهنگ با تمام حرکات بصری (Sound-Motion Sync)',
    ],
    whatsIncludedEn: [
      'Custom kinetic typography driven by natural harmonic spring physics',
      'UI animations, mockups, and responsive button interactions',
      'Dynamic charts, growth curves, and animated data infographics',
      'Brand motion kit including signatures, overlays, and custom lower-thirds',
      'Tailored seamless transitions with zero generic pre-made template feel',
      'Precise audio-visual transient synchronization',
    ],
    philosophyFa: {
      heading: 'فلسفه موشن حس‌لب: حرکت با معنی، نه شلوغ‌کاری',
      body: 'انیمیشن خوب به چشم بیننده جهت می‌دهد و درک مفهوم را ساده می‌کند، نه اینکه فقط فضا را شلوغ کند. ما از اصول کلاسیک انیمیشن در ترکیب با فیزیک نوین برای انتقال شفاف پیام استفاده می‌کنیم.',
    },
    philosophyEn: {
      heading: 'The HesLab Motion Ethos: Purposeful Movement',
      body: 'Effective motion design directs viewer gaze and enhances clarity. We avoid decorative visual noise and focus on intuitive physical interactions that guide comprehension.',
    },
    workflowFa: [
      { step: '۰۱', title: 'بررسی هویت برند', desc: 'فونت‌ها، پالت رنگی و مراجع گرافیکی برند شما را بررسی می‌کنیم.' },
      { step: '۰۲', title: 'استوری‌بورد و استایل‌فریم', desc: 'طرح اولیه حرکت المان‌ها و زبان بصری را مشخص می‌کنیم.' },
      { step: '۰۳', title: 'اجرا و متحرک‌سازی', desc: 'انیمیشن‌ها با فیزیک دقیق فنر و طراحی صدا پیاده‌سازی می‌شوند.' },
      { step: '۰۴', title: 'خروجی چندمنظوره', desc: 'فایل‌ها با کیفیت بالا یا با پس‌زمینه شفاف (Alpha) برای استفاده در پروژه‌ها تحویل داده می‌شوند.' },
    ],
    workflowEn: [
      { step: '01', title: 'Brand Discovery', desc: 'We align with your font families, brand palette, and aesthetic references.' },
      { step: '02', title: 'Styleframes & Storyboard', desc: 'We define the key frames and motion language before full animation.' },
      { step: '03', title: 'Production & Audio Sync', desc: 'Animations are rendered with smooth spring physics and aligned sound design.' },
      { step: '04', title: 'Flexible Delivery', desc: 'Delivered in high-bitrate video or transparent alpha channels for instant overlay.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'سفارشی یا اضافه شونده به پکیج تدوین',
      details: 'می‌تواند به عنوان سرویس مستقل یا لایه تکمیلی روی پکیج‌های ماهانه تدوین اضافه شود.',
      turnaround: '۳ تا ۵ روز کاری بر اساس حجم موشن',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Custom Project / Retainer Add-on',
      details: 'Available as a standalone project or as an integrated tier on top of monthly video editing retainers.',
      turnaround: '3-5 business days depending on motion complexity',
    },
    faqsFa: [
      {
        question: 'آیا برای اجرای موشن نیاز به فایل وکتور لوگو یا آیکون‌ها هست؟',
        answer: 'اگر فایل SVG یا Illustrator دارید عالی است؛ در غیر این صورت تیم حس‌لب می‌تواند فایل‌ها را برای انیمیشن بازسازی کند.',
      },
      {
        question: 'آیا خروجی شفاف (Transparent) هم تحویل می‌دهید؟',
        answer: 'بله، خروجی‌های ProRes 4444 یا WebM با کانال آلفا برای استفاده راحت در نرم‌افزارهای مختلف ارائه می‌شود.',
      },
    ],
    faqsEn: [
      {
        question: 'Do I need vector files (SVG/AI) for motion assets?',
        answer: 'Having vector files is ideal, but we can also vectorize and prep your logo or UI screens for animation.',
      },
      {
        question: 'Can you provide transparent alpha renders?',
        answer: 'Yes, we supply ProRes 4444 and WebM with alpha channels for seamless overlay in any editing workflow.',
      },
    ],
    relatedWorkSlugs: ['wireless-headphone-commercial', 'ai-tools-breakdown'],
    relatedResourceSlugs: ['kinetic-typography-motion-design'],
  },

  'ongoing-video-content': {
    slug: 'ongoing-video-content',
    path: '/services/ongoing-video-content',
    nameFa: 'پکیج‌های منظم ماهانه',
    nameEn: 'Ongoing Video Content Retainers',
    heroTagFa: 'پارتنر دائمی و باظرفیت اختصاصی',
    heroTagEn: 'Dedicated Monthly Retainer',
    titleFa: 'پارتنر دائمی تدوین و تولید محتوای مداوم برای برندها و سازندگان',
    titleEn: 'Monthly Video Editing Retainers for Creators & Growing Brands',
    subtitleFa: 'سیستم منظم و بدون دغدغه برای تولید هفتگی ویدیوهای ریلز و شورتس، تحویل ۲۴ تا ۴۸ ساعته و پشتیبانی اختصاصی بدون نیاز به استخدام تیم داخلی.',
    subtitleEn: 'A frictionless recurring pipeline delivering weekly polished short-form videos with 24-48h turnaround, consistent quality, and dedicated creative focus.',
    metaDescriptionFa: 'پکیج‌های ماهانه تدوین ویدیوهای کوتاه حس‌لب برای تولید مداوم محتوا در شبکه‌های اجتماعی با تحویل منظم و هزینه اقتصادی.',
    metaDescriptionEn: 'Monthly video editing retainers by HesLab. Dedicated capacity, rapid 24-48h turnaround, and consistent brand quality for creators and startups.',
    serviceType: 'ProfessionalService',
    iconName: 'BagTick',
    supportedContentTypesFa: ['تولید تقویمی ماهانه ریلز و شورتس', 'پشتیبانی کامل کانال یوتیوب و اینستاگرام', 'مدیریت پیوسته کمپین‌های فصلی', 'ادیت‌های سریع برای رویدادهای روز'],
    supportedContentTypesEn: ['Calendarized Weekly Social Drops', 'Complete YouTube & Instagram Video Channel Support', 'Ongoing Campaign Production Sprints', 'Time-Sensitive Trend Exploitation Edits'],
    editingApproachFa: {
      hook: 'تست A/B مداوم الگوهای هوک و بهبود پیوسته بر اساس آمارهای ویو.',
      pacing: 'بهینه‌سازی مداوم ریتم همگام با تغییرات سلیقه مخاطب کانال.',
      captions: 'استفاده از هویت بصری یکپارچه و تمیز در تمام ویدیوهای ماه.',
      sound: 'لایبرری اختصاصی صوتی شکل‌گرفته ویژه لحن برند شما.',
      motion: 'تمپلیت‌های حرکتی سبک‌دار شده بدون افت کیفیت بصری.',
    },
    editingApproachEn: {
      hook: 'Iterative A/B testing of hook phrasing based on retention data.',
      pacing: 'Refined rhythm continuously tuned to your channel audience feedback.',
      captions: 'Unified typographical signature maintained across all weekly output.',
      sound: 'Dedicated audio palette tailored specifically to your brand.',
      motion: 'Proprietary brand motion assets rendered smoothly.',
    },
    beforeAfterFa: {
      beforeState: 'انتشار نامنظم محتوا به علت درگیری با ادیتورهای مختلف، نوسان کیفیت و تأخیر در تحویل هفتگی.',
      editingDecisions: 'رزرو ظرفیت ثابت در تقویم حس‌لب، تحویل هفتگی مانند ساعت و برقراری ارتباط سریع بدون جلسه.',
      finalOutcome: 'انتشار مستمر ۳ الی ۵ ویدیو در هفته و رشد مداوم الگوریتمی بدون دغدغه فنی ادیت.',
    },
    beforeAfterEn: {
      beforeState: 'Sporadic publishing caused by flaky freelancers, fluctuating quality, and missed deadlines.',
      editingDecisions: 'Dedicated slot reserved on the HesLab production schedule with weekly turnaround like clockwork.',
      finalOutcome: 'Consistent 3-5 weekly video drops resulting in sustained algorithmic momentum and creator peace of mind.',
    },
    whoItsForFa: [
      {
        title: 'کریتورهای تمام‌وقت',
        desc: 'تولیدکنندگانی که به صورت مداوم محتوا ضبط می‌کنند و نیاز دارند زمان خود را صرف ایده‌پردازی کنند نه ادیت.',
      },
      {
        title: 'برندها و آژانس‌های دیجیتال',
        desc: 'تیم‌هایی که می‌خواهند یک بازوی ادیت حرفه‌ای و مطمئن بدون دردسرهای بیمه و استخدام کارمند داشته باشند.',
      },
      {
        title: 'سازندگان دوره‌های آنلاین و مشاوران',
        desc: 'متخصصانی که هر هفته از آموزش‌ها و وبینارهای خود ویدیوهای ریلز کوتاه برای جذب مشتری استخراج می‌کنند.',
      },
    ],
    whoItsForEn: [
      {
        title: 'Full-Time Content Creators',
        desc: 'Creators consistently filming who want to focus exclusively on ideation and recording rather than tedious editing.',
      },
      {
        title: 'Founders & Digital Agencies',
        desc: 'Agile teams seeking dependable high-tier editing throughput without the overhead of in-house hiring.',
      },
      {
        title: 'Course Creators & Consultants',
        desc: 'Educators turning long-form webinars and coaching calls into a continuous stream of client-attracting short clips.',
      },
    ],
    whatsIncludedFa: [
      'ظرفیت تضمین‌شده در تقویم کاری ماهانه حس‌لب',
      'تحویل منظم و مرحله‌ای ویدیوها در بازه‌های ۲۴ تا ۴۸ ساعته',
      'پوشه ابری اختصاصی برای اشتراک‌گذاری بی‌دردسر فوتیج‌ها',
      'اصلاحات نامحدود منطقی و هماهنگی سریع بدون جلسات وقت‌گیر',
      'حفظ هویت بصری یکدست، پالت رنگ و لحن در تمام ویدیوهای کانال',
      'اولویت تحویل در شرایط فوری یا رویدادهای خاص',
    ],
    whatsIncludedEn: [
      'Guaranteed production capacity reserved in HesLab calendar',
      'Reliable staged deliveries with standard 24-48h turnaround',
      'Dedicated cloud workspace for effortless drag-and-drop footage handover',
      'Unlimited reasonable revisions with fast, asynchronous feedback loops',
      'Consistent signature look, color treatment, and brand tone across all reels',
      'Rush priority access for time-sensitive launches or breaking trends',
    ],
    philosophyFa: {
      heading: 'فلسفه همکاری ماهانه: شراکت خلاقانه، نه کارفرمایی و کارگری',
      body: 'ما فقط یک فایل تحویل نمی‌دهیم؛ ما با مخاطبان شما آشنا می‌شویم، بازخوردهای هر ویدیو را تحلیل می‌کنیم و به مرور زمان ویدیوهایی می‌سازیم که دقیقاً با زبان و سبک شما همخوانی دارد.',
    },
    philosophyEn: {
      heading: 'The Retainer Philosophy: True Creative Partnership',
      body: 'We operate as an extension of your creative mind. Over time, we internalize your humor, speaking cadence, and audience preferences, making each video sharper and more effortless than the last.',
    },
    workflowFa: [
      { step: '۰۱', title: 'تنظیم تقویم ماهانه', desc: 'بر اساس تعداد ویدیوهای انتخابی شما (۴، ۱۲ یا ۲۰ عدد)، برنامه تحویل هفتگی تنظیم می‌شود.' },
      { step: '۰۲', title: 'آپلود گروهی یا تکی', desc: 'فوتیج‌ها را هر زمان که ضبط کردید در درایو اختصاصی خود آپلود کنید.' },
      { step: '۰۳', title: 'جریان مداوم تحویل', desc: 'هر هفته ویدیوهای جدید را ادیت‌شده دریافت و در کانال‌های خود منتشر کنید.' },
      { step: '۰۴', title: 'بهینه‌سازی مداوم', desc: 'با بررسی آمارهای ویو، سبک هوک‌ها و گرافیک‌ها را برای ماه بعد هوشمندانه‌تر می‌کنیم.' },
    ],
    workflowEn: [
      { step: '01', title: 'Monthly Calendar Alignment', desc: 'We structure a weekly delivery cadence aligned with your package tier (4, 12, or 20+ videos).' },
      { step: '02', title: 'Batch or As-You-Go Uploads', desc: 'Drop raw footage into your dedicated drive whenever you finish filming.' },
      { step: '03', title: 'Continuous Turnaround', desc: 'Receive ready-to-post edits every week like clockwork.' },
      { step: '04', title: 'Iterative Optimization', desc: 'We analyze retention analytics and continuously refine hooks and pacing.' },
    ],
    pricingGuidanceFa: {
      recommendedTier: 'انتخاب از بین ۳ پلن استارتر (۴)، رشد (۱۲) و استودیو (۲۰+)',
      details: 'پکیج‌ها ۲۰ تا ۳۵ درصد نسبت به سفارش تکی پروژه‌ها اقتصادی‌تر هستند و اولویت اختصاصی دارند.',
      turnaround: 'تحویل منظم طبق تقویم توافقی',
    },
    pricingGuidanceEn: {
      recommendedTier: 'Select between Starter (4), Growth (12), or Studio (20+) plans',
      details: 'Retainers offer 20-35% cost savings compared to single ad-hoc projects, plus dedicated queue priority.',
      turnaround: 'Scheduled weekly delivery cadence',
    },
    faqsFa: [
      {
        question: 'اگر در یک ماه همه ویدیوها را استفاده نکنم چه می‌شود؟',
        answer: 'تا ۲۵٪ از ویدیوهای باقیمانده به ماه بعد منتقل می‌شوند تا هیچ هزینه‌ای برای شما از دست نرود.',
      },
      {
        question: 'آیا امکان ارتقا یا تعلیق پکیج در ماه‌های بعد وجود دارد؟',
        answer: 'بله، پکیج‌ها بدون قراردادهای قفل‌شده طولانی‌مدت هستند و در انتهای هر دوره ماهانه می‌توانید پلن خود را تغییر دهید.',
      },
    ],
    faqsEn: [
      {
        question: 'What happens if I do not use all video slots in a given month?',
        answer: 'Up to 25% of unused video slots can roll over to the following month so your investment is always protected.',
      },
      {
        question: 'Can I pause or upgrade my plan between months?',
        answer: 'Yes, retainers are flexible monthly agreements with no lock-in contracts; you can adjust tiers anytime between billing cycles.',
      },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'founder-routine-podcast', 'creator-growth-story'],
    relatedResourceSlugs: ['short-form-video-editing-cost-guide', 'podcast-to-shorts-workflow'],
  },
};

// Aliases for route backward compatibility
SERVICES_DATA['ongoing-content'] = SERVICES_DATA['ongoing-video-content'];

export function getServiceBySlug(slug: string): ServicePillar | undefined {
  return SERVICES_DATA[slug];
}

export function getAllServices(): ServicePillar[] {
  // Return unique services
  const seen = new Set<string>();
  return Object.values(SERVICES_DATA).filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
}
