import { useState, useEffect, useRef, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ManifestoScroll: FC = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Progress calculation: starts when entering viewport, completes near center
            const startOffset = windowHeight * 0.85;
            const endOffset = windowHeight * 0.25;
            const current = startOffset - rect.top;
            const total = startOffset - endOffset;
            const progress = Math.min(Math.max(current / total, 0), 1);
            setScrollProgress(progress);
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

  // Helper to calculate opacity per token index
  const getProgress = (index: number, total: number) => {
    const step = index / Math.max(total - 1, 1);
    const val = Math.min(Math.max((scrollProgress * 1.25 - step * 0.9) / 0.18, 0), 1);
    return {
      opacity: 0.2 + 0.8 * val,
      scale: 0.95 + 0.05 * val,
      isLit: val > 0.5,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 px-4 max-w-4xl mx-auto bg-white select-none border-t border-slate-100"
    >
      {/* Small Clean Tag */}
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 text-[11px] font-bold tracking-widest uppercase text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{lang === 'fa' ? 'مانیفست حس‌لب' : 'THE HESLAB MANIFESTO'}</span>
      </div>

      {/* Dynamic Compact Sentence on Pure White Background */}
      {lang === 'fa' ? (
        <div
          dir="rtl"
          className="text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-black tracking-tight leading-[2.1] sm:leading-[2.2] md:leading-[2.3] text-slate-950 text-center"
        >
          {/* Token 1: حس‌لب */}
          <span
            style={{ opacity: getProgress(0, 16).opacity }}
            className="inline-block transition-opacity duration-150 ml-1 text-slate-950"
          >
            حس‌لب
          </span>

          {/* Widget 1: Orange Studio Pill */}
          <span
            style={{
              opacity: getProgress(1, 16).opacity,
              transform: `scale(${getProgress(1, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#E85D35] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Travel%20and%20places/High%20Voltage.png"
              alt="Studio"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain pointer-events-none"
            />
            <span className="text-[9px] text-white/80 font-bold uppercase tracking-wider hidden sm:inline">STUDIO</span>
            <span className="text-[11px] sm:text-xs font-black text-white">تیم شورت‌فرم</span>
          </span>

          {/* Token 2: یه تیم کوچیک */}
          <span
            style={{ opacity: getProgress(2, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            یه تیم کوچیک
          </span>

          {/* Token 3: تولید محتوای */}
          <span
            style={{ opacity: getProgress(3, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            تولید محتوای
          </span>

          {/* Token 4: شورت‌فرم */}
          <span
            style={{ opacity: getProgress(4, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            شورت‌فرم
          </span>

          {/* Widget 2: Red Dial 60 FPS Pill */}
          <span
            style={{
              opacity: getProgress(5, 16).opacity,
              transform: `scale(${getProgress(5, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#D9383A] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <div className="w-2 h-2 rounded-xs bg-white animate-spin" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] font-black tracking-wider" dir="ltr">
              60 FPS
            </span>
          </span>

          {/* Token 5: برای یوتیوب، */}
          <span
            style={{ opacity: getProgress(6, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            برای یوتیوب،
          </span>

          {/* Token 6: اینستاگرام */}
          <span
            style={{ opacity: getProgress(7, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            اینستاگرام
          </span>

          {/* Widget 3: Clapper icon */}
          <span
            style={{
              opacity: getProgress(8, 16).opacity,
              transform: `scale(${getProgress(8, 16).scale})`,
            }}
            className="inline-flex items-center align-middle mx-1 p-1 rounded-lg bg-slate-100 border border-slate-200/80 transition-all duration-200"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Clapper%20Board.png"
              alt="Clapper"
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain pointer-events-none"
            />
          </span>

          {/* Token 7: و تیک‌تاکه. */}
          <span
            style={{ opacity: getProgress(9, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            و تیک‌تاکه.
          </span>

          {/* Token 8: ما تمرکزمون */}
          <span
            style={{ opacity: getProgress(10, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            ما تمرکزمون
          </span>

          {/* Token 9: روی اینه که */}
          <span
            style={{ opacity: getProgress(11, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            روی اینه که
          </span>

          {/* Token 10: چیزی رو بسازیم */}
          <span
            style={{ opacity: getProgress(12, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            چیزی رو بسازیم
          </span>

          {/* Token 11: که ارزش */}
          <span
            style={{ opacity: getProgress(13, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            که ارزش
          </span>

          {/* Widget 4: Attention Eye Pill */}
          <span
            style={{
              opacity: getProgress(14, 16).opacity,
              transform: `scale(${getProgress(14, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#9E5A38] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <span className="text-xs">👁️</span>
            <span className="text-[9px] text-white/80 font-bold uppercase tracking-wider hidden sm:inline">RETENTION</span>
            <span className="text-[11px] sm:text-xs font-black text-white">چشم مخاطب</span>
          </span>

          {/* Token 12: رو داشته باشه */}
          <span
            style={{ opacity: getProgress(14, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            رو داشته باشه
          </span>

          {/* Token 13: و مخاطب */}
          <span
            style={{ opacity: getProgress(15, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            و مخاطب
          </span>

          {/* Widget 5: Brand Value Pill */}
          <span
            style={{
              opacity: getProgress(15, 16).opacity,
              transform: `scale(${getProgress(15, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#4A5D44] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Gem%20Stone.png"
              alt="Gem"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain pointer-events-none"
            />
            <span className="text-[9px] text-white/80 font-bold uppercase tracking-wider hidden sm:inline">BRAND VALUE</span>
            <span className="text-[11px] sm:text-xs font-black text-white">ارزش برند</span>
          </span>

          {/* Token 14: رو درک کنه */}
          <span
            style={{ opacity: getProgress(16, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            رو درک کنه.
          </span>

          {/* Widget 6: Square Arrow Icon */}
          <span
            style={{
              opacity: getProgress(16, 16).opacity,
              transform: `scale(${getProgress(16, 16).scale})`,
            }}
            className="inline-flex items-center justify-center align-middle mx-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-900 text-white shadow-xs"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </div>
      ) : (
        /* English Version */
        <div
          dir="ltr"
          className="text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-black tracking-tight leading-[2.1] sm:leading-[2.2] md:leading-[2.3] text-slate-950 text-center"
        >
          <span
            style={{ opacity: getProgress(0, 16).opacity }}
            className="inline-block transition-opacity duration-150 mr-1 text-slate-950"
          >
            HesLab
          </span>

          {/* Studio Badge */}
          <span
            style={{
              opacity: getProgress(1, 16).opacity,
              transform: `scale(${getProgress(1, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#E85D35] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Travel%20and%20places/High%20Voltage.png"
              alt="Studio"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain pointer-events-none"
            />
            <span className="text-[11px] sm:text-xs font-black text-white">Short-form Studio</span>
          </span>

          <span
            style={{ opacity: getProgress(2, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            is a dedicated short-form team
          </span>

          {/* Red FPS Dial */}
          <span
            style={{
              opacity: getProgress(4, 16).opacity,
              transform: `scale(${getProgress(4, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#D9383A] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <div className="w-2 h-2 rounded-xs bg-white animate-spin" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] font-black tracking-wider">60 FPS</span>
          </span>

          <span
            style={{ opacity: getProgress(5, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            for YouTube, Instagram,
          </span>

          {/* Clapper icon */}
          <span
            style={{
              opacity: getProgress(7, 16).opacity,
              transform: `scale(${getProgress(7, 16).scale})`,
            }}
            className="inline-flex items-center align-middle mx-1 p-1 rounded-lg bg-slate-100 border border-slate-200/80 transition-all duration-200"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Clapper%20Board.png"
              alt="Clapper"
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain pointer-events-none"
            />
          </span>

          <span
            style={{ opacity: getProgress(8, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            and TikTok.
          </span>

          <span
            style={{ opacity: getProgress(9, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            Our focus is to build content that truly deserves
          </span>

          {/* Attention Badge */}
          <span
            style={{
              opacity: getProgress(12, 16).opacity,
              transform: `scale(${getProgress(12, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#9E5A38] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <span className="text-xs">👁️</span>
            <span className="text-[11px] sm:text-xs font-black text-white">Audience Retention</span>
          </span>

          <span
            style={{ opacity: getProgress(13, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            the viewer’s time, so they discover
          </span>

          {/* Brand Value Badge */}
          <span
            style={{
              opacity: getProgress(15, 16).opacity,
              transform: `scale(${getProgress(15, 16).scale})`,
            }}
            className="inline-flex items-center gap-1.5 align-middle mx-1.5 px-2.5 py-1 rounded-full bg-[#4A5D44] text-white text-[11px] sm:text-xs font-bold select-none transition-all duration-200 shadow-xs"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Gem%20Stone.png"
              alt="Gem"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain pointer-events-none"
            />
            <span className="text-[11px] sm:text-xs font-black text-white">Brand Value</span>
          </span>

          <span
            style={{ opacity: getProgress(16, 16).opacity }}
            className="inline-block transition-opacity duration-150 mx-1 text-slate-950"
          >
            of your brand.
          </span>

          {/* Arrow Button */}
          <span
            style={{
              opacity: getProgress(16, 16).opacity,
              transform: `scale(${getProgress(16, 16).scale})`,
            }}
            className="inline-flex items-center justify-center align-middle mx-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-900 text-white shadow-xs"
          >
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </span>
        </div>
      )}
    </section>
  );
};
