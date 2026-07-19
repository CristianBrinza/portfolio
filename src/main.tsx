import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/Global.css';
import './i18n';
import { NotificationProvider } from './components/Notification/NotificationContext';
import { initializeConsentMode } from './utils/consent';
import { initializePWA } from './pwa';

initializeConsentMode();
initializePWA();

createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
