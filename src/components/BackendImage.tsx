import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BackendImage: React.FC = () => {
  const { imageName } = useParams();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/images/${encodeURIComponent(imageName!)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    if (imageName) {
      fetchImage();
    }
  }, [imageName]);

  if (error) {
    return <div>Error loading image: {error}</div>;
  }

  if (!imageSrc) {
    return <div>Loading image...</div>;
  }

  return (
    <img
      src={imageSrc}
      alt={imageName}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default BackendImage;
