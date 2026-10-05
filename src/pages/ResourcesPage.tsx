import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { RESOURCE_ARTICLES, ResourceArticle } from '../data/resources';
import { BlogIllustrationCover } from '../components/resources/BlogIllustrationCover';
import { SEOHead } from '../components/seo/SEOHead';
import { playBenchoSound } from '../content/soundData';
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

  const handleCardClick = (_article?: ResourceArticle) => {
    playBenchoSound('pick');
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-24 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'بلاگ حس‌لب' : 'Heslab blog'}
        description={
          lang === 'fa'
            ? 'راهنماها، کالبدشکافی هوک‌ها و تجربیات عملی استودیو حس‌لب در تدوین ریلز، یوتیوب شورتس، موشن دیزاین و فیزیک انیمیشن.'
            : 'In-depth guides, hook breakdowns, and practical creator workflows for short-form video editing and motion design by HesLab.'
        }
        path="/blog"
      />

      <div className="max-w-[780px] mx-auto px-4 sm:px-6">
        {/* Clean Page Header */}
        <header className="mb-10 text-center pt-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight font-en">
            Heslab blog
          </h1>

          {/* Category Filter Pills (Strictly Single Line) */}
          <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2 mt-6 py-1 px-2">
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

        {/* 2-Column Responsive Grid with Square Cards */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-9">
          {filteredArticles.map((article) => {
            const title = lang === 'en' && article.titleEn ? article.titleEn : article.title;
            const excerpt = lang === 'en' && article.excerptEn ? article.excerptEn : article.excerpt;
            const readingTime = lang === 'en' && article.readingTimeEn ? article.readingTimeEn : article.readingTime;

            return (
              <article
                key={article.id}
                className="group flex flex-col gap-3 text-start transition-all max-w-[370px] mx-auto w-full md:max-w-none"
              >
                <Link
                  to={`/blog/${article.slug}`}
                  onClick={() => handleCardClick(article)}
                  className="block cursor-pointer focus:outline-hidden"
                >
                  <BlogIllustrationCover
                    gradient={article.coverGradient}
                    title={title}
                    readTime={readingTime}
                    aspectRatio="square"
                  />
                </Link>

                <div className="flex flex-col gap-1.5 px-0.5">
                  <h2 className="text-[17px] sm:text-[18px] font-bold tracking-tight text-slate-950 transition-colors group-hover:text-sky-600 leading-snug line-clamp-2">
                    <Link
                      to={`/blog/${article.slug}`}
                      onClick={() => handleCardClick(article)}
                      className="focus:outline-hidden"
                    >
                      {title}
                    </Link>
                  </h2>

                  <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                    {excerpt}
                  </p>
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
