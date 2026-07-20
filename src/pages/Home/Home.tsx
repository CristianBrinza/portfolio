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
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-home-reveal]')
    );
    const heroElements = elements.filter(element => element.closest('#hero'));
    const scrollElements = elements.filter(
      element => !element.closest('#hero')
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(element => element.classList.add(styles.visible));
      return;
    }

    let loadFrame = 0;
    let animationFrame = 0;
    loadFrame = window.requestAnimationFrame(() => {
      animationFrame = window.requestAnimationFrame(() => {
        heroElements.forEach(element => element.classList.add(styles.visible));
      });
    });

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

    scrollElements.forEach(element => observer.observe(element));
    return () => {
      window.cancelAnimationFrame(loadFrame);
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
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
