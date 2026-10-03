import { useEffect, type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { getProjectBySlug } from '../data/projects';
import { getResourceBySlug } from '../data/resources';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { generateServiceSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { Check } from 'iconsax-react';
import { ContentOpportunityCalculator } from '../components/tools/ContentOpportunityCalculator';

export const ServicePillarPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRtl } = useLanguage();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (service) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      trackEvent('service_view', { serviceId: service.slug, path: service.path });
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-3">{lang === 'fa' ? 'سرویس مورد نظر یافت نشد' : 'Service Not Found'}</h1>
        <p className="text-slate-600 mb-6 text-sm">
          {lang === 'fa' ? 'لطفاً لیست خدمات حس‌لب را بررسی کنید.' : 'Please check our services list.'}
        </p>
        <Link
          to="/services"
          className="bg-slate-950 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {lang === 'fa' ? 'مشاهده همه خدمات' : 'All Services'}
        </Link>
      </div>
    );
  }

  const serviceSchema = generateServiceSchema({
    name: lang === 'fa' ? service.nameFa : service.nameEn,
    description: lang === 'fa' ? service.metaDescriptionFa : service.metaDescriptionEn,
    path: service.path,
    serviceType: service.serviceType,
  });

  const relatedProjects = service.relatedWorkSlugs
    .map((s) => getProjectBySlug(s))
    .filter(Boolean);

  const relatedResources = service.relatedResourceSlugs
    .map((s) => getResourceBySlug(s))
    .filter(Boolean);

  const approach = lang === 'fa' ? service.editingApproachFa : service.editingApproachEn;
  const beforeAfter = lang === 'fa' ? service.beforeAfterFa : service.beforeAfterEn;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-24 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? `${service.nameFa} برای کریتورها و برندها` : `${service.nameEn} for Creators & Brands`}
        description={lang === 'fa' ? service.metaDescriptionFa : service.metaDescriptionEn}
        path={service.path}
        structuredData={serviceSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'خدمات' : 'Services', path: '/services' },
            { name: lang === 'fa' ? service.nameFa : service.nameEn, path: service.path },
          ]}
        />

        {/* Hero Section */}
        <header className="pt-4 pb-12 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold mb-4">
            <span>{lang === 'fa' ? service.heroTagFa : service.heroTagEn}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.25] mb-5">
            {lang === 'fa' ? service.titleFa : service.titleEn}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
            {lang === 'fa' ? service.subtitleFa : service.subtitleEn}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              onClick={() => trackEvent('primary_cta_click', { source: `service_hero_${service.slug}` })}
              className="bg-[#00A7F5] hover:bg-[#0096DC] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              {lang === 'fa' ? 'دریافت برآورد هزینه پروژه' : 'Get a Project Quote'}
            </Link>

            <Link
              to="/work"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'مشاهده نمونه‌کارها' : 'View Selected Work'}
            </Link>
          </div>
        </header>

        {/* Section 1: Who It Is For */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-6">
            {lang === 'fa' ? 'این سرویس برای چه کسانی طراحی شده است؟' : 'Who This Service Is For'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(lang === 'fa' ? service.whoItsForFa : service.whoItsForEn).map((aud, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600 block mb-2">0{idx + 1}</span>
                  <h3 className="text-[15px] font-bold text-slate-950 mb-2">{aud.title}</h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed">{aud.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: What Is Included */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-3">
            {lang === 'fa' ? 'چه مواردی در این سرویس تحویل داده می‌شود؟' : "What's Included in Every Project"}
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            {lang === 'fa'
              ? 'هیچ مرحله پنهان یا هزینه‌ای اضافه در کار نیست؛ تمام خروجی‌ها آماده انتشار با بالاترین استاندارد کیفی هستند.'
              : 'End-to-end polish from audio design to final rendering with zero unexpected costs.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(lang === 'fa' ? service.whatsIncludedFa : service.whatsIncludedEn).map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs"
              >
                <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={13} className="stroke-[3px]" />
                </div>
                <span className="text-[13.5px] text-slate-700 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: The HesLab Editing Approach (Hook, Pacing, Captions, Sound, Motion) */}
        {approach && (
          <section className="py-12 border-b border-slate-200">
            <div className="mb-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                {lang === 'fa' ? 'استاندارد تدوین حس‌لب' : 'The HesLab Standard'}
              </span>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                {lang === 'fa' ? 'رویکرد ۵ لایه‌ای مهندسی توجه و ماندگاری' : 'Our 5-Layer Attention Engineering Approach'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md inline-block mb-2">01. HOOK</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{lang === 'fa' ? 'مهندسی هوک ثانیه اول' : 'Frame-Zero Hook'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{approach.hook}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block mb-2">02. PACING</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{lang === 'fa' ? 'ریتم و حذف مکث‌ها' : 'Narrative Pacing'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{approach.pacing}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md inline-block mb-2">03. CAPTIONS</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{lang === 'fa' ? 'زیرنویس کینتیک و هایلایت' : 'Kinetic Subtitles'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{approach.captions}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-2">04. SOUND</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{lang === 'fa' ? 'طراحی صدای سه‌بعدی و لامسه' : 'Tactile Sound Design'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{approach.sound}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between md:col-span-2 lg:col-span-2">
                <div>
                  <span className="font-mono text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-2">05. MOTION</span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{lang === 'fa' ? 'موشن گرافیک و هدایت نگاه' : 'Motion Graphics & Eye Gaze'}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{approach.motion}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Philosophy */}
        <section className="py-12 border-b border-slate-200">
          <div className="p-7 sm:p-9 rounded-3xl bg-slate-900 text-white shadow-lg">
            <h2 className="text-xl sm:text-2xl font-black mb-4 text-white">
              {lang === 'fa' ? service.philosophyFa.heading : service.philosophyEn.heading}
            </h2>
            <p className="text-[14.5px] sm:text-[15px] text-slate-300 leading-[2.1] max-w-3xl">
              {lang === 'fa' ? service.philosophyFa.body : service.philosophyEn.body}
            </p>
          </div>
        </section>

        {/* Section 5: Workflow */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-2">
            {lang === 'fa' ? 'جریان کار ۴ مرحله‌ای بدون اصطکاک' : 'Our 4-Step Frictionless Workflow'}
          </h2>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            {lang === 'fa'
              ? 'فرآیندی سریع و شفاف که در آن زمان شما تلف نمی‌شود؛ تنها یک درایو ابری و ارتباط مستقیم با تدوین‌گر.'
              : 'Asynchronous, streamlined production designed so you spend zero time in unnecessary meetings.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(lang === 'fa' ? service.workflowFa : service.workflowEn).map((wf, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md inline-block mb-3">
                    {wf.step}
                  </span>
                  <h3 className="text-[14.5px] font-bold text-slate-950 mb-2">{wf.title}</h3>
                  <p className="text-[12.5px] text-slate-600 leading-relaxed">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Before & After Transformation Anatomy */}
        {beforeAfter && (
          <section className="py-12 border-b border-slate-200">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-3">
              {lang === 'fa' ? 'کالبدشکافی تحول ویدیو: قبل و بعد از تدوین حس‌لب' : 'Transformation Anatomy: Before & After HesLab'}
            </h2>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              {lang === 'fa'
                ? 'نمونه‌ای واقعی از چگونگی تبدیل یک راش ضبط‌شده خسته‌کننده به محتوایی با نگه‌داشت بالای ۸۰٪.'
                : 'A tangible breakdown showing how raw unedited footage transforms into high-retention content.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Before State */}
              <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/50">
                <span className="font-mono text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-2">
                  ❌ {lang === 'fa' ? 'وضعیت اولیه فوتیج خام' : 'Raw Before State'}
                </span>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {beforeAfter.beforeState}
                </p>
              </div>

              {/* Editing Interventions */}
              <div className="p-6 rounded-2xl border border-sky-200 bg-sky-50/50">
                <span className="font-mono text-[11px] font-bold text-sky-700 uppercase tracking-wider block mb-2">
                  ⚡️ {lang === 'fa' ? 'مداخلات مهندسی حس‌لب' : 'HesLab Interventions'}
                </span>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {beforeAfter.editingDecisions}
                </p>
              </div>

              {/* Final Outcome */}
              <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                <span className="font-mono text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                  ✅ {lang === 'fa' ? 'خروجی نهایی و ماندگاری' : 'Final High-Yield Result'}
                </span>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                  {beforeAfter.finalOutcome}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Special Embed: ContentOpportunityCalculator for repurposing & podcast services */}
        {(service.slug === 'content-repurposing' || service.slug === 'podcast-video-editing') && (
          <section className="py-12 border-b border-slate-200">
            <ContentOpportunityCalculator />
          </section>
        )}

        {/* Section 7: Related Work Showcase */}
        {relatedProjects.length > 0 && (
          <section className="py-12 border-b border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                {lang === 'fa' ? 'نمونه‌کارهای اجرا شده در این سرویس' : 'Related Work Showcase'}
              </h2>
              <Link to="/work" className="text-xs font-bold text-sky-600 hover:text-sky-700">
                {lang === 'fa' ? 'مشاهده همه' : 'View All'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((proj) => proj && (
                <Link
                  key={proj.slug}
                  to={`/work/${proj.slug}`}
                  className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[9/16] bg-slate-950 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={lang === 'fa' ? proj.titleFa : proj.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-full">
                      {proj.views} ویو
                    </div>
                  </div>
                  <div className="p-3.5">
                    <span className="text-[10px] font-mono text-sky-600 uppercase font-semibold">{proj.tag}</span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1 leading-snug">
                      {lang === 'fa' ? proj.titleFa : proj.titleEn}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 8: Pricing Guidance */}
        <section className="py-12 border-b border-slate-200">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                {lang === 'fa' ? 'راهنمای قیمت‌گذاری و پلن' : 'Pricing Guidance'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                {lang === 'fa' ? service.pricingGuidanceFa.recommendedTier : service.pricingGuidanceEn.recommendedTier}
              </h3>
              <p className="text-[13.5px] text-slate-600 max-w-xl leading-relaxed mb-3">
                {lang === 'fa' ? service.pricingGuidanceFa.details : service.pricingGuidanceEn.details}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                <span>⏱ {lang === 'fa' ? service.pricingGuidanceFa.turnaround : service.pricingGuidanceEn.turnaround}</span>
              </div>
            </div>

            <Link
              to="/contact"
              onClick={() => trackEvent('primary_cta_click', { source: `service_pricing_${service.slug}` })}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3 rounded-full text-center shrink-0 transition-colors cursor-pointer"
            >
              {lang === 'fa' ? 'استعلام قیمت دقیق' : 'Request Pricing'}
            </Link>
          </div>
        </section>

        {/* Section 9: Related Resources */}
        {relatedResources.length > 0 && (
          <section className="py-12 border-b border-slate-200">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-6">
              {lang === 'fa' ? 'راهنماها و مقالات مرتبط' : 'Related Guides & Resources'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedResources.map((res) => res && (
                <Link
                  key={res.slug}
                  to={`/resources/${res.slug}`}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10.5px] font-bold text-slate-400 block mb-1">
                      {res.readingTime}
                    </span>
                    <h3 className="text-[14.5px] font-bold text-slate-950 leading-snug mb-2">
                      {res.title}
                    </h3>
                    <p className="text-[12.5px] text-slate-600 line-clamp-2 leading-relaxed">
                      {res.excerpt}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-sky-600 mt-4 inline-flex items-center gap-1">
                    {lang === 'fa' ? 'مطالعه مقاله' : 'Read Article'} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Section 10: FAQs */}
        <section className="py-12 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-6">
            {lang === 'fa' ? 'پرسش‌های متداول' : 'Frequently Asked Questions'}
          </h2>

          <div className="space-y-4">
            {(lang === 'fa' ? service.faqsFa : service.faqsEn).map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="text-sm font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 11: Final Project CTA */}
        <section className="py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-4">
            {lang === 'fa'
              ? 'آماده‌اید ویدیوی بعدی‌تان با بالاترین استاندارد تدوین شود؟'
              : 'Ready to produce high-retention content?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            {lang === 'fa'
              ? 'فوتیج خام خود را ارسال کنید یا برای یک همکاری ماهانه با ظرفیت اختصاصی صحبت کنیم.'
              : 'Send your raw footage link or schedule a dedicated monthly retainer discussion.'}
          </p>
          <Link
            to="/contact"
            onClick={() => trackEvent('primary_cta_click', { source: `service_footer_${service.slug}` })}
            className="bg-[#00A7F5] hover:bg-[#0096DC] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 inline-block cursor-pointer"
          >
            {lang === 'fa' ? 'ارسال درخواست همکاری و برآورد هزینه' : 'Start a Project with HesLab'}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ServicePillarPage;
