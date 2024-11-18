import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Notification from "../../../components/Notification/Notification";
import Popup from "../../../components/Popup/Popup";
import "./ImageManager.css";

interface ImageItem {
    name: string;
}

const ImageManager: React.FC = () => {
    const { lang } = useParams();
    const language = lang || "en";

    const [images, setImages] = useState<ImageItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
    } | null>(null);

    // States for search and sorting
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [newImageData, setNewImageData] = useState<{
        file: File | null;
        newName: string;
    }>({
        file: null,
        newName: "",
    });

    const breadcrumbItems = [
        { label: "Dashboard", url: `/${language}/dashboard` },
        { label: "Image Manager" },
    ];

    useEffect(() => {
        fetchImages();
    }, [searchQuery, sortBy, sortOrder]);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await api.get("/images", {
                params: {
                    search: searchQuery,
                    sortBy,
                    sortOrder,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data?.images && Array.isArray(response.data.images)) {
                setImages(response.data.images.map((name: string) => ({ name })));
            } else {
                setImages([]);
                console.error("Unexpected response format:", response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching images:", error);
            setLoading(false);
            setNotification({
                message: "Error fetching images.",
                type: "error",
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const handleUploadImage = async () => {
        if (!newImageData.file) {
            setNotification({
                message: "Please select an image to upload.",
                type: "error",
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", newImageData.file);

        try {
            await api.post("/images/upload", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setNotification({
                message: "Image uploaded successfully!",
                type: "success",
            });
            fetchImages();
            closePopup();
        } catch (error) {
            console.error("Error uploading image:", error);
            setNotification({
                message: "Error uploading image.",
                type: "error",
            });
        }
    };

    const handleDeleteImage = async (name: string) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await api.delete(`/images/${encodeURIComponent(name)}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setNotification({
                message: "Image deleted successfully!",
                type: "success",
            });
            fetchImages();
        } catch (error) {
            console.error("Error deleting image:", error);
            setNotification({
                message: "Error deleting image.",
                type: "error",
            });
        }
    };

    const handleRenameImage = async () => {
        if (!currentImage || !newImageData.newName) {
            setNotification({
                message: "Please provide a new name.",
                type: "error",
            });
            return;
        }

        try {
            await api.put(
                `/images/update`,
                { oldName: currentImage, newName: newImageData.newName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setNotification({
                message: "Image renamed successfully!",
                type: "success",
            });
            fetchImages();
            closePopup();
        } catch (error) {
            console.error("Error renaming image:", error);
            setNotification({
                message: "Error renaming image.",
                type: "error",
            });
        }
    };

    const openPopup = (image: string | null = null) => {
        setCurrentImage(image);
        setNewImageData({
            file: null,
            newName: image || "",
        });
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentImage(null);
        setNewImageData({
            file: null,
            newName: "",
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImageData({ ...newImageData, file: e.target.files[0] });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImageData({ ...newImageData, newName: e.target.value });
    };

    const menu = [
        { btn: "Portfolio", url: "/dashboard/portfolio-manager", type: "button", icon: "menu" },
        { btn: "Certification", url: "/dashboard/certification-manager", type: "button", icon: "menu" },
        { btn: "Images", url: "/dashboard/image-manager", type: "button_active", icon: "image" },
    ];

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

            <div className="image_manager_controls">
                <Button
                    color="#fff"
                    bgcolor="#28a745"
                    border="#28a745"
                    hover_bgcolor="#218838"
                    hover_color="#fff"
                    onClick={() => openPopup()}>Upload Image</Button>
                <div className="image_manager_search_sort">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <select value={sortBy} className="image_manager_controls_sort_custom" onChange={handleSortChange}>
                        <option value="name">Name</option>
                    </select>
                    <Button onClick={toggleSortOrder}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                    </Button>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="images_list">
                    {images.map((image) => (
                        <div key={image.name} className="image_card">
                            <img
                                src={`${import.meta.env.VITE_BACKEND}/images/${encodeURIComponent(
                                    image.name
                                )}`}
                                alt={image.name}
                            />
                            <div className="image_info">
                                <p>{image.name}</p>
                                <div className="popup_actions">
                                    <Button
                                        onClick={() => openPopup(image.name)}>Rename</Button>
                                    <Button onClick={() => handleDeleteImage(image.name)}>Delete</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showPopup && (
                <Popup id="image_manager_popup" isVisible={showPopup} onClose={closePopup}>
                    <div className="popup_content">
                        {!currentImage ? (
                            <>
                                <h2>Upload Image</h2>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                <Button onClick={handleUploadImage}>Upload</Button>
                            </>
                        ) : (
                            <>
                                <h2>Rename Image</h2>
                                <input
                                    type="text"
                                    value={newImageData.newName}
                                    onChange={handleInputChange}
                                />
                                <div className="popup_actions">
                                <Button
                                    color="#fff"
                                    bgcolor="#317ce6"
                                    border="#317ce6"
                                    hover_bgcolor="#1967D2"
                                    hover_color="#fff"
                                    onClick={handleRenameImage}>Rename</Button>
                                    <Button onClick={closePopup}>Cancel</Button>
                                </div>
                            </>
                        )}

                    </div>
                </Popup>
            )}
        </AdminLayout>
    );
};

export default ImageManager
