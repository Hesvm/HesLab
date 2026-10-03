import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCE_ARTICLES, ResourceArticle } from '../data/resources';
import { BlogIllustrationCover } from '../components/resources/BlogIllustrationCover';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { playBenchoSound } from '../content/soundData';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { ContentOpportunityCalculator } from '../components/tools/ContentOpportunityCalculator';

export const ResourcesPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelFa: 'همه مقالات', labelEn: 'All Articles' },
    { id: 'short-form', labelFa: 'تدوین شورتس و ریلز', labelEn: 'Short-Form Editing' },
    { id: 'motion-design', labelFa: 'موشن دیزاین', labelEn: 'Motion Design' },
    { id: 'creator-workflow', labelFa: 'جریان کار کریتور', labelEn: 'Creator Workflow' },
    { id: 'pricing-buying', labelFa: 'هزینه و قیمت‌گذاری', labelEn: 'Pricing & Buying' },
  ];

  const quickIntents = [
    {
      id: 'better-reels',
      labelFa: 'شورتس و ریلز جذاب‌تر بسازم',
      labelEn: 'Make better Reels & Shorts',
      category: 'short-form',
    },
    {
      id: 'repurpose-podcasts',
      labelFa: 'تبدیل پادکست به ویدیوی کوتاه',
      labelEn: 'Repurpose podcast into clips',
      category: 'creator-workflow',
    },
    {
      id: 'learn-motion',
      labelFa: 'اصول موشن دیزاین و فیزیک انیمیشن',
      labelEn: 'Motion design & animation physics',
      category: 'motion-design',
    },
    {
      id: 'calc-yield',
      labelFa: 'محاسبه خروجی و پتانسیل محتوا',
      labelEn: 'Calculate content yield & ROI',
      action: 'scroll-calculator',
    },
  ];

  const handleIntentClick = (intent: typeof quickIntents[number]) => {
    playBenchoSound('select');
    setActiveIntent(intent.id);
    trackEvent('resource_view', { intentId: intent.id, path: '/resources' });

    if (intent.action === 'scroll-calculator') {
      const el = document.getElementById('content-yield-calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (intent.category) {
      setSelectedCategory(intent.category);
    }
  };

  const filteredArticles = selectedCategory === 'all'
    ? RESOURCE_ARTICLES
    : RESOURCE_ARTICLES.filter((a) => a.category === selectedCategory);

  const handleCardClick = (article: ResourceArticle) => {
    playBenchoSound('pick');
    trackEvent('resource_view', {
      resourceSlug: article.slug,
      path: `/resources/${article.slug}`,
    });
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'منابع و مقالات تخصصی تدوین شورتس و موشن دیزاین' : 'Resources & Video Editing Guides'}
        description={
          lang === 'fa'
            ? 'راهنماها، کالبدشکافی هوک‌ها و تجربیات عملی استودیو حس‌لب در تدوین ریلز، یوتیوب شورتس، موشن دیزاین و فیزیک انیمیشن.'
            : 'In-depth guides, hook breakdowns, and practical creator workflows for short-form video editing and motion design by HesLab.'
        }
        path="/resources"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'منابع و مقالات' : 'Resources', path: '/resources' },
          ]}
        />

        {/* Page Header */}
        <header className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <span>{lang === 'fa' ? 'ژورنال تخصصی حس‌لب' : 'HesLab Creative Journal'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {lang === 'fa' ? 'منابع و بینش‌های تدوین و موشن' : 'Resources & Creator Insights'}
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-slate-600 leading-relaxed">
            {lang === 'fa'
              ? 'راهنماهای تخصصی، تحلیل فریم‌به‌فریم هوک‌های وایرال و روش‌های بهینه‌سازی جریان کار ویدیوهای کوتاه.'
              : 'Actionable breakdowns on short-form retention, motion dynamics, and repeatable editing workflows.'}
          </p>

          {/* Section 11: Intent Quick-Selectors */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              {lang === 'fa' ? 'می‌خواهم...' : 'I want to...'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {quickIntents.map((intent) => {
                const isSelected = activeIntent === intent.id;
                return (
                  <button
                    key={intent.id}
                    type="button"
                    onClick={() => handleIntentClick(intent)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer border ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 text-sky-800 font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    ✨ {lang === 'fa' ? intent.labelFa : intent.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveIntent(null);
                    playBenchoSound('select');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer ${
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

        {/* 2-Column Responsive Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-4">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col gap-3.5 text-start transition-all"
            >
              <Link
                to={`/resources/${article.slug}`}
                onClick={() => handleCardClick(article)}
                className="block cursor-pointer focus:outline-hidden"
              >
                <BlogIllustrationCover
                  gradient={article.coverGradient}
                  title={article.title}
                  readTime={article.readingTime}
                  tag={article.tags[0]}
                />
              </Link>

              <div className="flex flex-col gap-1.5 px-0.5">
                <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
                  <span className="font-semibold text-slate-800">{article.author.name}</span>
                  <span>•</span>
                  <span>{article.publishDate}</span>
                </div>

                <h2 className="text-[17px] sm:text-[18px] font-bold tracking-tight text-slate-950 transition-colors group-hover:text-sky-600 leading-snug">
                  <Link
                    to={`/resources/${article.slug}`}
                    onClick={() => handleCardClick(article)}
                    className="focus:outline-hidden"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {article.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </main>

        {/* Section 35: Interactive Content Opportunity Calculator */}
        <section id="content-yield-calculator" className="mt-20 pt-10 border-t border-slate-200">
          <ContentOpportunityCalculator />
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;
