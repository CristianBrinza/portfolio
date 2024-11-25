// components/PagesManager.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Title from '../../../components/Text/Title/Title';
import Popup from '../../../components/Popup/Popup';
import Notification from '../../../components/Notification/Notification';
import PageLoading from "../../../components/PageLoading/PageLoading";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import './PagesManager.css';
import { portfolio_menu as AdminMenu } from '../menues.ts';

interface PageItem {
    link: string;
    type: string;
    title: string;
    content: string; // HTML content as a string
}

const PagesManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [pagesData, setPagesData] = useState<PageItem[]>([]);
    const [filteredPages, setFilteredPages] = useState<PageItem[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<PageItem | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchPagesData();
        }
    }, [role]);

    const fetchPagesData = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND}/json/pages`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setPagesData(response.data);
            setFilteredPages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pages data:', error);
            setLoading(false);
            setNotification({
                message: 'Error fetching pages data.',
                type: 'error',
            });
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const lowerCaseQuery = query.toLowerCase();
        const filtered = pagesData.filter(
            (page) =>
                page.title.toLowerCase().includes(lowerCaseQuery) ||
                page.link.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredPages(filtered);
    };

    const handleSave = async () => {
        try {
            await api.put(
                `${import.meta.env.VITE_BACKEND}/json/pages`,
                pagesData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setNotification({
                message: 'Pages data updated successfully!',
                type: 'success',
            });
        } catch (error) {
            console.error('Error updating pages data:', error);
            setNotification({
                message: 'Failed to update pages data.',
                type: 'error',
            });
        }
    };
    const openPopup = (item: PageItem | null = null) => {
        if (item) {
            setCurrentItem(item);
            setIsEditing(true);
        } else {
            // Initialize currentItem with default values for a new item
            setCurrentItem({
                link: '',
                type: '',
                title: '',
                content: '',
            });
            setIsEditing(false);
        }
        setShowPopup(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!currentItem) return; // Ensure currentItem is not null
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentItem(null);
    };


    const addItem = () => {
        if (currentItem) {
            const updatedData = [...pagesData, currentItem];
            setPagesData(updatedData);
            setFilteredPages(updatedData);
            closePopup();
        }
    };

    const updateItem = () => {
        if (currentItem) {
            const updatedData = pagesData.map((item) =>
                item.link === currentItem.link ? currentItem : item
            );
            setPagesData(updatedData);
            setFilteredPages(updatedData);
            closePopup();
        }
    };

    const deleteItem = (index: number) => {
        const updatedData = [...pagesData];
        updatedData.splice(index, 1);
        setPagesData(updatedData);
        setFilteredPages(updatedData);
    };

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'Pages Manager' },
    ];


    const menu = AdminMenu.map((item) =>
        item.url === '/dashboard/pages-manager'
            ? { ...item, type: 'button_active' }
            : item
    );

    return (
        <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
            <Title>&nbsp;Pages Manager</Title>

            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}

            {loading ? (
                <PageLoading />
            ) : (
                <div className="pages_manager_container">
                    <div className="search_section">
                        <Button
                            className="save_button"
                            color="#fff"
                            bgcolor="#317ce6"
                            border="#317ce6"
                            hover_bgcolor="#1967D2"
                            hover_color="#fff"
                            onClick={handleSave}>
                            Save Changes
                        </Button>
                        <input
                            className="admin_search_input"
                            type="text"
                            placeholder="Search by title or link"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    <div className="items_list">
                        {filteredPages.map((item, index) => (
                            <div key={index} className="item_card">
                                <h4>{item.title}</h4>
                                <p>Type: {item.type}</p>
                                <p>Link: {item.link}</p>
                                <div
                                    className="page_preview" style={{display:"none"}}
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                />
                                <div className="item_actions">
                                    <Button onClick={() => openPopup(item)}>Edit</Button>
                                    <Button onClick={() => deleteItem(index)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add_item_section">
                        <Button
                            color="var(--theme_primary_color_black)"
                            bgcolor="var(--theme_primary_color_dark_gray)"
                            border="var(--theme_primary_color_dark_gray)"
                            hover_bgcolor="#1967D2"
                            hover_color="#fff"
                            onClick={() => openPopup()}>Add Page</Button>
                    </div>
                </div>
            )}

            <Popup id="pages_popup_edit" width='90vw' isVisible={showPopup} onClose={closePopup}>
                <div className="popup_content">
                    <h2>{isEditing ? 'Edit Page' : 'Add Page'}</h2>
                    <div id="pages_top_popup_content">
                        <div className="form_group">
                            <label>Link</label>
                            <input
                                type="text"
                                name="link"
                                value={currentItem?.link || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label>Type</label>
                            <input
                                type="text"
                                name="type"
                                value={currentItem?.type || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form_group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={currentItem?.title || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div id="pages_bottom_popup_content">
                        <div className="form_group form_group_pages_textarea_div">
                            <textarea className="form_group_pages_textarea"
                                name="content"
                                value={currentItem?.content || ''}
                                onChange={handleInputChange}
                                rows={10}
                            />
                        </div>
                        <div id="dynamic_pages" className="page_preview">
                            <div dangerouslySetInnerHTML={{__html: currentItem?.content || ''}}/>
                        </div>
                    </div>
                    <div className="popup_actions">
                        <Button onClick={isEditing ? updateItem : addItem}>
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                        <Button onClick={closePopup}>Cancel</Button>
                    </div>
                </div>
            </Popup>
        </AdminLayout>
    );
};

export default PagesManager;
