// App.tsx
import {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { routes } from './routesConfig.ts';
import WebsiteWarning from './components/WebiteWarning.tsx';

function LanguageInitializer({ onLanguageChange }: { onLanguageChange: () => void }) {
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        let detectedLang = pathParts[0];

        if (!['en', 'ro', 'ru'].includes(detectedLang)) {
            detectedLang = localStorage.getItem('i18nextLng') || 'en';
            navigate(`/${detectedLang}${location.pathname}`, { replace: true });
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
        <>
            <div id="top_notification">
                <span style={{ fontWeight: '600' }}>{t('website_warning.sorry')}</span>&nbsp; {t('website_warning.sorry_message')}
            </div>
            <WebsiteWarning />
            <BrowserRouter>
                <LanguageInitializer onLanguageChange={handleLanguageChange} />
                <Routes>
                    {routes.map(({ path, element }, index) => (
                        <Route key={index} path={path} element={element} />
                    ))}
                    <Route path="/" element={<Navigate replace to="/en" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
