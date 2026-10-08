import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TickCircle } from 'iconsax-react';
import { PRIMARY_BTN } from './ServiceArticleBlocks';

// =========================================================================
// Shared article blocks: used by blog posts so they look like the service pages
// (flat #F4F4F5 cards, Fluent emoji, no strokes, no shadows)
// =========================================================================
const emojiSrc = (n: string) => `/emojis/${n}.png`;

export const ArticleMetaBar: FC<{
  avatar?: string;
  name?: string;
  role?: string;
  readingTime: string;
  date: string;
  readingIcon?: ReactNode;
}> = ({ avatar, name, role, readingTime, date, readingIcon }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    {name && (
      <div className="flex items-center gap-3">
        {avatar && <img src={avatar} alt={name} width={40} height={40} className="size-10 rounded-full object-cover" />}
        <div className="flex flex-col leading-tight">
          <span className="text-[14px] font-bold text-slate-950">{name}</span>
          <span className="mt-0.5 text-[12.5px] text-slate-500">{role}</span>
        </div>
      </div>
    )}
    <div className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-3 py-1.5">
        {readingIcon}
        {readingTime}
      </span>
      <span className="rounded-full bg-[#F4F4F5] px-3 py-1.5">{date}</span>
    </div>
  </div>
);

export const KeyTakeaways: FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="rounded-[26px] bg-[#E6F5EB] p-6 sm:p-8">
    <div className="flex items-center gap-3">
      <img src={emojiSrc('light_bulb')} alt="" className="h-9 w-9 object-contain" loading="lazy" />
      <h2 className="text-[19px] font-black tracking-tight text-slate-950">{title}</h2>
    </div>
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-[1.7] text-slate-700">
          <TickCircle size={20} variant="Bold" className="mt-0.5 shrink-0 text-emerald-500" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Callout: FC<{ text: string; emoji?: string }> = ({ text, emoji = 'sparkles' }) => (
  <div className="flex gap-4 rounded-[22px] bg-[#FFF4D8] p-5 sm:p-6">
    <img src={emojiSrc(emoji)} alt="" className="h-10 w-10 shrink-0 object-contain" loading="lazy" />
    <p className="text-[16px] font-medium leading-[1.7] text-slate-800">{text}</p>
  </div>
);

export const PullQuote: FC<{ text: string }> = ({ text }) => (
  <blockquote className="max-w-3xl text-[22px] font-bold leading-snug tracking-tight text-slate-950 sm:text-[26px]">
    {text}
  </blockquote>
);

export const StepList: FC<{ steps: { step: string; title: string; text: string }[] }> = ({ steps }) => (
  <ol className="grid gap-4 sm:grid-cols-2">
    {steps.map((s) => (
      <li key={s.step + s.title} className="rounded-[22px] bg-[#F4F4F5] p-6">
        <span className="flex h-8 min-w-8 w-fit items-center justify-center rounded-full bg-slate-950 px-2 text-[13px] font-bold text-white">
          {s.step}
        </span>
        <h3 className="mt-4 text-[17px] font-bold tracking-tight text-slate-950">{s.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
      </li>
    ))}
  </ol>
);

export const DataTable: FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-[22px]">
    <table className="w-full min-w-[480px] text-start text-[14.5px]">
      <thead className="bg-slate-950 text-white">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-5 py-3.5 text-start font-bold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-[#F4F4F5]' : 'bg-white'}>
            {row.map((cell, j) => (
              <td key={j} className={`px-5 py-3.5 leading-relaxed text-slate-700 ${j === 0 ? 'font-semibold text-slate-950' : ''}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const CodeBlock: FC<{ code: string; language?: string }> = ({ code, language }) => (
  <div className="overflow-hidden rounded-[22px] bg-[#1E1E1F]">
    {language && <div className="px-5 pt-4 text-[11.5px] font-bold uppercase tracking-wider text-white/40">{language}</div>}
    <pre dir="ltr" className="overflow-x-auto px-5 py-4 text-[13px] leading-relaxed text-white/90">
      <code>{code}</code>
    </pre>
  </div>
);

export const ArticleFigure: FC<{ src: string; alt: string; caption?: string }> = ({ src, alt, caption }) => (
  <figure>
    <img src={src} alt={alt} loading="lazy" className="w-full rounded-[22px] object-cover" />
    {caption && <figcaption className="mt-3 text-center text-[13px] text-slate-500">{caption}</figcaption>}
  </figure>
);

export const ReferenceList: FC<{ title: string; items: { title: string; url: string }[] }> = ({ title, items }) => (
  <div className="rounded-[22px] bg-[#F4F4F5] p-6">
    <h2 className="text-[17px] font-black tracking-tight text-slate-950">{title}</h2>
    <ul className="mt-3 space-y-2">
      {items.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-950"
          >
            {r.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const CTACard: FC<{
  title: string;
  text: string;
  buttonText: string;
  to: string;
  onClick?: () => void;
}> = ({ title, text, buttonText, to, onClick }) => (
  <section className="mt-16 rounded-[28px] bg-[#1E1E1F] px-6 py-12 text-center text-white sm:mt-24 sm:rounded-[34px] sm:px-10 sm:py-16">
    <h2 className="mx-auto max-w-xl text-2xl font-black leading-tight tracking-tight sm:text-4xl">{title}</h2>
    <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-[16px]">{text}</p>
    <Link to={to} onClick={onClick} className={`${PRIMARY_BTN} mt-8`}>
      {buttonText}
    </Link>
  </section>
);

export const FeaturedProjectCard: FC<{
  label: string;
  title: string;
  desc: string;
  tags: string[];
  meta: string;
  cta: string;
  to: string;
}> = ({ label, title, desc, tags, meta, cta, to }) => (
  <div className="rounded-[26px] bg-[#1E1E1F] p-6 text-white sm:p-8">
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
      <div className="flex-1">
        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/80">{label}</span>
        <h3 className="mt-4 text-[19px] font-bold leading-snug tracking-tight">{title}</h3>
        <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-white/60">{desc}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-white/80">
          {tags.map((t) => (
            <span key={t} className="rounded-full bg-white/10 px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
        <span className="text-[12.5px] font-semibold text-white/70">{meta}</span>
        <Link
          to={to}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-slate-950 transition-colors hover:bg-slate-200"
        >
          {cta}
          <ArrowRight size={14} color="currentColor" />
        </Link>
      </div>
    </div>
  </div>
);

export const RelatedLinks: FC<{
  title: string;
  items: { title: string; path: string }[];
  onNavigate?: (path: string) => void;
}> = ({ title, items, onNavigate }) => (
  <div>
    <h2 className="text-[17px] font-black tracking-tight text-slate-950">{title}</h2>
    <div className="mt-4 flex flex-wrap gap-2.5">
      {items.map((s) => (
        <Link
          key={s.path + s.title}
          to={s.path}
          onClick={() => onNavigate?.(s.path)}
          className="rounded-full bg-[#F4F4F5] px-4 py-2 text-[14px] font-semibold text-slate-800 transition-colors hover:bg-[#EBEBED]"
        >
          {s.title}
        </Link>
      ))}
    </div>
  </div>
);
