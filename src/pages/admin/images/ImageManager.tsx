import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import Button from "../../../components/Button";
import Notification from "../../../components/Notification/Notification";
import Popup from "../../../components/Popup/Popup";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import "./ImageManager.css";
import PageLoading from "../../../components/PageLoading/PageLoading.tsx";

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
        files: File[];
        newName: string;
    }>({
        files: [],
        newName: "",
    });
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [conflictingFiles, setConflictingFiles] = useState<File[]>([]);
    const [showConflictPopup, setShowConflictPopup] = useState<boolean>(false);
    const [conflictResolutions, setConflictResolutions] = useState<{
        [fileName: string]: "overwrite" | "rename";
    }>({});

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
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setNotification({
                message: "Error fetching images.",
                type: "error",
            });
        }
    };

    const encodeFilenameForURL = (name: string) => {
        return encodeURIComponent(name)
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29");
    };

    const handleUploadImages = async () => {
        setShowPopup(false);
        if (!newImageData.files || newImageData.files.length === 0) {
            setNotification({
                message: "Please select images to upload.",
                type: "error",
            });
            return;
        }

        const existingImageNames = images.map((image) => image.name);
        const conflicts = newImageData.files.filter((file) =>
            existingImageNames.includes(file.name)
        );

        if (conflicts.length > 0) {
            setConflictingFiles(conflicts);
            setShowConflictPopup(true);
        } else {
            await proceedWithUpload();
        }
    };

    const closeConflictPopup = () => {
        setShowConflictPopup(false);
    };

    const handleConflictChoice = (
        fileName: string,
        choice: "overwrite" | "rename"
    ) => {
        setConflictResolutions((prev) => ({
            ...prev,
            [fileName]: choice,
        }));
    };

    const getUniqueFileName = (originalName: string) => {
        const nameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");
        const extension = originalName.substring(originalName.lastIndexOf("."));
        let newName = `${nameWithoutExtension}(1)${extension}`;
        let counter = 1;

        const existingImageNames = images.map((image) => image.name);

        while (existingImageNames.includes(newName)) {
            counter++;
            newName = `${nameWithoutExtension}(${counter})${extension}`;
        }

        return newName;
    };

    const handleConflictResolutionDone = async () => {
        setShowConflictPopup(false);
        setShowPopup(false);
        await proceedWithUpload();
    };

    const proceedWithUpload = async () => {
        setIsUploading(true);
        setUploadProgress(0);

        const totalFiles = newImageData.files.length;
        for (let i = 0; i < totalFiles; i++) {
            let file = newImageData.files[i];
            let fileName = file.name;

            if (conflictResolutions[fileName]) {
                const choice = conflictResolutions[fileName];
                if (choice === "overwrite") {
                    try {
                        await api.delete(`/images/${fileName}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                    } catch (error) {
                        setNotification({
                            message: `Error overwriting image ${fileName}.`,
                            type: "error",
                        });
                        continue;
                    }
                } else if (choice === "rename") {
                    const newFileName = getUniqueFileName(fileName);
                    file = new File([file], newFileName, { type: file.type });
                    fileName = newFileName;
                }
            }

            const formData = new FormData();
            formData.append("image", file);

            try {
                await api.post("/images/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
            } catch (error) {
                setNotification({
                    message: `Error uploading image ${fileName}.`,
                    type: "error",
                });
            }
        }

        setIsUploading(false);
        setUploadProgress(0);
        setNotification({
            message: "Images uploaded successfully!",
            type: "success",
        });
        fetchImages();
        setConflictResolutions({});
    };

    const handleDeleteImage = async (name: string) => {
        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            await api.delete(`/images/${name}`, {
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
            setNotification({
                message: "Error renaming image.",
                type: "error",
            });
            closePopup();
        }
    };

    const openPopup = (image: string | null = null) => {
        setCurrentImage(image);
        setNewImageData({
            files: [],
            newName: image || "",
        });
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentImage(null);
        setNewImageData({
            files: [],
            newName: "",
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImageData({ ...newImageData, files: Array.from(e.target.files) });
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
        {
            btn: "Portfolio",
            url: "/dashboard/portfolio-manager",
            type: "button",
            icon: "menu",
        },
        {
            btn: "Certification",
            url: "/dashboard/certification-manager",
            type: "button",
            icon: "menu",
        },
        {
            btn: "Images",
            url: "/dashboard/image-manager",
            type: "button_active",
            icon: "image",
        },
    ];

    const allChoicesMade = conflictingFiles.every(
        (file) => conflictResolutions[file.name]
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
                        Upload Images
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
                    <PageLoading/>
                ) : images.length > 0 ? (
                    <div className="images_list">
                        {images
                            .filter((image) =>
                                image.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((image) => (
                                <div key={image.name} className="image_card">
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND}/images/${encodeFilenameForURL(
                                            image.name
                                        )}`}
                                        alt={image.name}
                                    />
                                    <div className="image_info">
                                        <p>{image.name}</p>
                                        <div className="image_actions">
                                            <Button onClick={() => openPopup(image.name)}>
                                                Rename
                                            </Button>
                                            <Button onClick={() => handleDeleteImage(image.name)}>
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleCopySrc(
                                                        `${import.meta.env.VITE_BACKEND}/images/${encodeFilenameForURL(
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

            {isUploading && (
                <Popup id="uploadProgressPopup" isVisible={isUploading} onClose={() => {}}>
                    <div className="upload_progress_popup">
                        <h2>Uploading Images...</h2>
                        <ProgressBar progress={uploadProgress} />
                    </div>
                </Popup>
            )}

            {showPopup && (
                <Popup id="image_manager_popup" isVisible={showPopup} onClose={closePopup}>
                    <div className="popup_content">
                        {!currentImage ? (
                            <>
                                <h2>Upload Images</h2>
                                <div className="form_group">
                                    <label>Select Images</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </div>
                                <div className="popup_actions">
                                    <Button
                                        color="#fff"
                                        bgcolor="#317ce6"
                                        border="#317ce6"
                                        hover_bgcolor="#1967D2"
                                        hover_color="#fff"
                                        onClick={handleUploadImages}
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

            {showConflictPopup && (
                <Popup
                    id="conflict_resolution_popup"
                    isVisible={showConflictPopup}
                    onClose={closeConflictPopup}
                >
                    <div className="popup_content">
                        <h2>Resolve Filename Conflicts</h2>
                        {conflictingFiles.map((file) => (
                            <div key={file.name} className="conflict_item">
                                <p>File "{file.name}" already exists.</p>
                                <div className="conflict_actions">
                                    <Button
                                        onClick={() => handleConflictChoice(file.name, "overwrite")}
                                        color="#fff"
                                        bgcolor="#dc3545"
                                        border="#dc3545"
                                        hover_bgcolor="#c82333"
                                        hover_color="#fff"
                                    >
                                        Overwrite
                                    </Button>
                                    <Button
                                        onClick={() => handleConflictChoice(file.name, "rename")}
                                        color="#fff"
                                        bgcolor="#17a2b8"
                                        border="#17a2b8"
                                        hover_bgcolor="#138496"
                                        hover_color="#fff"
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
        </AdminLayout>
    );
};

export default ImageManager;
