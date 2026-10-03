import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
