import { useRef, useState, useEffect, type FC } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollDistance = -rect.top;
            const maxScroll = rect.height - window.innerHeight;
            if (maxScroll > 0) {
              const progress = Math.min(Math.max(scrollDistance / maxScroll, 0), 1);
              setScrollProgress(progress);
            } else {
              setScrollProgress(0);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Zoom progression curve: reaches maximum effect around 82% of scroll track
  const p = Math.min(scrollProgress / 0.82, 1);
  const zoomEase = 1 - Math.pow(1 - p, 2.2);

  // 1. BACKGROUND DEPTH PLANE (Deep in space: stays crisp and in focus, subtle 16% zoom)
  const card1Style = {
    transform: `scale(${1 + zoomEase * 0.16}) translate3d(${-zoomEase * 65}px, ${-zoomEase * 40}px, 0)`,
    filter: zoomEase > 0.1 ? `blur(${(zoomEase * 0.8).toFixed(1)}px)` : 'none',
    opacity: 1 - zoomEase * 0.08,
    willChange: 'transform, filter, opacity',
  };

  // 2. MIDGROUND DEPTH PLANE (Upper right, medium zoom, moderate depth blur)
  const card2Style = {
    transform: `scale(${1 + zoomEase * 0.48}) translate3d(${zoomEase * 145}px, ${-zoomEase * 60}px, 0)`,
    filter: zoomEase > 0.05 ? `blur(${(zoomEase * 3.8).toFixed(1)}px)` : 'none',
    opacity: 1 - zoomEase * 0.35,
    willChange: 'transform, filter, opacity',
  };

  // 3. FOREGROUND FLY-PAST PLANE (Right flank: rushes right past camera lens with huge 2.25x zoom & heavy bokeh blur)
  const card3Style = {
    transform: `scale(${1 + zoomEase * 1.25}) translate3d(${zoomEase * 270}px, ${-zoomEase * 20}px, 0)`,
    filter: zoomEase > 0.03 ? `blur(${(zoomEase * 11.5).toFixed(1)}px)` : 'none',
    opacity: Math.max(0, 1 - zoomEase * 1.15),
    willChange: 'transform, filter, opacity',
  };

  // 4. BACKGROUND DEPTH PLANE (Lower right: anchors the bottom scene, sharp and clear)
  const card4Style = {
    transform: `scale(${1 + zoomEase * 0.22}) translate3d(${zoomEase * 75}px, ${-zoomEase * 25}px, 0)`,
    filter: zoomEase > 0.1 ? `blur(${(zoomEase * 1.2).toFixed(1)}px)` : 'none',
    opacity: Math.max(0, 1 - zoomEase * 0.25),
    willChange: 'transform, filter, opacity',
  };

  // 5. MIDGROUND DEPTH PLANE (Lower left: dynamic angle, medium-high zoom and blur)
  const card5Style = {
    transform: `scale(${1 + zoomEase * 0.62}) translate3d(${-zoomEase * 165}px, ${-zoomEase * 25}px, 0)`,
    filter: zoomEase > 0.05 ? `blur(${(zoomEase * 5.5).toFixed(1)}px)` : 'none',
    opacity: Math.max(0, 1 - zoomEase * 0.7),
    willChange: 'transform, filter, opacity',
  };

  // 6. FOREGROUND FLY-PAST PLANE (Left flank: rushes right past camera lens with huge 2.3x zoom & heavy bokeh blur)
  const card6Style = {
    transform: `scale(${1 + zoomEase * 1.3}) translate3d(${-zoomEase * 280}px, ${-zoomEase * 20}px, 0)`,
    filter: zoomEase > 0.03 ? `blur(${(zoomEase * 12.0).toFixed(1)}px)` : 'none',
    opacity: Math.max(0, 1 - zoomEase * 1.15),
    willChange: 'transform, filter, opacity',
  };

  // Central headline camera depth (subtle 5% scale)
  const centerStyle = {
    transform: `scale(${1 + zoomEase * 0.05})`,
    willChange: 'transform',
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[175vh] sm:h-[185vh] lg:h-[195vh] select-none bg-white"
    >
      {/* Sticky Full-Viewport Hero Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pt-16 sm:pt-20 pb-10 px-4 bg-white">
        {/* ========================================================= */}
        {/* 3D FLOATING VIDEO CARDS WITH MOUSE PARALLAX + SCROLL ZOOM */}
        {/* ========================================================= */}
        <Floating sensitivity={0.35} easingFactor={0.04} className="max-w-[1550px] mx-auto pointer-events-none">
          
          {/* 1. TOP-LEFT CARD (Inner Lane: Top) */}
          <FloatingElement depth={0.8} className="top-[3%] sm:top-[4%] lg:top-[5%] left-[8%] sm:left-[10%] lg:left-[12%] xl:left-[13.5%]">
            <div style={card1Style}>
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
            <div style={card2Style}>
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
            <div style={card3Style}>
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
            <div style={card4Style}>
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
            <div style={card5Style}>
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
            <div style={card6Style}>
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
          style={centerStyle}
          className="relative z-20 max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center text-center px-4 my-auto -translate-y-7 sm:-translate-y-9"
        >
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[60px] font-black tracking-tight text-slate-950 leading-[1.25] sm:leading-[1.2] flex flex-col items-center justify-center font-['Plus_Jakarta_Display',sans-serif] select-none">
            {/* LINE 1 */}
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <span>Good ideas</span>
            </div>

            {/* LINE 2 (Rolling View Counter Inline: 'deserve great edits' -> 'deserve [Eye] 550K edits') */}
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-1 sm:mt-1.5 whitespace-nowrap">
              <span>deserve</span>
              <RollingViewCounter />
            </div>
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
      </div>
    </section>
  );
};

