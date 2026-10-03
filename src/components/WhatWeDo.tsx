import { type FC } from 'react';
import { Scissor, Eye, RefreshCircle } from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const pillarMeta = [
  {
    icon: Scissor,
    color: 'from-sky-500/10 to-indigo-500/10',
    border: 'border-sky-500/20',
    iconColor: 'text-sky-600',
  },
  {
    icon: Eye,
    color: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-600',
  },
  {
    icon: RefreshCircle,
    color: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-600',
  },
];

export const WhatWeDo: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].whatWeDo;

  const pillars = [t.pillar1, t.pillar2, t.pillar3];

  return (
    <section id="services" className="py-24 sm:py-32 px-4 max-w-6xl mx-auto border-t border-slate-900/10">
      {/* Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight text-slate-950 leading-tight">
          {t.title}
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-lg mx-auto font-medium">
          {t.desc}
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {pillars.map((pillar, idx) => {
          const meta = pillarMeta[idx];
          const IconComp = meta.icon;
          return (
            <div
              key={idx}
              className={`p-8 rounded-[22px] border ${meta.border} bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                    [{pillar.num}]
                  </span>
                  <div className={`w-12 h-12 rounded-[12px] bg-gradient-to-tr ${meta.color} flex items-center justify-center ${meta.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                    <IconComp size={24} variant="Bold" color="currentColor" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <span className="text-xs font-bold text-indigo-600 tracking-wider block mb-4">
                  {pillar.tagline}
                </span>

                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-950">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                <span>{t.bottomBadge}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

