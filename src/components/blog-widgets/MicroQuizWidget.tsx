"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import { playBenchoSound } from "@/content/soundData";
import { TickCircle, CloseCircle } from "iconsax-react";

export function MicroQuizWidget() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const correctOption = 2; // option 3: transform & opacity

  const options = [
    { id: 0, text: "تغییر مستقیم ویژگی‌های width و margin با ترنزیشن CSS" },
    { id: 1, text: "استفاده از setInterval با بازه زمانی ۱۰ میلی‌ثانیه" },
    { id: 2, text: "استفاده از GPU Compositing با مقادیر transform و opacity" },
    { id: 3, text: "اجرای محاسبات سنگین ریاضی در ترد اصلی جاوااسکریپت" },
  ];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    if (idx === correctOption) {
      playBenchoSound("complete");
    } else {
      playBenchoSound("toggle");
    }
  };

  return (
    <div className="my-6 flex flex-col gap-3.5 rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/90 dark:bg-zinc-900/90 p-5 backdrop-blur-md shadow-xs select-none" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 font-mono">
            میکروکوییز فوری
          </span>
          <h4 className="text-[13.5px] font-bold text-foreground">تست سنجش درک فیزیک انیمیشن</h4>
        </div>
      </div>

      {/* Question */}
      <p className="text-[14px] font-bold text-foreground leading-snug">
        کدام روش تضمین می‌کند که انیمیشن فنری شما روی تمام دستگاه‌ها با نرخ ۶۰ یا ۱۲۰ فریم در ثانیه (بدون افت فریم) اجرا شود؟
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2 pt-1">
        {options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCorrect = opt.id === correctOption;
          const showState = selectedOption !== null;

          let btnStyles = "border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-950 text-foreground hover:border-zinc-400";
          if (showState) {
            if (isCorrect) {
              btnStyles = "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-300 font-semibold";
            } else if (isSelected) {
              btnStyles = "border-rose-500 bg-rose-500/10 text-rose-950 dark:text-rose-300 font-semibold";
            } else {
              btnStyles = "opacity-40 border-black/[0.04] dark:border-white/[0.04] bg-white/50 dark:bg-zinc-950/50";
            }
          }

          return (
            <motion.button
              key={opt.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(opt.id)}
              className={`flex items-center justify-between rounded-2xl border p-3.5 text-right text-[13px] transition-all cursor-pointer ${btnStyles}`}
            >
              <span>{opt.text}</span>
              {showState && isCorrect && (
                <TickCircle size="18" variant="Bold" className="shrink-0 text-emerald-500" />
              )}
              {showState && isSelected && !isCorrect && (
                <CloseCircle size="18" variant="Bold" className="shrink-0 text-rose-500" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {selectedOption !== null && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-zinc-100 dark:bg-zinc-900 p-3 text-[12.5px] leading-relaxed mt-1"
        >
          {selectedOption === correctOption ? (
            <p className="text-emerald-700 dark:text-emerald-400 font-medium">
              ✅ <strong>دقیقاً درست است!</strong> با استفاده از `transform` (نظیر scale و translate3d) و `opacity`، مرورگر انیمیشن را مستقیماً به کارت گرافیک (GPU Compositing Layer) می‌سپارد و از Reflowهای سنگین در CPU جلوگیری می‌کند.
            </p>
          ) : (
            <p className="text-rose-700 dark:text-rose-400 font-medium">
              ❌ <strong>پاسخ اشتباه بود!</strong> تغییر ویژگی‌های ابعادی مانند width یا margin باعث Trigger شدن فرآیند Layout و Paint در CPU می‌شود که عامل اصلی افت فریم است.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
