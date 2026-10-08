import { type FC, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// ---------------------------------------------------------
// 1. Interactive Social Badges Stack (Card 1)
// ---------------------------------------------------------
interface SocialBadgesProps {
  onHoverStateChange?: (hovered: boolean) => void;
}

const SocialBadgesStack: FC<SocialBadgesProps> = () => {
  const [hoveredBadge, setHoveredBadge] = useState<'yt' | 'tt' | 'ig' | null>(null);

  // Spring transition for the playful "bloop bloop" spring bounce
  const bloopSpring = {
    type: 'spring' as const,
    stiffness: 450,
    damping: 14,
    mass: 0.6,
  };

  const returnSpring = {
    type: 'spring' as const,
    stiffness: 380,
    damping: 20,
  };

  return (
    <div className="relative w-32 sm:w-36 md:w-40 h-20 sm:h-22 md:h-24 flex items-center justify-center select-none translate-y-0 sm:-translate-y-0.5">
      <div className="relative w-full h-full">
        {/* YouTube Badge (Top-Left, tightly behind Instagram) */}
        <motion.div
          onMouseEnter={() => setHoveredBadge('yt')}
          onMouseLeave={() => setHoveredBadge(null)}
          animate={{
            scale: hoveredBadge === 'yt' ? 1.09 : 1,
            rotate: hoveredBadge === 'yt' ? -3 : -5.1,
            y: hoveredBadge === 'yt' ? -3 : 0,
            zIndex: hoveredBadge === 'yt' ? 40 : 10,
          }}
          transition={hoveredBadge === 'yt' ? bloopSpring : returnSpring}
          className="absolute top-[calc(63%-23px)] sm:top-[calc(63%-25px)] md:top-[calc(63%-27px)] left-[calc(50%-23px)] sm:left-[calc(50%-25px)] md:left-[calc(50%-27px)] -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] md:w-[63px] md:h-[63px] cursor-pointer"
          style={{
            filter:
              hoveredBadge === 'yt'
                ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18))'
                : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))',
          }}
        >
          <img
            src="/stats-icons/badge-youtube.svg"
            alt="YouTube"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </motion.div>

        {/* TikTok Badge (Top-Right, tightly behind Instagram) */}
        <motion.div
          onMouseEnter={() => setHoveredBadge('tt')}
          onMouseLeave={() => setHoveredBadge(null)}
          animate={{
            scale: hoveredBadge === 'tt' ? 1.09 : 1,
            rotate: hoveredBadge === 'tt' ? 3 : 5.1,
            y: hoveredBadge === 'tt' ? -3 : 0,
            zIndex: hoveredBadge === 'tt' ? 40 : 10,
          }}
          transition={hoveredBadge === 'tt' ? bloopSpring : returnSpring}
          className="absolute top-[calc(63%-23px)] sm:top-[calc(63%-25px)] md:top-[calc(63%-27px)] left-[calc(50%+20px)] sm:left-[calc(50%+22px)] md:left-[calc(50%+24px)] -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] md:w-[63px] md:h-[63px] cursor-pointer"
          style={{
            filter:
              hoveredBadge === 'tt'
                ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18))'
                : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))',
          }}
        >
          <img
            src="/stats-icons/badge-tiktok.svg"
            alt="TikTok"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </motion.div>

        {/* Instagram Badge (Bottom-Center, Foreground) */}
        <motion.div
          onMouseEnter={() => setHoveredBadge('ig')}
          onMouseLeave={() => setHoveredBadge(null)}
          animate={{
            scale: hoveredBadge === 'ig' ? 1.09 : 1,
            rotate: hoveredBadge === 'ig' ? 0 : 0,
            y: hoveredBadge === 'ig' ? -3 : 0,
            zIndex: hoveredBadge === 'ig' ? 40 : 20,
          }}
          transition={hoveredBadge === 'ig' ? bloopSpring : returnSpring}
          className="absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] md:w-[63px] md:h-[63px] cursor-pointer"
          style={{
            filter:
              hoveredBadge === 'ig'
                ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.20))'
                : 'drop-shadow(0 5px 12px rgba(0, 0, 0, 0.13))',
          }}
        >
          <img
            src="/stats-icons/badge-instagram.svg"
            alt="Instagram"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 2. Animated Calendar Card (Card 2: 1 -> 2 -> 3 Days)
// ---------------------------------------------------------
interface CalendarCardProps {
  day: number;
  lang: 'fa' | 'en';
}

const CalendarCard: FC<CalendarCardProps> = ({ day }) => {
  const displayDigit = String(day);

  return (
    <div className="relative aspect-[155/154] h-[78%] sm:h-[82%] md:h-[86%] flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-300">
      <img
        src="/stats-icons/turnaround-base.svg"
        alt="Calendar"
        className="w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      {/* Dynamic Animated Day Number */}
      <div className="absolute top-[61.5%] left-[50.2%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center overflow-visible pointer-events-none">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={day}
            initial={{ y: -16, opacity: 0, scale: 0.72, rotateX: -45 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: 16, opacity: 0, scale: 0.72, rotateX: 45 }}
            transition={{
              type: 'spring',
              stiffness: 480,
              damping: 24,
              mass: 0.6,
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FF6F71] to-[#E92B2E] text-[36px] sm:text-[40px] md:text-[44px] leading-none select-none tracking-tight drop-shadow-2xs"
            style={{
              fontFamily: "'Plus Jakarta Display', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 800,
            }}
          >
            {displayDigit}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 3. Scroll-Linked Clapper Board (Card 3: Dynamic Hue Shift)
// ---------------------------------------------------------
interface ClapperBoardProps {
  hue: number;
  isHovered?: boolean;
}

const ClapperBoardCard: FC<ClapperBoardProps> = ({ hue, isHovered: externalHovered }) => {
  const [internalHovered, setInternalHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const isHovered = Boolean(externalHovered || internalHovered);

  // Gently oscillates strictly between Navy (-22deg), Signature Blurple (0deg), and Violet (+22deg) on scroll
  const scrollHue = Math.sin((hue * Math.PI) / 180) * 22;

  // Striking color transformation on hover: shifts hue smoothly to vibrant electric sapphire blue (-75deg)
  const hoverShift = isHovered ? -75 : 0;
  // Interactive click cycle shifts to another color palette (+90deg)
  const clickShift = (clickCount % 4) * 90;
  const totalHue = scrollHue + hoverShift + clickShift;

  return (
    <div
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
      onClick={() => setClickCount((prev) => prev + 1)}
      className="relative aspect-[155/154] h-[78%] sm:h-[82%] md:h-[86%] flex items-center justify-center select-none group cursor-pointer"
    >
      {/* Animated Clapper Board Vector with Dynamic Hover & Scroll Palette */}
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: -2,
          transition: { type: 'spring', stiffness: 420, damping: 16 },
        }}
        whileTap={{ scale: 0.94, rotate: 2 }}
        style={{
          filter: `hue-rotate(${totalHue}deg)${isHovered ? ' saturate(1.35) brightness(1.12)' : ''}`,
          transition: 'filter 0.35s ease-out',
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <img
          src="/stats-icons/custom_edit.svg"
          alt="Clapper Board"
          className="w-full h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------
// MAIN STATS BAR COMPONENT
// ---------------------------------------------------------
export const StatsBar: FC = () => {
  const { lang } = useLanguage();
  const t = translations[lang].stats;

  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of this section as soon as it begins entering viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 98%', 'end 5%'],
  });

  // Calendar Day state: progresses 1 -> 2 -> 3 early as user scrolls
  const [calendarDay, setCalendarDay] = useState<number>(1);
  // Clapper hue state: shifts smoothly throughout the scroll
  const [clapperHue, setClapperHue] = useState<number>(0);
  const [clapperHovered, setClapperHovered] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 1. Calendar flip logic (starts early as user scrolls down from Hero)
    if (latest < 0.18) {
      setCalendarDay(1);
    } else if (latest < 0.32) {
      setCalendarDay(2);
    } else {
      setCalendarDay(3);
    }

    // 2. Clapper board dynamic hue rotation (smooth oscillation strictly in Navy/Purple/Blue)
    setClapperHue(Math.round(latest * 360));
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-[22vh] sm:-mt-[26vh] pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-24 md:pb-28 px-4 max-w-[840px] mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4.5">
        {/* CARD 1: Short-Form Focused */}
        <div className="flex flex-col items-center">
          <div className="w-full h-24 sm:h-28 md:h-32 rounded-[20px] sm:rounded-[22px] border border-slate-200/90 bg-white flex items-center justify-center p-2.5 sm:p-3 shadow-2xs hover:border-slate-300 transition-all duration-300 relative group">
            <SocialBadgesStack />
          </div>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] md:text-[16.5px] font-extrabold text-slate-900 text-center tracking-tight leading-snug">
            {t.items[0]?.label ?? 'Short-form focused'}
          </p>
        </div>

        {/* CARD 2: 3 Days Turnaround */}
        <div className="flex flex-col items-center">
          <div
            onClick={() => setCalendarDay((prev) => (prev % 3) + 1)}
            className="w-full h-24 sm:h-28 md:h-32 rounded-[20px] sm:rounded-[22px] border border-slate-200/90 bg-white flex items-center justify-center p-2.5 sm:p-3 shadow-2xs hover:border-slate-300 transition-all duration-300 relative group cursor-pointer"
          >
            <CalendarCard day={calendarDay} lang={lang} />
          </div>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] md:text-[16.5px] font-extrabold text-slate-900 text-center tracking-tight leading-snug">
            {t.items[1]?.label ?? '3 days turnaround'}
          </p>
        </div>

        {/* CARD 3: Custom Edit Style */}
        <div className="flex flex-col items-center">
          <div
            onMouseEnter={() => setClapperHovered(true)}
            onMouseLeave={() => setClapperHovered(false)}
            className="w-full h-24 sm:h-28 md:h-32 rounded-[20px] sm:rounded-[22px] border border-slate-200/90 bg-white flex items-center justify-center p-2.5 sm:p-3 shadow-2xs hover:border-slate-300 transition-all duration-300 relative group cursor-pointer"
          >
            <ClapperBoardCard hue={clapperHue} isHovered={clapperHovered} />
          </div>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] md:text-[16.5px] font-extrabold text-slate-900 text-center tracking-tight leading-snug">
            {t.items[2]?.label ?? 'Custom edit style'}
          </p>
        </div>
      </div>
    </section>
  );
};
