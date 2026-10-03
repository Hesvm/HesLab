import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { useLanguage } from '../context/LanguageContext';

export const NotFoundPage: FC = () => {
  const { lang, isRtl } = useLanguage();

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-slate-900 pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <SEOHead
        title={lang === 'fa' ? 'صفحه مورد نظر یافت نشد (خطای ۴۰۴)' : '404 - Page Not Found'}
        description={lang === 'fa' ? 'صفحه مورد نظر در وب‌سایت حس‌لب وجود ندارد.' : 'The page you are looking for does not exist on HesLab.'}
        noindex={true}
        path="/404"
      />

      <div className="max-w-md mx-auto">
        <span className="font-mono text-5xl sm:text-6xl font-black text-slate-200 block mb-4">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 mb-3 tracking-tight">
          {lang === 'fa' ? 'این صفحه در حس‌لب وجود ندارد' : 'Lost in the Edit Timeline?'}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          {lang === 'fa'
            ? 'آدرسی که وارد کرده‌اید اشتباه است یا ممکن است این محتوا جابه‌جا شده باشد. از مسیرهای زیر می‌توانید به بخش‌های اصلی سایت دسترسی پیدا کنید.'
            : 'The URL might have changed or this cut was moved. Explore our core sections below:'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            {lang === 'fa' ? 'صفحه اصلی' : 'Home'}
          </Link>
          <Link
            to="/work"
            className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            {lang === 'fa' ? 'نمونه‌کارها' : 'Work'}
          </Link>
          <Link
            to="/services"
            className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            {lang === 'fa' ? 'خدمات' : 'Services'}
          </Link>
          <Link
            to="/resources"
            className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-900 text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            {lang === 'fa' ? 'منابع و مقالات' : 'Resources'}
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-[#00A7F5] text-white text-xs font-semibold hover:bg-[#0096DC] transition-colors"
          >
            {lang === 'fa' ? 'تماس' : 'Contact'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
