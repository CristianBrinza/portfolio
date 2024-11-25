import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import './SharedFilesPage.css';
import Page from "../../components/Page.tsx";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.tsx";
import { t } from "i18next";
import Button from "../../components/Button.tsx";
import Icon from "../../components/Icon.tsx";
import Title from "../../components/Text/Title/Title.tsx";
import Footer from "../../components/Footer/Footer.tsx";

interface SharedFile {
    name: string;
    path: string;
    exists: boolean; // Add an 'exists' flag to track file availability
}

const SharedFilesPage: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const [files, setFiles] = useState<SharedFile[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchSharedItems();
    }, [code]);

    const fetchSharedItems = async () => {
        try {
            const response = await api.get(`/share/${code}`);
            const items = response.data.items.map((itemPath: string) => {
                const name = itemPath.split('/').pop();
                return { name, path: itemPath, exists: false }; // Initialize `exists` as false
            });

            // Check existence of each file
            const fileChecks = await Promise.all(
                items.map(async (item) => {
                    try {
                        // Make a HEAD request to check file existence
                        await api.head(`/share/${code}/download?path=${encodeURIComponent(item.path)}`);
                        return { ...item, exists: true };
                    } catch {
                        return item; // File doesn't exist
                    }
                })
            );

            setFiles(fileChecks);
        } catch (err) {
            setError('Failed to load shared files.');
        }
    };

    const downloadFile = (filePath: string) => {
        const downloadUrl = `${import.meta.env.VITE_BACKEND}/share/${code}/download?path=${encodeURIComponent(filePath)}`;
        window.open(downloadUrl, '_blank');
    };

    const downloadAllFiles = () => {
        const downloadUrl = `${import.meta.env.VITE_BACKEND}/share/${code}/download-all`;
        window.open(downloadUrl, '_blank');
    };

    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: `Shared Files / ${code}` },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <Page gap="20px">
                <Title><br />Shared Files</Title>
                {error && <p>{error}</p>}
                {files.length > 0 ? (
                    <div className="shared-files-list">
                        {files.map((file) => (
                            <div key={file.path} className="shared-file-item">
                                <span className="shared-files-list_title">
                                    {!file.exists && <Icon type="close" />} {<Icon type="empty" />}
                                    <p>{file.name}</p>
                                </span>
                                {file.exists && (
                                    <Button
                                        color="var(--theme_primary_color_black)"
                                        bgcolor="var(--theme_primary_color_dark_gray)"
                                        onClick={() => downloadFile(file.path)}>
                                        <Icon type="download" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            color="var(--theme_primary_color_black)"
                            bgcolor="var(--theme_primary_color_dark_gray)"
                            onClick={downloadAllFiles}>
                            Download All
                        </Button>
                    </div>
                ) : (
                    <p>No files shared.</p>
                )}
            </Page>
            <Footer />
        </>
    );
};

export default SharedFilesPage;
