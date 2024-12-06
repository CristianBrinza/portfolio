// src/components/FilePreviewModal/FilePreviewModal.tsx

import React, { useEffect, useState } from 'react';
import './FilePreviewModal.css';
import Icon from '../Icon.tsx';

interface FilePreviewModalProps {
  file: {
    name: string;
    path: string;
    mimeType: string | null;
  };
  onClose: () => void;
  language: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  file,
  onClose,
}) => {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const token = localStorage.getItem('token');
        const previewUrl = `${import.meta.env.VITE_BACKEND}/storage/preview?path=${encodeURIComponent(file.path)}`;
        const response = await fetch(previewUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (response.ok) {
          if (file.mimeType?.startsWith('image/')) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setContent(blobUrl);
          } else if (file.mimeType?.startsWith('text/')) {
            const text = await response.text();
            setContent(text);
          } else if (file.mimeType === 'application/pdf') {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setContent(blobUrl);
          } else {
            setContent(null);
          }
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error('Error fetching file preview:', error);
        setContent(null);
      }
    };

    fetchPreview();
  }, [file]);

  const renderContent = () => {
    if (!content) {
      return <p>Preview not available.</p>;
    }

    if (file.mimeType?.startsWith('image/')) {
      return (
        <img
          src={content}
          alt={file.name}
          style={{ width: '100%', height: 'auto' }}
        />
      );
    }

    if (file.mimeType?.startsWith('text/')) {
      return (
        <textarea
          readOnly
          value={content}
          style={{ width: '100%', height: '80vh' }}
        ></textarea>
      );
    }

    if (file.mimeType === 'application/pdf') {
      return (
        <iframe
          src={content}
          title={file.name}
          style={{ width: '100%', height: '80vh' }}
        ></iframe>
      );
    }

    return <p>Preview not available.</p>;
  };

  return (
    <div className="file_preview_modal">
      <div className="file_preview_modal_content">
        <button className="close_button" onClick={onClose}>
          <Icon type="close" />
        </button>
        <h2>{file.name}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default FilePreviewModal;
