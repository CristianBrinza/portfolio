// ScrollToTopLink.tsx
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const ScrollToTopLink: React.FC<LinkProps> = (props) => {
  const scrollToTopFast = () => {
    const duration = 200; // Duration in ms, adjust for faster or slower animation
    const start = window.pageYOffset;
    const change = -start;
    let startTime = performance.now();

    function animateScroll(timestamp: number) {
      // Specify type here
      const time = timestamp - startTime;
      const percent = Math.min(time / duration, 1);

      window.scrollTo(0, start + change * percent);

      if (time < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    }

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <Link {...props} onClick={scrollToTopFast}>
      {props.children}
    </Link>
  );
};

export default ScrollToTopLink;
