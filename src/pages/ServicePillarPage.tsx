import { useEffect, type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { getProjectBySlug } from '../data/projects';
import { SEOHead } from '../components/seo/SEOHead';
import { generateServiceSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
import { analytics } from '../lib/analytics';
import { ContentOpportunityCalculator } from '../components/tools/ContentOpportunityCalculator';
import {
  CardGrid,
  FAQBlock,
  PRIMARY_BTN,
  ProcessBlock,
  ServiceSection,
} from '../components/service-article/ServiceArticleBlocks';
import { CTACard, KeyTakeaways } from '../components/service-article/ArticleBlocks';

const SERVICE_EMOJI_BY_SLUG: Record<string, string> = {
  'short-form-video-editing': '/emojis/clapper_board.png',
  'instagram-reels-editing': '/emojis/clapper_board.png',
  'youtube-shorts-editing': '/emojis/clapper_board.png',
  'social-media-video-editing': '/emojis/clapper_board.png',
  'personal-brand-video-editing': '/emojis/artist_palette.png',
  'podcast-video-editing': '/emojis/headphone.png',
  'content-repurposing': '/emojis/package.png',
  'motion-design': '/emojis/sparkles.png',
  'ongoing-video-content': '/emojis/package.png',
  'video-brand-style': '/emojis/artist_palette.png',
  'brand-visual-style': '/emojis/artist_palette.png',
  'motion-design-short-videos': '/emojis/sparkles.png',
  'sound-design-video-editing': '/emojis/headphone.png',
  'sound-design': '/emojis/headphone.png',
  'cinematic-video-editing': '/emojis/movie_camera.png',
  'content-packs-video-editing': '/emojis/package.png',
};

export const ServicePillarPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRtl } = useLanguage();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const fa = lang === 'fa';

  useEffect(() => {
    if (service) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      analytics.trackServiceView({
        service_slug: service.slug,
        service_name: fa ? service.nameFa : service.nameEn,
        service_type: service.serviceType,
        page_path: service.path,
      });
    }
  }, [service, fa]);

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 pb-20 pt-32 text-center text-slate-900">
        <h1 className="mb-3 text-2xl font-bold">{fa ? 'سرویس مورد نظر یافت نشد' : 'Service Not Found'}</h1>
        <p className="mb-6 text-sm text-slate-600">
          {fa ? 'لطفاً لیست خدمات حس‌لب را بررسی کنید.' : 'Please check our services list.'}
        </p>
        <Link to="/services" className={PRIMARY_BTN}>
          {fa ? 'مشاهده همه خدمات' : 'All Services'}
        </Link>
      </div>
    );
  }

  const name = fa ? service.nameFa : service.nameEn;
  const faqs = fa ? service.faqsFa : service.faqsEn;

  const structuredData = [
    generateServiceSchema({
      name,
      description: fa ? service.metaDescriptionFa : service.metaDescriptionEn,
      path: service.path,
      serviceType: service.serviceType,
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  const relatedProjects = service.relatedWorkSlugs.map((s) => getProjectBySlug(s)).filter(Boolean);
  const relatedResources = service.relatedResourceSlugs.map((s) => getResourceBySlug(s)).filter(Boolean);

  const approach = fa ? service.editingApproachFa : service.editingApproachEn;
  const beforeAfter = fa ? service.beforeAfterFa : service.beforeAfterEn;
  const philosophy = fa ? service.philosophyFa : service.philosophyEn;
  const pricing = fa ? service.pricingGuidanceFa : service.pricingGuidanceEn;

  const approachItems = approach
    ? [
        { title: fa ? 'مهندسی هوک ثانیه اول' : 'Frame-zero hook', text: approach.hook },
        { title: fa ? 'ریتم و حذف مکث‌ها' : 'Narrative pacing', text: approach.pacing },
        { title: fa ? 'زیرنویس کینتیک و هایلایت' : 'Kinetic subtitles', text: approach.captions },
        { title: fa ? 'طراحی صدای لامسه' : 'Tactile sound design', text: approach.sound },
        { title: fa ? 'موشن گرافیک و هدایت نگاه' : 'Motion graphics and eye gaze', text: approach.motion },
      ]
    : [];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white pb-20 pt-28 text-slate-900 ${fa ? 'font-fa' : 'font-en'}`}
    >
      <SEOHead
        title={fa ? `${service.nameFa} برای کریتورها و برندها` : `${service.nameEn} for Creators & Brands`}
        description={fa ? service.metaDescriptionFa : service.metaDescriptionEn}
        path={service.path}
        structuredData={structuredData}
        jsonLdId="service-pillar-schema"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 page-article-zoom">
        {/* Hero: centered clean title with emoji + name + description */}
        <header className="flex flex-col items-center text-center mx-auto max-w-3xl">
          <div className="mb-4 sm:mb-5">
            <img
              src={SERVICE_EMOJI_BY_SLUG[service.slug] || '/emojis/clapper_board.png'}
              alt={name}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain select-none"
            />
          </div>
          <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-950 sm:text-5xl">
            {name}
          </h1>
          <p className={`mt-4 sm:mt-5 text-[17px] sm:text-[19px] text-slate-600 font-medium max-w-2xl ${fa ? 'leading-[2]' : 'leading-[1.7]'}`}>
            {fa ? service.metaDescriptionFa : service.metaDescriptionEn}
          </p>
        </header>

        <ServiceSection id="who" heading={fa ? 'این سرویس برای چه کسانی است؟' : 'Who this service is for'}>
          <CardGrid
            items={(fa ? service.whoItsForFa : service.whoItsForEn).map((a) => ({ title: a.title, text: a.desc }))}
          />
        </ServiceSection>

        <ServiceSection
          id="included"
          heading={fa ? 'در هر پروژه چه چیزی تحویل داده می‌شود؟' : "What's included in every project"}
        >
          <div className="max-w-3xl">
            <KeyTakeaways
              title={fa ? 'شامل' : 'Included'}
              items={fa ? service.whatsIncludedFa : service.whatsIncludedEn}
            />
          </div>
        </ServiceSection>

        {approach && (
          <ServiceSection
            id="approach"
            heading={fa ? 'رویکرد ۵ لایهٔ ما برای توجه و ماندگاری' : 'How we keep people watching'}
            intro={fa ? 'پنج لایه‌ای که روی هر ادیت کار می‌کنیم.' : 'Five layers we work on in every edit.'}
          >
            <CardGrid items={approachItems} />
          </ServiceSection>
        )}

        <ServiceSection id="philosophy" heading={philosophy.heading}>
          <p className={`max-w-3xl text-[17px] text-slate-600 ${fa ? 'leading-[2]' : 'leading-[1.8]'}`}>{philosophy.body}</p>
        </ServiceSection>

        <ServiceSection
          id="workflow"
          heading={fa ? 'جریان کار ۴ مرحله‌ای' : 'Our 4-step workflow'}
          intro={
            fa
              ? 'فرآیندی سریع و شفاف، بدون جلسه‌های اضافه.'
              : 'Asynchronous and streamlined, so you spend no time in unnecessary meetings.'
          }
        >
          <ProcessBlock steps={(fa ? service.workflowFa : service.workflowEn).map((w) => ({ title: w.title, text: w.desc }))} />
        </ServiceSection>

        {beforeAfter && (
          <ServiceSection
            id="before-after"
            heading={fa ? 'قبل و بعد از تدوین حس‌لب' : 'Before and after'}
            intro={
              fa
                ? 'یک نمونه از اینکه فوتیج خام چطور به محتوای پرماندگار تبدیل می‌شود.'
                : 'A breakdown of how raw footage becomes high-retention content.'
            }
          >
            <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
              <div className="rounded-[24px] bg-[#FDEBEC] p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wide text-rose-700/80">
                  {fa ? 'قبل: فوتیج خام' : 'Before: raw footage'}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{beforeAfter.beforeState}</p>
              </div>
              <div className="rounded-[24px] bg-[#FFF4D8] p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wide text-amber-800/80">
                  {fa ? 'تصمیم‌های ادیت' : 'What we change'}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{beforeAfter.editingDecisions}</p>
              </div>
              <div className="rounded-[24px] bg-[#E6F5EB] p-6">
                <h3 className="text-[15px] font-bold uppercase tracking-wide text-emerald-800/80">
                  {fa ? 'بعد: خروجی نهایی' : 'After: final result'}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{beforeAfter.finalOutcome}</p>
              </div>
            </div>
          </ServiceSection>
        )}

        {(service.slug === 'content-repurposing' || service.slug === 'podcast-video-editing') && (
          <section className="mt-14 sm:mt-20">
            <ContentOpportunityCalculator />
          </section>
        )}

        {relatedProjects.length > 0 && (
          <ServiceSection id="work" heading={fa ? 'نمونه‌کارهای مرتبط' : 'Related work'}>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {relatedProjects.map(
                (proj) =>
                  proj && (
                    <Link key={proj.slug} to={`/work/${proj.slug}`} className="group block">
                      <div className="aspect-[9/16] overflow-hidden rounded-[22px] bg-zinc-900">
                        <img
                          src={proj.image}
                          alt={fa ? proj.titleFa : proj.titleEn}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <h3 className="mt-3 line-clamp-2 text-[14.5px] font-semibold leading-snug tracking-tight text-slate-900">
                        {fa ? proj.titleFa : proj.titleEn}
                      </h3>
                    </Link>
                  )
              )}
            </div>
          </ServiceSection>
        )}

        <ServiceSection id="pricing" heading={fa ? 'راهنمای قیمت و پلن' : 'Pricing guidance'}>
          <div className="flex flex-col justify-between gap-6 rounded-[26px] bg-[#F4F4F5] p-6 sm:p-8 md:flex-row md:items-center">
            <div className="flex gap-4">
              <img src="/emojis/calendar.png" alt="" className="h-11 w-11 shrink-0 object-contain" loading="lazy" />
              <div>
                <h3 className="text-[19px] font-bold tracking-tight text-slate-950">{pricing.recommendedTier}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">{pricing.details}</p>
                <p className="mt-3 text-[14px] font-semibold text-slate-700">{pricing.turnaround}</p>
              </div>
            </div>
            <Link
              to="/contact"
              data-analytics="primary-cta"
              data-analytics-name="get_a_project_quote"
              data-analytics-location="service_pricing"
              onClick={() =>
                analytics.trackPrimaryCta({
                  cta_name: 'get_a_project_quote',
                  cta_location: 'service_pricing',
                  service_slug: service.slug,
                  page_path: service.path,
                  page_type: 'service_detail',
                })
              }
              className={`${PRIMARY_BTN} shrink-0`}
            >
              {fa ? 'استعلام قیمت دقیق' : 'Request pricing'}
            </Link>
          </div>
        </ServiceSection>

        {relatedResources.length > 0 && (
          <ServiceSection id="resources" heading={fa ? 'راهنماها و مقالات مرتبط' : 'Related guides'}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {relatedResources.map(
                (res) =>
                  res && (
                    <Link
                      key={res.slug}
                      to={`/blog/${res.slug}`}
                      onClick={() =>
                        analytics.trackContentNavigation({
                          discovery_type: 'service_to_resource',
                          from_type: 'service',
                          from_slug: service.slug,
                          to_type: 'resource',
                          to_slug: res.slug,
                          page_path: service.path,
                        })
                      }
                      className="group flex flex-col justify-between rounded-[22px] bg-[#F4F4F5] p-6 transition-colors duration-300 hover:bg-[#EBEBED]"
                    >
                      <div>
                        <span className="text-[12.5px] font-semibold text-slate-500">{res.readingTime}</span>
                        <h3 className="mt-2 text-[17px] font-bold leading-snug tracking-tight text-slate-950">{res.title}</h3>
                        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-slate-600">{res.excerpt}</p>
                      </div>
                      <span className="mt-5 text-[13.5px] font-semibold text-slate-950">
                        {fa ? 'مطالعه مقاله' : 'Read article'} {isRtl ? '←' : '→'}
                      </span>
                    </Link>
                  )
              )}
            </div>
          </ServiceSection>
        )}

        <ServiceSection id="faq" heading={fa ? 'پرسش‌های متداول' : 'Frequently asked questions'}>
          <FAQBlock items={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </ServiceSection>

        <CTACard
          title={fa ? 'آماده‌اید ویدیوی بعدی‌تان ادیت شود؟' : 'Ready for your next edit?'}
          text={
            fa
              ? 'فوتیج خام خود را بفرستید یا برای یک همکاری ماهانه با ظرفیت اختصاصی صحبت کنیم.'
              : 'Send your raw footage or talk to us about a dedicated monthly pack.'
          }
          buttonText={fa ? 'شروع پروژه' : 'Start a project'}
          to="/contact"
          onClick={() =>
            analytics.trackPrimaryCta({
              cta_name: 'start_a_project',
              cta_location: 'service_footer',
              service_slug: service.slug,
              page_path: service.path,
              page_type: 'service_detail',
            })
          }
        />
      </div>
    </div>
  );
};

export default ServicePillarPage;
