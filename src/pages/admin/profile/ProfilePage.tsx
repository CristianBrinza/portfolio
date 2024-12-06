// src/pages/admin/profile/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/Admin/AdminLayout/AdminLayout';
import api from '../../../utils/api';
import Button from '../../../components/Button';
import Notification from '../../../components/Notification/Notification';
import styles from './ProfilePage.module.css';
import Title from '../../../components/Text/Title/Title.tsx';

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
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setProfile(response.data);
      if (response.data.image) {
        setProfileImageUrl(
          `${import.meta.env.VITE_BACKEND}/user/profile-image/${response.data.image}`
        );
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
            'ngrok-skip-browser-warning': 'true',
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

      setNotification({
        message: 'Profile updated successfully',
        type: 'success',
      });
      setSelectedFile(null);
      fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({ message: 'Error updating profile', type: 'error' });
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

  const breadcrumbItems = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Profile' },
  ];

  const menu = [
    {
      btn: 'Edit Profile',
      url: '/dashboard/profile',
      type: 'button_active',
      icon: 'profile',
    },
    {
      btn: 'Change Password',
      url: '/dashboard/profile/password',
      type: 'button',
      icon: 'password',
    },
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
      <Title className={styles.profile_password_edit_title}>Edit Profile</Title>

      <form onSubmit={handleProfileSubmit}>
        <div className={styles.form_group}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            disabled
          />
        </div>
        <div className={styles.form_group}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_group}>
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
          />
        </div>
        <div className={styles.form_group}>
          <label>Profile Image</label>
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile"
              className={styles.profile_image_preview}
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <Button
          type="submit"
          color="#fff"
          bgcolor="#317ce6"
          border="#317ce6"
          hover_bgcolor="#1967D2"
          hover_color="#fff"
        >
          Save Changes
        </Button>
      </form>
    </AdminLayout>
  );
};

export default ProfilePage;
