import React, { useState } from 'react';

// Updated interface to include onClick
interface ButtonProps {
  bgcolor?: string;
  color?: string;
  border?: string;
  children: React.ReactNode;
  border_radius:string;
  hover_bgcolor:string;
  onClick?: () => void; // Optional onClick function prop
}

const Button: React.FC<ButtonProps> = ({
  color,
  bgcolor,
  hover_bgcolor,
  border,
  border_radius,
  children,
  onClick, // Destructure onClick from props

}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isHovered ? hover_bgcolor||'var(--theme_primary_color_dark_gray)' : bgcolor || 'var(--theme_primary_color_white)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isHovered ? hover_bgcolor : border || '#ffffff00',
    borderRadius: border_radius || '12px',
    cursor: 'pointer',
    padding: '3px 28px',
    color: color || 'var(--theme_primary_color_black)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '100%',
    gap: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: '46px',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
