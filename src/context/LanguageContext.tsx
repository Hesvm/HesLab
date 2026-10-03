import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'fa' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLang = (): Language => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'en' || paramLang === 'fa') return paramLang as Language;
    const saved = localStorage.getItem('heslab_lang');
    if (saved === 'en' || saved === 'fa') return saved as Language;
  }
  return 'en'; // Default to English as requested
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(getInitialLang);

  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('heslab_lang', lang);
    } catch (_) {}
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

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
