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
import Login from './pages/admin/login/Login';
import { AuthProvider } from './context/AuthContext';
import NotFound from './pages/NotFound.tsx';
import { registerSW } from 'virtual:pwa-register';
import Application from './app/Application';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_TAG;
const GTM_ID = import.meta.env.VITE_GTM_ID;
const OfflinePage = React.lazy(() => import('./pages/OfflinePage'));

function AppContent() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  //const handleLanguageChange = () => {}; // No-op if unnecessary

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
      ReactGA.initialize(TRACKING_ID);
      ReactGA.send('pageview');
      console.log('Google Analytics initialized');
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

  const [showNotification, setShowNotification] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/status`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (response.status !== 200) {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            setShowNotification(true);
          }, 10000); // Hide notification after 10 seconds
        }
      } catch (error) {
        console.error('Error fetching backend status:', error);
        // Show notification in case of network error
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 10000); // Hide notification after 10 seconds
      }
    };

    checkBackendStatus();
  }, []);

  const navigate = useNavigate();
  function isStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    );
  }

  // useEffect(() => {
  //   if (isStandalone() && location.pathname !== '/app') {
  //     navigate('/app', { replace: true });
  //   }
  // }, [location.pathname, navigate]);

  useEffect(() => {
    if (isStandalone() && location.pathname === '/') {
      navigate('/app', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    setShowUpdateNotification(false);
    if (isStandalone()) {
      document.body.classList.add('standalone');
    } else {
      document.body.classList.remove('standalone');
    }
  }, []);

  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm('New content is available. Refresh?')) {
        updateSW();
      }
      // setShowUpdateNotification(true); // Add a state for showing this notification
    },
    onOfflineReady() {
      console.log('App is ready for offline use.');
    },
  });
  // useEffect(() => {
  //   if (location.pathname.startsWith(`/${i18n.language}/app`)) {
  //     navigate('/app', { replace: true });
  //   }
  // }, [location.pathname, i18n.language, navigate]);

  const isAppPath = location.pathname === '/app';
  return (
    <AuthProvider>
      {!isAppPath && (
        <div
          id="top_notification"
          style={{ display: !isStandalone() ? 'flex' : 'none' }}
        >
          <span style={{ fontWeight: '600' }}>
            {t('website_warning.sorry')}
          </span>
          &nbsp;{t('website_warning.sorry_message')}
        </div>
      )}
      {showNotification && !isAppPath && (
        <Notification>{t('website_warning.sorry_message')}</Notification>
      )}
      {showNotification && !isAppPath && (
        <Notification type="error">Sorry, Back-end is down</Notification>
      )}
      {showUpdateNotification && (
        <Notification type="info">
          New version available. <button onClick={updateSW}>Update</button>
        </Notification>
      )}
      <LanguageProvider>
        {isOnline ? (
          <Routes>
            <Route path="/app" element={<Application />} />
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
            <Route path="/:lang/login" element={<Login />} />
            <Route path="/*" element={<DynamicPages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Suspense fallback={<div>Loading offline page...</div>}>
            <OfflinePage />
          </Suspense>
        )}
        {!isAppPath && <ConsentBanner visible={!isStandalone()} />}
      </LanguageProvider>
    </AuthProvider>
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
