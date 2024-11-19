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
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [newImageData, setNewImageData] = useState<{
        file: File | null;
        newName: string;
    }>({
        file: null,
        newName: "",
    });
    const [searchTerm, setSearchTerm] = useState<string>("");

    const breadcrumbItems = [
        { label: "Dashboard", url: `/${language}/dashboard` },
        { label: "Image Manager" },
    ];

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await api.get("/images", {
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

    const handleUploadImage = async () => {
        if (!newImageData.file) {
            setNotification({
                message: "Please select an image to upload.",
                type: "error",
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", newImageData.file);

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

    const handleCopySrc = (src: string) => {
        navigator.clipboard
            .writeText(src)
            .then(() => {
                setNotification({
                    message: "Image src copied to clipboard!",
                    type: "success",
                });
            })
            .catch(() => {
                setNotification({
                    message: "Failed to copy image src.",
                    type: "error",
                });
            });
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

            <div className="image_manager_container">
                <div className="image_manager_controls">
                    <Button
                        color="#fff"
                        bgcolor="#28a745"
                        border="#28a745"
                        hover_bgcolor="#218838"
                        hover_color="#fff"
                        onClick={() => openPopup()}
                    >
                        Upload Image
                    </Button>
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="image_search_input"
                    />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : images.length > 0 ? (
                    <div className="images_list">
                        {images
                            .filter((image) =>
                                image.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((image) => (
                                <div key={image.name} className="image_card">
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND}/images/${encodeURIComponent(
                                            image.name
                                        )}`}
                                        alt={image.name}
                                    />
                                    <div className="image_info">
                                        <p>{image.name}</p>
                                        <div className="image_actions">
                                            <Button onClick={() => openPopup(image.name)}>Rename</Button>
                                            <Button onClick={() => handleDeleteImage(image.name)}>
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleCopySrc(
                                                        `${import.meta.env.VITE_BACKEND}/images/${encodeURIComponent(
                                                            image.name
                                                        )}`
                                                    )
                                                }
                                            >
                                                Copy src
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p>No images available.</p>
                )}
            </div>

            {showPopup && (
                <Popup id="image_manager_popup" isVisible={showPopup} onClose={closePopup}>
                    <div className="popup_content">
                        {!currentImage ? (
                            <>
                                <h2>Upload Image</h2>
                                <div className="form_group">
                                    <label>Image File</label>
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div className="popup_actions">
                                    <Button
                                        color="#fff"
                                        bgcolor="#317ce6"
                                        border="#317ce6"
                                        hover_bgcolor="#1967D2"
                                        hover_color="#fff"
                                        onClick={handleUploadImage}
                                    >
                                        Upload
                                    </Button>
                                    <Button onClick={closePopup}>Cancel</Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Rename Image</h2>
                                <div className="form_group">
                                    <label>New Name</label>
                                    <input
                                        type="text"
                                        value={newImageData.newName}
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
                                        onClick={handleRenameImage}
                                    >
                                        Rename
                                    </Button>
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

export default ImageManager;
