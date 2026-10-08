import { useState, useEffect, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown2,
  Category,
  CloseSquare,
} from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { translations } from '../data/translations';
import { trackEvent } from '../lib/analytics';

const serviceCardMeta = [
  {
    emoji: '/emojis/clapper_board.png',
    badgeBg: 'bg-[#0284C7]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#0284C7]/25',
    cardBorder: '',
  },
  {
    emoji: '/emojis/artist_palette.png',
    badgeBg: 'bg-[#EA580C]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#EA580C]/25',
    cardBorder: '',
  },
  {
    emoji: '/emojis/sparkles.png',
    badgeBg: 'bg-[#16A34A]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#16A34A]/25',
    cardBorder: '',
  },
  {
    emoji: '/emojis/headphone.png',
    badgeBg: 'bg-[#9333EA]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#9333EA]/25',
    cardBorder: '',
  },
  {
    emoji: '/emojis/movie_camera.png',
    badgeBg: 'bg-[#E11D48]',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#E11D48]/25',
    cardBorder: '',
  },
  {
    emoji: '/emojis/package.png',
    badgeBg: 'bg-sky-600',
    badgeText: 'text-white',
    cardBg: 'bg-zinc-900/90 hover:bg-[#0284C7]/25',
    cardBorder: '',
  },
];

export const Navbar: FC = () => {
  const { lang, isRtl } = useLanguage();
  const { openModal } = useQuoteModal();
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

  const openServices = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const closeServicesWithDelay = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const closeServicesImmediately = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setServicesDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ease-out px-4 ${
        scrolled ? 'pt-3 sm:pt-4' : 'pt-5 sm:pt-6'
      }`}
    >
      <nav
        onMouseEnter={() => {
          if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
          }
        }}
        onMouseLeave={closeServicesWithDelay}
        className={`relative pointer-events-auto w-full max-w-[530px] transition-all duration-300 ease-out origin-top flex flex-col overflow-hidden ${
          servicesDropdownOpen
            ? 'rounded-[26px] shadow-[0_24px_50px_rgba(0,0,0,0.55)]'
            : 'rounded-[21px] shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
        } ${
          scrolled && !servicesDropdownOpen
            ? 'bg-black backdrop-blur-2xl scale-[0.94]'
            : 'bg-black backdrop-blur-2xl scale-100'
        }`}
        aria-label="Main Navigation"
      >
        {/* Top Navbar Row */}
        <div className="h-[58px] w-full flex items-center justify-between pl-4 sm:pl-6 pr-2 md:pr-[7px] shrink-0">
          {/* Brand Logo & Logotype */}
          <Link
            to="/"
            onClick={closeServicesImmediately}
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
          <div className="hidden md:flex items-center gap-[18px] text-[14.5px] font-medium text-[#A5A5A6]">
            <Link
              to="/work"
              onMouseEnter={closeServicesImmediately}
              onClick={closeServicesImmediately}
              className="hover:text-white transition-colors duration-200 select-none"
            >
              {t.work}
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={openServices}
            >
              <Link
                to="/services"
                onClick={closeServicesImmediately}
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
              onMouseEnter={closeServicesImmediately}
              onClick={closeServicesImmediately}
              className="hover:text-white transition-colors duration-200 select-none"
            >
              {t.about}
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-analytics="primary-cta"
              data-analytics-name="start_a_project"
              data-analytics-location="navigation"
              onClick={() => {
                closeServicesImmediately();
                trackEvent('primary_cta_click', {
                  cta_name: 'start_a_project',
                  cta_location: 'navigation',
                  page_path: window.location.pathname,
                });
                openModal();
              }}
              className="bg-[#5566FF] hover:bg-[#4859F5] text-white text-[14.5px] font-semibold px-5 sm:px-6 h-[44px] rounded-[14px] border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center shrink-0 select-none"
            >
              {t.cta}
            </button>

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
        </div>

        {/* Integrated Expanding Services Menu */}
        <AnimatePresence>
          {servicesDropdownOpen && (
            <motion.div
              key="services-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden w-full"
            >
              <div className="px-3.5 pb-3.5 pt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  {t.servicesList.map((item, idx) => {
                    const meta = serviceCardMeta[idx] || serviceCardMeta[0];
                    return (
                      <Link
                        key={idx}
                        to={item.href}
                        onClick={closeServicesImmediately}
                        className={`group/card p-3.5 rounded-[14px] ${meta.cardBg} ${meta.cardBorder} transition-all duration-300 hover:scale-[1.015] hover:shadow-sm flex flex-col justify-between select-none ${
                          isRtl ? 'text-right' : 'text-left'
                        } cursor-pointer min-h-[110px]`}
                      >
                        <div className="flex items-center justify-between mb-2.5">
                          <img
                            src={meta.emoji}
                            alt=""
                            className="w-9 h-9 object-contain shrink-0 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:scale-110 group-hover/card:rotate-[-6deg]"
                          />
                        </div>

                        <div>
                          <h4 className="text-white text-[13.5px] font-bold tracking-tight mb-1">
                            {item.title}
                          </h4>
                          <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-[76px] inset-x-4 max-w-sm mx-auto bg-black backdrop-blur-xl rounded-[16px] p-5 shadow-2xl md:hidden flex flex-col gap-3 text-center">
          <Link
            to="/work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-medium border-b border-white/10"
          >
            {t.work}
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-medium border-b border-white/10 flex items-center justify-center gap-1.5"
          >
            <span>{t.services}</span>
            <ArrowDown2 size={13} color="currentColor" variant="Linear" />
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-white py-2 text-[15px] font-medium border-b border-white/10"
          >
            {t.about}
          </Link>
          <div className="pt-2 border-t border-white/10 mt-1">
            <button
              type="button"
              data-analytics="primary-cta"
              data-analytics-name="start_a_project"
              data-analytics-location="navigation_mobile"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent('primary_cta_click', {
                  cta_name: 'start_a_project',
                  cta_location: 'navigation_mobile',
                  page_path: window.location.pathname,
                });
                openModal();
              }}
              className="w-full bg-[#5566FF] hover:bg-[#4859F5] text-white py-3 rounded-full text-[15px] font-semibold flex items-center justify-center cursor-pointer border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)]"
            >
              {t.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

