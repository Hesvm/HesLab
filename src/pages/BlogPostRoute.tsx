import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceArticle } from '../data/serviceArticles';
import { ServiceArticlePage } from './ServiceArticlePage';
import { ResourceDetailPage } from './ResourceDetailPage';

// /blog/:slug resolves to a service landing page when the slug matches one,
// and falls back to the regular blog article page otherwise.
export const BlogPostRoute: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getServiceArticle(slug) : undefined;
  return article ? <ServiceArticlePage article={article} /> : <ResourceDetailPage />;
};

export default BlogPostRoute;
