import { useEffect, useRef } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  className?: string;
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, {
    damping: 24,
    stiffness: 220,
    mass: 0.4,
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });
    return () => unsubscribe();
  }, [springValue, decimalPlaces]);

  return (
    <span
      className={cn(
        'inline-block tabular-nums text-slate-950 font-black tracking-tight',
        className
      )}
      ref={ref}
    >
      {Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(value)}
    </span>
  );
}

export default NumberTicker;
