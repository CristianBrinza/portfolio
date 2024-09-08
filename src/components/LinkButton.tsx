import React from 'react';
import Icon from './Icon.tsx';
import { Link } from 'react-router-dom';

interface LinkButtonProps {
  to?: string;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  color,
  children,
  className = '',
  to,
}) => {
  const LinkButtonStyle: React.CSSProperties = {
    color: color || '#1967D2',
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
  };

  return to ? (
    <Link to={to} className={className} style={LinkButtonStyle}>
      {children}
      <Icon type="arrow" color={color || '#1967D2'} />
    </Link>
  ) : (
    <span className={className} style={LinkButtonStyle}>
      {children}
      <Icon type="arrow" color={color || '#1967D2'} />
    </span>
  );
};

export default LinkButton;
