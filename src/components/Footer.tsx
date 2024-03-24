import React from 'react';
import '../styles/Footer.css';
import Button from './Button';
import Icon from './Icon';
import { useTheme } from './ThemeContext.tsx';
import {useTranslation} from "react-i18next";

const Footer: React.FC = () => {
    const { t, i18n: {} } = useTranslation();

    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This triggers the smooth scrolling
    });
  };
  const { isDarkMode } = useTheme(); // Use the theme context
  return (
    <div className="footer">
      <div className="footer_block ">
        <div className="page footer_block_insde">
          <div className="footer_left">
            <img
              className="footer_logo"
              src={`images/${isDarkMode ? 'logo.svg' : 'logo_light.svg'}`}
              alt="Cristian Brinza"
            />
            <div className="footer_subtext">
                {t('footer.hope_you_liked')}
            </div>
            <div>
              {t('footer.my_social')}
            </div>
            <div className="footer_social">
              <Icon type="facebook" />
              <Icon type="instagram" />
              <Icon type="lenkedin" />
            </div>
          </div>
          <div className="footer_right">
            <div className="footer_right_menu">
              <div className="footer_right_title">
                Personal
              </div>
              <div className="footer_right_submenu">
                Resume
              </div>
              <div className="footer_right_submenu">
                  {t('footer.work')}
              </div>
              <div className="footer_right_submenu">
                  {t('footer.about')}
              </div>
              <div className="footer_right_submenu">
                Contact
              </div>
            </div>
            <div className="footer_right_menu">
              <div className="footer_right_title">
                  {t('footer.services')}
              </div>
              <div className="footer_right_submenu">
                Front-end
              </div>
              <div className="footer_right_submenu">
                Back-end
              </div>
              <div className="footer_right_submenu">
                Design
              </div>
            </div>
            <div className="footer_right_menu">
              <div className="footer_right_title">
                  {t('footer.other')}
              </div>
              <div className="footer_right_submenu">
                Legal
              </div>

            </div>
          </div>
        </div>

      </div>
      {/* Add the onClick event handler to the Button */}
      <Button onClick={scrollToTop}>
          {t('footer.top')}
        <Icon type="arrow_up" stroke="var(--primary)" />
      </Button>

      <div className="footer_copyright">
        <Icon type="copyright" stroke="var(--primary)" />
            &nbsp;&nbsp;2024 Copyright
        <span className="footer_copyright_light">
          &nbsp;by&nbsp;
        </span>
        Cristian Brinza
      </div>
    </div>
  );
};

export default Footer;
