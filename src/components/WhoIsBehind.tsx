import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const WhoIsBehind: FC = () => {
  const { lang } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-24 px-4 max-w-4xl mx-auto flex items-center justify-center">
      {/* Explicit LTR row so Bubble is always Left/Center and Avatar is on Right */}
      <div dir="ltr" className="flex items-end justify-center gap-3.5 sm:gap-5 max-w-[720px] w-full">
        
        {/* Chat / Thought Speech Bubble matching Figma Group 1171278053 */}
        <div
          dir="rtl"
          className="relative flex-1 bg-[#F4F5F6] rounded-[28px] sm:rounded-[32px] px-6 py-5 sm:px-9 sm:py-7 text-right shadow-2xs"
        >
          {/* Headline */}
          <h3 className="text-[17px] sm:text-[20px] font-black text-slate-950 mb-2.5 tracking-tight leading-snug">
            {lang === 'fa' ? 'من حسام‌م . ادیتور پشت حس‌لب' : "I'm Hesam . The editor behind HesLab"}
          </h3>
          
          {/* Bio paragraph */}
          <p className="text-[13px] sm:text-[14.5px] font-bold text-slate-800 leading-[1.8] sm:leading-[1.85] tracking-tight">
            {lang === 'fa'
              ? 'حس‌لب از یه نیاز و شخصی میاد. که همیشه دوست داشتم ادم‌ها ویدیوی باکیفیت و ارزشمند ببینن چون بنظرم چشم آدم ها مهم ترین اینپوت اوناست.'
              : 'HesLab comes from a personal need. I always wanted people to watch high-quality, valuable videos because I believe human eyes are their most important input.'}
          </p>

          {/* Exact Figma Speech Bubble Tail Dots pointing to avatar */}
          <svg
            className="absolute -bottom-1 -right-3 sm:-right-3.5 w-7 h-5 overflow-visible pointer-events-none select-none"
            viewBox="0 0 28 20"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#F4F5F6" />
            <circle cx="20.5" cy="17.5" r="4.5" fill="#F4F5F6" />
          </svg>
        </div>

        {/* Founder Avatar aligned to bottom */}
        <div className="shrink-0 select-none mb-1">
          <img
            src="/mock/founder_hes.webp"
            alt="Hesam"
            className="w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-full object-cover shadow-xs border-2 border-white ring-1 ring-slate-900/5"
          />
        </div>

      </div>
    </section>
  );
};

