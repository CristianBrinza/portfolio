import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import styles from '../styles/Offline.module.css';

export default function OfflinePage() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [retryAttempted, setRetryAttempted] = useState(false);
  const [isConnected, setIsConnected] = useState(() => navigator.onLine);

  const routeLanguage = location.pathname.split('/')[1];
  const activeLanguage = ['en', 'ro', 'ru'].includes(routeLanguage)
    ? routeLanguage
    : i18n.resolvedLanguage;
  const language = ['en', 'ro', 'ru'].includes(activeLanguage ?? '')
    ? activeLanguage
    : 'en';
  const homePath = `/${language}/`;
  const isExplicitOfflineRoute = new RegExp(`^/${language}/offline/?$`).test(
    location.pathname
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      setRetryAttempted(false);
    };
    const handleOffline = () => setIsConnected(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    setRetryAttempted(false);

    window.setTimeout(() => {
      const connected = navigator.onLine;
      setIsConnected(connected);

      if (connected) {
        if (isExplicitOfflineRoute) {
          navigate(homePath);
        } else {
          window.location.reload();
        }
        return;
      }

      setRetryAttempted(true);
      setIsChecking(false);
    }, 450);
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), url: homePath },
    { label: t('navigation.offline_page') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.offlinePage} id="offline-page">
        <section aria-labelledby="offline-title" className={styles.hero}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>{t('offline.eyebrow')}</span>
            <h1 id="offline-title">{t('offline.title')}</h1>
            <p className={styles.summary}>{t('offline.message')}</p>

            <div
              aria-live="polite"
              className={`${styles.status} ${
                isConnected ? styles.statusOnline : styles.statusOffline
              }`}
              role="status"
            >
              <span aria-hidden="true" />
              <small>{t('offline.status_label')}</small>
              <strong>
                {t(
                  isConnected
                    ? 'offline.status_online'
                    : 'offline.status_offline'
                )}
              </strong>
            </div>

            <div className={styles.actions}>
              <button disabled={isChecking} onClick={handleRetry} type="button">
                <span>
                  {t(isChecking ? 'offline.checking' : 'offline.retry_action')}
                </span>
                <span aria-hidden="true">↻</span>
              </button>
              <Link to={homePath}>
                <span>{t('offline.home_action')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className={styles.feedback} role="status">
              {retryAttempted
                ? t('offline.still_offline')
                : isConnected
                  ? t('offline.restored')
                  : t('offline.hint')}
            </p>
          </div>

          <div aria-hidden="true" className={styles.visual}>
            <span className={styles.visualIndex}>( 00 / Network )</span>
            <svg viewBox="0 0 360 360">
              <circle className={styles.orbit} cx="180" cy="180" r="139" />
              <circle className={styles.innerOrbit} cx="180" cy="180" r="78" />
              <path d="M41 180h278M180 41v278" />
              <path className={styles.slash} d="M72 288 288 72" />
              <circle className={styles.dot} cx="180" cy="41" r="10" />
            </svg>
            <span className={styles.visualCaption}>Signal / unavailable</span>
          </div>
        </section>

        <div className={styles.meta}>
          <div>
            <span>(01)</span>
            <small>{t('offline.meta_problem')}</small>
            <strong>{t('offline.meta_problem_value')}</strong>
          </div>
          <div>
            <span>(02)</span>
            <small>{t('offline.meta_next')}</small>
            <strong>{t('offline.meta_next_value')}</strong>
          </div>
          <div>
            <span>(03)</span>
            <small>{t('offline.meta_page')}</small>
            <strong>{t('offline.meta_page_value')}</strong>
          </div>
        </div>
      </main>

      <Footer type="2" />
    </>
  );
}
