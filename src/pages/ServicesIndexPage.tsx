import { FC } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlay, Magicpen, BagTick, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { getAllServices } from '../data/services';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';

const serviceIcons: Record<string, typeof VideoPlay> = {
  VideoPlay,
  Magicpen,
  BagTick,
};

export const ServicesIndexPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const services = getAllServices();
  const ArrowIcon = isRtl ? ArrowLeft2 : ArrowRight2;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'خدمات استودیو حس‌لب | تدوین شورتس، موشن دیزاین و پکیج ماهانه' : 'Services | HesLab Short-Form Video & Motion Studio'}
        description={
          lang === 'fa'
            ? 'خدمات تخصصی تدوین ریلز، یوتیوب شورتس، موشن دیزاین کینتیک و پکیج‌های منظم ماهانه برای کریتورها، بنیان‌گذاران و برندها.'
            : 'Explore HesLab services: high-retention short-form video editing, custom motion design, and dedicated monthly content retainers.'
        }
        path="/services"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'خدمات' : 'Services', path: '/services' },
          ]}
        />

        <header className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <span>{lang === 'fa' ? 'ستون‌های خدمات حس‌لب' : 'HesLab Service Pillars'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {lang === 'fa' ? 'خدمات تخصصی تدوین و موشن دیزاین' : 'Creative Services Built for High Attention'}
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">
            {lang === 'fa'
              ? 'هر سرویس بر اساس نیازهای واقعی تولیدکنندگان محتوا و برندهای مدرن برای جذب نگاه و تبدیل مخاطب طراحی شده است.'
              : 'Engineered short-form video workflows, kinetic visual identity, and predictable monthly content throughput.'}
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {services.map((srv) => {
            const IconComp = serviceIcons[srv.iconName] || VideoPlay;

            return (
              <div
                key={srv.slug}
                className="group p-6 sm:p-7 rounded-3xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
                    <IconComp size={24} color="currentColor" variant="Linear" />
                  </div>

                  <span className="text-[11.5px] font-bold text-sky-600 uppercase tracking-wider block mb-2">
                    {lang === 'fa' ? srv.heroTagFa : srv.heroTagEn}
                  </span>

                  <h2 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                    {lang === 'fa' ? srv.nameFa : srv.nameEn}
                  </h2>

                  <p className="text-[13.5px] text-slate-600 leading-relaxed mb-6">
                    {lang === 'fa' ? srv.subtitleFa : srv.subtitleEn}
                  </p>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <span className="text-xs font-bold text-slate-900 block mb-2">
                      {lang === 'fa' ? 'شامل چه مواردی است؟' : "What's included:"}
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-slate-600">
                      {(lang === 'fa' ? srv.whatsIncludedFa : srv.whatsIncludedEn).slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-sky-500 font-bold shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={srv.path}
                  className="w-full inline-flex items-center justify-between py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-950 hover:text-white text-slate-900 font-semibold text-xs transition-colors duration-200"
                >
                  <span>{lang === 'fa' ? 'مشاهده جزییات ستون خدمت' : 'Explore Pillar Service'}</span>
                  <ArrowIcon size={14} />
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default ServicesIndexPage;
