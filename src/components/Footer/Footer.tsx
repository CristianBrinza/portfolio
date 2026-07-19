import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';
import { openConsentSettings } from '../../utils/consent';

export type FooterType = '1' | '2';

interface FooterProps {
  button?: boolean;
  copyright?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: FooterType;
}

const socialLinks = [
  ['GitHub', 'https://github.com/BrinzaCristian'],
  ['LinkedIn', 'https://www.linkedin.com/in/cristianbrinza/'],
  ['Instagram', 'https://www.instagram.com/brinza_cristian/'],
  ['X', 'https://x.com/cristian_brinza'],
  ['Telegram', 'https://t.me/CristianBrinza'],
] as const;

function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 56">
      <rect width="56" height="56" fill="#e40523" />
      <path
        d="M26.8802 18.48C26.8802 18.48 26.3183 18.48 14.7994 18.48C3.28037 18.4799 3.28047 37.52 14.7994 37.52C26.3182 37.52 26.8802 37.52 26.8802 37.52"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M29.6804 18.48C29.6804 18.48 30.2422 18.4801 41.7612 18.48C53.2802 18.48 53.2801 37.52 41.7612 37.52C30.2423 37.52 29.6804 37.52 29.6804 37.52"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M32.4807 28.0001C32.4807 28.0001 33.0425 28.0001 44.5615 28.0001"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
      <path
        d="M31.8008 21.9596C31.8008 21.9596 31.8007 22.5214 31.8008 34.0404"
        fill="none"
        stroke="white"
        strokeWidth="3.92"
      />
    </svg>
  );
}

const Footer: React.FC<FooterProps> = ({
  button = true,
  copyright = true,
  style,
  className = '',
  type = '2',
}) => {
  const { t, i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;
  const language = ['en', 'ro', 'ru'].includes(activeLanguage)
    ? activeLanguage
    : 'en';

  return (
    <footer
      className={`siteFooter siteFooter--type${type} ${className}`.trim()}
      data-footer-type={type}
      style={style}
    >
      <div className="siteFooter_top">
        <Link className="siteFooter_brand" to={`/${language}/`}>
          <BrandMark />
          <span>Cristian Brinza</span>
        </Link>

        <nav
          aria-label={t('home_v2.footer.social')}
          className="siteFooter_socials"
        >
          {socialLinks.map(([label, url]) => (
            <a href={url} key={label} rel="noreferrer" target="_blank">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="siteFooter_bottom">
        <div className="siteFooter_meta">
          <nav
            aria-label={t('home_v2.footer.legal')}
            className="siteFooter_legal"
          >
            <Link to={`/${language}/utilities`}>
              {t('home_v2.resources.utilities.title')} →
            </Link>
            <Link to={`/${language}/legal`}>{t('home_v2.footer.legal')} →</Link>
            <button
              className="siteFooter_cookieSettings"
              onClick={openConsentSettings}
              type="button"
            >
              {t('cookie_consent.manage')} →
            </button>
          </nav>

          {copyright && (
            <span>© {new Date().getFullYear()} Cristian Brinza</span>
          )}
        </div>

        {button && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            {t('home_v2.footer.top')} ↑
          </button>
        )}

        <span>{t('home_v2.footer.location')}</span>
      </div>
    </footer>
  );
};

export default Footer;
