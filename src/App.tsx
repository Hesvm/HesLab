import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from './components/Toaster';
import { ScrollToTop } from './components/ScrollToTop';
import { PostHogPageviewTracker } from './components/analytics/PostHogPageviewTracker';

import { HomePage } from './pages/HomePage';

const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ServicesIndexPage = lazy(() => import('./pages/ServicesIndexPage'));
const ServicePillarPage = lazy(() => import('./pages/ServicePillarPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ResourceDetailPage = lazy(() => import('./pages/ResourceDetailPage'));
const BlogPostRoute = lazy(() => import('./pages/BlogPostRoute'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { QuoteModalProvider } from './context/QuoteModalContext';
import { QuoteModal } from './components/QuoteModal';

const AppShell: FC = () => {
  const { lang, isRtl } = useLanguage();
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '/fa' || location.pathname === '/fa/';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen bg-white text-slate-900 overflow-x-clip selection:bg-slate-900 selection:text-white ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <ScrollToTop />
      <PostHogPageviewTracker />
      <Navbar />

      {isHome ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fa" element={<HomePage />} />
        </Routes>
      ) : (
        <div className="relative w-full bg-[#000000]">
          <div className="w-full bg-white rounded-b-[22px] sm:rounded-b-[28px] md:rounded-b-[34px] overflow-x-clip">
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <Routes>
                {/* English Standard Routes */}
                <Route path="/work" element={<WorkPage />} />
                <Route path="/work/:slug" element={<ProjectDetailPage />} />
                <Route path="/services" element={<ServicesIndexPage />} />
                <Route path="/services/:slug" element={<ServicePillarPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/resources/:slug" element={<ResourceDetailPage />} />
                <Route path="/blog" element={<ResourcesPage />} />
                <Route path="/blog/:slug" element={<BlogPostRoute />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Persian /fa Subpath Routes */}
                <Route path="/fa/work" element={<WorkPage />} />
                <Route path="/fa/work/:slug" element={<ProjectDetailPage />} />
                <Route path="/fa/services" element={<ServicesIndexPage />} />
                <Route path="/fa/services/:slug" element={<ServicePillarPage />} />
                <Route path="/fa/resources" element={<ResourcesPage />} />
                <Route path="/fa/resources/:slug" element={<ResourceDetailPage />} />
                <Route path="/fa/blog" element={<ResourcesPage />} />
                <Route path="/fa/blog/:slug" element={<BlogPostRoute />} />
                <Route path="/fa/about" element={<AboutPage />} />
                <Route path="/fa/contact" element={<ContactPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}

      {!isHome && <Footer />}

      <Toaster />
      <QuoteModal />
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <QuoteModalProvider>
          <AppShell />
        </QuoteModalProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
