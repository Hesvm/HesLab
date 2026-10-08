import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Sms, Copy, TickCircle } from 'iconsax-react';

export const KeepInTouch: FC = () => {
  const { lang } = useLanguage();
  const isFa = lang === 'fa';
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // 2x2 Grid order:
  // Row 1: YouTube, Instagram
  // Row 2: X, Email
  const socials = [
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@heslab',
      url: 'https://youtube.com/@heslab',
      gradient: 'bg-[#D4001F]',
      border: 'border-transparent',
      hoverText: '',
      desc: isFa ? 'ادیت‌ها، آموزش‌ها و پروسهٔ کار' : 'Edits, tutorials and the process behind them',
      icon: (
        <div className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center shadow-xs shrink-0">
          <svg className="w-6 h-6 text-[#E60000] fill-current" viewBox="0 0 24 24">
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
      border: 'border-transparent',
      hoverText: '',
      desc: isFa ? 'استایل خودمون، ویدیوهای شیرشده و ویو' : 'Our style in action: videos shared for views',
      icon: (
        <img
          src="/stats-icons/badge-instagram-clean.svg"
          alt="Instagram"
          className="w-11 h-11 object-contain shrink-0 pointer-events-none select-none drop-shadow-xs"
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
      border: 'border-transparent',
      hoverText: '',
      desc: isFa ? 'اخبار و آپدیت‌های کارم' : 'News and updates on my work',
      icon: (
        <div className="w-11 h-11 rounded-[14px] bg-black flex items-center justify-center shadow-xs shrink-0 border border-white/10">
          <svg className="w-[19px] h-[19px] text-white fill-current" viewBox="0 0 24 24">
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
      border: 'border-transparent',
      hoverText: 'group-hover:text-[#5566FF]',
      desc: isFa ? 'ارتباط مستقیم و ارسال پروپوزال' : 'Direct inquiries and project briefs',
      icon: (
        <div className="w-11 h-11 rounded-[14px] bg-[#5566FF] flex items-center justify-center shadow-xs shrink-0">
          <Sms size={22} variant="Bold" color="#ffffff" />
        </div>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8 sm:mb-10"
      >
        <h2 className="text-3xl sm:text-4xl md:text-[44px] font-black tracking-tight text-slate-950 leading-tight">
          {isFa ? 'در ارتباط باشیم.' : "Let's keep in touch."}
        </h2>
      </motion.div>

      {/* 2x2 Square Grid: [YT, IG] / [X, Email] in Light Mode */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-3.5 sm:gap-5 max-w-[420px] sm:max-w-[460px] mx-auto"
      >
        {socials.map((social) => {
          if (social.id === 'email') {
            return (
              <button
                key={social.id}
                type="button"
                onClick={handleCopyEmail}
                title={isFa ? 'برای کپی آدرس ایمیل کلیک کنید' : 'Click to copy email address'}
                className={`relative aspect-square ${social.gradient} border ${social.border} rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.025] group cursor-pointer select-none w-full`}
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
                <div className="mb-3">
                  {social.icon}
                </div>

                {/* Email Address */}
                <h4
                  dir="ltr"
                  className="text-slate-950 font-bold text-sm sm:text-base tracking-tight text-center select-all group-hover:text-[#5566FF] transition-colors mb-1.5 leading-tight"
                >
                  heslabwork<span className="block sm:inline text-slate-950 group-hover:text-[#5566FF]">@gmail.com</span>
                </h4>

                {/* Description */}
                <p className="text-slate-500 text-[10.5px] sm:text-[11.5px] leading-tight font-normal text-center max-w-[160px] sm:max-w-[180px] min-h-[2.5em]">
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
              className={`aspect-square ${social.gradient} border ${social.border} rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.025] group cursor-pointer select-none w-full`}
            >
              {/* Icon */}
              <div className="mb-3">
                {social.icon}
              </div>

              {/* Handle */}
              <h4
                dir="ltr"
                className={`text-white font-bold text-sm sm:text-base tracking-tight text-center ${social.hoverText} transition-colors mb-1.5`}
              >
                {social.handle}
              </h4>

              {/* Description */}
              <p className="text-white/65 text-[10.5px] sm:text-[11.5px] leading-tight font-normal line-clamp-2 text-center max-w-[160px] sm:max-w-[180px] min-h-[2.5em]">
                {social.desc}
              </p>
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};
