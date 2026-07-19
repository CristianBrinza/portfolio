import { ChangeEvent, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Button from '../../../components/Button.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Icon from '../../../components/Icon.tsx';
import Notification from '../../../components/Notification/Notification.tsx';
import Page from '../../../components/Page.tsx';
import Title from '../../../components/Text/Title/Title.tsx';
import './QR.css';

type QRFormat = 'png' | 'svg';
type NotificationType = 'info' | 'error' | 'success';

const PREVIEW_SIZE = 288;
const MAX_LOGO_SIZE = 5 * 1024 * 1024;

export default function QR() {
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState<QRFormat>('png');
  const [qrSize, setQrSize] = useState(1024);
  const [qrColor, setQrColor] = useState('#111111');
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoName, setLogoName] = useState('');
  const [logoScale, setLogoScale] = useState(0.25);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [notification, setNotification] = useState<{
    id: number;
    message: string;
    type: NotificationType;
  } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generatedValue = qrValue.trim();

  const notify = (message: string, type: NotificationType) => {
    setNotification({ id: Date.now(), message, type });
  };

  const handleGenerate = () => {
    const value = qrValue.trim();
    if (!value) {
      notify('Add a URL or text before generating your QR code.', 'error');
      return;
    }

    setQrValue(value);
    notify('Your QR code is ready to download or copy.', 'success');
  };

  const getSvgMarkup = () => {
    const svgElement = previewRef.current?.querySelector('svg');
    if (!svgElement) throw new Error('QR preview is not available.');

    const clone = svgElement.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(qrSize));
    clone.setAttribute('height', String(qrSize));
    return new XMLSerializer().serializeToString(clone);
  };

  const getPngBlob = async () => {
    const svgBlob = new Blob([getSvgMarkup()], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const objectUrl = URL.createObjectURL(svgBlob);

    try {
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error('The QR image could not be rendered.'));
        image.src = objectUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = qrSize;
      canvas.height = qrSize;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is not supported in this browser.');

      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, qrSize, qrSize);

      return await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => {
          if (blob) resolve(blob);
          else reject(new Error('The PNG file could not be created.'));
        }, 'image/png');
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleDownload = async () => {
    if (!generatedValue) {
      notify('Generate a QR code before downloading it.', 'error');
      return;
    }

    try {
      const blob =
        qrType === 'png'
          ? await getPngBlob()
          : new Blob([getSvgMarkup()], {
              type: 'image/svg+xml;charset=utf-8',
            });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `qr-code.${qrType}`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(`${qrType.toUpperCase()} downloaded successfully.`, 'success');
    } catch (error) {
      notify(
        error instanceof Error
          ? error.message
          : 'The download failed. Please try again.',
        'error'
      );
    }
  };

  const handleCopy = async () => {
    if (!generatedValue) {
      notify('Generate a QR code before copying it.', 'error');
      return;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard access is not available in this browser.');
      }

      if (qrType === 'png') {
        if (
          typeof ClipboardItem === 'undefined' ||
          !navigator.clipboard.write
        ) {
          throw new Error('Copying images is not supported in this browser.');
        }
        const blob = await getPngBlob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        notify('QR code copied to your clipboard as a PNG image.', 'success');
      } else {
        await navigator.clipboard.writeText(getSvgMarkup());
        notify('SVG source copied to your clipboard.', 'success');
      }
    } catch (error) {
      notify(
        error instanceof Error
          ? error.message
          : 'The QR code could not be copied.',
        'error'
      );
    }
  };

  const clearInput = () => {
    setQrValue('');
    notify('Content and preview cleared.', 'info');
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      notify('Please choose a PNG or JPEG logo.', 'error');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      notify('Logo files must be smaller than 5 MB.', 'error');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result as string);
      setLogoName(file.name);
      if (qrType === 'svg') {
        setQrType('png');
        notify(
          'Logo added. The format was changed to PNG for reliable export.',
          'info'
        );
      } else {
        notify('Logo added to the center of your QR code.', 'success');
      }
    };
    reader.onerror = () =>
      notify('The logo could not be read. Please try another file.', 'error');
    reader.readAsDataURL(file);
  };

  const handleClearLogo = () => {
    setLogoImage(null);
    setLogoName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    notify('Logo removed from the QR code.', 'info');
  };

  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.utilities_page</Trans>, url: '/utilities' },
    { label: <Trans>navigation.qr_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page className="qr_page" gap="0">
        <header className="qr_header">
          <span className="qr_eyebrow">Utility / QR</span>
          <Title className="qr_title">QR code generator</Title>
          <p>
            Turn any link or text into a sharp, ready-to-share QR code. Your
            data stays in your browser.
          </p>
        </header>

        <main className="qr_workspace">
          <section
            className="qr_panel qr_controls"
            aria-labelledby="qr-controls-title"
          >
            <div className="qr_section_heading">
              <span>01</span>
              <div>
                <h2 id="qr-controls-title">Create your code</h2>
                <p>Enter the content people should open after scanning.</p>
              </div>
            </div>

            <div className="qr_field">
              <div className="qr_label_row">
                <label htmlFor="qr_value">URL or text</label>
                <span>{qrValue.length} characters</span>
              </div>
              <div className="qr_textarea_wrap">
                <textarea
                  id="qr_value"
                  value={qrValue}
                  onChange={event => setQrValue(event.target.value)}
                  onKeyDown={event => {
                    if (
                      (event.metaKey || event.ctrlKey) &&
                      event.key === 'Enter'
                    ) {
                      handleGenerate();
                    }
                  }}
                  placeholder="https://example.com"
                  rows={4}
                  autoComplete="off"
                />
                {qrValue && (
                  <button
                    className="qr_clear_input"
                    type="button"
                    onClick={clearInput}
                  >
                    Clear
                  </button>
                )}
              </div>
              <span className="qr_field_hint">
                Preview updates automatically. Press Ctrl/⌘ + Enter to confirm.
              </span>
            </div>

            <Button
              className="qr_generate"
              color="#ffffff"
              bgcolor="#111111"
              border="#111111"
              onClick={handleGenerate}
            >
              Generate QR code
              <span aria-hidden="true">→</span>
            </Button>

            <div className="qr_rule" />

            <div className="qr_section_heading qr_section_heading_compact">
              <span>02</span>
              <div>
                <h2>Customize export</h2>
                <p>Choose a format, size and foreground color.</p>
              </div>
            </div>

            <div className="qr_field_grid">
              <div className="qr_field">
                <label htmlFor="qr_type">Format</label>
                <select
                  name="qr_type"
                  id="qr_type"
                  value={qrType}
                  onChange={event => setQrType(event.target.value as QRFormat)}
                >
                  <option value="png">PNG image</option>
                  <option value="svg" disabled={!!logoImage}>
                    SVG vector{logoImage ? ' — remove logo first' : ''}
                  </option>
                </select>
              </div>

              <div className="qr_field">
                <label htmlFor="qr_size">Export size</label>
                <select
                  name="qr_size"
                  id="qr_size"
                  value={qrSize}
                  onChange={event => setQrSize(Number(event.target.value))}
                  disabled={qrType === 'svg'}
                >
                  <option value="256">256 × 256 px</option>
                  <option value="512">512 × 512 px</option>
                  <option value="1024">1024 × 1024 px</option>
                  <option value="2048">2048 × 2048 px</option>
                  <option value="3000">3000 × 3000 px</option>
                  <option value="5000">5000 × 5000 px</option>
                </select>
                {qrType === 'svg' && (
                  <span className="qr_field_hint">SVG scales to any size.</span>
                )}
              </div>

              <div className="qr_field qr_color_field">
                <label htmlFor="qr_color">Foreground</label>
                <div className="qr_color_control">
                  <input
                    id="qr_color"
                    type="color"
                    value={qrColor}
                    onChange={event => setQrColor(event.target.value)}
                    aria-label="QR foreground color"
                  />
                  <span>{qrColor.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <button
              className="qr_advanced_toggle"
              type="button"
              aria-expanded={showAdvancedOptions}
              aria-controls="qr_advanced_options"
              onClick={() => setShowAdvancedOptions(open => !open)}
            >
              <span>Logo & advanced options</span>
              <span aria-hidden="true">{showAdvancedOptions ? '−' : '+'}</span>
            </button>

            {showAdvancedOptions && (
              <div id="qr_advanced_options" className="qr_advanced_options">
                <div className="qr_field">
                  <label htmlFor="qr_logo">Center logo</label>
                  <label className="qr_upload" htmlFor="qr_logo">
                    <span className="qr_upload_icon" aria-hidden="true">
                      ↑
                    </span>
                    <span>
                      <strong>{logoName || 'Choose a PNG or JPEG'}</strong>
                      <small>Maximum file size: 5 MB</small>
                    </span>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="qr_logo"
                    className="qr_file_input"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleLogoUpload}
                  />
                </div>

                {logoImage && (
                  <div className="qr_logo_settings">
                    <img src={logoImage} alt="Uploaded logo preview" />
                    <div className="qr_logo_scale">
                      <div className="qr_label_row">
                        <label htmlFor="qr_logo_scale">Logo size</label>
                        <span>{Math.round(logoScale * 100)}%</span>
                      </div>
                      <input
                        id="qr_logo_scale"
                        type="range"
                        min="0.15"
                        max="0.35"
                        step="0.01"
                        value={logoScale}
                        onChange={event =>
                          setLogoScale(Number(event.target.value))
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="qr_remove_logo"
                      onClick={handleClearLogo}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="qr_advanced_note">
                  High error correction is enabled automatically to keep codes
                  with logos scannable. Always test the final result before
                  publishing.
                </p>
              </div>
            )}
          </section>

          <aside
            className="qr_panel qr_preview_panel"
            aria-labelledby="qr-preview-title"
          >
            <div className="qr_preview_topline">
              <div>
                <span
                  className={`qr_status_dot${generatedValue ? ' is_ready' : ''}`}
                />
                <span>{generatedValue ? 'Ready' : 'Waiting for content'}</span>
              </div>
              <span>{qrType.toUpperCase()}</span>
            </div>

            <div
              ref={previewRef}
              className={`qr_preview${generatedValue ? ' has_qr' : ''}`}
              aria-live="polite"
            >
              {generatedValue ? (
                <QRCodeSVG
                  value={generatedValue}
                  size={PREVIEW_SIZE}
                  bgColor="#ffffff"
                  fgColor={qrColor}
                  level="H"
                  includeMargin
                  imageSettings={
                    logoImage
                      ? {
                          src: logoImage,
                          x: (PREVIEW_SIZE - PREVIEW_SIZE * logoScale) / 2,
                          y: (PREVIEW_SIZE - PREVIEW_SIZE * logoScale) / 2,
                          height: PREVIEW_SIZE * logoScale,
                          width: PREVIEW_SIZE * logoScale,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="qr_empty_state">
                  <div className="qr_empty_mark" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <h2 id="qr-preview-title">Your QR code appears here</h2>
                  <p>Start typing above to create a live preview.</p>
                </div>
              )}
            </div>

            {generatedValue && (
              <h2 id="qr-preview-title" className="qr_preview_title">
                Preview
              </h2>
            )}
            <p className="qr_export_summary">
              {qrType === 'png'
                ? `${qrSize} × ${qrSize} px · high-resolution export`
                : 'Vector export · infinitely scalable'}
            </p>

            <div className="qr_actions">
              <Button
                className="qr_download"
                color="#ffffff"
                bgcolor="#e40523"
                border="#e40523"
                onClick={handleDownload}
                disabled={!generatedValue}
              >
                <Icon type="download" />
                Download {qrType.toUpperCase()}
              </Button>
              <Button
                className="qr_copy"
                color="var(--theme_primary_color_black)"
                bgcolor="var(--theme_primary_color_white)"
                border="var(--theme_primary_color_darker_gray)"
                onClick={handleCopy}
                disabled={!generatedValue}
              >
                <Icon type="copy" />
                Copy
              </Button>
            </div>

            <div className="qr_privacy_note">
              <span aria-hidden="true">✓</span>
              <p>
                <strong>Private by design.</strong> Nothing is uploaded or
                stored.
              </p>
            </div>
          </aside>
        </main>
      </Page>

      {notification && (
        <Notification
          key={notification.id}
          type={notification.type}
          time={5000}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
      <Footer />
    </>
  );
}
