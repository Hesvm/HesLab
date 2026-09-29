import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorks: FC = () => {
  const { lang, isRtl } = useLanguage();

  const stepsData = lang === 'fa'
    ? [
        {
          id: 1,
          title: 'بر پایه داده (Built on data)',
          desc: 'هر تصمیم بر اساس داده‌های عملکرد گرفته می‌شود. ما بررسی می‌کنیم که مخاطبان روی چه چیزهایی متوقف می‌شوند، کلیک می‌کنند و تبدیل می‌شوند، سپس از این سیگنال‌ها برای بهینه‌سازی محتوای خلاقانه، تولیدکنندگان و رسانه استفاده می‌کنیم.',
          video: '/videos/video_1.mp4',
          poster: '/mock/work_vertical_1.webp',
        },
        {
          id: 2,
          title: 'مقیاس‌پذیری در رسانه (Scaled through media)',
          desc: 'ما برنامه‌های جامع رسانه‌ای را در شبکه‌های اجتماعی، CTV، جستجو و کانال‌های نوظهور برنامه‌ریزی، اجرا و مدیریت می‌کنیم. توزیع رسانه را بر اساس سودآوری تنظیم کرده و تنها پس از اعتبارسنجی جایگاه محتوا، آن را در مقیاس بزرگ منتشر می‌کنیم.',
          video: '/videos/video_2.mp4',
          poster: '/mock/work_vertical_2.webp',
        },
        {
          id: 3,
          title: 'مهندسی‌شده برای فید (Engineered for the feed)',
          desc: 'شبکه‌های اجتماعی جایی است که برندها زندگی می‌کنند و یاد می‌گیرند. ما با ساخت آثاری شروع می‌کنیم که مخاطب واقعاً تمایل به تماشای آن‌ها دارد، سپس سیستم‌هایی می‌چینیم که سیگنال‌های مخاطب را دریافت کرده و متناسب با آن رشد می‌کنند.',
          video: '/videos/video_3.mp4',
          poster: '/mock/work_vertical_3.webp',
        },
      ]
    : [
        {
          id: 1,
          title: 'Built on data',
          desc: 'Every decision is backed by performance data. We track what people stop on, click, and convert on, then use those signals to refine creative, creators, and media.',
          video: '/videos/video_1.mp4',
          poster: '/mock/work_vertical_1.webp',
        },
        {
          id: 2,
          title: 'Scaled through media',
          desc: 'We plan, execute, and manage complex media programs across social, CTV, search, and emerging channels. We balance media based on profitability and only scale once creative & positioning are validated.',
          video: '/videos/video_2.mp4',
          poster: '/mock/work_vertical_2.webp',
        },
        {
          id: 3,
          title: 'Engineered for the feed',
          desc: 'Social is where brands live & learn. We start by making work people actually want to watch, then build systems that listen, adapt, and scale what the audience responds to.',
          video: '/videos/video_3.mp4',
          poster: '/mock/work_vertical_3.webp',
        },
      ];

  return (
    <section id="process" className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 w-full mx-auto bg-white select-none">
      {/* Sleek Black Container Frame */}
      <div className="bg-[#0B0B0E] text-white rounded-[32px] sm:rounded-[44px] overflow-hidden relative shadow-2xl p-7 sm:p-12 md:p-14 lg:p-16 border border-white/10 w-full">
        
        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-indigo-950/20 via-purple-950/15 to-slate-900/30 blur-[140px] pointer-events-none" />

        {/* 3 Stacked Feature Rows */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-24 relative z-10">
          {stepsData.map((step, idx) => (
            <div
              key={step.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              {/* Text Side (Consistently on left for LTR, right for RTL) */}
              <div className={`flex flex-col ${isRtl ? 'md:order-1' : 'md:order-1'}`}>
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-snug mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-white/75 text-xs sm:text-[14px] lg:text-[15px] leading-relaxed sm:leading-[1.8] font-normal max-w-lg">
                  {step.desc}
                </p>
              </div>

              {/* Visual Card Side */}
              <div
                className={`w-full bg-[#15161B] rounded-[24px] sm:rounded-[32px] border border-white/5 flex items-center justify-center p-6 sm:p-10 min-h-[300px] sm:min-h-[360px] relative overflow-hidden group select-none ${
                  isRtl ? 'md:order-2' : 'md:order-2'
                }`}
              >
                {/* Central Phone / Reel Frame */}
                <div className="relative w-[140px] sm:w-[165px] aspect-[9/15] rounded-[20px] sm:rounded-[22px] overflow-hidden shadow-2xl bg-black group-hover:scale-102 transition-transform duration-300">
                  <video
                    src={step.video}
                    poster={step.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid UI Badges per Step */}
                  {idx === 0 && (
                    <>
                      {/* 32% Matrix Card on Bottom-Left */}
                      <div className="absolute -bottom-2 -left-4 bg-[#0A0A0D]/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-[14px] border border-white/15 shadow-xl z-10">
                        <div className="text-[11px] font-mono font-bold text-white mb-1.5 flex items-center gap-1">
                          <span>32%</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {Array.from({ length: 15 }).map((_, i) => (
                            <span
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < 9 ? 'bg-white' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Pill Badge on Top-Right */}
                      <div className="absolute top-3 -right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-[10px] border border-white/30 shadow-md flex items-center gap-1 z-10 text-slate-900">
                        <div className="w-3.5 h-2.5 rounded-[3px] bg-slate-300 border border-slate-400" />
                        <div className="w-2.5 h-2.5 rounded-[3px] bg-slate-800" />
                      </div>
                    </>
                  )}

                  {idx === 1 && (
                    <>
                      {/* Bar Chart Card on Bottom-Left */}
                      <div className="absolute -bottom-2 -left-4 bg-[#0A0A0D]/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-[14px] border border-white/15 shadow-xl z-10 min-w-[70px]">
                        <div className="flex items-center justify-between text-[8.5px] font-bold text-white/50 mb-1">
                          <span>•</span>
                          <span>GROWTH</span>
                        </div>
                        <div className="flex items-end gap-1.5 h-7">
                          <div className="w-2 bg-white/30 rounded-t h-[35%]" />
                          <div className="w-2 bg-white/50 rounded-t h-[60%]" />
                          <div className="w-2 bg-white/80 rounded-t h-[85%]" />
                          <div className="w-2 bg-white rounded-t h-[100%]" />
                        </div>
                      </div>

                      {/* Top-Right Circular & Tag Badge */}
                      <div className="absolute top-4 -right-3 flex flex-col gap-1.5 z-10 items-end">
                        <div className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center text-slate-900">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        </div>
                        <div className="bg-[#0A0A0D]/95 backdrop-blur-md p-1.5 rounded-[8px] border border-white/15 text-white shadow-md">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}

                  {idx === 2 && (
                    <>
                      {/* Soundwave Badge on Bottom-Left */}
                      <div className="absolute -bottom-2 -left-4 bg-[#0A0A0D]/95 backdrop-blur-md text-white px-3 py-2 rounded-full border border-white/15 shadow-xl flex items-center gap-2 z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <div className="flex items-center gap-0.5 h-3">
                          <span className="w-0.5 h-2 bg-white rounded-full" />
                          <span className="w-0.5 h-3 bg-white rounded-full" />
                          <span className="w-0.5 h-1.5 bg-white rounded-full" />
                          <span className="w-0.5 h-3 bg-white rounded-full" />
                          <span className="w-0.5 h-2 bg-white rounded-full" />
                        </div>
                      </div>

                      {/* Floating Reactions on Right */}
                      <div className="absolute -bottom-2 -right-3 flex flex-col gap-2 z-10 items-end">
                        <div className="w-8 h-8 rounded-[10px] bg-white text-slate-950 shadow-xl flex items-center justify-center border border-white/80">
                          <svg className="w-4 h-4 fill-slate-950" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                        <div className="w-7 h-7 rounded-[8px] bg-white text-slate-950 shadow-lg flex items-center justify-center border border-white/80 mr-1.5">
                          <svg className="w-3.5 h-3.5 fill-slate-950" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

