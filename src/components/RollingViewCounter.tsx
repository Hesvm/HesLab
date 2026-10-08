import { useState, useEffect, useRef, type FC } from 'react';

const GREAT_TO_COUNTER_FRAMES = [
  'great',
  'grea8',
  'gre8K',
  'gr08K',
  'g508K',
  '5508K',
  '550K',
];

const COUNTER_TO_GREAT_FRAMES = [
  '550K',
  '5508K',
  'g508K',
  'gr08K',
  'gre8K',
  'grea8',
  'great',
];

function formatViewCount(n: number) {
  if (n < 1000) {
    return { value: n.toLocaleString(), suffix: 'K' };
  }
  return { value: (n / 1000).toFixed(1), suffix: 'M' };
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
    <span className="tabular-nums font-black inline-flex items-baseline gap-0.5">
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
  const [scrollY, setScrollY] = useState(0);
  const [phase, setPhase] = useState<'great' | 'morphing' | 'counter'>('great');
  const [morphText, setMorphText] = useState('great');

  const prevScrolledRef = useRef(false);
  const isMountedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const START_THRESHOLD = 35;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sy = window.scrollY;
          const wasScrolled = prevScrolledRef.current;
          const isScrolledNow = sy >= START_THRESHOLD;

          if (wasScrolled !== isScrolledNow) {
            setScrollY(sy);
          } else if (isScrolledNow && sy < 800) {
            setScrollY((prev) => (Math.abs(prev - sy) > 40 ? sy : prev));
          }
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

  const isScrolled = scrollY >= START_THRESHOLD;

  // Dynamic count target (base 550K, scaling with scroll up to 2550 -> 2.6 M)
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

      const frames = isScrolled ? GREAT_TO_COUNTER_FRAMES : COUNTER_TO_GREAT_FRAMES;

      setPhase('morphing');
      let currentFrameIndex = 0;

      timerRef.current = setInterval(() => {
        currentFrameIndex++;
        if (currentFrameIndex < frames.length) {
          setMorphText(frames[currentFrameIndex]);
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase(isScrolled ? 'counter' : 'great');
        }
      }, 35); // ~35ms per step = ~245ms smooth progressive resolve
    }
  }, [isScrolled]);

  // 1. Initial / Top of page ("great edits")
  if (phase === 'great') {
    return (
      <span className="inline-flex items-center gap-2 sm:gap-2.5 align-baseline font-black text-slate-950 select-none">
        <span className="text-slate-950 font-black">great</span>
        <span>edits</span>
      </span>
    );
  }

  // 2. Progressive Character-by-Character Morph Transition ("gre8K edits")
  if (phase === 'morphing') {
    return (
      <span className="inline-flex items-center gap-2 sm:gap-2.5 align-baseline font-black text-slate-950 select-none">
        <span className="inline-block font-black text-slate-950 tracking-tight transition-all">
          {morphText}
        </span>
        <span>edits</span>
      </span>
    );
  }

  // 3. Active Scroll Counter with Eye Icon and CountUp (" [Eye] 550K edits ")
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5 align-baseline font-black text-slate-950 select-none animate-in fade-in duration-150">
      <span dir="ltr" className="inline-flex items-center gap-1.5 sm:gap-2 font-en tracking-tight text-slate-950">
        <InstagramEyeIcon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 -translate-y-0.5" />
        <CountUp target={targetNumber} duration={1400} />
      </span>
      <span>edits</span>
    </span>
  );
};
