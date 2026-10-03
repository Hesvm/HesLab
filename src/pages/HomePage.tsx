import { FC } from 'react';
import { Hero } from '../components/Hero';
import { StatsBar } from '../components/StatsBar';
import { ManifestoScroll } from '../components/ManifestoScroll';
import { SelectedWork } from '../components/SelectedWork';
import { TargetAudience } from '../components/TargetAudience';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';
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

      {/* 12. FAQ Section */}
      <FAQ />

      {/* 13. Final Action Callout & Footer */}
      <FinalCTA />
    </>
  );
};

export default HomePage;
