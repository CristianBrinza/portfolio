import React, { useState, useEffect } from 'react';
import '../styles/BottomMenu.css';
import Button from './Button.tsx';

const BottomMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    const viewportHeight = window.innerHeight;

    // Check if scrolled more than 100% of the viewport height
    if (offset > viewportHeight && !isVisible) {
      setIsVisible(true);
      console.log('aaaa');
    } else if (offset <= viewportHeight && isVisible) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // Apply both 'BottomMenu_fixed' and 'BottomMenu_visible' when isVisible is true to trigger the animation
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
