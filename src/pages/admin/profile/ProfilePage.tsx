// src/pages/admin/profile/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import './ProfilePage.css';
import {Link} from "react-router-dom";
import styles from "../../../components/Admin/AdminNavbar/AdminNavbar.module.css";

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState({
        username: '',
        name: '',
        surname: '',
        image: '',
    });
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    } | null>(null);

    // State for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // State for selected profile image file
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setProfile(response.data);
            if (response.data.image) {
                setProfileImageUrl(`${import.meta.env.VITE_BACKEND}/user/profile-image/${response.data.image}`);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setNotification({ message: 'Error fetching profile', type: 'error' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedProfile = { ...profile };

            // If a new image file is selected, upload it
            if (selectedFile) {
                const formData = new FormData();
                formData.append('profileImage', selectedFile);

                const uploadResponse = await api.post('/user/profile-image', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                updatedProfile.image = uploadResponse.data.filename;
            }

            // Update profile information
            await api.put('/user/profile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setNotification({ message: 'Profile updated successfully', type: 'success' });
            setSelectedFile(null);
            fetchProfile(); // Refresh profile data
        } catch (error) {
            console.error('Error updating profile:', error);
            setNotification({ message: 'Error updating profile', type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(
                '/user/password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setNotification({ message: 'Password updated successfully', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error: any) {
            console.error('Error updating password:', error);
            if (error.response && error.response.data) {
                setNotification({ message: error.response.data.message, type: 'error' });
            } else {
                setNotification({ message: 'Error updating password', type: 'error' });
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            // Preview the selected image
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setProfileImageUrl(imageUrl);
        }
    };

    const breadcrumbItems = [{ label: 'Dashboard', url: '/dashboard' }, { label: 'Profile' }];

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
            <div className="profile_page">
                <h2>Edit Profile</h2>
                <form onSubmit={handleProfileSubmit}>
                    <div className="form_group">
                        <label>Username</label>
                        <input type="text" name="username" value={profile.username} disabled />
                    </div>
                    <div className="form_group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={profile.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label>Profile Image</label>
                        {profileImageUrl && (
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className="profile_image_preview"
                            />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <Button type="submit">Save Changes</Button>
                </form>

                <h2>Change Password</h2>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="form_group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Change Password</Button>
                </form>
            </div>
        </AdminLayout>
    );
};


export default ProfilePage;
