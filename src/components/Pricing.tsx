import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const Pricing: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 max-w-5xl mx-auto border-t border-slate-900/10">
      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="tracking-tight text-slate-950 max-w-2xl mx-auto">
          {lang === 'fa' ? (
            <>
              <span className="font-serif-italic font-normal block mb-1">
                {t.tag}
              </span>
              <span className="font-sans text-2xl sm:text-4xl md:text-[48px] font-black text-slate-950 block leading-tight">
                {t.title}
              </span>
            </>
          ) : (
            <>
              <span className="font-serif-italic font-normal block mb-1">
                {t.tag}
              </span>
              <span className="font-['Plus_Jakarta_Display'] text-2xl sm:text-4xl md:text-[48px] font-black text-slate-950 block tracking-tight leading-tight">
                {t.title}
              </span>
            </>
          )}
        </h2>
      </div>

      {/* 2 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-[760px] mx-auto">
        {t.plans.map((plan, idx) => {
          // 1. Featured / Standard Card (Light-blue shell without border stroke)
          if (plan.popular) {
            return (
              <div
                key={idx}
                className="bg-[#E1F0FF] rounded-[32px] p-2.5 sm:p-3 flex flex-col transition-all duration-300 relative shadow-2xs"
              >
                {/* Top Badge centered in the outer shell */}
                <div className="text-center py-2 font-bold text-xs sm:text-[13px] text-slate-900 flex items-center justify-center gap-1 select-none">
                  <span>{t.popularBadge}</span>
                </div>

                {/* Inner White Card */}
                <div className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between flex-1 shadow-xs">
                  <div>
                    {/* Real Image Mock Banner (object-bottom to hide duplicate badge in raw image) */}
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-[155px] sm:h-[165px] object-cover object-bottom rounded-t-[24px] select-none pointer-events-none"
                    />

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 pb-2">
                      {/* Title & Price Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                          {plan.name}
                        </h3>
                        <div className="text-base sm:text-lg font-bold text-slate-950">
                          {plan.price}
                        </div>
                      </div>

                      {/* Right-aligned Checklist */}
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-slate-800 justify-start text-right"
                          >
                            <svg
                              className="w-4 h-4 text-slate-400 shrink-0"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                            >
                              <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
                              <path
                                d="M6.5 10.5L8.5 12.5L13.5 7.5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-5 sm:p-6 pt-0">
                    <a
                      href="#contact"
                      className="w-full py-3.5 rounded-full font-bold text-sm text-center bg-[#0080FF] hover:bg-[#0070E0] text-white active:scale-95 transition-all block select-none cursor-pointer"
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </div>
            );
          }

          // 2. Basic Card
          return (
            <div
              key={idx}
              className="bg-white rounded-[32px] border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-2xs hover:border-slate-300"
            >
              <div>
                {/* Real Image Mock Banner */}
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-[155px] sm:h-[165px] object-cover object-bottom rounded-t-[32px] select-none pointer-events-none"
                />

                {/* Card Content */}
                <div className="p-5 sm:p-6 pb-2">
                  {/* Title & Price Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="text-base sm:text-lg font-bold text-slate-950">
                      {plan.price}
                    </div>
                  </div>

                  {/* Right-aligned Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-slate-800 justify-start text-right"
                      >
                        <svg
                          className="w-4 h-4 text-slate-400 shrink-0"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
                          <path
                            d="M6.5 10.5L8.5 12.5L13.5 7.5"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-full font-bold text-sm text-center bg-[#EAEAEA] hover:bg-[#DFDFDF] text-slate-900 active:scale-95 transition-all block select-none cursor-pointer"
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

