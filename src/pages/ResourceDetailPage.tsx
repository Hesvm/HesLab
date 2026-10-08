import { useEffect, useState, useRef, type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResourceBySlug } from '../data/resources';
import { getProjectBySlug } from '../data/projects';
import { TableOfContentsRail } from '../components/resources/TableOfContentsRail';
import { BlogIllustrationCover } from '../components/resources/BlogIllustrationCover';
import { CompareBlock, FAQBlock } from '../components/service-article/ServiceArticleBlocks';
import {
  ArticleFigure,
  ArticleMetaBar,
  Callout,
  CodeBlock,
  CTACard,
  DataTable,
  FeaturedProjectCard,
  KeyTakeaways,
  PullQuote,
  ReferenceList,
  RelatedLinks,
  StepList,
} from '../components/service-article/ArticleBlocks';
import { SEOHead } from '../components/seo/SEOHead';
import { generateArticleSchema } from '../utils/schema';
import { playBenchoSound } from '../content/soundData';
import { analytics } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight, Clock } from 'iconsax-react';

// Dynamic Vibekit Interactive Widgets
import {
  SpringPhysicsSimulator,
  SpringPredictorWidget,
  MagneticStepWalkthrough,
  LiveArtifactPlayground,
  MicroQuizWidget,
} from '../components/blog-widgets';

export const ResourceDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRtl } = useLanguage();
  const article = slug ? getResourceBySlug(slug) : undefined;

  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);
  const [readProgress, setReadProgress] = useState<number>(0);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      analytics.trackResourceView({
        resource_slug: article.slug,
        resource_title: lang === 'fa' ? article.title : (article.titleEn || article.title),
        resource_category: article.category,
        resource_intent: article.searchIntent.primaryIntent,
        funnel_stage: article.searchIntent.funnelStage,
        target_audience: article.searchIntent.audience,
        target_topic: article.searchIntent.targetTopic,
        page_path: `/resources/${article.slug}`,
      });
    }
  }, [article, lang]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      const el = articleContainerRef.current;
      const rect = el.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / Math.max(totalHeight, 1), 0), 1);
      setReadProgress(progress);

      const sectionElements = document.querySelectorAll('[data-toc-section]');
      sectionElements.forEach((sec, idx) => {
        const secRect = sec.getBoundingClientRect();
        if (secRect.top <= 160 && secRect.bottom >= 160) {
          setActiveSectionIdx(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = (id: string, idx: number) => {
    playBenchoSound('select');
    setActiveSectionIdx(idx);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-3">{lang === 'fa' ? 'مقاله مورد نظر یافت نشد' : 'Article Not Found'}</h1>
        <p className="text-slate-600 mb-6 text-sm">
          {lang === 'fa' ? 'ممکن است آدرس تغییر کرده باشد یا مقاله حذف شده باشد.' : 'The requested article may have moved or been deleted.'}
        </p>
        <Link
          to="/blog"
          className="bg-slate-950 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {lang === 'fa' ? 'بازگشت به بلاگ' : 'Back to Blog'}
        </Link>
      </div>
    );
  }

  const title = lang === 'en' && article.titleEn ? article.titleEn : article.title;
  const description = lang === 'en' && article.descriptionEn ? article.descriptionEn : article.description;
  const introduction = lang === 'en' && article.introductionEn ? article.introductionEn : article.introduction;
  const authorName = lang === 'en' && article.author.nameEn ? article.author.nameEn : article.author.name;
  const authorRole = lang === 'en' && article.author.roleEn ? article.author.roleEn : article.author.role;
  const readingTime = lang === 'en' && article.readingTimeEn ? article.readingTimeEn : article.readingTime;
  const featuredProject = article.featuredProjectSlug ? getProjectBySlug(article.featuredProjectSlug) : undefined;
  const tocItems = article.tableOfContents.map((t) => ({
    id: t.id,
    title: lang === 'en' && t.titleEn ? t.titleEn : t.title,
  }));

  const articleSchema = generateArticleSchema({
    title: title,
    description: description,
    slug: article.slug,
    publishDate: article.publishDate,
    updatedDate: article.updatedDate,
    authorName: authorName,
    imageUrl: article.featuredImage,
  });

  const bodyLeading = lang === 'fa' ? 'leading-[2]' : 'leading-[1.8]';
  const h2Class = 'text-2xl sm:text-[32px] font-black tracking-tight text-slate-950 leading-tight';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={title}
        description={description}
        path={`/blog/${article.slug}`}
        ogType="article"
        structuredData={articleSchema}
      />

      {/* Floating TOC Rail on Desktop */}
      {tocItems.length > 0 && (
        <aside
          aria-label={lang === 'fa' ? 'فهرست مطالب' : 'Table of Contents'}
          className={`fixed top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5 pointer-events-auto ${
            isRtl ? 'right-6' : 'left-6'
          }`}
        >
          <TableOfContentsRail
            sections={tocItems}
            activeIdx={activeSectionIdx}
            onSelectSection={handleSelectSection}
            progress={readProgress}
          />
        </aside>
      )}

      <div ref={articleContainerRef} className="mx-auto max-w-5xl px-4 sm:px-6 page-article-zoom">
        <article className="pt-3">
          {/* Back */}
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 transition-colors hover:text-slate-950"
            >
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{lang === 'fa' ? 'بازگشت به بلاگ' : 'Back to Blog'}</span>
            </Link>
          </div>

          <h1 className="max-w-3xl text-3xl font-black leading-[1.15] tracking-tight text-slate-950 sm:text-5xl">{title}</h1>

          <div className="mt-6">
            <ArticleMetaBar
              readingTime={readingTime}
              date={article.publishDate}
              readingIcon={<Clock size={13} variant="Linear" color="currentColor" />}
            />
          </div>

          {/* Cover */}
          <div className="mt-8 overflow-hidden rounded-[26px] sm:rounded-[32px]">
            <BlogIllustrationCover gradient={article.coverGradient} title={title} aspectRatio="16/9" />
          </div>

          {/* Key takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mt-10 max-w-3xl">
              <KeyTakeaways
                title={lang === 'fa' ? 'نکات کلیدی این راهنما' : 'Key takeaways'}
                items={lang === 'en' && article.keyTakeawaysEn ? article.keyTakeawaysEn : article.keyTakeaways}
              />
            </div>
          )}

          {/* Introduction */}
          <div id="sec-intro" data-toc-section className="mt-10 max-w-3xl scroll-mt-28">
            <p className={`text-[18px] ${lang === 'fa' ? 'leading-[2]' : 'leading-[1.75]'} text-slate-800 sm:text-[19px]`}>
              {introduction}
            </p>
          </div>

          {/* Body sections */}
          {article.sections.map((section, idx) => {
            const heading = lang === 'en' && section.headingEn ? section.headingEn : section.heading;
            const paragraphs = lang === 'en' && section.paragraphsEn ? section.paragraphsEn : section.paragraphs;
            const callout = lang === 'en' && section.calloutEn ? section.calloutEn : section.callout;
            const pullQuote = lang === 'en' && section.pullQuoteEn ? section.pullQuoteEn : section.pullQuote;

            return (
              <section
                key={section.id || idx}
                id={section.id}
                data-toc-section
                className="mt-14 scroll-mt-28 sm:mt-20"
              >
                <h2 className={h2Class}>{heading}</h2>

                <div className="mt-6 space-y-6">
                  <div className="max-w-3xl space-y-5">
                    {paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className={`text-[16.5px] sm:text-[17px] ${bodyLeading} text-slate-600`}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {callout && (
                    <div className="max-w-3xl">
                      <Callout text={callout} />
                    </div>
                  )}

                  {pullQuote && <PullQuote text={pullQuote} />}

                  {section.numberedSteps && <StepList steps={section.numberedSteps} />}

                  {section.comparison && (
                    <CompareBlock
                      beforeLabel={section.comparison.beforeLabel}
                      beforeItems={[section.comparison.beforeText]}
                      afterLabel={section.comparison.afterLabel}
                      afterItems={[section.comparison.afterText]}
                    />
                  )}

                  {section.table && <DataTable headers={section.table.headers} rows={section.table.rows} />}

                  {section.code && <CodeBlock code={section.code.code} language={section.code.language} />}

                  {section.image && (
                    <ArticleFigure src={section.image.src} alt={section.image.alt} caption={section.image.caption} />
                  )}

                  {/* Interactive widgets */}
                  {section.widget === 'spring-simulator' && <SpringPhysicsSimulator />}
                  {section.widget === 'spring-predictor' && <SpringPredictorWidget />}
                  {section.widget === 'magnetic-walkthrough' && <MagneticStepWalkthrough />}
                  {section.widget === 'live-artifact' && <LiveArtifactPlayground />}
                  {section.widget === 'micro-quiz' && <MicroQuizWidget />}
                </div>
              </section>
            );
          })}

          {/* FAQ */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-14 sm:mt-20">
              <h2 className={h2Class}>{lang === 'fa' ? 'پرسش‌های متداول این مبحث' : 'Frequently asked questions'}</h2>
              <div className="mt-6">
                <FAQBlock
                  items={article.faq.map((item) => ({
                    q: lang === 'en' && item.questionEn ? item.questionEn : item.question,
                    a: lang === 'en' && item.answerEn ? item.answerEn : item.answer,
                  }))}
                />
              </div>
            </section>
          )}

          {/* Featured case study */}
          {featuredProject && (
            <div className="mt-14 sm:mt-20">
              <FeaturedProjectCard
                label={lang === 'fa' ? 'کالبدشکافی نمونه‌کار مرتبط' : 'Featured case study'}
                title={lang === 'fa' ? featuredProject.titleFa : featuredProject.titleEn}
                desc={lang === 'fa' ? featuredProject.descriptionFa : featuredProject.descriptionEn}
                tags={(lang === 'fa' ? featuredProject.featuresFa : featuredProject.featuresEn).slice(0, 3)}
                meta={`${featuredProject.durationSeconds}s • ${featuredProject.resolution}`}
                cta={lang === 'fa' ? 'مشاهده کالبدشکافی ادیت' : 'View edit breakdown'}
                to={`/work/${featuredProject.slug}`}
              />
            </div>
          )}

          {/* Related services */}
          {article.relatedServices && article.relatedServices.length > 0 && (
            <div className="mt-14 sm:mt-20">
              <RelatedLinks
                title={lang === 'fa' ? 'خدمات مرتبط حس‌لب' : 'Related HesLab services'}
                items={article.relatedServices}
                onNavigate={(path) =>
                  analytics.trackContentNavigation({
                    discovery_type: 'resource_to_service',
                    from_type: 'resource',
                    from_slug: article.slug,
                    to_type: 'service',
                    to_slug: path.replace('/services/', ''),
                    page_path: `/resources/${article.slug}`,
                  })
                }
              />
            </div>
          )}

          {/* Sources */}
          {article.references && article.references.length > 0 && (
            <div className="mt-14 sm:mt-20 max-w-3xl">
              <ReferenceList title={lang === 'fa' ? 'منابع' : 'Sources'} items={article.references} />
            </div>
          )}

          {/* CTA */}
          {article.cta && (
            <CTACard
              title={lang === 'en' && article.cta.titleEn ? article.cta.titleEn : article.cta.title}
              text={lang === 'en' && article.cta.subtitleEn ? article.cta.subtitleEn : article.cta.subtitle}
              buttonText={lang === 'en' && article.cta.buttonTextEn ? article.cta.buttonTextEn : article.cta.buttonText}
              to={article.cta.link}
              onClick={() =>
                analytics.trackPrimaryCta({
                  cta_name: 'start_a_project',
                  cta_location: 'resource',
                  resource_slug: article.slug,
                  page_path: `/resources/${article.slug}`,
                  page_type: 'resource_detail',
                })
              }
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
