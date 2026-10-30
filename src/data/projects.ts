export interface ProjectItem {
  id: number;
  slug: string;
  category: 'vlog' | 'documentary' | 'podcast' | 'commercial' | 'educational' | '3d' | '3d-motion' | 'talking-head' | 'podcasts' | 'all';
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
    id: 103,
    slug: 'porsche-heritage-documentary',
    category: 'documentary',
    titleFa: 'داستان خلق پورشه: چگونه یک رویا افسانه ۹۱۱ را ساخت؟',
    titleEn: 'The Birth of Porsche: How Ferry Built the 911 Legend',
    creatorFa: 'مستند داستانی و بیوگرافی برند',
    creatorEn: 'Brand Documentary & Heritage',
    descriptionFa: 'مستند کوتاه داستانی درباره ماجرای تولد اولین پورشه توسط فری پورشه در اتریش، سیر تحول تاریخی پورشه ۹۱۱ و تلفیق تصویرسازی نقاشی آلپ با فوتیج‌های واقعی موزه.',
    descriptionEn: 'Narrative brand mini-documentary detailing Ferry Porsche’s vision, the engineering legacy of the 356 in Gmünd, and the timeless evolution of the 911 silhouette.',
    views: '۲.۷M',
    tag: 'Documentary',
    image: '/mock/work_porsche.webp',
    video: '/videos/video_porsche.mp4',
    durationSeconds: 60,
    durationIso: 'PT60S',
    aspectRatio: '9:16',
    resolution: '1080x1920 60FPS',
    uploadDate: '2026-03-05',
    workflowStepsFa: [
      'تصویرسازی دست‌کشیده و نقاشی‌های کوهستان آلپ',
      'گردآوری و بازسازی فوتیج‌های آرشیوی تاریخی پورشه',
      'طراحی صدای لایه‌ای، صدای موتور ۳۵۶ و امبیانس اتریش',
      'تایپوگرافی کلاسیک و ترنزیشن‌های انیمیت‌شده'
    ],
    workflowStepsEn: [
      'Hand-illustrated Alpine backdrop animation',
      'Archival historical footage restoration and parallax cutouts',
      'Authentic Porsche 356 exhaust note & spatial sound design',
      'Classic editorial typography and paper transitions'
    ],
    featuresFa: ['سبک مستند داستانی', 'تصویرسازی متحرک', 'طراحی صدای سینمایی', 'کپشن‌های کلاسیک'],
    featuresEn: ['Story Documentary', 'Motion Illustration', 'Cinematic Sound Design', 'Editorial Typography']
  },
  {
    id: 101,
    slug: '3d-elevator-simulation',
    category: '3d',
    titleFa: 'شبیه‌سازی سه‌بعدی سقوط آسانسور (سبک Zack D.)',
    titleEn: '3D Elevator Physics Simulation (Zack D. Style)',
    creatorFa: 'شبیه‌سازی علمی و انیمیشن سه‌بعدی',
    creatorEn: '3D Simulation & Scientific Animation',
    descriptionFa: 'شبیه‌سازی فیزیک سقوط آزاد آسانسور و عملکرد سیستم ترمز اضطراری با رندرینگ سه‌بعدی واقع‌گرایانه و طراحی صدای پرتعلیق.',
    descriptionEn: 'Physics-accurate 3D freefall simulation detailing the mechanics of safety brakes, styled after viral Zack D. scientific breakdowns.',
    views: '۳.۲M',
    tag: '3D Animation',
    image: '/mock/work_3d_1.webp',
    video: '/videos/video_3d_1.mp4',
    durationSeconds: 10,
    durationIso: 'PT10S',
    aspectRatio: '9:16',
    resolution: '1080x1920 60FPS',
    uploadDate: '2026-03-01',
    workflowStepsFa: [
      'مدل‌سازی سه‌بعدی چاه و کابین آسانسور',
      'انیمیت فیزیک برخورد و کابل‌ها',
      'طراحی صدای پرتنش سینمایی و زنگ هشدار',
      'رندرینگ با نورپردازی متالیک و دیتیل‌های صنعتی'
    ],
    workflowStepsEn: [
      '3D modeling of shaft and mechanical components',
      'Physics simulation of cable snap and braking response',
      'Suspenseful spatial audio and alarm sound design',
      'Photorealistic metallic lighting pass'
    ],
    featuresFa: ['رندرینگ 3D بلندر', 'شبیه‌سازی فیزیک', 'افکت‌های صوتی SFX سه‌بعدی', 'فرم 9:16 برای ریلز و شورتس'],
    featuresEn: ['3D Blender Simulation', 'Physics Dynamics', '3D Spatial SFX', '9:16 Vertical Optimization']
  },
  {
    id: 102,
    slug: '3d-product-showcase',
    category: '3d',
    titleFa: 'تیزر سینمایی پروداکت دیزاین و موشن سه‌بعدی',
    titleEn: 'Cinematic 3D Product Visual & Luxury Showcase',
    creatorFa: 'تیزر محصول و برندینگ لوکس',
    creatorEn: 'Commercial & Luxury 3D Visuals',
    descriptionFa: 'تیزر تجاری لوکس با جلوه‌های بصری خیره‌کننده، متریال‌های واقع‌گرایانه، نورپردازی استودیویی سینمایی و موسیقی اختصاصی.',
    descriptionEn: 'High-end commercial 3D animation featuring macro texture detail, luxury studio lighting, and synchronized cinematic scoring.',
    views: '۱.۹M',
    tag: '3D Motion',
    image: '/mock/work_3d_2.webp',
    video: '/videos/video_3d_2.mp4',
    durationSeconds: 30,
    durationIso: 'PT30S',
    aspectRatio: '16:9',
    resolution: '4K 60FPS',
    uploadDate: '2026-03-01',
    workflowStepsFa: [
      'نورپردازی استودیویی سه نقطه‌ای و رفلکشن‌های دقیق',
      'تکسچرینگ و متریال‌های PBR فوق باکیفیت',
      'کمرا موومنت‌های نرم و ماکرو سینمایی',
      'میکس و مسترینگ صدا با ترنزیشن‌های هوشمند'
    ],
    workflowStepsEn: [
      'Studio 3-point lighting setup with precise caustics',
      'Photorealistic PBR shader materials',
      'Smooth macro camera movements and depth of field',
      'Custom sound design and audio sync'
    ],
    featuresFa: ['کیفیت 4K', 'تکسچرینگ واقع‌گرایانه', 'نورپردازی استودیویی', 'طراحی صدای لایه‌ای'],
    featuresEn: ['4K Resolution', 'Photorealistic Textures', 'Studio Lighting', 'Layered Sound Design']
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): ProjectItem[] {
  return PROJECTS;
}
