import React from 'react';

interface ParapraphProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const Parapraph: React.FC<ParapraphProps> = ({
  color,
  className = '',
  children,
}) => {
  const textStyle: React.CSSProperties = {
    color: color || 'var(--theme_primary_color_black)',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '18px',
  };

  return (
    <div className={`title ${className}`} style={textStyle}>
      {children}
    </div>
  );
};

export default Parapraph;
