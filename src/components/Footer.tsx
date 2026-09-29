import { type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const Footer: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-7 sm:py-8 px-4 select-none">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/brand/logo_icon.png"
            alt="HesLab Icon"
            className="h-[21px] w-auto object-contain brightness-110"
          />
          <span className="font-black text-base tracking-tight text-white font-en">
            HESLAB
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs sm:text-[12.5px] font-semibold text-slate-400">
          <a href="#work" className="hover:text-white transition-colors">{t.links.work}</a>
          <a href="#services" className="hover:text-white transition-colors">{t.links.services}</a>
          <a href="#pricing" className="hover:text-white transition-colors">{t.links.pricing}</a>
          <a href="#about" className="hover:text-white transition-colors">{t.links.about}</a>
          <a href="#faq" className="hover:text-white transition-colors">{t.links.faq}</a>
          <a href="mailto:contact@heslab.com" className="hover:text-white transition-colors">{t.links.contact}</a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-500 font-medium">
          © {new Date().getFullYear()} {t.rights}
        </div>
      </div>
    </footer>
  );
};


