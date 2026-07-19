import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AboutSection from './components/AboutSection';
import ContactFooter from './components/ContactFooter';
import HeroSection from './components/HeroSection';
import HomeCursor from './components/HomeCursor';
import HomeHeader from './components/HomeHeader';
import ServicesSection from './components/ServicesSection';
import WorkSection from './components/WorkSection';
import styles from './Home.module.css';

export type HomeTheme = 'light' | 'dark';

export default function Home() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState<HomeTheme>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.classList.toggle('dark-mode', theme === 'dark');
    root.style.colorScheme = theme;
    root.style.scrollBehavior = 'smooth';
    localStorage.setItem('theme', theme);
    return () => {
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [theme]);

  useEffect(() => {
    const language = (i18n.resolvedLanguage ?? i18n.language ?? 'en')
      .split('-')[0]
      .toLowerCase();
    document.documentElement.lang = ['en', 'ro', 'ru'].includes(language)
      ? language
      : 'en';
    document.title = `Cristian Brinza — ${i18n.t('home_v2.meta_title')}`;
  }, [i18n, i18n.language]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-home-reveal]')
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(element => element.classList.add(styles.visible));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root} data-theme={theme}>
      <HomeCursor />
      <a className={styles.skipLink} href="#main-content">
        {i18n.t('home_v2.nav.skip')}
      </a>
      <HomeHeader
        theme={theme}
        onToggleTheme={() =>
          setTheme(current => (current === 'light' ? 'dark' : 'light'))
        }
      />
      <main id="main-content">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ServicesSection />
      </main>
      <ContactFooter />
    </div>
  );
}
