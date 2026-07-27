import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FeedbackMenu.module.css';

type FeedbackCategory = 'design' | 'usability' | 'work';
type FeedbackStatus = 'error' | 'idle' | 'sending' | 'success' | 'validation';

interface FeedbackMenuProps {
  revealOnScroll?: boolean;
}

const feedbackQuestions: Array<{
  entry: string;
  key: FeedbackCategory;
}> = [
  { entry: 'entry.332711705', key: 'design' },
  { entry: 'entry.856004240', key: 'usability' },
  { entry: 'entry.925523382', key: 'work' },
];

const defaultFeedbackFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScZVCkcivEwdGTllDruqjMkhsY3g4dFLFMbLdGmn2rwwDN70Q/formResponse';

export default function FeedbackMenu({
  revealOnScroll = false,
}: FeedbackMenuProps) {
  const { t } = useTranslation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTabVisible, setFeedbackTabVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState<Record<FeedbackCategory, number>>({
    design: 0,
    usability: 0,
    work: 0,
  });
  const [status, setStatus] = useState<FeedbackStatus>('idle');
  const dismissed = useRef(false);

  useEffect(() => {
    let revealReady = false;

    const updateFeedbackVisibility = () => {
      if (dismissed.current) return;
      setFeedbackTabVisible(
        revealReady &&
          (!revealOnScroll ||
            window.scrollY > Math.max(280, window.innerHeight * 0.55))
      );
    };

    const revealTimer = window.setTimeout(() => {
      revealReady = true;
      updateFeedbackVisibility();
    }, 3000);

    window.addEventListener('scroll', updateFeedbackVisibility, {
      passive: true,
    });
    window.addEventListener('resize', updateFeedbackVisibility);

    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener('scroll', updateFeedbackVisibility);
      window.removeEventListener('resize', updateFeedbackVisibility);
    };
  }, [revealOnScroll]);

  useEffect(() => {
    if (!feedbackOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismissed.current = true;
        setFeedbackOpen(false);
        setFeedbackTabVisible(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [feedbackOpen]);

  const dismissTab = () => {
    dismissed.current = true;
    setFeedbackTabVisible(false);
  };

  const openFeedback = () => {
    dismissTab();
    setStatus('idle');
    setFeedbackOpen(true);
  };

  const closeFeedback = () => {
    dismissTab();
    setFeedbackOpen(false);
  };

  const sendFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = feedback.trim();
    const hasAllRatings = feedbackQuestions.every(
      question => ratings[question.key] > 0
    );

    if (!message || !hasAllRatings) {
      setStatus('validation');
      return;
    }

    const formData = new URLSearchParams();
    feedbackQuestions.forEach(question => {
      formData.append(question.entry, ratings[question.key].toString());
    });
    formData.append('entry.1262297536', message);

    try {
      setStatus('sending');
      await fetch(
        import.meta.env.VITE_FEEDBACK_FORM || defaultFeedbackFormUrl,
        {
          body: formData.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          mode: 'no-cors',
        }
      );
      setFeedback('');
      setRatings({ design: 0, usability: 0, work: 0 });
      setStatus('success');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Google Forms feedback error:', error);
      }
      setStatus('error');
    }
  };

  return (
    <>
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
          {feedbackQuestions.map(question => (
            <fieldset className={styles.ratingField} key={question.key}>
              <legend>{t(`home_v2.feedback.questions.${question.key}`)}</legend>
              <div className={styles.ratingOptions}>
                {[1, 2, 3, 4, 5].map(value => (
                  <button
                    aria-label={t('home_v2.feedback.rating_label', { value })}
                    aria-pressed={ratings[question.key] === value}
                    key={value}
                    onClick={() => {
                      setRatings(current => ({
                        ...current,
                        [question.key]: value,
                      }));
                      setStatus('idle');
                    }}
                    type="button"
                  >
                    <span aria-hidden="true">★</span>
                    <small>{value}</small>
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          <label className={styles.srOnly} htmlFor="site-feedback">
            {t('home_v2.feedback.placeholder')}
          </label>
          <textarea
            id="site-feedback"
            onChange={event => {
              setFeedback(event.target.value);
              setStatus('idle');
            }}
            placeholder={t('home_v2.feedback.placeholder')}
            required
            rows={4}
            value={feedback}
          />
          {status === 'success' && (
            <p className={styles.successMessage} role="status">
              {t('home_v2.feedback.success')}
            </p>
          )}
          {(status === 'error' || status === 'validation') && (
            <p className={styles.errorMessage} role="alert">
              {t(
                status === 'validation'
                  ? 'home_v2.feedback.validation_error'
                  : 'home_v2.feedback.error'
              )}
            </p>
          )}
          <button
            className={styles.primaryButton}
            disabled={status === 'sending'}
            type="submit"
          >
            {status === 'sending'
              ? t('home_v2.feedback.sending')
              : t('home_v2.feedback.send')}
          </button>
        </form>
      </aside>
    </>
  );
}
