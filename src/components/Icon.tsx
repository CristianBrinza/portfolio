import React, { useEffect, useState } from 'react';

interface IconProps {
  type?: string;
  size?: string;
  fill?: string;
  stroke?: string;
}

const Icon: React.FC<IconProps> = ({
  type = 'empty',
  size = '24',
  fill,
  stroke,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const buttonStyle: React.CSSProperties = {
    height: `${size}px`,
    width: `${size}px`,
  };

  useEffect(() => {
    fetch(`images/icons/${type}.svg`)
      .then((response) => response.text())
      .then((text) => {
        // If fill or stroke is provided, replace in the SVG content.
        let updatedSvg = text;
        if (fill) {
          updatedSvg = updatedSvg.replace(/fill="[^"]*"/g, `fill="${fill}"`);
        }
        if (stroke) {
          updatedSvg = updatedSvg.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
        }
        setSvgContent(updatedSvg);
      })
      .catch((error) => console.error(error));
  }, [type, fill, stroke]);

  return (
    <div style={buttonStyle} dangerouslySetInnerHTML={{ __html: svgContent || '' }} />
  );
};

export default Icon;
