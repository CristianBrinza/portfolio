// Button.tsx
import React, { useState } from 'react';

interface ButtonProps {
  bgcolor?: string;
  color?: string;
  border?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color,
  bgcolor,
  border,
  children,
}) => {
  const getComputedStyleValue = (value: string): string => {
    // Check if the value starts with "--" which indicates a CSS variable
    if (value.startsWith('--')) {
      // Access computed style to get the value of the CSS variable
      return getComputedStyle(document.documentElement).getPropertyValue(value);
    }
    // If it's not a CSS variable, return the value itself
    return value;
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: bgcolor ? getComputedStyleValue(bgcolor) : '#fff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: border ? getComputedStyleValue(border) : 'var(--primary)',
    borderRadius: '100px',
    cursor: 'pointer',
    padding: '3px 28px',
    color: color ? getComputedStyleValue(color) : 'var(--primary)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '40px',
    gap: '16px',
    mixBlendMode: isHovered ? 'difference' : 'initial',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
