import { useEffect, type FC } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { generateServiceSchema } from '../utils/schema';
import { getCanonicalUrl } from '../config/site';
import type { ServiceArticle } from '../data/serviceArticles';
import {
  AnswerBlock,
  CardGrid,
  CompareBlock,
  CTASection,
  ExamplesStrip,
  FAQBlock,
  ProcessBlock,
  RichText,
  ServiceHero,
  ServiceSection,
  stripLinks,
} from '../components/service-article/ServiceArticleBlocks';

export const ServiceArticlePage: FC<{ article: ServiceArticle }> = ({ article }) => {
  const path = `/blog/${article.slug}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.slug]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripLinks(f.a) },
    })),
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: article.metaTitle,
    description: article.metaDescription,
    url: getCanonicalUrl(path),
    inLanguage: 'en',
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
    isPartOf: { '@type': 'WebSite', name: 'HesLab' },
  };

  return (
    <div dir="ltr" className="min-h-screen bg-white font-en text-slate-900 pt-28 pb-20">
      <SEOHead
        title={article.metaTitle}
        description={article.metaDescription}
        path={path}
        ogType="website"
        jsonLdId="service-article-schema"
        structuredData={[
          pageSchema,
          generateServiceSchema({
            name: article.name,
            description: article.metaDescription,
            path,
            serviceType: article.primaryKeyword,
          }),
          faqSchema,
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 page-article-zoom">
        <ServiceHero article={article} />

        <article>
          <ServiceSection id="definition" heading={article.definition.heading}>
            <AnswerBlock answer={article.definition.answer} points={article.definition.points} />
          </ServiceSection>

          <ServiceSection id="why" heading={article.why.heading} intro={article.why.intro}>
            <CardGrid items={article.why.items} />
          </ServiceSection>

          {article.compare && (
            <ServiceSection id="compare" heading={article.compare.heading}>
              <CompareBlock
                beforeLabel={article.compare.beforeLabel}
                beforeItems={article.compare.beforeItems}
                afterLabel={article.compare.afterLabel}
                afterItems={article.compare.afterItems}
              />
            </ServiceSection>
          )}

          <ServiceSection id="what-we-do" heading={article.whatWeDo.heading} intro={article.whatWeDo.intro}>
            <CardGrid items={article.whatWeDo.items} />
          </ServiceSection>

          {article.audience && (
            <ServiceSection id="audience" heading={article.audience.heading}>
              <CardGrid items={article.audience.items} />
            </ServiceSection>
          )}

          <ServiceSection id="process" heading={article.process.heading} intro={article.process.intro}>
            <ProcessBlock steps={article.process.steps} />
          </ServiceSection>

          <ServiceSection id="mistakes" heading={article.mistakes.heading} intro={article.mistakes.intro}>
            <CardGrid items={article.mistakes.items} variant="warn" />
          </ServiceSection>

          <ServiceSection id="examples" heading={article.examples.heading}>
            <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-[17px]">
              <RichText text={article.examples.text} />
            </p>
            <ExamplesStrip videos={article.examples.videos} label={`${article.name} example`} />
          </ServiceSection>

          <ServiceSection id="faq" heading="Frequently asked questions">
            <FAQBlock items={article.faq} />
          </ServiceSection>
        </article>

        <CTASection article={article} />
      </div>
    </div>
  );
};

export default ServiceArticlePage;
