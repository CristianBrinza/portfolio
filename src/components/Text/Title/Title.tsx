import React from 'react';

interface TitleProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Title: React.FC<TitleProps> = ({
  color,
  className = '',
  children,
  style,
}) => {
  const textStyle: React.CSSProperties = {
    color: color || 'var(--theme_primary_color_black)',
    fontFamily: 'Inter',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '32px',
    marginBottom: '20px',
    ...style,
  };

  return (
    <div className={`title ${className}`} style={textStyle}>
      {children}
    </div>
  );
};

export default Title;
