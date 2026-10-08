import { useState, useEffect, useRef, type FC } from 'react';
import { motion } from 'framer-motion';
import { VolumeHigh, VolumeCross } from 'iconsax-react';
import { CategoryPills } from './CategoryPills';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface VideoCardProps {
  item: {
    id: number;
    category: string;
    views: string;
    tag: string;
    image: string;
    video: string;
  };
  isRtl: boolean;
  isUnmuted: boolean;
  isFocused: boolean;
  isDimmed: boolean;
  onToggleSound: (id: number) => void;
  onHover: (id: number | null) => void;
}

export const VideoCard: FC<VideoCardProps> = ({
  item,
  isRtl,
  isUnmuted,
  isFocused,
  isDimmed,
  onToggleSound,
  onHover,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isUnmuted;
    }
  }, [isUnmuted]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSound(item.id);
  };

  return (
    <div
      onClick={handleToggle}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className={`rounded-[28px] sm:rounded-[32px] bg-slate-950 text-white overflow-hidden isolate transform-gpu group relative aspect-[9/16] flex flex-col justify-end p-2.5 sm:p-3 cursor-pointer transition-all duration-300 ${
        isRtl ? 'text-right' : 'text-left'
      } ${
        isFocused
          ? 'opacity-100 scale-[1.025] shadow-2xl z-10 ring-1 ring-slate-900/10'
          : isDimmed
          ? 'opacity-40 grayscale-[20%] scale-[0.98]'
          : 'opacity-100 hover:scale-[1.015] shadow-sm'
      }`}
    >
      {/* HTML5 Video with IntersectionObserver playback */}
      <video
        ref={videoRef}
        src={item.video}
        poster={item.image}
        loop
        muted={!isUnmuted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none rounded-[28px] sm:rounded-[32px]"
      />

      {/* Top-Left Floating Sound Control Button */}
      <button
        onClick={handleToggle}
        className={`absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer select-none ${
          isUnmuted
            ? 'bg-[#5566FF] text-white ring-2 ring-white shadow-[#5566FF]/30 scale-105'
            : 'bg-white/90 hover:bg-white text-slate-800 hover:text-slate-950'
        }`}
        title={isUnmuted ? 'قطع صدا' : 'وصل صدا'}
        aria-label="Toggle Sound"
      >
        {isUnmuted ? (
          <VolumeHigh size={16} variant="Bold" color="currentColor" />
        ) : (
          <VolumeCross size={16} variant="Bold" color="currentColor" />
        )}
      </button>
    </div>
  );
};

export const SelectedWork: FC = () => {
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].work;
  const [activeCategory, setActiveCategory] = useState('all');
  const [unmutedVideoId, setUnmutedVideoId] = useState<number | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Progress begins as section enters from bottom, completes when center is in view
            const startOffset = windowHeight;
            const endOffset = windowHeight * 0.25;
            const current = startOffset - rect.top;
            const total = startOffset - endOffset;
            const progress = Math.min(Math.max(current / total, 0), 1);
            setScrollProgress((prev) => (Math.abs(prev - progress) > 0.005 ? progress : prev));
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
    };
  }, []);

  // Calculate smooth scale from ~0.90 to 1.00
  const gridScale = 0.90 + 0.10 * scrollProgress;
  const gridOpacity = 0.8 + 0.2 * scrollProgress;

  // Filter items based on active category, max 6 items (2 rows of 3)
  const filteredItems = (
    activeCategory === 'all'
      ? t.items
      : t.items.filter((item) => item.category === activeCategory)
  ).slice(0, 6);

  const handleToggleSound = (id: number) => {
    setUnmutedVideoId((prev) => (prev === id ? null : id));
  };

  const activeFocusedId = hoveredVideoId ?? unmutedVideoId;
  const hasActiveFocus = activeFocusedId !== null;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-14 sm:py-20 px-4 max-w-[840px] mx-auto"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-7 sm:mb-9 max-w-lg mx-auto"
      >
        <h2 className="text-2xl sm:text-4xl md:text-[48px] font-black tracking-tight text-slate-950 leading-tight">
          {t.title}
        </h2>
        <p className="mt-2 text-slate-500 text-xs sm:text-[13px] font-medium">
          {t.desc}
        </p>
      </motion.div>

      {/* Category Filter Tabs / Pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 sm:mb-7"
      >
        <CategoryPills categories={t.categories} active={activeCategory} onChange={setActiveCategory} />
      </motion.div>

      {/* 2-Row x 3-Column Grid with Smooth Scroll-Scale (Savee.com style) */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: `scale(${gridScale})`,
          opacity: gridOpacity,
          transformOrigin: 'center top',
          transition: 'transform 0.15s ease-out, opacity 0.2s ease-out',
        }}
        className="w-full will-change-transform"
      >
        {filteredItems.length === 0 && (
          <p className="py-16 text-center text-[14px] font-medium text-slate-500">
            {lang === 'fa' ? 'به‌زودی نمونه‌کار جدید در این حوزه اضافه می‌شود.' : 'Work in this niche is coming soon.'}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {filteredItems.map((item, index) => {
            const isFocused = hasActiveFocus && activeFocusedId === item.id;
            const isDimmed = hasActiveFocus && activeFocusedId !== item.id;
            const isUnmuted = unmutedVideoId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.08, 0.35),
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="w-full h-full"
              >
                <VideoCard
                  item={item}
                  isRtl={isRtl}
                  isUnmuted={isUnmuted}
                  isFocused={isFocused}
                  isDimmed={isDimmed}
                  onToggleSound={handleToggleSound}
                  onHover={setHoveredVideoId}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};



