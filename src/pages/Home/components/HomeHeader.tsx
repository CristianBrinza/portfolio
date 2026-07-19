import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { HomeTheme } from '../Home';
import styles from '../Home.module.css';
import BrandMark from './BrandMark';
import { ThemeIcon } from './HomeIcons';

interface HomeHeaderProps {
  theme: HomeTheme;
  onToggleTheme: () => void;
}

const languages = ['en', 'ro', 'ru'] as const;

export default function HomeHeader({ theme, onToggleTheme }: HomeHeaderProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrolled, setScrolled] = useState(
    () =>
      window.scrollY > 24 ||
      (window.location.hash !== '' && window.location.hash !== '#hero')
  );
  const [activeSection, setActiveSection] = useState(() => {
    const section = window.location.hash.slice(1);
    return ['hero', 'work', 'about', 'services', 'contact'].includes(section)
      ? section
      : 'hero';
  });
  const currentLanguage = languages.includes(
    i18n.resolvedLanguage as (typeof languages)[number]
  )
    ? (i18n.resolvedLanguage as (typeof languages)[number])
    : 'en';

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  const lastScrollY = useRef(window.scrollY);
  useEffect(() => {
    const updateHeader = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current + 4;
      const goingUp = y < lastScrollY.current - 4;

      setScrolled(y > 24);
      if (menuOpen || y <= 320 || goingUp) {
        setHeaderHidden(false);
      } else if (goingDown && y > 320) {
        setHeaderHidden(true);
      }
      if (goingDown || goingUp) lastScrollY.current = y;
    };

    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateHeader();
      });
    };

    updateHeader();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('hashchange', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
    };
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = ['hero', 'work', 'about', 'services', 'contact'];
    const updateActiveSection = () => {
      const focusLine = window.innerHeight * 0.42;
      let current = 'hero';

      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= focusLine) {
          current = id;
        }
      });

      setActiveSection(current);
    };
    const updateFromHash = () => {
      const section = window.location.hash.slice(1);
      if (sectionIds.includes(section)) setActiveSection(section);
    };

    if (window.location.hash) {
      updateFromHash();
    } else {
      updateActiveSection();
    }
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    window.addEventListener('hashchange', updateFromHash);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      window.removeEventListener('hashchange', updateFromHash);
    };
  }, []);

  const changeLanguage = (language: string) => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (languages.includes(parts[0] as (typeof languages)[number])) {
      parts[0] = language;
    } else {
      parts.unshift(language);
    }
    void i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    navigate(
      `/${parts.join('/')}${location.pathname.endsWith('/') ? '/' : ''}`
    );
  };

  const closeMenu = () => setMenuOpen(false);
  const menuItems = [
    ['#work', 'home_v2.nav.work'],
    ['#about', 'home_v2.nav.about'],
    ['#services', 'home_v2.nav.services'],
    ['#contact', 'home_v2.nav.contact'],
  ];
  const sectionItems = [['#hero', 'home_v2.nav.intro'], ...menuItems];

  return (
    <>
      <header
        className={styles.header}
        data-hidden={headerHidden}
        data-scrolled={scrolled}
      >
        <Link
          className={styles.brand}
          data-magnetic=""
          to={`/${currentLanguage}/`}
        >
          <BrandMark className={styles.brandMark} />
          <span>Cristian Brinza</span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={t('home_v2.nav.primary')}
        >
          {[
            ['#work', 'home_v2.nav.work_short'],
            ['#about', 'home_v2.nav.about_short'],
            ['#services', 'home_v2.nav.services'],
          ].map(([href, label]) => (
            <a key={href} href={href}>
              {t(label)}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.headerToggles}>
            <label className={styles.languageControl}>
              <span className={styles.srOnly}>{t('home_v2.nav.language')}</span>
              <select
                aria-label={t('home_v2.nav.language')}
                onChange={event => changeLanguage(event.target.value)}
                value={currentLanguage}
              >
                {languages.map(language => (
                  <option key={language} value={language}>
                    {language.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <button
              aria-label={t('home_v2.nav.theme', {
                theme: t(`home_v2.nav.${theme === 'light' ? 'dark' : 'light'}`),
              })}
              className={styles.iconButton}
              data-magnetic=""
              onClick={onToggleTheme}
              type="button"
            >
              <ThemeIcon className={styles.themeIcon} dark={theme === 'dark'} />
            </button>
          </div>
          <button
            aria-expanded={menuOpen}
            aria-label={t(menuOpen ? 'home_v2.nav.close' : 'home_v2.nav.menu')}
            className={styles.menuButton}
            data-magnetic=""
            onClick={() => {
              setHeaderHidden(false);
              setMenuOpen(open => !open);
            }}
            type="button"
          >
            <span>
              {t(menuOpen ? 'home_v2.nav.close' : 'home_v2.nav.menu')}
            </span>
            <span className={styles.menuGlyph} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={styles.menuOverlay}
        data-open={menuOpen}
      >
        <div className={styles.menuEyebrow}>{t('home_v2.nav.navigation')}</div>
        <nav aria-label={t('home_v2.nav.menu')}>
          {menuItems.map(([href, label]) => (
            <a href={href} key={href} onClick={closeMenu}>
              {t(label)}
            </a>
          ))}
        </nav>
        <div className={styles.menuSocials}>
          <a href="https://github.com/CristianBrinza">GitHub</a>
          <a href="https://www.linkedin.com/in/cristianbrinza/">LinkedIn</a>
          <a href="https://www.instagram.com/brinza_cristian/">Instagram</a>
          <a href="https://t.me/CristianBrinza">Telegram</a>
        </div>
        <div
          aria-label={t('home_v2.nav.language')}
          className={styles.menuLanguages}
          role="group"
        >
          {languages.map(language => (
            <button
              aria-pressed={currentLanguage === language}
              key={language}
              onClick={() => changeLanguage(language)}
              type="button"
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <nav
        className={styles.sectionIndex}
        aria-label={t('home_v2.nav.sections')}
      >
        {sectionItems.map(([href, label]) => (
          <a
            aria-current={
              activeSection === href.slice(1) ? 'location' : undefined
            }
            data-active={activeSection === href.slice(1)}
            href={href}
            key={href}
            onClick={() => {
              setActiveSection(href.slice(1));
              setScrolled(href !== '#hero');
            }}
          >
            <span>{t(label)}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
    </>
  );
}
