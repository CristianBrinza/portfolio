import React from 'react';

interface IconProps {
  type?: string;
  size?: string;
}

const Icon: React.FC<IconProps> = ({
  type = 'empty', size
}) => {
  const buttonStyle: React.CSSProperties = {
    height: `${size}px` || '24px',
    width: `${size}px` || '24px',
   };

  return (
    <img style={buttonStyle} src={`images/icons/${type}.svg`} alt={type} />
  );
};

export default Icon;
