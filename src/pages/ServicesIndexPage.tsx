import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { getAllServices } from '../data/services';
import { translations } from '../data/translations';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';

// Same emoji and hover tints as the Services dropdown, so both read as one system
const cardMeta = [
  { emoji: '/emojis/clapper_board.png', hover: 'hover:bg-[#0284C7]/15' },
  { emoji: '/emojis/artist_palette.png', hover: 'hover:bg-[#EA580C]/15' },
  { emoji: '/emojis/sparkles.png', hover: 'hover:bg-[#16A34A]/15' },
  { emoji: '/emojis/headphone.png', hover: 'hover:bg-[#9333EA]/15' },
  { emoji: '/emojis/movie_camera.png', hover: 'hover:bg-[#E11D48]/15' },
  { emoji: '/emojis/package.png', hover: 'hover:bg-[#0284C7]/15' },
];

export const ServicesIndexPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const list = translations[lang].nav.servicesList;
  const pillars = getAllServices();
  const ArrowIcon = isRtl ? ArrowLeft2 : ArrowRight2;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white pt-28 pb-24 text-slate-900 ${lang === 'fa' ? 'font-fa' : 'font-en'}`}
    >
      <SEOHead
        title={lang === 'fa' ? 'خدمات استودیو حس‌لب | تدوین شورتس، موشن دیزاین و پکیج ماهانه' : 'Services | HesLab Short-Form Video Editing & Motion Design'}
        description={
          lang === 'fa'
            ? 'خدمات تخصصی تدوین ریلز، یوتیوب شورتس، موشن دیزاین کینتیک و پکیج‌های منظم ماهانه برای کریتورها و برندها.'
            : 'Explore HesLab services: short-form video editing, brand visual style, motion design, sound design, cinematic editing and content packs.'
        }
        path="/services"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="text-center text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
          {lang === 'fa' ? 'خدمات' : 'Services'}
        </h1>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {list.map((item, i) => {
            const meta = cardMeta[i] ?? cardMeta[0];
            return (
              <li key={item.href + i}>
                <Link
                  to={item.href}
                  className={`group flex h-full min-h-[210px] flex-col justify-between rounded-[26px] bg-[#F4F4F5] p-7 transition-colors duration-300 ${meta.hover}`}
                >
                  <div>
                    <img
                      src={meta.emoji}
                      alt=""
                      className="h-12 w-12 object-contain transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:-rotate-6"
                    />
                    <h2 className="mt-5 text-[21px] font-bold tracking-tight text-slate-950">{item.title}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-950">
                    {lang === 'fa' ? 'بیشتر بخوانید' : 'Learn more'}
                    <ArrowIcon size={15} className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Specific pages kept as quiet links so they stay discoverable */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-center text-[15px] font-bold tracking-tight text-slate-500">
            {lang === 'fa' ? 'خدمات تخصصی‌تر' : 'More specific services'}
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {pillars.map((srv) => (
              <Link
                key={srv.slug}
                to={srv.path}
                className="rounded-full bg-[#F4F4F5] px-4 py-2 text-[14px] font-semibold text-slate-800 transition-colors hover:bg-[#EBEBED]"
              >
                {lang === 'fa' ? srv.nameFa : srv.nameEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesIndexPage;
