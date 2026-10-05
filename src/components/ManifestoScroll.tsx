import { useState, useEffect, useRef, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ManifestoScroll: FC = () => {
  const { lang } = useLanguage();
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
            // Progress calculation: starts when entering viewport, completes near center
            const startOffset = windowHeight * 0.85;
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

  // Helper to calculate opacity per token index
  const getProgress = (index: number, total: number) => {
    const step = index / Math.max(total - 1, 1);
    const val = Math.min(Math.max((scrollProgress * 1.25 - step * 0.9) / 0.18, 0), 1);
    return {
      opacity: 0.2 + 0.8 * val,
      scale: 0.95 + 0.05 * val,
      isLit: val > 0.5,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0B0B0E] text-white py-28 sm:py-36 md:py-44 px-4 sm:px-8 select-none relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center"
    >
      {/* Ambient Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-indigo-950/25 via-purple-950/20 to-slate-900/35 blur-[140px] pointer-events-none" />

      {/* Inner Centered Content Container */}
      <div className="max-w-3xl mx-auto relative z-10 w-full">
      {/* Dynamic Compact Sentence on Pure Dark Background */}
      {lang === 'fa' ? (
        <div
          dir="rtl"
          className="font-normal text-lg sm:text-xl md:text-2xl lg:text-[25px] tracking-[-0.03em] text-white text-center relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(0, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              من
            </span>

            {/* Emoji 1: Film Frames (-4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(1, 18).opacity,
                transform: `scale(${getProgress(1, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Film%20Frames.png"
                alt="Film"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(2, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              راش‌های خام رو به داستان‌هایی
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(3, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              تبدیل می‌کنم که
            </span>

            {/* Emoji 2: Eyes (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(4, 18).opacity,
                transform: `scale(${getProgress(4, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Hand%20gestures/Eyes.png"
                alt="Eyes"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(5, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              ارزش دیده شدن دارن.
            </span>
          </div>

          {/* Line 3 (Meaningful Stanza Gap) */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2] mt-8 sm:mt-10 md:mt-12">
            <span style={{ opacity: getProgress(6, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              حس‌لب
            </span>

            {/* Emoji 3: Potted Plant (-3.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(7, 18).opacity,
                transform: `scale(${getProgress(7, 18).scale}) rotate(-3.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Animals/Potted%20Plant.png"
                alt="Plant"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(8, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              گوشه امن ادیت منه؛
            </span>
          </div>

          {/* Line 4 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(9, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              ساخته‌شده با
            </span>

            {/* Emoji 4: Red Heart (+5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(10, 18).opacity,
                transform: `scale(${getProgress(10, 18).scale}) rotate(5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Smilies/Red%20Heart.png"
                alt="Heart"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(11, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              عشق و
            </span>

            {/* Emoji 5: Hesam / Man Beard (-4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(12, 18).opacity,
                transform: `scale(${getProgress(12, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/People%20with%20professions/Man%20Beard.png"
                alt="Hesam"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(13, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              حسام،
            </span>
          </div>

          {/* Line 5 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(14, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              همراه با یه
            </span>

            {/* Emoji 6: Laptop (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(15, 18).opacity,
                transform: `scale(${getProgress(15, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Laptop.png"
                alt="Laptop"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(16, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              دید دیزاینر
            </span>
          </div>

          {/* Line 6 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(17, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              که داستان‌ها رو به حرکت درمیاره.
            </span>
          </div>
        </div>
      ) : (
        /* English Version */
        <div
          dir="ltr"
          className="manifesto-serif text-xl sm:text-2xl md:text-[27px] lg:text-[29px] font-normal text-white text-center relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 tracking-[-0.04em]"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(0, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              I turn
            </span>

            {/* Emoji 1: Film Frames (-4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(1, 18).opacity,
                transform: `scale(${getProgress(1, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Film%20Frames.png"
                alt="Film"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(2, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              raw footages
            </span>
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(3, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              into stories
            </span>

            {/* Emoji 2: Eyes (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(4, 18).opacity,
                transform: `scale(${getProgress(4, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Hand%20gestures/Eyes.png"
                alt="Eyes"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(5, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              worth watching.
            </span>
          </div>

          {/* Line 3 (Meaningful Stanza Gap) */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2] mt-8 sm:mt-10 md:mt-12">
            <span style={{ opacity: getProgress(6, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              Heslab is
            </span>

            {/* Emoji 3: Potted Plant (-3.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(7, 18).opacity,
                transform: `scale(${getProgress(7, 18).scale}) rotate(-3.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Animals/Potted%20Plant.png"
                alt="Plant"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(8, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              my corner of editing,
            </span>
          </div>

          {/* Line 4 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(9, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              powered by
            </span>

            {/* Emoji 4: Red Heart (+5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(10, 18).opacity,
                transform: `scale(${getProgress(10, 18).scale}) rotate(5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Smilies/Red%20Heart.png"
                alt="Heart"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(11, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              love &
            </span>

            {/* Emoji 5: Hesam / Man Beard (-4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(12, 18).opacity,
                transform: `scale(${getProgress(12, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/People%20with%20professions/Man%20Beard.png"
                alt="Hesam"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(13, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              Hesam,
            </span>
          </div>

          {/* Line 5 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(14, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              with a
            </span>

            {/* Emoji 6: Laptop (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(15, 18).opacity,
                transform: `scale(${getProgress(15, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/Emojis/Objects/Laptop.png"
                alt="Laptop"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(16, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              designer's eye
            </span>
          </div>

          {/* Line 6 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(17, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              cutting stories into motion.
            </span>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};
