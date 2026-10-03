import { useState, useRef, useCallback, type FC, type PointerEvent } from 'react';
import { Flash, Magicpen, Sound, Play } from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const RawVsFinal: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].rawVsFinal;
  
  // Slider position from 0 (all Final) to 100 (all Raw)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <section className="py-16 sm:py-22 px-4 max-w-5xl mx-auto text-center select-none">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight">
          {t.title1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">
            {t.title2}
          </span>
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-md mx-auto font-medium">
          {t.desc}
        </p>
      </div>

      {/* Interactive Reel Comparison Slider Container */}
      <div className="relative mx-auto w-full max-w-[310px] sm:max-w-[340px] md:max-w-[360px] aspect-[9/16] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] border-4 border-slate-950 bg-slate-950 touch-none cursor-ew-resize">
        
        {/* Glow ambient background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-[36px] blur-xl opacity-60 pointer-events-none" />

        {/* Outer Interactive Slider Box */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-full overflow-hidden"
        >
          {/* ========================================= */}
          {/* BASE LAYER: FINAL CUT (Right Underlying) */}
          {/* ========================================= */}
          <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-between p-4 text-right">
            {/* Background Image / Video Simulation */}
            <img
              src="/mock/final_card.webp"
              alt="Final Cut"
              className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none" />

            {/* Final Cut Top Header Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-[11px] font-black tracking-wider shadow-sm flex items-center gap-1.5">
                <Flash size={12} variant="Bold" />
                {t.finalTitle}
              </span>
              <span className="text-emerald-400 text-[11px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                {t.finalQuality}
              </span>
            </div>

            {/* Final Cut Center Showcase */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
              <div className="px-3.5 py-1.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/30 text-white font-black text-xs tracking-tight shadow-xl mb-2.5 animate-bounce duration-1000">
                {t.finalHookText}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-sky-300 font-bold mb-1.5 bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                <Magicpen size={12} variant="Linear" />
                <span>{t.finalFeatures}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-300 bg-black/40 px-2 py-0.5 rounded-full">
                <Sound size={12} variant="Linear" />
                <span>{t.finalAudio}</span>
              </div>
            </div>

            {/* Final Cut Bottom Metrics */}
            <div className="relative z-10 p-2.5 rounded-[12px] bg-black/75 border border-white/20 backdrop-blur-md text-[11px] text-white flex items-center justify-between">
              <span className="text-slate-300">{t.finalAvgDuration}</span>
              <span className="text-emerald-400 font-black text-xs font-mono">{t.finalPercent}</span>
            </div>
          </div>

          {/* ========================================= */}
          {/* CLIPPED TOP LAYER: RAW FOOTAGE (Left Side) */}
          {/* ========================================= */}
          <div
            className="absolute inset-0 h-full overflow-hidden transition-[clip-path] duration-75"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden flex flex-col justify-between p-4 text-left">
              {/* Raw Background (Dim, flat, desaturated) */}
              <img
                src="/mock/raw_card.webp"
                alt="RAW Footage"
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-75 brightness-75 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/70 to-slate-950/90 pointer-events-none" />

              {/* Raw Top Header Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white/70 text-[11px] font-bold tracking-wider">
                  {t.rawTitle}
                </span>
                <span className="text-white/50 text-[11px] font-mono">{t.rawQuality}</span>
              </div>

              {/* Raw Center Mockup Elements */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/50 mb-2.5 shadow-inner">
                  <Play size={20} variant="Linear" />
                </div>
                <p className="text-white/70 text-[11px] max-w-[180px] leading-relaxed bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                  {t.rawDesc}
                </p>
              </div>

              {/* Raw Bottom Metrics */}
              <div className="relative z-10 p-2.5 rounded-[12px] bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white/60 flex items-center justify-between">
                <span>{t.rawAvgDuration}</span>
                <span className="text-red-400 font-bold font-mono">{t.rawPercent}</span>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* DRAGGABLE SLIDER DIVIDER LINE & THUMB     */}
          {/* ========================================= */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30 flex items-center justify-center"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Vertical glowing divider line */}
            <div className="w-[3px] h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] -translate-x-1/2" />

            {/* Circular Drag Handle Button */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-950 shadow-[0_4px_16px_rgba(0,0,0,0.4)] border-2 border-slate-900 flex items-center justify-center select-none active:scale-110 transition-transform">
              <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                <path d="M8.5 7l-5 5 5 5V7zm7 10l5-5-5-5v10z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

