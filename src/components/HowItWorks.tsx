import { type FC, type PointerEvent as ReactPointerEvent, useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { Play, TickCircle, Send2, Magicpen, MessageText1, Music, VolumeHigh } from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// =========================================================================
// SHARED DATA — the same three files travel through the whole story:
// SEND (file cards) → EDIT (timeline clips) → REFINE (progress segments)
// =========================================================================
const FILES = [
  {
    id: 0,
    thumb: '/mock/work_vertical_1.webp',
    name: 'VIDEO_01.mp4',
    meta: '00:42 · 248 MB',
    tag: '4K',
    icon: '/emojis/single_video.png',
    clip: 'V1',
    clipClass: 'bg-sky-500/35 border-sky-400/40 text-sky-100',
    segClass: 'bg-sky-400',
    grow: 1.4,
  },
  {
    id: 1,
    thumb: '/mock/work_vertical_2.webp',
    name: 'VIDEO_02.mp4',
    meta: '00:28 · 184 MB',
    tag: 'MP4',
    icon: '/emojis/single_video.png',
    clip: 'V2',
    clipClass: 'bg-purple-500/35 border-purple-400/40 text-purple-100',
    segClass: 'bg-purple-400',
    grow: 1,
  },
  {
    id: 2,
    thumb: '/mock/work_vertical_3.webp',
    name: 'REFERENCE.mov',
    meta: '00:15 · 92 MB',
    tag: 'MOV',
    icon: '/emojis/spiral_notepad.png',
    clip: 'REF',
    clipClass: 'bg-emerald-500/35 border-emerald-400/40 text-emerald-100',
    segClass: 'bg-emerald-400',
    grow: 1.2,
  },
];

// Where each file card floats around the frame before it docks (SEND state)
const CARD_SLOTS = [
  { pos: 'left-[-6px] top-[30px]', rotate: -6, dock: { x: 20, y: 8, rotate: -2 } },
  { pos: 'right-[-10px] top-[150px]', rotate: 5, dock: { x: -18, y: 0, rotate: 2 } },
  { pos: 'left-[-2px] bottom-[64px]', rotate: -3, dock: { x: 20, y: -10, rotate: -1 } },
];

const SWATCHES = ['#FBBF24', '#F97316', '#5566FF'];

const WAVE = [35, 60, 90, 45, 100, 75, 40, 85, 95, 60, 75, 40, 90, 55, 70, 95, 50, 80, 65, 45, 85, 60];

// Times (ms) at which each state advances its internal "step"
const STEP_TIMES: number[][] = [
  // SEND: video file in, settle, brand style note in, settle
  [200, 1600, 2400, 3800],
  // EDIT: brief, highlight, playhead, caption, motion detail
  [700, 2000, 3300, 4300, 5300],
  // REFINE: typing, message, pause, typing, reply, edit lands, typing, reply, approval
  [500, 1700, 3200, 4300, 5600, 7000, 8100, 9400],
];

const spring = { type: 'spring' as const, stiffness: 90, damping: 22, mass: 1 };
const gentle = { type: 'spring' as const, stiffness: 60, damping: 20, mass: 1 };

// =========================================================================
// Small drawing helpers (editor's visual notes)
// =========================================================================
const CropMarks: FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-[-7px] pointer-events-none z-10"
  >
    {[
      'top-0 left-0 border-t border-l rounded-tl-[3px]',
      'top-0 right-0 border-t border-r rounded-tr-[3px]',
      'bottom-0 left-0 border-b border-l rounded-bl-[3px]',
      'bottom-0 right-0 border-b border-r rounded-br-[3px]',
    ].map((c) => (
      <span key={c} className={`absolute w-3 h-3 border-white/45 ${c}`} />
    ))}
  </motion.div>
);

const DriveLogo: FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 24 21" className={className} aria-hidden="true">
    <path d="M8 0h8l8 14h-8z" fill="#FBBC04" />
    <path d="M8 0L0 14l4 7 8-14z" fill="#34A853" />
    <path d="M4 21l4-7h16l-4 7z" fill="#4285F4" />
  </svg>
);

// =========================================================================
// Step sequencer — advances an internal counter on a timer
// =========================================================================
const useSequence = (state: number, play: boolean, reduce: boolean) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    if (!play) return;
    const times = STEP_TIMES[state];
    if (reduce) {
      setStep(times.length);
      return;
    }
    const ids = times.map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    return () => ids.forEach(window.clearTimeout);
  }, [state, play, reduce]);
  return step;
};

// =========================================================================
// PROCESS VISUAL STAGE — one editing world, three states
// =========================================================================
const ProcessVisualStage: FC<{ state: number }> = ({ state }) => {
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: '-15% 0px -15% 0px' });
  const gid = useId();
  const step = useSequence(state, inView, reduce);

  // Color theme: swatch auto-cycles once when it appears, until the user picks one
  const [swatch, setSwatch] = useState(0);
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    if (state !== 1 || step < 4 || picked || reduce) return;
    const ids = [1, 2, 0].map((c, i) => window.setTimeout(() => setSwatch(c), 1000 + 1200 * i));
    return () => ids.forEach(window.clearTimeout);
  }, [state, step, picked, reduce]);

  // ---- Timeline scrubbing: the playhead drives the video above ----
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof animate> | null>(null);
  const dragging = useRef(false);
  const [scrubbing, setScrubbing] = useState(false);
  const ph = useMotionValue(0.04);
  const phLeft = useTransform(ph, (v) => `${v * 100}%`);

  // Auto-play the playhead when the Edit state starts, until the user takes over
  useEffect(() => {
    if (state !== 1) return;
    ph.set(0.04);
    if (reduce) {
      ph.set(0.4);
      return;
    }
    autoRef.current = animate(ph, 0.62, { duration: 7, delay: 0.5, ease: 'easeInOut' });
    return () => autoRef.current?.stop();
  }, [state, reduce, ph]);

  // The video is scrubbed while editing, and plays freely otherwise
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (state === 1) v.pause();
    else v.play().catch(() => undefined);
  }, [state]);

  useMotionValueEvent(ph, 'change', (val) => {
    const v = videoRef.current;
    if (state !== 1 || !v || !isFinite(v.duration) || v.duration === 0) return;
    v.currentTime = val * v.duration;
  });

  const scrubTo = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrubRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    ph.set(Math.min(0.98, Math.max(0.02, (e.clientX - r.left) / r.width)));
  };
  const onScrubDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    autoRef.current?.stop();
    dragging.current = true;
    setScrubbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    scrubTo(e);
  };
  const onScrubMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) scrubTo(e);
  };
  const onScrubUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    setScrubbing(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const frameVariants = [
    { y: -6, scale: 1, rotate: 0 },
    { y: -38, scale: 0.97, rotate: 0 },
    { y: -26, scale: 0.95, rotate: 0 },
  ];

  const imgFilter = [
    'saturate(0.55) contrast(1.05) brightness(0.88)',
    'saturate(1.22) contrast(1.1) brightness(1)',
    'saturate(1.25) contrast(1.12) brightness(1.02)',
  ];

  // ---- Refine: conversation model ----
  const bubbles: { id: string; who: 'c' | 'h'; text: string; typing: boolean }[] = [];
  if (state === 2) {
    if (step >= 1) bubbles.push({ id: 'm1', who: 'c', text: 'Can we make the hook hit faster?', typing: step < 2 });
    if (step >= 3) bubbles.push({ id: 'm2', who: 'h', text: 'On it.', typing: step < 4 });
    if (step >= 6) bubbles.push({ id: 'm3', who: 'c', text: 'Much better.', typing: step < 7 });
  }
  const approved = state === 2 && step >= 8;
  const visibleBubbles = bubbles.slice(approved ? -1 : -2);

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-[340px] sm:max-w-[370px] h-[410px] sm:h-[440px] flex items-center justify-center select-none font-en [font-variant-numeric:tabular-nums]"
    >
      <LayoutGroup id={gid}>
        {/* ===================================================== */}
        {/* PERSISTENT CENTRAL VIDEO FRAME — the same project     */}
        {/* ===================================================== */}
        <motion.div
          animate={frameVariants[state]}
          transition={gentle}
          className={`relative w-[258px] sm:w-[280px] h-[370px] sm:h-[398px] rounded-[24px] bg-zinc-950 border transition-colors duration-700 ${
            approved ? 'border-emerald-400/70' : 'border-white/15'
          }`}
        >
          <div className="absolute inset-0 rounded-[24px] overflow-hidden">
            <motion.video
              ref={videoRef}
              src="/videos/video_1.mp4"
              poster="/mock/work_vertical_1.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              animate={{ scale: state === 2 && step >= 5 ? 1.09 : 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ filter: imgFilter[state] }}
              className="w-full h-full object-cover object-center pointer-events-none transition-[filter] duration-[1400ms]"
            />
            <div
              className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-[background-color,opacity] duration-[1200ms]"
              style={{ backgroundColor: SWATCHES[swatch], opacity: state === 0 ? 0 : 0.55 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20 pointer-events-none" />

            {/* Short-form player chrome: makes it read as a real Reel */}
            <div className={`absolute left-3 bottom-3 flex items-center gap-1.5 pointer-events-none transition-opacity duration-700 ${state === 0 ? 'opacity-0' : 'opacity-100'}`}>
              <img src="/emojis/hesam_avatar.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-white/70" />
              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold text-white">@yourbrand</span>
                <span className="text-[9px] font-medium text-white/70">Watch till the end</span>
              </span>
            </div>

            {/* State 0: play badge */}
            <AnimatePresence>
              {state === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={spring}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white "
                >
                  <Play size={16} variant="Bold" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* State 2: tweak applied flash + tag */}
            <AnimatePresence>
              {state === 2 && step >= 5 && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0.22 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="absolute inset-0 bg-white pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Crop marks while editing */}
          <AnimatePresence>{state === 1 && <CropMarks />}</AnimatePresence>
        </motion.div>

        {/* ===================================================== */}
        {/* STATE 0 — files arrive, each its own floating card    */}
        {/* ===================================================== */}
        {state === 0 &&
          [FILES[0]].map((f, j) => {
            const i = f.id;
            const slot = CARD_SLOTS[i];
            if (step < 2 * j + 1) return null;
            const docked = step >= 2 * j + 2;
            return (
              <motion.div
                key={`file-${f.id}`}
                layoutId={`${gid}-file-${f.id}`}
                initial={reduce ? false : { opacity: 0, scale: 0.7, y: 24, rotate: slot.rotate * 2 }}
                animate={
                  docked
                    ? { opacity: 1, scale: 0.92, x: slot.dock.x, y: slot.dock.y, rotate: slot.dock.rotate }
                    : { opacity: 1, scale: 1, x: 0, y: 0, rotate: slot.rotate }
                }
                transition={spring}
                className={`absolute z-20 ${slot.pos}`}
              >
                <div
                  className="relative flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-[14px] bg-zinc-950/90 backdrop-blur-xl border border-white/15 scale-[1.18] origin-center transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.24] cursor-default"
                >
                  <span className="w-8 h-8 rounded-[9px] bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                    <img src={f.icon} alt="" className="w-[18px] h-[18px] object-contain" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[12px] font-bold text-white whitespace-nowrap">{f.name}</span>
                    <span className="text-[9.5px] font-medium text-zinc-400 whitespace-nowrap">{f.meta}</span>
                  </span>
                  <span className="text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                    {f.tag}
                  </span>
                  <AnimatePresence>
                    {docked && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ ...spring, delay: 0.3 }}
                        className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-emerald-500 text-white flex items-center justify-center border border-zinc-950"
                      >
                        <TickCircle size={11} variant="Bold" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

        {/* State 0 props: Drive source + arrow + small objects */}
        <AnimatePresence>
          {state === 0 && (
            <>
              <motion.div
                key="drive"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ ...spring, delay: 0.1 }}
                className="absolute right-[26px] top-[116px] z-30 flex items-center justify-center transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
                aria-label="Google Drive"
              >
                <DriveLogo className="w-11 h-11" />
              </motion.div>
              {step >= 3 && (
                <motion.div
                  key="brand-style"
                  initial={{ opacity: 0, scale: 0.8, y: 14, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: -4 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={spring}
                  className="absolute left-[4px] top-[238px] z-30"
                >
                  {/* Standalone Notes-style app icon */}
                  <div className="relative w-[86px] h-[86px] rounded-[22px] overflow-hidden bg-[#1C1C1E] border border-white/10 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default">
                    <div className="absolute inset-x-0 top-0 h-[25px] bg-gradient-to-b from-[#FFD93B] to-[#FFC81F]" />
                    <div
                      className="absolute inset-x-[7px] top-[25px] h-[3px] opacity-45"
                      style={{ backgroundImage: 'radial-gradient(circle, #8a6a00 0.9px, transparent 1.1px)', backgroundSize: '5px 3px' }}
                    />
                    <div className="absolute inset-x-0 top-[48px] h-px bg-white/12" />
                    <div className="absolute inset-x-0 top-[67px] h-px bg-white/12" />
                    <span className="absolute inset-x-0 top-[31px] text-center text-[12px] font-bold tracking-tight text-white leading-none whitespace-nowrap">Brand style</span>
                    {/* Hand-drawn scribbles, as if something is being written */}
                    <svg viewBox="0 0 86 40" className="absolute inset-x-0 top-[48px] w-full h-[38px]" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M10 12c2-5 4-5 4.5-.5S18 16 20 11s3.5-5 4.5 0 3.5 4.5 5.5-.5 3.5-4.5 4.5 0 3 4 5 0 3-3.5 4.5.5 3.5 3.5 5-1"
                        stroke="#A1A1AA" strokeWidth="1.4"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }}
                      />
                      <motion.path
                        d="M9 28c3-4.5 5.6-4.5 8.5 0s5.6 4.5 8.5 0 5.6-4.5 8.5 0 5.6 4.5 8.5 0 5.6-4.5 8.5 0 5.6 4.5 8.5 0"
                        stroke="#71717A" strokeWidth="1.4"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.9 }}
                      />
                      <motion.path
                        d="M10 36.5c10-1.6 22-1.5 36-.2"
                        stroke="#52525B" strokeWidth="1.3"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 3 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
              <motion.img
                key="folder"
                src="/emojis/package.png"
                alt=""
                initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 10 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ ...spring, delay: 0.4 }}
                className="absolute right-0 bottom-[84px] w-10 h-10 object-contain z-30 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
              />
              <motion.svg
                key="arrow"
                viewBox="0 0 60 60"
                className="absolute left-[34px] top-[96px] w-14 h-14 z-10 pointer-events-none"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                exit={{ opacity: 0 }}
              >
                <motion.path
                  d="M6 8 C 8 34, 26 48, 50 46 M42 38 L51 46 L41 52"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
                />
              </motion.svg>
            </>
          )}
        </AnimatePresence>

        {/* ===================================================== */}
        {/* STATE 1 — brief → editing decisions                   */}
        {/* ===================================================== */}
        <AnimatePresence>
          {state === 1 && step >= 1 && (
            <motion.div
              key="brief"
              initial={{ opacity: 0, x: -26, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.4, ease: 'easeIn' } }}
              transition={spring}
              className="absolute left-[-6px] top-[82px] z-30 w-[142px] p-2.5 rounded-[14px] bg-zinc-950/95 backdrop-blur-xl border border-white/15 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
            >
              <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-white/10">
                <img src="/emojis/memo.png" alt="" className="w-4 h-4 object-contain" />
                <span className="text-[9.5px] font-bold tracking-wider text-zinc-300">CREATIVE BRIEF</span>
              </div>
              <div className="space-y-1 text-[9.5px] leading-tight">
                <div className="relative px-1 py-0.5 -mx-1 rounded">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{ originX: 0 }}
                    className="absolute inset-0 rounded bg-amber-400/35"
                  />
                  <span className="relative text-zinc-500 font-semibold">Hook · </span>
                  <span className="relative text-white font-bold">Hit harder in 2s</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold">Tone · </span>
                  <span className="text-zinc-200 font-medium">Fast / playful</span>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold">Color · </span>
                  <span className="text-zinc-200 font-medium">Warm</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tool cluster: Ae + wand, color swatches, motion element */}
          {state === 1 && step >= 1 && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, scale: 0.6, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ ...spring, delay: 0.15 }}
              className="absolute right-[-4px] top-[30px] z-30"
            >
              <img src="/emojis/magic_wand.png" alt="" className="w-8 h-8 object-contain transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default" />
            </motion.div>
          )}
          {state === 1 && step >= 2 && (
            <motion.img
              key="ae"
              src="/stats-icons/after-effects.svg"
              alt="After Effects"
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={spring}
              className="absolute left-1/2 -translate-x-1/2 top-[-36px] z-30 w-10 h-10 object-contain transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
            />
          )}
          {state === 1 && step >= 4 && (
            <>
              <motion.div
                key="swatches"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="absolute right-[-2px] top-[126px] z-30 flex flex-col gap-1 p-1 rounded-full bg-zinc-950/90 border border-white/15 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
              >
                {SWATCHES.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Color theme ${i + 1}`}
                    onClick={() => {
                      setPicked(true);
                      setSwatch(i);
                    }}
                    className="w-[18px] h-[18px] rounded-full border border-white/25 flex items-center justify-center cursor-pointer"
                    style={{ background: c }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-[11px] h-[11px] transition-all duration-500 ${
                        swatch === i ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Timeline — floats over the lower edge of the frame */}
        <AnimatePresence>
          {state === 1 && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22, transition: { duration: 0.45, ease: 'easeIn' } }}
              transition={{ ...gentle, delay: 0.1 }}
              className="absolute bottom-1.5 inset-x-3 z-20 bg-zinc-950/92 backdrop-blur-xl border border-white/15 rounded-[16px] p-2.5 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
            >
              <div
                ref={scrubRef}
                onPointerDown={onScrubDown}
                onPointerMove={onScrubMove}
                onPointerUp={onScrubUp}
                onPointerCancel={onScrubUp}
                className={`group touch-none ${scrubbing ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
              {/* Ruler */}
              <div className="flex items-center justify-between h-[20px] px-2.5 mb-2 rounded-full bg-white/[0.08] text-[10px] font-semibold text-zinc-400">
                <span>00:00</span>
                <span className="flex-1 mx-2 h-[6px] opacity-60"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 9px)' }}
                />
                <span>00:15</span>
              </div>

              <div className="relative space-y-1.5">
                {/* Video track: amber, filmstrip thumbnails */}
                <div className="flex items-stretch gap-[3px] h-[42px] rounded-[11px] bg-gradient-to-b from-amber-400 to-amber-500 p-[3px]">
                  <span className="w-3.5 shrink-0 flex items-center justify-center text-amber-950/70 text-[11px] font-black leading-none">‹</span>
                  {FILES.map((f) => (
                    <motion.div
                      key={`clip-${f.id}`}
                      layoutId={`${gid}-file-${f.id}`}
                      style={{ flexGrow: f.grow, flexBasis: 0, backgroundImage: `url(${f.thumb})` }}
                      transition={spring}
                      className="relative h-full rounded-[8px] border-[1.5px] border-white/90 overflow-hidden bg-cover bg-center"
                    >
                      <span className="absolute left-1 bottom-1 px-1 rounded bg-black/55 text-[8.5px] font-bold text-white leading-[1.3]">
                        {f.clip}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Audio tracks */}
                {[
                  { name: 'Intro-Music.mp3', Icon: Music, h: 'h-[32px]', off: '', bg: 'from-[#FF8A4C] to-[#F4561D]', tile: 'bg-[#B8340C]/70' },
                  { name: 'Whoosh-SFX.mp3', Icon: VolumeHigh, h: 'h-[28px]', off: 'ml-[26%]', bg: 'from-[#B05CFF] to-[#8E2BF2]', tile: 'bg-[#5B13A8]/70' },
                ].map((a, ai) => (
                  <div
                    key={a.name}
                    className={`relative overflow-hidden rounded-[11px] bg-gradient-to-b ${a.bg} ${a.h} ${a.off} flex items-center gap-2 pl-[5px]`}
                  >
                    <span className={`w-[22px] h-[22px] rounded-[7px] ${a.tile} flex items-center justify-center text-white shrink-0`}>
                      <a.Icon size={12} variant="Bold" color="currentColor" />
                    </span>
                    <span className="text-[11px] font-medium text-white whitespace-nowrap">{a.name}</span>
                    <div className="absolute bottom-0 inset-x-0 h-[12px] flex items-end gap-[3px] px-[5px] opacity-35 pointer-events-none">
                      {WAVE.concat(WAVE).map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${Math.max(22, ((h + ai * 17 + i * 7) % 100) * 0.95)}%` }}
                          className="flex-1 rounded-t-[2px] bg-white"
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Playhead: amber, teardrop head, runs through every layer */}
                <motion.div
                  style={{ left: phLeft }}
                  className="absolute top-[-9px] bottom-[-4px] w-[2px] bg-amber-400 z-10 pointer-events-none"
                >
                  <span
                    className={`absolute -top-[7px] -left-[6px] w-[14px] h-[14px] bg-amber-400 rounded-full rounded-bl-none rotate-[-45deg] ring-[3px] transition-all duration-200 ${
                      scrubbing ? 'scale-[1.25] ring-amber-400/35' : 'ring-amber-400/0 group-hover:scale-110 group-hover:ring-amber-400/25'
                    }`}
                  />
                </motion.div>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================== */}
        {/* STATE 2 — the same clips compress into a progress bar  */}
        {/* and a real conversation plays out                      */}
        {/* ===================================================== */}
        <AnimatePresence>
          {state === 2 && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-7 inset-x-2 sm:inset-x-3 z-30 flex flex-col gap-1.5 min-h-[84px] justify-end"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleBubbles.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -14, scale: 0.9 }}
                    transition={spring}
                    className={`flex items-end gap-1.5 ${b.who === 'h' ? 'flex-row-reverse' : ''}`}
                  >
                    {b.who === 'c' ? (
                      <span className="w-7 h-7 rounded-full bg-[#5566FF]/25 border border-[#5566FF]/40 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        C
                      </span>
                    ) : (
                      <img
                        src="/emojis/hesam_avatar.jpg"
                        alt="Hesam"
                        className="w-7 h-7 rounded-full object-cover border border-white/30 shrink-0"
                      />
                    )}
                    <div
                      className={`px-3.5 py-2 text-[12.5px] font-medium leading-snug max-w-[78%] transition-[translate,scale] duration-500 ease-out hover:-translate-y-1 hover:scale-[1.04] cursor-default ${
                        b.who === 'c'
                          ? 'bg-white text-slate-900 rounded-[14px] rounded-bl-[4px]'
                          : 'bg-[#5566FF] text-white rounded-[14px] rounded-br-[4px]'
                      }`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {b.typing ? (
                          <motion.span
                            key="typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1 h-[14px] px-0.5"
                          >
                            {[0, 1, 2].map((d) => (
                              <motion.span
                                key={d}
                                animate={reduce ? undefined : { y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                                className={`w-1.5 h-1.5 rounded-full ${b.who === 'c' ? 'bg-slate-500' : 'bg-white'}`}
                              />
                            ))}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="text"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className="block"
                          >
                            {b.text}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}

                {approved && (
                  <motion.div
                    key="approved"
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={spring}
                    className="flex items-end gap-1.5"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#5566FF]/25 border border-[#5566FF]/40 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      C
                    </span>
                    <div className="flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold leading-snug bg-white text-slate-900 rounded-[14px] rounded-bl-[4px] transition-[translate,scale] duration-500 ease-out hover:-translate-y-1 hover:scale-[1.04] cursor-default">
                      <TickCircle size={16} variant="Bold" className="text-emerald-500" />
                      <span>Approved</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {state === 2 && step >= 2 && (
            <motion.img
              key="eyes"
              src="/emojis/eyes.png"
              alt=""
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={spring}
              className="absolute left-[-4px] top-[64px] w-10 h-10 object-contain z-30 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
            />
          )}
          {state === 2 && step >= 8 && (
            <motion.img
              key="heart"
              src="/emojis/red_heart.png"
              alt=""
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 8 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={spring}
              className="absolute right-[-2px] bottom-[150px] w-9 h-9 object-contain z-30 transition-[translate,scale] duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.07] cursor-default"
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

// =========================================================================
// MAIN PROCESS COMPONENT (HowItWorks)
// =========================================================================
export const HowItWorks: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].howItWorks;

  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Which step is crossing the middle of the viewport drives the shared stage
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = rowRefs.current.indexOf(e.target as HTMLDivElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Magnetic scroll: inside this section a wheel gesture glides to the next/previous step
  // (centered in the viewport). At the first/last step it hands control back to the page.
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    let animating = false;
    let cooldownUntil = 0;
    let lastWheel = 0;
    let lastAbs = 0;
    let failsafe: number | undefined;

    const glideTo = (delta: number) => {
      animating = true;
      const startY = window.scrollY;
      const t0 = performance.now();
      const dur = 700;
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const done = () => {
        animating = false;
        cooldownUntil = performance.now() + 250;
        window.clearTimeout(failsafe);
      };
      // Never stay locked, even if the tab stops running animation frames
      window.clearTimeout(failsafe);
      failsafe = window.setTimeout(done, dur + 400);
      const tick = (now: number) => {
        if (!animating) return;
        const t = Math.min(1, (now - t0) / dur);
        window.scrollTo({ top: startY + delta * ease(t), behavior: 'instant' });
        if (t < 1) requestAnimationFrame(tick);
        else done();
      };
      requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || e.ctrlKey || Math.abs(e.deltaY) < 4) return;
      const now = performance.now();
      const abs = Math.abs(e.deltaY);
      // A new gesture starts after a pause, or when the wheel speeds up again
      const isNewGesture = now - lastWheel > 120 || abs > lastAbs * 1.6;
      lastWheel = now;
      lastAbs = abs;

      if (animating || now < cooldownUntil) {
        e.preventDefault();
        return;
      }
      // Trackpad inertia tail: let the page scroll naturally
      if (!isNewGesture) return;

      const vh = window.innerHeight;
      const ds: number[] = [];
      rowRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        ds.push(r.top + r.height / 2 - vh / 2);
      });
      if (!ds.length) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      let target: number | null = null;
      for (const d of ds) {
        if (dir > 0 && d > 8 && (target === null || d < target)) target = d;
        if (dir < 0 && d < -8 && (target === null || d > target)) target = d;
      }
      if (target === null || Math.abs(target) > Math.max(vh * 0.75, 620)) return;
      e.preventDefault();
      glideTo(target);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.clearTimeout(failsafe);
    };
  }, [reduceMotion]);

  return (
    <section
      id="process"
      className="w-full bg-[#0B0B0C] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-8 select-none relative overflow-clip"
    >

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto relative z-10"
      >
        <h2 className="tracking-tight text-white">
          <span className="font-serif-italic font-normal block mb-1 text-slate-400 text-xl sm:text-2xl md:text-[28px]">
            {t.tag}
          </span>
          <span className="font-['Plus_Jakarta_Display',sans-serif] text-2xl sm:text-4xl md:text-[48px] font-black text-white block mt-1 tracking-tight leading-tight">
            {t.title}
          </span>
        </h2>
        {t.desc && (
          <p className="mt-3 text-white/60 text-xs sm:text-[14px] font-normal max-w-lg mx-auto">
            {t.desc}
          </p>
        )}
      </motion.div>

      {/* Steps (left) + one sticky visual stage (right on desktop) */}
      <div className="relative z-10 max-w-[880px] mx-auto md:flex md:items-start md:justify-center md:gap-6 lg:gap-8">
        <div className="space-y-16 sm:space-y-20 lg:space-y-24 md:w-[340px] lg:w-[360px] shrink-0">
          {t.steps.map((step, idx) => (
            <motion.div
              key={step.step}
              ref={(el) => {
                rowRefs.current[idx] = el;
              }}
              initial={{ opacity: 0, y: 28, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className={`flex flex-col gap-8 sm:gap-10 md:min-h-[440px] md:justify-center ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              {/* Text */}
              <div
                className={`flex flex-col w-full transition-opacity duration-700 ${
                  active === idx ? 'md:opacity-100' : 'md:opacity-35'
                }`}
              >
                {(() => {
                  const TagIcon = [Send2, Magicpen, MessageText1][idx] ?? Send2;
                  const tagColor = [
                    'bg-amber-400/15 text-amber-300',
                    'bg-rose-500/15 text-rose-300',
                    'bg-sky-500/15 text-sky-300',
                  ][idx];
                  return (
                    <div className={`self-start inline-flex items-center gap-2 mb-3 pl-3 pr-4 py-1.5 rounded-full text-[14px] font-semibold tracking-tight ${tagColor}`}>
                      <TagIcon size={17} variant="Bold" color="currentColor" />
                      <span className="lowercase first-letter:uppercase">{step.badge}</span>
                    </div>
                  );
                })()}
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-snug mb-2.5 font-['Plus_Jakarta_Display',sans-serif]">
                  {step.title}
                </h3>
                <p className="text-white/75 text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed sm:leading-[1.65] font-normal">
                  {step.desc}
                </p>
              </div>

              {/* Mobile: the same stage, locked to this step's state */}
              <div className="md:hidden w-full flex items-center justify-center">
                <ProcessVisualStage state={idx} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: one persistent stage that morphs between states */}
        <div className="hidden md:block md:w-[360px] lg:w-[390px] shrink-0 self-stretch">
          <div className="sticky top-[max(88px,calc(50vh-220px))] flex items-center justify-center">
            <ProcessVisualStage state={active} />
          </div>
        </div>
      </div>
    </section>
  );
};
