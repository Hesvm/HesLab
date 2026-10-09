import { useState, useEffect, type FC } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { translations } from '../data/translations';
import {
  Grid2,
  Magicpen,
  Subtitle,
  Musicnote,
  MagicStar,
  Colorfilter,
  Timer1,
  Refresh2,
  TickCircle,
  InfoCircle,
} from 'iconsax-react';

const renderFeatureIcon = (iconName?: string, size = 18) => {
  const props = {
    size,
    variant: 'Linear' as const,
    color: 'currentColor',
    className: 'pricing-feature-icon',
  };
  switch (iconName) {
    case 'grid':
      return <Grid2 {...props} />;
    case 'wand':
      return <Magicpen {...props} />;
    case 'text':
      return <Subtitle {...props} />;
    case 'music':
      return <Musicnote {...props} />;
    case 'star':
      return <MagicStar {...props} />;
    case 'palette':
      return <Colorfilter {...props} />;
    case 'timer':
      return <Timer1 {...props} />;
    case 'repeat':
      return <Refresh2 {...props} />;
    default:
      return <TickCircle {...props} />;
  }
};

export const Pricing: FC = () => {
  const { lang } = useLanguage();
  const { openModal } = useQuoteModal();
  const t = translations[lang].pricing;

  // Toggle badge between Most Popular and Most Valuable every 3.5 seconds
  const [badgeMode, setBadgeMode] = useState<'popular' | 'valuable'>('popular');

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeMode((prev) => (prev === 'popular' ? 'valuable' : 'popular'));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 sm:mb-14"
      >
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
      </motion.div>

      {/* 2 Pricing Cards Grid (Scaled up 5% per user request: One-Off Left, Content Pack Right) */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        dir="ltr"
        className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch max-w-[695px] mx-auto pt-8 sm:pt-10"
      >
        {t.plans.map((plan, idx) => {
          // 1. Featured / Standard Card (CONTENT PACK with vibrant purple 10% opacity outer shell)
          if (plan.popular) {
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Dynamic Alternating Outer Shell: Blurple/Purple vs Emerald Green */}
                <div
                  className={`absolute -inset-1 sm:-inset-1.5 -top-7 sm:-top-8 rounded-[29px] sm:rounded-[33px] z-0 pointer-events-none flex flex-col justify-start items-center transition-colors duration-700 ${
                    badgeMode === 'popular'
                      ? 'bg-[#5566FF]/20'
                      : 'bg-[#10B981]/25'
                  }`}
                >
                  <div
                    className={`h-7 sm:h-8 flex items-center justify-center font-bold text-[11.5px] sm:text-xs select-none gap-1.5 transition-colors duration-700 ${
                      badgeMode === 'popular'
                        ? 'text-[#3B48CC]'
                        : 'text-[#059669]'
                    }`}
                  >
                    <motion.div
                      key={badgeMode}
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="flex items-center gap-1.5"
                    >
                      {badgeMode === 'popular' ? (
                        <>
                          <span className="text-xs">💜</span>
                          <span>{t.popularBadge}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs">💸</span>
                          <span>
                            {lang === 'fa' ? 'ارزشمندترین' : 'Most valuable'}
                          </span>
                        </>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Main Dark Card (#0B0B0C) */}
                <div
                  dir={lang === 'fa' ? 'rtl' : 'ltr'}
                  className="bg-[#0B0B0C] rounded-[25px] sm:rounded-[28px] border border-white/15 overflow-hidden flex flex-col justify-between flex-1 shadow-2xl relative z-10 transition-all duration-300"
                >
                  <div>
                    {/* Real Image Mock Banner with 6px padding and rounded corners */}
                    <div className="p-[6px]">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-[152px] sm:h-[164px] object-cover object-center rounded-[20px] sm:rounded-[22px] select-none pointer-events-none"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="px-4 sm:px-5 sm:px-6 pt-2.5 sm:pt-3 pb-2">
                      {/* Title & Price Header */}
                      <div className="flex items-start justify-between mb-4 sm:mb-5">
                        <h3
                          className="text-[20px] sm:text-[23.5px] font-medium text-white tracking-tight font-kansas"
                          style={{ fontFamily: "'KansasNew', Georgia, serif" }}
                        >
                          {plan.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl sm:text-[22px] font-black text-white tracking-tight">
                            {plan.price}
                          </div>
                          {plan.priceSubtext && (
                            <div className="text-[11px] sm:text-[11.5px] font-medium text-zinc-400 mt-0.5 select-none">
                              {plan.priceSubtext}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contextual Features List */}
                      <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7">
                        {plan.features.map((featItem: any, fIdx: number) => {
                          const featText = typeof featItem === 'string' ? featItem : featItem.text;
                          const featIcon = typeof featItem === 'string' ? undefined : featItem.icon;
                          const isBrandStyleFeature = featIcon === 'grid';
                          return (
                            <li
                              key={fIdx}
                              className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] font-medium text-zinc-300 justify-start text-right relative group/feature"
                            >
                              <span className="pricing-feature-icon text-[#8B98FF] shrink-0 flex items-center justify-center [&_path]:[stroke-width:2.5px]">
                                {renderFeatureIcon(featIcon, 16)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <span>{featText}</span>
                                {isBrandStyleFeature && (
                                  <span className="relative inline-flex items-center group/tooltip">
                                    <button
                                      type="button"
                                      aria-label="Info"
                                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded-full hover:bg-white/10 flex items-center justify-center focus:outline-none"
                                    >
                                      <InfoCircle size={13} variant="Linear" />
                                    </button>
                                    {/* Small Popover Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex flex-col items-center z-50 pointer-events-none w-52 sm:w-56">
                                      <div className="bg-[#121214] text-white text-[10.5px] sm:text-[11px] leading-relaxed p-2.5 rounded-xl border border-white/15 shadow-2xl backdrop-blur-md text-center">
                                        {lang === 'fa'
                                          ? 'تدوین، فونت، تم رنگی و هویت بصری تمام ویدیوها یکدست و منطبق بر گایدلاین برند شما طراحی می‌شود.'
                                          : 'Fonts, color grading, pacing, and visual identity stay 100% unified across all videos based on your brand guidelines.'}
                                      </div>
                                      <div className="w-2 h-2 bg-[#121214] border-r border-b border-white/15 rotate-45 -mt-1" />
                                    </div>
                                  </span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button (Matching Navbar Button Exactly) */}
                  <div className="p-4 sm:p-5 sm:px-6 pt-0">
                    <button
                      type="button"
                      onClick={() => openModal('standard')}
                      className="w-full py-3.5 rounded-full font-semibold text-xs sm:text-[13.5px] text-center bg-[#5566FF] hover:bg-[#4859F5] text-white border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] active:scale-95 transition-all block select-none cursor-pointer"
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // 2. Basic Card (ONE-OFF Light Card)
          return (
            <div
              key={idx}
              dir={lang === 'fa' ? 'rtl' : 'ltr'}
              className="bg-white rounded-[25px] sm:rounded-[28px] border border-slate-200/90 overflow-hidden flex flex-col justify-between flex-1 transition-all duration-300 shadow-2xs hover:border-slate-300 w-full h-full"
            >
              <div>
                {/* Real Image Mock Banner with 6px padding and rounded corners */}
                <div className="p-[6px]">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-[152px] sm:h-[164px] object-cover object-center rounded-[20px] sm:rounded-[22px] select-none pointer-events-none"
                  />
                </div>

                {/* Card Content */}
                <div className="px-4 sm:px-5 sm:px-6 pt-2.5 sm:pt-3 pb-2">
                  {/* Title & Price Header */}
                  <div className="flex items-start justify-between mb-4 sm:mb-5">
                    <h3
                      className="text-[20px] sm:text-[23.5px] font-medium text-slate-950 tracking-tight font-kansas"
                      style={{ fontFamily: "'KansasNew', Georgia, serif" }}
                    >
                      {plan.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-xl sm:text-[22px] font-black text-slate-950 tracking-tight">
                        {plan.price}
                      </div>
                      {plan.priceSubtext && (
                        <div className="text-[11px] sm:text-[11.5px] font-medium text-slate-500 mt-0.5 select-none">
                          {plan.priceSubtext}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contextual Features List */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7">
                    {plan.features.map((featItem: any, fIdx: number) => {
                      const featText = typeof featItem === 'string' ? featItem : featItem.text;
                      const featIcon = typeof featItem === 'string' ? undefined : featItem.icon;
                      return (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2.5 text-[11.5px] sm:text-[12.5px] font-medium text-slate-800 justify-start text-right"
                        >
                          <span className="pricing-feature-icon text-slate-700 shrink-0 flex items-center justify-center [&_path]:[stroke-width:2.5px]">
                            {renderFeatureIcon(featIcon, 16)}
                          </span>
                          <span>{featText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* CTA Button (Borderless soft button) */}
              <div className="p-4 sm:p-5 sm:px-6 pt-0">
                <button
                  type="button"
                  onClick={() => openModal('starter')}
                  className="w-full py-3.5 rounded-full font-bold text-xs sm:text-[13.5px] text-center bg-slate-950 hover:bg-slate-800 text-white border-0 shadow-none active:scale-95 transition-all block select-none cursor-pointer"
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

