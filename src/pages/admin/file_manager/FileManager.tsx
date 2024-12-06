import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import Popup from '../../../components/Popup/Popup';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import FilePreviewModal from '../../../components/FilePreviewModal/FilePreviewModal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './FileManager.css';
import Icon from '../../../components/Icon.tsx';
import PageLoading from '../../../components/PageLoading/PageLoading.tsx';
import { storage_menu as AdminMenu } from '../menues.ts';

interface FileItem {
  name: string;
  path: string;
  isFile: boolean;
  isFolder: boolean;
  size: number;
  modifiedAt: string;
  createdAt: string;
  mimeType: string | null;
  createdBy?: string;
  lastModifiedBy?: string;
  isFavorite?: boolean; // Added isFavorite property
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
  const [showCreateFolderPopup, setShowCreateFolderPopup] =
    useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');

  // State to store file previews
  const [filePreviews, setFilePreviews] = useState<{
    [key: string]: { url: string; mimeType: string };
  }>({});

  // State for sharing functionality
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);
  const [itemToShare, setItemToShare] = useState<FileItem | null>(null);
  const [expiresIn, setExpiresIn] = useState<number>(24); // Default to 24 hours

  // State for moving items
  const [showMovePopup, setShowMovePopup] = useState<boolean>(false);
  const [itemToMove, setItemToMove] = useState<FileItem | null>(null);
  const [destinationPath, setDestinationPath] = useState<string>('');

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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      let fetchedItems: FileItem[] = response.data.items;

      // Custom sorting
      fetchedItems = customSortItems(fetchedItems);

      setItems(fetchedItems);
      setTotalPages(response.data.totalPages);
      setLoading(false);

      // Fetch file previews
      fetchFilePreviews(fetchedItems);
    } catch (error: any) {
      console.error('Error fetching items:', error);
      setLoading(false);
      setNotification({
        message: 'Error fetching items.',
        type: 'error',
      });
    }
  };

  // Function to custom sort items
  const customSortItems = (items: FileItem[]) => {
    return items.sort((a, b) => {
      // Always put '.trash' folder first
      if (a.name === '.trash') return -1;
      if (b.name === '.trash') return 1;

      // Always put '.versions' folder second
      if (a.name === '.versions') {
        if (b.name === '.trash') return 1;
        return -1;
      }
      if (b.name === '.versions') {
        if (a.name === '.trash') return -1;
        return 1;
      }

      // Always put '.favorite' folder third
      if (a.name === '.favorite') {
        if (b.name === '.trash' || b.name === '.versions') return 1;
        return -1;
      }
      if (b.name === '.favorite') {
        if (a.name === '.trash' || a.name === '.versions') return -1;
        return 1;
      }

      // Folders before files
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      // Apply sorting based on sortBy and sortOrder
      let compare = 0;
      if (sortBy === 'name') {
        compare = a.name.localeCompare(b.name);
      } else if (sortBy === 'size') {
        compare = a.size - b.size;
      } else if (sortBy === 'modifiedAt') {
        compare =
          new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
      } else if (sortBy === 'createdAt') {
        compare =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortOrder === 'asc' ? compare : -compare;
    });
  };

  // Function to fetch file previews
  const fetchFilePreviews = async (items: FileItem[]) => {
    const previews: { [key: string]: { url: string; mimeType: string } } = {};

    await Promise.all(
      items.map(async item => {
        if (item.isFile && item.mimeType) {
          try {
            const token = localStorage.getItem('token');
            const previewUrl = `${import.meta.env.VITE_BACKEND}/storage/preview?path=${encodeURIComponent(item.path)}`;
            const response = await fetch(previewUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true',
              },
            });
            if (response.ok) {
              const blob = await response.blob();
              const blobUrl = URL.createObjectURL(blob);
              previews[item.path] = { url: blobUrl, mimeType: item.mimeType };
            } else {
              console.error(`Failed to fetch preview for ${item.name}`);
            }
          } catch (error) {
            console.error(`Error fetching preview for ${item.name}:`, error);
          }
        }
      })
    );

    setFilePreviews(previews);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const navigateToFolder = (folderName: string) => {
    setCurrentPath(prev => pathJoin(prev, folderName));
    setPage(1);
  };

  const goUpOneLevel = () => {
    setCurrentPath(prev => prev.split('/').slice(0, -1).join('/'));
    setPage(1);
  };

  const pathJoin = (...args: string[]) => {
    return args.filter(Boolean).join('/');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      setShowUploadPopup(true);
      await api.post(
        `${import.meta.env.VITE_BACKEND}/storage/upload?folderPath=${encodeURIComponent(currentPath)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          onUploadProgress: progressEvent => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );
      setNotification({
        message: 'Files uploaded successfully!',
        type: 'success',
      });
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

  const deleteItem = async (item: FileItem) => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`))
      return;
    try {
      await api.delete(`${import.meta.env.VITE_BACKEND}/storage/delete`, {
        data: { itemPath: item.path },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotification({ message: 'Item moved to trash.', type: 'success' });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      setNotification({ message: 'Error deleting item.', type: 'error' });
    }
  };

  // Permanently delete item from trash
  const deleteItemPermanently = async (item: FileItem) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete ${item.name}?`
      )
    )
      return;
    try {
      await api.delete(`${import.meta.env.VITE_BACKEND}/storage/trash/delete`, {
        data: { itemPath: item.path.replace('.trash/', '') },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotification({ message: 'Item permanently deleted.', type: 'info' });
      fetchItems();
    } catch (error) {
      console.error('Error permanently deleting item:', error);
      setNotification({ message: 'Error deleting item.', type: 'error' });
    }
  };

  const restoreItem = async (item: FileItem) => {
    try {
      await api.put(
        `${import.meta.env.VITE_BACKEND}/storage/trash/restore`,
        {
          itemPath: item.path.replace('.trash/', ''),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotification({
        message: 'Item restored successfully.',
        type: 'success',
      });
      fetchItems();
    } catch (error) {
      console.error('Error restoring item:', error);
      setNotification({ message: 'Error restoring item.', type: 'error' });
    }
  };

  const downloadItem = async (item: FileItem) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/storage/download?path=${encodeURIComponent(item.path)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error downloading file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = item.name;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setNotification({ message: 'Error downloading file.', type: 'error' });
    }
  };

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotification({
        message: 'Item renamed successfully!',
        type: 'success',
      });
      closeRenamePopup();
      fetchItems();
    } catch (error) {
      console.error('Error renaming item:', error);
      setNotification({ message: 'Error renaming item.', type: 'error' });
      closeRenamePopup();
    }
  };

  // Share functionality
  const openSharePopup = (item: FileItem) => {
    setItemToShare(item);
    setShowSharePopup(true);
  };

  const closeSharePopup = () => {
    setShowSharePopup(false);
    setItemToShare(null);
    setShareLink(null);
  };

  const handleCreateShareLink = async () => {
    if (!itemToShare) return;
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND}/storage/share`,
        { filePath: itemToShare.path, expiresIn },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setShareLink(response.data.shareLink);
    } catch (error) {
      console.error('Error creating share link:', error);
      setNotification({ message: 'Error creating share link', type: 'error' });
    }
  };

  // Create folder functionality
  const openCreateFolderPopup = () => {
    setShowCreateFolderPopup(true);
    setNewFolderName('');
  };

  const closeCreateFolderPopup = () => {
    setShowCreateFolderPopup(false);
    setNewFolderName('');
  };

  const handleCreateFolder = async () => {
    if (!newFolderName || !/^[^<>:"/\\|?*]+$/.test(newFolderName)) {
      setNotification({ message: 'Invalid folder name.', type: 'error' });
      return;
    }
    try {
      await api.post(
        `${import.meta.env.VITE_BACKEND}/storage/folder`,
        {
          folderName: newFolderName,
          parentPath: currentPath,
        },
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
      closeCreateFolderPopup();
      fetchItems();
    } catch (error) {
      console.error('Error creating folder:', error);
      setNotification({ message: 'Error creating folder.', type: 'error' });
      closeCreateFolderPopup();
    }
  };

  // Toggle favorite functionality
  const toggleFavorite = async (item: FileItem) => {
    try {
      if (item.isFavorite) {
        // Remove from favorites
        await api.delete(`${import.meta.env.VITE_BACKEND}/storage/favorite`, {
          data: { itemPath: item.path },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotification({
          message: 'Item removed from favorites.',
          type: 'info',
        });
      } else {
        // Add to favorites
        await api.post(
          `${import.meta.env.VITE_BACKEND}/storage/favorite`,
          { itemPath: item.path },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setNotification({
          message: 'Item added to favorites.',
          type: 'success',
        });
      }

      // Update the item's isFavorite status
      setItems(prevItems =>
        prevItems.map(prevItem =>
          prevItem.path === item.path
            ? { ...prevItem, isFavorite: !item.isFavorite }
            : prevItem
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setNotification({
        message: 'Error updating favorite status.',
        type: 'error',
      });
    }
  };

  // Move functionality
  const openMovePopup = (item: FileItem) => {
    setItemToMove(item);
    setDestinationPath('');
    setShowMovePopup(true);
  };

  const closeMovePopup = () => {
    setShowMovePopup(false);
    setItemToMove(null);
    setDestinationPath('');
  };

  const handleMove = async () => {
    if (!itemToMove || !destinationPath) return;
    try {
      await api.put(
        `${import.meta.env.VITE_BACKEND}/storage/move`,
        { sourcePath: itemToMove.path, destinationPath },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotification({ message: 'Item moved successfully!', type: 'success' });
      closeMovePopup();
      fetchItems();
    } catch (error) {
      console.error('Error moving item:', error);
      setNotification({ message: 'Error moving item.', type: 'error' });
      closeMovePopup();
    }
  };

  // Check if current path is in .trash
  const isInTrash = currentPath.startsWith('.trash');

  const menu = AdminMenu.map(item =>
    item.url === '/dashboard/storage'
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

      <div className="file_manager_controls">
        <div className="file_manager_actions">
          <Button
            color="var(--theme_primary_color_black)"
            bgcolor="var(--theme_primary_color_dark_gray)"
            border="var(--theme_primary_color_dark_gray)"
            onClick={goUpOneLevel}
            disabled={!currentPath}
          >
            <Icon type="arrow" rotate="180" />
          </Button>
          {!isInTrash && (
            <>
              <Button
                color="#fff"
                bgcolor="#317ce6"
                border="#317ce6"
                hover_bgcolor="#1967D2"
                hover_color="#fff"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Files
              </Button>
              <Button
                color="#fff"
                bgcolor="#28a745"
                border="#28a745"
                hover_bgcolor="#218838"
                hover_color="#fff"
                onClick={openCreateFolderPopup}
              >
                Create New Folder
              </Button>
            </>
          )}
        </div>
        <div className="file_manager_search_sort">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            value={sortBy}
            className="file_manager_controls_sort_custom"
            onChange={handleSortChange}
          >
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="modifiedAt">Modified At</option>
            <option value="createdAt">Created At</option>
          </select>
          <Button
            border="var(--theme_primary_color_dark_gray)"
            onClick={handleOrderChange}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>

      {loading ? (
        <PageLoading />
      ) : (
        <div className="file_manager_items">
          {items.map(item => (
            <div
              key={item.path}
              className={`file_manager_item ${item.isFolder ? 'file_preview_folder' : ''}`}
              onDoubleClick={() => {
                if (item.isFolder) navigateToFolder(item.name);
              }}
            >
              <div className="file_manager_item_icon">
                {item.isFolder ? (
                  <i className="fas fa-folder"></i>
                ) : (
                  <div
                    className="file_preview_thumbnail"
                    onClick={() => openFilePreview(item)}
                  >
                    {item.mimeType?.startsWith('image/') &&
                    filePreviews[item.path] ? (
                      <img src={filePreviews[item.path].url} alt={item.name} />
                    ) : (
                      // Replace the image with a styled div
                      <div className="file_placeholder_thumbnail">
                        <i className="fas fa-file" />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="file_manager_item_info">
                <span className="file_manager_item_name">{item.name}</span>
                <div className="file_manager_item_hover_info">
                  <p>Size: {formatSize(item.size)}</p>
                  <p>Modified: {new Date(item.modifiedAt).toLocaleString()}</p>
                  <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                  <p>Uploaded By: {item.createdBy || 'N/A'}</p>
                  <p>Last Modified By: {item.lastModifiedBy || 'N/A'}</p>
                </div>
              </div>
              <div className="file_manager_item_actions">
                {/* Hide action buttons for .trash, version, and .favorite folders */}
                {!(
                  item.name === '.trash' ||
                  item.name === '.versions' ||
                  item.name === '.favorite'
                ) && (
                  <>
                    {!item.isFolder && !isInTrash && (
                      <Button onClick={() => openFilePreview(item)}>
                        <Icon type="preview" />
                      </Button>
                    )}
                    {!isInTrash && (
                      <>
                        <Button onClick={() => openRenamePopup(item)}>
                          <Icon type="rename" />
                        </Button>
                        <Button onClick={() => openSharePopup(item)}>
                          <Icon type="share" />
                        </Button>
                        <Button onClick={() => deleteItem(item)}>
                          <Icon type="trash" />
                        </Button>
                        <Button onClick={() => toggleFavorite(item)}>
                          <Icon type={item.isFavorite ? 'star_fill' : 'star'} />
                        </Button>
                        <Button onClick={() => openMovePopup(item)}>
                          <Icon type="move" />
                        </Button>
                        {!item.isFolder && (
                          <Button onClick={() => downloadItem(item)}>
                            <Icon type="download" />
                          </Button>
                        )}
                      </>
                    )}
                    {isInTrash && (
                      <>
                        <Button onClick={() => restoreItem(item)}>
                          Restore
                        </Button>
                        <Button onClick={() => deleteItemPermanently(item)}>
                          Delete Permanently
                        </Button>
                      </>
                    )}
                  </>
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
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ‹ Prev
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ›
        </Button>
        <Button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
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
        <Popup
          id="uploadProgressPopup"
          isVisible={showUploadPopup}
          onClose={() => setShowUploadPopup(false)}
        >
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
        <Popup
          id="renamePopup"
          isVisible={showRenamePopup}
          onClose={closeRenamePopup}
        >
          <div className="rename_popup">
            <h2>Rename Item</h2>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <div className="popup_actions">
              <Button onClick={handleRename}>Rename</Button>
              <Button onClick={closeRenamePopup}>Cancel</Button>
            </div>
          </div>
        </Popup>
      )}

      {/* Share Popup */}
      {showSharePopup && itemToShare && (
        <Popup
          id="showSharePopup"
          isVisible={showSharePopup}
          onClose={closeSharePopup}
        >
          <div className="share_popup">
            <h2>Share File: {itemToShare.name}</h2>
            {!shareLink ? (
              <div>
                <label>Expires In (hours): </label>
                <input
                  type="number"
                  value={expiresIn}
                  min={1}
                  max={168}
                  onChange={e => setExpiresIn(Number(e.target.value))}
                />
                <Button
                  color="#fff"
                  bgcolor="#317ce6"
                  border="#317ce6"
                  hover_bgcolor="#1967D2"
                  hover_color="#fff"
                  onClick={handleCreateShareLink}
                >
                  Generate Link
                </Button>
              </div>
            ) : (
              <div>
                <p>Shareable Link:</p>
                <input type="text" value={shareLink} readOnly />
                <CopyToClipboard text={shareLink}>
                  <Button>Copy Link</Button>
                </CopyToClipboard>
              </div>
            )}
          </div>
        </Popup>
      )}

      {/* Create Folder Popup */}
      {showCreateFolderPopup && (
        <Popup
          id="showCreateFolderPopup"
          isVisible={showCreateFolderPopup}
          onClose={closeCreateFolderPopup}
        >
          <div className="create_folder_popup">
            <h2>Create New Folder</h2>
            <input
              type="text"
              value={newFolderName}
              onChange={e => setNewFolderName(e.target.value)}
              placeholder="Folder Name"
            />
            <div className="popup_actions">
              <Button onClick={handleCreateFolder}>Create</Button>
              <Button onClick={closeCreateFolderPopup}>Cancel</Button>
            </div>
          </div>
        </Popup>
      )}

      {/* Move Popup */}
      {showMovePopup && (
        <Popup
          id="showMovePopup"
          isVisible={showMovePopup}
          onClose={closeMovePopup}
        >
          <div className="move_popup">
            <h2>Move Item</h2>
            <p>Moving: {itemToMove?.name}</p>
            <label>Destination Path:</label>
            <input
              type="text"
              value={destinationPath}
              onChange={e => setDestinationPath(e.target.value)}
              placeholder="Enter destination path"
            />
            <div className="popup_actions">
              <Button onClick={handleMove}>Move</Button>
              <Button onClick={closeMovePopup}>Cancel</Button>
            </div>
          </div>
        </Popup>
      )}
    </AdminLayout>
  );
};

export default FileManager;
