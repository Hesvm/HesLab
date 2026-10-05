import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const FAQ: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(3); // Set item 3 (4th item) open initially or null, like the reference

  return (
    <section className="py-16 sm:py-22 px-4 max-w-3xl mx-auto border-t border-slate-900/10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight text-slate-950 leading-tight">
          {t.title}
        </h2>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 sm:space-y-3.5">
        {t.items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#F4F4F6] hover:bg-[#EFEFF2] rounded-[20px] sm:rounded-[22px] px-6 py-5 sm:px-7 sm:py-5.5 transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className={`w-full flex items-center justify-between gap-4 cursor-pointer select-none ${isRtl ? 'text-right' : 'text-left'}`}
                aria-expanded={isOpen}
              >
                <span className="font-bold text-[15.5px] sm:text-[17.5px] text-slate-900 tracking-tight leading-snug">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 text-slate-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.4}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className={`pt-2.5 sm:pt-3 text-[#5A5A62] text-[14.5px] sm:text-[15px] leading-relaxed font-normal ${isRtl ? 'text-right' : 'text-left'}`}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

