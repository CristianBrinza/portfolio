//App.tsx
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { routes } from './routesConfig.ts';
import WebsiteWarning from "./components/WebiteWarning.tsx";

function App() {
    const { t } = useTranslation();

    return (
        <>
            <div id="top_notification">
                <span style={{ fontWeight: '600' }}>We are sorry.</span>&nbsp; {t('website_warning.sorry_message')}
            </div>
            <WebsiteWarning />
            <BrowserRouter>
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
