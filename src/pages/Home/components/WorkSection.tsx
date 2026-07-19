import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Home.module.css';
import InfiniteMarquee from './InfiniteMarquee';

const stats = [
  [5, 'home_v2.stats.years'],
  [40, 'home_v2.stats.projects'],
  [20, 'home_v2.stats.technologies'],
  [12, 'home_v2.stats.certifications'],
] as const;

function StatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reducedMotion) {
      setCounts(stats.map(([target]) => target));
      return;
    }

    const frames: number[] = [];
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCounts(stats.map(([target]) => Math.round(target * eased)));
          if (progress < 1) frames.push(window.requestAnimationFrame(tick));
        };
        frames.push(window.requestAnimationFrame(tick));
        observer.disconnect();
      },
      { threshold: 0.6 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      frames.forEach(frame => window.cancelAnimationFrame(frame));
    };
  }, []);

  return (
    <section
      aria-label={t('home_v2.stats.label')}
      className={styles.stats}
      id="work"
      ref={sectionRef}
    >
      {stats.map(([target, label], index) => (
        <div
          data-home-reveal
          key={label}
          style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}
        >
          <strong>
            {counts[index]}
            {counts[index] === target ? '+' : ''}
          </strong>
          <span>{t(label)}</span>
        </div>
      ))}
    </section>
  );
}
export default function WorkSection() {
  const { t } = useTranslation();
  const marquee = [
    t('home_v2.marquee.design'),
    t('home_v2.marquee.development'),
    t('home_v2.marquee.branding'),
    t('home_v2.marquee.interfaces'),
  ];

  return (
    <>
      <InfiniteMarquee items={marquee} />

      <StatsSection />
    </>
  );
}
