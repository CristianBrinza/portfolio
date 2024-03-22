import React, { useState } from 'react';
import '../styles/Navbar.css';
import Button from './Button';
import Icon from './Icon';

interface LangSelectProps {
  onClose: () => void;
}

const LangSelect: React.FC<LangSelectProps> = ({ onClose }) => {
  return (
    <div className="LangSelect_background" onClick={onClose}>
      <div className="LangSelect_container">
        <div className="LangSelect_close_btn" onClick={onClose}>
          <Icon type="close_ring" />
        </div>
        LangSelect_background
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showLangPopup, setShowPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          <a onClick={toggleLang}>en</a>
          <a onClick={toggleMode}>
            <img
              src={`images/icons/${isDarkMode ? 'dark_mode.svg' : 'light_mode.svg'}`}
              alt="mode"
            />
          </a>
          <a href="/about">Blog</a>
          <a href="/services">About me</a>
          <Button color="white" bgcolor="--primary">
            Contact me
          </Button>
          <Button border="--primary">My work</Button>
        </div>
      </nav>
      {showLangPopup && <LangSelect onClose={toggleLang} />}
    </>
  );
};

export default Navbar;
