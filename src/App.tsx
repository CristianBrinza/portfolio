//App.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import { routes } from './routesConfig.ts';
import WebsiteWarning from "./components/WebiteWarning.tsx";

function LanguageInitializer({ onLanguageChange }: { onLanguageChange: () => void }) {
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        const detectedLang = pathParts[0];

        if (['en', 'ro', 'ru'].includes(detectedLang)) {
            if (detectedLang !== i18n.language) {
                i18n.changeLanguage(detectedLang).then(() => {
                    onLanguageChange(); // Force re-render by triggering state change
                    if (pathParts[0] !== detectedLang) {
                        pathParts[0] = detectedLang;
                        navigate('/' + pathParts.join('/'), { replace: true });
                    }
                });
            }
        } else {
            const defaultLang = 'en';
            i18n.changeLanguage(defaultLang).then(() => {
                onLanguageChange(); // Force re-render by triggering state change
                navigate(`/${defaultLang}${location.pathname}`, { replace: true });
            });
        }
    }, [location.pathname, i18n, navigate, onLanguageChange]);

    return null;
}

function App() {
    const { t } = useTranslation();
    const [languageChanged, setLanguageChanged] = useState(false);

    // Function to trigger re-render on language change
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
