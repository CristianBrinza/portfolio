import React from 'react';

interface TitleProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ color, className = '', children }) => {
  const textStyle: React.CSSProperties = {
    color: color || 'var(--theme_primary_color_black)',
    fontFamily: 'Inter',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '40px',
  };

  return (
    <div className={`title ${className}`} style={textStyle}>
      {children}
    </div>
  );
};

export default Title;
