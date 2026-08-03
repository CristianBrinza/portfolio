import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import ArrowUpRight from '../../components/ArrowUpRight/ArrowUpRight.tsx';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { isSupportedLanguage } from '../../seo/siteSeo.ts';
import styles from './Certifications.module.css';

interface CertificationItem {
  by: string;
  description: string;
  img?: string;
  title: string;
  to?: string;
}

type LoadState = 'empty' | 'error' | 'loading' | 'ready';

function resolveCertificationUrl(url: string, language: string) {
  if (!url.startsWith('/')) return url;

  const firstSegment = url.split('/').filter(Boolean)[0] ?? '';
  return isSupportedLanguage(firstSegment) ? url : `/${language}${url}`;
}

function CertificateVisual({
  image,
  index,
  title,
}: {
  image?: string;
  index: number;
  title: string;
}) {
  return (
    <div className={styles.cardVisual}>
      <div aria-hidden="true" className={styles.cardFallback}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="52" />
          <path d="m49 84 20 20 43-48" />
        </svg>
      </div>
      {image && (
        <img
          alt={`${title} certificate`}
          decoding="async"
          loading={index < 3 ? 'eager' : 'lazy'}
          onError={event => {
            event.currentTarget.hidden = true;
          }}
          src={image}
        />
      )}
    </div>
  );
}

function CertificationCard({
  index,
  item,
  language,
}: {
  index: number;
  item: CertificationItem;
  language: string;
}) {
  const { t } = useTranslation();
  const hasLink = Boolean(item.to && item.to !== '#');
  const className = [
    styles.card,
    hasLink ? styles.cardLinked : styles.cardUnavailable,
  ]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      <div className={styles.cardTopline}>
        <span>({String(index + 1).padStart(2, '0')})</span>
        <span>{item.by || t('certifications_v2.card.issuer')}</span>
      </div>
      <CertificateVisual image={item.img} index={index} title={item.title} />
      <div className={styles.cardCopy}>
        <h3>{item.title}</h3>
        {item.by && <span className={styles.cardIssuer}>{item.by}</span>}
        <p>{item.description}</p>
        <span className={styles.cardAction}>
          <span>
            {hasLink
              ? t('certifications_v2.card.verify')
              : t('certifications_v2.card.unavailable')}
          </span>
          <b aria-hidden="true">
            {hasLink ? <ArrowUpRight /> : <span>—</span>}
          </b>
        </span>
      </div>
    </>
  );

  if (!hasLink) {
    return <article className={className}>{content}</article>;
  }

  const url = resolveCertificationUrl(item.to!, language);
  if (/^https?:\/\//i.test(url)) {
    return (
      <a className={className} href={url} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={url}>
      {content}
    </Link>
  );
}

function LoadingCards() {
  return (
    <div className={styles.loadingGrid}>
      {Array.from({ length: 6 }, (_, index) => (
        <div aria-hidden="true" className={styles.loadingCard} key={index}>
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

export default function Certifications() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const routeLanguage = pathname.split('/').filter(Boolean)[0] ?? '';
  const language = isSupportedLanguage(routeLanguage) ? routeLanguage : 'en';
  const [items, setItems] = useState<CertificationItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const fetchCertifications = useCallback(async () => {
    setLoadState('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/json/certifications`,
        {
          headers: { 'ngrok-skip-browser-warning': 'true' },
          signal: controller.signal,
        }
      );
      if (!response.ok) throw new Error('Certification feed is unavailable');

      const data: unknown = await response.json();
      const nextItems = Array.isArray(data)
        ? (data as CertificationItem[])
        : [];
      setItems(nextItems);
      setLoadState(nextItems.length > 0 ? 'ready' : 'empty');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching certification data:', error);
      }
      setItems([]);
      setLoadState('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    void fetchCertifications();
  }, [fetchCertifications]);

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: t('certifications_v2.hero.title') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span>{t('certifications_v2.hero.eyebrow')}</span>
            <h1>{t('certifications_v2.hero.title')}</h1>
            <p>{t('certifications_v2.hero.summary')}</p>
          </div>
        </header>

        <section
          aria-labelledby="certifications-list-title"
          className={styles.credentials}
        >
          <div className={styles.sectionHeading}>
            <div>
              <span>{t('certifications_v2.list.eyebrow')}</span>
              <h2 id="certifications-list-title">
                {t('certifications_v2.list.title')}
              </h2>
            </div>
            <span className={styles.count}>
              {t('certifications_v2.list.count', { count: items.length })}
            </span>
          </div>

          {loadState === 'loading' && <LoadingCards />}

          {loadState === 'ready' && (
            <div className={styles.grid}>
              {items.map((item, index) => (
                <CertificationCard
                  index={index}
                  item={item}
                  key={`${item.title}-${item.by}-${index}`}
                  language={language}
                />
              ))}
            </div>
          )}

          {(loadState === 'empty' || loadState === 'error') && (
            <div className={styles.emptyState}>
              <div>
                <span>
                  {loadState === 'error'
                    ? t('certifications_v2.error.eyebrow')
                    : t('certifications_v2.empty.eyebrow')}
                </span>
                <h3>
                  {loadState === 'error'
                    ? t('certifications_v2.error.title')
                    : t('certifications_v2.empty.title')}
                </h3>
                <p>
                  {loadState === 'error'
                    ? t('certifications_v2.error.description')
                    : t('certifications_v2.empty.description')}
                </p>
              </div>
              <div className={styles.emptyActions}>
                {loadState === 'error' && (
                  <button
                    onClick={() => void fetchCertifications()}
                    type="button"
                  >
                    {t('certifications_v2.error.retry')} ↻
                  </button>
                )}
                <Link to={`/${language}/portfolio`}>
                  {t('certifications_v2.empty.portfolio')}
                  <ArrowUpRight />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer type="2" />
    </>
  );
}
