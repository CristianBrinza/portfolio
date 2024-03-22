import React from 'react';
import '../styles/Footer.css';
import Button from './Button';
import Icon from './Icon';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This triggers the smooth scrolling
    });
  };

  return (
    <div className="footer">
      <div className="footer_block ">
        <div className="page footer_block_insde">
          <div className="footer_left">
            <img className="footer_logo" src="images/logo_light.svg" alt="CristianBrinza" />
            <div className="footer_subtext">Hope you liked my portfolio website. Feel free to suggest improvements or just to chat.
            </div>
          </div>
        </div>
      </div>
      {/* Add the onClick event handler to the Button */}
      <Button onClick={scrollToTop}>
        Back to top
        <Icon type="arrow_up" />
      </Button>

      <div className="footer_copyright">
        <Icon type="copyright" />
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
