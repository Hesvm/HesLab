import { useState } from "react";
import { motion } from 'framer-motion';
import { playBenchoSound } from "@/content/soundData";
import { toast } from "@/lib/toast";
import { Copy, Code, Eye, LampCharge } from "iconsax-react";
import { useLanguage } from "@/context/LanguageContext";

export function LiveArtifactPlayground() {
  const { lang, isRtl } = useLanguage();
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [themeMode, setThemeMode] = useState<"dark" | "light" | "purple">("dark");
  const [activeToggle, setActiveToggle] = useState(true);

  const sampleReactCode = `import { motion } from 'framer-motion';

export function MagneticPill({ label, active, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="flex items-center gap-2 rounded-full px-5 py-2.5 font-bold shadow-lg"
    >
      <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
      {label}
    </motion.button>
  );
}`;

  const copyContent = (text: string) => {
    playBenchoSound("click");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
      toast(lang === 'fa' ? 'کد در کلیپ‌بورد کپی شد' : 'Code copied to clipboard');
    }
  };

  return (
    <div
      className="my-6 flex flex-col rounded-3xl border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-zinc-950 overflow-hidden shadow-lg shadow-black/[0.03] select-none"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Artifact Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2.5 gap-2">
        {/* Title & Badge */}
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <LampCharge size="14" variant="Bold" color="currentColor" />
          </div>
          <span className="text-[13px] font-bold text-foreground">
            {lang === 'fa' ? 'آرتیفکت زنده: MagneticPill' : 'Live Artifact: MagneticPill'}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 font-mono">
            React 19 + Motion
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-zinc-200/80 dark:bg-zinc-800 p-0.5 text-[11.5px] font-medium">
          <button
            type="button"
            onClick={() => {
              playBenchoSound("click");
              setTab("preview");
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 transition-all cursor-pointer ${
              tab === "preview"
                ? "bg-white dark:bg-zinc-950 text-foreground font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye size="13" variant="Linear" color="currentColor" />
            <span>{lang === 'fa' ? 'پیش‌نمایش' : 'Preview'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playBenchoSound("click");
              setTab("code");
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 transition-all cursor-pointer ${
              tab === "code"
                ? "bg-white dark:bg-zinc-950 text-foreground font-bold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code size="13" variant="Linear" color="currentColor" />
            <span>{lang === 'fa' ? 'کد' : 'Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      {tab === "preview" ? (
        <div
          className={`relative flex min-h-[220px] w-full flex-col items-center justify-center p-8 transition-colors duration-300 ${
            themeMode === "dark"
              ? "bg-[#09090b] text-white"
              : themeMode === "light"
              ? "bg-zinc-100 text-zinc-900"
              : "bg-gradient-to-tr from-purple-950 to-indigo-900 text-white"
          }`}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Theme Switcher in Preview */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/20 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setThemeMode("dark")}
              className={`size-4.5 rounded-full bg-zinc-900 border ${themeMode === "dark" ? "border-white scale-110" : "border-transparent opacity-60"}`}
              title="dark"
            />
            <button
              type="button"
              onClick={() => setThemeMode("light")}
              className={`size-4.5 rounded-full bg-white border ${themeMode === "light" ? "border-zinc-900 scale-110" : "border-transparent opacity-60"}`}
              title="light"
            />
            <button
              type="button"
              onClick={() => setThemeMode("purple")}
              className={`size-4.5 rounded-full bg-indigo-600 border ${themeMode === "purple" ? "border-white scale-110" : "border-transparent opacity-60"}`}
              title="gradient"
            />
          </div>

          {/* Live Interactive Button Component */}
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              playBenchoSound(activeToggle ? "pop" : "toggle");
              setActiveToggle(!activeToggle);
            }}
            transition={{ type: "spring", stiffness: 450, damping: 24 }}
            className={`relative z-10 flex items-center gap-2.5 rounded-full px-6 py-3 font-bold text-[13.5px] cursor-pointer shadow-xl transition-colors duration-200 ${
              activeToggle
                ? "bg-orange-500 text-white shadow-orange-500/30"
                : "bg-white/10 text-white/90 border border-white/20 backdrop-blur-md shadow-black/20"
            }`}
          >
            <motion.span
              animate={{ scale: activeToggle ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`size-2.5 rounded-full ${activeToggle ? "bg-white" : "bg-zinc-400"}`}
            />
            <span>
              {activeToggle
                ? (lang === 'fa' ? 'وایب فعال است ⚡' : 'Active Vibe ⚡')
                : (lang === 'fa' ? 'حالت غیرفعال' : 'Inactive State')}
            </span>
          </motion.button>
          <span className="mt-3 text-[11px] opacity-60">
            {lang === 'fa' ? 'روی دکمه بالا کلیک کنید' : 'Click the button above'}
          </span>
        </div>
      ) : (
        <div className="relative bg-[#18181b] p-4 text-white font-mono text-[12.5px] leading-relaxed" dir="ltr">
          <button
            type="button"
            onClick={() => copyContent(sampleReactCode)}
            className="absolute top-3 right-3 flex items-center gap-1 rounded-lg border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-sans text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <Copy size="12" variant="Linear" color="currentColor" />
            <span>{lang === 'fa' ? 'کپی کد' : 'Copy Code'}</span>
          </button>
          <pre className="overflow-x-auto pt-4 [scrollbar-width:none]">
            <code>{sampleReactCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
