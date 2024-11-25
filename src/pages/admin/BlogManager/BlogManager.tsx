// components/BlogManager.tsx
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
import { portfolio_menu as AdminMenu } from '../menues.ts';

interface BlogItem {
    img: string;
    title: string;
    news_type: 'UPDATE' | 'NEW' | 'BUGFIX' | 'ANNOUNCEMENT';
    description?: string;
    to?: string;
}

const BlogManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [blogData, setBlogData] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<BlogItem | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchBlogData();
        }
    }, [role]);

    const fetchBlogData = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND}/json/blog`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setBlogData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog data:', error);
            setLoading(false);
            setNotification({
                message: 'Error fetching blog data.',
                type: 'error',
            });
        }
    };

    const handleSave = async () => {
        try {
            await api.put(
                `${import.meta.env.VITE_BACKEND}/json/blog`,
                blogData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setNotification({
                message: 'Blog data updated successfully!',
                type: 'success',
            });
        } catch (error) {
            console.error('Error updating blog data:', error);
            setNotification({
                message: 'Failed to update blog data.',
                type: 'error',
            });
        }
    };

    const openPopup = (item: BlogItem | null = null) => {
        if (item) {
            setCurrentItem(item);
            setIsEditing(true);
        } else {
            // Initialize currentItem with default values for a new item
            setCurrentItem({
                img: '',
                title: '',
                news_type: 'NEW',
                description: '',
                to: '',
            });
            setIsEditing(false);
        }
        setShowPopup(true);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
            const updatedData = [...blogData, currentItem];
            setBlogData(updatedData);
            closePopup();
        }
    };

    const updateItem = () => {
        if (currentItem) {
            const updatedData = blogData.map((item) =>
                item.title === currentItem.title ? currentItem : item
            );
            setBlogData(updatedData);
            closePopup();
        }
    };

    const deleteItem = (index: number) => {
        const updatedData = [...blogData];
        updatedData.splice(index, 1);
        setBlogData(updatedData);
    };

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'Blog Manager' },
    ];



    const menu = AdminMenu.map((item) =>
        item.url === '/dashboard/blog-manager'
            ? { ...item, type: 'button_active' }
            : item
    );
    return (
        <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
            <Title>&nbsp;Blog Manager</Title>

            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}

            {loading ? (
                <PageLoading/>
            ) : (
                <div className="manager_container">
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
                    <div className="items_list">
                        {blogData.map((item, index) => (
                            <div key={index} className="item_card">
                                <img src={item.img} alt={item.title} />
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <p>Type: {item.news_type}</p>
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
                            onClick={() => openPopup()}>Add Blog</Button>
                    </div>
                </div>
            )}

            <Popup id="blog_edit_popup" isVisible={showPopup} onClose={closePopup}>
                <div className="popup_content">
                    <h2>{isEditing ? 'Edit Blog' : 'Add Blog'}</h2>
                    <div className="form_group">
                        <label>Image URL</label>
                        <input
                            type="text"
                            name="img"
                            value={currentItem?.img || ''}
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
                    <div className="form_group">
                        <label>Type</label>
                        <select
                            name="news_type"
                            value={currentItem?.news_type || 'NEW'}
                            onChange={handleInputChange}
                        >
                            <option value="UPDATE">Update</option>
                            <option value="NEW">New</option>
                            <option value="BUGFIX">Bugfix</option>
                            <option value="ANNOUNCEMENT">Announcement</option>
                        </select>
                    </div>
                    <div className="form_group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={currentItem?.description || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Link (optional)</label>
                        <input
                            type="text"
                            name="to"
                            value={currentItem?.to || ''}
                            onChange={handleInputChange}
                        />
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

export default BlogManager;
