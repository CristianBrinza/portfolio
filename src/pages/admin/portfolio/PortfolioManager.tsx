// src/pages/admin/portfolio/CertificationManager.tsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Title from '../../../components/Text/Title/Title';
import Popup from '../../../components/Popup/Popup';
import Notification from '../../../components/Notification/Notification';
import { AxiosError } from 'axios';
import './PortfolioManager.css';
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout.tsx";
import PageLoading from "../../../components/PageLoading/PageLoading.tsx";
import { portfolio_menu as AdminMenu } from '../menues.ts';

interface PortfolioItem {
    img: string;
    title: string;
    description: string;
    link?: string;
    demo?: string;
    source?: string;
    more?: string;
    [key: string]: any;
}

interface PortfolioCategory {
    [subcategory: string]: PortfolioItem[];
}

interface PortfolioData {
    [category: string]: PortfolioCategory | PortfolioItem[];
}

const PortfolioManager: React.FC = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
    const [currentCategory, setCurrentCategory] = useState<string>('');
    const [currentSubcategory, setCurrentSubcategory] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    useEffect(() => {
        if (role !== 'admin' && role !== 'user') {
            navigate(`/${language}/login`);
        } else {
            fetchPortfolioData();
        }
    }, [role]);

    const fetchPortfolioData = async () => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_BACKEND}/json/portfolio`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setPortfolioData(response.data);
            setLoading(false);
        } catch (error: unknown) {
            console.error('Error fetching portfolio data:', error);
            setLoading(false);
            setNotification({
                message: 'Error fetching portfolio data.',
                type: 'error',
            });
        }
    };

    const handleSave = async () => {
        try {
            await api.put(
                `${import.meta.env.VITE_BACKEND}/json/portfolio`,
                portfolioData,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            setNotification({
                message: 'Portfolio data updated successfully!',
                type: 'success',
            });
        } catch (error: unknown) {
            console.error('Error updating portfolio data:', error);
            if (error instanceof AxiosError && error.response) {
                setNotification({
                    message: `Failed to update portfolio data: ${error.response.data.message}`,
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

    const openPopup = (
        category: string,
        subcategory: string,
        item: PortfolioItem | null = null
    ) => {
        setCurrentCategory(category);
        setCurrentSubcategory(subcategory);
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
            setCurrentItem({ [e.target.name]: e.target.value } as PortfolioItem);
        }
    };

    const addItem = () => {
        if (currentItem) {
            const updatedData = { ...portfolioData };
            const items = getItemsArray(updatedData, currentCategory, currentSubcategory);
            items.push(currentItem);
            setPortfolioData(updatedData);
            closePopup();
        }
    };

    const updateItem = () => {
        if (currentItem) {
            const updatedData = { ...portfolioData };
            const items = getItemsArray(updatedData, currentCategory, currentSubcategory);
            const index = items.findIndex((item) => item.title === currentItem.title);
            if (index !== -1) {
                items[index] = currentItem;
            }
            setPortfolioData(updatedData);
            closePopup();
        }
    };

    const deleteItem = (category: string, subcategory: string, index: number) => {
        const updatedData = { ...portfolioData };
        const items = getItemsArray(updatedData, category, subcategory);
        items.splice(index, 1);
        setPortfolioData(updatedData);
    };

    const moveItemUp = (category: string, subcategory: string, index: number) => {
        if (index === 0) return;
        const updatedData = { ...portfolioData };
        const items = getItemsArray(updatedData, category, subcategory);
        [items[index - 1], items[index]] = [items[index], items[index - 1]];
        setPortfolioData(updatedData);
    };

    const moveItemDown = (category: string, subcategory: string, index: number) => {
        const items = getItemsArray(portfolioData, category, subcategory);
        if (index === items.length - 1) return;
        const updatedData = { ...portfolioData };
        [items[index + 1], items[index]] = [items[index], items[index + 1]];
        setPortfolioData(updatedData);
    };

    const addCategory = (category: string) => {
        if (!portfolioData[category]) {
            setPortfolioData({ ...portfolioData, [category]: {} });
        }
    };

    const deleteCategory = (category: string) => {
        const updatedData = { ...portfolioData };
        delete updatedData[category];
        setPortfolioData(updatedData);
    };

    const addSubcategory = (category: string, subcategory: string) => {
        const updatedData = { ...portfolioData };
        if (!updatedData[category]) {
            updatedData[category] = {};
        }
        if (!(updatedData[category] as PortfolioCategory)[subcategory]) {
            (updatedData[category] as PortfolioCategory)[subcategory] = [];
        }
        setPortfolioData(updatedData);
    };

    const deleteSubcategory = (category: string, subcategory: string) => {
        const updatedData = { ...portfolioData };
        delete (updatedData[category] as PortfolioCategory)[subcategory];
        setPortfolioData(updatedData);
    };

    const getItemsArray = (
        data: PortfolioData,
        category: string,
        subcategory?: string
    ): PortfolioItem[] => {
        if (subcategory) {
            return (data[category] as PortfolioCategory)[subcategory] || [];
        } else {
            const categoryData = data[category];
            if (Array.isArray(categoryData)) {
                return categoryData;
            } else {
                return [];
            }
        }
    };

    const breadcrumbItems = [
        { label: 'Dashboard', url: `/${language}/dashboard` },
        { label: 'Portfolio Manager' },
    ];

    const menu = AdminMenu.map((item) =>
        item.url === '/dashboard/portfolio-manager'
            ? { ...item, type: 'button_active' }
            : item
    );

    return (
            <AdminLayout menu_items={menu} breadcrumb={breadcrumbItems}>

                <Title className="certification_manager_page_title">Portfolio Manager</Title>


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
                    <div className="portfolio_manager_container">
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
                        {Object.keys(portfolioData).map((category) => {
                            const categoryData = portfolioData[category];
                            const isArray = Array.isArray(categoryData);

                            return (
                                <div key={category} className="category_block">
                                    <div className="category_header">
                                        <h2>{category}</h2>
                                        <div className="category_header_btns">
                                            {!isArray && (
                                                <Button
                                                    onClick={() =>
                                                        addSubcategory(
                                                            category,
                                                            prompt('Enter subcategory name') || ''
                                                        )
                                                    }
                                                >
                                                    Add Subcategory
                                                </Button>
                                            )}
                                            <Button onClick={() => deleteCategory(category)}>
                                                Delete Category
                                            </Button>
                                        </div>
                                    </div>
                                    {isArray ? (
                                        // Category is an array of items
                                        <div className="items_list">
                                            {getItemsArray(portfolioData, category).map(
                                                (item, index) => (
                                                    <div key={index} className="item_card">
                                                        <img src={item.img} alt={item.title} />
                                                        <div className="item_info">
                                                            <h4>{item.title}</h4>
                                                            <p>{item.description}</p>
                                                            <div className="item_links">
                                                                {item.link && <a href={item.link}>Link</a>}
                                                                {item.demo && <a href={item.demo}>Demo</a>}
                                                                {item.source && (
                                                                    <a href={item.source}>Source</a>
                                                                )}
                                                                {item.more && <a href={item.more}>More</a>}
                                                            </div>
                                                            <div className="item_actions">
                                                                <Button
                                                                    onClick={() =>
                                                                        openPopup(category, '', item)
                                                                    }
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    onClick={() =>
                                                                        deleteItem(category, '', index)
                                                                    }
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    onClick={() =>
                                                                        moveItemUp(category, '', index)
                                                                    }
                                                                    disabled={index === 0}
                                                                >
                                                                    ←
                                                                </Button>
                                                                <Button
                                                                    onClick={() =>
                                                                        moveItemDown(category, '', index)
                                                                    }
                                                                    disabled={
                                                                        index ===
                                                                        getItemsArray(portfolioData, category)
                                                                            .length - 1
                                                                    }
                                                                >
                                                                    →
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        // Category has subcategories
                                        Object.keys(categoryData as PortfolioCategory).map(
                                            (subcategory) => (
                                                <div key={subcategory} className="subcategory_block">
                                                    <div className="subcategory_header">
                                                        <h3>{subcategory}</h3>
                                                        <div className="category_header_btns">
                                                            <Button
                                                                onClick={() =>
                                                                    openPopup(category, subcategory)
                                                                }
                                                            >
                                                                Add Item
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    deleteSubcategory(category, subcategory)
                                                                }
                                                            >
                                                                Delete Subcategory
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="items_list">
                                                        {getItemsArray(
                                                            portfolioData,
                                                            category,
                                                            subcategory
                                                        ).map((item, index) => (
                                                            <div key={index} className="item_card">
                                                                <img src={item.img} alt={item.title} />
                                                                <div className="item_info">
                                                                    <h4>{item.title}</h4>
                                                                    <p>{item.description}</p>
                                                                    <div className="item_links">
                                                                        {item.link && <a href={item.link}>Link</a>}
                                                                        {item.demo && <a href={item.demo}>Demo</a>}
                                                                        {item.source && (
                                                                            <a href={item.source}>Source</a>
                                                                        )}
                                                                        {item.more && <a href={item.more}>More</a>}
                                                                    </div>
                                                                    <div className="item_actions">
                                                                        <Button
                                                                            onClick={() =>
                                                                                openPopup(
                                                                                    category,
                                                                                    subcategory,
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                deleteItem(
                                                                                    category,
                                                                                    subcategory,
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                moveItemUp(
                                                                                    category,
                                                                                    subcategory,
                                                                                    index
                                                                                )
                                                                            }
                                                                            disabled={index === 0}
                                                                        >
                                                                            ←
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                moveItemDown(
                                                                                    category,
                                                                                    subcategory,
                                                                                    index
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                index ===
                                                                                getItemsArray(
                                                                                    portfolioData,
                                                                                    category,
                                                                                    subcategory
                                                                                ).length - 1
                                                                            }
                                                                        >
                                                                            →
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )}
                                </div>
                            );
                        })}
                        <div className="add_category_section">
                            <Button
                                color="var(--theme_primary_color_black)"
                                bgcolor="var(--theme_primary_color_dark_gray)"
                                border="var(--theme_primary_color_dark_gray)"
                                hover_bgcolor="#1967D2"
                                hover_color="#fff"
                                onClick={() =>
                                    addCategory(prompt('Enter category name') || '')
                                }
                            >
                                Add Category
                            </Button>
                        </div>
                    </div>
                )}

            <Popup
                id="portfolio_item_popup"
                isVisible={showPopup}
                onClose={closePopup}
            >
                <div className="popup_content">
                    <h2 className="portfolio_manager_container_popup_title">
                        {isEditing ? 'Edit Item' : 'Add Item'}
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
                        <label>Link</label>
                        <input
                            type="text"
                            name="link"
                            value={currentItem?.link || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Demo</label>
                        <input
                            type="text"
                            name="demo"
                            value={currentItem?.demo || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Source</label>
                        <input
                            type="text"
                            name="source"
                            value={currentItem?.source || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>More</label>
                        <input
                            type="text"
                            name="more"
                            value={currentItem?.more || ''}
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

export default PortfolioManager;
