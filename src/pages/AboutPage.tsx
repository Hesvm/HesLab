import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { generatePersonSchema, generateOrganizationSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

export const AboutPage: FC = () => {
  const { lang, isRtl } = useLanguage();

  const personSchema = generatePersonSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'درباره حس‌لب | استودیو تخصصی تدوین ویدیوی کوتاه' : 'About HesLab | Independent Video Editing & Motion Studio'}
        description={
          lang === 'fa'
            ? 'آشنایی با حس‌لب، فلسفه تدوین ویدیوی کوتاه، رویکرد ما در نگه‌داشت نگاه مخاطب و بنیان‌گذار استودیو.'
            : 'Learn about HesLab: an independent video editing and motion design studio founded by Hesam, dedicated to high-retention creator workflows.'
        }
        path="/about"
        structuredData={[orgSchema, personSchema]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'درباره ما' : 'About', path: '/about' },
          ]}
        />

        {/* Header */}
        <header className="pt-4 pb-8 border-b border-slate-200 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <span>{lang === 'fa' ? 'داستان حس‌لب' : 'The HesLab Story'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            {lang === 'fa' ? 'تدوین متعهد، ریتم هوشمند و طراحی برای اثرگذاری' : 'Crafting High-Retention Stories for Forward-Thinking Creators'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {lang === 'fa'
              ? 'حس‌لب یک استودیوی مستقل تدوین ویدیو و دیزاین بصری است که توسط حسام اداره می‌شود. تمرکز ما روی ویدیوهای کوتاهی است که احترام به زمان مخاطب و استراتژی بصری را در اولویت قرار می‌دهند.'
              : 'HesLab is an independent creative studio founded by Hesam. We specialize in high-retention short-form video editing, kinetic motion, and repeatable content pipelines.'}
          </p>
        </header>

        {/* Founder Story Block */}
        <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 mb-12">
          <img
            src="/mock/founder_hes.webp"
            alt="حسام - بنیان‌گذار حس‌لب"
            width={120}
            height={120}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 border border-slate-300 shadow-md"
            loading="eager"
          />
          <div>
            <h2 className="text-lg font-bold text-slate-950 mb-1">
              {lang === 'fa' ? 'حسام — تدوین‌گر و دیزاینر بصری' : 'Hesam — Video Editor & Visual Designer'}
            </h2>
            <span className="text-xs text-sky-600 font-mono font-semibold block mb-3">
              FOUNDER & LEAD EDITOR
            </span>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              {lang === 'fa'
                ? 'من حس‌لب را ساختم چون معتقدم ویدیوهای کوتاه نباید شبیه قالب‌های ارزان اینستاگرامی با فونت‌های تکراری و انیمیشن‌های شلخته باشند. هر کریتور لحن و هویت منحصربه‌فردی دارد و تدوین باید آیینه دقت و پیام اصلی او باشد.'
                : 'I built HesLab because vertical video should not be a rushed race to template-heavy chaos. Every creator carries a distinct voice; editing must amplify that message with intentional pacing, surgical cuts, and tactile sound design.'}
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-4">
            {lang === 'fa' ? 'اصول کاری ما در حس‌لب' : 'Our Guiding Principles'}
          </h2>

          <div className="flex flex-col gap-5 text-[14.5px] text-slate-700 leading-[2.1]">
            <p>
              {lang === 'fa'
                ? '۱. توجه مخاطب امانت است: ما از کلیک‌بیت‌های گمراه‌کننده یا شلوغ‌کاری بی‌دلیل دوری می‌کنیم. اگر المانی در کادر می‌آید، باید درک مطلب را افزایش دهد یا انرژی ویدیو را حفظ کند.'
                : '1. Viewer attention is a sacred asset: We avoid cheap clickbait or visual noise. Every on-screen element must elevate retention or deliver authentic clarity.'}
            </p>
            <p>
              {lang === 'fa'
                ? '۲. صدا نیمی از تصویر است: بسیاری از کاربران ویدیو را با هدفون گوش می‌دهند. طراحی صدای لایه‌ای، وووش‌ها و افکت‌های ضربه‌ای دقیق، تفاوت یک ادیت آماتور با یک اثر حرفه‌ای را می‌سازند.'
                : '2. Audio is 50% of the film: Layered sound effects, spatial risers, and vocal clarity create the tactile feeling that makes an edit memorable.'}
            </p>
            <p>
              {lang === 'fa'
                ? '۳. سادگی در فرآیند: ما با سیستم‌های ابری شفاف، تحویل ۲۴ تا ۴۸ ساعته و بازخورد بدون جلسه کار می‌کنیم تا شما بتوانید تمام تمرکزتان را روی ضبط محتوا بگذارید.'
                : '3. Frictionless collaboration: Zero endless meetings. Asynchronous cloud folders, clear turnaround timelines, and reliable execution.'}
            </p>
          </div>
        </section>

        {/* Tools & Tech Stack */}
        <section className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white shadow-xs mb-12">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
            {lang === 'fa' ? 'ابزارها و پایپ‌لاین تولید' : 'Our Creative Tech Stack'}
          </h3>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Adobe Premiere Pro</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">After Effects</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">DaVinci Resolve (Color Grading)</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Spring Physics & Framer Motion</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Web Audio API Sound Design</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">4K 60FPS Render Pipeline</span>
          </div>
        </section>

        {/* Remote / International Note */}
        <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200 text-sky-950 text-xs sm:text-sm leading-relaxed mb-12">
          <span className="font-bold block mb-1">
            {lang === 'fa' ? 'همکاری ریموت و بین‌المللی' : 'Remote & International Studio'}
          </span>
          <span>
            {lang === 'fa'
              ? 'استودیو حس‌لب به صورت کاملاً ریموت فعالیت می‌کند و با تولیدکنندگان محتوا و برندها در سراسر جهان با مناطق زمانی مختلف همکاری دارد.'
              : 'HesLab operates 100% remotely, collaborating smoothly with creators and digital brands across multiple timezones.'}
          </span>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-3xl bg-slate-950 text-white text-center flex flex-col items-center shadow-xl">
          <h2 className="text-2xl font-black mb-2 text-white">
            {lang === 'fa' ? 'بیایید درباره پروژه ویدیویی شما گفتگو کنیم' : "Let's Discuss Your Next Video Project"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            {lang === 'fa'
              ? 'پروژه تکی دارید یا به دنبال ادیتور منظم ماهانه هستید؟ پیام دهید تا نمونه‌ها و قیمت‌ها را بررسی کنیم.'
              : 'Looking for a single video polish or an ongoing monthly retainer? Reach out directly.'}
          </p>
          <Link
            to="/contact"
            onClick={() => trackEvent('primary_cta_click', { source: 'about_cta' })}
            className="bg-[#00A7F5] hover:bg-[#0096DC] text-white text-sm font-semibold px-7 py-3 rounded-full transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            {lang === 'fa' ? 'ارتباط با حسام' : 'Get in Touch'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
