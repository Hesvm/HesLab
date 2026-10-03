import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCE_ARTICLES, ResourceArticle } from '../data/resources';
import { BlogIllustrationCover } from '../components/resources/BlogIllustrationCover';
import { SEOHead } from '../components/seo/SEOHead';
import { playBenchoSound } from '../content/soundData';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';

export const ResourcesPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelFa: 'همه مقالات', labelEn: 'All Articles' },
    { id: 'short-form', labelFa: 'تدوین شورتس و ریلز', labelEn: 'Short-Form Editing' },
    { id: 'motion-design', labelFa: 'موشن دیزاین', labelEn: 'Motion Design' },
    { id: 'creator-workflow', labelFa: 'جریان کار کریتور', labelEn: 'Creator Workflow' },
    { id: 'pricing-buying', labelFa: 'هزینه و قیمت‌گذاری', labelEn: 'Pricing & Buying' },
  ];

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
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-24 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'بلاگ تخصصی حس‌لب | مقالات تدوین شورتس و موشن' : 'HesLab Blog | Video Editing & Motion Insights'}
        description={
          lang === 'fa'
            ? 'راهنماها، کالبدشکافی هوک‌ها و تجربیات عملی استودیو حس‌لب در تدوین ریلز، یوتیوب شورتس، موشن دیزاین و فیزیک انیمیشن.'
            : 'In-depth guides, hook breakdowns, and practical creator workflows for short-form video editing and motion design by HesLab.'
        }
        path="/blog"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Clean Page Header */}
        <header className="mb-12 text-center pt-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {lang === 'fa' ? 'بلاگ و بینش‌های تدوین و موشن' : 'Resources & Creator Insights'}
            </h1>
            <p className="mt-4 text-[15px] sm:text-base text-slate-600 leading-relaxed">
              {lang === 'fa'
                ? 'راهنماهای تخصصی، تحلیل فریم‌به‌فریم هوک‌های وایرال و روش‌های بهینه‌سازی جریان کار ویدیوهای کوتاه.'
                : 'Actionable breakdowns on short-form retention, motion dynamics, and repeatable editing workflows.'}
            </p>
          </div>

          {/* Category Filter Pills (Strictly Single Line) */}
          <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2 mt-8 py-1 px-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playBenchoSound('select');
                  }}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 cursor-pointer ${
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
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredArticles.map((article) => {
            const title = lang === 'en' && article.titleEn ? article.titleEn : article.title;
            const excerpt = lang === 'en' && article.excerptEn ? article.excerptEn : article.excerpt;
            const tags = lang === 'en' && article.tagsEn ? article.tagsEn : article.tags;
            const readingTime = lang === 'en' && article.readingTimeEn ? article.readingTimeEn : article.readingTime;
            const authorName = lang === 'en' && article.author.nameEn ? article.author.nameEn : article.author.name;

            return (
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
                    title={title}
                    readTime={readingTime}
                    tag={tags[0]}
                  />
                </Link>

                <div className="flex flex-col gap-1.5 px-0.5">
                  <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
                    <span className="font-semibold text-slate-800">{authorName}</span>
                    <span>•</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h2 className="text-[17px] sm:text-[18px] font-bold tracking-tight text-slate-950 transition-colors group-hover:text-sky-600 leading-snug">
                    <Link
                      to={`/resources/${article.slug}`}
                      onClick={() => handleCardClick(article)}
                      className="focus:outline-hidden"
                    >
                      {title}
                    </Link>
                  </h2>

                  <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed line-clamp-2">
                    {excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {tags.slice(0, 3).map((tag, idx) => (
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
            );
          })}
        </main>
      </div>
    </div>
  );
};

export default ResourcesPage;
