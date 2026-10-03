export interface ResourceAuthor {
  name: string;
  nameEn?: string;
  role: string;
  roleEn?: string;
  avatar: string;
}

export interface ResourceTocItem {
  id: string;
  title: string;
  titleEn?: string;
}

export interface ResourceSection {
  id: string;
  heading: string;
  headingEn?: string;
  paragraphs: string[];
  paragraphsEn?: string[];
  callout?: string;
  calloutEn?: string;
  pullQuote?: string;
  pullQuoteEn?: string;
  numberedSteps?: { step: string; title: string; text: string }[];
  comparison?: {
    title: string;
    beforeLabel: string;
    beforeText: string;
    afterLabel: string;
    afterText: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  code?: {
    language: string;
    code: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  widget?: 'spring-simulator' | 'spring-predictor' | 'magnetic-walkthrough' | 'live-artifact' | 'micro-quiz';
}

export interface ResourceFaqItem {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

export interface ResourceCta {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  buttonText: string;
  buttonTextEn?: string;
  link: string;
}

export interface ResourceReference {
  title: string;
  url: string;
}

export interface SearchIntentMetadata {
  primaryIntent: 'informational' | 'commercial';
  secondaryIntents?: string[];
  audience: string;
  funnelStage: 'top' | 'middle' | 'bottom';
  targetTopic: string;
}

export interface ResourceArticle {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  excerpt: string;
  excerptEn?: string;
  publishDate: string;
  updatedDate?: string;
  author: ResourceAuthor;
  category: 'short-form' | 'motion-design' | 'creator-workflow' | 'pricing-buying';
  tags: string[];
  tagsEn?: string[];
  featuredImage?: string;
  coverGradient: string;
  socialImage?: string;
  readingTime: string;
  readingTimeEn?: string;
  tableOfContents: ResourceTocItem[];
  introduction: string;
  introductionEn?: string;
  sections: ResourceSection[];
  faq?: ResourceFaqItem[];
  relatedServices?: { title: string; path: string }[];
  relatedWorkSlugs?: string[];
  relatedResourceSlugs?: string[];
  references?: ResourceReference[];
  cta?: ResourceCta;
  searchIntent: SearchIntentMetadata;
  draft?: boolean;
  noindex?: boolean;
}

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'res-hooks-retention',
    slug: 'short-form-video-hooks-retention',
    title: 'چگونه در ۳ ثانیه اول ویدیوهای کوتاه نگاه مخاطب را قفل کنیم؟ (کالبدشکافی هوک‌های ۲۰۲۶)',
    titleEn: 'How to Lock Viewer Attention in the First 3 Seconds (2026 Hook Breakdown)',
    description: 'راهنمای جامع تدوین هوک‌های پربازدید در اینستاگرام ریلز، یوتیوب شورتس و تیک‌تاک بر پایه اصول روانشناسی توجه و طراحی صدای سه‌بعدی.',
    descriptionEn: 'Comprehensive guide to engineering high-retention video hooks across Reels, Shorts, and TikTok based on attention psychology and tactile sound design.',
    excerpt: 'بررسی فریم‌به‌فریم هوک‌های وایرال، فرمول‌های کلامی، برش‌های بصری شوکه‌کننده و استفاده از ساند افکت‌های ترنزیشن برای افزایش نگه‌داشت مخاطب بالای ۷۵٪.',
    excerptEn: 'Frame-by-frame analysis of high-performing hooks, verbal curiosity triggers, pattern interrupts, and spatial audio transients that keep retention above 75%.',
    publishDate: '2026-02-10',
    updatedDate: '2026-03-15',
    author: {
      name: 'حسام',
      nameEn: 'Hesam',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      roleEn: 'Founder & Lead Editor at HesLab',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'short-form',
    tags: ['هوک ریلز', 'افزایش بازدید', 'تدوین شورتس', 'نگه‌داشت مخاطب', 'الگوریتم ۲۰۲۶'],
    tagsEn: ['Reels Hooks', 'Audience Retention', 'Shorts Editing', 'Algorithm 2026', 'Sound Design'],
    coverGradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #bae6fd 100%)',
    readingTime: '۵ دقیقه مطالعه',
    readingTimeEn: '5 min read',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'تولیدکنندگان محتوا، برندهای شخصی و سازندگان ویدیو',
      funnelStage: 'top',
      targetTopic: 'Short-form video hooks & retention editing',
    },
    tableOfContents: [
      { id: 'sec-hook-psychology', title: '۱. چرا ۳ ثانیه اول سرنوشت ویدیو را رقم می‌زند؟', titleEn: '1. Why Frame Zero Determines Video Fate' },
      { id: 'sec-visual-disruption', title: '۲. شکست الگوی بصری (Pattern Interrupt)', titleEn: '2. Visual Pattern Interrupts' },
      { id: 'sec-sound-impact', title: '۳. جادوی طراحی صدا در اولین فریم', titleEn: '3. Sound Design at Frame Zero' },
      { id: 'sec-comparison-table', title: '۴. جدول مقایسه هوک ضعیف در برابر هوک اصولی', titleEn: '4. Poor Hook vs Engineered Hook' },
      { id: 'sec-step-formula', title: '۵. فرمول ۳ مرحله‌ای اجرای هوک در پروژه‌های حس‌لب', titleEn: '5. The 3-Step HesLab Hook Framework' },
    ],
    introduction: 'در سال ۲۰۲۶، میانگین زمان تصمیم‌گیری کاربر برای رد کردن یک ویدیو در فید اینستاگرام و یوتیوب به کمتر از ۱.۵ ثانیه رسیده است. اگر ویدیوی شما در ثانیه‌های آغازین نتواند مغز مخاطب را متوقف کند، مهم نیست چقدر پیام ارزشمندی در ادامه دارید. در این نوشتار، استراتژی تدوین هوک‌هایی را بررسی می‌کنیم که در پروژه‌های حس‌لب نرخ نگه‌داشت (Audience Retention) را به بالای ۸۰٪ رسانده‌اند.',
    introductionEn: 'In 2026, the average time a viewer takes to swipe away on Instagram Reels or YouTube Shorts has dropped to less than 1.5 seconds. If your opening frame fails to disrupt viewer scroll inertia, even the most profound message goes unnoticed. In this guide, we break down the exact hook engineering that powers 80%+ audience retention across HesLab edits.',
    sections: [
      {
        id: 'sec-hook-psychology',
        heading: '۱. چرا ۳ ثانیه اول سرنوشت ویدیو را رقم می‌زند؟',
        headingEn: '1. Why Frame Zero Determines Video Fate',
        paragraphs: [
          'الگوریتم‌های مدرن بر پایه متریک Completion Rate و Re-watch Rate کار می‌کنند. وقتی کاربری ویدیوی شما را رد می‌کند (Swipe Away)، سیگنال منفی شدیدی به الگوریتم ارسال می‌شود مبنی بر اینکه ویدیو ارزشی برای ادامه ندارد.',
          'بنابراین وظیفه ادیتور فقط کات زدن نیست؛ وظیفه ما ایجاد یک قلاب عاطفی، بصری یا کنجکاوی است که اجازه ندهد انگشت شست کاربر به سمت بالا حرکت کند.',
        ],
        paragraphsEn: [
          'Modern algorithmic ranking hinges on Completion Rate and Re-watch Rate. When a viewer swipes away in the first second, a heavy negative signal is transmitted indicating low immediate value.',
          'An editor’s job is not merely cutting footage—it is constructing an auditory, emotional, and visual curiosity hook that stops the thumb in mid-swipe.',
        ],
        callout: 'نکته کلیدی: هرگز ویدیو را با سلام و احوالپرسی یا معرفی نام شروع نکنید. مستقیماً به سراغ نتیجه، شوک یا سوال اصلی بروید.',
        calloutEn: 'Golden Rule: Never begin with a greeting or personal introduction. Open directly with the climax, contrarian insight, or core dilemma.',
      },
      {
        id: 'sec-visual-disruption',
        heading: '۲. شکست الگوی بصری (Pattern Interrupt)',
        headingEn: '2. Visual Pattern Interrupts',
        paragraphs: [
          'ذهن انسان به فریم‌های ایستا و سخنرانی‌های عادی عادت کرده است. برای جلب توجه، نیاز به «شکست الگو» در نخستین فریم داریم.',
          'استفاده از زوم ناگهانی (Crash Zoom)، تغییر سریع پس‌زمینه در ثانیه اول، ورود شیء غیرمنتظره به کادر یا وارونه کردن فوتیج از تکنیک‌های اثبات‌شده حس‌لب برای شکستن رخوت کاربر است.',
        ],
        paragraphsEn: [
          'Human cognition is accustomed to static talking-heads. Stopping the scroll requires a pattern interrupt right on frame zero.',
          'Using crash zooms, unexpected foreground objects, rapid kinetic typography, or perspective shift are proven methods to snap viewer attention into active engagement.',
        ],
        pullQuote: '«هوک موفق شبیه کوبیدن روی میز وسط یک سخنرانی آرام است؛ توجه همه را فورا جلب می‌کند بدون اینکه آزاردهنده باشد.»',
        pullQuoteEn: '“An effective hook is like tapping on the microphone before speaking—it commands instant focus without being irritating.”',
      },
      {
        id: 'sec-sound-impact',
        heading: '۳. جادوی طراحی صدا در اولین فریم',
        headingEn: '3. Sound Design at Frame Zero',
        paragraphs: [
          'بیش از ۴۰٪ تعامل کاربران با صدای باز صورت می‌گیرد. یک صدای سوئیپ یا وووش پرحجم، ضربه باس بوم (Bass Drop) یا کلیک کینتیک همگام با کلمه اول، مغز شنیداری مخاطب را درگیر می‌کند.',
          'در استودیو حس‌لب، نخستین موج صدا دقیقاً همزمان با فریم صفر ویدیو میکس می‌شود تا تأخیر حسی به صفر برسد.',
        ],
        paragraphsEn: [
          'Over 40% of social media consumption happens with audio enabled. A deep riser, crisp tactile click, or sub-bass drop synchronized with the very first syllable grips the auditory cortex instantly.',
          'At HesLab, the primary audio transient is placed precisely at frame zero to eliminate sensory lag.',
        ],
      },
      {
        id: 'sec-comparison-table',
        heading: '۴. جدول مقایسه هوک ضعیف در برابر هوک اصولی',
        headingEn: '4. Poor Hook vs Engineered Hook',
        paragraphs: [
          'تفاوت یک ویدیوی ۵۰ هزار بازدیدی با یک ویدیوی میلیونی اغلب در تفاوت‌های زیر خلاصه می‌شود:',
        ],
        paragraphsEn: [
          'The difference between 10k views and 1M+ views often comes down to these fundamental decisions:',
        ],
        table: {
          headers: ['شاخصه', 'هوک غیرحرفه‌ای (معمولی)', 'هوک مهندسی‌شده حس‌لب'],
          rows: [
            ['جمله آغازین', '«سلام رفقا، امروز می‌خوام درباره ادیت صحبت کنم...»', '«این اشتباه در ادیت، نصف ویوهای ریلزت رو می‌کشه!»'],
            ['ریتم تصویر در ۳ ثانیه', 'یک کادر ثابت با نور ضعیف', '۳ تغییر کادر هوشمند همراه با زوم و بیست‌کات'],
            ['لایه صوتی', 'فقط صدای ضبط شده میکروفون گوشی', 'وووش سینمایی + رایزر + افکت فرکانسی سه‌بعدی'],
            ['نرخ ریزش مخاطب', 'بیش از ۶۰٪ در ثانیه اول', 'کمتر از ۱۸٪ در ثانیه اول'],
          ],
        },
      },
      {
        id: 'sec-step-formula',
        heading: '۵. فرمول ۳ مرحله‌ای اجرای هوک در پروژه‌های حس‌لب',
        headingEn: '5. The 3-Step HesLab Hook Framework',
        paragraphs: [
          'برای هر پروژه تدوین، ما این ساختار سه‌گانه را به کار می‌گیریم:',
        ],
        paragraphsEn: [
          'Every project in our studio applies this 3-phase execution model:',
        ],
        numberedSteps: [
          {
            step: '01',
            title: 'استخراج تنش یا تناقض',
            text: 'پیدا کردن جسورانه‌ترین گزاره گوینده در کل ویدیو و انتقال آن به ثانیه نخست.',
          },
          {
            step: '02',
            title: 'هماهنگی بصری و کلامی',
            text: 'انیمیشن کلمه اصلی هوک روی صفحه با رنگ کنتراست‌دار دقیقاً همگام با ادای کلمه.',
          },
          {
            step: '03',
            title: 'پل ارتباطی به بدنه اصلی',
            text: 'ارائه پاسخ یا شروع توضیح سریع بلافاصله پس از ثانیه ۳ بدون اضافه گویی.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'طول ایده‌آل یک هوک در ریلز چقدر است؟',
        questionEn: 'What is the optimal hook duration in Reels & Shorts?',
        answer: 'بهترین طول هوک بین ۲ تا حداکثر ۳.۵ ثانیه است. پس از آن باید بلافاصله وارد ارائه محتوای اصلی شد.',
        answerEn: 'Between 2 and 3.5 seconds maximum. Immediately after, deliver the core payoff without filler.',
      },
      {
        question: 'آیا برای همه ویدیوها نیاز به متن بزرگ هوک است؟',
        questionEn: 'Does every video need a large bold text hook?',
        answer: 'خیر، در ولاگ‌های سبک زندگی یا ویدیوهای سینمایی، یک حرکت دوربین جذاب یا هوک صوتی می‌تواند جایگزین متن شود.',
        answerEn: 'No. In lifestyle vlogs or cinematic edits, an audio transient or dramatic camera movement can replace bold text.',
      },
    ],
    relatedServices: [
      { title: 'Short-Form Video Editing', path: '/services/short-form-video-editing' },
      { title: 'Ongoing Content Retainers', path: '/services/ongoing-content' },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'crypto-empire-documentary'],
    cta: {
      title: 'می‌خواهید ویدیوهای شما هم با هوک‌های میلیونی تدوین شوند؟',
      titleEn: 'Want Your Videos Edited with High-Retention Hooks?',
      subtitle: 'فوتیج خام خود را بفرستید؛ ما آن را به روایتی میخکوب‌کننده تبدیل می‌کنیم.',
      subtitleEn: 'Send your raw footage today; we transform it into compelling, high-retention content.',
      buttonText: 'دریافت برآورد هزینه پروژه',
      buttonTextEn: 'Get a Project Quote',
      link: '/contact',
    },
  },
  {
    id: 'res-podcast-repurposing',
    slug: 'podcast-to-shorts-workflow',
    title: 'راهنمای گام‌به‌گام تبدیل پادکست به شورتس و ریلزهای پربازدید',
    titleEn: 'Step-by-Step Guide to Repurposing Long Podcasts into Viral Shorts',
    description: 'چگونه از یک گفتگوی یک‌ساعته، ۱۰ الی ۱۵ کلیپ کوتاه وایرال با زیرنویس هوشمند، بی‌رول‌های جذاب و نگه‌داشت بالا بسازیم.',
    descriptionEn: 'How to turn a 60-minute interview into 10-15 high-performing vertical assets with kinetic captions, dynamic reframing, and mobile-optimized audio.',
    excerpt: 'سیستم استخراج بخش‌های طلایی پادکست، تکنیک‌های کادربندی برای فرمت عمودی ۹:۱۶ و بهینه‌سازی صدا برای شنوندگان موبایل.',
    excerptEn: 'The exact methodology for identifying golden micro-moments, converting 16:9 dialogue into 9:16 vertical video, and building repeatable editing workflows.',
    publishDate: '2026-02-24',
    updatedDate: '2026-03-20',
    author: {
      name: 'حسام',
      nameEn: 'Hesam',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      roleEn: 'Founder & Lead Editor at HesLab',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'creator-workflow',
    tags: ['پادکست', 'تولید محتوا', 'یوتیوب شورتس', 'بازنشر محتوا', 'جریان کار'],
    tagsEn: ['Podcasts', 'Content Repurposing', 'YouTube Shorts', 'Creator Workflow', 'Dialogue Framing'],
    coverGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #a7f3d0 100%)',
    readingTime: '۴ دقیقه مطالعه',
    readingTimeEn: '4 min read',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'پادکسترهای ویدیویی، بنیان‌گذاران مصاحبه‌کننده و یوتیوبرها',
      funnelStage: 'middle',
      targetTopic: 'Repurposing long-form podcast into viral short clips',
    },
    tableOfContents: [
      { id: 'sec-podcast-gold', title: '۱. شناسایی لحظات طلایی (Micro-Moments)', titleEn: '1. Identifying Golden Micro-Moments' },
      { id: 'sec-framing-916', title: '۲. بازآرایی کادر از افقی به عمودی', titleEn: '2. Dynamic 9:16 Re-Framing' },
      { id: 'sec-dynamic-broll', title: '۳. جان‌بخشی به دیالوگ با بیست‌کات و نمودار', titleEn: '3. Elevating Dialogue with B-Roll & Graphics' },
      { id: 'sec-turnaround-system', title: '۴. جریان کار تکرارپذیر بدون جلسات اضافه', titleEn: '4. Frictionless Asynchronous Turnaround' },
    ],
    introduction: 'ضبط پادکست انرژی و زمان زیادی می‌برد. اگر فقط نسخه کامل صوتی یا یوتیوبی آن را منتشر کنید، بیش از ۸۰٪ ظرفیت جذب مخاطب جدید را از دست داده‌اید. ریلز و شورتس، موثرترین کانال ورودی مخاطب به پادکست شما هستند. در این راهنما، فلوچارت دقیق تبدیل یک اپیزود به چندین میکرومحتوای تعامل‌برانگیز را تشریح می‌کنیم.',
    introductionEn: 'Recording long-form podcasts requires immense energy and time. Releasing only the full horizontal recording loses up to 80% of your organic discovery potential. Reels and Shorts are the highest-leverage discovery funnel for your show. Here is our exact production pipeline for turning single episodes into high-retention micro-content.',
    sections: [
      {
        id: 'sec-podcast-gold',
        heading: '۱. شناسایی لحظات طلایی (Micro-Moments)',
        headingEn: '1. Identifying Golden Micro-Moments',
        paragraphs: [
          'هر بخشی از مصاحبه قابلیت تبدیل شدن به شورتس را ندارد. ما در حس‌لب به دنبال بخش‌هایی با ویژگی‌های مشخص هستیم: اعتراف غیرمنتظره، شکستن یک باور عمومی، ارائه یک آمار تکان‌دهنده، یا یک داستان کوتاه آموزنده با پایان غافلگیرکننده.',
          'هر کلیپ باید یک شروع مستقل، بدنه متمرکز و نتیجه‌گیری سریع در محدوده ۳۰ تا ۵۰ ثانیه داشته باشد.',
        ],
        paragraphsEn: [
          'Not every interview exchange belongs in a short clip. We look for specific triggers: unexpected vulnerability, contrarian stances, jaw-dropping statistics, or concise storytelling with a payoff.',
          'Each clip must stand as a complete, compelling 30-to-50-second narrative on its own without needing the full context.',
        ],
        callout: 'معیار استخراج: آیا این بخش بدون دیدن بقیه مصاحبه، به تنهایی کامل و فهم‌پذیر است؟ اگر بله، یک کاندیدای عالی برای ریلز است.',
        calloutEn: 'Extraction Test: Does this clip deliver a complete thought and emotional punch without watching the rest of the interview? If yes, it is an ideal short candidate.',
      },
      {
        id: 'sec-framing-916',
        heading: '۲. بازآرایی کادر از افقی به عمودی',
        headingEn: '2. Dynamic 9:16 Re-Framing',
        paragraphs: [
          'اگر پادکست با یک دوربین افقی ضبط شده باشد، با زوم و موشن ترکینگ هوشمند، چهره گوینده فعال را در مرکز کادر نگه می‌داریم.',
          'در پادکست‌های دونفره، قالب‌های Split Screen یا جابه‌جایی سریع کادر همگام با صحبت هر فرد (Dynamic Switching) حس پویایی تلویزیونی را ایجاد می‌کند.',
        ],
        paragraphsEn: [
          'Horizontal camera setups require smart tracking to keep the active speaker perfectly centered in the 9:16 safe zone.',
          'For two-person interviews, split-screen layouts or dynamic speaker-switching cuts create television-level production polish.',
        ],
      },
      {
        id: 'sec-dynamic-broll',
        heading: '۳. جان‌بخشی به دیالوگ با بیست‌کات و نمودار',
        headingEn: '3. Elevating Dialogue with B-Roll & Graphics',
        paragraphs: [
          'دیدن یک نفر که ۴۰ ثانیه مداوم در میکروفون صحبت می‌کند خسته‌کننده است. ما کلمات کلیدی، نمودارهای رشد، صفحات وب مورد اشاره و تصاویر مفهومی را با موشن ملایم روی تصویر اضافه می‌کنیم تا بار دیداری مکالمه بالا برود.',
        ],
        paragraphsEn: [
          'Watching someone speak continuously into a microphone causes visual fatigue. We layer relevant screenshots, kinetic charts, and conceptual b-roll over the audio track to boost visual velocity.',
        ],
      },
      {
        id: 'sec-turnaround-system',
        heading: '۴. جریان کار تکرارپذیر بدون جلسات اضافه',
        headingEn: '4. Frictionless Asynchronous Turnaround',
        paragraphs: [
          'کریتورهای پادکست وقت چت‌های طولانی و رفت‌وبرگشت‌های بی‌پایان را ندارند. در استودیو حس‌لب، شما فقط لینک گوگل درایو یا فایل پروژه را به اشتراک می‌گذارید و در ۲۴ تا ۴۸ ساعت، پکیج ویدیوهای ادیت‌شده را با زیرنویس فارسی و انگلیسی دریافت می‌کنید.',
        ],
        paragraphsEn: [
          'Podcast creators lack time for endless meetings. At HesLab, you simply share your cloud folder link and receive publish-ready cuts in 24-48 hours.',
        ],
      },
    ],
    faq: [
      {
        question: 'از یک ساعت پادکست چند ویدیوی کوتاه می‌توان تولید کرد؟',
        questionEn: 'How many clips can be extracted from a 1-hour podcast episode?',
        answer: 'معمولاً بین ۶ تا ۱۲ ویدیوی کوتاه باکیفیت و بدون تکرار می‌توان استخراج کرد.',
        answerEn: 'Typically between 6 and 12 high-impact standalone vertical videos without redundancy.',
      },
    ],
    relatedServices: [
      { title: 'Short-Form Video Editing', path: '/services/short-form-video-editing' },
      { title: 'Motion Design', path: '/services/motion-design' },
    ],
    relatedWorkSlugs: ['founder-routine-podcast'],
    cta: {
      title: 'می‌خواهید پادکست شما منبع بی‌پایان ریلزهای پربازدید شود؟',
      titleEn: 'Ready to Turn Your Podcast into an Endless Short-Form Engine?',
      subtitle: 'قسمت جدید پادکست خود را ارسال کنید تا نمونه تدوین اولیه را تحویل بگیرید.',
      subtitleEn: 'Share your latest episode link to receive a private sample cut in 48 hours.',
      buttonText: 'درخواست مشاوره پادکست',
      buttonTextEn: 'Discuss Podcast Repurposing',
      link: '/contact',
    },
  },
  {
    id: 'res-kinetic-physics',
    slug: 'kinetic-typography-motion-design',
    title: 'کالبدشکافی موشن دیزاین و فیزیک انیمیشن در ویدیوهای کوتاه',
    titleEn: 'Anatomy of Motion Design & Spring Physics in Short-Form Video',
    description: 'بررسی علمی پارامترهای فیزیک فنر (سختی، جرم و میرایی) در انیمیشن متن‌ها، استیکرها و ترنزیشن‌های ویدیوهای مدرن.',
    descriptionEn: 'Scientific examination of harmonic spring oscillations in title animations, sticker pop-ins, and directional transitions. Includes live interactive playground.',
    excerpt: 'چرا انیمیشن‌های با فیزیک واقعی حس روان‌تر و ارگانیک‌تری نسبت به کی‌فریم‌های خطی قدیمی ایجاد می‌کنند؟ تست زنده شبیه‌ساز فنر.',
    excerptEn: 'Why real physics (stiffness, damping, and mass) feel dramatically more organic than rigid linear easing in modern kinetic captions and transitions.',
    publishDate: '2026-03-01',
    updatedDate: '2026-03-25',
    author: {
      name: 'حسام',
      nameEn: 'Hesam',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      roleEn: 'Founder & Lead Editor at HesLab',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'motion-design',
    tags: ['موشن دیزاین', 'تایپوگرافی کینتیک', 'فیزیک فنر', 'Framer Motion', 'طراحی بصری'],
    tagsEn: ['Motion Design', 'Kinetic Typography', 'Spring Physics', 'Framer Motion', 'Visual Identity'],
    coverGradient: 'linear-gradient(135deg, #fed7aa 0%, #f472b6 50%, #c084fc 100%)',
    readingTime: '۴ دقیقه مطالعه و آزمایش',
    readingTimeEn: '4 min read & test',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'طراحان موشن، تدوین‌گران ویدیویی و مدیران هنری',
      funnelStage: 'top',
      targetTopic: 'Motion design spring physics & kinetic typography in video',
    },
    tableOfContents: [
      { id: 'sec-spring-intro', title: '۱. چرا فیزیک فنر جایگزین ایزینگ خطی شد؟', titleEn: '1. Why Springs Replaced Linear Easing' },
      { id: 'sec-interactive-sim', title: '۲. شبیه‌ساز پارامتری فیزیک فنر (تست زنده)', titleEn: '2. Live Spring Physics Simulator' },
      { id: 'sec-kinetic-rules', title: '۳. اصول موشن تایپوگرافی در ریلز', titleEn: '3. Principles of Kinetic Subtitles in Reels' },
      { id: 'sec-quiz', title: '۴. آزمون کوتاه تشخیص میرایی', titleEn: '4. Quick Damping Ratio Quiz' },
    ],
    introduction: 'در ویدیوهای تیک‌تاک و ریلزهای سال‌های گذشته، متون و المان‌ها با سرعت‌های یکنواخت یا ایزینگ‌های خشک جابه‌جا می‌شدند. اما در نسل جدید تدوین، از معادلات دیفرانسیل نوسان هارمونیک فنر (Spring Dynamics) برای القای حس سنگینی، کشسانی و شتاب واقعی استفاده می‌شود. در این نوشتار، اصول فیزیکی این حرکات را همراه با ویجت زنده بررسی می‌کنیم.',
    introductionEn: 'Past vertical edits relied on rigid, linear easing or stock transitions that felt robotic. Modern creator aesthetics demand harmonic spring dynamics (mass, stiffness, and damping) to create tactile visual weight. In this breakdown, we examine the physics of motion with interactive widgets.',
    sections: [
      {
        id: 'sec-spring-intro',
        heading: '۱. چرا فیزیک فنر جایگزین ایزینگ خطی شد؟',
        headingEn: '1. Why Springs Replaced Linear Easing',
        paragraphs: [
          'چشم انسان در دنیای واقعی هیچ حرکتی را با سرعت یکنواخت نمی‌بیند. هر شیء دارای جرم است و برای شروع و توقف نیاز به اعمال نیرو دارد.',
          'در انیمیشن‌های مدرن، به‌جای تعیین ثانیه‌های خشک، سه فاکتور سختی (Stiffness)، میرایی (Damping) و جرم (Mass) رفتار حرکت را تعیین می‌کنند.',
        ],
        paragraphsEn: [
          'Human eyes never witness perfectly uniform motion in the physical world. Every physical object carries mass and requires force to accelerate and decelerate.',
          'Instead of artificial easing curves, natural spring dynamics define motion using three organic parameters: stiffness, damping, and mass.',
        ],
      },
      {
        id: 'sec-interactive-sim',
        heading: '۲. شبیه‌ساز پارامتری فیزیک فنر (تست زنده)',
        headingEn: '2. Live Spring Physics Simulator',
        paragraphs: [
          'با اسلایدرهای زیر پارامترها را تغییر داده و دکمه شبیه‌سازی رهاسازی را بزنید تا رفتار نوسانی المان را در لحظه مشاهده کنید:',
        ],
        paragraphsEn: [
          'Adjust the sliders below to explore stiffness, damping, and mass in real-time:',
        ],
        widget: 'spring-simulator',
      },
      {
        id: 'sec-kinetic-rules',
        heading: '۳. اصول موشن تایپوگرافی در ریلز',
        headingEn: '3. Principles of Kinetic Subtitles in Reels',
        paragraphs: [
          'هنگام نمایش زیرنویس یا واژه‌های کلیدی، نباید متن بیش از حد بپرد که خواندنش مختل شود. ما معمولاً میرایی را روی حالت بدون پرش بحرانی (Critically Damped) تنظیم می‌کنیم تا المان به سرعت و با نهایت نرمی در جای خود بنشیند.',
        ],
        paragraphsEn: [
          'When animating subtitles or keyword tags, motion should never compromise legibility. We calibrate damping to near-critical thresholds so text snaps into place with fluid crispness.',
        ],
        widget: 'magnetic-walkthrough',
      },
      {
        id: 'sec-quiz',
        heading: '۴. آزمون کوتاه تشخیص میرایی',
        headingEn: '4. Quick Damping Ratio Quiz',
        paragraphs: [
          'درک خود را درباره نسبت میرایی در چالش زیر بسنجید:',
        ],
        paragraphsEn: [
          'Test your intuition on spring damping ratios in the challenge below:',
        ],
        widget: 'spring-predictor',
      },
    ],
    relatedServices: [
      { title: 'Motion Design', path: '/services/motion-design' },
      { title: 'Short-Form Video Editing', path: '/services/short-form-video-editing' },
    ],
    relatedWorkSlugs: ['wireless-headphone-commercial'],
    cta: {
      title: 'می‌خواهید ویدیوهای برندتان موشن گرافیک اختصاصی داشته باشند؟',
      titleEn: 'Looking for Bespoke Motion Graphics for Your Brand?',
      subtitle: 'هویت بصری منحصربه‌فرد با انیمیشن‌های روان و استانداردهای روز بین‌المللی.',
      subtitleEn: 'Distinctive visual identity, kinetic subtitles, and fluid 60FPS motion design.',
      buttonText: 'مشاهده خدمات موشن دیزاین',
      buttonTextEn: 'Explore Motion Design Services',
      link: '/services/motion-design',
    },
  },
  {
    id: 'res-cost-guide',
    slug: 'short-form-video-editing-cost-guide',
    title: 'هزینه ادیت ویدیوهای کوتاه چقدر است؟ راهنمای انتخاب پکیج مناسب',
    titleEn: 'How Much Does Short-Form Video Editing Cost? 2026 Pricing Guide',
    description: 'بررسی شفاف هزینه‌ها، تفاوت ادیتور فریلنسر با استودیو تخصصی و معیارهای ارزش‌گذاری تدوین ریلز و شورتس در سال ۲۰۲۶.',
    descriptionEn: 'A clear valuation guide for hiring short-form video editors, comparing single-project pricing against dedicated monthly retainers.',
    excerpt: 'تحلیل دقیق مدل‌های پرداخت ساعتی، پروژه‌ای و پکیج‌های ماهانه به همراه راهنمای تخمین بازگشت سرمایه تولید ویدیو.',
    excerptEn: 'Transparent breakdown of hourly rates vs. monthly retainer packages, freelancer pitfalls, and calculating ROI on high-yield social video content.',
    publishDate: '2026-03-10',
    updatedDate: '2026-03-28',
    author: {
      name: 'حسام',
      nameEn: 'Hesam',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      roleEn: 'Founder & Lead Editor at HesLab',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'pricing-buying',
    tags: ['هزینه ادیت', 'قیمت تدوین ریلز', 'پکیج ماهانه', 'برون‌سپاری محتوا', 'بودجه‌بندی'],
    tagsEn: ['Editing Rates', 'Reels Pricing', 'Monthly Retainer', 'Outsourcing Video', 'Content Budget'],
    coverGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fef3c7 100%)',
    readingTime: '۴ دقیقه مطالعه',
    readingTimeEn: '4 min read',
    searchIntent: {
      primaryIntent: 'commercial',
      secondaryIntents: ['informational'],
      audience: 'صاحبان کسب‌وکار، کریتورهای در حال مقیاس و بازاریابان محتوا',
      funnelStage: 'bottom',
      targetTopic: 'Short-form video editing cost and pricing guide',
    },
    tableOfContents: [
      { id: 'sec-pricing-factors', title: '۱. چه عواملی قیمت ادیت را تعیین می‌کنند؟', titleEn: '1. What Factors Determine Video Editing Cost?' },
      { id: 'sec-pricing-models', title: '۲. مقایسه مدل‌های همکاری (تکی در برابر ماهانه)', titleEn: '2. Per-Project vs. Monthly Retainer Models' },
      { id: 'sec-freelancer-vs-studio', title: '۳. فریلنسر ساعتی یا استودیوی متعهد؟', titleEn: '3. Hourly Freelancers vs Dedicated Studio' },
      { id: 'sec-roi-calc', title: '۴. محاسبه بازگشت سرمایه (ROI) تولید محتوا', titleEn: '4. Estimating Creator Content ROI' },
    ],
    introduction: 'یکی از متداول‌ترین پرسش‌های تولیدکنندگان محتوا و مدیران برند این است: «برای تدوین ویدیوهای باکیفیت چقدر باید هزینه کنیم؟» قیمت‌ها در بازار از ارقام بسیار پایین تا تعرفه‌های سنگین متغیر است. در این راهنما، معیارهای شفاف ارزش‌گذاری ادیت تخصصی و نحوه انتخاب بهینه‌ترین پلن را شرح می‌دهیم.',
    introductionEn: 'One of the most frequent questions from creators and founders is: "How much should I invest in professional video editing?" Market rates range from bargain freelancers to premium creative studios. Here is an honest breakdown of video editing valuation and how to select the right tier for your growth.',
    sections: [
      {
        id: 'sec-pricing-factors',
        heading: '۱. چه عواملی قیمت ادیت را تعیین می‌کنند؟',
        headingEn: '1. What Factors Determine Video Editing Cost?',
        paragraphs: [
          'قیمت ادیت تنها وابسته به طول ویدیو نیست، بلکه به حجم ارزش افزوده روی هر ثانیه بستگی دارد:',
          '• عمق راف‌کات و بازنویسی ساختار روایی',
          '• سطح ساند دیزاین و تعداد لایه‌های صوتی',
          '• سفارشی بودن گرافیک‌ها در برابر استفاده از قالب‌های آماده ارزان',
          '• سرعت تحویل تضمین‌شده (۲۴ تا ۴۸ ساعت)',
        ],
        paragraphsEn: [
          'Pricing is never just about raw timeline length; it reflects the depth of attention engineering applied per second:',
          '• Precision silence removal and narrative pacing overhaul',
          '• Multi-track spatial sound design and custom audio risers',
          '• Bespoke motion typography vs generic preset templates',
          '• Guaranteed 24-48 hour turnarounds with dedicated capacity',
        ],
      },
      {
        id: 'sec-pricing-models',
        heading: '۲. مقایسه مدل‌های همکاری (تکی در برابر ماهانه)',
        headingEn: '2. Per-Project vs. Monthly Retainer Models',
        paragraphs: [
          'همکاری پروژه‌ای برای تست اولیه یا کمپین‌های مقطعی مناسب است، اما برای حفظ حضور مداوم در الگوریتم، پکیج‌های منظم ماهانه (Retainer) هزینه تمام‌شده به ازای هر ویدیو را ۲۰ تا ۳۵ درصد کاهش می‌دهند.',
        ],
        paragraphsEn: [
          'Single-project engagements work well for testing quality. However, continuous algorithmic momentum requires predictable volume—monthly retainers reduce per-video cost by 20% to 35% while reserving priority editing bandwidth.',
        ],
      },
      {
        id: 'sec-freelancer-vs-studio',
        heading: '۳. فریلنسر ساعتی یا استودیوی متعهد؟',
        headingEn: '3. Hourly Freelancers vs Dedicated Studio',
        paragraphs: [
          'بزرگترین چالش همکاری با فریلنسرهای بی‌تجربه، نوسان کیفیت و ناپدید شدن در روزهای تحویل است. در استودیو حس‌لب، شما با یک فرآیند کاری شفاف، تعهد زمانی دقیق و هویت بصری یکپارچه برای تمام ویدیوها کار می‌کنید.',
        ],
        paragraphsEn: [
          'The greatest frustration with unpredictable freelancers is erratic quality and missed deadlines. With HesLab, you receive an asynchronous, battle-tested system, consistent brand aesthetic, and reliable turnaround.',
        ],
        callout: 'شفافیت حس‌لب: بدون هزینه‌های پنهان، همراه با اصلاحات نامحدود منطقی تا رسیدن به نتیجه مطلوب شما.',
        calloutEn: 'HesLab Guarantee: Zero hidden fees, predictable turnaround, and seamless revisions until you are completely satisfied.',
      },
    ],
    faq: [
      {
        question: 'آیا امکان سفارش یک ویدیوی آزمایشی وجود دارد؟',
        questionEn: 'Can I order a single test video before committing to a monthly retainer?',
        answer: 'بله، می‌توانید یک پروژه تکی سفارش دهید تا پیش از بستن پکیج ماهانه، کیفیت و هماهنگی کاری را ارزیابی کنید.',
        answerEn: 'Yes! We encourage a single-video test project so you can experience our pacing, sound design, and turnaround firsthand.',
      },
      {
        question: 'نحوه پرداخت چگونه است؟',
        questionEn: 'What is the payment structure?',
        answer: 'برای پروژه‌های تکی ۵۰٪ پیش‌پرداخت و ۵۰٪ پس از تایید نهایی خروجی دریافت می‌شود. برای پکیج‌های ماهانه در ابتدای هر دوره پرداخت صورت می‌گیرد.',
        answerEn: 'For individual projects, 50% upfront and 50% upon final delivery. Monthly retainers are billed at the beginning of each billing cycle.',
      },
    ],
    relatedServices: [
      { title: 'Ongoing Content Retainers', path: '/services/ongoing-content' },
      { title: 'Short-Form Video Editing', path: '/services/short-form-video-editing' },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'founder-routine-podcast'],
    cta: {
      title: 'می‌خواهید برآورد دقیق هزینه کانال یا برند خود را دریافت کنید؟',
      titleEn: 'Ready for a Transparent Video Production Quote?',
      subtitle: 'هدف و تعداد ویدیوهای مد نظرتان را بگویید تا بهترین پلن را به شما پیشنهاد دهیم.',
      subtitleEn: 'Share your target video cadence and goals; we will recommend the most cost-effective package.',
      buttonText: 'دریافت پیش‌فاکتور شفاف',
      buttonTextEn: 'Request Pricing Quote',
      link: '/contact',
    },
  },
];

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find((a) => a.slug === slug);
}

export function getAllResources(): ResourceArticle[] {
  return RESOURCE_ARTICLES.filter((a) => !a.draft);
}
