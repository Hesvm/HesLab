import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../lib/analytics';

export const FinalCTA: FC = () => {
  const { lang, isRtl } = useLanguage();
  const { openModal } = useQuoteModal();

  return (
    <section id="contact" className="w-full bg-[#000000] text-white pt-16 sm:pt-24 pb-10 sm:pb-14 px-6 sm:px-12 select-none relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-gradient-to-r from-sky-500/15 via-indigo-600/15 to-purple-600/15 blur-[140px] pointer-events-none" />

      {/* Main Inner Container */}
      <div className="max-w-6xl mx-auto flex flex-col justify-between relative z-10 w-full">

        {/* Center Content */}
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight leading-[1.2] sm:leading-[1.18] text-white">
            {lang === 'fa' ? (
              <>
                <span>یه محتوایی بساز</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-200 to-purple-400">
                  که ارزش چشم مخاطب رو داشته باشه.
                </span>
              </>
            ) : (
              <>
                <span>Create content that</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-200 to-purple-400">
                  deserves their attention.
                </span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-slate-400 text-xs sm:text-sm md:text-base max-w-lg mx-auto font-medium">
            {lang === 'fa'
              ? 'همین امروز کلیپ‌هایتان را بفرستید تا اولین ادیت حرفه‌ای را در سریع‌ترین زمان تحویل بگیرید.'
              : 'Send your footage today and receive your first high-retention edit with rapid turnaround.'}
          </p>

          {/* CTA Action Button */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <button
              type="button"
              data-analytics="primary-cta"
              data-analytics-name="start_a_project"
              data-analytics-location="home_final_cta"
              onClick={() => {
                trackEvent('primary_cta_click', {
                  cta_name: 'start_a_project',
                  cta_location: 'home_final_cta',
                  page_path: '/',
                });
                openModal();
              }}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>{lang === 'fa' ? 'ثبت درخواست و شروع پروژه' : 'Get Started Now'}</span>
              <svg
                className={`w-3.5 h-3.5 fill-current ${isRtl ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Logo, Navigation, and Social Links */}
        <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src="/brand/logo_icon.png"
              alt="HesLab"
              className="h-5 w-auto object-contain brightness-110"
            />
            <span className="font-black text-base tracking-tight text-white font-en">
              HESLAB
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-[12.5px] font-bold text-slate-400">
            <Link to="/work" className="hover:text-white transition-colors">{lang === 'fa' ? 'نمونه‌کارها' : 'Work'}</Link>
            <Link to="/services" className="hover:text-white transition-colors">{lang === 'fa' ? 'خدمات' : 'Services'}</Link>
            <Link to="/blog" className="hover:text-white transition-colors">{lang === 'fa' ? 'بلاگ' : 'Blog'}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{lang === 'fa' ? 'درباره ما' : 'About'}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{lang === 'fa' ? 'تماس' : 'Contact'}</Link>
          </div>

          {/* Social Media Links (Replacing copyright text) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Telegram */}
            <a
              href="https://t.me/heslab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all duration-200"
              title="Telegram"
            >
              <svg className="w-3.5 h-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              <span>{lang === 'fa' ? 'تلگرام' : 'Telegram'}</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/heslab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all duration-200"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>{lang === 'fa' ? 'اینستاگرام' : 'Instagram'}</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@heslab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all duration-200"
              title="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{lang === 'fa' ? 'یوتیوب' : 'YouTube'}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

