import { FC } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ManifestoScroll } from './components/ManifestoScroll';
import { SelectedWork } from './components/SelectedWork';
import { TargetAudience } from './components/TargetAudience';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { WhoIsBehind } from './components/WhoIsBehind';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';

const MainContent: FC = () => {
  const { lang, isRtl } = useLanguage();

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`relative min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-slate-900 selection:text-white ${
        lang === 'fa' ? 'font-fa' : 'font-en'
      }`}
    >
      {/* 1. Header Navigation */}
      <Navbar />

      <main>
        {/* 2. Hero Section: SHORT-FORM CONTENT STUDIO + SHOWREEL */}
        <Hero />

        {/* 3. Stats Bar: 50+ videos | 2M+ views | 24-48h turnaround */}
        <StatsBar />

        {/* 4. Manifesto Scroll: Interactive illuminated editorial text */}
        <ManifestoScroll />

        {/* 5. Portfolio: SELECTED WORK */}
        <SelectedWork />

        {/* 6. Target Audience: MADE FOR PEOPLE WHO HAVE SOMETHING TO SAY */}
        <TargetAudience />

        {/* 8. Process: HOW IT WORKS (01 Send, 02 Edit, 03 Review, 04 Deliver) */}
        <HowItWorks />

        {/* 9. Pricing: Starter (4/mo), Growth (12/mo), Studio (20+/mo) */}
        <Pricing />

        {/* 10. Founder Section: WHO'S BEHIND HESLAB? (HES) */}
        <WhoIsBehind />

        {/* 12. FAQ Section */}
        <FAQ />

        {/* 13. Final Action Callout & Footer */}
        <FinalCTA />
      </main>
    </div>
  );
};

export const App: FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;

