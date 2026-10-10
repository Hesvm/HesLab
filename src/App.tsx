import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const SubpageLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <div className="relative w-full bg-[#000000]">
      <div className="w-full bg-white rounded-b-[22px] sm:rounded-b-[28px] md:rounded-b-[34px] overflow-x-clip">
        {children}
      </div>
    </div>
    <Footer />
  </>
);

const AppShell: FC = () => {
  const { lang, isRtl } = useLanguage();

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

      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Routes>
          {/* Landing / Home Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/fa" element={<HomePage />} />
          <Route path="/fa/" element={<HomePage />} />

          {/* English Standard Routes */}
          <Route path="/work" element={<SubpageLayout><WorkPage /></SubpageLayout>} />
          <Route path="/work/:slug" element={<SubpageLayout><ProjectDetailPage /></SubpageLayout>} />
          <Route path="/services" element={<SubpageLayout><ServicesIndexPage /></SubpageLayout>} />
          <Route path="/services/:slug" element={<SubpageLayout><ServicePillarPage /></SubpageLayout>} />
          <Route path="/resources" element={<SubpageLayout><ResourcesPage /></SubpageLayout>} />
          <Route path="/resources/:slug" element={<SubpageLayout><ResourceDetailPage /></SubpageLayout>} />
          <Route path="/blog" element={<SubpageLayout><ResourcesPage /></SubpageLayout>} />
          <Route path="/blog/:slug" element={<SubpageLayout><BlogPostRoute /></SubpageLayout>} />
          <Route path="/about" element={<SubpageLayout><AboutPage /></SubpageLayout>} />
          <Route path="/contact" element={<SubpageLayout><ContactPage /></SubpageLayout>} />

          {/* Persian /fa Subpath Routes */}
          <Route path="/fa/work" element={<SubpageLayout><WorkPage /></SubpageLayout>} />
          <Route path="/fa/work/:slug" element={<SubpageLayout><ProjectDetailPage /></SubpageLayout>} />
          <Route path="/fa/services" element={<SubpageLayout><ServicesIndexPage /></SubpageLayout>} />
          <Route path="/fa/services/:slug" element={<SubpageLayout><ServicePillarPage /></SubpageLayout>} />
          <Route path="/fa/resources" element={<SubpageLayout><ResourcesPage /></SubpageLayout>} />
          <Route path="/fa/resources/:slug" element={<SubpageLayout><ResourceDetailPage /></SubpageLayout>} />
          <Route path="/fa/blog" element={<SubpageLayout><ResourcesPage /></SubpageLayout>} />
          <Route path="/fa/blog/:slug" element={<SubpageLayout><BlogPostRoute /></SubpageLayout>} />
          <Route path="/fa/about" element={<SubpageLayout><AboutPage /></SubpageLayout>} />
          <Route path="/fa/contact" element={<SubpageLayout><ContactPage /></SubpageLayout>} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<SubpageLayout><NotFoundPage /></SubpageLayout>} />
        </Routes>
      </Suspense>

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
