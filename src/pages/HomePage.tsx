import { FC } from 'react';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { ManifestoScroll } from '../components/ManifestoScroll';
import { SelectedWork } from '../components/SelectedWork';
import { TargetAudience } from '../components/TargetAudience';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';
import { KeepInTouch } from '../components/KeepInTouch';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { SEOHead } from '../components/seo/SEOHead';
import { generateWebSiteSchema, generateOrganizationSchema } from '../utils/schema';
import { useLanguage } from '../context/LanguageContext';
export const HomePage: FC = () => {
  const { lang } = useLanguage();

  const webSiteSchema = generateWebSiteSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      <SEOHead
        title={
          lang === 'fa'
            ? 'حس‌لب | استودیو تدوین ویدیوهای کوتاه و موشن دیزاین'
            : 'HesLab — Short-Form Video Editing & Motion Design Studio'
        }
        description={
          lang === 'fa'
            ? 'استودیو تخصصی تدوین ریلز، یوتیوب شورتس و تیک‌تاک با هوک‌های ۳ ثانیه‌ای، موشن کینتیک و طراحی صدای سه‌بعدی برای کریتورها و برندها.'
            : 'Independent creative studio specializing in high-retention short-form video editing, Reels, YouTube Shorts, and bespoke motion design for creators and brands.'
        }
        path="/"
        structuredData={[webSiteSchema, orgSchema]}
      />

      {/* 1. Top White Section (Hero, Stats) */}
      <div className="relative w-full bg-[#1E1E1F]">
        <div className="w-full bg-white rounded-b-[22px] sm:rounded-b-[28px] md:rounded-b-[34px] overflow-x-clip">
          <Hero />
          <StatsBar />
        </div>
      </div>

      {/* 2. Manifesto: Full-width Dark Container bg-[#1E1E1F] */}
      <ManifestoScroll />

      {/* 3. Work & Target Audience (White Section) */}
      <div className="relative w-full bg-[#1E1E1F]">
        {/* Seamless backdrop for bottom rounded corners matching HowItWorks dark tone #1E1E1F */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-[#1E1E1F] pointer-events-none" />

        <div className="relative w-full bg-white rounded-t-[22px] sm:rounded-t-[28px] md:rounded-t-[34px] rounded-b-[22px] sm:rounded-b-[28px] md:rounded-b-[34px] overflow-hidden">
          <SelectedWork />
          <TargetAudience />
        </div>
      </div>

      {/* 4. Process: HOW IT WORKS (Full-width Dark #1E1E1F) */}
      <HowItWorks />

      {/* 5. Middle White Section (Pricing, FAQ) */}
      <div className="relative w-full bg-[#1E1E1F]">
        {/* Seamless backdrop for top rounded corners matching HowItWorks dark tone #1E1E1F */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-[#1E1E1F] pointer-events-none" />

        <div className="relative w-full bg-white rounded-t-[22px] sm:rounded-t-[28px] md:rounded-t-[34px] rounded-b-[22px] sm:rounded-b-[28px] md:rounded-b-[34px] overflow-hidden">
          <Pricing />
          <KeepInTouch />
          <FAQ />
        </div>
      </div>

      {/* 6. Final Action Callout & Footer (Full-width Dark #1E1E1F) */}
      <FinalCTA />
    </>
  );
};

export default HomePage;
