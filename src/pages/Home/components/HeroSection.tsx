import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Home.module.css';
import BrandMark from './BrandMark';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroMeta} data-home-reveal>
        <div>
          <p className={styles.availability}>
            <i aria-hidden="true" /> {t('home_v2.hero.available')}
          </p>
          <p>{t('home_v2.hero.location')}</p>
        </div>
        <p className={styles.heroSummary}>{t('home_v2.hero.summary')}</p>
      </div>

      <div aria-hidden="true" className={styles.orbit} data-home-parallax="14">
        <svg viewBox="0 0 110 110">
          <defs>
            <path
              id="hero-orbit"
              d="M55 55m-42 0a42 42 0 1184 0 42 42 0 11-84 0"
            />
          </defs>
          <text>
            <textPath href="#hero-orbit">
              DESIGN · CODE · CRAFT · DETAIL ·{' '}
            </textPath>
          </text>
        </svg>
        <span>✦</span>
      </div>

      <h1 className={styles.heroTitle}>
        <span className={styles.heroHello} data-home-reveal>
          <i aria-hidden="true" />({t('home_v2.hero.hello')})
        </span>
        <span data-home-reveal>CRISTIAN</span>
        <span className={styles.outlinedName} data-home-reveal>
          BRINZA <BrandMark className={styles.heroMark} />
        </span>
      </h1>

      <div className={styles.heroBottom}>
        <div className={styles.heroIntro}>
          <p className={styles.roles} data-home-reveal>
            <b>✦</b> {t('home_v2.hero.roles.design')} <span>/</span>{' '}
            {t('home_v2.hero.roles.development')} <span>/</span>{' '}
            {t('home_v2.hero.roles.problem')}
          </p>
          <div
            className={styles.heroActions}
            data-home-reveal
            style={{ '--delay': '620ms' } as CSSProperties}
          >
            <a className={styles.heroCta} data-magnetic="" href="/portfolio">
              {t('home_v2.hero.explore')} <span aria-hidden="true">↗</span>
            </a>
            <a
              className={styles.heroHelloLink}
              href="mailto:inbox.cristian.brinza@gmail.com"
            >
              {t('home_v2.hero.say_hello')} ↗
            </a>
          </div>
        </div>
        <p className={styles.figureCaption} data-home-reveal>
          {t('home_v2.hero.figure')}
          <br />
          {t('home_v2.hero.study')}
        </p>
        <a className={styles.scrollCue} data-home-reveal href="#work">
          {t('home_v2.hero.scroll')} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
