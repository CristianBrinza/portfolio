import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import Button from '../../../components/Button';
import Popup from '../../../components/Popup/Popup';
import Notification from '../../../components/Notification/Notification';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import PageLoading from '../../../components/PageLoading/PageLoading';
import { menu as AdminMenu } from '../menues';
import './ShareManager.css';

interface FileItem {
    name: string;
    type: 'file' | 'folder';
    path: string;
}

interface ShareLink {
    code: string;
    paths: string[];
    createdAt: string;
}

const ShareManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);
    const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
    const [showConflictPopup, setShowConflictPopup] = useState<boolean>(false);
    const [uploadFilesData, setUploadFilesData] = useState<File[]>([]);
    const [conflictingFiles, setConflictingFiles] = useState<File[]>([]);
    const [conflictResolutions, setConflictResolutions] = useState<{
        [fileName: string]: 'overwrite' | 'rename';
    }>({});
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [currentPath, setCurrentPath] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [shareLinks, setShareLinks] = useState<ShareLink[]>([]);
    const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
    const [showCreateFolderPopup, setShowCreateFolderPopup] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>('');

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'Share Manager' },
    ];

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchFiles();
            fetchShareLinks();
        }
    }, [role, currentPath]);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const response = await api.get('/share', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    path: currentPath,
                },
            });
            setFiles(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setNotification({
                message: 'Error fetching files.',
                type: 'error',
            });
        }
    };

    const fetchShareLinks = async () => {
        try {
            const response = await api.get('/share/links', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setShareLinks(response.data);
        } catch (error) {
            setNotification({
                message: 'Error fetching share links.',
                type: 'error',
            });
        }
    };

    const handleUploadFiles = async () => {
        setShowUploadPopup(false);
        if (!uploadFilesData.length) {
            setNotification({
                message: 'Please select files to upload.',
                type: 'error',
            });
            return;
        }

        // Check for conflicts
        const existingFileNames = files.map((file) => file.name);
        const conflicts = uploadFilesData.filter((file) =>
            existingFileNames.includes(file.name)
        );

        if (conflicts.length > 0) {
            setConflictingFiles(conflicts);
            setShowConflictPopup(true);
        } else {
            await proceedWithUpload();
        }
    };

    const proceedWithUpload = async () => {
        setIsUploading(true);
        setUploadProgress(0);

        const totalFiles = uploadFilesData.length;
        for (let i = 0; i < totalFiles; i++) {
            let file = uploadFilesData[i];
            let fileName = file.name;

            if (conflictResolutions[fileName]) {
                const choice = conflictResolutions[fileName];
                if (choice === 'overwrite') {
                    try {
                        await api.delete('/share/delete', {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                            data: {
                                itemPath: `${currentPath}/${fileName}`,
                            },
                        });
                    } catch (error) {
                        setNotification({
                            message: `Error overwriting file ${fileName}.`,
                            type: 'error',
                        });
                        continue;
                    }
                } else if (choice === 'rename') {
                    const newFileName = getUniqueFileName(fileName);
                    file = new File([file], newFileName, { type: file.type });
                    fileName = newFileName;
                }
            }

            const formData = new FormData();
            formData.append('files', file);
            formData.append('path', currentPath);

            try {
                await api.post('/share/upload', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
            } catch (error) {
                setNotification({
                    message: `Error uploading file ${fileName}.`,
                    type: 'error',
                });
            }
        }

        setIsUploading(false);
        setUploadProgress(0);
        setNotification({
            message: 'Files uploaded successfully!',
            type: 'success',
        });
        fetchFiles();
        setConflictResolutions({});
    };

    const getUniqueFileName = (originalName: string) => {
        const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        let newName = `${nameWithoutExtension}(1)${extension}`;
        let counter = 1;

        const existingFileNames = files.map((file) => file.name);

        while (existingFileNames.includes(newName)) {
            counter++;
            newName = `${nameWithoutExtension}(${counter})${extension}`;
        }

        return newName;
    };

    const handleConflictChoice = (
        fileName: string,
        choice: 'overwrite' | 'rename'
    ) => {
        setConflictResolutions((prev) => ({
            ...prev,
            [fileName]: choice,
        }));
    };

    const handleConflictResolutionDone = async () => {
        setShowConflictPopup(false);
        await proceedWithUpload();
    };

    const allChoicesMade = conflictingFiles.every(
        (file) => conflictResolutions[file.name]
    );

    const openUploadPopup = () => {
        setUploadFilesData([]);
        setShowUploadPopup(true);
    };

    const closeUploadPopup = () => {
        setShowUploadPopup(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadFilesData(Array.from(e.target.files));
        }
    };

    const handleDeleteItem = async (item: FileItem) => {
        if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;

        try {
            await api.delete('/share/delete', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                data: {
                    itemPath: item.path,
                },
            });
            setNotification({
                message: `${item.name} deleted successfully!`,
                type: 'success',
            });
            fetchFiles();
        } catch (error) {
            setNotification({
                message: `Error deleting ${item.name}.`,
                type: 'error',
            });
        }
    };

    const handleItemClick = (item: FileItem) => {
        if (item.type === 'folder') {
            setCurrentPath(item.path);
        } else {
            // Handle file preview or download if needed
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
        if (e.target.checked) {
            setSelectedItems((prev) => [...prev, path]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item !== path));
        }
    };

    const openSharePopup = () => {
        if (selectedItems.length === 0) {
            setNotification({
                message: 'Please select items to share.',
                type: 'error',
            });
            return;
        }
        setShowSharePopup(true);
    };

    const handleCreateShareLink = async () => {
        try {
            await api.post(
                '/share/create-link',
                { items: selectedItems },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setNotification({
                message: 'Share link created successfully!',
                type: 'success',
            });
            fetchShareLinks();
            setShowSharePopup(false);
        } catch (error) {
            setNotification({
                message: 'Error creating share link.',
                type: 'error',
            });
        }
    };

    const handleDeleteShareLink = async (code: string) => {
        if (!window.confirm('Are you sure you want to delete this share link?')) return;
        try {
            await api.delete(`/share/links/${code}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotification({
                message: 'Share link deleted successfully!',
                type: 'success',
            });
            fetchShareLinks();
        } catch (error) {
            setNotification({
                message: 'Error deleting share link.',
                type: 'error',
            });
        }
    };

    const openCreateFolderPopup = () => {
        setNewFolderName('');
        setShowCreateFolderPopup(true);
    };

    const handleCreateFolder = async () => {
        if (!newFolderName) {
            setNotification({
                message: 'Please enter a folder name.',
                type: 'error',
            });
            return;
        }
        try {
            await api.post(
                '/share/create-folder',
                { folderName: newFolderName, path: currentPath },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setNotification({
                message: 'Folder created successfully!',
                type: 'success',
            });
            fetchFiles();
            setShowCreateFolderPopup(false);
        } catch (error) {
            setNotification({
                message: 'Error creating folder.',
                type: 'error',
            });
        }
    };

    const goBack = () => {
        const pathParts = currentPath.split('/').filter(Boolean);
        pathParts.pop();
        setCurrentPath(pathParts.join('/'));
    };

    const menu = AdminMenu.map((item) =>
        item.url === '/dashboard/share-manager'
            ? { ...item, type: 'button_active' }
            : item
    );

    return (
        <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}

            <div className="share_manager_container">
                <div className="share_manager_controls">
                    <div className="share_manager_actions">
                        <Button onClick={openUploadPopup}>Upload Files</Button>
                        <Button onClick={openCreateFolderPopup}>Create Folder</Button>
                        <Button onClick={openSharePopup}>Create Share Link</Button>
                        {currentPath && <Button onClick={goBack}>Go Back</Button>}
                    </div>
                </div>

                {loading ? (
                    <PageLoading />
                ) : files.length > 0 ? (
                    <div className="share_manager_items">
                        {files.map((item) => (
                            <div key={item.path} className="share_manager_item">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, item.path)}
                                />
                                <div
                                    className="share_manager_item_content"
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item.type === 'folder' ? (
                                        <i className="fas fa-folder"></i>
                                    ) : (
                                        <i className="fas fa-file"></i>
                                    )}
                                    <p>{item.name}</p>
                                </div>
                                <Button onClick={() => handleDeleteItem(item)}>Delete</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items available.</p>
                )}

                <h2>Share Links</h2>
                {shareLinks.length > 0 ? (
                    <div className="share_links_list">
                        {shareLinks.map((link) => (
                            <div key={link.code} className="share_link_item">
                                <p>
                                    Link:{' '}
                                    <a
                                        href={`${import.meta.env.VITE_BACKEND}/share/${link.code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {import.meta.env.VITE_BACKEND}/share/{link.code}
                                    </a>
                                </p>
                                <p>Items: {link.paths.join(', ')}</p>
                                <p>
                                    Created At:{' '}
                                    {new Date(link.createdAt).toLocaleString()}
                                </p>
                                <Button onClick={() => handleDeleteShareLink(link.code)}>
                                    Delete Link
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No share links available.</p>
                )}
            </div>

            {isUploading && (
                <Popup
                    id="uploadProgressPopup"
                    isVisible={isUploading}
                    onClose={() => {}}
                >
                    <div className="upload_progress_popup">
                        <h2>Uploading Files...</h2>
                        <ProgressBar progress={uploadProgress} />
                    </div>
                </Popup>
            )}

            {showUploadPopup && (
                <Popup id="share_upload_popup" isVisible={showUploadPopup} onClose={closeUploadPopup}>
                    <div className="popup_content">
                        <h2>Upload Files</h2>
                        <div className="form_group">
                            <label>Select Files</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="popup_actions">
                            <Button onClick={handleUploadFiles}>Upload</Button>
                            <Button onClick={closeUploadPopup}>Cancel</Button>
                        </div>
                    </div>
                </Popup>
            )}

            {showConflictPopup && (
                <Popup
                    id="conflict_resolution_popup"
                    isVisible={showConflictPopup}
                    onClose={() => setShowConflictPopup(false)}
                >
                    <div className="popup_content">
                        <h2>Resolve Filename Conflicts</h2>
                        {conflictingFiles.map((file) => (
                            <div key={file.name} className="conflict_item">
                                <p>File "{file.name}" already exists.</p>
                                <div className="conflict_actions">
                                    <Button
                                        onClick={() =>
                                            handleConflictChoice(file.name, 'overwrite')
                                        }
                                    >
                                        Overwrite
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleConflictChoice(file.name, 'rename')
                                        }
                                    >
                                        Rename to "{getUniqueFileName(file.name)}"
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="popup_actions">
                            <Button
                                onClick={handleConflictResolutionDone}
                                disabled={!allChoicesMade}
                            >
                                Proceed
                            </Button>
                        </div>
                    </div>
                </Popup>
            )}

            {showSharePopup && (
                <Popup id="share_create_link_popup" isVisible={showSharePopup} onClose={() => setShowSharePopup(false)}>
                    <div className="popup_content">
                        <h2>Create Share Link</h2>
                        <p>Selected Items:</p>
                        <ul>
                            {selectedItems.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <div className="popup_actions">
                            <Button onClick={handleCreateShareLink}>Create Link</Button>
                            <Button onClick={() => setShowSharePopup(false)}>Cancel</Button>
                        </div>
                    </div>
                </Popup>
            )}

            {showCreateFolderPopup && (
                <Popup id="share_create_folder_popup" isVisible={showCreateFolderPopup} onClose={() => setShowCreateFolderPopup(false)}>
                    <div className="popup_content">
                        <h2>Create Folder</h2>
                        <div className="form_group">
                            <label>Folder Name</label>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                        </div>
                        <div className="popup_actions">
                            <Button onClick={handleCreateFolder}>Create</Button>
                            <Button onClick={() => setShowCreateFolderPopup(false)}>Cancel</Button>
                        </div>
                    </div>
                </Popup>
            )}
        </AdminLayout>
    );
};

export default ShareManager;
