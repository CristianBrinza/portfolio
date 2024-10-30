// App.tsx
import React, { useEffect, useState, Suspense } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import i18n from './i18n';
import { routes } from './routesConfig';
import Notification from './components/Notification/Notification';
import { LanguageProvider } from './context/LanguageContext';
import ReactGA from 'react-ga4';
import ConsentBanner from './components/ConsentBanner/ConsentBanner';
import DynamicPages from './components/DynamicPages/DynamicPages';

const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_TAG;
const GTM_ID = import.meta.env.VITE_GTM_ID;
const OfflinePage = React.lazy(() => import('./pages/OfflinePage'));

function LanguageInitializer({ onLanguageChange }: { onLanguageChange: () => void }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const excludedPaths = ['/files', '/images', '/json'];

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    let detectedLang = pathParts[0];
    const isExcludedPath = excludedPaths.some(path => location.pathname.startsWith(path));

    if (isExcludedPath) return;

    if (!['en', 'ro', 'ru'].includes(detectedLang)) {
      detectedLang = localStorage.getItem('i18nextLng') || 'en';
      const newPath = '/' + detectedLang + (location.pathname !== '/' ? location.pathname : '/');
      navigate(newPath, { replace: true });
    } else if (detectedLang !== i18n.language) {
      i18n.changeLanguage(detectedLang).then(onLanguageChange);
    }
  }, [location.pathname, i18n.language, navigate, onLanguageChange]);

  return null;
}

function AppContent() {
  const { t } = useTranslation();
  const [, setLanguageChanged] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  const handleLanguageChange = () => setLanguageChanged(prev => !prev);

  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    // Initialize Google Analytics if the tracking ID is available
    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID, { testMode: import.meta.env.DEV });
    }
  }, []);

  useEffect(() => {
    const consentGiven = localStorage.getItem('userConsent');
    if (consentGiven === 'granted' && !ReactGA.ga()) {
      ReactGA.initialize(TRACKING_ID);  // Removed unsupported debug parameter
      ReactGA.send('pageview');
      console.log("Google Analytics initialized");
    }
  }, []);

  useEffect(() => {
    const page = location.pathname;
    const pageTitle = document.title || 'Website';
    ReactGA.send({ hitType: 'pageview', page, title: pageTitle });
    console.log(`Pageview sent: ${page} - ${pageTitle}`);
  }, [location.pathname]);

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(script);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
  }, []);

  return (
      <>
        <div id="top_notification">
          <span style={{ fontWeight: '600' }}>{t('website_warning.sorry')}</span>
          &nbsp;{t('website_warning.sorry_message')}
        </div>
        <Notification>{t('website_warning.sorry_message')}</Notification>
        <LanguageInitializer onLanguageChange={handleLanguageChange}/>
        <LanguageProvider>
          {isOnline ? (
              <Routes>
                {routes.map(({path, element}, index) => (
                    <Route key={index} path={path} element={element}/>
                ))}
                <Route path="/*" element={<DynamicPages/>}/>
              </Routes>
          ) : (
              <Suspense fallback={<div>Loading offline page...</div>}>
                <OfflinePage/>
              </Suspense>
          )}
          <ConsentBanner/>
        </LanguageProvider>
      </>
  );
}

function App() {
  return (
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AppContent/>
        </BrowserRouter>
      </I18nextProvider>
  );
}

export default App;
