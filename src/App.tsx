import { FC } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from './components/Toaster';
import { ScrollToTop } from './components/ScrollToTop';
import { PostHogPageviewTracker } from './components/analytics/PostHogPageviewTracker';

import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServicePillarPage } from './pages/ServicePillarPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppShell: FC = () => {
  const { lang, isRtl } = useLanguage();
  const location = useLocation();

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      <ScrollToTop />
      <PostHogPageviewTracker />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/services" element={<ServicesIndexPage />} />
        <Route path="/services/:slug" element={<ServicePillarPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ResourceDetailPage />} />
        <Route path="/blog" element={<ResourcesPage />} />
        <Route path="/blog/:slug" element={<ResourceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {location.pathname !== '/' && <Footer />}

      <Toaster />
    </div>
  );
};

export const App: FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
