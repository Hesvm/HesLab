"use client";

import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { playBenchoSound } from "@/content/soundData";
import { ArrowLeft, ArrowRight } from "iconsax-react";

export function MagneticStepWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0, dist: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "گام اول: موقعیت‌سنجی برداری موس (Pointer Tracking)",
      desc: "مرکز دکمه به عنوان مبدا مختصات (0, 0) در نظر گرفته می‌شود و فاصله افقی (Δx) و عمودی (Δy) موس نسبت به مرکز محاسبه می‌گردد.",
      formula: "Δx = MouseX - CenterX  |  Δy = MouseY - CenterY",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "گام دوم: محاسبه فاصله اقلیدسی (Euclidean Distance)",
      desc: "فاصله واقعی موس از مرکز دکمه با قضیه فیثاغورس محاسبه می‌شود تا تعیین کنیم آیا موس در شعاع میدان مغناطیسی قرار دارد یا خیر.",
      formula: "d = √(Δx² + Δy²)",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "گام سوم: اعمال ضریب جذب و میرایی (Magnetic Pull)",
      desc: "اگر فاصله از شعاع R کمتر باشد، نیروی کشش نرمی اعمال می‌شود تا دکمه فقط کسری از فاصله موس را با ترنزیشن فنری طی کند.",
      formula: "ShiftX = Δx × (1 - d/R) × 0.4",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setCoords({ x: Math.round(dx), y: Math.round(dy), dist: Math.round(dist) });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, dist: 0 });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      playBenchoSound("click");
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      playBenchoSound("click");
      setCurrentStep((s) => s - 1);
    }
  };

  const step = steps[currentStep];
  const radius = 120;
  const isInside = coords.dist < radius && coords.dist > 0;
  const pullFactor = isInside ? (1 - coords.dist / radius) * 0.45 : 0;
  const buttonX = coords.x * pullFactor;
  const buttonY = coords.y * pullFactor;

  return (
    <div className="my-6 flex flex-col gap-4 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/80 p-5 backdrop-blur-md shadow-xs select-none" dir="rtl">
      {/* Header & Step Dots */}
      <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-2 py-0.5 text-[10px] font-bold font-mono">
            گام {currentStep + 1} از {steps.length}
          </span>
          <h4 className="text-[13.5px] font-bold text-foreground">الگوریتم گام‌به‌گام دکمه مغناطیسی</h4>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-1.5" dir="ltr">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex size-7 items-center justify-center rounded-full border border-border bg-background text-foreground disabled:opacity-30 hover:bg-muted cursor-pointer transition-all"
          >
            <ArrowLeft size="14" variant="Linear" color="currentColor" />
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex size-7 items-center justify-center rounded-full border border-border bg-background text-foreground disabled:opacity-30 hover:bg-muted cursor-pointer transition-all"
          >
            <ArrowRight size="14" variant="Linear" color="currentColor" />
          </button>
        </div>
      </div>

      {/* Interactive Canvas Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-48 w-full cursor-crosshair items-center justify-center overflow-hidden rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-4"
      >
        {/* Magnetic field circle visualization */}
        <div
          className={`absolute rounded-full border border-dashed transition-all duration-300 pointer-events-none ${
            isInside
              ? "border-emerald-500/50 bg-emerald-500/5 scale-105"
              : "border-zinc-300 dark:border-zinc-700 opacity-60"
          }`}
          style={{ width: radius * 2, height: radius * 2 }}
        />

        {/* Center Coordinate Axis */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="h-full w-[1px] bg-current" />
          <div className="w-full h-[1px] bg-current" />
        </div>

        {/* Vector Line to Mouse */}
        {coords.dist > 0 && (
          <svg className="absolute inset-0 size-full pointer-events-none">
            <line
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${coords.x}px)`}
              y2={`calc(50% + ${coords.y}px)`}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        )}

        {/* Magnetic Button */}
        <motion.div
          animate={{ x: buttonX, y: buttonY }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative z-10 flex h-12 px-6 items-center justify-center rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs shadow-lg shadow-black/10"
        >
          {isInside ? "در میدان جاذبه 🧲" : "موس را نزدیک کنید"}
        </motion.div>

        {/* Live Coordinate Badge */}
        <div className="absolute bottom-2.5 left-2.5 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-white/90 dark:bg-zinc-900/90 px-2.5 py-1 text-[10px] font-mono text-muted-foreground backdrop-blur-xs flex items-center gap-2" dir="ltr">
          <span>Δx: {coords.x}px</span>
          <span>Δy: {coords.y}px</span>
          <span className="font-bold text-indigo-500">d: {coords.dist}px</span>
        </div>
      </div>

      {/* Step Description Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="flex flex-col gap-2 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-4"
      >
        <h5 className="text-[13.5px] font-bold text-foreground">{step.title}</h5>
        <p className="text-[12.5px] text-muted-foreground leading-relaxed">{step.desc}</p>
        <div className="mt-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-2.5 font-mono text-[11.5px] font-semibold text-indigo-600 dark:text-indigo-400" dir="ltr">
          {step.formula}
        </div>
      </motion.div>
    </div>
  );
}
