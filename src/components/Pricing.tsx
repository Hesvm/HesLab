import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { translations } from '../data/translations';

export const Pricing: FC = () => {
  const { lang } = useLanguage();
  const { openModal } = useQuoteModal();
  const t = translations[lang].pricing;

  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 max-w-5xl mx-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch max-w-[760px] mx-auto pt-10 sm:pt-12">
        {t.plans.map((plan, idx) => {
          // 1. Featured / Standard Card (Dark Card with soft light-purple outer shell & navbar-styled purple CTA)
          if (plan.popular) {
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Unified Soft Light-Purple Outer Shell (#EEE8FC) with Most Popular badge */}
                <div className="absolute -inset-1.5 sm:-inset-2 -top-8 sm:-top-9 bg-[#EEE8FC] rounded-[34px] sm:rounded-[38px] z-0 pointer-events-none flex flex-col justify-start items-center">
                  <div className="h-8 sm:h-9 flex items-center justify-center select-none">
                    <span className="text-[#5566FF] bg-[#5566FF]/12 px-3 py-0.5 rounded-full text-xs sm:text-[11.5px] font-bold border border-[#5566FF]/20 tracking-wide">
                      {t.popularBadge}
                    </span>
                  </div>
                </div>

                {/* Main Dark Card (#09090B) */}
                <div className="bg-[#09090B] rounded-[28px] sm:rounded-[32px] border border-white/10 overflow-hidden flex flex-col justify-between flex-1 shadow-2xl relative z-10 transition-all duration-300">
                  <div>
                    {/* Real Image Mock Banner */}
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-[155px] sm:h-[165px] object-cover object-center select-none pointer-events-none"
                    />

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 pb-2">
                      {/* Title & Price Header */}
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {plan.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {plan.price}
                          </div>
                          {plan.priceSubtext && (
                            <div className="text-[12px] sm:text-[12.5px] font-medium text-zinc-400 mt-0.5 select-none">
                              {plan.priceSubtext}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right-aligned Checklist */}
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-zinc-300 justify-start text-right"
                          >
                            <div className="w-4 h-4 rounded-full bg-[#00A7F5] flex items-center justify-center shrink-0">
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                viewBox="0 0 12 12"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                              >
                                <path
                                  d="M2.5 6.2L4.8 8.5L9.5 3.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button (Matching Navbar Button Exactly) */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => openModal('standard')}
                      className="w-full py-3.5 rounded-full font-semibold text-sm text-center bg-[#5566FF] hover:bg-[#4859F5] text-white border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] active:scale-95 transition-all block select-none cursor-pointer"
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // 2. Basic Card (Light Card)
          return (
            <div
              key={idx}
              className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 overflow-hidden flex flex-col justify-between flex-1 transition-all duration-300 shadow-2xs hover:border-slate-300 w-full h-full"
            >
              <div>
                {/* Real Image Mock Banner */}
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-[155px] sm:h-[165px] object-cover object-center select-none pointer-events-none"
                />

                {/* Card Content */}
                <div className="p-5 sm:p-6 pb-2">
                  {/* Title & Price Header */}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {plan.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        {plan.price}
                      </div>
                      {plan.priceSubtext && (
                        <div className="text-[12px] sm:text-[12.5px] font-medium text-slate-500 mt-0.5 select-none">
                          {plan.priceSubtext}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right-aligned Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-slate-800 justify-start text-right"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#00A7F5] flex items-center justify-center shrink-0">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <path
                              d="M2.5 6.2L4.8 8.5L9.5 3.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => openModal('starter')}
                  className="w-full py-3.5 rounded-full font-bold text-sm text-center bg-[#FAFAFA] hover:bg-[#F2F2F2] text-slate-900 border border-slate-200/90 active:scale-95 transition-all block select-none cursor-pointer shadow-2xs"
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

