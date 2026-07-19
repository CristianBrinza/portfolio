import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../Home.module.css';
import { ArrowRight, ArrowUpRight } from './HomeIcons';

const services = [
  {
    index: '01',
    key: 'product',
    tags: ['Figma', 'Design Systems', 'Prototyping'],
  },
  {
    index: '02',
    key: 'frontend',
    tags: ['React', 'TypeScript', 'Motion'],
  },
  {
    index: '03',
    key: 'backend',
    tags: ['Node', 'Express', 'MongoDB'],
  },
  {
    index: '04',
    key: 'brand',
    tags: ['Logo', 'Identity', 'Art Direction'],
  },
];

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [pinnedRow, setPinnedRow] = useState<number | null>(null);
  const language = ['en', 'ro', 'ru'].includes(i18n.resolvedLanguage ?? '')
    ? i18n.resolvedLanguage
    : 'en';

  return (
    <section className={styles.section} id="services">
      <div className={styles.titleRow} data-home-reveal>
        <h2>{t('home_v2.services.title')}</h2>
        <span>{t('home_v2.services.eyebrow')}</span>
      </div>
      <div className={styles.workList}>
        {services.map((service, index) => {
          const expanded = pinnedRow === index || hoveredRow === index;
          const panelId = `service-row-${service.index}`;

          return (
            <article
              className={styles.workRow}
              data-cursor-grow
              data-expanded={expanded}
              data-home-reveal
              key={service.key}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <button
                aria-controls={panelId}
                aria-expanded={expanded}
                className={styles.workRowTrigger}
                onBlur={() => setHoveredRow(null)}
                onClick={() =>
                  setPinnedRow(current => (current === index ? null : index))
                }
                onFocus={() => setHoveredRow(index)}
                type="button"
              >
                <div className={styles.workRowHead}>
                  <span className={styles.workIndex}>({service.index})</span>
                  <h3>{t(`home_v2.services.${service.key}.title`)}</h3>
                  <div className={styles.workHeadTags}>
                    {service.tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ArrowRight className={styles.workArrow} />
                </div>
                <div className={styles.workDescription} id={panelId}>
                  <div className={styles.workDescriptionClip}>
                    <div className={styles.workDescriptionInner}>
                      <p>{t(`home_v2.services.${service.key}.description`)}</p>
                      <div className={styles.workTags}>
                        {service.tags.map(tag => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
      <Link className={styles.pillButton} to={`/${language}/portfolio`}>
        {t('home_v2.work.all')} <ArrowUpRight />
      </Link>
    </section>
  );
}
