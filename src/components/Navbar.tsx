import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './Button';
import Icon from './Icon';
import { useTheme } from './ThemeContext'; // Make sure this path matches where your ThemeContext is located

const LangSelect: React.FC<{ onClose: () => void; }> = ({ onClose }) => (
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

  const { t, i18n: { language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
    }
  }, [lang, i18n]);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ro' : 'en';
    setCurrentLanguage(newLanguage);
    navigate(`/${newLanguage}`);
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
  const toggleLang = () => setShowPopup(!showLangPopup);

  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-brand">
          <img
            className="nav-brand-img"
            src={`images/${isDarkMode ? 'logo_light.svg' : 'logo.svg'}`}
            alt="Cristian Brinza"
          />
        </a>
        <button className="menu-icon" onClick={toggleMenuVisibility}>
          <Icon type="menu" size="30" />
        </button>
        <div className={`nav-items ${isMenuVisible ? 'visible' : ''}`}>
          <a onClick={handleChangeLanguage}>{currentLanguage === 'en' ? 'en' : 'ro'}</a>
          <a onClick={toggleMode}>

            <Icon type={isDarkMode ? 'dark_mode' : 'light_mode'} stroke="var(--primary)" />

          </a>
          <a href="/about">
            {t('navbar.blog')}
          </a>
          <a href="/services">
            {t('navbar.about')}
          </a>
          <Button color="var(--secondary)" bgcolor="var(--primary)">
            {t('navbar.contact')}
          </Button>
          <Button border="var(--primary)">
            {t('navbar.work')}
          </Button>
        </div>
      </nav>
      {showLangPopup && <LangSelect onClose={toggleLang} />}
    </>
  );
};

export default Navbar;
