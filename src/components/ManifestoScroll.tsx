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

            // 1. Enter & Reveal: Starts early right as section enters viewport (1.05 * windowHeight),
            // and finishes lighting all tokens by the time it reaches comfortable reading position (0.42 * windowHeight)
            const enterStart = windowHeight * 0.7;
            const enterEnd = windowHeight * 0.0;
            const enterCurrent = enterStart - rect.top;
            const enterTotal = enterStart - enterEnd;
            const enterProg = Math.min(Math.max(enterCurrent / enterTotal, 0), 1);
            setScrollProgress((prev) => (Math.abs(prev - enterProg) > 0.005 ? enterProg : prev));
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

  // Sequential reveal: each token fades in one after another as the user scrolls down,
  // and fades back out in reverse order when scrolling up.
  const getProgress = (index: number, total: number) => {
    const overlap = 1.2;
    const pos = scrollProgress * (total - 1 + overlap);
    const val = Math.min(Math.max((pos - index) / overlap, 0), 1);

    return {
      opacity: val,
      scale: 0.9 + 0.1 * val,
      isLit: val > 0.5,
    };
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1E1E1F] text-white py-28 sm:py-36 md:py-44 px-4 sm:px-8 select-none relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center"
    >
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
                src="/emojis/clapper_board.png"
                alt="Clapper Board"
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
                src="/emojis/eyes.png"
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

            {/* Emoji 3: Corner of editing (-3.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(7, 18).opacity,
                transform: `scale(${getProgress(7, 18).scale}) rotate(-3.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="/emojis/corner.png"
                alt="Corner"
                className="emoji-sticker-stroke w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain inline-block align-middle pointer-events-none"
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
                src="/emojis/red_heart.png"
                alt="Heart"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(11, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              عشق و
            </span>

            {/* Emoji 5: Hesam photo (clipped circular) */}
            <span
              style={{
                opacity: getProgress(12, 18).opacity,
                transform: `scale(${getProgress(12, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <span className="inline-flex items-center justify-center rounded-full emoji-sticker-stroke align-middle shrink-0 aspect-square w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 overflow-hidden">
                <img
                  src="/emojis/hesam_avatar.jpg"
                  alt="Hesam"
                  className="w-full h-full rounded-full object-cover object-center pointer-events-none"
                />
              </span>
            </span>

            <span style={{ opacity: getProgress(13, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              <a
                href="https://hesvm.space/?utm_source=heslab&utm_medium=referral&utm_campaign=manifesto"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block transition-all duration-300 px-1 py-0.5 -mx-1 rounded-md text-white hover:text-white hover:bg-[#8B5CF6]/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:ring-1 hover:ring-[#A78BFA] active:scale-95 cursor-pointer underline-offset-4 hover:underline decoration-[#A78BFA]"
              >
                حسام،
              </a>
            </span>
          </div>

          {/* Line 5 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(14, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              همراه با یه
            </span>

            {/* Emoji 6: Magic Wand (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(15, 18).opacity,
                transform: `scale(${getProgress(15, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="/emojis/magic_wand.png"
                alt="Magic Wand"
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
                src="/emojis/clapper_board.png"
                alt="Clapper Board"
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
                src="/emojis/eyes.png"
                alt="Eyes"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(5, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              worth watching...
            </span>
          </div>

          {/* Line 3 (Meaningful Stanza Gap) */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2] mt-8 sm:mt-10 md:mt-12">
            <span style={{ opacity: getProgress(6, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              Heslab is
            </span>

            {/* Emoji 3: Corner (-3.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(7, 18).opacity,
                transform: `scale(${getProgress(7, 18).scale}) rotate(-3.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="/emojis/corner.png"
                alt="Corner"
                className="emoji-sticker-stroke w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain inline-block align-middle pointer-events-none"
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
                src="/emojis/red_heart.png"
                alt="Heart"
                className="emoji-sticker-stroke w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain inline-block align-middle pointer-events-none"
              />
            </span>

            <span style={{ opacity: getProgress(11, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              love &
            </span>

            {/* Emoji 5: Hesam photo (clipped circular) */}
            <span
              style={{
                opacity: getProgress(12, 18).opacity,
                transform: `scale(${getProgress(12, 18).scale}) rotate(-4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <span className="inline-flex items-center justify-center rounded-full emoji-sticker-stroke align-middle shrink-0 aspect-square w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 overflow-hidden">
                <img
                  src="/emojis/hesam_avatar.jpg"
                  alt="Hesam"
                  className="w-full h-full rounded-full object-cover object-center pointer-events-none"
                />
              </span>
            </span>

            <span style={{ opacity: getProgress(13, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              <a
                href="https://hesvm.space/?utm_source=heslab&utm_medium=referral&utm_campaign=manifesto"
                target="_blank"
                rel="noopener noreferrer"
                className="group/marker relative inline-block px-1 -mx-1 text-white cursor-pointer no-underline"
              >
                {/* Marker-pen swipe: draws left to right behind the text on hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-[-2px] right-[-3px] top-[16%] bottom-[2%] bg-[#8B5CF6]/70 origin-left scale-x-0 group-hover/marker:scale-x-100 transition-transform duration-500 ease-out pointer-events-none"
                  style={{
                    borderRadius: '3px 9px 5px 11px / 7px 4px 9px 5px',
                    rotate: '-1.2deg',
                  }}
                />
                <span className="relative z-10">Hesam,</span>
              </a>
            </span>
          </div>

          {/* Line 5 */}
          <div className="flex flex-wrap items-center justify-center leading-[1.15] sm:leading-[1.18] md:leading-[1.2]">
            <span style={{ opacity: getProgress(14, 18).opacity }} className="inline-block transition-opacity duration-150 mx-1 text-white">
              with a
            </span>

            {/* Emoji 6: Magic Wand (+4.5 deg tilt) */}
            <span
              style={{
                opacity: getProgress(15, 18).opacity,
                transform: `scale(${getProgress(15, 18).scale}) rotate(4.5deg)`,
              }}
              className="inline-block align-middle mx-1 sm:mx-1.5 select-none transition-transform duration-200"
            >
              <img
                src="/emojis/magic_wand.png"
                alt="Magic Wand"
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
