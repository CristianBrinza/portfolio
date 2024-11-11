// src/pages/admin/storage/FileManager.tsx

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import Popup from '../../../components/Popup/Popup';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import FilePreviewModal from '../../../components/FilePreviewModal/FilePreviewModal';
import './FileManager.css';

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

const FileManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [items, setItems] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPath, setCurrentPath] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState<number>(1);
    const [pageSize] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);
    const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
    const [showRenamePopup, setShowRenamePopup] = useState<boolean>(false);
    const [itemToRename, setItemToRename] = useState<FileItem | null>(null);
    const [newName, setNewName] = useState<string>('');

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'File Manager' },
    ];

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchItems();
        }
    }, [role, currentPath, searchQuery, sortBy, sortOrder, page]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND}/storage/items`,
                {
                    params: {
                        path: currentPath,
                        search: searchQuery,
                        sortBy,
                        sortOrder,
                        page,
                        pageSize,
                    },
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setItems(response.data.items);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error: unknown) {
            console.error('Error fetching items:', error);
            setLoading(false);
            setNotification({
                message: 'Error fetching items.',
                type: 'error',
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const handleOrderChange = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const navigateToFolder = (folderName: string) => {
        setCurrentPath((prev) => pathJoin(prev, folderName));
        setPage(1);
    };

    const goUpOneLevel = () => {
        setCurrentPath((prev) => prev.split('/').slice(0, -1).join('/'));
        setPage(1);
    };

    const pathJoin = (...args: string[]) => {
        return args.filter(Boolean).join('/');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            await api.post(
                `${import.meta.env.VITE_BACKEND}/storage/upload?folderPath=${encodeURIComponent(currentPath)}`,
                formData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadProgress(percentCompleted);
                        }
                    },
                }
            );
            setNotification({ message: 'Files uploaded successfully!', type: 'success' });
            setShowUploadPopup(false);
            setUploadProgress(0);
            fetchItems();
        } catch (error) {
            console.error('Error uploading files:', error);
            setNotification({ message: 'Error uploading files.', type: 'error' });
            setShowUploadPopup(false);
            setUploadProgress(0);
        }
    };

    const openFilePreview = (file: FileItem) => {
        setPreviewFile(file);
        setShowPreviewModal(true);
    };

    const closeFilePreview = () => {
        setShowPreviewModal(false);
        setPreviewFile(null);
    };

    const addToFavorites = async (item: FileItem) => {
        try {
            await api.post(
                `${import.meta.env.VITE_BACKEND}/storage/favorites/add`,
                { itemPath: item.path },
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setNotification({ message: 'Added to favorites!', type: 'success' });
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setNotification({ message: 'Error adding to favorites.', type: 'error' });
        }
    };

    const deleteItem = async (item: FileItem) => {
        if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return;
        try {
            await api.delete(`${import.meta.env.VITE_BACKEND}/storage/delete`, {
                data: { itemPath: item.path },
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotification({ message: 'Item moved to trash.', type: 'info' });
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            setNotification({ message: 'Error deleting item.', type: 'error' });
        }
    };

    const downloadItem = (item: FileItem) => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_BACKEND}/storage/download?path=${encodeURIComponent(
            item.path
        )}`;
        link.target = '_blank';
        link.click();
    };

    const formatSize = (size: number) => {
        if (size < 1024) return `${size} B`;
        else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        else if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    };

    // Rename functionality
    const openRenamePopup = (item: FileItem) => {
        setItemToRename(item);
        setNewName(item.name);
        setShowRenamePopup(true);
    };

    const closeRenamePopup = () => {
        setShowRenamePopup(false);
        setItemToRename(null);
        setNewName('');
    };

    const handleRename = async () => {
        if (!itemToRename) return;
        if (!newName || !/^[^<>:"/\\|?*]+$/.test(newName)) {
            setNotification({ message: 'Invalid name.', type: 'error' });
            return;
        }
        try {
            await api.put(
                `${import.meta.env.VITE_BACKEND}/storage/rename`,
                { oldPath: itemToRename.path, newName },
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setNotification({ message: 'Item renamed successfully!', type: 'success' });
            closeRenamePopup();
            fetchItems();
        } catch (error) {
            console.error('Error renaming item:', error);
            setNotification({ message: 'Error renaming item.', type: 'error' });
            closeRenamePopup();
        }
    };

    return (
        <AdminLayout breadcrumb={breadcrumbItems}>

            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}

            <div className="file_manager_controls">
                <div className="file_manager_actions">
                    <Button onClick={() => fileInputRef.current?.click()}>Upload Files</Button>
                    <Button onClick={goUpOneLevel} disabled={!currentPath}>
                        Up One Level
                    </Button>
                </div>
                <div className="file_manager_search_sort">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <select value={sortBy} className="file_manager_controls_sort_costume" onChange={handleSortChange}>
                        <option value="name">Name</option>
                        <option value="size">Size</option>
                        <option value="modifiedAt">Modified At</option>
                        <option value="createdAt">Created At</option>
                    </select>
                    <Button onClick={handleOrderChange}>{sortOrder === 'asc' ? '↑' : '↓'}</Button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="file_manager_items">
                    {items.map((item) => (
                        <div
                            key={item.path}
                            className="file_manager_item"
                            onDoubleClick={() => {
                                if (item.isFolder) navigateToFolder(item.name);
                            }}
                        >
                            <div className="file_manager_item_icon">
                                {item.isFolder ? (
                                    <i className="fas fa-folder"></i>
                                ) : item.mimeType && item.mimeType.startsWith('image/') ? (
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND}/storage/preview?path=${encodeURIComponent(
                                            item.path
                                        )}`}
                                        alt={item.name}
                                    />
                                ) : (
                                    <i className="fas fa-file"></i>
                                )}
                            </div>
                            <div className="file_manager_item_info">
                                <span className="file_manager_item_name">{item.name}</span>
                                <div className="file_manager_item_hover_info">
                                    <p>Size: {formatSize(item.size)}</p>
                                    <p>Modified: {new Date(item.modifiedAt).toLocaleString()}</p>
                                    <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="file_manager_item_actions">
                                {!item.isFolder && (
                                    <Button onClick={() => openFilePreview(item)}>Preview</Button>
                                )}
                                <Button onClick={() => openRenamePopup(item)}>Rename</Button>
                                <Button onClick={() => addToFavorites(item)}>★</Button>
                                <Button onClick={() => deleteItem(item)}>🗑</Button>
                                {!item.isFolder && (
                                    <Button onClick={() => downloadItem(item)}>⬇</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="file_manager_pagination">
                <Button onClick={() => setPage(1)} disabled={page === 1}>
                    « First
                </Button>
                <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    ‹ Prev
                </Button>
                <span>
          Page {page} of {totalPages}
        </span>
                <Button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next ›
                </Button>
                <Button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                    Last »
                </Button>
            </div>

            {/* Hidden file input for uploads */}
            <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />

            {/* Upload Progress Popup */}
            {showUploadPopup && (
                <Popup isVisible={showUploadPopup} onClose={() => setShowUploadPopup(false)}>
                    <div className="upload_progress_popup">
                        <h2>Uploading...</h2>
                        <ProgressBar progress={uploadProgress} />
                    </div>
                </Popup>
            )}

            {/* File Preview Modal */}
            {showPreviewModal && previewFile && (
                <FilePreviewModal
                    file={previewFile}
                    onClose={closeFilePreview}
                    language={language}
                />
            )}

            {/* Rename Popup */}
            {showRenamePopup && (
                <Popup isVisible={showRenamePopup} onClose={closeRenamePopup}>
                    <div className="rename_popup">
                        <h2>Rename Item</h2>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <div className="popup_actions">
                            <Button onClick={handleRename}>Rename</Button>
                            <Button onClick={closeRenamePopup}>Cancel</Button>
                        </div>
                    </div>
                </Popup>
            )}
        </AdminLayout>
    );
};

export default FileManager;
