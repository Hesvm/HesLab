import { useState, useEffect, useRef, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FA_TO_COUNTER_FRAMES = [
  'اوج',
  'او۸',
  'اوK',
  'ا۵K',
  'ا0K',
  '۹0K',
  '100K',
];

const FA_TO_PEAK_FRAMES = [
  '100K',
  '10۰K',
  '10ج',
  '1۴ج',
  '1وج',
  '۷وج',
  'اوج',
];

const EN_TO_COUNTER_FRAMES = [
  'Peak',
  'Pea8',
  'PeaK',
  'Pe0K',
  'P00K',
  '800K',
  '100K',
];

const EN_TO_PEAK_FRAMES = [
  '100K',
  '100k',
  '10ak',
  '1eak',
  '8eak',
  'Peak',
];

function formatViewCount(n: number) {
  if (n < 1000) {
    return { value: n.toLocaleString(), suffix: 'K' };
  }
  return { value: (n / 1000).toFixed(3), suffix: 'M' };
}

interface CountUpProps {
  target: number;
  duration?: number;
}

const CountUp: FC<CountUpProps> = ({ target, duration = 1400 }) => {
  const [n, setN] = useState(0);
  const startValRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const t0 = performance.now();
    const fromVal = startValRef.current;
    const diff = target - fromVal;

    const step = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      // Ease out cubic interpolation: (1 - (1-p)^3)
      const current = Math.round(fromVal + diff * (1 - Math.pow(1 - p, 3)));
      setN(current);
      startValRef.current = current;

      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  const { value, suffix } = formatViewCount(n);

  return (
    <span className="tabular-nums font-black inline-flex items-baseline gap-1">
      <span>{value}</span>
      <span className="font-black text-slate-950">{suffix}</span>
    </span>
  );
};

const InstagramEyeIcon: FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={`inline-block shrink-0 text-slate-950 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Upper Eyelid Arch */}
    <path
      d="M3.75 13.5C5 8.7 8.25 5.5 12 5.5C15.75 5.5 19 8.7 20.25 13.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Iris / Pupil */}
    <path
      d="M12 9.5C9.51 9.5 7.5 11.51 7.5 14C7.5 16.49 9.51 18.5 12 18.5C14.49 18.5 16.5 16.49 16.5 14C16.5 13.8 16.48 13.6 16.44 13.41C15.82 13.72 14.85 13.65 13.95 12.75C13.05 11.85 12.98 10.88 13.29 10.26C12.88 9.77 12.46 9.5 12 9.5Z"
      fill="currentColor"
    />
  </svg>
);

export const RollingViewCounter: FC = () => {
  const { lang } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [phase, setPhase] = useState<'peak' | 'morphing' | 'counter'>('peak');
  const [morphText, setMorphText] = useState('اوج');

  const prevScrolledRef = useRef(false);
  const isMountedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const START_THRESHOLD = 35;
  const isScrolled = scrollY >= START_THRESHOLD;

  // Dynamic count target (base 550K, scaling with scroll up to 2550 -> 2.550 M)
  const scrollRange = 600;
  const progress = Math.min(Math.max((scrollY - START_THRESHOLD) / scrollRange, 0), 1);
  const targetNumber = Math.round(550 + Math.pow(progress, 1.25) * 2000);

  // Progressive character-by-character morph on threshold crossing
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      prevScrolledRef.current = isScrolled;
      return;
    }

    if (prevScrolledRef.current !== isScrolled) {
      prevScrolledRef.current = isScrolled;

      if (timerRef.current) clearInterval(timerRef.current);

      const frames = isScrolled
        ? (lang === 'fa' ? FA_TO_COUNTER_FRAMES : EN_TO_COUNTER_FRAMES)
        : (lang === 'fa' ? FA_TO_PEAK_FRAMES : EN_TO_PEAK_FRAMES);

      setPhase('morphing');
      let currentFrameIndex = 0;

      timerRef.current = setInterval(() => {
        currentFrameIndex++;
        if (currentFrameIndex < frames.length) {
          setMorphText(frames[currentFrameIndex]);
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase(isScrolled ? 'counter' : 'peak');
        }
      }, 35); // ~35ms per step = ~245ms smooth progressive resolve
    }
  }, [isScrolled, lang]);

  // 1. Initial / Top of page ("به اوج می‌رسونه")
  if (phase === 'peak') {
    if (lang === 'fa') {
      return (
        <span className="inline-flex items-center gap-1.5 align-baseline font-black text-slate-950 select-none">
          <span>به</span>
          <span className="text-slate-950 font-black">اوج</span>
          <span>می‌رسونه</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 align-baseline font-black text-slate-950 select-none">
        <span>To The</span>
        <span className="text-slate-950 font-black">Peak</span>
      </span>
    );
  }

  // 2. Progressive Character-by-Character Morph Transition
  if (phase === 'morphing') {
    if (lang === 'fa') {
      return (
        <span className="inline-flex items-center gap-1.5 align-baseline font-black text-slate-950 select-none">
          <span>به</span>
          <span className="inline-block font-black text-slate-950 tracking-tight transition-all">
            {morphText}
          </span>
          <span>می‌رسونه</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 align-baseline font-black text-slate-950 select-none">
        <span>To</span>
        <span className="inline-block font-black text-slate-950 tracking-tight transition-all">
          {morphText}
        </span>
      </span>
    );
  }

  // 3. Active Scroll Counter with requestAnimationFrame Ease-Out Cubic CountUp
  if (lang === 'fa') {
    return (
      <span className="inline-flex items-center gap-2 align-baseline font-black text-slate-950 select-none animate-in fade-in duration-150">
        <span>به</span>
        
        <span dir="ltr" className="inline-flex items-center gap-1.5 font-en tracking-tight text-slate-950">
          <InstagramEyeIcon className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 -translate-y-0.5" />
          <CountUp target={targetNumber} duration={1400} />
        </span>

        <span>می‌رسونه</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 align-baseline font-black text-slate-950 select-none animate-in fade-in duration-150">
      <span>To</span>
      
      <span dir="ltr" className="inline-flex items-center gap-1.5 font-en tracking-tight text-slate-950">
        <InstagramEyeIcon className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 -translate-y-0.5" />
        <CountUp target={targetNumber} duration={1400} />
      </span>

      <span>Views</span>
    </span>
  );
};

