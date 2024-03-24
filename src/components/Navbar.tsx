import React, {useEffect, useState} from 'react';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    // Update the CSS variables in the :root element
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--primary', '#FFF');
      root.style.setProperty('--secondary', '#222222');
    } else {
      root.style.setProperty('--primary', '#222222');
      root.style.setProperty('--secondary', '#FFF');
    }
  }, [isDarkMode]); // Depend on isDarkMode to re-run this effect

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ro' : 'en';
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);
  const toggleLang = () => setShowPopup(!showLangPopup);
  const toggleMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-brand">
          <img
            className="nav-brand-img"
            src="images/logo.svg"
            alt="Cristian Brinza"
          />
        </a>
        <button className="menu-icon" onClick={toggleMenuVisibility}>
          <Icon type="menu" size="30" />
        </button>
        <div className={`nav-items ${isMenuVisible ? 'visible' : ''}`}>
          <a onClick={handleChangeLanguage}>{currentLanguage === 'en' ? 'ro' : 'en'}</a>
          <a onClick={toggleMode}>
            <img
              src={`images/icons/${isDarkMode ? 'dark_mode.svg' : 'light_mode.svg'}`}
              alt="mode"
            />
          </a>
          <a href="/about"> {t('navbar.blog')}</a>
          <a href="/services"> {t('navbar.about')}</a>
          <Button color="--secondary" bgcolor="--primary">
            {t('navbar.contact')}
          </Button>
          <Button border="--primary"> {t('navbar.work')}</Button>
        </div>
      </nav>
      {showLangPopup && <LangSelect onClose={toggleLang} />}
    </>
  );
};

export default Navbar;
