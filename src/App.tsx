import React, { useEffect, useState, Suspense } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import i18n from './i18n';
import { routes } from './routesConfig.ts';
import Notification from './components/Notification/Notification.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';

// Lazy load OfflinePage for optimized loading
const OfflinePage = React.lazy(() => import('./pages/OfflinePage'));

function LanguageInitializer({
  onLanguageChange,
}: {
  onLanguageChange: () => void;
}) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    let detectedLang = pathParts[0];

    if (!['en', 'ro', 'ru'].includes(detectedLang)) {
      detectedLang = localStorage.getItem('i18nextLng') || 'en';
      const newPath =
        '/' +
        detectedLang +
        (location.pathname !== '/' ? location.pathname : '/');
      navigate(newPath, { replace: true });
    } else if (detectedLang !== i18n.language) {
      i18n.changeLanguage(detectedLang).then(() => {
        onLanguageChange(); // Trigger a callback to re-render the app
      });
    }
  }, [location.pathname, i18n.language, navigate, onLanguageChange]);

  return null;
}

function App() {
  const { t } = useTranslation();
  const [, setLanguageChanged] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleLanguageChange = () => {
    setLanguageChanged(prev => !prev); // This will cause a re-render
  };

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div id="top_notification">
        <span style={{ fontWeight: '600' }}>{t('website_warning.sorry')}</span>
        &nbsp;{t('website_warning.sorry_message')}
      </div>
      <Notification>{t('website_warning.sorry_message')}</Notification>
      <BrowserRouter>
        <LanguageInitializer onLanguageChange={handleLanguageChange} />
        <LanguageProvider>
          {isOnline ? (
            <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
              <Route
                path="/"
                element={
                  <Navigate
                    replace
                    to={`/${localStorage.getItem('i18nextLng') || 'en'}`}
                  />
                }
              />
            </Routes>
          ) : (
            // Lazy load the OfflinePage component
            <Suspense fallback={<div>Loading offline page...</div>}>
              <OfflinePage />
            </Suspense>
          )}
        </LanguageProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
