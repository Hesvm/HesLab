import { useState, type FC } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { VideoCard } from '../components/SelectedWork';
import { CategoryPills } from '../components/CategoryPills';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const WorkPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].work;
  const [activeCategory, setActiveCategory] = useState('all');
  const [unmutedVideoId, setUnmutedVideoId] = useState<number | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? t.items
      : t.items.filter((item) => item.category === activeCategory);

  const activeFocusedId = hoveredVideoId ?? unmutedVideoId;
  const hasActiveFocus = activeFocusedId !== null;

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

      <section className="px-4 max-w-[840px] mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight text-slate-950 leading-tight text-center mb-7 sm:mb-9">
          {lang === 'fa' ? 'نمونه‌کارهای منتخب' : 'Selected Works'}
        </h1>

        {/* Category Filter (same as home) */}
        <div className="mb-5 sm:mb-7">
          <CategoryPills categories={t.categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Video grid: identical cards and sizing as the home page */}
        {filteredItems.length === 0 && (
          <p className="py-16 text-center text-[14px] font-medium text-slate-500">
            {lang === 'fa' ? 'به‌زودی نمونه‌کار جدید در این حوزه اضافه می‌شود.' : 'Work in this niche is coming soon.'}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {filteredItems.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              isRtl={isRtl}
              isUnmuted={unmutedVideoId === item.id}
              isFocused={hasActiveFocus && activeFocusedId === item.id}
              isDimmed={hasActiveFocus && activeFocusedId !== item.id}
              onToggleSound={(id) => setUnmutedVideoId((prev) => (prev === id ? null : id))}
              onHover={setHoveredVideoId}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
