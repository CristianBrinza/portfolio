import React from 'react';
import '../styles/Footer.css';
import Button from './Button';
import Icon from './Icon';
import { useTheme } from './ThemeContext.tsx';

const Footer: React.FC = () => {
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
                      Hope you liked my portfolio website. Feel free
                      to
                      suggest improvements or just to chat.
                  </div>
              </div>
              <div className="footer_right">
                  <div className='footer_right_menu'>
                      <div className='footer_right_title'>
                          Personal
                      </div>
                      <div className="footer_right_submenu">
                          Resume
                      </div>
                      <div className="footer_right_submenu">
                          My work
                      </div>
                      <div className="footer_right_submenu">
                          About
                      </div>
                  </div>
                  <div className='footer_right_menu'>
                      <div className='footer_right_title'>
                          Personal
                      </div>
                      <div className="footer_right_submenu">
                          Resume
                      </div>
                      <div className="footer_right_submenu">
                          My work
                      </div>
                      <div className="footer_right_submenu">
                          About
                      </div>
                  </div>
                  <div className='footer_right_menu'>
                      <div className='footer_right_title'>
                          Personal
                      </div>
                      <div className="footer_right_submenu">
                          Resume
                      </div>
                      <div className="footer_right_submenu">
                          My work
                      </div>
                      <div className="footer_right_submenu">
                          About
                      </div>
                  </div>
              </div>
          </div>


      </div>
        {/* Add the onClick event handler to the Button */}
        <Button onClick={scrollToTop}>
            Back to top
            <Icon type="arrow_up"/>
        </Button>

        <div className="footer_copyright">
            <Icon type="copyright"/>
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
