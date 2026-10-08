import { useState, type FC, type FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Sms,
  Diamonds,
  DocumentText,
  Send2,
  TickCircle,
  Copy,
} from 'iconsax-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { trackEvent } from '../lib/analytics';
import { playBenchoSound } from '../content/soundData';
import { toast } from '../lib/toast';
import type { PlanType } from '../context/QuoteModalContext';

const SINGLE_VIDEO_EMOJI = '/emojis/single_video.png';
const PACKAGE_EMOJI = '/emojis/package.png';
const MEMO_EMOJI = '/emojis/memo.png';
const PARTY_POPPER_EMOJI =
  'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Activities/Party%20Popper.png';

export const ContactPage: FC = () => {
  const { lang, isRtl } = useLanguage();
  const isFa = lang === 'fa';
  const t = translations[lang].quoteModal;

  // Contact cards state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form states matching QuoteModal
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand description textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      const nextHeight = Math.min(Math.max(90, scrollH), 400);
      textareaRef.current.style.height = `${nextHeight}px`;
      textareaRef.current.style.overflowY = scrollH > 400 ? 'auto' : 'hidden';
    }
  }, [description]);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText('heslabwork@gmail.com');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = 'heslabwork@gmail.com';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedEmail(true);
      toast(isFa ? 'آدرس ایمیل کپی شد' : 'Email address copied');
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = t.nameError;
    }

    const trimmedEmail = email.trim();
    const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const isTelegramFormat = /^@?[a-zA-Z0-9_]{4,32}$/.test(trimmedEmail);

    if (!trimmedEmail || (!isEmailFormat && !isTelegramFormat)) {
      newErrors.email = t.emailError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    playBenchoSound('success');

    trackEvent('quote_request', {
      plan: selectedPlan,
      name: name.trim(),
      email: email.trim(),
      inquiry_source: 'contact_page',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast(isFa ? 'درخواست شما با موفقیت ثبت شد' : 'Your request was successfully submitted');
    }, 700);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setDescription('');
    setSelectedPlan('standard');
    setIsSubmitted(false);
    setErrors({});
  };

  const plansConfig: {
    id: PlanType;
    name: string;
    price: string;
    videos: string;
    emoji: string;
    popular?: boolean;
  }[] = [
    {
      id: 'starter',
      name: t.plans.starter.name,
      price: t.plans.starter.price,
      videos: t.plans.starter.videos,
      emoji: SINGLE_VIDEO_EMOJI,
    },
    {
      id: 'standard',
      name: t.plans.standard.name,
      price: t.plans.standard.price,
      videos: t.plans.standard.videos,
      emoji: PACKAGE_EMOJI,
      popular: true,
    },
    {
      id: 'custom',
      name: t.plans.custom.name,
      price: t.plans.custom.price,
      videos: t.plans.custom.videos,
      emoji: MEMO_EMOJI,
    },
  ];

  const socials = [
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@heslab',
      url: 'https://youtube.com/@heslab',
      gradient: 'bg-[#D4001F]',
      desc: isFa ? 'ادیت‌ها، آموزش‌ها و پروسهٔ کار' : 'Edits, tutorials and process',
      icon: (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-white flex items-center justify-center shadow-xs shrink-0">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E60000] fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@heslab',
      url: 'https://instagram.com/heslab',
      gradient: 'bg-[#430030]',
      desc: isFa ? 'استایل خودمون و ویدیوهای شیرشده' : 'Our style and shared reels',
      icon: (
        <img
          src="/stats-icons/badge-instagram-clean.svg"
          alt="Instagram"
          className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0 pointer-events-none select-none drop-shadow-xs"
          draggable={false}
        />
      ),
    },
    {
      id: 'twitter',
      name: 'X',
      handle: '@heslab',
      url: 'https://x.com/heslab',
      gradient: 'bg-[#1E1E1F]',
      desc: isFa ? 'اخبار و آپدیت‌های کارم' : 'News and updates on my work',
      icon: (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-black flex items-center justify-center shadow-xs shrink-0 border border-white/10">
          <svg className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] text-white fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      ),
    },
    {
      id: 'email',
      name: 'Email',
      handle: 'heslabwork@gmail.com',
      gradient: 'bg-[#F4F4F5]',
      desc: isFa ? 'ارتباط مستقیم و ارسال پروپوزال' : 'Direct inquiries and project briefs',
      icon: (
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[14px] bg-[#5566FF] flex items-center justify-center shadow-xs shrink-0">
          <Sms size={22} variant="Bold" color="#ffffff" />
        </div>
      ),
    },
  ];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-28 pb-24 ${
        isFa ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={isFa ? 'تماس با حس‌لب | ثبت سفارش تدوین ویدیو' : 'Contact HesLab | Start a Video Project'}
        description={
          isFa
            ? 'ارسال پیام و ثبت سفارش تدوین ریلز و شورتس به استودیو حس‌لب یا ارتباط از طریق شبکه‌های اجتماعی.'
            : 'Get in touch with HesLab. Send a message, discuss short-form video editing, or connect on social media.'
        }
        path="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* ===================================================== */}
        {/* 0. PAGE TITLE                                         */}
        {/* ===================================================== */}
        <header className="mb-8 sm:mb-11 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {isFa ? 'تماس با ما' : 'Contact Us'}
          </h1>
        </header>

        {/* ===================================================== */}
        {/* 1. TOP SECTION: 4 CONTACT / SOCIAL CARDS              */}
        {/* ===================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full">
          {socials.map((social) => {
            if (social.id === 'email') {
              return (
                <button
                  key={social.id}
                  type="button"
                  onClick={handleCopyEmail}
                  title={isFa ? 'برای کپی آدرس ایمیل کلیک کنید' : 'Click to copy email address'}
                  className={`relative aspect-square ${social.gradient} rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.025] group cursor-pointer select-none w-full border border-slate-200/60 shadow-xs`}
                >
                  {/* Copy indicator */}
                  <div className="absolute top-3.5 right-3.5">
                    {copiedEmail ? (
                      <TickCircle size={16} variant="Bold" className="text-emerald-500 animate-in zoom-in-75 duration-200" />
                    ) : (
                      <Copy size={14} variant="Linear" className="text-slate-400 group-hover:text-[#5566FF] transition-colors" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-2.5 sm:mb-3">{social.icon}</div>

                  {/* Email Address */}
                  <h4
                    dir="ltr"
                    className="text-slate-950 font-bold text-xs sm:text-[13.5px] tracking-tight text-center select-all group-hover:text-[#5566FF] transition-colors mb-1 leading-tight break-all sm:break-normal"
                  >
                    heslabwork<span className="block sm:inline text-slate-950 group-hover:text-[#5566FF]">@gmail.com</span>
                  </h4>

                  {/* Description */}
                  <p className="text-slate-500 text-[10px] sm:text-[11px] leading-tight font-normal text-center max-w-[150px] min-h-[2.4em]">
                    {copiedEmail
                      ? (isFa ? 'آدرس در حافظه کپی شد ✓' : 'Copied to clipboard ✓')
                      : social.desc}
                  </p>
                </button>
              );
            }

            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`aspect-square ${social.gradient} rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.025] group cursor-pointer select-none w-full shadow-xs`}
              >
                {/* Icon */}
                <div className="mb-2.5 sm:mb-3">{social.icon}</div>

                {/* Handle */}
                <h4
                  dir="ltr"
                  className="text-white font-bold text-sm sm:text-base tracking-tight text-center transition-colors mb-1 leading-tight"
                >
                  {social.handle}
                </h4>

                {/* Description */}
                <p className="text-white/65 text-[10px] sm:text-[11px] leading-tight font-normal line-clamp-2 text-center max-w-[150px] min-h-[2.4em]">
                  {social.desc}
                </p>
              </a>
            );
          })}
        </div>

        {/* ===================================================== */}
        {/* 2. BOTTOM SECTION: SEND MESSAGE FORM (MODAL STYLE)   */}
        {/* ===================================================== */}
        <div className="mt-8 sm:mt-12 w-full rounded-[30px] sm:rounded-[34px] bg-[#F8F9FA] border border-slate-200/90 p-6 sm:p-9 shadow-xs">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-8 px-2 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-4 select-none pointer-events-none flex items-center justify-center">
                  <img
                    src={PARTY_POPPER_EMOJI}
                    alt="Celebration"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                <h3 className="text-2xl font-black text-slate-950 tracking-tight mb-2">
                  {t.successTitle}
                </h3>

                <p className="text-slate-600 text-[14px] leading-relaxed max-w-sm mb-7">
                  {t.successDesc}
                </p>

                <div className="w-full max-w-xs space-y-3">
                  <div className="p-3.5 bg-white border border-slate-200/90 rounded-[18px] text-[13px] text-slate-700 flex items-center justify-center gap-2 shadow-2xs">
                    <TickCircle size={18} variant="Bold" className="text-emerald-500 shrink-0" />
                    <span>
                      {selectedPlan.toUpperCase()} — {name}
                    </span>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="w-full h-[46px] rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-[14px] transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    {isFa ? 'ارسال یک پیام دیگر' : 'Send Another Message'}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Form Screen */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="text-2xl sm:text-[26px] font-black text-slate-950 tracking-tight leading-tight">
                    {isFa ? 'یا پیام بگذارید' : "Or Let's talk"}
                  </h2>
                  <p className="text-slate-500 text-[13.5px] mt-1.5 leading-snug max-w-sm mx-auto">
                    {t.subtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-700 mb-1.5">
                      <User size={15} variant="Linear" color="currentColor" className="text-slate-700 shrink-0" />
                      <span>{t.nameLabel}</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={t.namePlaceholder}
                      className={`w-full h-[44px] px-3.5 rounded-[14px] bg-white hover:bg-slate-50 focus:bg-white text-slate-900 text-[14px] border transition-all outline-none ${
                        errors.name
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-200/90 focus:border-[#5566FF] focus:ring-3 focus:ring-[#5566FF]/10'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-[11.5px] mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Email / Contact Input */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-700 mb-1.5">
                      <Sms size={15} variant="Linear" color="currentColor" className="text-slate-700 shrink-0" />
                      <span>{t.emailLabel}</span>
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder={t.emailPlaceholder}
                      className={`w-full h-[44px] px-3.5 rounded-[14px] bg-white hover:bg-slate-50 focus:bg-white text-slate-900 text-[14px] border transition-all outline-none ${
                        errors.email
                          ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                          : 'border-slate-200/90 focus:border-[#5566FF] focus:ring-3 focus:ring-[#5566FF]/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-[11.5px] mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Choice Plan Selection */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-700 mb-2">
                      <Diamonds size={15} variant="Linear" color="currentColor" className="text-slate-700 shrink-0" />
                      <span>{t.planLabel}</span>
                    </label>

                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      {plansConfig.map((p) => {
                        const isSelected = selectedPlan === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedPlan(p.id)}
                            className={`relative p-2.5 sm:p-3 rounded-[20px] border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1.5 sm:gap-2 aspect-square ${
                              isSelected
                                ? 'border-[#5566FF] bg-[#5566FF]/5 shadow-[0_0_0_2px_#5566FF,0_4px_16px_rgba(85,102,255,0.16)]'
                                : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                            }`}
                          >
                            {/* Popular Mini Tag */}
                            {p.popular && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#5566FF] text-white text-[9.5px] font-bold shadow-xs whitespace-nowrap">
                                {isFa ? 'محبوب' : 'Popular'}
                              </span>
                            )}

                            {/* 3D Plan Emoji */}
                            <img
                              src={p.emoji}
                              alt={p.name}
                              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs pointer-events-none select-none"
                            />

                            <div>
                              <div className="text-[13px] sm:text-[13.5px] font-bold text-slate-950 leading-tight">
                                {p.name}
                              </div>
                              {p.id !== 'custom' && (
                                <div className="text-[11.5px] sm:text-[12px] font-semibold text-slate-800 mt-0.5">
                                  {p.price}
                                </div>
                              )}
                              <div className="text-[10px] sm:text-[10.5px] font-medium text-slate-400 mt-0.5">
                                {p.videos}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description / Brief Textarea */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-700 mb-1.5">
                      <DocumentText size={15} variant="Linear" color="currentColor" className="text-slate-700 shrink-0" />
                      <span>{t.descLabel}</span>
                    </label>
                    <textarea
                      ref={textareaRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.descPlaceholder}
                      style={{ minHeight: '90px', maxHeight: '400px' }}
                      className="w-full p-3.5 rounded-[16px] bg-white hover:bg-slate-50 focus:bg-white text-slate-900 text-[13.5px] border border-slate-200/90 focus:border-[#5566FF] focus:ring-3 focus:ring-[#5566FF]/10 outline-none resize-none leading-relaxed transition-[border-color,background-color,box-shadow] duration-150 overflow-hidden"
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[48px] rounded-full bg-slate-950 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-[14.5px] flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t.sendingButton}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.sendButton}</span>
                          <Send2 size={16} variant="Linear" className={isRtl ? 'rotate-180' : ''} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
