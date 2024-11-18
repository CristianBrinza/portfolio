import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Title from '../../../components/Text/Title/Title';
import Popup from '../../../components/Popup/Popup';
import Notification from '../../../components/Notification/Notification';
import { AxiosError } from 'axios';
import './CertificationManager.css';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';

interface CertificationItem {
    img: string;
    title: string;
    by: string;
    description: string;
    to?: string;
    [key: string]: any;
}

const CertificationManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [certificationData, setCertificationData] = useState<CertificationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<CertificationItem | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchCertificationData();
        }
    }, [role]);

    const fetchCertificationData = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND}/json/certifications`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setCertificationData(response.data);
            setLoading(false);
        } catch (error: unknown) {
            console.error('Error fetching certification data:', error);
            setLoading(false);
            setNotification({
                message: 'Error fetching certification data.',
                type: 'error',
            });
        }
    };

    const handleSave = async () => {
        try {
            await api.put(
                `${import.meta.env.VITE_BACKEND}/json/certifications`,
                certificationData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setNotification({
                message: 'Certification data updated successfully!',
                type: 'success',
            });
        } catch (error: unknown) {
            console.error('Error updating certification data:', error);
            if (error instanceof AxiosError && error.response) {
                setNotification({
                    message: `Failed to update certification data: ${error.response.data.message}`,
                    type: 'error',
                });
            } else if (error instanceof AxiosError && error.request) {
                setNotification({
                    message: 'No response from the server. Please try again later.',
                    type: 'error',
                });
            } else {
                setNotification({
                    message: `Error: ${String(error)}`,
                    type: 'error',
                });
            }
        }
    };

    const openPopup = (item: CertificationItem | null = null) => {
        setCurrentItem(item);
        setIsEditing(!!item);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentItem(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (currentItem) {
            setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
        } else {
            setCurrentItem({ [e.target.name]: e.target.value } as CertificationItem);
        }
    };

    const addItem = () => {
        if (currentItem) {
            const updatedData = [...certificationData, currentItem];
            setCertificationData(updatedData);
            closePopup();
        }
    };

    const updateItem = () => {
        if (currentItem) {
            const updatedData = certificationData.map((item) =>
                item.title === currentItem.title ? currentItem : item
            );
            setCertificationData(updatedData);
            closePopup();
        }
    };

    const deleteItem = (index: number) => {
        const updatedData = [...certificationData];
        updatedData.splice(index, 1);
        setCertificationData(updatedData);
    };

    const moveItemUp = (index: number) => {
        if (index === 0) return;
        const updatedData = [...certificationData];
        [updatedData[index - 1], updatedData[index]] = [updatedData[index], updatedData[index - 1]];
        setCertificationData(updatedData);
    };

    const moveItemDown = (index: number) => {
        if (index === certificationData.length - 1) return;
        const updatedData = [...certificationData];
        [updatedData[index + 1], updatedData[index]] = [updatedData[index], updatedData[index + 1]];
        setCertificationData(updatedData);
    };

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'Certification Manager' },
    ];

    const menu = [
        { btn: 'Portfolio', url: '/dashboard/portfolio-manager', type: 'button', icon: 'menu' },
        { btn: 'Certification', url: '/dashboard/certification-manager', type: 'button_active', icon: 'menu' },
        { btn: 'Images', url: '/dashboard/image-manager', type: 'button', icon: 'image' },
    ];

    return (
        <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>
            <Title className="certification_manager_page_title">&nbsp;</Title>

            {notification && (
                <Notification
                    type={notification.type}
                    onClose={() => setNotification(null)}
                >
                    {notification.message}
                </Notification>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="certification_manager_container">
                    <Button
                        onClick={handleSave}
                        className="save_button"
                        color="#fff"
                        bgcolor="#317ce6"
                        border="#317ce6"
                        hover_bgcolor="#1967D2"
                        hover_color="#fff"
                    >
                        Save Changes
                    </Button>

                    <div className="items_list">
                        {certificationData.map((item, index) => (
                            <div key={index} className="item_card">
                                <img src={item.img} alt={item.title} />
                                <div className="item_info">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <p>By: {item.by}</p>
                                    <div className="item_actions">
                                        <Button
                                            onClick={() => openPopup(item)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => deleteItem(index)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => moveItemUp(index)}
                                            disabled={index === 0}
                                        >
                                            ←
                                        </Button>
                                        <Button
                                            onClick={() => moveItemDown(index)}
                                            disabled={index === certificationData.length - 1}
                                        >
                                            →
                                        </Button>
                                    </div>
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
                            onClick={() => openPopup()}
                        >
                            Add Certification
                        </Button>
                    </div>
                </div>
            )}

            <Popup
                id="certification_item_popup"
                isVisible={showPopup}
                onClose={closePopup}
            >
                <div className="popup_content">
                    <h2 className="certification_manager_container_popup_title">
                        {isEditing ? 'Edit Certification' : 'Add Certification'}
                    </h2>
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
                        <label>By</label>
                        <input
                            type="text"
                            name="by"
                            value={currentItem?.by || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Description</label>
                        <textarea
                            style={{
                                resize: 'vertical',
                                height: '80px',
                                maxHeight: '200px',
                                minHeight: '40px',
                            }}
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
                        <Button
                            color="#fff"
                            bgcolor="#317ce6"
                            border="#317ce6"
                            hover_bgcolor="#1967D2"
                            hover_color="#fff"
                            onClick={isEditing ? updateItem : addItem}
                        >
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                        <Button onClick={closePopup}>Cancel</Button>
                    </div>
                </div>
            </Popup>
        </AdminLayout>
    );
};

export default CertificationManager;
