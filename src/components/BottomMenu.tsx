import React, { useState, useEffect } from 'react';
import '../styles/BottomMenu.css';
import Button from './Button';

const BottomMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const scrollableHeight = totalHeight - viewportHeight;
    const threshold = scrollableHeight - 650; // The threshold for when the menu should disappear

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
          <Button color="--secondary" border="--primary" bgcolor="--primary">
            Portfolio
          </Button>
          <Button color="--primary" border="--secondary" bgcolor="--secondary">
            CV/Resume
          </Button>
        </div>
      </div>
  );
};

export default BottomMenu;
