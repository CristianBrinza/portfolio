// components/Page.tsx
import React, { useEffect } from 'react';

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
  const pageStyle: React.CSSProperties = {
    gap: gap,
    minHeight: minHeight,
    ...style,
  };

  // useEffect(() => {
  //   const savedPositions = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
  //   const currentPath = location.pathname;
  //
  //   // On page load, restore scroll position for the current page
  //   if (savedPositions[currentPath]) {
  //     window.scrollTo(0, savedPositions[currentPath]);
  //   } else {
  //     // Scroll to top for new pages
  //     window.scrollTo(0, 0);
  //   }
  //
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;
  //     // Save the current scroll position for the current page
  //     const updatedPositions = {
  //       ...savedPositions,
  //       [currentPath]: currentScrollY,
  //     };
  //     sessionStorage.setItem('scrollPositions', JSON.stringify(updatedPositions));
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [location.pathname]);

  useEffect(() => {
    // Always scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id={id} className={`${className} main`} style={pageStyle}>
      {children}
    </div>
  );
};

export default Page;
