import React, { createContext, useContext, useEffect, ReactNode, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Language = 'fa' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language synchronously and directly from current URL pathname
  const isFaPath = location.pathname === '/fa' || location.pathname.startsWith('/fa/') || location.pathname.startsWith('/fa');
  const lang: Language = isFaPath ? 'fa' : 'en';

  // Sync document attributes whenever language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('heslab_lang', lang);
    } catch (_) {}
  }, [lang]);

  const setLang = useCallback(
    (targetLang: Language) => {
      if (targetLang === lang) return;
      
      const currentPath = location.pathname;
      let targetPath = '/';

      if (targetLang === 'fa') {
        // EN -> FA
        targetPath = currentPath === '/' ? '/fa' : `/fa${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`;
      } else {
        // FA -> EN
        targetPath = currentPath === '/fa' || currentPath === '/fa/' ? '/' : currentPath.replace(/^\/fa(\/|$)/, '/');
        if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;
      }

      navigate(`${targetPath}${location.search}${location.hash}`);
    },
    [lang, location.pathname, location.search, location.hash, navigate]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'fa' ? 'en' : 'fa');
  }, [lang, setLang]);

  const isRtl = lang === 'fa';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

