import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

let feedbackDismissedForPageLoad = false;

export default function ContactFooter() {
  const { t, i18n } = useTranslation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTabVisible, setFeedbackTabVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const language = ['en', 'ro', 'ru'].includes(i18n.resolvedLanguage ?? '')
    ? i18n.resolvedLanguage
    : 'en';

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      if (!feedbackDismissedForPageLoad) setFeedbackTabVisible(true);
    }, 3000);

    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!feedbackOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        feedbackDismissedForPageLoad = true;
        setFeedbackOpen(false);
        setFeedbackTabVisible(false);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [feedbackOpen]);

  const openFeedback = () => {
    feedbackDismissedForPageLoad = true;
    setFeedbackTabVisible(false);
    setFeedbackOpen(true);
  };

  const closeFeedback = () => {
    feedbackDismissedForPageLoad = true;
    setFeedbackOpen(false);
    setFeedbackTabVisible(false);
  };

  const sendFeedback = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = feedback.trim();
    if (!message) return;
    const subject = encodeURIComponent(t('home_v2.feedback.subject'));
    const body = encodeURIComponent(message);
    window.location.href = `mailto:inbox.cristian.brinza@gmail.com?subject=${subject}&body=${body}`;
    setFeedback('');
    closeFeedback();
  };

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
          href="mailto:inbox.cristian.brinza@gmail.com"
        >
          {t('home_v2.contact.title')}
        </a>
        <a
          className={styles.emailButton}
          data-home-reveal
          data-magnetic=""
          href="mailto:inbox.cristian.brinza@gmail.com"
        >
          inbox@cristianbrinza.com <ArrowUpRight />
        </a>
      </section>

      <Footer type="1" />

      <button
        aria-hidden={!feedbackTabVisible}
        aria-expanded={feedbackOpen}
        className={styles.feedbackTab}
        data-visible={feedbackTabVisible}
        onClick={openFeedback}
        tabIndex={feedbackTabVisible ? 0 : -1}
        type="button"
      >
        {t('home_v2.feedback.tab')}
      </button>
      <aside
        aria-hidden={!feedbackOpen}
        aria-label={t('home_v2.feedback.title')}
        className={styles.feedbackPanel}
        data-open={feedbackOpen}
      >
        <div className={styles.feedbackHeader}>
          <span>{t('home_v2.feedback.title')}</span>
          <button
            aria-label={t('home_v2.feedback.close')}
            onClick={closeFeedback}
            type="button"
          >
            ×
          </button>
        </div>
        <p>{t('home_v2.feedback.description')}</p>
        <form onSubmit={sendFeedback}>
          <label className={styles.srOnly} htmlFor="home-feedback">
            {t('home_v2.feedback.placeholder')}
          </label>
          <textarea
            id="home-feedback"
            onChange={event => setFeedback(event.target.value)}
            placeholder={t('home_v2.feedback.placeholder')}
            required
            rows={4}
            value={feedback}
          />
          <button
            className={styles.primaryButton}
            data-magnetic=""
            type="submit"
          >
            {t('home_v2.feedback.send')}
          </button>
        </form>
      </aside>
    </>
  );
}
