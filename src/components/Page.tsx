import React from 'react';

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

  return (
    <div id={id} className={`${className} main`} style={pageStyle}>
      {children}
    </div>
  );
};

export default Page;
