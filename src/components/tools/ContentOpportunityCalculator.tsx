import { useState, useId, type FC } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { analytics } from '../../lib/analytics';
import { playBenchoSound } from '../../content/soundData';

export interface CalculatorState {
  format: 'podcast' | 'interview' | 'talking-head' | 'webinar';
  durationMinutes: number;
  cadenceWeekly: number; // target posts per week
}

export const ContentOpportunityCalculator: FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, isRtl } = useLanguage();
  const durationSliderId = useId();

  const [state, setState] = useState<CalculatorState>({
    format: 'podcast',
    durationMinutes: 45,
    cadenceWeekly: 4,
  });

  const formats = [
    {
      id: 'podcast' as const,
      labelFa: 'پادکست و گفتگو',
      labelEn: 'Podcast & Interview',
      factor: 0.22, // ~1 clip per 4-5 mins
    },
    {
      id: 'talking-head' as const,
      labelFa: 'صحبت مستقیم (Talking Head)',
      labelEn: 'Solo Talking-Head',
      factor: 0.35, // dense value
    },
    {
      id: 'interview' as const,
      labelFa: 'مصاحبه و لایو دونفره',
      labelEn: '2-Person Live Q&A',
      factor: 0.25,
    },
    {
      id: 'webinar' as const,
      labelFa: 'وبینار و ورکشاپ',
      labelEn: 'Webinar & Keynote',
      factor: 0.18,
    },
  ];

  const currentFormat = formats.find((f) => f.id === state.format) || formats[0];

  // Calculations
  const rawClipsPerEpisode = Math.max(2, Math.round(state.durationMinutes * currentFormat.factor));
  const monthlyEpisodes = 4; // assuming 1 episode weekly
  const monthlyTotalClips = rawClipsPerEpisode * monthlyEpisodes;
  const coverageDaysWeekly = Math.min(7, Math.round((monthlyTotalClips / 4)));
  const savedHoursPerMonth = Math.round(monthlyTotalClips * 2.5); // avg 2.5h editing per short saved

  const handleFormatChange = (newFormat: CalculatorState['format']) => {
    setState((prev) => ({ ...prev, format: newFormat }));
    playBenchoSound('select');
  };

  const handleDurationChange = (minutes: number) => {
    setState((prev) => ({ ...prev, durationMinutes: minutes }));
  };

  const handleCadenceChange = (cadence: number) => {
    setState((prev) => ({ ...prev, cadenceWeekly: cadence }));
    playBenchoSound('select');
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`rounded-3xl border border-slate-200/90 bg-linear-to-b from-white via-slate-50/50 to-slate-100/60 p-6 sm:p-8 lg:p-10 shadow-xs ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        {/* Left / Input Column */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
              <span>{lang === 'fa' ? 'ابزار تعاملی محاسبه بازآفرینی' : 'Repurposing ROI Calculator'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {lang === 'fa'
                ? 'محاسبه پتانسیل تبدیل محتوای طولانی به شورتس و ریلز'
                : 'Calculate Your Long-Form to Short-Form Yield'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'fa'
                ? 'مدت زمان پادکست یا فوتیج خام خود را مشخص کنید تا تعداد ریلزهای باکیفیت و نرخ پوشش ماهانه محاسبه شود.'
                : 'Input your raw footage length to estimate high-retention vertical clips and monthly social reach.'}
            </p>
          </div>

          {/* Format Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              {lang === 'fa' ? 'فرمت محتوای خام' : 'Content Format'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {formats.map((f) => {
                const isActive = state.format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleFormatChange(f.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-start transition-all cursor-pointer border ${
                      isActive
                        ? 'border-sky-500 bg-sky-50/80 text-sky-950 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {lang === 'fa' ? f.labelFa : f.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={durationSliderId} className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {lang === 'fa' ? 'طول هر قسمت محتوا' : 'Raw Duration Per Episode'}
              </label>
              <span className="font-mono text-sm font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                {state.durationMinutes} {lang === 'fa' ? 'دقیقه' : 'min'}
              </span>
            </div>
            <input
              id={durationSliderId}
              type="range"
              min={10}
              max={120}
              step={5}
              value={state.durationMinutes}
              onChange={(e) => handleDurationChange(Number(e.target.value))}
              aria-label={lang === 'fa' ? 'طول هر قسمت محتوا بر حسب دقیقه' : 'Raw Duration Per Episode in minutes'}
              className="w-full accent-sky-500 bg-slate-200 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10.5px] font-mono text-slate-500 mt-1">
              <span>10 {lang === 'fa' ? 'دقیقه' : 'min'}</span>
              <span>45 {lang === 'fa' ? 'دقیقه' : 'min'}</span>
              <span>120 {lang === 'fa' ? 'دقیقه' : 'min'}</span>
            </div>
          </div>

          {/* Cadence Target */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {lang === 'fa' ? 'هدف انتشار در هفته' : 'Target Weekly Publishing Cadence'}
            </label>
            <div className="flex gap-2">
              {[2, 4, 7].map((cad) => (
                <button
                  key={cad}
                  type="button"
                  onClick={() => handleCadenceChange(cad)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    state.cadenceWeekly === cad
                      ? 'border-slate-950 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {cad} {lang === 'fa' ? 'ویدیو / هفته' : 'clips / wk'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right / Results Card */}
        <div className="w-full lg:w-88 rounded-2xl bg-slate-950 text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block mb-1">
              {lang === 'fa' ? 'پتانسیل استخراج و بازدهی' : 'Estimated Output & Yield'}
            </span>
            <h4 className="text-lg font-black text-white mb-6">
              {lang === 'fa' ? 'تولید محتوای ماهانه شما' : 'Your Monthly Content Engine'}
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-300">
                  {lang === 'fa' ? 'ریلز و شورتس از هر قسمت' : 'Clips Per Episode'}
                </span>
                <span className="text-xl font-mono font-black text-sky-400">
                  ~{rawClipsPerEpisode} <span className="text-xs font-normal text-slate-400">{lang === 'fa' ? 'ویدیو' : 'clips'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-300">
                  {lang === 'fa' ? 'مجموع خروجی ماهانه (۴ قسمت)' : 'Monthly Total Output (4 eps)'}
                </span>
                <span className="text-xl font-mono font-black text-emerald-400">
                  {monthlyTotalClips} <span className="text-xs font-normal text-slate-400">{lang === 'fa' ? 'ریلز' : 'reels'}</span>
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-300">
                  {lang === 'fa' ? 'پوشش روزهای هفته' : 'Weekly Feed Coverage'}
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {coverageDaysWeekly} / 7 {lang === 'fa' ? 'روز در هفته' : 'days/wk'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-1">
                <span className="text-xs text-slate-300">
                  {lang === 'fa' ? 'صرفه‌جویی تخمینی در زمان شما' : 'Estimated Hours Saved'}
                </span>
                <span className="text-sm font-mono font-bold text-sky-300">
                  ~{savedHoursPerMonth} {lang === 'fa' ? 'ساعت در ماه' : 'hrs/mo'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80">
            <Link
              to="/contact?service=content-repurposing"
              data-analytics="primary-cta"
              data-analytics-name="claim_calculator_quote"
              data-analytics-location="calculator"
              onClick={() => {
                analytics.trackPrimaryCta({
                  cta_name: 'claim_calculator_quote',
                  cta_location: 'calculator',
                  page_path: window.location.pathname,
                });
                analytics.trackQuoteRequest({
                  service_interest: 'content-repurposing',
                  estimated_clips: monthlyTotalClips,
                  inquiry_source: 'opportunity_calculator',
                  page_path: window.location.pathname,
                });
                playBenchoSound('open');
              }}
              className="w-full block text-center bg-[#00A7F5] hover:bg-[#0096DC] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {lang === 'fa' ? 'دریافت برآورد هزینه برای این حجم' : 'Get a Custom Repurposing Quote'}
            </Link>
            <p className="text-[11px] text-slate-400 text-center mt-2.5">
              {lang === 'fa'
                ? 'تحویل ۴۸ ساعته با فرمت آماده اینستاگرام و یوتیوب'
                : '48h turnaround, 4K render, fully ready to publish'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
