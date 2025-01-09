import React, { useState } from 'react';
import Icon from './Icon.tsx';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to?: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  color = '#1967D2',
  children,
  className = '',
  to,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate a darker color for hover
  const darkerColor = shadeColor(color, -15); // Makes the color 15% darker

  const LinkButtonStyle: React.CSSProperties = {
    color: isHovered ? darkerColor : color,
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const arrowStyle: React.CSSProperties = {
    transition: 'transform 0.3s ease',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return to ? (
    <Link
      to={to}
      className={`LinkButton ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={LinkButtonStyle}
    >
      {children}
      <Icon
        className="LinkButton_arrow"
        type="arrow_right"
        style={arrowStyle}
        color={isHovered ? darkerColor : color}
      />
    </Link>
  ) : (
    <span
      className={`LinkButton ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={LinkButtonStyle}
    >
      {children}
      <Icon
        className="LinkButton_arrow"
        type="arrow_right"
        style={arrowStyle}
        color={isHovered ? darkerColor : color}
      />
    </span>
  );
};

// Function to darken the color
function shadeColor(color: string, percent: number) {
  let num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export default LinkButton;
