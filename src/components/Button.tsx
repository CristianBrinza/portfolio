import React, { useState, ReactElement, isValidElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon'; // Adjust the import path as needed

interface ButtonProps {
  bgcolor?: string;
  color?: string;
  border?: string;
  border_radius?: string;
  hover_bgcolor?: string;
  hover_color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
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
  to,
  className = '',
  style,
  type = 'button',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
      navigate(to);
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
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: '0px 28px',
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
    minHeight: '48px',
    textDecoration: 'none',
    opacity: disabled ? 0.1 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    boxSizing: 'border-box',
    ...style,
  };

  // Pass the dynamic color to Icon
  const buttonIconColor = isHovered ? hover_color || color : color;

  return to ? (
    <Link
      to={to}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${className}`}
      disabled={disabled}
    >
      {/* Render children and pass dynamic color to Icon */}
      {React.Children.map(children, child => {
        if (isValidElement(child) && child.type === Icon) {
          return React.cloneElement(child as ReactElement<any>, {
            color: buttonIconColor,
          });
        }
        return child;
      })}
    </button>
  );
};

export default Button;
