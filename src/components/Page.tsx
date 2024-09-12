//components/Page.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageProps {
  gap?: string;
  className?: string;
  children?: React.ReactNode;
  minHeight?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Page: React.FC<PageProps> = ({
  gap,
  className = '',
  children,
  minHeight = '55vh',
  style,
  id,
}) => {
  const location = useLocation(); // Get the current location object

  const pageStyle: React.CSSProperties = {
    gap: gap,
    minHeight: minHeight,
    ...style,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      // If there's a saved scroll position, restore it
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    } else {
      // Scroll to top on initial load
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id={id} className={`${className} main`} style={pageStyle}>
      {children}
    </div>
  );
};

export default Page;
