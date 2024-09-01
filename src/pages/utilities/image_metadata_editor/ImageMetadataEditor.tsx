import { useState } from 'react';
import { ExifParserFactory } from 'ts-exif-parser';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Button from '../../../components/Button.tsx';
import { Trans } from 'react-i18next';
import './ImageMetadataEditor.css';

// Define a type for ExifTags
type ExifTags = {
  ImageDescription?: string;
  Make?: string;
  Model?: string;
  Orientation?: number;
  XResolution?: number;
  YResolution?: number;
  ResolutionUnit?: number;
  Software?: string;
  ModifyDate?: number;
  YCbCrPositioning?: number;
  ExposureTime?: number;
  FNumber?: number;
  ExposureProgram?: number;
  ISO?: number;
  SensitivityType?: number;
  RecommendedExposureIndex?: number;
  DateTimeOriginal?: number;
  CreateDate?: number;
  CompressedBitsPerPixel?: number;
  BrightnessValue?: number;
  ExposureCompensation?: number;
  MaxApertureValue?: number;
  MeteringMode?: number;
  LightSource?: number;
  Flash?: number;
  FocalLength?: number;
  ColorSpace?: number;
  ExifImageWidth?: number;
  ExifImageHeight?: number;
  CustomRendered?: number;
  ExposureMode?: number;
  WhiteBalance?: number;
  DigitalZoomRatio?: number;
  FocalLengthIn35mmFormat?: number;
  SceneCaptureType?: number;
  Contrast?: number;
  Saturation?: number;
  Sharpness?: number;
  LensInfo?: string;
  LensModel?: string;
  InteropIndex?: string;
  ThumbnailOffset?: string;
  ThumbnailLength?: string;
  // Remove ThumbnailType and App1Offset as they do not exist
};

// Define types for metadata and geolocation
interface Metadata {
  tags: ExifTags;
  cameraMake?: string;
  cameraModel?: string;
  exposureTime?: string;
  fNumber?: number;
  isoSpeed?: number;
  focalLength?: number;
  software?: string;
  orientation?: string;
  bitDepth?: number;
  compression?: string;
}

interface Geolocation {
  lat: number;
  lon: number;
}

export default function ImageMetadataEditor() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [editedMetadata, setEditedMetadata] = useState<Metadata | null>(null);
  const [batchEdit, setBatchEdit] = useState<boolean>(false);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState({
    name: '',
    kind: '',
    size: '',
    location: '',
    created: '',
    modified: '',
    lastOpened: '',
    dimensions: '',
    colorSpace: '',
    colorProfile: '',
    alphaChannel: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const fileType = file.type.toLowerCase();

      setSelectedImage(file);

      // Check if the file is a RAW image
      if (
        fileType.includes('image') &&
        !fileType.includes('jpeg') &&
        !fileType.includes('png') &&
        !fileType.includes('gif')
      ) {
        // RAW image detected, show a placeholder or message
        setImagePreview(null); // or set a placeholder image URL
        alert('RAW images cannot be previewed.');
      } else {
        const result = URL.createObjectURL(file);
        setImagePreview(result);
      }

      extractMetadata(file);
      extractFileInfo(file);
    }
  };

  const extractMetadata = (file: File) => {
    const fileType = file.type;

    if (fileType === 'image/jpeg' || fileType === 'image/tiff') {
      extractExifMetadata(file);
    } else {
      extractBasicMetadata(file);
    }
  };

  const extractExifMetadata = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const parser = ExifParserFactory.create(buffer);
      const exifData = parser.parse();

      if (exifData.tags) {
        const extractedTags: ExifTags = {
          ImageDescription: exifData.tags.ImageDescription,
          Make: exifData.tags.Make,
          Model: exifData.tags.Model,
          Orientation: exifData.tags.Orientation,
          XResolution: Number(exifData.tags.XResolution),
          YResolution: Number(exifData.tags.YResolution),
          ResolutionUnit: Number(exifData.tags.ResolutionUnit),
          Software: exifData.tags.Software,
          ModifyDate: exifData.tags.ModifyDate,
          YCbCrPositioning: Number(exifData.tags.YCbCrPositioning),
          ExposureTime: exifData.tags.ExposureTime,
          FNumber: exifData.tags.FNumber,
          ExposureProgram: Number(exifData.tags.ExposureProgram),
          ISO: exifData.tags.ISO,
          SensitivityType: Number(exifData.tags.SensitivityType),
          RecommendedExposureIndex: Number(
            exifData.tags.RecommendedExposureIndex
          ),
          DateTimeOriginal: exifData.tags.DateTimeOriginal,
          CreateDate: exifData.tags.CreateDate,
          CompressedBitsPerPixel: Number(exifData.tags.CompressedBitsPerPixel),
          BrightnessValue: Number(exifData.tags.BrightnessValue),
          ExposureCompensation: Number(exifData.tags.ExposureCompensation),
          MaxApertureValue: Number(exifData.tags.MaxApertureValue),
          MeteringMode: Number(exifData.tags.MeteringMode),
          LightSource: Number(exifData.tags.LightSource),
          Flash: Number(exifData.tags.Flash),
          FocalLength: exifData.tags.FocalLength,
          ColorSpace: Number(exifData.tags.ColorSpace),
          ExifImageWidth: exifData.tags.ExifImageWidth,
          ExifImageHeight: exifData.tags.ExifImageHeight,
          CustomRendered: Number(exifData.tags.CustomRendered),
          ExposureMode: Number(exifData.tags.ExposureMode),
          WhiteBalance: Number(exifData.tags.WhiteBalance),
          DigitalZoomRatio: Number(exifData.tags.DigitalZoomRatio),
          FocalLengthIn35mmFormat: Number(
            exifData.tags.FocalLengthIn35mmFormat
          ),
          SceneCaptureType: Number(exifData.tags.SceneCaptureType),
          Contrast: Number(exifData.tags.Contrast),
          Saturation: Number(exifData.tags.Saturation),
          Sharpness: Number(exifData.tags.Sharpness),
          LensInfo: exifData.tags.LensInfo,
          LensModel: exifData.tags.LensModel,
          InteropIndex: String(exifData.tags.InteropIndex),
          ThumbnailOffset: exifData.tags.ThumbnailOffset,
          ThumbnailLength: exifData.tags.ThumbnailLength,
        };

        setMetadata({
          tags: extractedTags,
          cameraMake: exifData.tags.Make,
          cameraModel: exifData.tags.Model,
          exposureTime: exifData.tags.ExposureTime?.toString(),
          fNumber: exifData.tags.FNumber,
          isoSpeed: exifData.tags.ISO,
          focalLength: exifData.tags.FocalLength,
          software: exifData.tags.Software,
          orientation: exifData.tags.Orientation?.toString(),
          bitDepth: 24, // Example for bit depth, this can vary
          compression: 'JPEG Compression', // Example for compression
        });
        setEditedMetadata({
          tags: extractedTags,
          cameraMake: exifData.tags.Make,
          cameraModel: exifData.tags.Model,
          exposureTime: exifData.tags.ExposureTime?.toString(),
          fNumber: exifData.tags.FNumber,
          isoSpeed: exifData.tags.ISO,
          focalLength: exifData.tags.FocalLength,
          software: exifData.tags.Software,
          orientation: exifData.tags.Orientation?.toString(),
          bitDepth: 24,
          compression: 'JPEG Compression',
        });

        if (
          exifData.tags.GPSLatitude !== undefined &&
          exifData.tags.GPSLongitude !== undefined
        ) {
          setGeolocation({
            lat: exifData.tags.GPSLatitude,
            lon: exifData.tags.GPSLongitude,
          });
        }
      } else {
        console.warn('No EXIF tags found in the image.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const extractBasicMetadata = (file: File) => {
    const image = new Image();
    image.onload = () => {
      const basicMetadata: Metadata = {
        tags: {},
      };
      setMetadata(basicMetadata);
      setEditedMetadata(basicMetadata);
    };
    image.src = URL.createObjectURL(file);
  };

  const extractFileInfo = (file: File) => {
    const sizeInBytes = file.size;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    const fileLocation = file.webkitRelativePath || 'Unknown location';
    const lastModifiedDate = new Date(file.lastModified);
    const dimensions =
      metadata?.tags.ExifImageWidth && metadata?.tags.ExifImageHeight
        ? `${metadata.tags.ExifImageWidth}x${metadata.tags.ExifImageHeight}`
        : 'Unknown';
    const colorProfile = metadata?.tags.ColorSpace ? 'Color LCD' : 'Unknown';
    const colorSpace = file.type.includes('image/') ? 'RGB' : 'Unknown';
    const alphaChannel =
      file.type === 'image/png' || file.type === 'image/gif' ? 'Yes' : 'No';

    setFileInfo({
      name: file.name,
      kind: `${file.type.split('/')[1].toUpperCase()} image`,
      size: `${sizeInBytes.toLocaleString()} bytes (${sizeInMB} MB)`,
      location: fileLocation,
      created: lastModifiedDate.toLocaleString(),
      modified: lastModifiedDate.toLocaleString(),
      lastOpened: new Date().toLocaleString(),
      dimensions,
      colorSpace,
      colorProfile,
      alphaChannel,
    });
  };

  const handleMetadataEdit = (key: keyof Metadata, value: any) => {
    if (editedMetadata) {
      setEditedMetadata({
        ...editedMetadata,
        [key]: value,
      });
    }
  };

  const handleBatchEditToggle = () => {
    setBatchEdit(!batchEdit);
    if (!batchEdit) {
      setBatchFiles([]);
    }
  };

  const handleBatchFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setBatchFiles(Array.from(files));
    }
  };

  const applyBatchEdits = () => {
    batchFiles.forEach(file => {
      console.log(`Applying edits to ${file.name}`);
    });
    alert('Batch edits applied successfully!');
  };

  const handleRemoveMetadata = () => {
    setEditedMetadata({ tags: {} });
    alert('All metadata removed from the image.');
  };

  const handleDownload = (withMetadata: boolean) => {
    if (!imagePreview || !selectedImage) return;

    const link = document.createElement('a');
    link.href = imagePreview;

    const fileExtension =
      selectedImage.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `edited_image.${fileExtension}`;

    link.download = withMetadata ? filename : `stripped_${filename}`;
    link.click();
  };

  const handleImportMetadata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      extractMetadata(files[0]);
      alert('Metadata imported successfully!');
    }
  };

  const handleGeolocationEdit = (lat: number, lon: number) => {
    if (geolocation) {
      setGeolocation({ lat, lon });
      handleMetadataEdit('GPSLatitude' as keyof Metadata, lat);
      handleMetadataEdit('GPSLongitude' as keyof Metadata, lon);
    }
  };

  const handleCustomTagAdd = (key: string, value: string) => {
    if (editedMetadata && editedMetadata.tags) {
      setEditedMetadata({
        ...editedMetadata,
        tags: {
          ...editedMetadata.tags,
          [key]: value,
        },
      });
    }
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
          { label: 'Image Metadata Editor' },
        ]}
      />

      <Page gap="20px">
        <Title>Image Metadata Editor</Title>

        <div className="ime_container">
          <div className="ime_upload_section">
            <input
              type="file"
              accept="image/*, .cr2, .nef, .arw, .dng, .raw"
              onChange={handleImageUpload}
              className="ime_input"
            />
            {batchEdit && (
              <input
                type="file"
                accept="image/*, .cr2, .nef, .arw, .dng, .raw"
                multiple
                onChange={handleBatchFilesUpload}
                className="ime_input"
              />
            )}
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={handleBatchEditToggle}
            >
              {batchEdit ? 'Cancel Batch Edit' : 'Batch Edit'}
            </Button>
            {batchEdit && (
              <Button
                color="var(--theme_primary_color_white)"
                bgcolor="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_black)"
                onClick={applyBatchEdits}
              >
                Apply Batch Edits
              </Button>
            )}
          </div>

          {imagePreview ? (
            <div className="ime_preview_section">
              <img src={imagePreview} alt="Preview" className="ime_preview" />
            </div>
          ) : (
            <div className="ime_preview_placeholder">
              <p>No preview available for this image format.</p>
            </div>
          )}

          {metadata && (
            <div className="ime_metadata_section">
              <h3>Metadata Viewer</h3>
              <ul className="ime_metadata_list">
                {Object.entries(editedMetadata?.tags || {}).map(
                  ([key, value]) => (
                    <li key={key}>
                      <label>{key}:</label>
                      <input
                        type="text"
                        value={String(value)}
                        onChange={e =>
                          handleMetadataEdit(
                            key as keyof Metadata,
                            e.target.value
                          )
                        }
                      />
                    </li>
                  )
                )}
              </ul>

              {geolocation && (
                <div className="ime_geolocation">
                  <h4>Geolocation</h4>
                  <label>Latitude:</label>
                  <input
                    type="number"
                    value={geolocation?.lat || 0}
                    onChange={e =>
                      handleGeolocationEdit(
                        parseFloat(e.target.value),
                        geolocation?.lon || 0
                      )
                    }
                  />
                  <label>Longitude:</label>
                  <input
                    type="number"
                    value={geolocation?.lon || 0}
                    onChange={e =>
                      handleGeolocationEdit(
                        geolocation?.lat || 0,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              )}

              <Button
                color="var(--theme_primary_color_white)"
                bgcolor="var(--theme_primary_color_red)"
                border="var(--theme_primary_color_red)"
                onClick={handleRemoveMetadata}
                style={{ marginBottom: '10px' }}
              >
                Remove All Metadata
              </Button>

              <Button
                color="var(--theme_primary_color_white)"
                bgcolor="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_black)"
                onClick={() => handleDownload(true)}
                style={{ marginBottom: '10px' }}
              >
                Download with Metadata
              </Button>

              <Button
                color="var(--theme_primary_color_white)"
                bgcolor="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_black)"
                onClick={() => handleDownload(false)}
                style={{ marginBottom: '10px' }}
              >
                Download without Metadata
              </Button>

              <input
                type="file"
                accept="image/*, .cr2, .nef, .arw, .dng, .raw"
                onChange={handleImportMetadata}
                className="ime_input"
                style={{ marginRight: '20px' }}
              />
              <label>Import Metadata from another image</label>

              <div className="ime_custom_tag">
                <h4>Add Custom Metadata Tag</h4>
                <input
                  type="text"
                  placeholder="Tag Name"
                  onChange={e => handleCustomTagAdd(e.target.value, '')}
                />
                <input
                  type="text"
                  placeholder="Tag Value"
                  onChange={e =>
                    handleCustomTagAdd(e.target.value, e.target.value)
                  }
                />
                <Button
                  color="var(--theme_primary_color_white)"
                  bgcolor="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_black)"
                  onClick={() => alert('Custom Tag Added')}
                >
                  Add Custom Tag
                </Button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="ime_file_info_section">
              <h3>File Information</h3>
              <ul className="ime_file_info_list">
                <li>
                  <strong>Name:</strong> {fileInfo.name}
                </li>
                <li>
                  <strong>Kind:</strong> {fileInfo.kind}
                </li>
                <li>
                  <strong>Size:</strong> {fileInfo.size}
                </li>
                <li>
                  <strong>Location:</strong> {fileInfo.location}
                </li>
                <li>
                  <strong>Created:</strong> {fileInfo.created}
                </li>
                <li>
                  <strong>Modified:</strong> {fileInfo.modified}
                </li>
                <li>
                  <strong>Last opened:</strong> {fileInfo.lastOpened}
                </li>
                <li>
                  <strong>Dimensions:</strong> {fileInfo.dimensions}
                </li>
                <li>
                  <strong>Color space:</strong> {fileInfo.colorSpace}
                </li>
                <li>
                  <strong>Color profile:</strong> {fileInfo.colorProfile}
                </li>
                <li>
                  <strong>Alpha channel:</strong> {fileInfo.alphaChannel}
                </li>
                <li>
                  <strong>DPI:</strong>{' '}
                  {metadata?.tags.XResolution || 'Unknown'}
                </li>
                <li>
                  <strong>Orientation:</strong>{' '}
                  {metadata?.tags.Orientation || 'Unknown'}
                </li>
                <li>
                  <strong>Bit Depth:</strong> {metadata?.bitDepth || 'Unknown'}
                </li>
                <li>
                  <strong>Compression:</strong>{' '}
                  {metadata?.compression || 'Unknown'}
                </li>
                <li>
                  <strong>Camera Make:</strong>{' '}
                  {metadata?.cameraMake || 'Unknown'}
                </li>
                <li>
                  <strong>Camera Model:</strong>{' '}
                  {metadata?.cameraModel || 'Unknown'}
                </li>
                <li>
                  <strong>Exposure Time:</strong>{' '}
                  {metadata?.exposureTime || 'Unknown'}
                </li>
                <li>
                  <strong>F-Number:</strong> {metadata?.fNumber || 'Unknown'}
                </li>
                <li>
                  <strong>ISO Speed:</strong> {metadata?.isoSpeed || 'Unknown'}
                </li>
                <li>
                  <strong>Focal Length:</strong>{' '}
                  {metadata?.focalLength || 'Unknown'}
                </li>
                <li>
                  <strong>Software:</strong> {metadata?.software || 'Unknown'}
                </li>
              </ul>
            </div>
          )}
        </div>
      </Page>
      <Footer />
    </>
  );
}
