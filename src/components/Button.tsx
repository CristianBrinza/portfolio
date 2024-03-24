import React, { useState } from 'react';

// Updated interface to include onClick
interface ButtonProps {
  bgcolor?: string;
  color?: string;
  border?: string;
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick function prop
}

const Button: React.FC<ButtonProps> = ({
  color,
  bgcolor,
  border,
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
    backgroundColor: isHovered ? '#d6d6d6' : bgcolor || 'var(--secondary)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isHovered ? '#d6d6d6' : border || 'var(--primary)',
    borderRadius: '100px',
    cursor: 'pointer',
    padding: '3px 28px',
    color: color || 'var(--primary)',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '100%',
    gap: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: "46px",
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
