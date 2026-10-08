import { useState, useRef, useEffect, type FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VolumeHigh, VolumeCross, Play, Pause, ArrowRight, ArrowLeft } from 'iconsax-react';
import { getProjectBySlug } from '../data/projects';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { generateVideoSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
import { analytics } from '../lib/analytics';
import { playBenchoSound } from '../content/soundData';

export const ProjectDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, isRtl } = useLanguage();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (project) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      analytics.trackWorkView({
        work_slug: project.slug,
        work_title: lang === 'fa' ? project.titleFa : project.titleEn,
        work_type: project.category,
        service_type: project.tag,
        page_path: `/work/${project.slug}`,
      });
    }
  }, [project, lang]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    playBenchoSound('switch');
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-3">{lang === 'fa' ? 'پروژه مورد نظر یافت نشد' : 'Project Not Found'}</h1>
        <p className="text-slate-600 mb-6 text-sm">
          {lang === 'fa' ? 'لطفاً لیست کامل نمونه‌کارهای حس‌لب را بررسی کنید.' : 'Please check our complete portfolio.'}
        </p>
        <Link
          to="/work"
          className="bg-slate-950 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          {lang === 'fa' ? 'مشاهده همه نمونه‌کارها' : 'All Work'}
        </Link>
      </div>
    );
  }

  const videoSchema = generateVideoSchema({
    name: lang === 'fa' ? project.titleFa : project.titleEn,
    description: lang === 'fa' ? project.descriptionFa : project.descriptionEn,
    thumbnailUrl: project.image,
    uploadDate: project.uploadDate,
    contentUrl: project.video,
    duration: project.durationIso,
  });

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-24 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? `${project.titleFa} | نمونه‌کار تدوین حس‌لب` : `${project.titleEn} | HesLab Portfolio`}
        description={lang === 'fa' ? project.descriptionFa : project.descriptionEn}
        path={`/work/${project.slug}`}
        ogImage={project.image}
        ogType="video.other"
        structuredData={videoSchema}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'نمونه‌کارها' : 'Work', path: '/work' },
            { name: lang === 'fa' ? project.titleFa : project.titleEn, path: `/work/${project.slug}` },
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors"
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{lang === 'fa' ? 'بازگشت به همه نمونه‌کارها' : 'Back to Portfolio'}</span>
          </Link>
        </div>

        {/* Main Title H1 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-[1.3] mb-4">
          {lang === 'fa' ? project.titleFa : project.titleEn}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-8 border-b border-slate-200 pb-5">
          <span className="font-semibold text-slate-800">{lang === 'fa' ? project.creatorFa : project.creatorEn}</span>
          <span>•</span>
          <span className="bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-md font-mono font-semibold">{project.tag}</span>
          <span>•</span>
          <span>{project.views} بازدید ثبت‌شده</span>
          <span>•</span>
          <span>کیفیت {project.resolution}</span>
        </div>

        {/* Video Player & Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Vertical Video Showcase */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-950 shadow-2xl relative border border-slate-200">
              <video
                ref={videoRef}
                src={project.video}
                poster={project.image}
                muted={isMuted}
                autoPlay
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />

              {/* Player Controls Overlay */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="size-10 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                  aria-label={isPlaying ? 'توقف' : 'پخش'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  type="button"
                  onClick={toggleSound}
                  className="size-10 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                  aria-label={isMuted ? 'وصل صدا' : 'قطع صدا'}
                >
                  {isMuted ? <VolumeCross size={18} /> : <VolumeHigh size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Project Specs & Technical Details */}
          <div className="md:col-span-7 flex flex-col gap-6">
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50/70">
              <h2 className="text-lg font-bold text-slate-950 mb-3">
                {lang === 'fa' ? 'مشخصات فنی ویدیوی نهایی' : 'Technical Delivery Specs'}
              </h2>

              <dl className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <dt className="text-slate-400 font-medium mb-1">{lang === 'fa' ? 'مدت زمان' : 'Duration'}</dt>
                  <dd className="font-bold text-slate-800 font-mono">{project.durationSeconds} ثانیه ({project.durationIso})</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium mb-1">{lang === 'fa' ? 'نسبت ابعاد' : 'Aspect Ratio'}</dt>
                  <dd className="font-bold text-slate-800 font-mono">{project.aspectRatio} (عمودی موبایل)</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium mb-1">{lang === 'fa' ? 'رزولوشن خروجی' : 'Resolution'}</dt>
                  <dd className="font-bold text-slate-800 font-mono">{project.resolution}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium mb-1">{lang === 'fa' ? 'تاریخ تحویل' : 'Delivered Date'}</dt>
                  <dd className="font-bold text-slate-800 font-mono">{project.uploadDate}</dd>
                </div>
              </dl>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-slate-950 mb-2">
                {lang === 'fa' ? 'درباره این پروژه و چالش‌های تدوین' : 'Project Background & Objectives'}
              </h2>
              <p className="text-[14.5px] text-slate-700 leading-relaxed">
                {lang === 'fa' ? project.descriptionFa : project.descriptionEn}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                {lang === 'fa' ? 'شاخصه‌های برجسته ادیت حس‌لب' : 'Key Editing Highlights'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(lang === 'fa' ? project.featuresFa : project.featuresEn).map((f, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200"
                  >
                    ✦ {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps Implemented */}
        <section className="py-8 border-t border-slate-200 mb-12">
          <h2 className="text-xl font-bold text-slate-950 mb-6">
            {lang === 'fa' ? 'مراحل اجرای تدوین این اثر' : 'Execution Workflow Breakdown'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(lang === 'fa' ? project.workflowStepsFa : project.workflowStepsEn).map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 bg-white flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-md shrink-0">
                  0{idx + 1}
                </span>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col items-center text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black mb-2 text-white">
            {lang === 'fa' ? 'فوتیج مشابهی دارید که می‌خواهید تدوین شود؟' : 'Have Similar Footage Ready to Edit?'}
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
            {lang === 'fa'
              ? 'فایل‌های خام خود را ارسال کنید تا با همان دقت، هوک و طراحی صدای سینمایی ویدیوی شما را تدوین کنیم.'
              : 'Send your raw recording link to receive a tailored turnaround time and cost estimate.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              data-analytics="primary-cta"
              data-analytics-name="start_a_project"
              data-analytics-location="work"
              onClick={() =>
                analytics.trackPrimaryCta({
                  cta_name: 'start_a_project',
                  cta_location: 'work',
                  work_slug: project.slug,
                  page_path: `/work/${project.slug}`,
                  page_type: 'work_detail',
                })
              }
              className="bg-[#5566FF] hover:bg-[#4859F5] text-white text-[14.5px] font-semibold px-7 h-[46px] rounded-[14px] border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center select-none"
            >
              {lang === 'fa' ? 'سفارش تدوین این سبک' : 'Request This Editing Style'}
            </Link>
            <Link
              to="/services/short-form-video-editing"
              onClick={() => {
                analytics.trackContentNavigation({
                  discovery_type: 'work_to_service',
                  from_type: 'work',
                  from_slug: project.slug,
                  to_type: 'service',
                  to_slug: 'short-form-video-editing',
                  page_path: `/work/${project.slug}`,
                });
              }}
              className="bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold px-6 h-[46px] rounded-[14px] transition-all cursor-pointer inline-flex items-center justify-center"
            >
              {lang === 'fa' ? 'جزییات سرویس شورتس' : 'View Service Details'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
