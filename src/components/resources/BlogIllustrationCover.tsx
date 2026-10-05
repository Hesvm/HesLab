import { FC } from 'react';
import { Clock } from 'iconsax-react';

interface BlogIllustrationCoverProps {
  gradient: string;
  title: string;
  readTime?: string;
  tag?: string;
  aspectRatio?: 'square' | '4/3' | '16/9';
}

export const BlogIllustrationCover: FC<BlogIllustrationCoverProps> = ({
  gradient,
  readTime,
  aspectRatio = 'square',
}) => {
  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : 'aspect-[4/3]';

  return (
    <div
      className={`relative flex ${aspectClass} w-full items-center justify-center overflow-hidden rounded-[22px] p-5 text-zinc-800 shadow-xs select-none transition-transform duration-300 group-hover:scale-[1.015]`}
      style={{ background: gradient }}
    >
      {/* Read Time Tag on Top-Left */}
      {readTime && (
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-zinc-800 backdrop-blur-md shadow-xs select-none">
          <Clock size={12} variant="Linear" color="currentColor" className="text-zinc-600" />
          <span>{readTime.replace(/مطالعه/g, '').trim()}</span>
        </div>
      )}

      {/* Decorative Mockup Floating Card */}
      <div className="relative flex w-full max-w-[230px] sm:max-w-[250px] flex-col gap-2 rounded-2xl border border-black/[0.08] bg-white/95 p-3.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-[10.5px] font-bold text-zinc-800 tracking-tight">HESLAB PIPELINE</span>
          </div>
          <span className="text-[9.5px] text-zinc-500 font-mono bg-zinc-100 px-1.5 py-0.5 rounded">RETENTION 85%+</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9.5px]">
          <div className="flex flex-col gap-0.5 rounded-xl bg-sky-500/10 p-2.5 border border-sky-500/20">
            <span className="font-bold text-sky-950 leading-tight">3-Sec Hook</span>
            <span className="text-[8.5px] text-sky-800/80 leading-tight">Audio transient</span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-xl bg-purple-500/10 p-2.5 border border-purple-500/20">
            <span className="font-bold text-purple-950 leading-tight">Kinetic Pacing</span>
            <span className="text-[8.5px] text-purple-800/80 leading-tight">Spring physics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogIllustrationCover;
