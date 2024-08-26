import React from 'react';

interface PageProps {
  gap?: string;
  className?: string;
  children?: React.ReactNode;
  minHeight?: string;
}

const Page: React.FC<PageProps> = ({
  gap,
  className = '',
  children,
  minHeight = '55vh',
}) => {
  const pageStyle: React.CSSProperties = {
    gap: gap,
    minHeight: minHeight,
  };

  return (
    <div className={`${className} main`} style={pageStyle}>
      {children}
    </div>
  );
};

export default Page;
