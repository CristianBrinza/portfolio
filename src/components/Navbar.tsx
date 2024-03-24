import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './Button';
import Icon from './Icon';

interface LangSelectProps {
  onClose: () => void;
}

const LangSelect: React.FC<LangSelectProps> = ({ onClose }) => (
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
  // Initialize isDarkMode from localStorage if available, else default to false
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    // Update the CSS variables in the :root element
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--primary', '#FFF');
      root.style.setProperty('--secondary', '#222222');
      localStorage.setItem('theme', 'dark'); // Save theme preference to localStorage
    } else {
      root.style.setProperty('--primary', '#222222');
      root.style.setProperty('--secondary', '#FFF');
      localStorage.setItem('theme', 'light'); // Save theme preference to localStorage
    }
  }, [isDarkMode]);

  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Ensure the i18next language is updated based on URL change
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      setCurrentLanguage(lang); // Update state to reflect current language
    }
  }, [lang, i18n]);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ro' : 'en';
    setCurrentLanguage(newLanguage);
    navigate(`/${newLanguage}`);
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
  const toggleLang = () => setShowPopup(!showLangPopup);
  const toggleMode = () => setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Also save the new mode to localStorage
    return newMode;
  });
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
          <Icon type="menu" size="30"/>
        </button>
        <div className={`nav-items ${isMenuVisible ? 'visible' : ''}`}>
          <a onClick={handleChangeLanguage}>{currentLanguage === 'en' ? 'en' : 'ro'}</a>
          <a onClick={toggleMode}>

            <Icon type={isDarkMode ? 'dark_mode' : 'light_mode'} stroke="var(--primary)"/>

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
