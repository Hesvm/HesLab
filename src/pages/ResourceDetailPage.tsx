import { useEffect, useRef, useState, type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Share, ArrowLeft } from 'iconsax-react';
import { getResourceBySlug } from '../data/resources';
import { BlogIllustrationCover } from '../components/resources/BlogIllustrationCover';
import { TableOfContentsRail } from '../components/resources/TableOfContentsRail';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { generateArticleSchema } from '../utils/schema';
import { playBenchoSound } from '../content/soundData';
import { toast } from '../lib/toast';
import { trackEvent } from '../lib/analytics';
import { useLanguage } from '../context/LanguageContext';
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

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('resource_view', { resourceSlug: article.slug, path: `/resources/${article.slug}` });
  }, [article]);

  // Universal scroll engine tracking reading progress and active section
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setReadProgress(pct);
      }

      // Track active TOC section
      const headingElements = document.querySelectorAll('[data-toc-section]');
      let currentIdx = 0;
      headingElements.forEach((secEl, index) => {
        const rect = secEl.getBoundingClientRect();
        if (rect.top <= 240) {
          currentIdx = index;
        }
      });
      setActiveSectionIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleSelectSection = (id: string, idx: number) => {
    playBenchoSound('select');
    setActiveSectionIdx(idx);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    playBenchoSound('pop');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast(lang === 'fa' ? 'لینک مقاله با موفقیت کپی شد' : 'Article link copied to clipboard');
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
          to="/resources"
          className="bg-slate-950 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {lang === 'fa' ? 'بازگشت به مقالات' : 'Back to Resources'}
        </Link>
      </div>
    );
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    slug: article.slug,
    publishDate: article.publishDate,
    updatedDate: article.updatedDate,
    authorName: article.author.name,
    imageUrl: article.featuredImage,
  });

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-24 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={article.title}
        description={article.description}
        path={`/resources/${article.slug}`}
        ogType="article"
        structuredData={articleSchema}
      />

      {/* Floating TOC Rail on Desktop */}
      {article.tableOfContents && article.tableOfContents.length > 0 && (
        <aside
          aria-label="فهرست مطالب"
          className="fixed top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-1.5 ltr:left-6 rtl:right-6 pointer-events-auto"
        >
          <TableOfContentsRail
            sections={article.tableOfContents}
            activeIdx={activeSectionIdx}
            onSelectSection={handleSelectSection}
            progress={readProgress}
          />
        </aside>
      )}

      <div ref={articleContainerRef} className="max-w-[760px] mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'منابع و مقالات' : 'Resources', path: '/resources' },
            { name: article.title, path: `/resources/${article.slug}` },
          ]}
        />

        <article className="pt-3">
          {/* Header Action Row */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors"
            >
              {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              <span>{lang === 'fa' ? 'بازگشت به مقالات' : 'Back to Resources'}</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              title={lang === 'fa' ? 'اشتراک‌گذاری' : 'Share'}
            >
              <Share size={13} />
              <span>{lang === 'fa' ? 'اشتراک‌گذاری' : 'Share'}</span>
            </button>
          </div>

          {/* Primary H1 Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black tracking-tight text-slate-950 leading-[1.3] mb-6">
            {article.title}
          </h1>

          {/* Author & Publication Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-8 text-[12.5px] text-slate-500">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                width={38}
                height={38}
                className="size-9 rounded-full object-cover border border-slate-200"
                loading="eager"
              />
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-[13px] leading-tight">{article.author.name}</span>
                <span className="text-[11px] text-slate-500 leading-tight mt-0.5">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[11.5px] font-medium text-slate-500">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
                <Clock size={12} variant="Linear" color="currentColor" />
                <span>{article.readingTime}</span>
              </div>
              <div className="flex items-center rounded-full bg-slate-100 px-3 py-1">
                <span>{article.publishDate}</span>
              </div>
            </div>
          </div>

          {/* Hero Cover Graphic */}
          <div className="mb-10 overflow-hidden rounded-[22px] shadow-sm">
            <BlogIllustrationCover
              gradient={article.coverGradient}
              title={article.title}
              tag={article.tags[0]}
            />
          </div>

          {/* Lead Paragraph / Introduction */}
          <div id="sec-intro" data-toc-section className="scroll-mt-28 mb-9">
            <p className="text-[15px] sm:text-[16px] font-normal leading-[2.1] text-slate-700">
              {article.introduction}
            </p>
          </div>

          {/* Body Sections */}
          <div className="flex flex-col gap-11">
            {article.sections.map((section, idx) => (
              <section
                key={section.id || idx}
                id={section.id}
                data-toc-section
                className="scroll-mt-28 flex flex-col gap-4"
              >
                <h2 className="text-[20px] sm:text-[22px] font-black text-slate-950 tracking-tight leading-snug pt-1">
                  {section.heading}
                </h2>

                <div className="flex flex-col gap-3.5">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-[14.5px] sm:text-[15px] font-normal leading-[2.15] text-slate-700">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Callout Box */}
                {section.callout && (
                  <div className="my-2 rounded-2xl border border-sky-500/20 bg-sky-50/70 p-4 text-[13.5px] font-medium text-sky-950 leading-relaxed">
                    {section.callout}
                  </div>
                )}

                {/* Pull Quote */}
                {section.pullQuote && (
                  <blockquote className="my-3 border-s-4 border-slate-950 ps-4 py-1 italic font-medium text-[15px] text-slate-900 leading-relaxed bg-slate-50/80 rounded-e-xl">
                    {section.pullQuote}
                  </blockquote>
                )}

                {/* Numbered Steps */}
                {section.numberedSteps && (
                  <div className="grid grid-cols-1 gap-3 my-2">
                    {section.numberedSteps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50"
                      >
                        <span className="font-mono text-xs font-bold text-sky-600 bg-sky-100 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                          {step.step}
                        </span>
                        <div>
                          <h3 className="text-[14px] font-bold text-slate-900 mb-1">{step.title}</h3>
                          <p className="text-[13px] text-slate-600 leading-relaxed">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparison Table */}
                {section.table && (
                  <div className="my-3 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-start text-[13px]">
                      <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200">
                        <tr>
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 text-start">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 text-slate-700 leading-relaxed">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Interactive Widgets from Vibekit */}
                {section.widget === 'spring-simulator' && <SpringPhysicsSimulator />}
                {section.widget === 'spring-predictor' && <SpringPredictorWidget />}
                {section.widget === 'magnetic-walkthrough' && <MagneticStepWalkthrough />}
                {section.widget === 'live-artifact' && <LiveArtifactPlayground />}
                {section.widget === 'micro-quiz' && <MicroQuizWidget />}
              </section>
            ))}
          </div>

          {/* Semantic FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section className="mt-14 pt-8 border-t border-slate-200">
              <h2 className="text-[20px] font-black text-slate-950 mb-5">
                {lang === 'fa' ? 'پرسش‌های متداول این مبحث' : 'Frequently Asked Questions'}
              </h2>
              <div className="flex flex-col gap-3.5">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
                    <h3 className="text-[14.5px] font-bold text-slate-900 mb-2">{item.question}</h3>
                    <p className="text-[13.5px] text-slate-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Services Links */}
          {article.relatedServices && article.relatedServices.length > 0 && (
            <div className="mt-10 p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {lang === 'fa' ? 'خدمات مرتبط حس‌لب' : 'Related HesLab Services'}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {article.relatedServices.map((srv, idx) => (
                  <Link
                    key={idx}
                    to={srv.path}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-800 hover:text-sky-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full transition-colors"
                  >
                    <span>{srv.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Conversion CTA Block */}
          {article.cta && (
            <div className="mt-12 p-7 sm:p-9 rounded-3xl bg-slate-950 text-white flex flex-col items-center text-center shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">{article.cta.title}</h3>
              <p className="text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">{article.cta.subtitle}</p>
              <Link
                to={article.cta.link}
                onClick={() => trackEvent('primary_cta_click', { source: 'resource_detail_cta' })}
                className="bg-[#00A7F5] hover:bg-[#0096DC] text-white text-[14.5px] font-medium px-7 py-3 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                {article.cta.buttonText}
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
