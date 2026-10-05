import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';

export const KeepInTouch: FC = () => {
  const { lang } = useLanguage();
  const { openModal } = useQuoteModal();
  const isFa = lang === 'fa';

  const contactCard = {
    title: isFa ? 'ایده یا پروژه بزرگ‌تری دارید؟' : 'Have something bigger in mind?',
    desc: isFa
      ? 'نیازهای برند یا شرکت خود را مطرح کنید. درباره هماهنگی پروژه، قیمت‌گذاری و مراحل بعد صحبت می‌کنیم.'
      : 'Tell us what your company needs. We’ll talk through product fit, pricing, and what’s coming next.',
    btn: isFa ? 'ارتباط با ما' : 'Talk to sales',
    action: () => {
      openModal('custom');
    },
  };

  const socials = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@heslab',
      url: 'https://instagram.com/heslab',
      bgColor: 'bg-[#3D0A26]',
      hoverBorder: 'hover:border-pink-500/40',
      desc: isFa ? 'نمونه‌کارهای جدید، پشت صحنه و تکنیک‌ها' : 'Product updates, feature highlights',
      icon: (
        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center shadow-md shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </div>
      ),
    },
    {
      id: 'twitter',
      name: 'X',
      handle: '@heslab',
      url: 'https://x.com/heslab',
      bgColor: 'bg-[#18191B]',
      hoverBorder: 'hover:border-white/30',
      desc: isFa ? 'اخبار فوری، تجربیات تدوین و ایده‌ها' : 'Product news, release updates',
      icon: (
        <div className="w-10 h-10 rounded-[12px] bg-black border border-white/10 flex items-center justify-center shadow-md shrink-0">
          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@heslab',
      url: 'https://youtube.com/@heslab',
      bgColor: 'bg-[#C40324]',
      hoverBorder: 'hover:border-red-400/40',
      desc: isFa ? 'ویدیوهای کامل، آموزش‌ها و تحلیل عمیق' : 'Product updates and in-depth guides',
      icon: (
        <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shadow-md shrink-0">
          <svg className="w-5 h-5 text-[#C40324] fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'email',
      name: 'Email',
      handle: 'hesammousavizadeh@gmail.com',
      url: 'mailto:hesammousavizadeh@gmail.com',
      bgColor: 'bg-[#181B2A]',
      hoverBorder: 'hover:border-indigo-400/40',
      desc: isFa ? 'ارتباط مستقیم و ارسال پروپوزال' : 'Direct inquiries and project briefs',
      icon: (
        <div className="w-10 h-10 rounded-[12px] bg-[#5566FF] flex items-center justify-center shadow-md shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-22 px-4 max-w-4xl mx-auto text-center">
      {/* Section Title */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-[46px] font-black tracking-tight text-slate-950 leading-tight">
          {isFa ? 'در ارتباط باشیم.' : "Let's keep in touch."}
        </h2>
      </div>

      {/* Top Single Action Card (Center-aligned, Opens Contact Modal) */}
      <div className="max-w-xl mx-auto mb-6 sm:mb-8">
        <div className="bg-[#F6F7F9] border border-slate-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col items-center text-center justify-between transition-all duration-200 shadow-2xs hover:border-slate-300">
          <div className="flex flex-col items-center">
            {/* Centered People Icon Badge */}
            <div className="w-12 h-12 rounded-[14px] bg-white border border-slate-200/70 shadow-xs flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-slate-900 fill-current" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-2.5 text-center">
              {contactCard.title}
            </h3>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal mb-7 max-w-md text-center">
              {contactCard.desc}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={contactCard.action}
              className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200/90 font-bold text-xs sm:text-[13px] px-6 py-2.5 rounded-[12px] shadow-2xs transition-all active:scale-95 cursor-pointer inline-flex items-center justify-center select-none"
            >
              {contactCard.btn}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 4 Social & Email Cards (Center-aligned) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.bgColor} border border-white/10 ${social.hoverBorder} rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col items-center text-center justify-between min-h-[175px] sm:min-h-[190px] transition-all duration-300 hover:scale-[1.025] hover:shadow-xl group cursor-pointer select-none`}
          >
            <div className="flex justify-center">
              {social.icon}
            </div>

            <div className="mt-6 flex flex-col items-center w-full">
              <h4
                dir="ltr"
                className="text-white font-bold text-sm sm:text-[15px] tracking-tight mb-1 group-hover:text-white transition-colors text-center truncate max-w-full"
                title={social.handle}
              >
                {social.handle}
              </h4>
              <p className="text-white/70 text-xs sm:text-[12px] leading-snug font-normal line-clamp-2 text-center">
                {social.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
