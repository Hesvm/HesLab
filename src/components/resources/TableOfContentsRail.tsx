import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export interface TableOfContentsRailProps {
  sections: { title: string; id: string }[];
  activeIdx: number;
  onSelectSection: (id: string, idx: number) => void;
  progress: number;
}

export const TableOfContentsRail: FC<TableOfContentsRailProps> = ({
  sections,
  activeIdx,
  onSelectSection,
  progress,
}) => {
  const { lang, isRtl } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeOrHoveredIdx = hoveredIdx !== null ? hoveredIdx : null;
  const activeOrHoveredItem = activeOrHoveredIdx !== null ? sections[activeOrHoveredIdx] : null;

  return (
    <div className="relative flex items-center justify-center select-none" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Vertical Navigation Rail */}
      <nav
        aria-label={lang === 'fa' ? 'فهرست مطالب مقاله' : 'Table of Contents'}
        onPointerLeave={() => setHoveredIdx(null)}
        className="relative flex flex-col items-center gap-1 py-1 px-1"
      >
        {sections.map((sec, i) => {
          const isHoveredState = hoveredIdx !== null;
          const target = isHoveredState ? hoveredIdx : activeIdx;
          const distance = Math.abs(i - target);
          const scale = isHoveredState
            ? distance === 0
              ? 1
              : distance === 1
              ? 0.72
              : distance === 2
              ? 0.48
              : 0.3
            : i === activeIdx
            ? 1
            : 0.4;

          const isDark = isHoveredState ? distance === 0 : i === activeIdx;

          return (
            <button
              key={sec.id}
              type="button"
              aria-label={sec.title}
              title={sec.title}
              onClick={() => onSelectSection(sec.id, i)}
              onPointerEnter={() => setHoveredIdx(i)}
              onFocus={() => setHoveredIdx(i)}
              className="flex h-3 w-7 items-center justify-center cursor-pointer group"
            >
              <motion.span
                aria-hidden="true"
                animate={{ scaleX: scale }}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className={`block h-[2.5px] w-5 origin-center rounded-full transition-colors duration-150 ${
                  isDark ? 'bg-slate-950' : 'bg-slate-300 group-hover:bg-slate-500'
                }`}
              />
            </button>
          );
        })}

        {/* Floating Preview Card */}
        <AnimatePresence>
          {activeOrHoveredItem && activeOrHoveredIdx !== null && (
            <motion.div
              key={activeOrHoveredItem.id}
              initial={{ opacity: 0, x: isRtl ? 8 : -8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: isRtl ? 6 : -6, filter: 'blur(4px)' }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 w-56 rounded-2xl border border-black/[0.08] bg-white/95 p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.12)] backdrop-blur-md text-start z-50 ${
                isRtl ? 'right-[calc(100%+12px)]' : 'left-[calc(100%+12px)]'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium mb-1">
                <span>
                  {isRtl
                    ? `بخش ${toPersianDigits(activeOrHoveredIdx + 1)}`
                    : `Section ${activeOrHoveredIdx + 1}`}
                </span>
                <span>
                  {isRtl
                    ? `${toPersianDigits(Math.round(progress * 100))}٪ مطالعه شده`
                    : `${Math.round(progress * 100)}% read`}
                </span>
              </div>
              <p className="text-[13px] font-bold text-zinc-950 leading-snug">
                {activeOrHoveredItem.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default TableOfContentsRail;
