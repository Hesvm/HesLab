import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const TargetAudience: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].target;

  return (
    <section id="services" className="py-14 sm:py-20 px-4 max-w-5xl mx-auto border-t border-slate-900/10">
      {/* Section Header */}
      <div className="text-center mb-9 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 uppercase max-w-2xl mx-auto leading-tight">
          {t.title1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
            {t.title2}
          </span>
        </h2>
      </div>

      {/* 8 Cards Bento Grid (2 rows x 4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
        {t.audiences.map((item, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-5.5 rounded-[20px] border border-slate-200/90 bg-white hover:border-slate-400/80 hover:shadow-xs transition-all duration-300 flex flex-col items-center text-center justify-center group select-none"
          >
            {/* Centered Emoji Icon Box */}
            <div className="w-12 h-12 rounded-[14px] bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-3 group-hover:scale-110 group-hover:bg-slate-100/80 transition-all duration-300">
              <img
                src={item.emoji}
                alt={item.title}
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
                loading="lazy"
              />
            </div>

            {/* Centered Title */}
            <h3 className="text-[15.5px] sm:text-[16.5px] font-black text-slate-950 uppercase tracking-tight mb-1.5 text-center">
              {item.title}
            </h3>

            {/* Centered Short Description */}
            <p className="text-slate-600 text-xs sm:text-[12.5px] leading-relaxed font-medium text-center">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

