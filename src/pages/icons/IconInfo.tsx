import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Icon, { icons } from '../../components/Icon.tsx';
import styles from './IconInfo.module.css';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../components/Page.tsx';
import { t } from 'i18next';
import Title from '../../components/Text/Title/Title.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Button from '../../components/Button.tsx';
import Input from '../../components/input/Input.tsx';
import Notification from '../../components/Notification/Notification.tsx';

export default function IconInfo() {
  const { code } = useParams<{ code: string }>();

  const isValidIcon = code && icons[code as keyof typeof icons];
  const [iconSize, setIconSize] = useState<number>(50);
  const [svgColor, setSvgColor] = useState('#000000');
  const [showNotificationDownload, setShowNotificationDownload] =
    useState(false);
  const [showNotificationCopied, setShowNotificationCopied] = useState(false);

  const handleSizeChange = (change: number) => {
    setIconSize(prev => Math.max(5, prev + change));
  };

  const handleInputChangeValue = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 5) {
      setIconSize(parsedValue);
    }
  };

  const getSvgString = (): string | null => {
    const svgElement = document.querySelector(`.${styles.icon_info_left} svg`);
    if (!svgElement) return null;

    const clonedSvg = svgElement.cloneNode(true) as SVGElement;

    // Replace `currentColor` with the actual color value for both `stroke` and `fill`
    clonedSvg.querySelectorAll('*').forEach(el => {
      const stroke = el.getAttribute('stroke');
      const fill = el.getAttribute('fill');

      if (stroke === 'currentColor') {
        el.setAttribute('stroke', svgColor);
      }
      if (fill === 'currentColor') {
        el.setAttribute('fill', svgColor);
      }
    });

    return clonedSvg.outerHTML;
  };

  const copyToClipboard = () => {
    const svg = getSvgString();
    if (svg) {
      navigator.clipboard.writeText(svg).then(() => {
        setShowNotificationCopied(true);
        setTimeout(() => setShowNotificationCopied(false), 3000);
      });
    }
  };

  const downloadSvg = () => {
    const svg = getSvgString();
    if (svg) {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${code}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      setShowNotificationDownload(true);
      setTimeout(() => setShowNotificationDownload(false), 3000);
    }
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: 'Icons', url: '/icons-showcase' },
    { label: `${code}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="20px">
        {isValidIcon ? (
          <div className={styles.icon_info}>
            <div className={styles.icon_info_left}>
              <Icon
                type={code as keyof typeof icons}
                size={`${iconSize}px`}
                color={svgColor}
              />
            </div>
            <div className={styles.icon_info_right}>
              <div>
                <b>Name:</b> {code}
              </div>
              <div className={styles.icon_info_right_size}>
                <Button
                  onClick={() => handleSizeChange(-5)}
                  color="var(--theme_primary_color_black)"
                  bgcolor="var(--theme_primary_color_dark_gray)"
                  hover_bgcolor="var(--theme_primary_color_darkest_gray)"
                >
                  -
                </Button>
                <Input
                  className={styles.icon_info_right_size_input}
                  value={String(iconSize)}
                  onChange={handleInputChangeValue}
                  type="number"
                  min="5"
                />
                <Button
                  onClick={() => handleSizeChange(5)}
                  color="var(--theme_primary_color_black)"
                  bgcolor="var(--theme_primary_color_dark_gray)"
                  hover_bgcolor="var(--theme_primary_color_darkest_gray)"
                >
                  +
                </Button>
              </div>
              <div className={styles.icon_info_right_title}>Select color:</div>
              <input
                id="qr_color"
                type="color"
                value={svgColor}
                onChange={e => setSvgColor(e.target.value)}
              />
              <div className={styles.icon_info_right_btns}>
                <Button
                  onClick={copyToClipboard}
                  color="var(--theme_primary_color_black)"
                  bgcolor="var(--theme_primary_color_white)"
                  border="var(--theme_primary_color_darkest_gray)"
                >
                  Copy as SVG
                </Button>
                <Button
                  onClick={downloadSvg}
                  color="var(--theme_primary_color_black)"
                  bgcolor="var(--theme_primary_color_white)"
                  border="var(--theme_primary_color_darkest_gray)"
                >
                  Download SVG
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Title>Icon not found</Title>
        )}
      </Page>
      <Footer />
      {showNotificationDownload && (
        <Notification type="success">Downloaded</Notification>
      )}
      {showNotificationCopied && (
        <Notification type="success">Copied</Notification>
      )}
    </>
  );
}
