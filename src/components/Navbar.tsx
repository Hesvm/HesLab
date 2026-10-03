import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import { trackEvent } from '../lib/analytics';

const serviceCardMeta = [
  {
    icon: VideoPlay,
    badgeBg: 'bg-[#0284C7]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-sky-500/50',
  },
  {
    icon: Flash,
    badgeBg: 'bg-[#EA580C]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-orange-500/50',
  },
  {
    icon: TextalignCenter,
    badgeBg: 'bg-[#16A34A]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-emerald-500/50',
  },
  {
    icon: Music,
    badgeBg: 'bg-[#9333EA]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-purple-500/50',
  },
  {
    icon: Magicpen,
    badgeBg: 'bg-[#E11D48]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-rose-500/50',
  },
  {
    icon: BagTick,
    badgeBg: 'bg-sky-600',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-zinc-800/90',
    cardBorder: 'border-zinc-800 hover:border-sky-500/50',
  },
];

export const Navbar: FC = () => {
  const { lang, isRtl } = useLanguage();
  const location = useLocation();
  const t = translations[lang].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToHash = (hash: string) => {
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-out px-4 ${
        scrolled ? 'pt-3 sm:pt-4' : 'pt-5 sm:pt-6'
      }`}
    >
      <nav
        className={`relative pointer-events-auto w-full max-w-[510px] h-[58px] rounded-[21px] transition-all duration-300 ease-out origin-top flex items-center justify-between pl-4 sm:pl-6 pr-2 md:pr-[7px] ${
          scrolled
            ? 'bg-[#1E1E1F]/95 backdrop-blur-2xl shadow-[0_16px_36px_rgba(0,0,0,0.5)] scale-[0.94]'
            : 'bg-[#1E1E1F]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] scale-100'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Logotype */}
        <Link
          to="/"
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
            className="h-[28px] w-auto object-contain select-none group-hover:opacity-90 transition-opacity duration-200 brightness-0 invert"
          />
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-[18px] text-[14.5px] font-normal text-[#A5A5A6]">
          {location.pathname === '/' ? (
            <a
              href="#work"
              onClick={() => scrollToHash('#work')}
              className="hover:text-white transition-colors duration-200 select-none"
            >
              {t.work}
            </a>
          ) : (
            <Link
              to="/work"
              className="hover:text-white transition-colors duration-200 select-none"
            >
              {t.work}
            </Link>
          )}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/services"
              onClick={() => setServicesDropdownOpen(false)}
              className={`flex items-center gap-1 transition-colors duration-200 select-none py-2 cursor-pointer ${
                servicesDropdownOpen ? 'text-white' : 'hover:text-white'
              }`}
            >
              <span>{t.services}</span>
              <ArrowDown2
                size={12}
                color="currentColor"
                variant="Linear"
                className={`shrink-0 stroke-[2.5px] mt-0.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </Link>
          </div>

          <Link
            to="/about"
            className="hover:text-white transition-colors duration-200 select-none"
          >
            {t.about}
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            onClick={() => trackEvent('primary_cta_click', { source: 'navbar_cta' })}
            className="bg-[#00A7F5] hover:bg-[#0096DC] text-white text-[14.5px] font-normal px-5 sm:px-6 h-[44px] rounded-[14px] border border-sky-400/20 shadow-[0_4px_16px_rgba(0,167,245,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center shrink-0 select-none"
          >
            {t.cta}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#A5A5A6] hover:text-white p-1.5 rounded-[10px] transition-colors cursor-pointer"
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
          className={`absolute top-[calc(100%+6px)] -inset-x-2 bg-[#1E1E1F]/98 backdrop-blur-2xl border border-white/10 rounded-[16px] p-3.5 shadow-[0_20px_45px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-200 ease-out z-50 ${
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
                <Link
                  key={idx}
                  to={item.href}
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
                    <h4 className="text-white text-[14px] font-bold tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400 text-[11.5px] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-[76px] inset-x-4 max-w-sm mx-auto bg-[#1E1E1F]/98 backdrop-blur-xl border border-white/10 rounded-[16px] p-5 shadow-2xl md:hidden flex flex-col gap-3 text-center">
          <Link
            to="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-normal border-b border-white/10"
          >
            {t.work}
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-normal border-b border-white/10 flex items-center justify-center gap-1.5"
          >
            <span>{t.services}</span>
            <ArrowDown2 size={13} color="currentColor" variant="Linear" />
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-normal border-b border-white/10"
          >
            {t.about}
          </Link>
          <div className="pt-2 border-t border-white/10 mt-1">
            <Link
              to="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('primary_cta_click', { source: 'mobile_menu_cta' });
              }}
              className="w-full bg-[#00A7F5] hover:bg-[#0096DC] text-white py-3 rounded-full text-[15px] font-normal flex items-center justify-center cursor-pointer shadow-md"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

