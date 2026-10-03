import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const Philosophy: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].philosophy;

  return (
    <section className="py-16 sm:py-24 px-4 bg-slate-950 text-white border-y border-slate-900 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-600/15 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight leading-[1.15] text-white">
          {t.title1} <br />
          <span className="text-slate-500">{t.title2}</span>
        </h2>

        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 font-bold max-w-xl mx-auto leading-relaxed">
          {t.desc1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
            {t.desc2}
          </span>{' '}
          {t.desc3}
        </p>
      </div>
    </section>
  );
};

