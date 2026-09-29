import { useState, useEffect, useRef, type FC } from 'react';
import { 
  VolumeHigh, 
  VolumeCross, 
  Grid5, 
  VideoPlay, 
  VideoSquare, 
  Microphone2, 
  Bag2, 
  Briefcase 
} from 'iconsax-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const categoryIcons: Record<string, typeof Grid5> = {
  all: Grid5,
  vlog: VideoPlay,
  documentary: VideoSquare,
  podcast: Microphone2,
  commercial: Bag2,
  educational: Briefcase,
};

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

const VideoCard: FC<VideoCardProps> = ({
  item,
  isRtl,
  isUnmuted,
  isFocused,
  isDimmed,
  onToggleSound,
  onHover,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSound(item.id);
    if (videoRef.current) {
      videoRef.current.muted = isUnmuted; // toggle
    }
  };

  return (
    <div
      onClick={handleToggle}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className={`rounded-[14px] bg-slate-950 text-white overflow-hidden group relative aspect-[9/16] flex flex-col justify-end p-2.5 sm:p-3 cursor-pointer transition-all duration-300 ${
        isRtl ? 'text-right' : 'text-left'
      } ${
        isFocused
          ? 'opacity-100 scale-[1.025] shadow-2xl z-10 ring-1 ring-slate-900/10'
          : isDimmed
          ? 'opacity-40 grayscale-[20%] scale-[0.98]'
          : 'opacity-100 hover:scale-[1.015] shadow-sm'
      }`}
    >
      {/* Autoplaying HTML5 Video */}
      <video
        ref={videoRef}
        src={item.video}
        poster={item.image}
        autoPlay
        loop
        muted={!isUnmuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Top-Left Floating Sound Control Button */}
      <button
        onClick={handleToggle}
        className={`absolute top-2.5 left-2.5 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-200 cursor-pointer select-none ${
          isUnmuted
            ? 'bg-sky-500 text-white ring-2 ring-white shadow-sky-500/30 scale-105'
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
            setScrollProgress(progress);
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
      className="py-14 sm:py-20 px-4 max-w-[840px] mx-auto border-t border-slate-900/10"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-7 sm:mb-9 max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 uppercase">
          {t.title}
        </h2>
        <p className="mt-2 text-slate-500 text-xs sm:text-[13px] font-medium">
          {t.desc}
        </p>
      </div>

      {/* Category Filter Tabs / Pills */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1 mb-5 sm:mb-7 select-none">
        <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center w-max md:w-full min-w-full md:min-w-0 mx-auto gap-1.5 sm:gap-2 px-2">
          {t.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const IconComp = categoryIcons[cat.id] || Grid5;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[10.5px] sm:text-[11.5px] font-bold transition-all duration-200 shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-slate-950 text-white border-slate-950'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <IconComp
                  size={13}
                  variant="Bold"
                  color="currentColor"
                  className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`}
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Row x 3-Column Grid with Smooth Scroll-Scale (Savee.com style) */}
      <div
        style={{
          transform: `scale(${gridScale})`,
          opacity: gridOpacity,
          transformOrigin: 'center top',
          transition: 'transform 0.15s ease-out, opacity 0.2s ease-out',
        }}
        className="w-full will-change-transform"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
          {filteredItems.map((item) => {
            const isFocused = hasActiveFocus && activeFocusedId === item.id;
            const isDimmed = hasActiveFocus && activeFocusedId !== item.id;
            const isUnmuted = unmutedVideoId === item.id;

            return (
              <VideoCard
                key={item.id}
                item={item}
                isRtl={isRtl}
                isUnmuted={isUnmuted}
                isFocused={isFocused}
                isDimmed={isDimmed}
                onToggleSound={handleToggleSound}
                onHover={setHoveredVideoId}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};



