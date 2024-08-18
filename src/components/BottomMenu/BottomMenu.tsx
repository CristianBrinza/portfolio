import React, { useState, useEffect } from 'react';
import './BottomMenu.css';
import Button from '../Button.tsx';

const BottomMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollableHeight = totalHeight - viewportHeight;
    const threshold = scrollableHeight - 350; // The threshold for when the menu should disappear

    // Check if scrolled more than 100% of the viewport height and less than the threshold
    if (offset > viewportHeight && offset < threshold && !isVisible) {
      setIsVisible(true);
    } else if ((offset <= viewportHeight || offset >= threshold) && isVisible) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div
      className={`BottomMenu_container ${isVisible ? 'BottomMenu_fixed BottomMenu_visible' : ''}`}
    >
      <div className="BottomMenu_toggle">
        <Button
            to="work"
          color="var(--theme_primary_color_white)"
          bgcolor="var(--theme_primary_color_black)"
            border="transparent"
            hover_color="var(--theme_primary_color_black)"
        >
          Portfolio
        </Button>
        <Button
            to="/cv"
          color="var(--theme_primary_color_black)"
          border="transparent"
          bgcolor="var(--secondary)"
        >
          CV/Resume
        </Button>
      </div>
    </div>
  );
};

export default BottomMenu;
