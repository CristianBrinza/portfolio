import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import "./pages/Home.tsx"
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home.tsx";
import WebsiteWarning from "./components/WebiteWarning.tsx";


function App() {
    const {
        t,
        i18n: {},
    } = useTranslation();
  return (
    <>
     <div id="top_notification">
         <span style={{fontWeight: '600'}}>We are sorry.</span> {t('website_warning.sorry_message')}
     </div>
        <WebsiteWarning />
        <BrowserRouter>
            <Routes>
                <Route path="/:lang" element={<Home />} />
                <Route path="/" element={<Navigate replace to="/en" />} />
                {/* Default to English */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
