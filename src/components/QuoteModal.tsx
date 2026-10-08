import { FC, useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Sms,
  Diamonds,
  DocumentText,
  Send2,
    CloseCircle,
  TickCircle,
} from 'iconsax-react';
import { useQuoteModal, type PlanType } from '../context/QuoteModalContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { trackEvent } from '../lib/analytics';

const SINGLE_VIDEO_EMOJI = '/emojis/single_video.png';
const PACKAGE_EMOJI = '/emojis/package.png';
const MEMO_EMOJI = '/emojis/memo.png';
const PARTY_POPPER_EMOJI =
  'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Activities/Party%20Popper.png';

export const QuoteModal: FC = () => {
  const { isOpen, closeModal, selectedPlan, setSelectedPlan } = useQuoteModal();
  const { lang, isRtl } = useLanguage();
  const t = translations[lang].quoteModal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
      setErrors({});
      // auto-focus first input after animation without shifting scroll position
      const timer = setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-expand description textarea height as text increases
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      const nextHeight = Math.min(Math.max(82, scrollH), 400);
      textareaRef.current.style.height = `${nextHeight}px`;
      textareaRef.current.style.overflowY = scrollH > 400 ? 'auto' : 'hidden';
    }
  }, [description, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

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

    trackEvent('quote_request', {
      plan: selectedPlan,
      name: name.trim(),
      email: email.trim(),
    });

    // Simulate reliable async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    closeModal();
    setTimeout(() => {
      setName('');
      setEmail('');
      setDescription('');
      setIsSubmitted(false);
      setErrors({});
    }, 300);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.12 }}
            className={`relative w-full max-w-[490px] bg-white rounded-[28px] p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-100 z-10 overflow-y-auto no-scrollbar my-auto max-h-[92vh] flex flex-col ${
              isRtl ? 'text-right' : 'text-left'
            }`}
          >
            {/* Top Close Button */}
            <button
              onClick={handleResetAndClose}
              className={`absolute top-5 ${
                isRtl ? 'left-5' : 'right-5'
              } text-slate-400 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-full transition-colors cursor-pointer z-20`}
              aria-label={t.closeButton}
            >
              <CloseCircle size={22} variant="Linear" color="currentColor" />
            </button>

            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 px-2 flex flex-col items-center text-center my-auto"
              >
                {/* 3D Animated Party Popper */}
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
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-[18px] text-[13px] text-slate-700 flex items-center justify-center gap-2">
                    <TickCircle size={18} variant="Bold" className="text-emerald-500 shrink-0" />
                    <span>
                      {selectedPlan.toUpperCase()} — {name}
                    </span>
                  </div>

                  <button
                    onClick={handleResetAndClose}
                    className="w-full h-[46px] rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-[14px] transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    {t.closeButton}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Input Form Screen */
              <div className="w-full">
                {/* Header - Centered */}
                <div className="mb-6 text-center">
                  <h3 className="text-2xl sm:text-[25px] font-black text-slate-950 tracking-tight leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-slate-500 text-[13.5px] mt-1.5 leading-snug max-w-sm mx-auto">
                    {t.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-700 mb-1.5">
                      <User size={15} variant="Linear" color="currentColor" className="text-slate-700 shrink-0" />
                      <span>{t.nameLabel}</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={t.namePlaceholder}
                      className={`w-full h-[44px] px-3.5 rounded-[14px] bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white text-slate-900 text-[14px] border transition-all outline-none ${
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
                      className={`w-full h-[44px] px-3.5 rounded-[14px] bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white text-slate-900 text-[14px] border transition-all outline-none ${
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

                    <div className="grid grid-cols-3 gap-2.5 pt-1.5">
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
                                : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            {/* Popular Mini Tag */}
                            {p.popular && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#5566FF] text-white text-[9.5px] font-bold shadow-xs whitespace-nowrap">
                                {lang === 'fa' ? 'محبوب' : 'Popular'}
                              </span>
                            )}

                            {/* 3D Animated Plan Emoji */}
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
                      style={{ minHeight: '82px', maxHeight: '400px' }}
                      className="w-full p-3.5 rounded-[16px] bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white text-slate-900 text-[13.5px] border border-slate-200/90 focus:border-[#5566FF] focus:ring-3 focus:ring-[#5566FF]/10 outline-none resize-none leading-relaxed transition-[border-color,background-color,box-shadow] duration-150 overflow-hidden"
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-1">
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
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
