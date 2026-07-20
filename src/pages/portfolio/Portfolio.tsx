import {
  CSSProperties,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import FeedbackMenu from '../../components/FeedbackMenu/FeedbackMenu.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import styles from './Portfolio.module.css';

type DisciplineKey = 'design' | 'frontend' | 'backend';

const disciplines: Array<{
  key: DisciplineKey;
  number: string;
  path: string;
  tags: string[];
}> = [
  {
    key: 'design',
    number: '01',
    path: 'portfolio/design',
    tags: ['Figma', 'UX / UI', 'Systems'],
  },
  {
    key: 'frontend',
    number: '02',
    path: 'portfolio/front-end',
    tags: ['React', 'TypeScript', 'Motion'],
  },
  {
    key: 'backend',
    number: '03',
    path: 'portfolio/back-end',
    tags: ['Node', 'APIs', 'Data'],
  },
];

function PortfolioMarquee({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);
  const [distance, setDistance] = useState(1);
  const itemsKey = items.join('|');

  useLayoutEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    const update = () => {
      const groupWidth = group.getBoundingClientRect().width;
      if (groupWidth <= 0) return;
      setDistance(groupWidth);
      setCopies(Math.max(3, Math.ceil(container.clientWidth / groupWidth) + 2));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(group);
    document.fonts.ready.then(update).catch(() => undefined);

    return () => observer.disconnect();
  }, [itemsKey]);

  return (
    <div aria-hidden="true" className={styles.marquee} ref={containerRef}>
      <div
        className={styles.marqueeTrack}
        style={{ '--marquee-distance': `${distance}px` } as CSSProperties}
      >
        {Array.from({ length: copies }, (_, copyIndex) => (
          <div
            className={styles.marqueeGroup}
            key={copyIndex}
            ref={copyIndex === 0 ? groupRef : undefined}
          >
            {items.map(item => (
              <span key={item}>
                {item} <b>✦</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DisciplineVisual({ type }: { type: DisciplineKey }) {
  if (type === 'design') {
    return (
      <div aria-hidden="true" className={styles.designVisual}>
        <div className={styles.designGrid} />
        <span className={styles.designType}>Aa</span>
        <i className={styles.designCircle} />
        <i className={styles.designSquare} />
        <small>08 / 24 / 48</small>
      </div>
    );
  }

  if (type === 'frontend') {
    return (
      <div aria-hidden="true" className={styles.frontendVisual}>
        <div className={styles.browserBar}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.codeLine} />
        <div className={styles.codeLine} />
        <div className={styles.codeLine} />
        <div className={styles.interfaceCard}>
          <span />
          <strong>↗</strong>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={styles.backendVisual}>
      <svg viewBox="0 0 500 280">
        <path d="M88 140h104M308 140h104M250 70v140" />
        <path className={styles.backendPulse} d="M88 140h324" />
        <circle cx="70" cy="140" r="18" />
        <circle cx="250" cy="52" r="18" />
        <circle cx="250" cy="228" r="18" />
        <circle cx="430" cy="140" r="18" />
        <rect height="78" rx="4" width="116" x="192" y="101" />
      </svg>
      <span>API</span>
      <small>200 / OK</small>
    </div>
  );
}

export default function Portfolio() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const routeLanguage = location.pathname.split('/')[1];
  const activeLanguage = ['en', 'ro', 'ru'].includes(routeLanguage)
    ? routeLanguage
    : i18n.resolvedLanguage;
  const language = ['en', 'ro', 'ru'].includes(activeLanguage ?? '')
    ? activeLanguage
    : 'en';
  const marqueeItems = useMemo(
    () => [
      t('portfolio_v2.marquee.design'),
      t('portfolio_v2.marquee.engineering'),
      t('portfolio_v2.marquee.motion'),
      t('portfolio_v2.marquee.systems'),
    ],
    [t, i18n.resolvedLanguage]
  );

  const breadcrumbItems = [
    { label: t('navigation.home'), url: `/${language}/` },
    { label: t('navigation.portfolio_page') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.portfolioPage} id="portfolio-page">
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              {t('portfolio_v2.hero.eyebrow')}
            </span>
            <h1>
              <span>{t('portfolio_v2.hero.line_one')}</span>
              <span className={styles.outlineText}>
                {t('portfolio_v2.hero.line_two')}
              </span>
              <span>{t('portfolio_v2.hero.line_three')}</span>
            </h1>

            <div className={styles.heroSummary}>
              <p>{t('portfolio_v2.hero.summary')}</p>
              <div className={styles.heroStats}>
                <div>
                  <strong>03</strong>
                  <span>{t('portfolio_v2.hero.disciplines')}</span>
                </div>
                <div>
                  <strong>40+</strong>
                  <span>{t('portfolio_v2.hero.projects')}</span>
                </div>
                <div>
                  <strong>05+</strong>
                  <span>{t('portfolio_v2.hero.years')}</span>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className={styles.heroVisual}>
            <span className={styles.figureIndex}>( Fig. 01 )</span>
            <svg viewBox="0 0 520 520">
              <circle
                className={styles.heroOrbitOuter}
                cx="260"
                cy="260"
                r="205"
              />
              <circle
                className={styles.heroOrbitInner}
                cx="260"
                cy="260"
                r="112"
              />
              <path d="M55 260h410M260 55v410" />
              <path className={styles.heroArc} d="M115 405 405 115" />
              <circle className={styles.heroDot} cx="260" cy="55" r="12" />
            </svg>
            <span className={styles.figureCaption}>
              {t('portfolio_v2.hero.figure')}
            </span>
          </div>
        </header>

        <PortfolioMarquee items={marqueeItems} />

        <section
          aria-labelledby="portfolio-disciplines-title"
          className={styles.disciplines}
        >
          <div className={styles.sectionHeading}>
            <div>
              <span>{t('portfolio_v2.disciplines.eyebrow')}</span>
              <h2 id="portfolio-disciplines-title">
                {t('portfolio_v2.disciplines.title')}
              </h2>
            </div>
            <p>{t('portfolio_v2.disciplines.description')}</p>
          </div>

          <div className={styles.disciplineGrid}>
            {disciplines.map(discipline => (
              <Link
                className={`${styles.disciplineCard} ${
                  styles[`disciplineCard_${discipline.key}`]
                }`}
                key={discipline.key}
                to={`/${language}/${discipline.path}`}
              >
                <div className={styles.cardTopline}>
                  <span>({discipline.number})</span>
                  <span>{t('portfolio_v2.disciplines.open')} ↗</span>
                </div>

                <DisciplineVisual type={discipline.key} />

                <div className={styles.cardCopy}>
                  <h3>
                    {t(`portfolio_v2.disciplines.${discipline.key}.title`)}
                  </h3>
                  <p>
                    {t(
                      `portfolio_v2.disciplines.${discipline.key}.description`
                    )}
                  </p>
                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      {discipline.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className={styles.cardAction}>
                      <span>{t('portfolio_v2.disciplines.open')}</span>
                      <b aria-hidden="true">↗</b>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="portfolio-contact-title"
          className={styles.contact}
        >
          <span>{t('portfolio_v2.contact.eyebrow')}</span>
          <a href="mailto:inbox.cristian.brinza@gmail.com">
            <h2 id="portfolio-contact-title">
              {t('portfolio_v2.contact.title')}
            </h2>
            <b aria-hidden="true">↗</b>
          </a>
          <p>{t('portfolio_v2.contact.description')}</p>
        </section>

        <aside className={styles.note}>
          <span>( Note / 01 )</span>
          <p>{t('portfolio_v2.note')}</p>
        </aside>
      </main>

      <Footer type="2" />
      <FeedbackMenu />
    </>
  );
}
