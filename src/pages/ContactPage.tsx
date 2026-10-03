import { useState, type FC, type FormEvent } from 'react';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import { SITE_CONFIG } from '../config/site';
import { playBenchoSound } from '../content/soundData';
import { toast } from '../lib/toast';
import { Sms, TickCircle } from 'iconsax-react';

export const ContactPage: FC = () => {
  const { lang, isRtl } = useLanguage();

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [projectType, setProjectType] = useState('short-form');
  const [videoCount, setVideoCount] = useState('4-12');
  const [footageLink, setFootageLink] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleStartTyping = () => {
    if (!isStarted) {
      setIsStarted(true);
      trackEvent('contact_start', { path: '/contact' });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playBenchoSound('success');

    trackEvent('contact_submit', {
      projectType,
      videoCount,
      hasFootageLink: Boolean(footageLink.trim()),
    });

    trackEvent('quote_request', {
      projectType,
      videoCount,
    });

    setSubmitted(true);
    toast(lang === 'fa' ? 'درخواست شما با موفقیت ثبت شد' : 'Your request was successfully submitted');
  };

  const handleEmailClick = () => {
    trackEvent('outbound_email_click', { email: SITE_CONFIG.email });
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-20 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'دریافت برآورد هزینه و ثبت سفارش تدوین ویدیو' : 'Get a Project Quote & Contact | HesLab'}
        description={
          lang === 'fa'
            ? 'ارسال اطلاعات پروژه، فوتیج‌های خام یا درخواست پکیج ماهانه تدوین ریلز و شورتس به استودیو حس‌لب.'
            : 'Request a project quote, discuss monthly video editing retainers, or send raw footage to HesLab.'
        }
        path="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Breadcrumbs
          items={[
            { name: lang === 'fa' ? 'صفحه اصلی' : 'Home', path: '/' },
            { name: lang === 'fa' ? 'تماس و ثبت پروژه' : 'Contact', path: '/contact' },
          ]}
        />

        <header className="pt-4 pb-8 mb-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-3 border border-sky-200">
            <span>{lang === 'fa' ? 'پاسخ‌گویی در کمتر از ۱۲ ساعت' : 'Fast Response Within 12 Hours'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            {lang === 'fa' ? 'شروع همکاری و برآورد هزینه' : 'Start a Project with HesLab'}
          </h1>

          <p className="text-[14.5px] sm:text-base text-slate-600 leading-relaxed">
            {lang === 'fa'
              ? 'اطلاعات ویدیوی خود یا لینک درایو فوتیج‌ها را وارد کنید تا بهترین پیشنهاد و نمونه را برایتان ارسال کنیم.'
              : 'Share your channel goals, footage link, or package preference to receive a tailored proposal.'}
          </p>
        </header>

        {submitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
              <TickCircle size={36} color="currentColor" variant="Bold" />
            </div>

            <h2 className="text-2xl font-black text-slate-950 mb-2">
              {lang === 'fa' ? 'درخواست شما دریافت شد!' : 'Request Received!'}
            </h2>

            <p className="text-[14px] text-slate-600 max-w-md leading-relaxed mb-6">
              {lang === 'fa'
                ? `از اعتماد شما متشکریم، ${name || 'دوست عزیز'}. جزییات پروژه بررسی شده و در کمتر از ۱۲ ساعت از طریق ایمیل یا پیام‌رسان با شما تماس خواهیم گرفت.`
                : `Thank you for reaching out. We are reviewing your submission and will respond via email within 12 hours.`}
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setContactInfo('');
                setMessage('');
                setFootageLink('');
              }}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline"
            >
              {lang === 'fa' ? 'ارسال یک درخواست دیگر' : 'Submit Another Inquiry'}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-xs">
            <form onSubmit={handleSubmit} onFocus={handleStartTyping} className="flex flex-col gap-6">
              {/* Row 1: Name and Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {lang === 'fa' ? 'نام و نام‌خانوادگی / نام برند' : 'Your Name / Brand Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'fa' ? 'مثال: علی رضایی' : 'e.g. Alex Morgan'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:outline-hidden text-sm bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {lang === 'fa' ? 'ایمیل یا آیدی تلگرام / اینستاگرام' : 'Email or Social Handle'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={lang === 'fa' ? 'email@example.com یا @username' : 'you@example.com or @handle'}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:outline-hidden text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Row 2: Service Type */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'fa' ? 'نوع سرویس مد نظر شما چیست؟' : 'Primary Service Needed'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'short-form', labelFa: 'تدوین شورتس و ریلز', labelEn: 'Short-Form Editing' },
                    { id: 'motion-design', labelFa: 'موشن دیزاین اختصاصی', labelEn: 'Custom Motion' },
                    { id: 'ongoing-retainer', labelFa: 'پکیج ماهانه محتوا', labelEn: 'Monthly Retainer' },
                  ].map((srv) => (
                    <label
                      key={srv.id}
                      className={`p-3.5 rounded-xl border cursor-pointer text-xs font-semibold flex items-center justify-between transition-all ${
                        projectType === srv.id
                          ? 'border-slate-950 bg-slate-950 text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={srv.id}
                        checked={projectType === srv.id}
                        onChange={() => setProjectType(srv.id)}
                        className="sr-only"
                      />
                      <span>{lang === 'fa' ? srv.labelFa : srv.labelEn}</span>
                      {projectType === srv.id && <span className="text-sky-400">●</span>}
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 3: Video Volume */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'fa' ? 'حجم حدودی ویدیوهای مد نظر' : 'Approximate Video Volume'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'single', labelFa: '۱ تا ۳ ویدیو (تستی)', labelEn: '1-3 Videos (Ad-hoc)' },
                    { id: '4-12', labelFa: '۴ تا ۱۲ ویدیو در ماه', labelEn: '4-12 / month' },
                    { id: '20+', labelFa: '۲۰+ ویدیو در ماه', labelEn: '20+ / month' },
                  ].map((vol) => (
                    <label
                      key={vol.id}
                      className={`p-3 rounded-xl border cursor-pointer text-center text-xs font-semibold transition-all ${
                        videoCount === vol.id
                          ? 'border-sky-600 bg-sky-50 text-sky-950 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="videoCount"
                        value={vol.id}
                        checked={videoCount === vol.id}
                        onChange={() => setVideoCount(vol.id)}
                        className="sr-only"
                      />
                      <span>{lang === 'fa' ? vol.labelFa : vol.labelEn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 4: Footage link */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  {lang === 'fa' ? 'لینک پوشه فوتیج خام (اختیاری)' : 'Raw Footage Link (Optional)'}
                </label>
                <p className="text-[11.5px] text-slate-400 mb-2">
                  {lang === 'fa' ? 'لینک گوگل درایو، دراپ‌باکس یا نمونه ویدیو برای بررسی اولیه' : 'Google Drive, Dropbox, or reference link'}
                </p>
                <input
                  type="url"
                  value={footageLink}
                  onChange={(e) => setFootageLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:outline-hidden text-sm bg-slate-50/50 font-mono text-xs"
                />
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {lang === 'fa' ? 'توضیحات یا نیازمندی‌های خاص پروژه' : 'Project Details & Goals'}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'fa'
                      ? 'درباره سبک مد نظر، زبان، لحن یا هر جزییاتی که برایتان مهم است بنویسید...'
                      : 'Tell us about your target audience, pacing style, turnaround expectations...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:outline-hidden text-sm bg-slate-50/50 leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#00A7F5] hover:bg-[#0096DC] text-white text-sm font-bold py-3.5 rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
              >
                {lang === 'fa' ? 'ارسال درخواست برآورد هزینه' : 'Submit Quote Request'}
              </button>
            </form>
          </div>
        )}

        {/* Direct Contact Option */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <span className="text-xs font-bold text-slate-500 block mb-0.5">
              {lang === 'fa' ? 'ترجیح می‌دهید مستقیماً ایمیل بزنید؟' : 'Prefer direct email?'}
            </span>
            <span className="text-sm font-semibold text-slate-900 font-mono">{SITE_CONFIG.email}</span>
          </div>

          <a
            href={`mailto:${SITE_CONFIG.email}`}
            onClick={handleEmailClick}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-sky-600 bg-white border border-slate-200 px-4 py-2 rounded-xl transition-colors"
          >
            <Sms size={16} />
            <span>{lang === 'fa' ? 'ارسال ایمیل مستقیم' : 'Open Email'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
