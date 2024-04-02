import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from './Icon';
import { useTheme } from './ThemeContext';

const LangSelect: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="LangSelect_background" onClick={onClose}>
    <div className="LangSelect_container">
      <div className="LangSelect_close_btn" onClick={onClose}>
        <Icon type="close_ring" />
      </div>
      LangSelect_background
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showLangPopup, setShowPopup] = useState(false);
  const { isDarkMode, toggleMode } = useTheme(); // Use the theme context

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLanguage);

    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts[0] === 'en' || pathParts[0] === 'ro') {
      pathParts[0] = newLanguage; // Replace the language part if it exists
    } else {
      pathParts.unshift(newLanguage); // Prepend the new language if it doesn't
    }
    navigate('/' + pathParts.join('/')); // Navigate to the updated path without changing the context
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
  const toggleLang = () => setShowPopup(!showLangPopup);

  return (
    <>
      <nav className="navbar">
        <Link className="nav-brand" to={`/${t('lang')}/`}>
          <img
            className="nav-brand-img"
            src={`images/${isDarkMode ? 'logo_light.svg' : 'logo.svg'}`}
            alt="Cristian Brinza"
          />
        </Link>
        <button className="menu-icon" onClick={toggleMenuVisibility}>
          <Icon type="menu" size="30" stroke="var(--primary)" />
        </button>
        <div className={`nav-items ${isMenuVisible ? 'visible' : ''}`}>
          <a onClick={handleChangeLanguage}>
            {i18n.language === 'en' ? 'en' : 'ro'}
          </a>
          <a onClick={toggleMode}>
            <Icon
              type={isDarkMode ? 'dark_mode' : 'light_mode'}
              stroke="var(--primary)"
            />
          </a>
          <Link to={`/${t('lang')}/blog`}>{t('navbar.blog')}</Link>
          <Link to={`/${t('lang')}/about`}>{t('navbar.about')}</Link>
          <Link to={`/${t('lang')}/contact`}>
            <Button color="var(--secondary)" bgcolor="var(--primary)">
              {t('navbar.contact')}
            </Button>
          </Link>
          <Link to={`/${t('lang')}/work`}>
            <Button border="var(--primary)">{t('navbar.work')}</Button>
          </Link>
        </div>
      </nav>
      {showLangPopup && <LangSelect onClose={toggleLang} />}
    </>
  );
};

export default Navbar;
