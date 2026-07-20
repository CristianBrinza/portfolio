import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const routeLanguage = location.pathname.split('/')[1];
  const activeLanguage = ['en', 'ro', 'ru'].includes(routeLanguage)
    ? routeLanguage
    : i18n.resolvedLanguage;
  const language = ['en', 'ro', 'ru'].includes(activeLanguage ?? '')
    ? activeLanguage
    : 'en';
  const homePath = `/${language}/`;
  const portfolioPath = `/${language}/portfolio`;
  const issueUrl = `https://github.com/CristianBrinza/portfolio/issues/new?title=${encodeURIComponent(
    `[cristianbrinza.com] 404: ${location.pathname}`
  )}&labels=bug`;

  const breadcrumbItems = [
    { label: t('navigation.home'), url: homePath },
    { label: t('navigation.not_found_page') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.notFoundPage} id="not-found-page">
        <section aria-labelledby="not-found-title" className={styles.hero}>
          <div aria-hidden="true" className={styles.codeVisual}>
            <span className={styles.codeLabel}>( Error / 404 )</span>
            <div className={styles.digits}>
              <span>4</span>
              <span className={styles.zero}>
                0<i />
              </span>
              <span>4</span>
            </div>
            <span className={styles.codeCaption}>Route / unresolved</span>
          </div>

          <div className={styles.copy}>
            <span className={styles.eyebrow}>{t('not_found.eyebrow')}</span>
            <h1 id="not-found-title">{t('not_found.title')}</h1>
            <p>{t('not_found.message')}</p>

            <div className={styles.actions}>
              <Link className={styles.primaryAction} to={homePath}>
                <span>{t('not_found.home_action')}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link to={portfolioPath}>
                <span>{t('not_found.portfolio_action')}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <div className={styles.details}>
          <div>
            <span>(01)</span>
            <small>{t('not_found.requested_path')}</small>
            <code>{location.pathname}</code>
          </div>
          <div>
            <span>(02)</span>
            <small>{t('not_found.suggestion')}</small>
            <strong>{t('not_found.suggestion_value')}</strong>
          </div>
          <a href={issueUrl} rel="noreferrer" target="_blank">
            <span>(03)</span>
            <small>{t('not_found.report_label')}</small>
            <strong>{t('not_found.report_action')} ↗</strong>
          </a>
        </div>
      </main>

      <Footer type="2" />
    </>
  );
}
