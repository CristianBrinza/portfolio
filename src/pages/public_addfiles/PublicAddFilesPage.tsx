import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { t } from 'i18next';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Footer from '../../components/Footer/Footer';
import Notification from '../../components/Notification/Notification';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Popup from '../../components/Popup/Popup';

interface FileItem {
  name: string;
  path: string;
}

const PublicAddFilesPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: 'error' | 'success';
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (code) {
      fetchFiles();
    }
  }, [code]);

  const fetchFiles = async () => {
    try {
      const response = await api.get(`/add-files/${code}`);

      // Map response data to include both name and path
      const mappedFiles = response.data.map((file: string) => ({
        name: file.split('/').pop(), // Extract the file name from the path
        path: file, // Full path of the file
      }));

      setFiles(mappedFiles);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // Code doesn't exist => redirect
        navigate('/404');
        return;
      }
      setNotification({ message: 'Error fetching files', type: 'error' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileList(Array.from(e.target.files));
    }
  };

  const uploadFiles = async () => {
    if (!fileList.length) {
      setNotification({ message: 'No files selected', type: 'error' });
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file);
    });

    try {
      await api.post(`/add-files/${code}`, formData, {
        onUploadProgress: evt => {
          if (evt.total) {
            const percent = Math.round((evt.loaded * 100) / evt.total);
            setUploadProgress(percent);
          }
        },
      });
      setNotification({ message: 'Upload successful', type: 'success' });
      setFileList([]);
      fetchFiles();
    } catch (error) {
      setNotification({ message: 'Error uploading files', type: 'error' });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadFile = (fileName: string) => {
    const downloadUrl = `${import.meta.env.VITE_BACKEND}/add-files/${code}/${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  const downloadAllFiles = () => {
    const downloadUrl = `${import.meta.env.VITE_BACKEND}/add-files/${code}/download-all`;
    window.open(downloadUrl, '_blank');
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: `Add Files / ${code}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="40px">
        {notification && (
          <Notification
            type={notification.type}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}
        <div style={{ marginTop: '20px' }}>
          <h3>Upload Files:</h3>
          <div
            style={{
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{
                border: '1px solid var(--theme_primary_color_darkest_gray)',
                borderRadius: '100px',
                padding: '10px',
              }}
            />
            <Button onClick={uploadFiles} color="#fff" bgcolor="#317ce6">
              Upload
            </Button>
          </div>
        </div>

        {isUploading && (
          <Popup id="add_publib_popup" isVisible={true} onClose={() => {}}>
            <div style={{ padding: '20px' }}>
              <h3>Uploading Files...</h3>
              <ProgressBar progress={uploadProgress} />
              <span>{uploadProgress}%</span>
            </div>
          </Popup>
        )}

        <div style={{ marginTop: '20px' }}>
          <h3>Existing Files:</h3>
          {files.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            <div className="shared-files-list">
              {files.map(file => (
                <div key={file.path} className="shared-file-item">
                  <span className="shared-files-list_title">
                    <Icon type="file" />
                    <p>{file.name}</p>
                  </span>
                  <Button
                    color="var(--theme_primary_color_black)"
                    bgcolor="var(--theme_primary_color_dark_gray)"
                    onClick={() => downloadFile(file.name)}
                  >
                    <Icon type="download" />
                  </Button>
                </div>
              ))}

              <Button
                color="var(--theme_primary_color_black)"
                bgcolor="var(--theme_primary_color_dark_gray)"
                onClick={downloadAllFiles}
                style={{ marginTop: '10px' }}
              >
                Download All
              </Button>
            </div>
          )}
        </div>
      </Page>
      <Footer />
    </>
  );
};

export default PublicAddFilesPage;