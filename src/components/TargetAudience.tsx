import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const TargetAudience: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].target;

  return (
    <section id="services" className="pt-14 sm:pt-20 pb-24 sm:pb-32 md:pb-36 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-4xl md:text-[48px] tracking-tight text-slate-950 max-w-3xl mx-auto leading-[1.25] sm:leading-[1.18]">
          {lang === 'fa' ? (
            <>
              <span className="font-black block">{t.title1}</span>
              <span className="font-black text-slate-950 block mt-1">{t.title2}</span>
            </>
          ) : (
            <>
              <span className="font-serif-italic font-normal block mb-1">
                {t.title1}
              </span>
              <span className="font-['Plus_Jakarta_Display'] font-black text-slate-950 block mt-1 tracking-tight">
                {t.title2}
              </span>
            </>
          )}
        </h2>
      </div>

      {/* 8 Square Cards Bento Grid (2 rows x 4 columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
        {t.audiences.map((item, idx) => (
          <div
            key={idx}
            className="aspect-square p-4 sm:p-5 rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.035),0_2px_8px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.065)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center group select-none border border-slate-100/80"
          >
            {/* Centered Emoji Icon Box */}
            <div className="w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-[16px] sm:rounded-[18px] bg-slate-50/90 border border-slate-100/80 flex items-center justify-center p-2.5 sm:p-3 mb-3 sm:mb-3.5 group-hover:scale-110 group-hover:bg-slate-100 transition-all duration-300 shrink-0">
              <img
                src={item.emoji}
                alt={item.title}
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
                loading="lazy"
              />
            </div>

            {/* Centered Title */}
            <h3 className="text-[14px] sm:text-[15.5px] font-black text-slate-950 tracking-tight mb-1.5 text-center line-clamp-1">
              {item.title}
            </h3>

            {/* Centered Short Description (Strictly 2 lines) */}
            <p className="text-slate-500 text-[11px] sm:text-[12px] leading-[1.5] font-medium text-center line-clamp-2 max-w-[190px] mx-auto">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

