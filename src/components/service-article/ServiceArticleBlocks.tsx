import { Fragment, type FC, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown2, ArrowRight, TickCircle } from 'iconsax-react';
import { useQuoteModal } from '../../context/QuoteModalContext';
import { trackEvent } from '../../lib/analytics';
import { SERVICE_ARTICLES, type ServiceArticle } from '../../data/serviceArticles';

// -------------------------------------------------------------------------
// Rich text: renders [label](/path) as router links
// -------------------------------------------------------------------------
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export const stripLinks = (text: string) => text.replace(LINK_RE, '$1');

export const RichText: FC<{ text: string; className?: string }> = ({ text, className }) => {
  const navigate = useNavigate();
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    const [pathname, hash] = href.split('#');
    parts.push(
      <Link
        key={m.index}
        to={href}
        onClick={
          hash
            ? (e) => {
                e.preventDefault();
                navigate(pathname || '/');
                window.setTimeout(() => {
                  document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
              }
            : undefined
        }
        className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950 transition-colors"
      >
        {label}
      </Link>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span className={className}>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</span>;
};

// -------------------------------------------------------------------------
// Buttons
// -------------------------------------------------------------------------
export const PRIMARY_BTN =
  'bg-[#5566FF] hover:bg-[#4859F5] text-white text-[14.5px] font-semibold px-6 h-[46px] rounded-[14px] border border-white/20 shadow-[inset_0_0_14px_1px_rgba(195,208,255,0.55),inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center select-none';

const useStartProject = (slug: string, location: string) => {
  const { openModal } = useQuoteModal();
  return () => {
    trackEvent('primary_cta_click', {
      cta_name: 'start_a_project',
      cta_location: `${location}_${slug}`,
      page_path: window.location.pathname,
    });
    openModal();
  };
};

const SERVICE_EMOJI_BY_SLUG: Record<string, string> = {
  'short-form-video-editing': '/emojis/clapper_board.png',
  'video-brand-style': '/emojis/artist_palette.png',
  'brand-visual-style': '/emojis/artist_palette.png',
  'motion-design-short-videos': '/emojis/sparkles.png',
  'motion-design': '/emojis/sparkles.png',
  'sound-design-video-editing': '/emojis/headphone.png',
  'sound-design': '/emojis/headphone.png',
  'cinematic-video-editing': '/emojis/movie_camera.png',
  'content-packs-video-editing': '/emojis/package.png',
  'ongoing-video-content': '/emojis/package.png',
};

// -------------------------------------------------------------------------
// ServiceHero
// -------------------------------------------------------------------------
export const ServiceHero: FC<{ article: ServiceArticle }> = ({ article }) => {
  const v = article.heroVisual;
  const emoji = SERVICE_EMOJI_BY_SLUG[article.slug] || v.emojis?.[0] || '/emojis/clapper_board.png';

  return (
    <header className="flex flex-col items-center text-center mx-auto max-w-3xl">
      {/* Service 3D Animated Emoji */}
      <div className="mb-4 sm:mb-5">
        <img
          src={emoji}
          alt={article.name}
          className="h-14 w-14 sm:h-16 sm:w-16 object-contain select-none"
        />
      </div>

      {/* Clean Service Name */}
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12] text-slate-950 font-['Plus_Jakarta_Display',sans-serif]">
        {article.name}
      </h1>

      {/* Clean Service Description */}
      <p className="mt-4 sm:mt-5 max-w-2xl text-[17px] sm:text-[19px] leading-[1.65] text-slate-600 font-medium">
        {article.cardDesc}
      </p>

      {/* Hero Visual Image */}
      <img
        src={v.image}
        alt={v.alt}
        className="mt-8 sm:mt-10 aspect-[16/9] w-full rounded-[26px] sm:rounded-[32px] object-cover shadow-sm"
      />
    </header>
  );
};

// -------------------------------------------------------------------------
// ServiceSection (+ card helpers)
// -------------------------------------------------------------------------
export const ServiceSection: FC<{
  id: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
}> = ({ id, heading, intro, children }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="mt-14 sm:mt-20">
    <h2 id={`${id}-h`} className="text-2xl sm:text-[32px] font-black tracking-tight text-slate-950 leading-tight">
      {heading}
    </h2>
    {intro && (
      <p className="mt-4 max-w-2xl text-[16px] sm:text-[17px] leading-[1.75] text-slate-600">
        <RichText text={intro} />
      </p>
    )}
    {children && <div className="mt-6">{children}</div>}
  </section>
);

const E = (n: string) => `/emojis/${n}.png`;
const FALLBACK_EMOJIS = ['sparkles', 'light_bulb', 'rocket', 'gem', 'eyes', 'high_voltage'].map(E);

// Picks a fitting Fluent emoji from the item title; falls back to a rotating set
const EMOJI_RULES: [string, string][] = [
  ['cutting', E('scissors')],
  ['shot', E('movie_camera')],
  ['b-roll', E('single_video')],
  ['music', E('musical_note')],
  ['impact', E('high_voltage')],
  ['sound', E('speaker')],
  ['audio', E('microphone')],
  ['caption', E('memo')],
  ['subtitle', E('memo')],
  ['هوک', E('high_voltage')],
  ['ریتم', E('hourglass')],
  ['زیرنویس', E('memo')],
  ['صدا', E('speaker')],
  ['موشن', E('magic_wand')],
  ['typograph', E('pencil')],
  ['color', E('artist_palette')],
  ['grad', E('artist_palette')],
  ['motion', E('magic_wand')],
  ['animat', E('magic_wand')],
  ['effect', E('sparkles')],
  ['transition', E('link')],
  ['callout', E('pushpin')],
  ['pacing', E('hourglass')],
  ['rhythm', E('hourglass')],
  ['first seconds', E('high_voltage')],
  ['hook', E('high_voltage')],
  ['story', E('open_book')],
  ['retention', E('eyes')],
  ['attention', E('eyes')],
  ['guides', E('eyes')],
  ['hierarchy', E('ruler')],
  ['composition', E('ruler')],
  ['reference', E('memo')],
  ['information', E('light_bulb')],
  ['consisten', E('gem')],
  ['style', E('gem')],
  ['trust', E('red_heart')],
  ['recogniz', E('red_heart')],
  ['emotion', E('red_heart')],
  ['speeds', E('rocket')],
  ['overhead', E('rocket')],
  ['finishing', E('sparkles')],
  ['creators', E('clapper_board')],
  ['founders', E('briefcase')],
  ['personal', E('glowing_star')],
  ['business', E('office')],
  ['delivery', E('calendar')],
  ['schedule', E('calendar')],
  ['predictable', E('calendar')],
  ['revision', E('pencil')],
  ['multiple', E('package')],
  ['value', E('money_bag')],
];

const emojiFor = (title: string, i: number) => {
  const t = title.toLowerCase();
  const hit = EMOJI_RULES.find(([k]) => t.includes(k));
  return hit ? hit[1] : FALLBACK_EMOJIS[i % FALLBACK_EMOJIS.length];
};

export const CardGrid: FC<{
  items: { title: string; text: string }[];
  variant?: 'default' | 'warn';
}> = ({ items, variant = 'default' }) => (
  <ul className="grid gap-4 sm:grid-cols-2">
    {items.map((it, i) => (
      <li key={it.title} className={`flex gap-4 rounded-[22px] p-5 ${variant === 'warn' ? 'bg-[#FFF4D8]' : 'bg-[#F4F4F5]'}`}>
        <img
          src={variant === 'warn' ? E('warning') : emojiFor(it.title, i)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-11 w-11 shrink-0 object-contain"
        />
        <div>
          <h3 className="text-[17px] font-bold tracking-tight text-slate-950">{it.title}</h3>
          <p className="mt-1 text-[15px] leading-relaxed text-slate-600">
            <RichText text={it.text} />
          </p>
        </div>
      </li>
    ))}
  </ul>
);

export const AnswerBlock: FC<{ answer: string; points?: string[] }> = ({ answer, points }) => (
  <div className="max-w-3xl">
    <p className="text-[18px] sm:text-[19px] leading-[1.75] text-slate-800">{answer}</p>
    {points && <p className="mt-4 text-[15px] font-semibold text-slate-500">{points.join('  ·  ')}</p>}
  </div>
);

export const CompareBlock: FC<{
  beforeLabel: string;
  beforeItems: string[];
  afterLabel: string;
  afterItems: string[];
}> = ({ beforeLabel, beforeItems, afterLabel, afterItems }) => (
  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
    <div className="rounded-[24px] bg-[#FDEBEC] p-6 sm:p-7">
      <h3 className="text-[15px] font-bold uppercase tracking-wide text-rose-700/80">{beforeLabel}</h3>
      <ul className="mt-4 space-y-3">
        {beforeItems.map((t) => (
          <li key={t} className="flex gap-3 text-[14.5px] leading-snug text-slate-600">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
            {t}
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-[24px] bg-[#E6F5EB] p-6 sm:p-7">
      <h3 className="text-[15px] font-bold uppercase tracking-wide text-emerald-800/80">{afterLabel}</h3>
      <ul className="mt-4 space-y-3">
        {afterItems.map((t) => (
          <li key={t} className="flex gap-3 text-[14.5px] leading-snug text-slate-900">
            <TickCircle size={18} variant="Bold" className="mt-px shrink-0 text-emerald-500" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// -------------------------------------------------------------------------
// ProcessBlock
// -------------------------------------------------------------------------
export const ProcessBlock: FC<{ steps: { title: string; text: string }[] }> = ({ steps }) => (
  <ol className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((s, i) => (
      <li key={s.title} className="relative rounded-[22px] bg-[#F4F4F5] p-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[13px] font-bold text-white">
          {i + 1}
        </span>
        <h3 className="mt-4 text-[17px] font-bold tracking-tight text-slate-950">{s.title}</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{s.text}</p>
        {i < steps.length - 1 && (
          <ArrowRight
            size={16}
            color="currentColor"
            className="absolute -right-[13px] top-1/2 z-10 hidden -translate-y-1/2 text-slate-400 lg:block"
          />
        )}
      </li>
    ))}
  </ol>
);

// -------------------------------------------------------------------------
// Examples (real portfolio frames, no invented results)
// -------------------------------------------------------------------------
const LazyExampleVideo: FC<{ src: string }> = ({ src }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
};

export const ExamplesStrip: FC<{ videos: string[]; label: string }> = ({ videos, label }) => (
  <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-[640px]">
    {videos.map((src, i) => (
      <Link
        key={src + i}
        to="/work"
        aria-label={`${label} ${i + 1}`}
        className="group relative block aspect-[9/16] overflow-hidden rounded-[18px] sm:rounded-[24px] bg-zinc-900"
      >
        <LazyExampleVideo src={src} />
      </Link>
    ))}
  </div>
);

// -------------------------------------------------------------------------
// FAQBlock
// -------------------------------------------------------------------------
export const FAQBlock: FC<{ items: { q: string; a: string }[] }> = ({ items }) => (
  <div className="space-y-3">
    {items.map((f) => (
      <details key={f.q} className="group rounded-[20px] bg-[#F4F4F5]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-slate-950 [&::-webkit-details-marker]:hidden">
          <h3 className="text-[16px] font-medium tracking-tight">{f.q}</h3>
          <ArrowDown2
            size={18}
            color="currentColor"
            className="shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180"
          />
        </summary>
        <p className="px-6 pb-6 text-[15px] leading-relaxed text-slate-600">
          <RichText text={f.a} />
        </p>
      </details>
    ))}
  </div>
);

// -------------------------------------------------------------------------
// CTASection
// -------------------------------------------------------------------------
export const CTASection: FC<{ article: ServiceArticle }> = ({ article }) => {
  const start = useStartProject(article.slug, 'service_cta');
  return (
    <section
      aria-labelledby="cta-h"
      className="mt-16 sm:mt-24 rounded-[28px] sm:rounded-[34px] bg-[#1E1E1F] px-6 py-12 text-center text-white sm:px-10 sm:py-16"
    >
      <h2 id="cta-h" className="mx-auto max-w-xl text-2xl sm:text-4xl font-black tracking-tight leading-tight">
        {article.cta.title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-white/70">{article.cta.text}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={start} className={PRIMARY_BTN}>
          Start a project
        </button>
        <Link
          to="/contact"
          className="inline-flex h-[46px] items-center rounded-[14px] bg-white/10 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/15"
        >
          Contact
        </Link>
      </div>
    </section>
  );
};

// -------------------------------------------------------------------------
// RelatedServices
// -------------------------------------------------------------------------
export const RelatedServices: FC<{ slugs: string[] }> = ({ slugs }) => {
  const items = slugs
    .map((s) => SERVICE_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is ServiceArticle => Boolean(a));
  return (
    <section aria-labelledby="related-h" className="mt-16 sm:mt-24">
      <h2 id="related-h" className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
        Related services
      </h2>
      <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-3">
        {items.map((a) => (
          <Link
            key={a.slug}
            to={`/blog/${a.slug}`}
            className="group rounded-[22px] bg-[#F4F4F5] p-6 transition-colors duration-300 hover:bg-[#EBEBED]"
          >
            <h3 className="text-[17px] font-bold tracking-tight text-slate-950">{a.name}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{a.cardDesc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-950">
              Read more
              <ArrowRight size={15} color="currentColor" className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-[14.5px] text-slate-600">
        <RichText text="Or look at the [portfolio](/work), check the [pricing](/#pricing), or [start a project inquiry](/contact)." />
      </p>
    </section>
  );
};
