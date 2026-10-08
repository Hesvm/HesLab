import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { trackEvent } from '../lib/analytics';
import { translations } from '../data/translations';

export const FinalCTA: FC = () => {
  const { lang } = useLanguage();
  const { openModal } = useQuoteModal();

  return (
    <section id="contact" className="w-full bg-[#1E1E1F] text-white pt-16 sm:pt-24 pb-10 sm:pb-14 px-6 sm:px-12 select-none relative overflow-hidden">

      {/* Main Inner Container */}
      <div className="max-w-6xl mx-auto flex flex-col justify-between relative z-10 w-full">

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto relative z-10 text-center"
        >
          {/* Main Headline (same as hero) */}
          <h2
            dir="ltr"
            className="text-3xl sm:text-4xl md:text-[48px] font-black tracking-tight leading-[1.05] text-white font-en"
          >
            {translations[lang].hero.titleLine1}
            <br />
            {translations[lang].hero.titleLine2}
          </h2>

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
              className="bg-[#5566FF] hover:bg-[#4859F5] text-white text-[14.5px] font-semibold px-7 h-[48px] rounded-[14px] border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center select-none"
            >
              {translations[lang].nav.cta}
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar: Logo, Navigation, and Social Links */}
        <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          
          {/* Logo (same as header) */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="HESLAB">
            <img
              src="/brand/logo_icon.png"
              alt="HesLab Icon"
              className="h-[21px] w-auto object-contain shrink-0 select-none group-hover:scale-105 transition-transform duration-200"
            />
            <img
              src="/brand/logo_type.svg"
              alt="Hēs lab"
              className="h-[28px] w-auto object-contain select-none group-hover:opacity-90 transition-opacity duration-200 brightness-0 invert"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-[12.5px] font-medium text-slate-400">
            <Link to="/work" className="hover:text-white transition-colors">{lang === 'fa' ? 'نمونه‌کارها' : 'Work'}</Link>
            <Link to="/services" className="hover:text-white transition-colors">{lang === 'fa' ? 'خدمات' : 'Services'}</Link>
            <Link to="/blog" className="hover:text-white transition-colors">{lang === 'fa' ? 'بلاگ' : 'Blog'}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{lang === 'fa' ? 'درباره ما' : 'About'}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{lang === 'fa' ? 'تماس' : 'Contact'}</Link>
          </div>

          {/* Social Media Links (Replacing copyright text) */}
          <div className="flex items-center gap-4">
            {/* Telegram */}
            <a
              href="https://t.me/heslab"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#29A9EB] transition-colors duration-200"
              aria-label="Telegram"
              title="Telegram"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/heslab"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#E1306C] transition-colors duration-200"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@heslab"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-[#FF0000] transition-colors duration-200"
              aria-label="YouTube"
              title="YouTube"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

