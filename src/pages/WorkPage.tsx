import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { VolumeHigh, VolumeCross } from 'iconsax-react';
import { PROJECTS } from '../data/projects';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { playBenchoSound } from '../content/soundData';

export const WorkPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [unmutedId, setUnmutedId] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelFa: 'همه پروژه‌ها', labelEn: 'All Projects' },
    { id: 'vlog', labelFa: 'ولاگ و سفر', labelEn: 'Vlog & Travel' },
    { id: 'documentary', labelFa: 'مستند و داستانی', labelEn: 'Documentary' },
    { id: 'podcast', labelFa: 'پادکست و گفتگو', labelEn: 'Podcast' },
    { id: 'commercial', labelFa: 'تبلیغاتی و محصول', labelEn: 'Commercial' },
    { id: 'educational', labelFa: 'آموزشی و بیزینس', labelEn: 'Educational' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const toggleSound = (id: number) => {
    playBenchoSound('switch');
    setUnmutedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'نمونه‌کارها و پروژه‌های منتخب تدوین ویدیو' : 'Selected Work & Portfolio | HesLab'}
        description={
          lang === 'fa'
            ? 'نمونه‌کارهای ادیت ریلز، شورتس، موشن دیزاین و ویدیوهای عمودی پربازدید ادیت شده در استودیو حس‌لب.'
            : 'Explore HesLab portfolio of high-retention vertical edits, YouTube Shorts, Reels, and commercial motion projects.'
        }
        path="/work"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'نمونه‌کارها' : 'Work', path: '/work' },
          ]}
        />

        <header className="mb-10 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
              <span>{lang === 'fa' ? 'آرشیو کارهای حس‌لب' : 'HesLab Portfolio'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {lang === 'fa' ? 'پروژه‌های منتخب و ادیت‌های پربازدید' : 'Selected Work & Case Studies'}
            </h1>
            <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {lang === 'fa'
                ? 'ویدیوهای کوتاه با کیفیت 4K و ریتم مهندسی‌شده برای نگهداشت بالای ۷۵٪ نگاه مخاطب.'
                : 'Vertical video edits engineered for high retention, viral reach, and commercial brand impact.'}
            </p>
          </div>

          {/* Category Filter (Strictly Single Line) */}
          <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2 mt-7 py-1 px-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playBenchoSound('select');
                  }}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'fa' ? cat.labelFa : cat.labelEn}
                </button>
              );
            })}
          </div>
        </header>

        {/* Portfolio Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Video Player Box */}
              <div className="relative aspect-[9/16] bg-slate-950 overflow-hidden">
                <video
                  src={project.video}
                  poster={project.image}
                  muted={unmutedId !== project.id}
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />

                {/* View Badge */}
                <div className="absolute top-4 start-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {project.views} ویو
                </div>

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleSound(project.id)}
                  aria-label={unmutedId === project.id ? 'قطع صدا' : 'وصل صدا'}
                  className="absolute bottom-4 end-4 size-9 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition-transform z-10 cursor-pointer"
                >
                  {unmutedId === project.id ? (
                    <VolumeHigh size={17} color="currentColor" />
                  ) : (
                    <VolumeCross size={17} color="currentColor" />
                  )}
                </button>
              </div>

              {/* Card Meta & Detail Link */}
              <div className="p-5 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-sky-600 font-bold uppercase tracking-wider">
                      {project.tag} • {project.resolution}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {project.durationSeconds} ثانیه
                    </span>
                  </div>

                  <h2 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                    {lang === 'fa' ? project.titleFa : project.titleEn}
                  </h2>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {lang === 'fa' ? project.descriptionFa : project.descriptionEn}
                  </p>
                </div>

                <Link
                  to={`/work/${project.slug}`}
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-950 hover:text-white text-slate-900 text-xs font-semibold transition-colors duration-200"
                >
                  <span>{lang === 'fa' ? 'مشاهده کالبدشکافی ادیت' : 'View Edit Breakdown'}</span>
                </Link>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default WorkPage;
