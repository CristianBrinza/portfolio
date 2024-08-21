// App.tsx
import { useEffect, useState } from 'react';
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
        detectedLang + (location.pathname !== '/' ? location.pathname : '');
      navigate(`/${newPath}`, { replace: true });
    } else if (detectedLang !== i18n.language) {
      i18n.changeLanguage(detectedLang).then(() => {
        onLanguageChange();
      });
    }
  }, [location.pathname, i18n, navigate, onLanguageChange]);

  return null;
}

function App() {
  const { t } = useTranslation();
  const [languageChanged, setLanguageChanged] = useState(false);

  const handleLanguageChange = () => {
    setLanguageChanged(prev => !prev);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div id="top_notification">
        <span style={{ fontWeight: '600' }}>{t('website_warning.sorry')}</span>
        &nbsp; {t('website_warning.sorry_message')}
      </div>
      <Notification>{t('website_warning.sorry_message')}</Notification>
      <BrowserRouter>
        <LanguageInitializer onLanguageChange={handleLanguageChange} />
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
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
