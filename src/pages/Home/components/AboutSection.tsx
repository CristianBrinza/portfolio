import { Trans, useTranslation } from 'react-i18next';
import styles from '../Home.module.css';

const stack = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Python',
  'Figma',
  'Tailwind',
  'Photoshop',
  'Illustrator',
  'Git',
  'PWA',
];

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className={styles.section} id="about">
      <div className={styles.aboutGrid}>
        <div data-home-reveal>
          <span className={styles.eyebrow}>{t('home_v2.about.eyebrow')}</span>
          <p className={styles.aboutLead}>
            <Trans
              components={{ accent: <em /> }}
              i18nKey="home_v2.about.lead"
            />
          </p>
          <p className={styles.aboutBody}>{t('home_v2.about.body')}</p>
        </div>
        <dl className={styles.aboutFacts} data-home-reveal>
          <div>
            <dt>{t('home_v2.about.based_label')}</dt>
            <dd>{t('home_v2.about.based')}</dd>
          </div>
          <div>
            <dt>{t('home_v2.about.education_label')}</dt>
            <dd>{t('home_v2.about.education')}</dd>
          </div>
          <div>
            <dt>{t('home_v2.about.languages_label')}</dt>
            <dd>{t('home_v2.about.languages')}</dd>
          </div>
        </dl>
      </div>

      <div className={styles.stack} data-home-reveal>
        <span className={styles.eyebrow}>{t('home_v2.about.stack')}</span>
        <div className={styles.chips}>
          {stack.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
