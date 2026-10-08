import { useRef, useState, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
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

  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  const card6Ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTransforms = (progress: number) => {
      const zoomEase = 1 - Math.pow(1 - progress, 1.8);
      const exitProgress = Math.max(0, (progress - 0.35) / 0.65);
      const exitEase = Math.pow(exitProgress, 1.6);
      const exitY = exitEase * 170;

      if (card1Ref.current) {
        card1Ref.current.style.transform = `scale(${1 + zoomEase * 0.18}) translate3d(${-zoomEase * 70}px, ${-zoomEase * 40 - exitY * 1.1}px, 0)`;
        card1Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 0.08 - exitEase * 0.6));
      }
      if (card2Ref.current) {
        card2Ref.current.style.transform = `scale(${1 + zoomEase * 0.52}) translate3d(${zoomEase * 150}px, ${-zoomEase * 60 - exitY * 1.1}px, 0)`;
        card2Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 0.35 - exitEase * 0.7));
      }
      if (card3Ref.current) {
        card3Ref.current.style.transform = `scale(${1 + zoomEase * 1.35}) translate3d(${zoomEase * 280}px, ${-zoomEase * 20 - exitY * 0.8}px, 0)`;
        card3Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 1.1 - exitEase));
      }
      if (card4Ref.current) {
        card4Ref.current.style.transform = `scale(${1 + zoomEase * 0.25}) translate3d(${zoomEase * 80}px, ${-zoomEase * 25 - exitY * 0.9}px, 0)`;
        card4Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 0.25 - exitEase * 0.75));
      }
      if (card5Ref.current) {
        card5Ref.current.style.transform = `scale(${1 + zoomEase * 0.68}) translate3d(${-zoomEase * 170}px, ${-zoomEase * 25 - exitY * 0.9}px, 0)`;
        card5Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 0.65 - exitEase * 0.8));
      }
      if (card6Ref.current) {
        card6Ref.current.style.transform = `scale(${1 + zoomEase * 1.4}) translate3d(${-zoomEase * 290}px, ${-zoomEase * 20 - exitY * 0.8}px, 0)`;
        card6Ref.current.style.opacity = String(Math.max(0, 1 - zoomEase * 1.1 - exitEase));
      }
      if (centerRef.current) {
        centerRef.current.style.transform = `translate3d(0, ${-exitY}px, 0) scale(${1 + zoomEase * 0.06})`;
        centerRef.current.style.opacity = String(Math.max(0, 1 - exitEase * 0.92));
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollDistance = -rect.top;
            const maxScroll = rect.height - window.innerHeight;
            if (maxScroll > 0) {
              const progress = Math.min(Math.max(scrollDistance / maxScroll, 0), 1);
              updateTransforms(progress);
            } else {
              updateTransforms(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransforms(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[155vh] sm:h-[165vh] lg:h-[175vh] select-none bg-white"
    >
      {/* Sticky Full-Viewport Hero Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-16 sm:pt-20 pb-10 px-4 bg-white">
        {/* ========================================================= */}
        {/* 3D FLOATING VIDEO CARDS WITH MOUSE PARALLAX + SCROLL ZOOM */}
        {/* ========================================================= */}
        <Floating sensitivity={0.35} easingFactor={0.04} className="max-w-[1550px] mx-auto pointer-events-none">
          
          {/* 1. TOP-LEFT CARD (Inner Lane: Top) */}
          <FloatingElement depth={0.8} className="top-[3%] sm:top-[4%] lg:top-[5%] left-[8%] sm:left-[10%] lg:left-[12%] xl:left-[13.5%]">
            <div ref={card1Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-1">
                <PerspectiveVideoCard
                  video="/videos/video_1.mp4"
                  poster="/mock/work_vertical_1.webp"
                  className="w-[115px] sm:w-[130px] lg:w-[145px] xl:w-[160px]"
                  defaultTransform="perspective(1100px) rotateX(15deg) rotateY(-11deg) rotateZ(-6deg)"
                  hoverTransform="perspective(1100px) rotateX(4deg) rotateY(-4deg) rotateZ(-2deg) scale(1.06)"
                  aspect="aspect-[9/16]"
                />
              </div>
            </div>
          </FloatingElement>

          {/* 2. TOP-RIGHT CARD (Inner Lane: Top) */}
          <FloatingElement depth={1.2} className="top-[3%] sm:top-[4%] lg:top-[5%] right-[7%] sm:right-[9%] lg:right-[11%] xl:right-[12.5%]">
            <div ref={card2Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-4">
                <PerspectiveVideoCard
                  video="/videos/video_2.mp4"
                  poster="/mock/work_vertical_2.webp"
                  className="w-[130px] sm:w-[150px] lg:w-[170px] xl:w-[190px]"
                  defaultTransform="perspective(1100px) rotateX(15deg) rotateY(11deg) rotateZ(6deg)"
                  hoverTransform="perspective(1100px) rotateX(4deg) rotateY(4deg) rotateZ(2deg) scale(1.06)"
                  aspect="aspect-[16/11]"
                />
              </div>
            </div>
          </FloatingElement>

          {/* 3. FAR-RIGHT-MID CARD (Outer Lane: Mid Flank) */}
          <FloatingElement depth={0.6} className="top-[48%] -translate-y-1/2 right-[0%] lg:right-[0.5%] xl:right-[1%] hidden sm:block">
            <div ref={card3Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-2">
                <PerspectiveVideoCard
                  video="/videos/video_3.mp4"
                  poster="/mock/work_vertical_3.webp"
                  className="w-[110px] sm:w-[120px] lg:w-[135px] xl:w-[150px]"
                  defaultTransform="perspective(1100px) rotateX(4deg) rotateY(-18deg) rotateZ(-2deg)"
                  hoverTransform="perspective(1100px) rotateX(0deg) rotateY(-4deg) rotateZ(0deg) scale(1.06)"
                  aspect="aspect-[9/16]"
                />
              </div>
            </div>
          </FloatingElement>

          {/* 4. BOTTOM-RIGHT CARD (Inner Lane: Bottom) */}
          <FloatingElement depth={1.3} className="bottom-[2.5%] sm:bottom-[3%] lg:bottom-[4%] right-[7%] sm:right-[9%] lg:right-[11%] xl:right-[12.5%]">
            <div ref={card4Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-3">
                <PerspectiveVideoCard
                  video="/videos/video_4.mp4"
                  poster="/mock/work_4.webp"
                  className="w-[115px] sm:w-[130px] lg:w-[145px] xl:w-[160px]"
                  defaultTransform="perspective(1100px) rotateX(-15deg) rotateY(-11deg) rotateZ(5deg)"
                  hoverTransform="perspective(1100px) rotateX(-4deg) rotateY(-4deg) rotateZ(2deg) scale(1.06)"
                  aspect="aspect-[9/16]"
                />
              </div>
            </div>
          </FloatingElement>

          {/* 5. BOTTOM-LEFT CARD (Inner Lane: Bottom) */}
          <FloatingElement depth={0.9} className="bottom-[2.5%] sm:bottom-[3%] lg:bottom-[4%] left-[8%] sm:left-[10%] lg:left-[12%] xl:left-[13.5%]">
            <div ref={card5Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-2">
                <PerspectiveVideoCard
                  video="/videos/video_5.mp4"
                  poster="/mock/work_5.webp"
                  className="w-[115px] sm:w-[130px] lg:w-[145px] xl:w-[160px]"
                  defaultTransform="perspective(1100px) rotateX(-15deg) rotateY(11deg) rotateZ(-5deg)"
                  hoverTransform="perspective(1100px) rotateX(-4deg) rotateY(4deg) rotateZ(-2deg) scale(1.06)"
                  aspect="aspect-[9/16]"
                />
              </div>
            </div>
          </FloatingElement>

          {/* 6. FAR-LEFT-MID CARD (Outer Lane: Mid Flank) */}
          <FloatingElement depth={1.0} className="top-[48%] -translate-y-1/2 left-[0%] lg:left-[0.5%] xl:left-[1%] hidden sm:block">
            <div ref={card6Ref} style={{ willChange: 'transform, opacity' }}>
              <div className="animate-float-3">
                <PerspectiveVideoCard
                  video="/videos/video_6.mp4"
                  poster="/mock/work_6.webp"
                  className="w-[110px] sm:w-[120px] lg:w-[135px] xl:w-[150px]"
                  defaultTransform="perspective(1100px) rotateX(4deg) rotateY(18deg) rotateZ(2deg)"
                  hoverTransform="perspective(1100px) rotateX(0deg) rotateY(4deg) rotateZ(0deg) scale(1.06)"
                  aspect="aspect-[9/16]"
                />
              </div>
            </div>
          </FloatingElement>

        </Floating>

        {/* ========================================================= */}
        {/* 2. THE CENTRAL HERO CONTENT                               */}
        {/* ========================================================= */}
        <div
          ref={centerRef}
          style={{ willChange: 'transform, opacity' }}
          className="relative z-20 max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center px-4 my-auto -translate-y-7 sm:-translate-y-9"
        >
          {/* Studio Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8F2] text-xs font-bold text-emerald-950 mb-5 select-none transition-all"
          >
            <div className="flex items-center gap-[3.5px] shrink-0" dir="ltr">
              <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500" />
              <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500" />
              <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500/25" />
              <span className="w-[5.5px] h-[5.5px] rounded-full bg-emerald-500/25" />
            </div>
            <span>{t.tag}</span>
          </motion.div>

          {/* Main Headline (STRICTLY 2 LINES ONLY) */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[60px] font-black tracking-tight text-slate-950 leading-[1.25] sm:leading-[1.2] flex flex-col items-center justify-center font-['Plus_Jakarta_Display',sans-serif] select-none"
          >
            {/* LINE 1 */}
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span>Good ideas</span>
            </div>

            {/* LINE 2 (Rolling View Counter Inline: 'deserve great edits' -> 'deserve [Eye] 550K edits') */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-1 sm:mt-1.5 whitespace-nowrap">
              <span>deserve</span>
              <RollingViewCounter />
            </div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed"
          >
            {t.subtitle || (
              <>
                {t.subLine1} <br />
                <span className="text-slate-950 font-bold">{t.subLine2}</span>
              </>
            )}
          </motion.p>

          {/* Action Buttons: [ View our work ] [ Pricing ] */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#work"
              className="px-6 py-3 rounded-[12px] bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
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
              className="px-6 py-3 rounded-[12px] border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs hover:shadow-xs"
            >
              {t.pricingBtn}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

