import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import {
  ArrowLeft2,
  ArrowRight2,
  Bag2,
  Briefcase,
  Chart2,
  Cpu,
  Grid5,
  Health,
  Home2,
  Microphone2,
  Teacher,
} from 'iconsax-react';

export const categoryIcons: Record<string, typeof Grid5> = {
  all: Grid5,
  education: Teacher,
  creators: Briefcase,
  saas: Cpu,
  realestate: Home2,
  health: Health,
  podcasts: Microphone2,
  finance: Chart2,
  ecommerce: Bag2,
};

interface CategoryPillsProps {
  categories: { id: string; name: string }[];
  active: string;
  onChange: (id: string) => void;
}

// One-line niche filter. If the pills do not fit, the row scrolls horizontally
// and arrow buttons appear at the edges.
export const CategoryPills: FC<CategoryPillsProps> = ({ categories, active, onChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [update, categories.length]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(180, el.clientWidth * 0.6), behavior: 'smooth' });
  };

  return (
    <div className="relative w-full select-none">
      <div
        ref={scrollRef}
        onScroll={update}
        className="w-full overflow-x-auto no-scrollbar py-1"
      >
        <div className="flex w-max min-w-full flex-nowrap items-center justify-center gap-1.5 px-2 sm:gap-2">
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const Icon = categoryIcons[cat.id] || Grid5;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={(e) => {
                  onChange(cat.id);
                  e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
                }}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all duration-200 sm:px-3.5 sm:text-[12px] ${
                  isActive
                    ? 'border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <Icon
                  size={13}
                  variant="Bold"
                  color="currentColor"
                  className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`}
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {canLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-16 items-center bg-gradient-to-r from-white via-white/90 to-transparent">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollByDir(-1)}
            className="pointer-events-auto ml-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-all hover:scale-105 hover:border-slate-300"
          >
            <ArrowLeft2 size={15} color="currentColor" />
          </button>
        </div>
      )}
      {canRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent">
          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollByDir(1)}
            className="pointer-events-auto mr-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-all hover:scale-105 hover:border-slate-300"
          >
            <ArrowRight2 size={15} color="currentColor" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
