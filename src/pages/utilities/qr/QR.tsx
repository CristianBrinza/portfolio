import { useState } from 'react';
import { Trans } from 'react-i18next';
import QRCode from 'qrcode.react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../../../components/Text/Title/Title.tsx';
import Button from '../../../components/Button.tsx';
import './QR.css';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Icon from '../../../components/Icon.tsx';

export default function QR() {
  const [qrValue, setQrValue] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [qrType, setQrType] = useState('png');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000'); // Default to black
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState(0.35);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleGenerate = () => {
    setShowDownload(true);
  };

  const handleDownload = () => {
    if (qrType === 'png') {
      const canvas = document.querySelector('.qr_container canvas') as HTMLCanvasElement;
      if (canvas) {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = qrSize;
        offscreenCanvas.height = qrSize;

        const ctx = offscreenCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
              canvas,
              0,
              0,
              canvas.width,
              canvas.height,
              0,
              0,
              qrSize,
              qrSize
          );

          // Download the resized canvas as a PNG
          const link = document.createElement('a');
          link.download = `qr-code.png`;
          link.href = offscreenCanvas.toDataURL('image/png', 1.0);
          link.click();
        }
      }
    } else if (qrType === 'svg') {
      const svgElement = document.querySelector('.qr_container svg') as SVGSVGElement;
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.download = `qr-code.svg`;
        link.href = URL.createObjectURL(svgBlob);
        link.click();
      }
    }
  };

  const handleCopy = () => {
    if (qrType === 'png') {
      const canvas = document.querySelector('.qr_container canvas') as HTMLCanvasElement;
      if (canvas) {
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = qrSize;
        offscreenCanvas.height = qrSize;

        const ctx = offscreenCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
              canvas,
              0,
              0,
              canvas.width,
              canvas.height,
              0,
              0,
              qrSize,
              qrSize
          );
          offscreenCanvas.toBlob(blob => {
            if (blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              navigator.clipboard.write([item]);
              alert('QR code copied to clipboard as PNG.');
            }
          });
        }
      }
    } else if (qrType === 'svg') {
      const svgElement = document.querySelector('.qr_container svg') as SVGSVGElement;
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
        const item = new ClipboardItem({ 'image/svg+xml': svgBlob });
        navigator.clipboard.write([item]);
        alert('QR code copied to clipboard as SVG.');
      }
    }
  };

  const emptyInput = () => {
    setQrValue('');
    setShowDownload(false);
  };

  // Handle logo upload (only PNG and JPEG allowed)
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        alert('Only PNG and JPEG images are allowed.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
        // Force PNG mode when a logo is uploaded.
        setQrType('png');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    setLogoImage(null);
  };

  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.utilities_page</Trans>, url: '/utilities' },
    { label: <Trans>navigation.qr_page</Trans> },
  ];

  return (
      <>
        <Breadcrumb items={breadcrumbItems} />

        <Page gap="20px">
          <Title>QR code generator</Title>

          <div className="qr_container" style={{ position: 'relative', width: `${qrSize}px`, height: `${qrSize}px` }}>
            <QRCode
                value={qrValue}
                size={qrSize}
                renderAs={qrType === 'png' ? 'canvas' : 'svg'}
                bgColor={qrType === 'png' ? 'transparent' : '#ffffff'}
                fgColor={qrColor}
                level="H" // Increase error correction to handle logo overlay
                imageSettings={
                  logoImage
                      ? {
                        src: logoImage,
                        x: (qrSize - qrSize * logoScale) / 2,
                        y: (qrSize - qrSize * logoScale) / 2,
                        height: qrSize * logoScale,
                        width: qrSize * logoScale,
                        excavate: true,
                      }
                      : undefined
                }
            />
          </div>

          <div className="qr_btns">
            {qrValue && (
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
                className="qr_input"
                type="text"
                value={qrValue}
                onChange={e => setQrValue(e.target.value)}
                placeholder="paste here"
            />
            <select
                name="qr_type"
                id="qr_type"
                value={qrType}
                onChange={e => {
                  setQrType(e.target.value);
                  setShowDownload(false);
                  if (e.target.value !== 'png') {
                    setQrSize(256);
                  }
                }}
            >
              <option value="png">.png</option>
              <option value="svg" disabled={!!logoImage}>
                .svg {logoImage ? '(Not available with logo)' : ''}
              </option>
            </select>
            {qrType === 'png' && (
                <select
                    name="qr_size"
                    id="qr_size"
                    value={qrSize}
                    onChange={e => setQrSize(Number(e.target.value))}
                    defaultValue="256"
                >
                  <option value="100">100x100</option>
                  <option value="256">256x256</option>
                  <option value="300">300x300</option>
                  <option value="500">500x500</option>
                  <option value="1000">1000x1000</option>
                  <option value="3000">3000x3000</option>
                  <option value="5000">5000x5000</option>
                </select>
            )}
            <input
                id="qr_color"
                type="color"
                value={qrColor}
                onChange={e => setQrColor(e.target.value)}
            />
            <Button
                color="var(--theme_primary_color_white)"
                bgcolor="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_black)"
                onClick={handleGenerate}
            >
              Generate
            </Button>
            <Button
                color="var(--theme_primary_color_black)"
                bgcolor="var(--theme_primary_color_blue)"
                onClick={() => setShowAdvancedOptions(prev => !prev)}
            >
              {showAdvancedOptions ? 'Hide Advanced Options' : 'Advanced Options'}
            </Button>
            {showDownload && (
                <>
                  <Button
                      color="var(--theme_primary_color_white)"
                      bgcolor="var(--theme_primary_color_red)"
                      border="var(--theme_primary_color_red)"
                      onClick={handleDownload}
                  >
                    Download
                  </Button>
                  <Button
                      color="var(--theme_primary_color_black)"
                      border="var(--theme_primary_color_black)"
                      onClick={handleCopy}
                  >
                    Copy
                    <Icon type="copy" />
                  </Button>
                </>
            )}
          </div>

          {showAdvancedOptions && (
              <div className="advanced_options" style={{ marginTop: '20px' }}>
                <table className="advanced_table">
                  <tbody>
                  <tr>
                    <td>Upload Logo (PNG/JPEG):</td>
                    <td>
                      <input type="file" accept="image/png, image/jpeg" onChange={handleLogoUpload} />
                    </td>
                  </tr>
                  <tr>
                    <td>Logo Scale (0.1 - 0.5):</td>
                    <td>
                      <input
                          type="number"
                          min="0.1"
                          max="0.5"
                          step="0.05"
                          value={logoScale}
                          onChange={e => setLogoScale(parseFloat(e.target.value))}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      {logoImage && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={logoImage} alt="Uploaded Logo" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                            <Button onClick={handleClearLogo}>Clear Logo</Button>
                          </div>
                      )}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
          )}
        </Page>
        <Footer />
      </>
  );
}
