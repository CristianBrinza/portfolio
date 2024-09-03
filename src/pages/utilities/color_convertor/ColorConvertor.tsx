import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './ColorConvertor.css';
import Icon from '../../../components/Icon.tsx';
import Button from '../../../components/Button.tsx';

export default function ColorConvertor() {
  const [colorValue, setColorValue] = useState<string>('');
  const [colorFormats, setColorFormats] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const convertColor = (value: string) => {
    const formats = getColorFormats(value);
    setColorFormats(formats);
    setCopied(false);
  };

  const getColorFormats = (value: string) => {
    let rgb = '',
      hex = '',
      hsl = '',
      cmyk = '';

    if (value.startsWith('#')) {
      rgb = hexToRgb(value);
      hex = value;
    } else if (value.startsWith('rgb')) {
      rgb = value;
      hex = rgbToHex(value);
    }

    hsl = rgbToHsl(rgb);
    cmyk = rgbToCmyk(rgb);

    return { rgb, hex, hsl, cmyk };
  };

  const hexToRgb = (hex: string): string => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHex = (rgb: string): string => {
    const result = rgb
      .match(/\d+/g)
      ?.map(x => parseInt(x).toString(16).padStart(2, '0'))
      .join('');
    return `#${result}`;
  };

  const rgbToHsl = (rgb: string): string => {
    const [r, g, b] = rgb
      .match(/\d+/g)!
      .map(Number)
      .map(x => x / 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const rgbToCmyk = (rgb: string): string => {
    const [r, g, b] = rgb
      .match(/\d+/g)!
      .map(Number)
      .map(x => x / 255);
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  };

  const handleCopy = (format: string) => {
    if (colorFormats[format]) {
      navigator.clipboard.writeText(colorFormats[format]);
      setCopied(true);
    }
  };

  const emptyInput = () => {
    setColorValue('');
    setColorFormats({});
    setCopied(false);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Color Convertor' },
        ]}
      />

      <Page gap="20px">
        <Title>Color Convertor</Title>
        <div className="converter_container">
          {colorValue && (
            <Button
              style={{ padding: '3px 20px' }}
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              onClick={emptyInput}
            >
              <Icon type="close" color="var(--theme_primary_color_black)" />
            </Button>
          )}
          <input
            type="text"
            value={colorValue}
            id="converter_input"
            onChange={e => {
              setColorValue(e.target.value);
              convertColor(e.target.value);
            }}
            placeholder="Enter a color value (e.g., #FF5733 or rgb(255, 87, 51))"
          />
          {Object.keys(colorFormats).length > 0 ? (
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={() => handleCopy('hex')}
            >
              Convert
            </Button>
          ) : (
            <Button
              color="var(--theme_primary_color_black)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              onClick={() => {}}
              style={{ cursor: 'not-allowed', opacity: 0.5 }}
            >
              Convert
            </Button>
          )}
          {copied && (
            <span
              style={{ marginLeft: '10px', color: '#4DD181', fontWeight: 400 }}
            >
              Copied
            </span>
          )}
        </div>

        {Object.keys(colorFormats).length > 0 && (
          <div className="color_formats_container">
            {Object.entries(colorFormats).map(([format, value]) => (
              <div key={format} className="color_format">
                <strong>{format.toUpperCase()}:</strong> {value.toString()}
                <Button
                  style={{ marginLeft: '10px' }}
                  color="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_darkest_gray)"
                  hover_bgcolor="var(--theme_primary_color_dark_gray)"
                  onClick={() => handleCopy(format)}
                >
                  <Icon type="copy" />
                  Copy
                </Button>
              </div>
            ))}
          </div>
        )}
      </Page>
      <Footer />
    </>
  );
}
