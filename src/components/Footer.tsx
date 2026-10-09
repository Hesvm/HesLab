import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { translations } from '../data/translations';
import { trackEvent } from '../lib/analytics';

const socials = [
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://youtube.com/@heslab',
    hover: 'hover:text-[#FF0000]',
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/heslab',
    hover: 'hover:text-[#E1306C]',
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    ),
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/heslab',
    hover: 'hover:text-white',
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
];

export const Footer: FC = () => {
  const { lang } = useLanguage();
  const { openModal } = useQuoteModal();
  const t = translations[lang].footer;
  const hero = translations[lang].hero;
  const cta = translations[lang].nav.cta;

  return (
    <footer className="bg-[#0B0B0C] text-white pt-16 sm:pt-24 pb-7 sm:pb-8 px-4 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Closing headline + CTA */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <h2
            dir="ltr"
            className="text-3xl sm:text-4xl md:text-[48px] font-black tracking-tight leading-[1.05] text-white font-en"
          >
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h2>
          <button
            onClick={() => {
              trackEvent('primary_cta_click', {
                cta_name: 'start_a_project',
                cta_location: 'footer',
                page_path: window.location.pathname,
              });
              openModal();
            }}
            className="mt-8 bg-[#5566FF] hover:bg-[#4859F5] text-white text-[14.5px] font-semibold px-7 h-[48px] rounded-[14px] border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center select-none"
          >
            {cta}
          </button>
        </div>

        <div className="border-t border-slate-900 pt-7 flex flex-col md:flex-row items-center justify-between gap-5">
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

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-[12.5px] font-medium text-slate-400">
            <Link to="/work" className="hover:text-white transition-colors">{t.links.work}</Link>
            <Link to="/services" className="hover:text-white transition-colors">{t.links.services}</Link>
            <Link to="/blog" className="hover:text-white transition-colors">{t.links.blog}</Link>
            <Link to="/about" className="hover:text-white transition-colors">{t.links.about}</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t.links.contact}</Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`text-slate-600 ${s.hover} transition-colors duration-200`}
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-500 font-medium text-center mt-6">
          © {new Date().getFullYear()} {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
