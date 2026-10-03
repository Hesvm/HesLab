import { useState, type FC } from 'react';
import { Add, Minus } from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const FAQ: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-22 px-4 max-w-3xl mx-auto border-t border-slate-900/10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight text-slate-950 leading-tight">
          {t.title}
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {t.items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-[14px] border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-slate-900/20 bg-white shadow-md'
                  : 'border-slate-900/10 bg-white/70 hover:bg-white hover:border-slate-900/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`w-full p-4 sm:p-4.5 ${isRtl ? 'text-right' : 'text-left'} flex items-center justify-between gap-3.5 cursor-pointer select-none`}
              >
                <span className="font-black text-sm sm:text-base text-slate-950 tracking-tight">
                  {faq.q}
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                  {isOpen ? <Minus size={14} variant="Linear" /> : <Add size={14} variant="Linear" />}
                </div>
              </button>

              {isOpen && (
                <div className={`px-4 sm:px-4.5 pb-4 sm:pb-4.5 pt-1 text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal border-t border-slate-100 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

