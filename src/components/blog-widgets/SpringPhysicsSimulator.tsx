"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import NumberFlow from "@number-flow/react";
import { playBenchoSound } from "@/content/soundData";

export function SpringPhysicsSimulator() {
  const [stiffness, setStiffness] = useState(250);
  const [damping, setDamping] = useState(20);
  const [mass, setMass] = useState(1);
  const [triggerKey, setTriggerKey] = useState(0);

  // Generate harmonic oscillation curve path for SVG
  // Equation: x(t) = e^(-gamma * t) * cos(omega * t)
  const generateCurvePath = () => {
    const width = 320;
    const height = 90;
    const points: [number, number][] = [];
    const steps = 60;
    const gamma = damping / (2 * mass * 15);
    const omega = Math.sqrt(Math.max(0.1, stiffness / mass)) / 4;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 4; // 0 to 4 seconds simulation
      const x = (i / steps) * width;
      const decay = Math.exp(-gamma * t);
      const val = decay * Math.cos(omega * t);
      const y = height / 2 - val * (height * 0.38);
      points.push([x, y]);
    }

    return points.reduce(
      (acc, [x, y], i) => (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`),
      ""
    );
  };

  const handleTest = () => {
    playBenchoSound("bubble");
    setTriggerKey((k) => k + 1);
  };

  const pathD = generateCurvePath();

  return (
    <div className="my-6 flex flex-col gap-4 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/80 p-5 backdrop-blur-md shadow-xs select-none" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-orange-500 animate-pulse" />
          <h4 className="text-[13.5px] font-bold text-foreground">شبیه‌ساز زنده فیزیک فنر (Spring Simulator)</h4>
        </div>
        <button
          type="button"
          onClick={handleTest}
          className="rounded-full bg-zinc-900 dark:bg-zinc-100 px-3.5 py-1 text-[11.5px] font-medium text-white dark:text-zinc-950 transition-transform active:scale-95 hover:opacity-90 cursor-pointer shadow-xs"
        >
          شبیه‌سازی رهاسازی
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Visual Spring Box */}
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-4">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="size-28 rounded-full border border-dashed border-current" />
          </div>

          <motion.div
            key={triggerKey}
            initial={{ scale: 0.3, y: -40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: stiffness,
              damping: damping,
              mass: mass,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            className="flex size-18 cursor-grab active:cursor-grabbing items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white font-black text-sm shadow-[0_8px_24px_rgba(249,115,22,0.35)]"
          >
            Spring
          </motion.div>
        </div>

        {/* Oscillation Curve Visualizer */}
        <div className="flex flex-col gap-1.5 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-3.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span>منحنی نوسان (Harmonic Decay)</span>
            <span className="text-orange-500 font-semibold">x(t)</span>
          </div>
          <div className="h-[90px] w-full overflow-hidden" dir="ltr">
            <svg viewBox="0 0 320 90" className="size-full overflow-visible">
              <line x1="0" y1="45" x2="320" y2="45" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#orangeGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
              <defs>
                <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Stiffness */}
        <div className="flex flex-col gap-1.5 rounded-xl bg-white/70 dark:bg-zinc-950/70 p-2.5 border border-black/[0.04] dark:border-white/[0.04]">
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-muted-foreground font-medium">سختی (Stiffness)</span>
            <span className="font-mono font-bold text-foreground">
              <NumberFlow value={stiffness} />
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={600}
            step={10}
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-orange-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        </div>

        {/* Damping */}
        <div className="flex flex-col gap-1.5 rounded-xl bg-white/70 dark:bg-zinc-950/70 p-2.5 border border-black/[0.04] dark:border-white/[0.04]">
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-muted-foreground font-medium">میرایی (Damping)</span>
            <span className="font-mono font-bold text-foreground">
              <NumberFlow value={damping} />
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-orange-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        </div>

        {/* Mass */}
        <div className="flex flex-col gap-1.5 rounded-xl bg-white/70 dark:bg-zinc-950/70 p-2.5 border border-black/[0.04] dark:border-white/[0.04]">
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="text-muted-foreground font-medium">جرم (Mass)</span>
            <span className="font-mono font-bold text-foreground">
              <NumberFlow value={mass} />
            </span>
          </div>
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer accent-orange-500 rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        </div>
      </div>
    </div>
  );
}
