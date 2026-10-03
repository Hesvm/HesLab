export type SoundWaveType = "sine" | "triangle" | "square" | "sawtooth";

export interface SoundToneSpec {
  hz: number;
  to?: number;
  ms: number;
  gain?: number;
  wave?: SoundWaveType;
  cut?: number;
  atk?: number;
  at?: number;
}

export interface SoundItemMeta {
  key: string;
  name: string;
  persianName: string;
  category: SoundCategoryKey;
  persianCategory: string;
  description: string;
  specs: SoundToneSpec[];
  hz: number;
  ms: number;
  wave: SoundWaveType;
  atk: number;
  cut: number | null;
  gain: number;
  bend: number;
}

export type SoundCategoryKey =
  | "Actions"
  | "Feedback"
  | "Navigation"
  | "Notifications"
  | "Selection"
  | "Movement"
  | "Progress"
  | "System";

export const SOUND_CATEGORIES: { key: SoundCategoryKey; labelFa: string; labelEn: string }[] = [
  { key: "Actions", labelFa: "کلیک و اکشن", labelEn: "Actions" },
  { key: "Feedback", labelFa: "فیدبک", labelEn: "Feedback" },
  { key: "Navigation", labelFa: "ناوبری", labelEn: "Navigation" },
  { key: "Notifications", labelFa: "اعلان", labelEn: "Notifications" },
  { key: "Selection", labelFa: "انتخاب", labelEn: "Selection" },
  { key: "Movement", labelFa: "حرکت", labelEn: "Movement" },
  { key: "Progress", labelFa: "لودینگ", labelEn: "Progress" },
  { key: "System", labelFa: "سیستم", labelEn: "System" },
];

export const RAW_SOUND_SPECS: Record<string, SoundToneSpec[]> = {
  whisk: [{ hz: 124, to: 65, ms: 130, gain: 0.067, wave: "sine", cut: 560, atk: 50 }],
  drag: [{ hz: 174, to: 155, ms: 250, gain: 0.034, wave: "sine", cut: 640, atk: 28 }],
  off: [{ hz: 330, to: 247, ms: 88, gain: 0.03, wave: "sine", cut: 720, atk: 8 }],
  lift: [{ hz: 660, to: 720, ms: 38, gain: 0.028, wave: "sine" }],
  sigh: [{ hz: 262, to: 131, ms: 28, gain: 0.065, wave: "triangle", cut: 1700, atk: 8 }],
  perk: [{ hz: 330, ms: 360, gain: 0.053, wave: "sine", cut: 560, atk: 90 }],
  purr: [{ hz: 92, ms: 350, gain: 0.046, wave: "triangle", cut: 1100, atk: 32 }],
  lull: [{ hz: 234, ms: 214, gain: 0.054, wave: "sine", cut: 820, atk: 8 }],
  buzz: [{ hz: 344, to: 239, ms: 24, gain: 0.048, wave: "triangle", cut: 1100, atk: 7 }],
  deny: [{ hz: 208, to: 165, ms: 120, gain: 0.03, wave: "sine", cut: 520, atk: 10 }],
  float: [{ hz: 262, ms: 322, gain: 0.052, wave: "sine", cut: 820, atk: 16 }],
  glide: [{ hz: 397, to: 276, ms: 205, gain: 0.065, wave: "sine", cut: 820, atk: 90 }],
  step: [{ hz: 227, to: 114, ms: 311, gain: 0.051, wave: "sine", cut: 820, atk: 90 }],
  wander: [{ hz: 315, ms: 326, gain: 0.061, wave: "sine", cut: 820, atk: 7 }],
  click: [{ hz: 196, to: 130, ms: 150, gain: 0.07, wave: "sine", cut: 900 }],
  latch: [{ hz: 256, ms: 90, gain: 0.058, wave: "square", cut: 2400, atk: 10 }],
  hail: [{ hz: 392, ms: 360, gain: 0.051, wave: "sine", cut: 560, atk: 90 }],
  drape: [{ hz: 220, ms: 215, gain: 0.059, wave: "sine", cut: 560, atk: 8 }],
  boot: [{ hz: 291, ms: 360, gain: 0.043, wave: "sine", cut: 560, atk: 90 }],
  drone: [{ hz: 115, ms: 294, gain: 0.068, wave: "sine", cut: 560, atk: 72 }],
  pick: [{ hz: 245, ms: 41, gain: 0.044, wave: "square", cut: 2400, atk: 6 }],
  waft: [{ hz: 344, ms: 345, gain: 0.046, wave: "triangle", cut: 1100, atk: 61 }],
  slink: [{ hz: 212, ms: 345, gain: 0.05, wave: "triangle", cut: 1100, atk: 26 }],
  wake: [{ hz: 262, ms: 360, gain: 0.044, wave: "sine", cut: 560, atk: 90 }],
  cog: [{ hz: 408, ms: 24, gain: 0.061, wave: "sine", cut: 1100, atk: 10 }],
  pat: [{ hz: 230, ms: 60, gain: 0.036, wave: "triangle", cut: 1700, atk: 10 }],
  knock: [{ hz: 330, ms: 32, gain: 0.046, wave: "triangle", cut: 1100, atk: 7 }],
  hum: [{ hz: 196, ms: 302, gain: 0.061, wave: "sine", cut: 560, atk: 90 }],
  jab: [{ hz: 259, ms: 33, gain: 0.049, wave: "square", cut: 2400, atk: 6 }],
  groan: [{ hz: 394, to: 262, ms: 42, gain: 0.047, wave: "sine", cut: 1100, atk: 6 }],
  chime: [{ hz: 220, ms: 271, gain: 0.046, wave: "sine", cut: 820, atk: 90 }],
  shift: [{ hz: 294, to: 147, ms: 360, gain: 0.053, wave: "sine", cut: 560, atk: 90 }],
  idle: [{ hz: 131, to: 65, ms: 360, gain: 0.055, wave: "triangle", cut: 1700, atk: 90 }],
  cuff: [{ hz: 248, ms: 31, gain: 0.061, wave: "triangle", cut: 1700, atk: 6 }],
  check: [{ hz: 370, ms: 90, gain: 0.055, wave: "square", cut: 2400, atk: 10 }],
  vault: [{ hz: 218, to: 110, ms: 352, gain: 0.042, wave: "sine", cut: 820, atk: 10 }],
  mark: [{ hz: 280, ms: 20, gain: 0.035, wave: "square", cut: 2400, atk: 6 }],
  pop: [{ hz: 680, to: 930, ms: 34, gain: 0.05, wave: "sine", atk: 3 }],
  dab: [{ hz: 233, ms: 32, gain: 0.046, wave: "triangle", cut: 1700, atk: 10 }],
  snub: [{ hz: 344, to: 197, ms: 23, gain: 0.049, wave: "triangle", cut: 1100, atk: 7 }],
  punt: [{ hz: 200, ms: 90, gain: 0.063, wave: "sine", cut: 560, atk: 10 }],
  land: [{ hz: 262, to: 247, ms: 320, gain: 0.036, wave: "sine", cut: 920, atk: 30 }],
  rise: [{ hz: 394, to: 612, ms: 360, gain: 0.057, wave: "triangle", cut: 1700, atk: 13 }],
  stub: [{ hz: 224, ms: 34, gain: 0.059, wave: "triangle", cut: 1700, atk: 10 }],
  chop: [{ hz: 315, ms: 56, gain: 0.065, wave: "triangle", cut: 1100, atk: 10 }],
  press: [{ hz: 168, ms: 95, gain: 0.028, wave: "sine", cut: 480, atk: 14 }],
  thump: [{ hz: 253, ms: 20, gain: 0.028, wave: "triangle", cut: 1700, atk: 6 }],
  arc: [{ hz: 380, to: 193, ms: 184, gain: 0.052, wave: "triangle", cut: 1700, atk: 82 }],
  climb: [{ hz: 220, ms: 144, gain: 0.046, wave: "sine", cut: 820, atk: 60 }],
  peck: [{ hz: 283, ms: 90, gain: 0.07, wave: "triangle", cut: 1100, atk: 6 }],
  pulse: [{ hz: 109, ms: 284, gain: 0.055, wave: "triangle", cut: 1100, atk: 90 }],
  knell: [{ hz: 234, ms: 360, gain: 0.05, wave: "triangle", cut: 1700, atk: 90 }],
  crest: [{ hz: 344, ms: 147, gain: 0.042, wave: "square", cut: 2400, atk: 55 }],
  bop: [{ hz: 210, ms: 20, gain: 0.063, wave: "sine", cut: 1100, atk: 6 }],
  trail: [{ hz: 262, ms: 360, gain: 0.036, wave: "triangle", cut: 1700, atk: 17 }],
  creep: [{ hz: 405, ms: 332, gain: 0.055, wave: "sine", cut: 560, atk: 32 }],
  notch: [{ hz: 230, ms: 49, gain: 0.048, wave: "sine", cut: 820, atk: 6 }],
  pin: [{ hz: 329, ms: 37, gain: 0.059, wave: "triangle", cut: 1100, atk: 6 }],
  drop: [{ hz: 196, to: 130, ms: 150, gain: 0.07, wave: "sine", cut: 900 }],
  sweep: [{ hz: 256, to: 230, ms: 263, gain: 0.055, wave: "square", cut: 2400, atk: 6 }],
  prod: [{ hz: 393, ms: 20, gain: 0.066, wave: "triangle", cut: 1700, atk: 6 }],
  ferry: [{ hz: 220, to: 110, ms: 260, gain: 0.064, wave: "sine", cut: 820, atk: 6 }],
  stride: [{ hz: 294, to: 147, ms: 350, gain: 0.05, wave: "triangle", cut: 1100, atk: 86 }],
  swim: [{ hz: 124, ms: 175, gain: 0.049, wave: "triangle", cut: 1700, atk: 64 }],
  fill: [{ hz: 245, ms: 169, gain: 0.043, wave: "triangle", cut: 1100, atk: 83 }],
  bell: [{ hz: 366, ms: 319, gain: 0.041, wave: "sine", cut: 560, atk: 90 }],
  swoop: [{ hz: 214, to: 124, ms: 241, gain: 0.065, wave: "sine", cut: 560, atk: 90 }],
  tone: [{ hz: 276, ms: 300, gain: 0.052, wave: "sine", cut: 820, atk: 90 }],
  sway: [{ hz: 408, ms: 217, gain: 0.054, wave: "triangle", cut: 1100, atk: 7 }],
  hover: [{ hz: 232, ms: 360, gain: 0.038, wave: "sine", cut: 560, atk: 66 }],
  flick: [{ hz: 333, ms: 25, gain: 0.045, wave: "triangle", cut: 1100, atk: 9 }],
  expand: [
    { hz: 196, to: 174, ms: 360, gain: 0.042, wave: "sine", cut: 880, atk: 36 },
    { hz: 294, to: 262, ms: 300, gain: 0.014, wave: "sine", cut: 1100, atk: 48, at: 24 },
  ],
  skim: [{ hz: 261, ms: 360, gain: 0.039, wave: "sine", cut: 560, atk: 74 }],
  roam: [{ hz: 394, ms: 360, gain: 0.058, wave: "triangle", cut: 1100, atk: 18 }],
  portal: [{ hz: 220, to: 110, ms: 286, gain: 0.053, wave: "triangle", cut: 1100, atk: 90 }],
  slide: [{ hz: 309, ms: 325, gain: 0.054, wave: "sine", cut: 820, atk: 48 }],
  cross: [{ hz: 155, to: 78, ms: 235, gain: 0.059, wave: "sine", cut: 820, atk: 14 }],
  tock: [{ hz: 250, ms: 28, gain: 0.045, wave: "triangle", cut: 1700, atk: 10 }],
  poke: [{ hz: 380, ms: 20, gain: 0.047, wave: "triangle", cut: 1700, atk: 5 }],
  tamp: [{ hz: 220, ms: 90, gain: 0.052, wave: "triangle", cut: 1700, atk: 10 }],
  grip: [{ hz: 282, ms: 33, gain: 0.064, wave: "sine", cut: 1100, atk: 9 }],
};

export const RAW_SOUND_META: Record<string, { cat: SoundCategoryKey; name: string; nameFa: string; descFa: string }> = {
  whisk: { cat: "Navigation", name: "Whisk", nameFa: "ویسک (گذر نرم)", descFa: "صدای ملایم و سریع برای گذر یا جابجایی بین بخش‌ها." },
  drag: { cat: "Movement", name: "Drift", nameFa: "دریفت (کشیدن)", descFa: "صدای بم و کنترل‌شده هنگام کشیدن و جابجایی عناصر." },
  off: { cat: "System", name: "Hush", nameFa: "خاموشی (هوش)", descFa: "صدای بسته شدن، غیرفعال کردن یا دی‌اکتیو شدن وضعیت." },
  lift: { cat: "Movement", name: "Wisp", nameFa: "ویسپ (بلند کردن)", descFa: "صدای سبک و صعودی هنگام بلند کردن المان‌ها با درگ." },
  sigh: { cat: "Feedback", name: "Sigh", nameFa: "نفس عمیق (سای)", descFa: "بازخورد ملایم هنگام پایان یک عملیات یا ریست." },
  perk: { cat: "Notifications", name: "Perk", nameFa: "پرک (توجه)", descFa: "تن روشن برای جلب توجه کاربر و اعلام رخداد." },
  purr: { cat: "System", name: "Purr", nameFa: "پور (لرزش ملایم)", descFa: "طنین ملایم فرکانس پایین برای استیت‌های پس‌زمینه." },
  lull: { cat: "Movement", name: "Lull", nameFa: "لال (آرامش)", descFa: "فرود نرم و آرامش‌بخش برای انیمیشن‌های روان." },
  buzz: { cat: "Feedback", name: "Buzz", nameFa: "باز (وزوز خطا)", descFa: "هشدار سریع لرزشی برای خطای فیلد یا دکمه نامعتبر." },
  deny: { cat: "Feedback", name: "Bump", nameFa: "بامپ (ضربه رد)", descFa: "بازخورد فیزیکی برخورد یا مجاز نبودن اقدام." },
  float: { cat: "Movement", name: "Float", nameFa: "فلوت (شناور)", descFa: "حس غوطه‌وری و شناوری برای المان‌های معلق." },
  glide: { cat: "Navigation", name: "Glide", nameFa: "گلاید (سر خوردن)", descFa: "حرکت کشویی و نرم برای تب‌ها و اسلایدرها." },
  step: { cat: "Navigation", name: "Step", nameFa: "استپ (گام)", descFa: "گام‌های پیشروی در استپرها و ویزاردها." },
  wander: { cat: "Movement", name: "Wander", nameFa: "واندر (پرسه)", descFa: "تن متغیر برای مسیرهای جابجایی طولانی‌تر." },
  click: { cat: "Selection", name: "Tick", nameFa: "تیک (کلیک)", descFa: "کلیک دقیق و سبک برای دکمه‌ها و چک‌باکس‌ها." },
  latch: { cat: "Selection", name: "Latch", nameFa: "لچ (زبانه قفل)", descFa: "صدای قفل شدن تاگل سوئیچ‌ها و فیلترها." },
  hail: { cat: "Notifications", name: "Hail", nameFa: "هیل (سلام)", descFa: "اعلان ورودی برای پیام جدید یا رخداد موفق." },
  drape: { cat: "Movement", name: "Drape", nameFa: "دریپ (پرده)", descFa: "باز شدن منوهای دراپ‌داون و لایه‌های رویی." },
  boot: { cat: "System", name: "Boot", nameFa: "بوت (راه‌اندازی)", descFa: "صدای شروع به کار یا اتصال موفق اولیه." },
  drone: { cat: "System", name: "Drone", nameFa: "درون (طنین ممتد)", descFa: "حس قدرت و پایداری در لایه سیستم." },
  pick: { cat: "Selection", name: "Pick", nameFa: "پیک (انتخاب)", descFa: "انتخاب سریع آیتم از منو یا سلکتور." },
  waft: { cat: "Movement", name: "Waft", nameFa: "وافت (نسیم)", descFa: "حرکت هوایی و سبک با هارمونی‌های مثلثی." },
  slink: { cat: "Movement", name: "Slink", nameFa: "اسلینک (خزش نرم)", descFa: "جابجایی بسیار نرم و بی‌صدا در پس‌زمینه." },
  wake: { cat: "System", name: "Wake", nameFa: "ویک (بیداری)", descFa: "خروج سیستم از حالت استندبای و آماده‌باش." },
  cog: { cat: "Selection", name: "Cog", nameFa: "کاگ (دنده)", descFa: "تغییر مقدار در سلکتورها و ویل‌های انتخاب." },
  pat: { cat: "Actions", name: "Pat", nameFa: "پت (نوازش)", descFa: "ضربه کوتاه ملایم روی کارت‌ها." },
  knock: { cat: "Actions", name: "Knock", nameFa: "ناک (کوبش)", descFa: "کوبش ملایم با فیلتر لایو برای دکمه‌های اصلی." },
  hum: { cat: "System", name: "Hum", nameFa: "هام (زمزمه)", descFa: "حس جریان داده و پردازش در سیستم." },
  jab: { cat: "Actions", name: "Jab", nameFa: "جب (ضربه چابک)", descFa: "کلیک مربعی پرانرژی برای اکشن‌های سریع." },
  groan: { cat: "Feedback", name: "Groan", nameFa: "گرون (ناله بم)", descFa: "فرود بم در فرکانس برای اخطار یا بازگشت به عقب." },
  chime: { cat: "Notifications", name: "Chime", nameFa: "چایم (زنگ)", descFa: "زنگ گوش‌نواز دو‌نتی برای پیام‌ها و هشدارها." },
  shift: { cat: "Navigation", name: "Shift", nameFa: "شیفت (تغییر فاز)", descFa: "تغییر نما یا انتقال بین صفحات اصلی." },
  idle: { cat: "System", name: "Idle", nameFa: "آیدل (استراحت)", descFa: "افت فرکانسی برای ورود به وضعیت بیکار." },
  cuff: { cat: "Actions", name: "Cuff", nameFa: "کاف (تکانه)", descFa: "تکانه ضربه‌ای کوتاه و شفاف." },
  check: { cat: "Selection", name: "Check", nameFa: "چک (تایید)", descFa: "تایید چک‌باکس با موج مربعی شاداب." },
  vault: { cat: "Navigation", name: "Vault", nameFa: "والت (پرش)", descFa: "پرش عمیق و قوسی به عمق ساختار." },
  mark: { cat: "Selection", name: "Mark", nameFa: "مارک (نشان)", descFa: "علامت‌گذاری فوق سریع در ۲۰ میلی‌ثانیه." },
  pop: { cat: "Notifications", name: "Pip", nameFa: "پیپ (پاپ)", descFa: "پاپ صعودی هیجان‌انگیز برای لایک و اکشن‌های شاداب." },
  dab: { cat: "Actions", name: "Dab", nameFa: "دب (لمس سبک)", descFa: "لمس سریع و بی‌وزن در منوهای تاچ." },
  snub: { cat: "Feedback", name: "Snub", nameFa: "اسناب (رد کوتاه)", descFa: "رد کوتاه با شیب منفی سریع." },
  punt: { cat: "Actions", name: "Punt", nameFa: "پانت (پرتاب)", descFa: "ارسال فرم، پیام یا پرتاب المان به صفحه." },
  land: { cat: "Progress", name: "Settle", nameFa: "ستل (نشستن)", descFa: "فرود المان در جایگاه نهایی و اتمام انیمیشن." },
  rise: { cat: "Progress", name: "Rise", nameFa: "رایز (خیزش)", descFa: "افزایش درصد پیشرفت یا رسیدن به لول بالاتر." },
  stub: { cat: "Actions", name: "Stub", nameFa: "استاب (اصابت)", descFa: "برخورد کوتاه با لبه اسکرول یا کانتینر." },
  chop: { cat: "Actions", name: "Chop", nameFa: "چاپ (برش تیز)", descFa: "برش یا حذف یک آیتم از لیست." },
  press: { cat: "Actions", name: "Tap", nameFa: "تپ (فشار دکمه)", descFa: "تپ عمیق سینوسی برای دکمه‌های فشاری." },
  thump: { cat: "Actions", name: "Thump", nameFa: "ثامپ (کوبش خفه)", descFa: "کوبش کوتاه با بافت مثلثی." },
  arc: { cat: "Navigation", name: "Arc", nameFa: "آرک (کمان)", descFa: "قوس حرکتی نرم با تاخیر اتک بلند." },
  climb: { cat: "Progress", name: "Climb", nameFa: "کلایم (صعود)", descFa: "بالا رفتن پله‌ای در لودرها و پیشرفت." },
  peck: { cat: "Actions", name: "Peck", nameFa: "پک (نوک زدن)", descFa: "ضربه ریتمیک شبیه تایپ روی کیبورد." },
  pulse: { cat: "System", name: "Pulse", nameFa: "پالس (نبض)", descFa: "نبض عمیق فرکانس پایین برای استیت پردازش." },
  knell: { cat: "Notifications", name: "Knell", nameFa: "نل (ناقوس)", descFa: "طنین ممتد ناقوس‌وار برای رویدادهای ویژه." },
  crest: { cat: "Progress", name: "Crest", nameFa: "کرست (اوج موج)", descFa: "رسیدن به ۱۰۰٪ یا قله یک فرآیند." },
  bop: { cat: "Actions", name: "Bop", nameFa: "باپ (جهش)", descFa: "جهش کوتاه پرانرژی برای آواتارها و آیکون‌ها." },
  trail: { cat: "Movement", name: "Trail", nameFa: "تریل (ردپا)", descFa: "رد حرکت ماوس یا کشیدن اسلایدر." },
  creep: { cat: "Movement", name: "Creep", nameFa: "کریپ (پاورچین)", descFa: "فرکانس بالای نرم با نوسان ملایم." },
  notch: { cat: "Selection", name: "Notch", nameFa: "ناچ (شیار)", descFa: "گیر کردن اسلایدر در شیارها و پله‌ها." },
  pin: { cat: "Selection", name: "Pin", nameFa: "پین (سنجاق)", descFa: "پین کردن یا قفل کردن تب و استیکر." },
  drop: { cat: "Actions", name: "Thud", nameFa: "ثاد (افتادن سنگین)", descFa: "رها شدن و افتادن کارت در لیست مقصد." },
  sweep: { cat: "Navigation", name: "Sweep", nameFa: "سویپ (جاروب)", descFa: "سوایپ و پاک کردن ردیف‌های جدول." },
  prod: { cat: "Actions", name: "Prod", nameFa: "پراد (سیخونک)", descFa: "ضربه فوق‌سریع ۲۰ میلی‌ثانیه‌ای با فرکانس بالا." },
  ferry: { cat: "Navigation", name: "Ferry", nameFa: "فری (انتقال)", descFa: "افت فرکانس پیوسته شبیه فرود آمدن لایه." },
  stride: { cat: "Navigation", name: "Stride", nameFa: "استراید (گام بلند)", descFa: "گام‌های کشیده در انتقال فریم‌ها." },
  swim: { cat: "Movement", name: "Swim", nameFa: "سوییم (شنا)", descFa: "نوسان زیرآبی و عمیق در لایه‌های محتوا." },
  fill: { cat: "Progress", name: "Fill", nameFa: "فیل (پر شدن)", descFa: "پر شدن ظرفیت بافر یا نوار پیشرفت." },
  bell: { cat: "Notifications", name: "Bell", nameFa: "بل (ناقوس روشن)", descFa: "ناقوس زلال ۳۶۶ هرتزی با ماندگاری بالا." },
  swoop: { cat: "Navigation", name: "Swoop", nameFa: "سوپ (فرود سریع)", descFa: "فرود سریع از بالا به پایین با افکت دوپلر." },
  tone: { cat: "Notifications", name: "Tone", nameFa: "تون (تن خالص)", descFa: "تن استاندارد با فرکانس ۲۷۶ هرتز." },
  sway: { cat: "Movement", name: "Sway", nameFa: "سوِی (تاب خوردن)", descFa: "نوسان پاندولی عناصر رابط کاربری." },
  hover: { cat: "Movement", name: "Hover", nameFa: "هاور (شناوری)", descFa: "هاور نرم روی کارت‌ها و تصاویر." },
  flick: { cat: "Actions", name: "Flick", nameFa: "فلیک (تلنگر)", descFa: "تلنگر ناگهانی و کوتاه ۲۵ میلی‌ثانیه‌ای." },
  expand: { cat: "Navigation", name: "Bloom", nameFa: "بلوم (شکوفایی)", descFa: "آکورد دو‌صدایی ترکیبی برای اکسپند شدن مودال و منو." },
  skim: { cat: "Movement", name: "Skim", nameFa: "اسکیم (پرواز سطحی)", descFa: "حرکت سریع ماوس روی المان‌های گرید." },
  roam: { cat: "Movement", name: "Roam", nameFa: "روم (گشت)", descFa: "کاوش آزادانه در نقشه یا کنواس." },
  portal: { cat: "Navigation", name: "Portal", nameFa: "پورتال (درگاه)", descFa: "ورود به یک مد یا فضای کاری جدید." },
  slide: { cat: "Movement", name: "Slide", nameFa: "اسلاید (لغزش)", descFa: "لغزش روان المان‌ها روی سطح شیشه‌ای." },
  cross: { cat: "Navigation", name: "Cross", nameFa: "کراس (تقاطع)", descFa: "بسته شدن یا ضربدر زدن پنجره‌ها." },
  tock: { cat: "Actions", name: "Tock", nameFa: "تاک (ساعت)", descFa: "تاک دوم کلیک ساعت و تایمر." },
  poke: { cat: "Actions", name: "Poke", nameFa: "پوک (نوک تیز)", descFa: "ضربه سوزنی و دقیق ۳۸۰ هرتز." },
  tamp: { cat: "Actions", name: "Tamp", nameFa: "تمپ (کوبش یکنواخت)", descFa: "تثبیت و کوبیدن یکنواخت داده‌ها." },
  grip: { cat: "Selection", name: "Grip", nameFa: "گریپ (گرفتن محکم)", descFa: "گرفتن هندل درگ و ری‌سایز." },
};

export const SOUND_KEYS = Object.keys(RAW_SOUND_SPECS);

export const ALL_SOUND_ITEMS: SoundItemMeta[] = SOUND_KEYS.map((key) => {
  const specs = RAW_SOUND_SPECS[key];
  const meta = RAW_SOUND_META[key] ?? {
    cat: "Actions" as SoundCategoryKey,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    nameFa: key,
    descFa: "",
  };
  const first = specs[0];
  const maxMs = Math.max(...specs.map((s) => (s.at ?? 0) + s.ms));
  const maxGain = Math.max(...specs.map((s) => s.gain ?? 0.05));
  const bend = ((first.to ?? first.hz) - first.hz) / first.hz;

  return {
    key,
    name: meta.name,
    persianName: meta.nameFa,
    category: meta.cat,
    persianCategory: SOUND_CATEGORIES.find((c) => c.key === meta.cat)?.labelFa ?? meta.cat,
    description: meta.descFa,
    specs,
    hz: first.hz,
    ms: maxMs,
    wave: first.wave ?? "sine",
    atk: first.atk ?? 4,
    cut: first.cut ?? null,
    gain: maxGain,
    bend,
  };
});

// --- AUDIO SYNTH ENGINE ---
let sharedAudioCtx: AudioContext | null = null;
let audioUnlocked = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    if (!audioUnlocked && sharedAudioCtx) {
      audioUnlocked = true;
      try {
        const buffer = sharedAudioCtx.createBuffer(1, 1, sharedAudioCtx.sampleRate);
        const source = sharedAudioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(sharedAudioCtx.destination);
        source.start(0);
      } catch {}
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

let isMuted = false;
if (typeof window !== "undefined") {
  try {
    isMuted = localStorage.getItem("vibekit-sound-muted") === "true";
  } catch {}
}

export function getSoundMuted(): boolean {
  return isMuted;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem("vibekit-sound-muted", String(muted));
  } catch {}
}

export function playBenchoSound(voiceKey: string, options?: { pitch?: number; gain?: number; delay?: number }) {
  if (isMuted) return;
  const specs = RAW_SOUND_SPECS[voiceKey];
  if (!specs) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const pitchMultiplier = options?.pitch ?? 1;
  const gainMultiplier = options?.gain ?? 1;
  const startTime = ctx.currentTime + (options?.delay ?? 0);

  renderSpecsToContext(ctx, specs, pitchMultiplier, startTime, gainMultiplier);
}

export function playBenchoBlend(voiceKeys: string[], options?: { pitch?: number; gain?: number }) {
  if (isMuted) return;
  if (!voiceKeys.length) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const pitchMultiplier = options?.pitch ?? 1;
  const gainMultiplier = options?.gain ?? 1;
  const startTime = ctx.currentTime;

  voiceKeys.forEach((key) => {
    const specs = RAW_SOUND_SPECS[key];
    if (specs) {
      renderSpecsToContext(ctx, specs, pitchMultiplier, startTime, gainMultiplier);
    }
  });
}

function renderSpecsToContext(
  ctx: BaseAudioContext,
  specs: SoundToneSpec[],
  pitch: number,
  startTime: number,
  gainMul: number
) {
  for (const spec of specs) {
    const start = startTime + (spec.at ?? 0) / 1000;
    const end = start + spec.ms / 1000;
    const osc = ctx.createOscillator();
    osc.type = spec.wave ?? "sine";
    osc.frequency.setValueAtTime(spec.hz * pitch, start);
    if (spec.to) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(10, spec.to * pitch), end);
    }

    const gainNode = ctx.createGain();
    const attackDuration = Math.min((spec.atk ?? 4) / 1000, (spec.ms / 1000) * 0.6);
    const targetGain = (spec.gain ?? 0.05) * gainMul;

    gainNode.gain.setValueAtTime(0.0001, start);
    gainNode.gain.exponentialRampToValueAtTime(targetGain, start + attackDuration);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, end);

    let node: AudioNode = osc;
    if (spec.cut) {
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = spec.cut;
      osc.connect(filter);
      node = filter;
    }

    node.connect(gainNode).connect(ctx.destination);
    osc.start(start);
    osc.stop(end + 0.03);
  }
}

// --- COLOR & ORB GENERATOR HELPERS ---
function calculateHues(): Record<string, number> {
  const tuples = SOUND_KEYS.map((k) => {
    const s = RAW_SOUND_SPECS[k][0];
    return `${s.hz}:${s.ms}`;
  });
  const unique = [...new Set(tuples)].sort((a, b) => {
    const [hzA, msA] = a.split(":").map(Number);
    const [hzB, msB] = b.split(":").map(Number);
    return hzA - hzB || msA - msB;
  });
  const maxIdx = Math.max(1, unique.length - 1);
  const result: Record<string, number> = {};
  SOUND_KEYS.forEach((key) => {
    const s = RAW_SOUND_SPECS[key][0];
    const tuple = `${s.hz}:${s.ms}`;
    const idx = unique.indexOf(tuple);
    result[key] = Math.round(14 + (idx / maxIdx) * 300);
  });
  return result;
}

export const SOUND_HUES = calculateHues();

function hslToHex(h: number, s: number, l: number): string {
  const normS = s / 100;
  const normL = l / 100;
  const k = (normS * Math.min(normL, 1 - normL));
  const f = (n: number) => {
    const i = (n + (h % 360 + 360) / 30) % 12;
    const val = normL - k * Math.max(-1, Math.min(i - 3, 9 - i, 1));
    return Math.round(255 * val).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function getSoundPalette(hue: number): string[] {
  return [
    hslToHex(hue, 88, 64),
    hslToHex(hue + 34, 84, 58),
    hslToHex(hue - 20, 90, 68),
  ];
}

// Pseudo-random generator with seed
function makePrng(seed: number) {
  let s = seed;
  return () => {
    s += 1831565813;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 2146121005) >>> 0;
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 2221713035) >>> 0;
  hash ^= hash >>> 16;
  return hash >>> 0;
}

export function drawMeshGradient(
  ctx: CanvasRenderingContext2D,
  seedStr: string,
  size: number,
  palette: string[]
) {
  const seed = hashString(seedStr);
  const rng = makePrng(seed * 12345);
  const bg = palette[0] + "FF";
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  const numBlobs = 8 + Math.floor(rng() * 5);
  const blobs: { x: number; y: number; radius: number; color: string }[] = [];

  for (let i = 0; i < numBlobs; i++) {
    const angle = rng() * Math.PI * 2;
    const dist = rng() * size * 0.4;
    const cx = size / 2 + Math.cos(angle) * dist;
    const cy = size / 2 + Math.sin(angle) * dist;
    blobs.push({
      x: cx + (rng() - 0.5) * size * 0.3,
      y: cy + (rng() - 0.5) * size * 0.3,
      radius: size * (0.3 + rng() * 0.4),
      color: palette[i % palette.length],
    });
  }

  blobs.sort((a, b) => b.radius - a.radius);

  ctx.globalCompositeOperation = "source-over";

  for (const blob of blobs) {
    const rad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
    rad.addColorStop(0, blob.color + "FF");
    rad.addColorStop(0.3, blob.color + "DD");
    rad.addColorStop(0.6, blob.color + "88");
    rad.addColorStop(1, blob.color + "00");
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, size, size);
  }

  const gx = size * 0.3 + rng() * size * 0.2;
  const gy = size * 0.3 + rng() * size * 0.2;
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, size * 0.3);
  glow.addColorStop(0, "rgba(255,255,255,0.2)");
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
}

// --- WAV FILE EXPORT ---
export async function generateWavBlob(voiceKeys: string[]): Promise<Blob | null> {
  if (typeof window === "undefined" || !voiceKeys.length) return null;
  const OfflineCtx = window.OfflineAudioContext || (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;
  if (!OfflineCtx) return null;

  const sampleRate = 44100;
  const specs = voiceKeys.flatMap((k) => RAW_SOUND_SPECS[k] ?? []);
  if (!specs.length) return null;

  const totalMs = specs.reduce((acc, s) => Math.max(acc, (s.at ?? 0) + s.ms), 0);
  const lengthFrames = Math.ceil(((totalMs / 1000) + 0.05) * sampleRate);

  const offline = new OfflineCtx(1, lengthFrames, sampleRate);
  renderSpecsToContext(offline, specs, 1, 0, 1);
  const renderedBuffer = await offline.startRendering();
  const channelData = renderedBuffer.getChannelData(0);

  const numSamples = channelData.length;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true); // 16-bit
  writeString(36, "data");
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, channelData[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([buffer], { type: "audio/wav" });
}

export function downloadSoundWav(voiceKeys: string[]) {
  generateWavBlob(voiceKeys).then((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vibe-sound-${voiceKeys.join("-")}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}
