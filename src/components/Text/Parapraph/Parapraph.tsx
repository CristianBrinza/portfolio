import React from 'react';

interface ParapraphProps {
  color?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Parapraph: React.FC<ParapraphProps> = ({
  color,
  className = '',
  children,
  style,
}) => {
  const textStyle: React.CSSProperties = {
    color: color || 'var(--costume_footer_txt_color_1)',
    fontFamily: 'Inter',
    fontSize: '16.8px',
    fontStyle: 'normal',
    fontWeight: '450',
    lineHeight: '23.04px',
    ...style,
  };

  return (
    <div className={`title ${className}`} style={textStyle}>
      {children}
    </div>
  );
};

export default Parapraph;
