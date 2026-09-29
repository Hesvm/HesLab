import { useRef, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { RollingViewCounter } from './RollingViewCounter';
import { Floating, FloatingElement } from './ParallaxFloating';

interface PerspectiveVideoCardProps {
  video: string;
  poster: string;
  className: string;
  defaultTransform: string;
  hoverTransform: string;
  aspect?: string;
}

const PerspectiveVideoCard: FC<PerspectiveVideoCardProps> = ({
  video,
  poster,
  className,
  defaultTransform,
  hoverTransform,
  aspect = 'aspect-[9/16]',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto cursor-pointer transition-all duration-500 ease-out group ${className}`}
      style={{
        transform: defaultTransform,
        transformStyle: 'preserve-3d',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = hoverTransform;
        e.currentTarget.style.zIndex = '30';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = defaultTransform;
        e.currentTarget.style.zIndex = '10';
      }}
    >
      <div
        className={`w-full ${aspect} rounded-[22px] lg:rounded-[28px] bg-slate-950 overflow-hidden shadow-[0_24px_55px_rgba(15,23,42,0.07)] group-hover:shadow-[0_35px_70px_rgba(15,23,42,0.12)] relative transition-all duration-500`}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noplaybackrate noremoteplayback"
          preload="metadata"
          className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none group-hover:opacity-10 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export const Hero: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="relative min-h-[780px] lg:min-h-[840px] xl:min-h-[880px] w-full pt-20 sm:pt-24 pb-14 px-4 overflow-hidden flex items-center justify-center select-none bg-white">
      {/* ========================================================= */}
      {/* 3D FLOATING VIDEO CARDS WITH MOUSE PARALLAX PHYSICS        */}
      {/* ========================================================= */}
      <Floating sensitivity={0.35} easingFactor={0.04} className="max-w-[1550px] mx-auto pointer-events-none">
        
        {/* 1. TOP-LEFT CARD (Shifted higher up to partially peek from top edge) */}
        <FloatingElement depth={0.8} className="top-[-6%] sm:top-[-4%] lg:top-[-3%] left-[7%] sm:left-[10%] lg:left-[12%] xl:left-[13%]">
          <div className="animate-float-1">
            <PerspectiveVideoCard
              video="/videos/video_1.mp4"
              poster="/mock/work_vertical_1.webp"
              className="w-[130px] sm:w-[150px] lg:w-[165px] xl:w-[180px]"
              defaultTransform="perspective(1100px) rotateX(15deg) rotateY(-11deg) rotateZ(-6deg)"
              hoverTransform="perspective(1100px) rotateX(4deg) rotateY(-4deg) rotateZ(-2deg) scale(1.06)"
              aspect="aspect-[9/16]"
            />
          </div>
        </FloatingElement>

        {/* 2. TOP-RIGHT CARD (Shifted higher up to partially peek from top edge) */}
        <FloatingElement depth={1.2} className="top-[-4%] sm:top-[-3%] lg:top-[-1.5%] right-[3%] sm:right-[5%] xl:right-[7%]">
          <div className="animate-float-4">
            <PerspectiveVideoCard
              video="/videos/video_2.mp4"
              poster="/mock/work_vertical_2.webp"
              className="w-[140px] sm:w-[165px] lg:w-[185px] xl:w-[205px]"
              defaultTransform="perspective(1100px) rotateX(15deg) rotateY(11deg) rotateZ(6deg)"
              hoverTransform="perspective(1100px) rotateX(4deg) rotateY(4deg) rotateZ(2deg) scale(1.06)"
              aspect="aspect-[16/11]"
            />
          </div>
        </FloatingElement>

        {/* 3. FAR-RIGHT-MID CARD (Outer right flank) */}
        <FloatingElement depth={0.6} className="top-[48%] -translate-y-1/2 right-[0%] lg:right-[1%] xl:right-[2.5%] hidden sm:block">
          <div className="animate-float-2">
            <PerspectiveVideoCard
              video="/videos/video_3.mp4"
              poster="/mock/work_vertical_3.webp"
              className="w-[120px] sm:w-[135px] lg:w-[150px] xl:w-[165px]"
              defaultTransform="perspective(1100px) rotateX(4deg) rotateY(-18deg) rotateZ(-2deg)"
              hoverTransform="perspective(1100px) rotateX(0deg) rotateY(-4deg) rotateZ(0deg) scale(1.06)"
              aspect="aspect-[9/16]"
            />
          </div>
        </FloatingElement>

        {/* 4. BOTTOM-RIGHT CARD (Moved inward per red arrow) */}
        <FloatingElement depth={1.3} className="bottom-[3%] right-[7%] sm:right-[10%] xl:right-[14%]">
          <div className="animate-float-3">
            <PerspectiveVideoCard
              video="/videos/video_4.mp4"
              poster="/mock/work_4.webp"
              className="w-[130px] sm:w-[145px] lg:w-[160px] xl:w-[175px]"
              defaultTransform="perspective(1100px) rotateX(-15deg) rotateY(-11deg) rotateZ(5deg)"
              hoverTransform="perspective(1100px) rotateX(-4deg) rotateY(-4deg) rotateZ(2deg) scale(1.06)"
              aspect="aspect-[9/16]"
            />
          </div>
        </FloatingElement>

        {/* 5. BOTTOM-LEFT CARD (Moved inward per red arrow) */}
        <FloatingElement depth={0.9} className="bottom-[3%] left-[7%] sm:left-[10%] xl:left-[14%]">
          <div className="animate-float-2">
            <PerspectiveVideoCard
              video="/videos/video_5.mp4"
              poster="/mock/work_5.webp"
              className="w-[130px] sm:w-[145px] lg:w-[160px] xl:w-[175px]"
              defaultTransform="perspective(1100px) rotateX(-15deg) rotateY(11deg) rotateZ(-5deg)"
              hoverTransform="perspective(1100px) rotateX(-4deg) rotateY(4deg) rotateZ(-2deg) scale(1.06)"
              aspect="aspect-[9/16]"
            />
          </div>
        </FloatingElement>

        {/* 6. FAR-LEFT-MID CARD (Outer left flank) */}
        <FloatingElement depth={1.0} className="top-[48%] -translate-y-1/2 left-[0%] lg:left-[1%] xl:left-[2.5%] hidden sm:block">
          <div className="animate-float-3">
            <PerspectiveVideoCard
              video="/videos/video_6.mp4"
              poster="/mock/work_6.webp"
              className="w-[120px] sm:w-[135px] lg:w-[150px] xl:w-[165px]"
              defaultTransform="perspective(1100px) rotateX(4deg) rotateY(18deg) rotateZ(2deg)"
              hoverTransform="perspective(1100px) rotateX(0deg) rotateY(4deg) rotateZ(0deg) scale(1.06)"
              aspect="aspect-[9/16]"
            />
          </div>
        </FloatingElement>

      </Floating>

      {/* ========================================================= */}
      {/* 2. THE CENTRAL HERO CONTENT (Strict 2-Line Headline)      */}
      {/* ========================================================= */}
      <div className="relative z-20 max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center px-4 my-auto -translate-y-7 sm:-translate-y-9">
        {/* Studio Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8F2] text-xs font-bold text-emerald-950 mb-5 select-none transition-all">
          <div className="flex items-center gap-[3.5px] shrink-0" dir="ltr">
            <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500" />
            <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500" />
            <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500/25" />
            <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500/25" />
          </div>
          <span>{t.tag}</span>
        </div>

        {/* Main Headline (STRICTLY 2 LINES ONLY) */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-slate-950 leading-[1.35] sm:leading-[1.3] flex flex-col items-center justify-center">
          {lang === 'fa' ? (
            <>
              {/* LINE 1 */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <span>ادیتی که ویدیوت رو</span>
                
                {/* Social Icons Cluster */}
                <span className="inline-flex items-center align-middle mx-1 -translate-y-0.5 gap-1.5 sm:gap-2 shrink-0">
                  {/* TikTok */}
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-[#0A0A0A] shadow-[0_4px_12px_rgba(0,0,0,0.2)] -rotate-3 hover:rotate-0 transition-transform duration-200 shrink-0 border border-white/10">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.54Z" />
                    </svg>
                  </span>

                  {/* Instagram */}
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] shadow-[0_4px_14px_rgba(253,29,29,0.35)] z-10 hover:scale-105 transition-transform duration-200 shrink-0 border border-white/20">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>

                  {/* YouTube Shorts */}
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-[#FF0000] shadow-[0_4px_14px_rgba(255,0,0,0.35)] rotate-3 hover:rotate-0 transition-transform duration-200 shrink-0 border border-white/20">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.77 10.32l-1.2-.5-1.1-.48v-2.3c0-1.63-1.33-2.95-2.96-2.95-.57 0-1.12.16-1.59.45l-4.5 2.6c-1.34.78-1.8 2.5-1.03 3.84.28.48.7.86 1.2 1.09l1.2.5 1.1.48v2.3c0 1.63 1.33 2.95 2.96 2.95.57 0 1.12-.16 1.59-.45l4.5-2.6c1.34-.78 1.8-2.5 1.03-3.84-.28-.48-.7-.86-1.2-1.09zm-7.27 4.18V9.5l4.5 2.5-4.5 2.5z" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* LINE 2 (Rolling View Counter Inline) */}
              <div className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5 whitespace-nowrap">
                <RollingViewCounter />
              </div>
            </>
          ) : (
            <>
              {/* LINE 1 */}
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <span>Short-Form Video Studio</span>
                
                {/* Social Icons Cluster */}
                <span className="inline-flex items-center align-middle mx-1 -translate-y-0.5 gap-1.5 sm:gap-2 shrink-0">
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-[#0A0A0A] shadow-[0_4px_12px_rgba(0,0,0,0.2)] -rotate-3 shrink-0 border border-white/10">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.54Z" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] shadow-[0_4px_14px_rgba(253,29,29,0.35)] shrink-0 border border-white/20">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[9px] sm:rounded-[11px] bg-[#FF0000] shadow-[0_4px_14px_rgba(255,0,0,0.35)] rotate-3 shrink-0 border border-white/20">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.77 10.32l-1.2-.5-1.1-.48v-2.3c0-1.63-1.33-2.95-2.96-2.95-.57 0-1.12.16-1.59.45l-4.5 2.6c-1.34.78-1.8 2.5-1.03 3.84.28.48.7.86 1.2 1.09l1.2.5 1.1.48v2.3c0 1.63 1.33 2.95 2.96 2.95.57 0 1.12-.16 1.59-.45l4.5-2.6c1.34-.78 1.8-2.5 1.03-3.84-.28-.48-.7-.86-1.2-1.09zm-7.27 4.18V9.5l4.5 2.5-4.5 2.5z" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* LINE 2 */}
              <div className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5 whitespace-nowrap">
                <RollingViewCounter />
              </div>
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
          {t.subtitle || (
            <>
              {t.subLine1} <br />
              <span className="text-slate-950 font-bold">{t.subLine2}</span>
            </>
          )}
        </p>

        {/* Action Buttons: [ View our work ] [ Pricing ] */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="px-6 py-3 rounded-[12px] bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{t.viewWorkBtn}</span>
            <svg
              className={`w-3.5 h-3.5 fill-current ${isRtl ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-[12px] border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {t.pricingBtn}
          </a>
        </div>
      </div>
    </section>
  );
};

