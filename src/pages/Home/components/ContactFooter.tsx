import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Footer from '../../../components/Footer/Footer';
import styles from '../Home.module.css';
import { ArrowUpRight } from './HomeIcons';

const resources = [
  ['01', 'cv', 'cv'],
  ['02', 'portfolio', 'portfolio'],
  ['03', 'certifications', 'certifications'],
  ['04', 'github', 'https://github.com/CristianBrinza'],
  ['05', 'blog', 'blog'],
  ['06', 'utilities', 'utilities'],
];

export default function ContactFooter() {
  const { t, i18n } = useTranslation();
  const language = ['en', 'ro', 'ru'].includes(i18n.resolvedLanguage ?? '')
    ? i18n.resolvedLanguage
    : 'en';

  return (
    <>
      <section className={styles.resources} id="resources">
        <div className={styles.titleRow} data-home-reveal>
          <h2>{t('home_v2.resources.title')}</h2>
          <span>{t('home_v2.resources.eyebrow')}</span>
        </div>
        <div className={styles.resourceGrid}>
          {resources.map(([number, key, destination]) => {
            const content = (
              <>
                <div>
                  <span>({number})</span>
                  <ArrowUpRight />
                </div>
                <div>
                  <h3>{t(`home_v2.resources.${key}.title`)}</h3>
                  <p>{t(`home_v2.resources.${key}.description`)}</p>
                </div>
              </>
            );

            return destination.startsWith('http') ? (
              <a
                className={styles.resourceCard}
                data-home-reveal
                href={destination}
                key={key}
                rel="noreferrer"
                target="_blank"
              >
                {content}
              </a>
            ) : (
              <Link
                className={styles.resourceCard}
                data-home-reveal
                key={key}
                to={`/${language}/${destination}`}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <span data-home-reveal>{t('home_v2.contact.eyebrow')}</span>
        <a
          data-home-reveal
          data-magnetic=""
          href="mailto:inbox@cristianbrinza.com"
        >
          {t('home_v2.contact.title')}
        </a>
        <a
          className={styles.emailButton}
          data-home-reveal
          data-magnetic=""
          href="mailto:inbox@cristianbrinza.com"
        >
          inbox@cristianbrinza.com <ArrowUpRight />
        </a>
      </section>

      <Footer type="1" />
    </>
  );
}
