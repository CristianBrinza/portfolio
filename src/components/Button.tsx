import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  bgcolor?: string;
  color?: string;
  border?: string;
  border_radius?: string;
  hover_bgcolor?: string;
  hover_color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string; // New to prop for navigation
}

const Button: React.FC<ButtonProps> = ({
  color,
  bgcolor,
  hover_bgcolor,
  hover_color,
  border,
  border_radius,
  children,
  onClick,
  to, // Destructure to from props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (to) {
      navigate(to); // Navigate to the specified route
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: isHovered
      ? hover_bgcolor || 'var(--theme_primary_color_dark_gray)'
      : bgcolor || 'var(--theme_primary_color_white)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isHovered ? hover_bgcolor : border || '#ffffff00',
    borderRadius: border_radius || '12px',
    cursor: 'pointer',
    padding: '3px 28px',
    color: isHovered
      ? hover_color || 'var(--theme_primary_color_black)'
      : color || 'var(--theme_primary_color_black)',
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
      onClick={handleClick} // Use handleClick instead of onClick
    >
      {children}
    </button>
  );
};

export default Button;
