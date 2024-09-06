import { useState, useRef, useEffect } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './ImageColorPicker.css';
import Button from '../../../components/Button.tsx';
import Icon from '../../../components/Icon.tsx';

export default function ImageColorPicker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<{
    rgb: string;
    hex: string;
  } | null>(null);
  const [zoom, setZoom] = useState<number>(6);
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isColorLocked, setIsColorLocked] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const updatePickedColor = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    const hex = `#${(
      (1 << 24) |
      (pixelData[0] << 16) |
      (pixelData[1] << 8) |
      pixelData[2]
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
    setPickedColor({ rgb, hex });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isColorLocked) return; // Don't update if the color is locked

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    // Check if it's a touch event
    if ('touches' in e) {
      x = e.touches[0]?.clientX - rect.left;
      y = e.touches[0]?.clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    setLensPosition({ x, y });
    updatePickedColor(x, y);
  };

  const handleClick = () => {
    setIsColorLocked(!isColorLocked); // Toggle color lock on click
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(e.target.value));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    const drawImageOnCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imageRef.current;
      if (ctx && img && canvas) {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        updatePickedColor(0, 0); // Update the initial color preview when image loads
      }
    };
    if (imageSrc) drawImageOnCanvas();
  }, [imageSrc]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Image Color Picker' },
        ]}
      />
      <Page gap="20px">
        <Title>Image Color Picker</Title>

        <div className="color_picker_container">
          {!imageSrc && (
            <div className="color_picker_upload">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="file_input"
                id="image_upload"
                style={{ display: 'none' }}
              />
              <Button
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_light_gray)"
                bgcolor="var(--theme_primary_color_light_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
                onClick={triggerFileInput}
              >
                <Icon type="upload" /> Upload Image
              </Button>
            </div>
          )}

          {imageSrc && (
            <div className="image_container">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                onTouchMove={handleMouseMove}
                className="image_canvas"
              />
              <img
                src={imageSrc}
                ref={imageRef}
                alt="uploaded"
                className="hidden_img"
              />
              <div
                className="lens"
                style={{
                  top: lensPosition.y - 75 + 'px',
                  left: lensPosition.x - 75 + 'px',
                  backgroundImage: `url(${imageSrc})`,
                  backgroundPosition: `-${lensPosition.x * zoom - 75}px -${lensPosition.y * zoom - 75}px`,
                  backgroundSize: `${500 * zoom}px ${500 * zoom}px`,
                }}
              />
            </div>
          )}

          {imageSrc && (
            <div className="zoom_controls">
              <label>Zoom:</label>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={zoom}
                onChange={handleZoomChange}
                className="zoom_slider"
              />
            </div>
          )}
          {pickedColor && (
            <div className="color_info">
              <div className="picked_color_values">
                <div
                  className="picked_color_display"
                  style={{ backgroundColor: pickedColor.rgb }}
                ></div>
                <div>
                  <div className="picked_color_display_line">
                    <p>RGB: {pickedColor.rgb}</p>
                    <Button
                      color="var(--theme_primary_color_black)"
                      border="var(--theme_primary_color_light_gray)"
                      bgcolor="var(--theme_primary_color_light_gray)"
                      hover_bgcolor="var(--theme_primary_color_dark_gray)"
                      onClick={() => copyToClipboard(pickedColor.rgb)}
                    >
                      <Icon type="copy" /> Copy
                    </Button>
                  </div>
                  <div className="picked_color_display_line">
                    <p>Hex: {pickedColor.hex}</p>
                    <Button
                      color="var(--theme_primary_color_black)"
                      border="var(--theme_primary_color_light_gray)"
                      bgcolor="var(--theme_primary_color_light_gray)"
                      hover_bgcolor="var(--theme_primary_color_dark_gray)"
                      onClick={() => copyToClipboard(pickedColor.hex)}
                    >
                      <Icon type="copy" /> Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Page>
      <Footer />
    </>
  );
}
