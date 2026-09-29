import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const StatsBar: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].stats;

  return (
    <section className="py-7 sm:py-10 px-4 max-w-[820px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4.5">
        {t.items.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Card Box */}
            <div className="w-full h-24 sm:h-28 md:h-32 rounded-[20px] sm:rounded-[22px] border border-slate-200/90 bg-white flex items-center justify-center p-3 shadow-2xs hover:border-slate-300 transition-all duration-300 group">
              <img
                src={stat.image}
                alt={stat.label}
                className="max-h-[82%] max-w-[82%] object-contain select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Label below the card */}
            <p className="mt-2.5 text-[11px] sm:text-xs font-bold text-slate-800 text-center tracking-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

