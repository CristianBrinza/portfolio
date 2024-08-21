import React from 'react';

interface PageProps {
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ gap, className = '', children }) => {
  const pageStyle: React.CSSProperties = {
    gap: gap,
  };

  return (
    <div className={`${className} main`} style={pageStyle}>
      {children}
    </div>
  );
};

export default Page;
