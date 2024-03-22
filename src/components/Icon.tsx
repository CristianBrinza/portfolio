import React from 'react';

interface IconProps {
  color?: string;
  type?: string;
  size?: string;
}

const Icon: React.FC<IconProps> = ({
  color = 'var(--primary-color)',
  type = 'empty', size
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

  const buttonStyle: React.CSSProperties = {
    height: `${size}px` || '24px',
    width: `${size}px` || '24px',
    fill: color ? getComputedStyleValue(color) : '--primary',
    stroke: getComputedStyleValue(color),
  };

  return (
    <img style={buttonStyle} src={`images/icons/${type}.svg`} alt={type} />
  );
};

export default Icon;
