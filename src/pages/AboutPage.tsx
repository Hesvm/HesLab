import { FC } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { generatePersonSchema, generateOrganizationSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { ServiceSection } from '../components/service-article/ServiceArticleBlocks';
import { Callout, CTACard, PullQuote } from '../components/service-article/ArticleBlocks';

type Chapter = { emoji: string; title: string; text: string };

type Tool = {
  name: string;
  note?: { en: string; fa: string };
  /** Official full-color logo file. */
  image?: string;
  /** Official single-color glyph, drawn in its brand color. */
  glyph?: string;
  color?: string;
};

const TOOLS: Tool[] = [
  { name: 'HesLab Studio', image: '/emojis/camel.png' },
  { name: 'Claude', image: '/tools/claude-color.svg' },
  { name: 'After Effects', image: '/stats-icons/after-effects.svg' },
  { name: 'Figma', image: '/tools/figma-color.svg' },
  { name: 'Apple Music', glyph: '/tools/applemusic.svg', color: '#FA243C' },
  { name: 'Savee', note: { en: 'inspiration', fa: 'الهام' }, image: '/tools/savee.ico' },
  { name: 'YouTube', glyph: '/tools/youtube.svg', color: '#FF0000' },
];

const ToolIcon: FC<{ tool: Tool }> = ({ tool }) => {
  if (tool.image) return <img src={tool.image} alt="" className="h-5 w-5 rounded-[5px] object-contain" />;
  return (
    <span
      className="h-5 w-5"
      style={{
        background: tool.color,
        WebkitMaskImage: `url(${tool.glyph})`,
        maskImage: `url(${tool.glyph})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
};

const COPY = {
  en: {
    seoTitle: 'About HesLab | Independent Video Editing & Motion Studio',
    seoDesc:
      'Learn about HesLab: an independent video editing and motion design studio founded by Hesam, dedicated to high-retention creator workflows.',
    h1: "Hi, I'm Hesam. I turn footage into stories.",
    intro:
      "HesLab is my independent video studio, crafting short videos that respect the viewer's time and attention.",
    photoAlt: 'Hesam, founder and lead editor of HesLab',
    cards: [
      { emoji: 'clapper_board', title: 'Why HesLab exists', text: "Short videos shouldn't look like cheap templates. Editing should mirror each creator's voice." },
      { emoji: 'eyes', title: 'Attention is borrowed', text: 'Viewers lend you a few seconds. Everything on screen has to earn them.' },
      { emoji: 'speaker', title: 'Sound is half the film', text: 'Layered sound is what makes a rushed edit feel finished.' },
      { emoji: 'calendar', title: 'A calm way to work', text: 'No endless meetings. A clear timeline and notes right on the video.' },
    ] as Chapter[],
    quote: 'Every creator has a voice. Editing should make it louder, not different.',
    howTitle: 'How a project goes',
    steps: [
      { title: 'Send', text: 'You share footage, references and ideas in a shared folder.' },
      { title: 'Edit', text: 'I cut, pace, caption and add motion and sound.' },
      { title: 'Review', text: 'You leave notes on the video and I refine the details.' },
      { title: 'Deliver', text: 'You get final vertical exports, ready to post.' },
    ],
    toolsTitle: 'What I work with',
    remote: 'HesLab works 100% remotely with creators and digital brands across time zones.',
    ctaTitle: "Let's talk about your next video",
    ctaText: 'A single video or an ongoing monthly pack: send a message and we will look at samples and pricing together.',
    ctaButton: 'Get in touch',
  },
  fa: {
    seoTitle: 'درباره حس‌لب | استودیو تخصصی تدوین ویدیوی کوتاه',
    seoDesc: 'آشنایی با حس‌لب، فلسفه تدوین ویدیوی کوتاه، رویکرد ما در نگه‌داشت نگاه مخاطب و بنیان‌گذار استودیو.',
    h1: 'سلام، من حسام‌ام؛ فوتیج خام را به داستان تبدیل می‌کنم.',
    intro:
      'حس‌لب استودیوی مستقل تدوین من است؛ متمرکز بر ویدیوهای کوتاهی که به زمان و توجه مخاطب احترام می‌گذارند.',
    photoAlt: 'حسام، بنیان‌گذار و تدوین‌گر ارشد حس‌لب',
    cards: [
      { emoji: 'clapper_board', title: 'چرا حس‌لب ساخته شد', text: 'ویدیوی کوتاه نباید شبیه قالب‌های ارزان باشد. تدوین باید آیینهٔ صدای هر کریتور باشد.' },
      { emoji: 'eyes', title: 'توجه مخاطب امانت است', text: 'مخاطب چند ثانیه به شما قرض می‌دهد. هر چیزی در کادر باید این زمان را کسب کند.' },
      { emoji: 'speaker', title: 'صدا نیمی از تصویر است', text: 'صدای لایه‌ای است که یک ادیت عجله‌ای را تمام‌شده نشان می‌دهد.' },
      { emoji: 'calendar', title: 'یک روش کار آرام', text: 'بدون جلسهٔ بی‌پایان. زمان‌بندی روشن و بازخورد مستقیم روی ویدیو.' },
    ] as Chapter[],
    quote: 'هر کریتور صدای خودش را دارد. تدوین باید آن را بلندتر کند، نه متفاوت.',
    howTitle: 'یک پروژه چطور پیش می‌رود',
    steps: [
      { title: 'ارسال', text: 'فوتیج، رفرنس و ایده‌هایتان را در یک پوشهٔ مشترک می‌فرستید.' },
      { title: 'ادیت', text: 'من برش، ریتم، زیرنویس، موشن و صدا را انجام می‌دهم.' },
      { title: 'بازبینی', text: 'روی ویدیو بازخورد می‌گذارید و جزئیات را اصلاح می‌کنم.' },
      { title: 'تحویل', text: 'خروجی نهایی عمودی و آمادهٔ انتشار را تحویل می‌گیرید.' },
    ],
    toolsTitle: 'با چه ابزارهایی کار می‌کنم',
    remote: 'استودیو حس‌لب به‌صورت کاملاً ریموت با تولیدکنندگان محتوا و برندها در مناطق زمانی مختلف همکاری می‌کند.',
    ctaTitle: 'بیایید دربارهٔ ویدیوی بعدی‌تان حرف بزنیم',
    ctaText: 'پروژهٔ تکی یا پکیج ماهانه: پیام بدهید تا نمونه‌ها و قیمت‌ها را با هم بررسی کنیم.',
    ctaButton: 'ارتباط با حسام',
  },
};

export const AboutPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const fa = lang === 'fa';
  const t = COPY[fa ? 'fa' : 'en'];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-white pb-20 pt-28 text-slate-900 ${fa ? 'font-fa' : 'font-en'}`}>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        path="/about"
        structuredData={[generateOrganizationSchema(), generatePersonSchema()]}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: fa ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: fa ? 'درباره ما' : 'About', path: '/about' },
          ]}
        />

        {/* Opening */}
        <header className="flex flex-col items-center text-center">
          <img
            src="/emojis/hesam_avatar.jpg"
            alt={t.photoAlt}
            width={112}
            height={112}
            loading="eager"
            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          />
          <h1 className="mt-5 max-w-2xl text-2xl font-black leading-[1.2] tracking-tight text-slate-950 sm:text-4xl">
            {t.h1}
          </h1>
          <p className={`mt-3.5 max-w-xl text-[15px] text-slate-600 sm:text-[16.5px] ${fa ? 'leading-[1.9]' : 'leading-[1.65]'}`}>
            {t.intro}
          </p>
        </header>

        {/* Four principles */}
        <ul className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5">
          {t.cards.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[26px] bg-[#F4F4F5] p-7 sm:p-8"
            >
              <img src={`/emojis/${c.emoji}.png`} alt="" className="h-12 w-12 object-contain" loading="lazy" />
              <h2 className="mt-5 text-[22px] font-black leading-tight tracking-tight text-slate-950">{c.title}</h2>
              <p className={`mt-2 text-[16px] text-slate-600 ${fa ? 'leading-[1.9]' : 'leading-[1.65]'}`}>{c.text}</p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 text-center"
        >
          <div className="mx-auto max-w-3xl">
            <PullQuote text={t.quote} />
          </div>
        </motion.div>


        <ServiceSection id="tools" heading={t.toolsTitle}>
          <div className="flex flex-wrap gap-2.5">
            {TOOLS.map((tool) => (
              <span
                key={tool.name}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4F4F5] py-2 pl-3.5 pr-4 text-[14.5px] font-semibold text-slate-900"
              >
                <ToolIcon tool={tool} />
                {tool.name}
                {tool.note && (
                  <span className="text-[12.5px] font-medium text-slate-500">{fa ? tool.note.fa : tool.note.en}</span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-6 max-w-3xl">
            <Callout text={t.remote} emoji="glowing_star" />
          </div>
        </ServiceSection>

        <CTACard
          title={t.ctaTitle}
          text={t.ctaText}
          buttonText={t.ctaButton}
          to="/contact"
          onClick={() =>
            trackEvent('primary_cta_click', {
              cta_name: 'start_a_project',
              cta_location: 'about',
              page_path: '/about',
              page_type: 'about',
            })
          }
        />
      </div>
    </div>
  );
};

export default AboutPage;
