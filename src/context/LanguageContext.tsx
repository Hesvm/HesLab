import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
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

  // Determine language directly from current URL pathname
  const isFaPath = location.pathname === '/fa' || location.pathname.startsWith('/fa/');
  const currentLang: Language = isFaPath ? 'fa' : 'en';

  const [lang, setLangState] = useState<Language>(currentLang);

  // Sync state whenever URL pathname changes
  useEffect(() => {
    setLangState(currentLang);
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem('heslab_lang', currentLang);
    } catch (_) {}
  }, [currentLang, location.pathname]);

  const setLang = useCallback(
    (targetLang: Language) => {
      if (targetLang === currentLang) return;
      
      const currentPath = location.pathname;
      let targetPath = '/';

      if (targetLang === 'fa') {
        // EN -> FA
        targetPath = currentPath === '/' ? '/fa' : `/fa${currentPath}`;
      } else {
        // FA -> EN
        targetPath = currentPath === '/fa' ? '/' : currentPath.replace(/^\/fa/, '');
        if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;
      }

      navigate(`${targetPath}${location.search}${location.hash}`);
    },
    [currentLang, location.pathname, location.search, location.hash, navigate]
  );

  const toggleLang = useCallback(() => {
    setLang(currentLang === 'fa' ? 'en' : 'fa');
  }, [currentLang, setLang]);

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

