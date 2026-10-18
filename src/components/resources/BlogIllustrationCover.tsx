import type { FC } from 'react';

interface BlogIllustrationCoverProps {
  gradient: string;
  title: string;
  slug?: string;
  category?: string;
  aspectRatio?: 'square' | '4/3' | '16/9';
  featuredImage?: string;
}

export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface AccentItem {
  src: string;
  position: CornerPosition;
  className?: string;
}

interface EmojiConfig {
  main: string;
  accents: AccentItem[];
}

const getCornerClasses = (pos: CornerPosition): string => {
  switch (pos) {
    case 'top-left':
      return '-top-8 -left-8 sm:-top-11 sm:-left-11 w-28 h-28 sm:w-36 sm:h-36 -rotate-12 blur-[16px] sm:blur-[22px] opacity-45';
    case 'top-right':
      return '-top-8 -right-8 sm:-top-11 sm:-right-11 w-28 h-28 sm:w-36 sm:h-36 rotate-12 blur-[16px] sm:blur-[22px] opacity-45';
    case 'bottom-left':
      return '-bottom-8 -left-8 sm:-bottom-11 sm:-left-11 w-30 h-30 sm:w-38 sm:h-38 -rotate-15 blur-[16px] sm:blur-[22px] opacity-45';
    case 'bottom-right':
      return '-bottom-8 -right-8 sm:-bottom-11 sm:-right-11 w-30 h-30 sm:w-38 sm:h-38 rotate-15 blur-[16px] sm:blur-[22px] opacity-45';
  }
};

const EMOJI_MAP_BY_SLUG: Record<string, EmojiConfig> = {
  // 1. Hook Retention
  'short-form-video-hooks-retention': {
    main: '/emojis/high_voltage.png',
    accents: [
      { src: '/emojis/hourglass.png', position: 'top-left' },
      { src: '/emojis/sparkles.png', position: 'bottom-right' },
    ],
  },
  // 2. Podcast to Shorts
  'podcast-to-shorts-workflow': {
    main: '/emojis/microphone.png',
    accents: [
      { src: '/emojis/headphone.png', position: 'top-right' },
      { src: '/emojis/scissors.png', position: 'bottom-left' },
    ],
  },
  // 3. Kinetic Typography
  'kinetic-typography-motion-design': {
    main: '/emojis/sparkles.png',
    accents: [
      { src: '/emojis/magic_wand.png', position: 'top-left' },
      { src: '/emojis/glowing_star.png', position: 'bottom-right' },
    ],
  },
  // 4. Cost Guide
  'short-form-video-editing-cost-guide': {
    main: '/emojis/money_bag.png',
    accents: [
      { src: '/emojis/gem.png', position: 'top-right' },
      { src: '/emojis/briefcase.png', position: 'bottom-left' },
    ],
  },
  // 5. How Many Videos per Month
  'how-many-short-form-videos-per-month': {
    main: '/emojis/calendar.png',
    accents: [
      { src: '/emojis/rocket.png', position: 'top-left' },
      { src: '/emojis/hourglass.png', position: 'bottom-right' },
    ],
  },
  // 6. Retainers / Content Packs
  'creative-production-system-retainers': {
    main: '/emojis/package.png',
    accents: [
      { src: '/emojis/package.png', position: 'top-right' },
      { src: '/emojis/package.png', position: 'bottom-left' },
    ],
  },
  // 7. 3-Second Hook
  'three-second-hook-visual-mechanics': {
    main: '/emojis/eyes.png',
    accents: [
      { src: '/emojis/high_voltage.png', position: 'top-right' },
      { src: '/emojis/magic_wand.png', position: 'bottom-left' },
    ],
  },
  // 8. Podcast Repurposing
  'podcast-repurposing-pipeline-playbook': {
    main: '/emojis/headphone.png',
    accents: [
      { src: '/emojis/microphone.png', position: 'top-left' },
      { src: '/emojis/clapper_board.png', position: 'bottom-right' },
    ],
  },
  // 9. Dark Posting Testing
  'dark-posting-short-form-testing': {
    main: '/emojis/rocket.png',
    accents: [
      { src: '/emojis/magnifier.png', position: 'top-right' },
      { src: '/emojis/high_voltage.png', position: 'bottom-left' },
    ],
  },
  // 10. In-house vs Outsourced
  'in-house-vs-outsourced-video-editing': {
    main: '/emojis/briefcase.png',
    accents: [
      { src: '/emojis/office.png', position: 'top-left' },
      { src: '/emojis/scissors.png', position: 'bottom-right' },
    ],
  },
  // 11. TikTok Spark Ads
  'tiktok-spark-ads-vs-organic-reels': {
    main: '/emojis/movie_camera.png',
    accents: [
      { src: '/emojis/sparkles.png', position: 'top-right' },
      { src: '/emojis/rocket.png', position: 'bottom-left' },
    ],
  },
  // 12. Animation Physics
  'kinetic-typography-animation-physics': {
    main: '/emojis/magic_wand.png',
    accents: [
      { src: '/emojis/sparkles.png', position: 'top-left' },
      { src: '/emojis/glowing_star.png', position: 'bottom-right' },
    ],
  },
  // 13. Safe Zones
  'vertical-video-safe-zones-cheat-sheet': {
    main: '/emojis/ruler.png',
    accents: [
      { src: '/emojis/corner.png', position: 'top-right' },
      { src: '/emojis/clapper_board.png', position: 'bottom-left' },
    ],
  },
  // 14. B-roll Sound Design
  'b-roll-pacing-sound-design-mastery': {
    main: '/emojis/speaker.png',
    accents: [
      { src: '/emojis/musical_note.png', position: 'top-left' },
      { src: '/emojis/headphone.png', position: 'bottom-right' },
    ],
  },
};

const CATEGORY_DEFAULT_EMOJI: Record<string, EmojiConfig> = {
  'short-form': {
    main: '/emojis/clapper_board.png',
    accents: [
      { src: '/emojis/sparkles.png', position: 'top-left' },
      { src: '/emojis/scissors.png', position: 'bottom-right' },
    ],
  },
  'motion-design': {
    main: '/emojis/sparkles.png',
    accents: [
      { src: '/emojis/magic_wand.png', position: 'top-left' },
      { src: '/emojis/glowing_star.png', position: 'bottom-right' },
    ],
  },
  'creator-workflow': {
    main: '/emojis/package.png',
    accents: [
      { src: '/emojis/package.png', position: 'top-right' },
      { src: '/emojis/briefcase.png', position: 'bottom-left' },
    ],
  },
  'pricing-buying': {
    main: '/emojis/money_bag.png',
    accents: [
      { src: '/emojis/gem.png', position: 'top-right' },
      { src: '/emojis/briefcase.png', position: 'bottom-left' },
    ],
  },
};

const SOLID_COLOR_BY_SLUG: Record<string, string> = {
  'short-form-video-hooks-retention': '#EEF5FD',
  'podcast-to-shorts-workflow': '#EEF8F1',
  'kinetic-typography-motion-design': '#F5EEFD',
  'short-form-video-editing-cost-guide': '#FEF7E5',
  'how-many-short-form-videos-per-month': '#EEF5FD',
  'creative-production-system-retainers': '#EEF2FD',
  'three-second-hook-visual-mechanics': '#FEECF0',
  'podcast-repurposing-pipeline-playbook': '#EEF8F1',
  'dark-posting-short-form-testing': '#F5EEFD',
  'in-house-vs-outsourced-video-editing': '#E9F7F4',
  'tiktok-spark-ads-vs-organic-reels': '#FCEEF6',
  'kinetic-typography-animation-physics': '#F5EEFD',
  'vertical-video-safe-zones-cheat-sheet': '#EEF5FD',
  'b-roll-pacing-sound-design-mastery': '#EEF8F1',
};

const CATEGORY_SOLID_COLORS: Record<string, string> = {
  'short-form': '#EEF5FD',
  'motion-design': '#F5EEFD',
  'creator-workflow': '#EEF2FD',
  'pricing-buying': '#FEF7E5',
};

export const BlogIllustrationCover: FC<BlogIllustrationCoverProps> = ({
  gradient,
  title,
  slug,
  category,
  featuredImage,
  aspectRatio = 'square',
}) => {
  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : 'aspect-[4/3]';

  // If a real image or gif is supplied, render it cleanly as a static media asset
  if (featuredImage) {
    return (
      <div className={`relative flex ${aspectClass} w-full overflow-hidden rounded-[26px] sm:rounded-[28px] border border-slate-200/60 select-none bg-slate-50`}>
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover pointer-events-none select-none"
          loading="lazy"
        />
      </div>
    );
  }

  const config: EmojiConfig =
    (slug && EMOJI_MAP_BY_SLUG[slug]) ||
    (category && CATEGORY_DEFAULT_EMOJI[category]) || {
      main: '/emojis/clapper_board.png',
      accents: [
        { src: '/emojis/sparkles.png', position: 'top-left' },
        { src: '/emojis/magic_wand.png', position: 'bottom-right' },
      ],
    };

  // Resolve clean solid background color (Zero gradient)
  const solidBg =
    (slug && SOLID_COLOR_BY_SLUG[slug]) ||
    (category && CATEGORY_SOLID_COLORS[category]) ||
    (gradient && !gradient.includes('gradient') ? gradient : '#F4F4F5');

  return (
    <div
      className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-[26px] sm:rounded-[28px] border border-slate-200/60 p-6 select-none pointer-events-none shadow-2xs`}
      style={{ backgroundColor: solidBg }}
    >
      {/* Blurred Depth-of-Field Accents in Background (Pushed to Edges & Enlarged) */}
      {config.accents.map((accent, idx) => {
        const customOrPosClass = accent.className || getCornerClasses(accent.position);
        return (
          <div
            key={idx}
            className={`absolute pointer-events-none select-none ${customOrPosClass}`}
          >
            <img
              src={accent.src}
              alt=""
              className="w-full h-full object-contain pointer-events-none"
              loading="lazy"
            />
          </div>
        );
      })}

      {/* Center 3D Hero Emoji (Sharp, Static, Non-interactive) */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none select-none">
        <img
          src={config.main}
          alt={title}
          className={`${
            aspectRatio === 'square'
              ? 'w-24 h-24 sm:w-28 sm:h-28 md:w-[114px] md:h-[114px]'
              : 'w-28 h-28 sm:w-36 sm:h-36 md:w-[145px] md:h-[145px]'
          } object-contain select-none pointer-events-none drop-shadow-[0_14px_22px_rgba(0,0,0,0.12)]`}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BlogIllustrationCover;
