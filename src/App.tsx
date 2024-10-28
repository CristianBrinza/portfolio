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
import { routes } from './routesConfig';
import Notification from './components/Notification/Notification';
import { LanguageProvider } from './context/LanguageContext';
import ReactGA from 'react-ga4'

// Access the Google Analytics tracking ID from the environment variable
const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_TAG

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

  // List of paths to exclude from language redirection
  const excludedPaths = ['/files', '/images', '/json'];

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
        onLanguageChange(); // Trigger a callback to re-render the app
      });
    }
  }, [location.pathname, i18n.language, navigate, onLanguageChange]);

  return null;
}

function AppContent() {
  const { t } = useTranslation();
  const [, setLanguageChanged] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation(); // Hook to get current location (for page tracking)

  const handleLanguageChange = () => {
    setLanguageChanged(prev => !prev); // This will cause a re-render
  };

  // Update network status
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

  useEffect(() => {

    ReactGA.initialize(TRACKING_ID);
    //console.log('Google Analytics initialized with ID:', TRACKING_ID);

  }, []);

  // Send custom Google Analytics page view event whenever route changes
  useEffect(() => {
    const page = location.pathname;
    const pageTitle = document.title || "Website"; // Optionally set a fallback title
    ReactGA.send({ hitType: "pageview", page, title: pageTitle });
  }, [location.pathname]); // Dependency ensures this runs when the route changes

  return (
      <>
        <div id="top_notification">
          <span style={{ fontWeight: '600' }}>{t('website_warning.sorry')}</span>
          &nbsp;{t('website_warning.sorry_message')}
        </div>
        <Notification>{t('website_warning.sorry_message')}</Notification>
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
      </>
  );
}

function App() {
  return (
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </I18nextProvider>
  );
}

export default App;
