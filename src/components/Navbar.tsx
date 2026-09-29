import { useState, useRef, type FC } from 'react';
import {
  ArrowDown2,
  Category,
  CloseSquare,
  VideoPlay,
  Flash,
  TextalignCenter,
  Music,
  Magicpen,
  BagTick,
} from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const serviceCardMeta = [
  {
    icon: VideoPlay,
    badgeBg: 'bg-[#0284C7]',
    badgeText: 'text-white',
    cardBg: 'bg-[#F0F9FF] hover:bg-[#E0F2FE]',
    cardBorder: 'border-[#BAE6FD] hover:border-[#0284C7]',
  },
  {
    icon: Flash,
    badgeBg: 'bg-[#EA580C]',
    badgeText: 'text-white',
    cardBg: 'bg-[#FFF7ED] hover:bg-[#FFEDD5]',
    cardBorder: 'border-[#FED7AA] hover:border-[#EA580C]',
  },
  {
    icon: TextalignCenter,
    badgeBg: 'bg-[#16A34A]',
    badgeText: 'text-white',
    cardBg: 'bg-[#F0FDF4] hover:bg-[#DCFCE7]',
    cardBorder: 'border-[#BBF7D0] hover:border-[#16A34A]',
  },
  {
    icon: Music,
    badgeBg: 'bg-[#9333EA]',
    badgeText: 'text-white',
    cardBg: 'bg-[#FAF5FF] hover:bg-[#F3E8FF]',
    cardBorder: 'border-[#E9D5FF] hover:border-[#9333EA]',
  },
  {
    icon: Magicpen,
    badgeBg: 'bg-[#E11D48]',
    badgeText: 'text-white',
    cardBg: 'bg-[#FFF1F2] hover:bg-[#FFE4E6]',
    cardBorder: 'border-[#FECDD3] hover:border-[#E11D48]',
  },
  {
    icon: BagTick,
    badgeBg: 'bg-[#0F172A]',
    badgeText: 'text-white',
    cardBg: 'bg-[#F8FAFC] hover:bg-[#F1F5F9]',
    cardBorder: 'border-[#E2E8F0] hover:border-[#0F172A]',
  },
];

export const Navbar: FC = () => {
  const { lang, toggleLang, isRtl } = useLanguage();
  const t = translations[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 sm:pt-6 px-4 pointer-events-none transition-all">
      <nav
        className="relative pointer-events-auto w-full max-w-[670px] h-[58px] bg-white/90 backdrop-blur-xl border border-slate-900/12 rounded-[14px] px-3.5 flex items-center justify-between shadow-[0_6px_28px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,0.9)] origin-top"
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Logotype */}
        <a
          href="#"
          className="flex items-center gap-2 group shrink-0"
          aria-label="HESLAB"
        >
          <img
            src="/brand/logo_icon.png"
            alt="HesLab Icon"
            className="h-[21px] w-auto object-contain shrink-0 select-none group-hover:scale-105 transition-transform duration-200"
          />
          <img
            src="/brand/logo_type.svg"
            alt="Hēs lab"
            className="h-[28px] w-auto object-contain select-none group-hover:opacity-90 transition-opacity duration-200"
          />
        </a>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-[24px] text-[13.5px] font-semibold text-slate-700">
          <a
            href="#work"
            className="hover:text-slate-950 transition-colors duration-200 select-none"
          >
            {t.work}
          </a>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                setServicesDropdownOpen(!servicesDropdownOpen);
              }}
              className={`flex items-center gap-1 transition-colors duration-200 select-none py-2 cursor-pointer ${
                servicesDropdownOpen
                  ? 'text-slate-950 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              <span>{t.services}</span>
              <ArrowDown2
                size={12}
                color="currentColor"
                variant="Linear"
                className={`shrink-0 stroke-[2.5px] mt-0.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-slate-950' : ''
                }`}
              />
            </a>
          </div>

          <a
            href="#pricing"
            className="hover:text-slate-950 transition-colors duration-200 select-none"
          >
            {t.pricing}
          </a>

          <a
            href="#about"
            className="hover:text-slate-950 transition-colors duration-200 select-none"
          >
            {t.about}
          </a>

          {/* Language Switch Button */}
          <button
            onClick={toggleLang}
            className="text-[12px] font-bold px-2 py-0.5 rounded-[6px] border border-slate-200 bg-slate-100/80 hover:bg-slate-200 hover:text-slate-950 text-slate-700 transition-all cursor-pointer select-none"
            title={lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
          >
            {t.switchLang}
          </button>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="bg-slate-950 hover:bg-slate-800 text-white text-[13px] font-bold px-4 h-[38px] rounded-[12px] border border-black/10 transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center shrink-0 select-none"
          >
            {t.cta}
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-800 hover:text-black p-1.5 rounded-[10px] transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? (
              <CloseSquare size={22} color="currentColor" variant="Linear" />
            ) : (
              <Category size={22} color="currentColor" variant="Linear" />
            )}
          </button>
        </div>

        {/* Mega Menu / Services Dropdown */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute top-[calc(100%+6px)] -inset-x-2 bg-white/98 backdrop-blur-2xl border border-slate-900/12 rounded-[16px] p-3.5 shadow-[0_20px_45px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-200 ease-out z-50 ${
            servicesDropdownOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 -translate-y-1 pointer-events-none invisible'
          }`}
        >
          <div className="absolute -top-2 inset-x-0 h-2" />

          <div className="grid grid-cols-2 gap-3">
            {t.servicesList.map((item, idx) => {
              const meta = serviceCardMeta[idx] || serviceCardMeta[0];
              const IconComp = meta.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={() => setServicesDropdownOpen(false)}
                  className={`group/card p-4 rounded-[14px] border ${meta.cardBg} ${meta.cardBorder} transition-all duration-200 hover:scale-[1.015] hover:shadow-sm flex flex-col justify-between select-none ${
                    isRtl ? 'text-right' : 'text-left'
                  } cursor-pointer min-h-[114px]`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-[10px] ${meta.badgeBg} ${meta.badgeText} flex items-center justify-center shrink-0 shadow-xs group-hover/card:scale-105 transition-transform duration-200`}
                    >
                      <IconComp size={19} color="currentColor" variant="Linear" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-900 text-[14px] font-bold tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-[11.5px] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-[76px] inset-x-4 max-w-sm mx-auto bg-white/98 backdrop-blur-xl border border-slate-900/12 rounded-[16px] p-5 shadow-2xl md:hidden flex flex-col gap-3 text-center">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-800 hover:text-black py-2 text-sm font-bold border-b border-slate-100"
          >
            {t.work}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-800 hover:text-black py-2 text-sm font-bold border-b border-slate-100 flex items-center justify-center gap-1.5"
          >
            <span>{t.services}</span>
            <ArrowDown2 size={13} color="currentColor" variant="Linear" />
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-800 hover:text-black py-2 text-sm font-bold border-b border-slate-100"
          >
            {t.pricing}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-800 hover:text-black py-2 text-sm font-bold border-b border-slate-100"
          >
            {t.about}
          </a>
          <button
            onClick={() => {
              toggleLang();
              setMobileMenuOpen(false);
            }}
            className="text-slate-800 hover:text-black py-2 text-sm font-bold border-b border-slate-100"
          >
            {lang === 'fa' ? 'English (EN)' : 'فارسی (FA)'}
          </button>
          <div className="pt-2 border-t border-slate-200 mt-1">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white py-2.5 rounded-[12px] text-sm font-bold flex items-center justify-center cursor-pointer"
            >
              {t.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

