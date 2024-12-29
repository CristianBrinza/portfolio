//context/LanguageContextProps.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// Define the context type properly
interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('i18nextLng') || 'en'
  );
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // List of paths to exclude from language redirection
  const excludedPaths = ['/files/', '/images/', '/json/', '/app'];

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    let detectedLang = pathParts[0];

    // Check if the current path is an excluded path
    const isExcludedPath = excludedPaths.some(path =>
      location.pathname.startsWith(path)
    );

    if (isExcludedPath) {
      return; // Do nothing if it's an excluded path
    }

    if (!['en', 'ro', 'ru'].includes(detectedLang)) {
      detectedLang = localStorage.getItem('i18nextLng') || 'en';
      const newPath =
        '/' +
        detectedLang +
        (location.pathname !== '/' ? location.pathname : '/');
      navigate(newPath, { replace: true });
    } else if (detectedLang !== i18n.language) {
      i18n.changeLanguage(detectedLang).then(() => {
        setLanguage(detectedLang);
        localStorage.setItem('i18nextLng', detectedLang);
      });
    }
  }, [location.pathname, i18n.language, navigate]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
