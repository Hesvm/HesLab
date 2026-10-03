export interface ResourceAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface ResourceTocItem {
  id: string;
  title: string;
}

export interface ResourceSection {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: string;
  pullQuote?: string;
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
  answer: string;
}

export interface ResourceCta {
  title: string;
  subtitle: string;
  buttonText: string;
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
  description: string;
  excerpt: string;
  publishDate: string;
  updatedDate?: string;
  author: ResourceAuthor;
  category: 'short-form' | 'motion-design' | 'creator-workflow' | 'pricing-buying';
  tags: string[];
  featuredImage?: string;
  coverGradient: string;
  socialImage?: string;
  readingTime: string;
  tableOfContents: ResourceTocItem[];
  introduction: string;
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
    description: 'راهنمای جامع تدوین هوک‌های پربازدید در اینستاگرام ریلز، یوتیوب شورتس و تیک‌تاک بر پایه اصول روانشناسی توجه و طراحی صدای سه‌بعدی.',
    excerpt: 'بررسی فریم‌به‌فریم هوک‌های وایرال، فرمول‌های کلامی، برش‌های بصری شوکه‌کننده و استفاده از ساند افکت‌های ترنزیشن برای افزایش نگه‌داشت مخاطب بالای ۷۵٪.',
    publishDate: '2026-02-10',
    updatedDate: '2026-03-15',
    author: {
      name: 'حسام',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'short-form',
    tags: ['هوک ریلز', 'افزایش بازدید', 'تدوین شورتس', 'نگه‌داشت مخاطب', 'الگوریتم ۲۰۲۶'],
    coverGradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #bae6fd 100%)',
    readingTime: '۵ دقیقه مطالعه',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'تولیدکنندگان محتوا، برندهای شخصی و سازندگان ویدیو',
      funnelStage: 'top',
      targetTopic: 'Short-form video hooks & retention editing',
    },
    tableOfContents: [
      { id: 'sec-hook-psychology', title: '۱. چرا ۳ ثانیه اول سرنوشت ویدیو را رقم می‌زند؟' },
      { id: 'sec-visual-disruption', title: '۲. شکست الگوی بصری (Pattern Interrupt)' },
      { id: 'sec-sound-impact', title: '۳. جادوی طراحی صدا در اولین فریم' },
      { id: 'sec-comparison-table', title: '۴. جدول مقایسه هوک ضعیف در برابر هوک اصولی' },
      { id: 'sec-step-formula', title: '۵. فرمول ۳ مرحله‌ای اجرای هوک در پروژه‌های حس‌لب' },
    ],
    introduction: 'در سال ۲۰۲۶، میانگین زمان تصمیم‌گیری کاربر برای رد کردن یک ویدیو در فید اینستاگرام و یوتیوب به کمتر از ۱.۵ ثانیه رسیده است. اگر ویدیوی شما در ثانیه‌های آغازین نتواند مغز مخاطب را متوقف کند، مهم نیست چقدر پیام ارزشمندی در ادامه دارید. در این نوشتار، استراتژی تدوین هوک‌هایی را بررسی می‌کنیم که در پروژه‌های حس‌لب نرخ نگه‌داشت (Audience Retention) را به بالای ۸۰٪ رسانده‌اند.',
    sections: [
      {
        id: 'sec-hook-psychology',
        heading: '۱. چرا ۳ ثانیه اول سرنوشت ویدیو را رقم می‌زند؟',
        paragraphs: [
          'الگوریتم‌های مدرن بر پایه متریک Completion Rate و Re-watch Rate کار می‌کنند. وقتی کاربری ویدیوی شما را رد می‌کند (Swipe Away)، سیگنال منفی شدیدی به الگوریتم ارسال می‌شود مبنی بر اینکه ویدیو ارزشی برای ادامه ندارد.',
          'بنابراین وظیفه ادیتور فقط کات زدن نیست؛ وظیفه ما ایجاد یک قلاب عاطفی، بصری یا کنجکاوی است که اجازه ندهد انگشت شست کاربر به سمت بالا حرکت کند.',
        ],
        callout: 'نکته کلیدی: هرگز ویدیو را با سلام و احوالپرسی یا معرفی نام شروع نکنید. مستقیماً به سراغ نتیجه، شوک یا سوال اصلی بروید.',
      },
      {
        id: 'sec-visual-disruption',
        heading: '۲. شکست الگوی بصری (Pattern Interrupt)',
        paragraphs: [
          'ذهن انسان به فریم‌های ایستا و سخنرانی‌های عادی عادت کرده است. برای جلب توجه، نیاز به «شکست الگو» در نخستین فریم داریم.',
          'استفاده از زوم ناگهانی (Crash Zoom)، تغییر سریع پس‌زمینه در ثانیه اول، ورود شیء غیرمنتظره به کادر یا وارونه کردن فوتیج از تکنیک‌های اثبات‌شده حس‌لب برای شکستن رخوت کاربر است.',
        ],
        pullQuote: '«هوک موفق شبیه کوبیدن روی میز وسط یک سخنرانی آرام است؛ توجه همه را فورا جلب می‌کند بدون اینکه آزاردهنده باشد.»',
      },
      {
        id: 'sec-sound-impact',
        heading: '۳. جادوی طراحی صدا در اولین فریم',
        paragraphs: [
          'بیش از ۴۰٪ تعامل کاربران با صدای باز صورت می‌گیرد. یک صدای سوئیپ یا وووش پرحجم، ضربه باس بوم (Bass Drop) یا کلیک کینتیک همگام با کلمه اول، مغز شنیداری مخاطب را درگیر می‌کند.',
          'در استودیو حس‌لب، نخستین موج صدا دقیقاً همزمان با فریم صفر ویدیو میکس می‌شود تا تأخیر حسی به صفر برسد.',
        ],
      },
      {
        id: 'sec-comparison-table',
        heading: '۴. جدول مقایسه هوک ضعیف در برابر هوک اصولی',
        paragraphs: [
          'تفاوت یک ویدیوی ۵۰ هزار بازدیدی با یک ویدیوی میلیونی اغلب در تفاوت‌های زیر خلاصه می‌شود:',
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
        paragraphs: [
          'برای هر پروژه تدوین، ما این ساختار سه‌گانه را به کار می‌گیریم:',
        ],
        numberedSteps: [
          {
            step: '۰۱',
            title: 'استخراج تنش یا تناقض',
            text: 'پیدا کردن جسورانه‌ترین گزاره گوینده در کل ویدیو و انتقال آن به ثانیه نخست.',
          },
          {
            step: '۰۲',
            title: 'هماهنگی بصری و کلامی',
            text: 'انیمیشن کلمه اصلی هوک روی صفحه با رنگ کنتراست‌دار دقیقاً همگام با ادای کلمه.',
          },
          {
            step: '۰۳',
            title: 'پل ارتباطی به بدنه اصلی',
            text: 'ارائه پاسخ یا شروع توضیح سریع بلافاصله پس از ثانیه ۳ بدون اضافه گویی.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'طول ایده‌آل یک هوک در ریلز چقدر است؟',
        answer: 'بهترین طول هوک بین ۲ تا حداکثر ۳.۵ ثانیه است. پس از آن باید بلافاصله وارد ارائه محتوای اصلی شد.',
      },
      {
        question: 'آیا برای همه ویدیوها نیاز به متن بزرگ هوک است؟',
        answer: 'خیر، در ولاگ‌های سبک زندگی یا ویدیوهای سینمایی، یک حرکت دوربین جذاب یا هوک صوتی می‌تواند جایگزین متن شود.',
      },
    ],
    relatedServices: [
      { title: 'تدوین شورتس و ریلز', path: '/services/short-form-video-editing' },
      { title: 'پکیج‌های منظم ماهانه', path: '/services/ongoing-content' },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'crypto-empire-documentary'],
    cta: {
      title: 'می‌خواهید ویدیوهای شما هم با هوک‌های میلیونی تدوین شوند؟',
      subtitle: 'فوتیج خام خود را بفرستید؛ ما آن را به روایتی میخکوب‌کننده تبدیل می‌کنیم.',
      buttonText: 'دریافت برآورد هزینه پروژه',
      link: '/contact',
    },
  },
  {
    id: 'res-podcast-repurposing',
    slug: 'podcast-to-shorts-workflow',
    title: 'راهنمای گام‌به‌گام تبدیل پادکست به شورتس و ریلزهای پربازدید',
    description: 'چگونه از یک گفتگوی یک‌ساعته، ۱۰ الی ۱۵ کلیپ کوتاه وایرال با زیرنویس هوشمند، بی‌رول‌های جذاب و نگه‌داشت بالا بسازیم.',
    excerpt: 'سیستم استخراج بخش‌های طلایی پادکست، تکنیک‌های کادربندی برای فرمت عمودی ۹:۱۶ و بهینه‌سازی صدا برای شنوندگان موبایل.',
    publishDate: '2026-02-24',
    updatedDate: '2026-03-20',
    author: {
      name: 'حسام',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'creator-workflow',
    tags: ['پادکست', 'تولید محتوا', 'یوتیوب شورتس', 'بازنشر محتوا', 'جریان کار'],
    coverGradient: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #a7f3d0 100%)',
    readingTime: '۴ دقیقه مطالعه',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'پادکسترهای ویدیویی، بنیان‌گذاران مصاحبه‌کننده و یوتیوبرها',
      funnelStage: 'middle',
      targetTopic: 'Repurposing long-form podcast into viral short clips',
    },
    tableOfContents: [
      { id: 'sec-podcast-gold', title: '۱. شناسایی لحظات طلایی (Micro-Moments)' },
      { id: 'sec-framing-916', title: '۲. بازآرایی کادر از افقی به عمودی' },
      { id: 'sec-dynamic-broll', title: '۳. جان‌بخشی به دیالوگ با بیست‌کات و نمودار' },
      { id: 'sec-turnaround-system', title: '۴. جریان کار تکرارپذیر بدون جلسات اضافه' },
    ],
    introduction: 'ضبط پادکست انرژی و زمان زیادی می‌برد. اگر فقط نسخه کامل صوتی یا یوتیوبی آن را منتشر کنید، بیش از ۸۰٪ ظرفیت جذب مخاطب جدید را از دست داده‌اید. ریلز و شورتس، موثرترین کانال ورودی مخاطب به پادکست شما هستند. در این راهنما، فلوچارت دقیق تبدیل یک اپیزود به چندین میکرومحتوای تعامل‌برانگیز را تشریح می‌کنیم.',
    sections: [
      {
        id: 'sec-podcast-gold',
        heading: '۱. شناسایی لحظات طلایی (Micro-Moments)',
        paragraphs: [
          'هر بخشی از مصاحبه قابلیت تبدیل شدن به شورتس را ندارد. ما در حس‌لب به دنبال بخش‌هایی با ویژگی‌های مشخص هستیم: اعتراف غیرمنتظره، شکستن یک باور عمومی، ارائه یک آمار تکان‌دهنده، یا یک داستان کوتاه آموزنده با پایان غافلگیرکننده.',
          'هر کلیپ باید یک شروع مستقل، بدنه متمرکز و نتیجه‌گیری سریع در محدوده ۳۰ تا ۵۰ ثانیه داشته باشد.',
        ],
        callout: 'معیار استخراج: آیا این بخش بدون دیدن بقیه مصاحبه، به تنهایی کامل و فهم‌پذیر است؟ اگر بله، یک کاندیدای عالی برای ریلز است.',
      },
      {
        id: 'sec-framing-916',
        heading: '۲. بازآرایی کادر از افقی به عمودی',
        paragraphs: [
          'اگر پادکست با یک دوربین افقی ضبط شده باشد، با زوم و موشن ترکینگ هوشمند، چهره گوینده فعال را در مرکز کادر نگه می‌داریم.',
          'در پادکست‌های دونفره، قالب‌های Split Screen یا جابه‌جایی سریع کادر همگام با صحبت هر فرد (Dynamic Switching) حس پویایی تلویزیونی را ایجاد می‌کند.',
        ],
      },
      {
        id: 'sec-dynamic-broll',
        heading: '۳. جان‌بخشی به دیالوگ با بیست‌کات و نمودار',
        paragraphs: [
          'دیدن یک نفر که ۴۰ ثانیه مداوم در میکروفون صحبت می‌کند خسته‌کننده است. ما کلمات کلیدی، نمودارهای رشد، صفحات وب مورد اشاره و تصاویر مفهومی را با موشن ملایم روی تصویر اضافه می‌کنیم تا بار دیداری مکالمه بالا برود.',
        ],
      },
      {
        id: 'sec-turnaround-system',
        heading: '۴. جریان کار تکرارپذیر بدون جلسات اضافه',
        paragraphs: [
          'کریتورهای پادکست وقت چت‌های طولانی و رفت‌وبرگشت‌های بی‌پایان را ندارند. در استودیو حس‌لب، شما فقط لینک گوگل درایو یا فایل پروژه را به اشتراک می‌گذارید و در ۲۴ تا ۴۸ ساعت، پکیج ویدیوهای ادیت‌شده را با زیرنویس فارسی و انگلیسی دریافت می‌کنید.',
        ],
      },
    ],
    faq: [
      {
        question: 'از یک ساعت پادکست چند ویدیوی کوتاه می‌توان تولید کرد؟',
        answer: 'معمولاً بین ۶ تا ۱۲ ویدیوی کوتاه باکیفیت و بدون تکرار می‌توان استخراج کرد.',
      },
    ],
    relatedServices: [
      { title: 'تدوین شورتس و ریلز', path: '/services/short-form-video-editing' },
      { title: 'موشن دیزاین و هویت بصری', path: '/services/motion-design' },
    ],
    relatedWorkSlugs: ['founder-routine-podcast'],
    cta: {
      title: 'می‌خواهید پادکست شما منبع بی‌پایان ریلزهای پربازدید شود؟',
      subtitle: 'قسمت جدید پادکست خود را ارسال کنید تا نمونه تدوین اولیه را تحویل بگیرید.',
      buttonText: 'درخواست مشاوره پادکست',
      link: '/contact',
    },
  },
  {
    id: 'res-kinetic-physics',
    slug: 'kinetic-typography-motion-design',
    title: 'کالبدشکافی موشن دیزاین و فیزیک انیمیشن در ویدیوهای کوتاه',
    description: 'بررسی علمی پارامترهای فیزیک فنر (سختی، جرم و میرایی) در انیمیشن متن‌ها، استیکرها و ترنزیشن‌های ویدیوهای مدرن.',
    excerpt: 'چرا انیمیشن‌های با فیزیک واقعی حس روان‌تر و ارگانیک‌تری نسبت به کی‌فریم‌های خطی قدیمی ایجاد می‌کنند؟ تست زنده شبیه‌ساز فنر.',
    publishDate: '2026-03-01',
    updatedDate: '2026-03-25',
    author: {
      name: 'حسام',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'motion-design',
    tags: ['موشن دیزاین', 'تایپوگرافی کینتیک', 'فیزیک فنر', 'Framer Motion', 'طراحی بصری'],
    coverGradient: 'linear-gradient(135deg, #fed7aa 0%, #f472b6 50%, #c084fc 100%)',
    readingTime: '۴ دقیقه مطالعه و آزمایش',
    searchIntent: {
      primaryIntent: 'informational',
      secondaryIntents: ['commercial'],
      audience: 'طراحان موشن، تدوین‌گران ویدیویی و مدیران هنری',
      funnelStage: 'top',
      targetTopic: 'Motion design spring physics & kinetic typography in video',
    },
    tableOfContents: [
      { id: 'sec-spring-intro', title: '۱. چرا فیزیک فنر جایگزین ایزینگ خطی شد؟' },
      { id: 'sec-interactive-sim', title: '۲. شبیه‌ساز پارامتری فیزیک فنر (تست زنده)' },
      { id: 'sec-kinetic-rules', title: '۳. اصول موشن تایپوگرافی در ریلز' },
      { id: 'sec-quiz', title: '۴. آزمون کوتاه تشخیص میرایی' },
    ],
    introduction: 'در ویدیوهای تیک‌تاک و ریلزهای سال‌های گذشته، متون و المان‌ها با سرعت‌های یکنواخت یا ایزینگ‌های خشک جابه‌جا می‌شدند. اما در نسل جدید تدوین، از معادلات دیفرانسیل نوسان هارمونیک فنر (Spring Dynamics) برای القای حس سنگینی، کشسانی و شتاب واقعی استفاده می‌شود. در این نوشتار، اصول فیزیکی این حرکات را همراه با ویجت زنده بررسی می‌کنیم.',
    sections: [
      {
        id: 'sec-spring-intro',
        heading: '۱. چرا فیزیک فنر جایگزین ایزینگ خطی شد؟',
        paragraphs: [
          'چشم انسان در دنیای واقعی هیچ حرکتی را با سرعت یکنواخت نمی‌بیند. هر شیء دارای جرم است و برای شروع و توقف نیاز به اعمال نیرو دارد.',
          'در انیمیشن‌های مدرن، به‌جای تعیین ثانیه‌های خشک، سه فاکتور سختی (Stiffness)، میرایی (Damping) و جرم (Mass) رفتار حرکت را تعیین می‌کنند.',
        ],
      },
      {
        id: 'sec-interactive-sim',
        heading: '۲. شبیه‌ساز پارامتری فیزیک فنر (تست زنده)',
        paragraphs: [
          'با اسلایدرهای زیر پارامترها را تغییر داده و دکمه شبیه‌سازی رهاسازی را بزنید تا رفتار نوسانی المان را در لحظه مشاهده کنید:',
        ],
        widget: 'spring-simulator',
      },
      {
        id: 'sec-kinetic-rules',
        heading: '۳. اصول موشن تایپوگرافی در ریلز',
        paragraphs: [
          'هنگام نمایش زیرنویس یا واژه‌های کلیدی، نباید متن بیش از حد بپرد که خواندنش مختل شود. ما معمولاً میرایی را روی حالت بدون پرش بحرانی (Critically Damped) تنظیم می‌کنیم تا المان به سرعت و با نهایت نرمی در جای خود بنشیند.',
        ],
        widget: 'magnetic-walkthrough',
      },
      {
        id: 'sec-quiz',
        heading: '۴. آزمون کوتاه تشخیص میرایی',
        paragraphs: [
          'درک خود را درباره نسبت میرایی در چالش زیر بسنجید:',
        ],
        widget: 'spring-predictor',
      },
    ],
    relatedServices: [
      { title: 'موشن دیزاین و هویت بصری', path: '/services/motion-design' },
      { title: 'تدوین شورتس و ریلز', path: '/services/short-form-video-editing' },
    ],
    relatedWorkSlugs: ['wireless-headphone-commercial'],
    cta: {
      title: 'می‌خواهید ویدیوهای برندتان موشن گرافیک اختصاصی داشته باشند؟',
      subtitle: 'هویت بصری منحصربه‌فرد با انیمیشن‌های روان و استانداردهای روز بین‌المللی.',
      buttonText: 'مشاهده خدمات موشن دیزاین',
      link: '/services/motion-design',
    },
  },
  {
    id: 'res-cost-guide',
    slug: 'short-form-video-editing-cost-guide',
    title: 'هزینه ادیت ویدیوهای کوتاه چقدر است؟ راهنمای انتخاب پکیج مناسب',
    description: 'بررسی شفاف هزینه‌ها، تفاوت ادیتور فریلنسر با استودیو تخصصی و معیارهای ارزش‌گذاری تدوین ریلز و شورتس در سال ۲۰۲۶.',
    excerpt: 'تحلیل دقیق مدل‌های پرداخت ساعتی، پروژه‌ای و پکیج‌های ماهانه به همراه راهنمای تخمین بازگشت سرمایه تولید ویدیو.',
    publishDate: '2026-03-10',
    updatedDate: '2026-03-28',
    author: {
      name: 'حسام',
      role: 'بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
      avatar: '/mock/founder_hes.webp',
    },
    category: 'pricing-buying',
    tags: ['هزینه ادیت', 'قیمت تدوین ریلز', 'پکیج ماهانه', 'برون‌سپاری محتوا', 'بودجه‌بندی'],
    coverGradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fef3c7 100%)',
    readingTime: '۴ دقیقه مطالعه',
    searchIntent: {
      primaryIntent: 'commercial',
      secondaryIntents: ['informational'],
      audience: 'صاحبان کسب‌وکار، کریتورهای در حال مقیاس و بازاریابان محتوا',
      funnelStage: 'bottom',
      targetTopic: 'Short-form video editing cost and pricing guide',
    },
    tableOfContents: [
      { id: 'sec-pricing-factors', title: '۱. چه عواملی قیمت ادیت را تعیین می‌کنند؟' },
      { id: 'sec-pricing-models', title: '۲. مقایسه مدل‌های همکاری (تکی در برابر ماهانه)' },
      { id: 'sec-freelancer-vs-studio', title: '۳. فریلنسر ساعتی یا استودیوی متعهد؟' },
      { id: 'sec-roi-calc', title: '۴. محاسبه بازگشت سرمایه (ROI) تولید محتوا' },
    ],
    introduction: 'یکی از متداول‌ترین پرسش‌های تولیدکنندگان محتوا و مدیران برند این است: «برای تدوین ویدیوهای باکیفیت چقدر باید هزینه کنیم؟» قیمت‌ها در بازار از ارقام بسیار پایین تا تعرفه‌های سنگین متغیر است. در این راهنما، معیارهای شفاف ارزش‌گذاری ادیت تخصصی و نحوه انتخاب بهینه‌ترین پلن را شرح می‌دهیم.',
    sections: [
      {
        id: 'sec-pricing-factors',
        heading: '۱. چه عواملی قیمت ادیت را تعیین می‌کنند؟',
        paragraphs: [
          'قیمت ادیت تنها وابسته به طول ویدیو نیست، بلکه به حجم ارزش افزوده روی هر ثانیه بستگی دارد:',
          '• عمق راف‌کات و بازنویسی ساختار روایی',
          '• سطح ساند دیزاین و تعداد لایه‌های صوتی',
          '• سفارشی بودن گرافیک‌ها در برابر استفاده از قالب‌های آماده ارزان',
          '• سرعت تحویل تضمین‌شده (۲۴ تا ۴۸ ساعت)',
        ],
      },
      {
        id: 'sec-pricing-models',
        heading: '۲. مقایسه مدل‌های همکاری (تکی در برابر ماهانه)',
        paragraphs: [
          'همکاری پروژه‌ای برای تست اولیه یا کمپین‌های مقطعی مناسب است، اما برای حفظ حضور مداوم در الگوریتم، پکیج‌های منظم ماهانه (Retainer) هزینه تمام‌شده به ازای هر ویدیو را ۲۰ تا ۳۵ درصد کاهش می‌دهند.',
        ],
        table: {
          headers: ['پلن', 'تعداد ویدیو در ماه', 'سرعت تحویل', 'مناسب برای'],
          rows: [
            ['شروع (Starter)', '۴ ویدیو در ماه', '۷۲ ساعت', 'تست کیفیت و شروع انتشار هفتگی'],
            ['رشد (Growth)', '۱۲ ویدیو در ماه', '۴۸ ساعت', 'حضور جدی در الگوریتم (۳ ویدیو در هفته)'],
            ['استودیو (Studio)', '۲۰+ ویدیو در ماه', '۲۴-۴۸ ساعت', 'برندهای نیازمند انتشار روزانه و مقیاس'],
          ],
        },
      },
      {
        id: 'sec-freelancer-vs-studio',
        heading: '۳. فریلنسر ساعتی یا استودیوی متعهد؟',
        paragraphs: [
          'بزرگترین چالش همکاری با فریلنسرهای بی‌تجربه، نوسان کیفیت و ناپدید شدن در روزهای تحویل است. در استودیو حس‌لب، شما با یک فرآیند کاری شفاف، تعهد زمانی دقیق و هویت بصری یکپارچه برای تمام ویدیوها کار می‌کنید.',
        ],
        callout: 'شفافیت حس‌لب: بدون هزینه‌های پنهان، همراه با اصلاحات نامحدود منطقی تا رسیدن به نتیجه مطلوب شما.',
      },
    ],
    faq: [
      {
        question: 'آیا امکان سفارش یک ویدیوی آزمایشی وجود دارد؟',
        answer: 'بله، می‌توانید یک پروژه تکی سفارش دهید تا پیش از بستن پکیج ماهانه، کیفیت و هماهنگی کاری را ارزیابی کنید.',
      },
      {
        question: 'نحوه پرداخت چگونه است؟',
        answer: 'برای پروژه‌های تکی ۵۰٪ پیش‌پرداخت و ۵۰٪ پس از تایید نهایی خروجی دریافت می‌شود. برای پکیج‌های ماهانه در ابتدای هر دوره پرداخت صورت می‌گیرد.',
      },
    ],
    relatedServices: [
      { title: 'پکیج‌های منظم ماهانه', path: '/services/ongoing-content' },
      { title: 'تدوین شورتس و ریلز', path: '/services/short-form-video-editing' },
    ],
    relatedWorkSlugs: ['tokyo-24h-vlog', 'founder-routine-podcast'],
    cta: {
      title: 'می‌خواهید برآورد دقیق هزینه کانال یا برند خود را دریافت کنید؟',
      subtitle: 'هدف و تعداد ویدیوهای مد نظرتان را بگویید تا بهترین پلن را به شما پیشنهاد دهیم.',
      buttonText: 'دریافت پیش‌فاکتور شفاف',
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
