import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { playBenchoSound } from "@/content/soundData";
import { useLanguage } from "@/context/LanguageContext";

export function SpringPredictorWidget() {
  const { lang, isRtl } = useLanguage();
  const [guess, setGuess] = useState(0.5);
  const [revealed, setRevealed] = useState(false);

  const handleCheck = () => {
    setRevealed(true);
    if (Math.abs(guess - 1.0) < 0.15) {
      playBenchoSound("complete");
    } else {
      playBenchoSound("toggle");
    }
  };

  const handleReset = () => {
    setRevealed(false);
    playBenchoSound("click");
  };

  // Generate curve for the user's guess vs optimal critical damping (zeta = 1)
  const generateCurve = (zeta: number) => {
    const width = 280;
    const height = 80;
    const points: [number, number][] = [];
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 4;
      const x = (i / steps) * width;
      let yVal = 0;
      if (zeta < 1) {
        // Underdamped
        const omegaD = Math.sqrt(1 - zeta * zeta) * 3;
        yVal = Math.exp(-zeta * 2.5 * t) * Math.cos(omegaD * t);
      } else if (zeta === 1) {
        // Critically damped
        yVal = (1 + 2.5 * t) * Math.exp(-2.5 * t);
      } else {
        // Overdamped
        yVal = Math.exp(-1.2 * t);
      }
      const y = height - (1 - yVal) * (height * 0.75) - 10;
      points.push([x, Math.max(8, Math.min(height - 8, y))]);
    }

    return points.reduce(
      (acc, [x, y], i) => (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`),
      ""
    );
  };

  const userPath = generateCurve(guess);
  const idealPath = generateCurve(1.0);

  const isAccurate = Math.abs(guess - 1.0) < 0.12;

  return (
    <div
      className="my-6 flex flex-col gap-4 rounded-3xl border border-indigo-500/20 bg-indigo-500/[0.03] p-5 backdrop-blur-md shadow-xs select-none"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Question Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-400 font-mono">
            {lang === 'fa' ? 'آزمایشگاه پیش‌بینی' : 'Prediction Lab'}
          </span>
          <span className="text-[12px] font-semibold text-muted-foreground">
            {lang === 'fa' ? 'چالش میرایی بحرانی' : 'Critical Damping Challenge'}
          </span>
        </div>
        <p className="text-[14px] font-bold text-foreground leading-snug mt-1">
          {lang === 'fa'
            ? 'حدس بزنید: نسبت میرایی (Damping Ratio ζ) چقدر باشد تا دکمه بدون نوسان رفت‌وبرگشتی (Overshoot) در سریع‌ترین زمان بایستد؟'
            : 'Predict: What damping ratio (ζ) brings the button to rest the fastest with zero overshoot?'}
        </p>
      </div>

      {/* Slider Guess Input */}
      <div className="flex flex-col gap-2 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-4">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-muted-foreground">{lang === 'fa' ? 'حدس شما (مقدار ζ):' : 'Your Guess (ζ value):'}</span>
          <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 text-[15px]">
            {guess.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min={0.1}
          max={2.0}
          step={0.05}
          value={guess}
          disabled={revealed}
          onChange={(e) => setGuess(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-indigo-600 rounded-lg bg-zinc-200 dark:bg-zinc-800"
        />

        <div className="flex items-center justify-between text-[10.5px] text-muted-foreground font-mono">
          <span>{lang === 'fa' ? '0.1 (پرنوسان / Underdamped)' : '0.1 (Underdamped)'}</span>
          <span>{lang === 'fa' ? '1.0 (بحرانی)' : '1.0 (Critical)'}</span>
          <span>{lang === 'fa' ? '2.0 (کند و سنگین / Overdamped)' : '2.0 (Overdamped)'}</span>
        </div>
      </div>

      {/* Visual Response & Chart */}
      <div className="flex items-center justify-between gap-3">
        {!revealed ? (
          <button
            type="button"
            onClick={handleCheck}
            className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] py-2.5 text-center text-[13px] font-bold text-white transition-all cursor-pointer shadow-md shadow-indigo-600/20"
          >
            {lang === 'fa' ? 'بررسی حدس من و مشاهده فرمول' : 'Check Guess & See Formula'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-2xl border border-border bg-background hover:bg-muted py-2 text-center text-[12px] font-semibold text-foreground transition-all cursor-pointer"
          >
            {lang === 'fa' ? 'تغییر حدس و آزمایش مجدد' : 'Adjust Guess & Retry'}
          </button>
        )}
      </div>

      {/* Result Comparison Graph */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 overflow-hidden pt-2"
          >
            <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 p-4">
              <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                    <span className="size-2 rounded-full bg-indigo-600" />
                    {lang === 'fa' ? `حدس شما (${guess.toFixed(2)})` : `Your Guess (${guess.toFixed(2)})`}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-600" />
                    {lang === 'fa' ? 'مقدار ایده‌آل بحرانی (ζ = 1.0)' : 'Ideal Critical (ζ = 1.0)'}
                  </span>
                </div>
              </div>

              <div className="h-[80px] w-full" dir="ltr">
                <svg viewBox="0 0 280 80" className="size-full overflow-visible">
                  {/* Target line */}
                  <line x1="0" y1="20" x2="280" y2="20" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 3" />
                  {/* Ideal Path */}
                  <path d={idealPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                  {/* User Path */}
                  <motion.path
                    d={userPath}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
              </div>

              {/* Feedback Note */}
              <div className="mt-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 p-3 text-[12.5px] leading-relaxed">
                {isAccurate ? (
                  <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                    {lang === 'fa' ? (
                      <>🎯 <strong>عالی حدس زدید!</strong> در نسبت میرایی بحرانی (ζ = 1.0)، سیستم به سریع‌ترین شکل ممکن و بدون هیچ برگشت اضافی به حالت سکون می‌رسد.</>
                    ) : (
                      <>🎯 <strong>Spot on!</strong> At critical damping (ζ = 1.0), the system settles as quickly as possible without any oscillatory overshoot.</>
                    )}
                  </p>
                ) : guess < 1.0 ? (
                  <p className="text-amber-700 dark:text-amber-400 font-medium">
                    {lang === 'fa' ? (
                      <>⚡ <strong>کمتر از حد بحرانی (Underdamped):</strong> دکمه از مقصد عبور کرده و چند بار نوسان می‌کند (Overshoot).</>
                    ) : (
                      <>⚡ <strong>Underdamped:</strong> The button overshoots the target and bounces back and forth before coming to rest.</>
                    )}
                  </p>
                ) : (
                  <p className="text-indigo-700 dark:text-indigo-400 font-medium">
                    {lang === 'fa' ? (
                      <>🐢 <strong>بیشتر از حد بحرانی (Overdamped):</strong> دکمه کندتر از حد معمول به مقصد می‌رسد و حس سنگینی می‌دهد.</>
                    ) : (
                      <>🐢 <strong>Overdamped:</strong> The button approaches the target too sluggishly, feeling heavy and unresponsive.</>
                    )}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
