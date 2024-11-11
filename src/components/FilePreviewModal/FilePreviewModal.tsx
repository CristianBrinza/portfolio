// src/components/FilePreviewModal/FilePreviewModal.tsx

import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import api from '../../utils/api';
import './FilePreviewModal.css';

interface FileItem {
    name: string;
    path: string;
    isFile: boolean;
    isFolder: boolean;
    size: number;
    modifiedAt: string;
    createdAt: string;
    mimeType: string | null;
}

interface FilePreviewModalProps {
    file: FileItem;
    onClose: () => void;
    language: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                if (file.mimeType && file.mimeType.startsWith('image/')) {
                    setContent(
                        `${import.meta.env.VITE_BACKEND}/storage/preview?path=${encodeURIComponent(
                            file.path
                        )}`
                    );
                } else {
                    const response = await api.get(
                        `${import.meta.env.VITE_BACKEND}/storage/preview`,
                        {
                            params: { path: file.path },
                            headers: {
                                'ngrok-skip-browser-warning': 'true',
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setContent(response.data);
                }
            } catch (error) {
                console.error('Error fetching file preview:', error);
                setContent('Preview not available.');
            }
        };

        fetchPreview();
    }, [file]);

    const isImage = file.mimeType?.startsWith('image/');
    const isText = file.mimeType?.startsWith('text/');

    return (
        <Popup id="filePreviewModal" isVisible={true} onClose={onClose}>
            <div className="file_preview_modal">
                <h2>Preview: {file.name}</h2>
                <div className="file_preview_content">
                    {isImage && <img src={content || ''} alt={file.name} />}
                    {isText && <pre>{content}</pre>}
                    {!isImage && !isText && <p>Preview not available for this file type.</p>}
                </div>
            </div>
        </Popup>
    );
};

export default FilePreviewModal;
