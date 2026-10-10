import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Delay check in case layout shifts or async chunk loads
      const t = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 0);

      return () => clearTimeout(t);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
